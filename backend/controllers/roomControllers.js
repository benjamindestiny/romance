import Room from "../models/room.js";
import User from "../models/user.js";
import crypto from "crypto";

/**
 * ROOM CONTROLLERS - Handles Couple Quiz Collaboration
 *
 * PURPOSE: Manage quiz rooms where partners can join and play together
 *
 * KEY CONCEPTS:
 * - roomCode: Unique 6-char code (ABC123) shared between partners
 * - participants: Array of people in room (max 2)
 * - quizAnswers: Tracks answers for compatibility comparison
 * - TTL (expires): Auto-delete stale rooms after 24 hours
 *
 * FLOW:
 * 1. createRoom() → User A creates room, gets code
 * 2. joinRoom() → User B joins with code
 * 3. getRoom() → Fetch room details and participants
 * 4. updateRoomStatus() → Change room state (waiting→playing→completed)
 * 5. submitQuizAnswers() → Save answers during quiz
 * 6. leaveRoom() → User leaves, room deletes if empty
 */

/* ================= CREATE ROOM ================= */
/**
 * Creates a new quiz room for a couple
 *
 * WHY THIS WORKS:
 * - Generates cryptographically random 6-char code (crypto.randomBytes)
 * - Makes it easy to share manually (can say it out loud, type in text)
 * - Not sequential (can't guess next code)
 * - Unique constraint prevents collisions
 *
 * WHAT HAPPENS:
 * 1. Get user ID from auth token
 * 2. Generate random room code
 * 3. Create room with creator as first participant
 * 4. Return code so user can share with partner
 *
 * RESPONSE:
 * {
 *   roomCode: "A3B2C1",      // Share this with partner
 *   roomId: "507f...",       // Internal ID (for API calls)
 *   message: "Room created..."
 * }
 */
export const createRoom = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware (we'll need to add this)

    // Generate unique 6-character room code
    const roomCode = crypto.randomBytes(3).toString("hex").toUpperCase();

    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const room = await Room.create({
      roomCode,
      createdBy: userId,
      participants: [
        {
          userId,
          name: user.name,
        },
      ],
    });

    res.status(201).json({
      roomCode,
      roomId: room._id,
      message: "Room created successfully. Share this code with your partner.",
    });
  } catch (error) {
    console.error("✗ Create room error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= JOIN ROOM ================= */
/**
 * Join an existing quiz room using room code
 *
 * WHY THIS WORKS:
 * - User B received code from User A (via WhatsApp/text externally)
 * - Searches for room by roomCode (case-insensitive)
 * - Adds User B to participants array
 * - NOW both can play quizzes together
 *
 * VALIDATIONS:
 * 1. Room exists (code is valid)
 * 2. User not already in room (prevent duplicates)
 * 3. Room not full (max 2 people)
 *
 * WHAT HAPPENS:
 * 1. Lookup room by code (ABC123)
 * 2. Verify room exists & not full
 * 3. Add current user to participants
 * 4. Save and return updated room with both participants
 *
 * RESPONSE:
 * {
 *   roomId: "507f...",
 *   roomCode: "A3B2C1",
 *   participants: [
 *     { userId: "...", name: "Alice" },
 *     { userId: "...", name: "Bob" }
 *   ],
 *   message: "Joined room successfully"
 * }
 */
export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.userId; // From auth middleware

    if (!roomCode) {
      return res.status(400).json({ message: "Room code is required" });
    }

    const room = await Room.findOne({ roomCode: roomCode.toUpperCase() });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if user is already in room
    const alreadyInRoom = room.participants.some((p) =>
      p.userId.equals(userId),
    );
    if (alreadyInRoom) {
      return res.status(400).json({ message: "You are already in this room" });
    }

    // Check if room is full
    if (room.participants.length >= room.maxParticipants) {
      return res
        .status(400)
        .json({ message: "Room is full. Maximum 2 participants." });
    }

    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add user to room
    room.participants.push({
      userId,
      name: user.name,
    });
    await room.save();

    res.json({
      roomId: room._id,
      roomCode: room.roomCode,
      participants: room.participants,
      message: "Joined room successfully",
    });
  } catch (error) {
    console.error("✗ Join room error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ROOM ================= */
export const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("createdBy", "name")
      .populate("participants.userId", "name");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    console.error("✗ Get room error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ROOM STATUS ================= */
export const updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status, currentQuiz } = req.body;

    const room = await Room.findByIdAndUpdate(
      roomId,
      { status, currentQuiz },
      { new: true },
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (error) {
    console.error("✗ Update room error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= SUBMIT QUIZ ANSWERS ================= */
export const submitQuizAnswers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { quizId, answers } = req.body;
    const userId = req.userId;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Find or create user answers in room
    let userAnswers = room.quizAnswers.find((qa) => qa.userId.equals(userId));
    if (!userAnswers) {
      userAnswers = {
        userId,
        answers: [],
      };
      room.quizAnswers.push(userAnswers);
    }

    // Add answers
    userAnswers.answers = answers.map((answer) => ({
      questionId: answer.questionId,
      answer: answer.answer,
      timestamp: new Date(),
    }));

    await room.save();

    res.json({
      message: "Answers submitted successfully",
      room,
    });
  } catch (error) {
    console.error("✗ Submit answers error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= LEAVE ROOM ================= */
export const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    const room = await Room.findByIdAndUpdate(
      roomId,
      {
        $pull: { participants: { userId } },
      },
      { new: true },
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Delete room if no participants left
    if (room.participants.length === 0) {
      await Room.findByIdAndDelete(roomId);
    }

    res.json({ message: "Left room successfully" });
  } catch (error) {
    console.error("✗ Leave room error:", error);
    res.status(500).json({ message: error.message });
  }
};
