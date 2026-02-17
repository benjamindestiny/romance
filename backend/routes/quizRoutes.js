import express from "express";
import { submitQuiz } from "../controllers/quizControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitQuiz);

export default router;
