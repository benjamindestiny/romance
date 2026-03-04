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
    const { amount, currency = "USD", email, userId, planId } = req.body;

    // Validate inputs
    if (!amount || !email) {
      return res.status(400).json({
        success: false,
        message: "Amount and email are required",
      });
    }

    // Generate unique transaction reference
    const txRef = `RomApp-${userId}-${Date.now()}`;

    // Initialize payment with Flutterwave
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
      },
    );

    if (response.data.status === "success") {
      return res.json({
        success: true,
        data: {
          link: response.data.data.link,
          txRef,
        },
        message: "Payment initialized successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: response.data.message || "Failed to initialize payment",
      });
    }
  } catch (error) {
    console.error(
      "Flutterwave initialization error:",
      error.response?.data || error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Failed to initialize payment",
      error: error.message,
    });
  }
};

/**
 * Verify a Flutterwave payment
 * POST /api/payments/flutterwave/verify
 * Body: { txRef }
 */
export const verifyPayment = async (req, res) => {
  try {
    const { txRef } = req.body;

    if (!txRef) {
      return res.status(400).json({
        success: false,
        message: "Transaction reference is required",
      });
    }

    // Verify payment with Flutterwave
    const response = await axios.get(
      `${FLW_BASE_URL}/transactions/verify_by_tx_ref?tx_ref=${txRef}`,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET}`,
        },
      },
    );

    const transaction = response.data.data;

    if (
      response.data.status === "success" &&
      transaction.status === "successful"
    ) {
      // Update user record with premium status
      const { userId, planId } = transaction.meta;

      await User.findByIdAndUpdate(
        userId,
        {
          isPremium: true,
          premiumPlan: planId || "premium",
          premiumStartDate: new Date(),
          premiumExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          paymentHistory: {
            transactionId: transaction.id,
            amount: transaction.amount,
            currency: transaction.currency,
            status: transaction.status,
            reference: txRef,
            timestamp: new Date(),
          },
        },
        { new: true },
      );

      return res.json({
        success: true,
        message: "Payment verified successfully",
        data: {
          status: transaction.status,
          amount: transaction.amount,
          currency: transaction.currency,
          reference: txRef,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        data: {
          status: transaction.status,
        },
      });
    }
  } catch (error) {
    console.error(
      "Flutterwave verification error:",
      error.response?.data || error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

/**
 * Get payment status
 * GET /api/payments/flutterwave/status
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select(
      "isPremium premiumPlan premiumExpiryDate paymentHistory",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: {
        isPremium: user.isPremium || false,
        premiumPlan: user.premiumPlan || "free",
        premiumExpiryDate: user.premiumExpiryDate || null,
        lastPayment: user.paymentHistory || null,
      },
    });
  } catch (error) {
    console.error("Get payment status error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get payment status",
      error: error.message,
    });
  }
};

/**
 * Handle webhook from Flutterwave
 * POST /api/payments/flutterwave/webhook
 */
export const handleWebhook = async (req, res) => {
  try {
    const payload = req.body;

    // Verify webhook signature (optional but recommended)
    // const hash = crypto.createHmac('sha256', FLW_WEBHOOK_SECRET)
    //   .update(JSON.stringify(payload))
    //   .digest('hex');

    // if (hash !== req.headers['verif-hash']) {
    //   return res.status(401).json({ success: false });
    // }

    // Handle successful payment event
    if (
      payload.event === "charge.completed" &&
      payload.data.status === "successful"
    ) {
      const { tx_ref, meta, amount, currency } = payload.data;

      await User.findByIdAndUpdate(
        meta.userId,
        {
          isPremium: true,
          premiumPlan: meta.planId || "premium",
          premiumStartDate: new Date(),
          premiumExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
        { new: true },
      );

      console.log(`Payment successful for user ${meta.userId}, ref: ${tx_ref}`);
    }

    // Always respond with 200 to acknowledge webhook
    return res.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(200).json({ success: true }); // Still return 200 to prevent redelivery
  }
};
