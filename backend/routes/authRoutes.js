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
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
// No authentication required


router.post("/signup", signup);
router.post("/login", login);

// router.post("/signup", signup);


router.post("/verify-email", verifyEmail);


// router.post("/login", login);

router.post("/forgot-password", forgotPassword);


router.post("/reset-password", resetPassword);

// ==================== PROTECTED ROUTES ====================

router.get("/search", authMiddleware, searchUsers);

router.get("/profile/:userId", authMiddleware, getUserProfile);

router.get("/me", authMiddleware, getMe);

router.put("/profile", authMiddleware, updateProfile);

router.get("/verify-email", verifyEmail);



export default router;

