import Stripe from "stripe";
import Payment from "../models/payment.js";
import Subscription from "../models/subscription.js";
import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Payment Intent
export const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, planId, currency } = req.body;
    const userId = req.user.id;

    if (!amount || !planId) {
      return res
        .status(400)
        .json({ message: "Amount and planId are required" });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || "USD",
      metadata: {
        userId,
        planId,
      },
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    res.status(500).json({
      message: "Failed to create payment intent",
      error: error.message,
    });
  }
};

// Return Stripe public key for frontend
export const getStripePublicKey = async (req, res) => {
  try {
    const publicKey = process.env.STRIPE_PUBLIC_KEY || null;
    if (!publicKey) {
      return res
        .status(500)
        .json({ message: "Stripe public key not configured" });
    }
    res.status(200).json({ publicKey });
  } catch (error) {
    console.error("Get Stripe public key error:", error);
    res.status(500).json({ message: "Failed to get stripe public key" });
  }
};

// Confirm Stripe Payment
export const confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId, planId } = req.body;
    const userId = req.user.id;

    if (!paymentIntentId || !planId) {
      return res
        .status(400)
        .json({ message: "Payment intent ID and plan ID are required" });
    }

    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Create payment record
      const payment = new Payment({
        userId,
        planId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        paymentMethod: "stripe",
        transactionId: paymentIntent.id,
        status: "completed",
        paymentDetails: {
          stripePaymentIntentId: paymentIntent.id,
          cardLast4:
            paymentIntent.charges.data[0]?.payment_method_details?.card?.last4,
          cardBrand:
            paymentIntent.charges.data[0]?.payment_method_details?.card?.brand,
        },
      });

      await payment.save();

      // Create or update subscription
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await Subscription.findOneAndUpdate(
        { userId },
        {
          userId,
          planId,
          status: "active",
          startDate: new Date(),
          endDate,
          lastPaymentId: payment._id,
        },
        { upsert: true, new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Payment confirmed and subscription activated",
        payment: {
          transactionId: payment._id,
          amount: payment.amount,
          currency: payment.currency,
          planId: planId,
        },
      });
    }

    res.status(400).json({ message: "Payment not completed" });
  } catch (error) {
    console.error("Stripe payment confirmation error:", error);
    res.status(500).json({
      message: "Failed to confirm payment",
      error: error.message,
    });
  }
};

// Create PayPal order
export const createPayPalOrder = async (req, res) => {
  try {
    const { amount, planId, currency } = req.body;
    const userId = req.user.id;

    if (!amount || !planId) {
      return res
        .status(400)
        .json({ message: "Amount and planId are required" });
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");

    // Get PayPal access token
    const tokenResponse = await axios.post(
      `https://api.${process.env.PAYPAL_MODE || "sandbox"}.paypal.com/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    // Create PayPal order
    const orderResponse = await axios.post(
      `https://api.${process.env.PAYPAL_MODE || "sandbox"}.paypal.com/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency || "USD",
              value: amount.toString(),
            },
            description: `Romance App - ${planId.toUpperCase()} Plan`,
          },
        ],
        return_url: `${process.env.FRONTEND_URL}/billing?success=true&planId=${planId}`,
        cancel_url: `${process.env.FRONTEND_URL}/billing?cancelled=true`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.status(201).json({
      success: true,
      orderId: orderResponse.data.id,
      approvalUrl: orderResponse.data.links.find(
        (link) => link.rel === "approve",
      )?.href,
    });
  } catch (error) {
    console.error("PayPal order creation error:", error);
    res.status(500).json({
      message: "Failed to create PayPal order",
      error: error.message,
    });
  }
};

// Capture PayPal payment
export const capturePayPalPayment = async (req, res) => {
  try {
    const { orderId, planId } = req.body;
    const userId = req.user.id;

    if (!orderId || !planId) {
      return res
        .status(400)
        .json({ message: "Order ID and plan ID are required" });
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");

    // Get PayPal access token
    const tokenResponse = await axios.post(
      `https://api.${process.env.PAYPAL_MODE || "sandbox"}.paypal.com/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    // Capture PayPal order
    const captureResponse = await axios.post(
      `https://api.${process.env.PAYPAL_MODE || "sandbox"}.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (captureResponse.data.status === "COMPLETED") {
      const amount =
        captureResponse.data.purchase_units[0].payments.captures[0].amount
          .value;

      // Create payment record
      const payment = new Payment({
        userId,
        planId,
        amount: parseFloat(amount),
        currency: captureResponse.data.purchase_units[0].amount.currency_code,
        paymentMethod: "paypal",
        transactionId: orderId,
        status: "completed",
        paymentDetails: {
          paypalOrderId: orderId,
        },
      });

      await payment.save();

      // Create or update subscription
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await Subscription.findOneAndUpdate(
        { userId },
        {
          userId,
          planId,
          status: "active",
          startDate: new Date(),
          endDate,
          lastPaymentId: payment._id,
        },
        { upsert: true, new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Payment captured successfully and subscription activated",
        payment: {
          transactionId: payment._id,
          amount: payment.amount,
          currency: payment.currency,
          planId: planId,
        },
      });
    }

    res.status(400).json({ message: "Payment capture failed" });
  } catch (error) {
    console.error("PayPal payment capture error:", error);
    res.status(500).json({
      message: "Failed to capture PayPal payment",
      error: error.message,
    });
  }
};
