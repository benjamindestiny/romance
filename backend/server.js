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


app.get("/api/test-email", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // your Gmail to receive test
      subject: "Railway Test Email via Endpoint",
      html: "<h3>This is a test email sent from Railway!</h3>",
    });
    res.json({ message: "Email sent!", response: info.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});


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
    await connectDB(); // Ensure DB is connected before server starts
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};


import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});



sendTestEmail();




startServer();

/* ===== GLOBAL ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
