import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import roomRoutes from "./routes/roomRoutes.js"; 




connectDB();

const app = express();

/* ===== CORS CONFIG ===== */
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

/* ===== MIDDLEWARE ===== */
app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/rooms", roomRoutes);


// Quick debug to check if auth router loads
app.get("/api/auth/debug", (req, res) => {
  res.json({ status: "success", message: "Auth router is mounted and responding" });
});

// Another one for base API
app.get("/api/debug", (req, res) => {
  res.json({ status: "success", message: "API routes work" });
});

/* ===== TEST ROUTE (OPTIONAL) ===== */
app.get("/", (req, res) => {
  res.send("API is running...");
});


router.get("/verify-email", verifyEmail);





/* ===== SERVER ===== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
