import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

/* ================= EMAIL CONFIG ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // APP PASSWORD
  },
});

console.log(
  "Email Config - User:",
  process.env.EMAIL_USER ? "✓ Loaded" : "✗ Missing",
);
console.log(
  "Email Config - Password:",
  process.env.EMAIL_PASSWORD ? "✓ Loaded" : "✗ Missing",
);

transporter.verify((err) => {
  if (err) console.error("✗ EMAIL ERROR:", err);
  else console.log("✓ EMAIL SERVER READY");
});

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: hashedToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24hrs
    });

    const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verify-email?token=${rawToken}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `
          <h3>Email Verification</h3>
          <p>Click the link below to verify your account:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
        `,
      });
      console.log("✓ Verification email sent to:", email);
    } catch (emailError) {
      console.error("✗ Email sending failed:", emailError);
      return res.status(500).json({
        message: "Failed to send verification email: " + emailError.message,
      });
    }

    res.status(201).json({
      message: "Registration successful. Check your email to verify.",
    });
  } catch (error) {
    console.error("✗ Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= VERIFY EMAIL ================= */
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified)
      return res
        .status(400)
        .json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1hr
    await user.save();

    const resetUrl = `http://localhost:${process.env.PORT}/reset-password?token=${rawToken}`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `
          <h3>Password Reset</h3>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link expires in 1 hour.</p>
        `,
      });
      console.log("✓ Password reset email sent to:", email);
    } catch (emailError) {
      console.error("✗ Email sending failed:", emailError);
      return res
        .status(500)
        .json({ message: "Failed to send reset email: " + emailError.message });
    }

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("✗ Forgot password error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();

    console.log("✓ Password reset for user:", user.email);
    res.json({
      message:
        "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("✗ Reset password error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= SEARCH USERS ================= */
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      $or: [{ name: { $regex: q, $options: "i" } }],
      isVerified: true,
    }).select("_id name bio profilePic lookingFor interests createdAt");

    res.json(users);
  } catch (error) {
    console.error("✗ Search error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET USER PROFILE ================= */
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "_id name bio profilePic lookingFor interests createdAt",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("✗ Get profile error:", error);
    res.status(500).json({ message: error.message });
  }
};
