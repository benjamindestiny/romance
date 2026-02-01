import express from "express";
import {
  createStripePaymentIntent,
  confirmStripePayment,
  createPayPalOrder,
  capturePayPalPayment,
} from "../controllers/paymentControllers.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Stripe payment
router.post("/stripe/create-intent", authMiddleware, createStripePaymentIntent);
router.post("/stripe/confirm", authMiddleware, confirmStripePayment);

// PayPal payment
router.post("/paypal/create-order", authMiddleware, createPayPalOrder);
router.post("/paypal/capture-order", authMiddleware, capturePayPalPayment);

export default router;
