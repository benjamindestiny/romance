import axios from "axios";
import User from "../models/user.js";

const FLW_SECRET = process.env.FLW_SECRET_KEY;
const FLW_BASE_URL = "https://api.flutterwave.com/v3";

/**
 * Initialize a Flutterwave payment
 * POST /api/payments/flutterwave/initialize
 * Body: { amount, currency, email, userId, planId }
 */
export const initializePayment = async (req, res) => {
  try {
    const { amount, currency = "NGN", email, userId, planId } = req.body; // ← Changed default to NGN

    if (!amount || !email) {
      return res.status(400).json({
        success: false,
        message: "Amount and email are required",
      });
    }

    const txRef = `RomApp-${userId}-${Date.now()}`;

    const response = await axios.post(
      `${FLW_BASE_URL}/payments`,
      {
        tx_ref: txRef,
        amount,
        currency,
        redirect_url: `${process.env.FRONTEND_URL}/payment-callback`,
        customer: {
          email,
          name: req.user?.name || "Customer",
        },
        customizations: {
          title: "Romance App Premium",
          description: `Payment for plan: ${planId || "subscription"}`,
          logo: "https://myromance.vercel.app/logo.png",
        },
        meta: {
          userId,
          planId: planId || "premium",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return res.json({
        success: true,
        data: { link: response.data.data.link, txRef },
        message: "Payment initialized successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: response.data.message || "Failed to initialize payment",
      });
    }
  } catch (error) {
    console.error("Flutterwave initialization error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to initialize payment",
      error: error.message,
    });
  }
};

/**
 * Verify a Flutterwave payment (called by PaymentCallback.jsx)
 * POST /api/payments/flutterwave/verify
 * Body: { txRef }
 */
export const verifyPayment = async (req, res) => {
  try {
    const { txRef } = req.body;
    if (!txRef) return res.status(400).json({ success: false, message: "Transaction reference is required" });

    const response = await axios.get(
      `${FLW_BASE_URL}/transactions/verify_by_tx_ref?tx_ref=${txRef}`,
      { headers: { Authorization: `Bearer ${FLW_SECRET}` } }
    );

    const transaction = response.data.data;

    if (response.data.status === "success" && transaction.status === "successful") {
      const { userId, planId } = transaction.meta;

      // 🔥 UPDATED TO MATCH YOUR USER MODEL
      await User.findByIdAndUpdate(
        userId,
        {
          subscriptionStatus: "pro",                    // ← This is what Collaborate.jsx checks
          subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          paymentHistory: {
            transactionId: transaction.id,
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            reference: txRef,
            timestamp: new Date(),
          },
        },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Payment verified successfully! You are now PRO 🎉",
        data: { status: transaction.status, amount: transaction.amount, currency: transaction.currency, reference: txRef },
      });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Flutterwave verification error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};

/**
 * Get payment status (used by Billing.jsx and other pages)
 * GET /api/payments/flutterwave/status
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await User.findById(userId).select("subscriptionStatus subscriptionExpiresAt paymentHistory");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      data: {
        subscriptionStatus: user.subscriptionStatus || "free",   // ← Matches Collaborate.jsx
        subscriptionExpiresAt: user.subscriptionExpiresAt || null,
        lastPayment: user.paymentHistory || null,
      },
    });
  } catch (error) {
    console.error("Get payment status error:", error.message);
    return res.status(500).json({ success: false, message: "Failed to get payment status" });
  }
};

/**
 * Handle webhook from Flutterwave (backup safety net)
 * POST /api/payments/flutterwave/webhook
 */
export const handleWebhook = async (req, res) => {
  try {
    const payload = req.body;

    if (payload.event === "charge.completed" && payload.data.status === "successful") {
      const { tx_ref, meta, amount, currency } = payload.data;

      await User.findByIdAndUpdate(
        meta.userId,
        {
          subscriptionStatus: "pro",
          subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          paymentHistory: {
            transactionId: payload.data.id,
            amount,
            currency,
            status: "successful",
            reference: tx_ref,
            timestamp: new Date(),
            source: "webhook",
          },
        },
        { new: true }
      );

      console.log(`✅ Payment successful for user ${meta.userId}, ref: ${tx_ref}`);
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(200).json({ success: true });
  }
};