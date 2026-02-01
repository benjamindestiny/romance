import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planId: {
    type: String,
    required: true,
    enum: ["basic", "premium", "Enterpries"],
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["stripe", "paypal"],
  },
  transactionId: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  paymentDetails: {
    stripePaymentIntentId: String,
    paypalOrderId: String,
    cardLast4: String,
    cardBrand: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
