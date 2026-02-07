import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/rooms", roomRoutes);


app.use(cors({
  origin: [
    "https://myromance.vercel.app", 
    "http://localhost:5173"
  ],
  credentials: true
}));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
