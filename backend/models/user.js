import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiry: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetTokenExpiry: {
      type: Date,
      default: null,
    },
    // Profile fields
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: null,
    },
    interests: {
      type: [String],
      default: [],
    },
    lookingFor: {
      type: String,
      enum: ["Marriage", "Dating", "Friendship", "Other"],
      default: "Marriage",
    },
  },
  { timestamps: true },
  { lastLogin: Date },
);

export default mongoose.model("user", userSchema);
