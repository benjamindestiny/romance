import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  initializePayment,
  verifyPayment,
  getPaymentStatus,
  handleWebhook,
} from "../controllers/flutterwaveController.js";

const router = express.Router();

// Flutterwave payment routes

// POST /api/payments/flutterwave/initialize
// WHY: Initialize Flutterwave payment session
router.post("/flutterwave/initialize", authMiddleware, initializePayment);

// POST /api/payments/flutterwave/verify
// WHY: Verify Flutterwave payment after user returns from checkout
router.post("/flutterwave/verify", authMiddleware, verifyPayment);

// GET /api/payments/status
// WHY: Check user's subscription status
router.get("/status", authMiddleware, getPaymentStatus);

// POST /api/payments/flutterwave/webhook
// WHY: Handle webhook events from Flutterwave (charge.completed, etc.)
router.post("/flutterwave/webhook", handleWebhook);

export default router;
