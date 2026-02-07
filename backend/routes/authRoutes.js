import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  searchUsers,
  getUserProfile,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/search", searchUsers);
router.get("/profile/:userId", getUserProfile);

export default router;
