import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

// ================= TOKEN =================
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================= EMAIL SETUP =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const verificationCode = Math.random().toString().slice(2, 8);

    const user = await User.create({
      email: email.toLowerCase(),
      password,
      name,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Romance - Verify Your Email",
      html: `<h3>Your verification code: ${verificationCode}</h3>`,
    });

    res.status(201).json({
      success: true,
      message: "Account created. Verify your email.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= VERIFY EMAIL =================
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (
      user.emailVerificationCode !== code ||
      new Date() > user.emailVerificationExpires
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = null;
    user.emailVerificationExpires = null;

    await user.save();

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });

    if (!user.isEmailVerified)
      return res.status(401).json({
        success: false,
        message: "Please verify your email first",
      });

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const resetCode = Math.random().toString().slice(2, 8);

    user.resetToken = resetCode;
    user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `<h3>Your reset code: ${resetCode}</h3>`,
    });

    res.json({ success: true, message: "Reset code sent to email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (
      !user ||
      user.resetToken !== code ||
      new Date() > user.resetTokenExpires
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset code" });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= SEARCH USERS =================
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await User.find({
      name: { $regex: query, $options: "i" },
      isEmailVerified: true,
    }).select("-password");

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET USER PROFILE =================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= GET ME =================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
    }).select("-password");

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
