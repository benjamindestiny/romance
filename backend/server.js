// ====================== server.js ======================
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/rooms", roomRoutes);

/* ===== DEBUG ROUTES ===== */
app.get("/api/auth/debug", (req, res) => res.json({ status: "success", message: "Auth router is mounted and responding" }));
app.get("/api/debug", (req, res) => res.json({ status: "success", message: "API routes work" }));
app.get("/", (req, res) => res.send("API is running..."));

/* ===== SERVER START ===== */
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before server starts
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();

/* ===== GLOBAL ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});