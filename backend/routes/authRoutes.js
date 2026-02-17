// ====================== authRoutes.js ======================
import express from "express";
import {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  searchUsers,
  getMe,
  updateProfile,
  getUserProfile
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


<Route path="/verify-email" element={<VerifyEmail />} />


// ==================== PUBLIC ROUTES ====================
router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


// ==================== PROTECTED ROUTES ====================
router.get("/search", authMiddleware, searchUsers);
router.get("/profile/:userId", authMiddleware, getUserProfile);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);

export default router;