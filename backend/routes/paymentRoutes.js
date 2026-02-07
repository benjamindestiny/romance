import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Placeholder payment routes
// WHY: Infrastructure ready for future Stripe/PayPal integration

// POST /api/payments/create-payment-intent
// WHY: Create Stripe payment for premium features
router.post("/create-payment-intent", authMiddleware, (req, res) => {
  res.json({
    success: false,
    message: "Payment feature coming soon",
  });
});

// GET /api/payments/status
// WHY: Check user's subscription status
router.get("/status", authMiddleware, (req, res) => {
  res.json({
    success: true,
    subscription: "free",
    message: "Premium features coming soon",
  });
});

export default router;
