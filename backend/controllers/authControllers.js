import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate JWT token
// WHY: Create secure token that proves user is logged in
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
};

// Setup email transporter
// WHY: Send verification codes and password reset links via email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // App password, not regular password
  },
});

// ==================== SIGNUP ====================
// POST /api/auth/signup
// WHY: Create new user account
export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate inputs
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    // WHY: Can't have duplicate emails
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Generate email verification code
    // WHY: Ensure they own the email before account is usable
    const verificationCode = Math.random().toString().slice(2, 8); // 6-digit code

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await user.save();

    // Send verification email
    // WHY: User clicks link to verify they own this email
    await transporter.sendMail({
      to: user.email,
      subject: "Romance - Verify Your Email",
      html: `
        <h2>Welcome to Romance!</h2>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code expires in 24 hours.</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Account created. Please verify your email.",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== VERIFY EMAIL ====================
// POST /api/auth/verify-email
// WHY: Confirm email ownership before allowing login
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if code matches and hasn't expired
    if (
      user.emailVerificationCode !== code ||
      new Date() > user.emailVerificationExpires
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationCode = null;
    user.emailVerificationExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== LOGIN ====================
// POST /api/auth/login
// WHY: Authenticate user and return JWT token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if email is verified
    // WHY: Prevent login if email wasn't verified
    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Check if password matches
    // WHY: Verify password using bcryptjs comparison
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== FORGOT PASSWORD ====================
// POST /api/auth/forgot-password
// WHY: Start password reset process
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = Math.random().toString().slice(2, 8); // 6-digit code

    // Store token and expiry
    // WHY: Token expires in 1 hour for security
    user.resetToken = resetToken;
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send reset email
    await transporter.sendMail({
      to: user.email,
      subject: "Romance - Reset Your Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Your password reset code is: <strong>${resetToken}</strong></p>
        <p>This code expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    res.json({
      success: true,
      message: "Reset code sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== RESET PASSWORD ====================
// POST /api/auth/reset-password
// WHY: Complete password reset with new password
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify reset code
    if (user.resetToken !== code || new Date() > user.resetTokenExpires) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    // Update password
    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save(); // Pre-save hook will hash password

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== SEARCH USERS ====================
// GET /api/auth/search?q=john
// WHY: Find partners to quiz with (search by name)
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    const currentUserId = req.userId;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Please provide search query",
      });
    }

    // Search by first or last name (case-insensitive)
    // WHY: Return only verified users so we don't expose unverified accounts
    const users = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: q, $options: "i" } },
            { lastName: { $regex: q, $options: "i" } },
          ],
        },
        { isEmailVerified: true }, // Only verified users
        { _id: { $ne: currentUserId } }, // Don't show current user
      ],
    }).select("-password -resetToken -emailVerificationCode"); // Never return sensitive data

    res.json({
      success: true,
      users: users.map((user) => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        interests: user.interests,
        lookingFor: user.lookingFor,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET USER PROFILE ====================
// GET /api/auth/profile/:userId
// WHY: Get public profile of another user (for discover page)
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "-password -resetToken -emailVerificationCode",
    );

    if (!user || !user.isEmailVerified) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        interests: user.interests,
        lookingFor: user.lookingFor,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET MY PROFILE ====================
// GET /api/auth/me
// WHY: Get current logged-in user's profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -resetToken -emailVerificationCode",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        interests: user.interests,
        lookingFor: user.lookingFor,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== UPDATE PROFILE ====================
// PUT /api/auth/profile
// WHY: Update user's own profile (bio, interests, photo, etc)
export const updateProfile = async (req, res) => {
  try {
    const { bio, interests, lookingFor, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        bio,
        interests,
        lookingFor,
        profilePic,
      },
      { new: true }, // Return updated user
    ).select("-password -resetToken -emailVerificationCode");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        interests: user.interests,
        lookingFor: user.lookingFor,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
