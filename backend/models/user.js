import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // Basic auth info
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Profile info for discover/search
    name: {
      type: String,
      required: true,
    },

    // Public profile visible to others
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "https://via.placeholder.com/150?text=Profile",
      // WHY: Profile picture makes discovery more engaging
    },

    // What they're interested in (for matching)
    interests: {
      type: [String],
      default: [],
      // WHY: Interests help find compatible partners
      // Example: ["cooking", "gaming", "travel", "music"]
    },

    // What they're looking for in a partner
    lookingFor: {
      type: String,
      enum: ["understanding", "support", "adventure", "growth"],
      default: "understanding",
      // WHY: Enum ensures consistency - tells us relationship goals
    },

    // Email verification status
    isEmailVerified: {
      type: Boolean,
      default: false,
      // WHY: Prevent fake emails - verification code sent to email
    },
    emailVerificationCode: {
      type: String,
    },
    emailVerificationExpires: {
      type: Date,
    },

    // Password reset tokens
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate salt and hash password
    // Salt rounds = 10: Balance between security and speed
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method: Compare plain password with hashed password
// WHY: During login, compare what user typed with what we stored
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
