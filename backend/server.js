// ====================== server.js ======================
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cloudinary from "cloudinary";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ===== MIDDLEWARE ===== */
app.use(
  cors({
    origin: true, // Allow all origins for testing
    credentials: true,
  }),
);
app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/rooms", roomRoutes);

/* ===== DEBUG ROUTES ===== */
app.get("/api/auth/debug", (req, res) =>
  res.json({
    status: "success",
    message: "Auth router is mounted and responding",
  }),
);

app.get("/api/debug", (req, res) =>
  res.json({ status: "success", message: "API routes work" }),
);

app.get("/", (req, res) => res.send("API is running..."));

/* ===== SERVER START ===== */
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`),
    );
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

/* ===== GLOBAL ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
