// ====================== authControllers.js ======================
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendEmail } from "../utils/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

dotenv.config();

/* ================= GENERATE JWT ================= */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/* ================= REGISTER ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        // Resend verification for unverified user
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
          .createHash("sha256")
          .update(rawToken)
          .digest("hex");

        existingUser.verificationToken = hashedToken;
        existingUser.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
        await existingUser.save();

        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

        // 🔥 NON-BLOCKING EMAIL (important fix)
        sendEmail({
          to: email,
          subject: "Verify your email",
          html: `
            <h3>Email Verification</h3>
            <p>Click below to verify your email:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
          `,
        }).catch((err) => {
          console.error(
            `❌ Failed to send verification email to ${email}:`,
            err.message,
          );
        });

        return res
          .status(200)
          .json({ message: "Verification email resent. Check your email." });
      }
    }

    // Create user first
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await User.create({
      name,
      email,
      password,
      verificationToken: hashedToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    console.log(`📧 Sending verification email to: ${email}`);

    // 🔥 NON-BLOCKING EMAIL – signup succeeds instantly
    sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
        <h3>Email Verification</h3>
        <p>Click below to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    })
      .then(() =>
        console.log(`✅ Verification email sent successfully to: ${email}`),
      )
      .catch((err) => {
        console.error(
          `❌ Failed to send verification email to ${email}:`,
          err.message,
        );
      });

    res
      .status(201)
      .json({
        message: "Registration successful! Check your email to verify.",
      });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
};
/* ================= VERIFY EMAIL ================= */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
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

/* ================= RESEND VERIFICATION ================= */
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User is already verified" });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.verificationToken = hashedToken;
    user.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    console.log(`Resending verification email to: ${email}`);
    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `
    <h3>Email Verification</h3>
    <p>Click below to verify your email:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
  `,
    });
    console.log(`Verification email resent successfully to: ${email}`);

    res.json({ message: "Verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= LOGIN ================= */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.isVerified)
      return res.status(400).json({
        message:
          "Verify your email first, check your Email you will receive your verification link from onboarding@resend.dev",
      });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    /* ===== DAILY STREAK LOGIC START ===== */

    const today = new Date();
    const todayMidnight = new Date(today).setHours(0, 0, 0, 0);

    const lastLoginMidnight = user.lastLoginDate
      ? new Date(user.lastLoginDate).setHours(0, 0, 0, 0)
      : null;

    if (lastLoginMidnight) {
      const diff = todayMidnight - lastLoginMidnight;

      if (diff === 24 * 60 * 60 * 1000) {
        user.dailyStreak += 1; // next day
      } else if (diff > 24 * 60 * 60 * 1000) {
        user.dailyStreak = 1; // reset
      }
      // same day → do nothing
    } else {
      user.dailyStreak = 1; // first login ever
    }

    user.lastLoginDate = new Date();

    await user.save();

    /* ===== DAILY STREAK LOGIC END ===== */

    res.json({
      user: user.toJSON(),
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ME ================= */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    await sendEmail({
      to: email,
      subject: "Reset Password",
      html: `
    <p>Click below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
  `,
    });

    res.json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= SEARCH USERS ================= */
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      name: { $regex: query, $options: "i" },
      isVerified: true,
    }).select("-password -verificationToken -passwordResetToken");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET USER PROFILE ================= */
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      "-password -verificationToken -passwordResetToken",
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE PROFILE ================= */
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      name,
      bio,
      profilePic,
      interests,
      lookingFor,
      phone,
      dob,
      location,
    } = req.body;
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (profilePic) user.profilePic = profilePic;
    if (interests) user.interests = interests;
    if (lookingFor) user.lookingFor = lookingFor;
    if (phone !== undefined) user.phone = phone;
    if (dob) user.dob = new Date(dob);
    if (location !== undefined) user.location = location;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPLOAD PROFILE PICTURE ================= */
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

export const uploadProfilePic = [
  upload.single("profilePic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profile_pics",
            transformation: [{ width: 300, height: 300, crop: "fill" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
/* ================= DELETE ACCOUNT ================= */
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { feedback, reasons } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found" });
    }

    // Find and delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // TODO: Store feedback in a separate collection for analytics
    // Example: await DeletionFeedback.create({ userId, feedback, reasons, deletedAt: new Date() });
    console.log(
      `User deleted: ${user.email}. Feedback: ${feedback}, Reasons: ${reasons}`,
    );

    // TODO: Send deletion confirmation email
    // await sendEmail({
    //   to: user.email,
    //   subject: "Your Romance Account Has Been Deleted",
    //   html: `<p>Your account has been permanently deleted. We appreciate your time with us!</p>`
    // });

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete account",
    });
  }
};
