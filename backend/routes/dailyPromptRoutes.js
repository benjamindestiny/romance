import express from "express";
import { saveDailyPrompt } from "../controllers/dailyPromptController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveDailyPrompt);

export default router;
