import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createRoom,
  joinRoom,
  getRoom,
  updateRoomStatus,
  submitQuizAnswers,
  leaveRoom,
} from "../controllers/roomControllers.js";

const router = express.Router();

// All room routes require authentication
router.post("/create", authMiddleware, createRoom);
router.post("/join", authMiddleware, joinRoom);
router.get("/:roomId", authMiddleware, getRoom);
router.put("/:roomId/status", authMiddleware, updateRoomStatus);
router.post("/:roomId/answers", authMiddleware, submitQuizAnswers);
router.post("/:roomId/leave", authMiddleware, leaveRoom);

export default router;
