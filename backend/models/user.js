import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    bio: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
      default: "https://via.placeholder.com/150?text=Profile",
    },

    interests: {
      type: [String],
      default: [],
    },

    lookingFor: {
      type: String,
      enum: ["understanding", "support", "adventure", "growth"],
      default: "understanding",
    },

    // User schema || Streaks || Milestones
    dailyStreak: { type: Number, default: 0 },
    lastLoginDate: { type: Date, default: null },
    milestone: { type: Number, default: 0 }, // total quizzes completed
    scores: {
      communication: { type: Number, default: 0 },
      emotionalIntelligence: { type: Number, default: 0 },
      conflictResolution: { type: Number, default: 0 },
      selfAwareness: { type: Number, default: 0 },
    },

    // ✅ EMAIL VERIFICATION
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: String,
    verificationTokenExpiry: Date,

    // ✅ PASSWORD RESET
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
  },
  { timestamps: true },
);

// ✅ HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ MATCH PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// ✅ REMOVE SENSITIVE DATA
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.verificationToken;
  delete obj.passwordResetToken;
  return obj;
};

const User = mongoose.model("User", userSchema);

export default User;
