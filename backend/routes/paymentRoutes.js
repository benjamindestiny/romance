import express from "express";
import {
  processMastercardPayment,
  createPayPalOrder,
  capturePayPalPayment,
} from "../controllers/paymentControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Mastercard payment
router.post("/mastercard", authMiddleware, processMastercardPayment);

// PayPal payment
router.post("/paypal/create-order", authMiddleware, createPayPalOrder);
router.post("/paypal/capture-order", authMiddleware, capturePayPalPayment);

export default router;
