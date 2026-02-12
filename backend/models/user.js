import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
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

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationCode: {
      type: String,
    },

    emailVerificationExpires: {
      type: Date,
    },

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

// ================= PASSWORD HASHING =================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ================= PASSWORD COMPARISON =================
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

// ================= REMOVE PASSWORD FROM JSON =================
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationCode;
  delete userObject.resetToken;
  return userObject;
};

// ================= INDEX =================
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;
