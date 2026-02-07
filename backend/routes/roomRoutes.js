import express from "express";
import {
  createRoom,
  joinRoom,
  getRoom,
  updateRoomStatus,
  submitQuizAnswers,
  getQuizResults,
  leaveRoom,
} from "../controllers/roomControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All room routes require authentication
// WHY: Only logged-in users can create/join quiz rooms

// POST /api/rooms/create
// WHY: User A creates a quiz room and gets a shareable code
router.post("/create", authMiddleware, createRoom);

// POST /api/rooms/join
// WHY: User B joins with the code User A shared
router.post("/join", authMiddleware, joinRoom);

// GET /api/rooms/:roomId
// WHY: Fetch room details, participants, quiz status
router.get("/:roomId", authMiddleware, getRoom);

// PUT /api/rooms/:roomId/status
// WHY: Change room state or select a quiz
router.put("/:roomId/status", authMiddleware, updateRoomStatus);

// POST /api/rooms/:roomId/submit
// WHY: Submit quiz answers and calculate compatibility
router.post("/:roomId/submit", authMiddleware, submitQuizAnswers);

// GET /api/rooms/:roomId/results
// WHY: Get compatibility score and answer comparisons after quiz
router.get("/:roomId/results", authMiddleware, getQuizResults);

// DELETE /api/rooms/:roomId/leave
// WHY: Leave room (deletes if empty)
router.delete("/:roomId/leave", authMiddleware, leaveRoom);

export default router;
