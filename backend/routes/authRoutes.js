import express from "express";
import {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  searchUsers,
  getUserProfile,
  getMe,
  updateProfile,
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
// No authentication required

// POST /api/auth/signup
router.post("/signup", signup);

// POST /api/auth/verify-email
router.post("/verify-email", verifyEmail);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST /api/auth/reset-password
router.post("/reset-password", resetPassword);

// ==================== PROTECTED ROUTES ====================
// Authentication required (JWT token in Authorization header)

// GET /api/auth/search?q=john
// WHY: Find partners by name (need token to prevent abuse)
router.get("/search", authMiddleware, searchUsers);

// GET /api/auth/profile/:userId
// WHY: Get public profile of another user
router.get("/profile/:userId", authMiddleware, getUserProfile);

// GET /api/auth/me
// WHY: Get logged-in user's profile
router.get("/me", authMiddleware, getMe);

// PUT /api/auth/profile
// WHY: Update logged-in user's profile
router.put("/profile", authMiddleware, updateProfile);

export default router;
