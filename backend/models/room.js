// ====================== roomControllers.js ======================
// All room logic for couple collaboration quizzes
// Standardized to req.user.id to match authMiddleware across the entire app

import Room from "../models/room.js";
import User from "../models/user.js";

// ==================== CREATE ROOM ====================
export const createRoom = async (req, res) => {
  try {
    const userId = req.user.id; // ← Fixed: now matches authMiddleware

    let roomCode;
    let codeExists = true;

    while (codeExists) {
      roomCode = Room.generateRoomCode();
      const existing = await Room.findOne({ roomCode });
      if (!existing) codeExists = false;
    }

    const room = new Room({
      roomCode,
      createdBy: userId,
      participants: [
        {
          userId,
          status: "joined",
        },
      ],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "waiting",
    });

    await room.save();

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      roomCode: room.roomCode,        // ← Made flat for easier frontend use
      roomId: room._id,
      room: {
        id: room._id,
        roomCode: room.roomCode,
        status: room.status,
        participants: room.participants.length,
        expiresAt: room.expiresAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== JOIN ROOM ====================
export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.user.id; // ← Fixed

    if (!roomCode) {
      return res.status(400).json({ success: false, message: "Room code required" });
    }

    const room = await Room.findOne({ roomCode });

    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    if (room.status === "expired" || new Date() > room.expiresAt) {
      return res.status(400).json({ success: false, message: "Room has expired" });
    }
    if (room.participants.length >= 2) {
      return res.status(400).json({ success: false, message: "Room is full" });
    }

    const alreadyJoined = room.participants.some(
      (p) => p.userId.toString() === userId.toString()
    );
    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: "You already joined this room" });
    }

    room.participants.push({ userId, status: "joined" });

    if (room.participants.length === 2) {
      room.status = "active";
    }

    await room.save();

    res.json({
      success: true,
      message: "Joined room successfully",
      roomCode: room.roomCode,   // ← Flat for frontend
      roomId: room._id,
      room: {
        id: room._id,
        roomCode: room.roomCode,
        status: room.status,
        participants: room.participants.length,
        selectedQuiz: room.selectedQuiz,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// The rest of the file (getRoom, updateRoomStatus, submitQuizAnswers, getQuizResults, leaveRoom)
// remains unchanged except for replacing every `req.userId` with `req.user.id`

// Example for submitQuizAnswers:
export const submitQuizAnswers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { answers } = req.body;
    const userId = req.user.id; // ← Fixed

    // ... rest of function unchanged
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

