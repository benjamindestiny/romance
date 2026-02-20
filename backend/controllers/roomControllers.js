import Room from "../models/room.js";
import User from "../models/user.js";

/* ==================== CREATE ROOM ==================== */
// POST /api/rooms/create
// WHY: User A creates a quiz room and gets a shareable code
export const createRoom = async (req, res) => {
  try {
    // FIXED: Use req.user.id (what authMiddleware actually sets)
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // Generate unique code
    let roomCode;
    let codeExists = true;

    while (codeExists) {
      roomCode = Room.generateRoomCode();
      const existing = await Room.findOne({ roomCode });
      if (!existing) codeExists = false;
    }

    const room = new Room({
      roomCode,
      createdBy: userId,           // ← Now correctly set
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

/* ==================== JOIN ROOM ==================== */
// POST /api/rooms/join
export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.user.id;        // ← FIXED here too

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

/* ==================== GET ROOM ==================== */
// GET /api/rooms/:roomId
export const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("createdBy", "name")                    // ← Fixed field name
      .populate("participants.userId", "name");

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.json({
      success: true,
      room: {
        id: room._id,
        roomCode: room.roomCode,
        status: room.status,
        selectedQuiz: room.selectedQuiz,
        participants: room.participants.map((p) => ({
          userId: p.userId._id,
          name: p.userId.name || "Unknown",
          status: p.status,
        })),
        answersSubmitted: room.quizAnswers.length,
        expiresAt: room.expiresAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ==================== UPDATE ROOM STATUS ==================== */
// PUT /api/rooms/:roomId/status
export const updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status, selectedQuiz } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    if (status) room.status = status;
    if (selectedQuiz) room.selectedQuiz = selectedQuiz;

    await room.save();

    res.json({
      success: true,
      message: "Room updated",
      room: { id: room._id, status: room.status, selectedQuiz: room.selectedQuiz },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ==================== SUBMIT QUIZ ANSWERS ==================== */
// POST /api/rooms/:roomId/submit
export const submitQuizAnswers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { answers } = req.body;
    const userId = req.user.id;        // ← FIXED

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: "Answers array required" });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    const participantIndex = room.participants.findIndex(
      (p) => p.userId.toString() === userId.toString()
    );

    if (participantIndex === -1) {
      return res.status(403).json({ success: false, message: "You are not in this room" });
    }

    room.quizAnswers = room.quizAnswers.filter(
      (qa) => qa.userId.toString() !== userId.toString()
    );

    room.quizAnswers.push({
      userId,
      answers,
      submittedAt: new Date(),
    });

    room.participants[participantIndex].status = "completed";

    const allCompleted = room.participants.every((p) => p.status === "completed");
    if (allCompleted) room.status = "completed";

    await room.save();

    res.json({
      success: true,
      message: "Answers submitted",
      submissionsCount: room.quizAnswers.length,
      roomStatus: room.status,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ==================== GET QUIZ RESULTS ==================== */
// GET /api/rooms/:roomId/results
export const getQuizResults = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("participants.userId", "name")
      .populate("quizAnswers.userId", "name");

    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    if (room.status !== "completed") {
      return res.status(400).json({ success: false, message: "Quiz not completed yet" });
    }

    let matchingAnswers = 0;
    let totalAnswers = 0;

    if (room.quizAnswers.length === 2) {
      const [submission1, submission2] = room.quizAnswers;
      submission1.answers.forEach((answer1, index) => {
        const answer2 = submission2.answers[index];
        if (answer2 && answer1.answer === answer2.answer) matchingAnswers++;
        totalAnswers++;
      });
    }

    const compatibilityScore = totalAnswers > 0 ? Math.round((matchingAnswers / totalAnswers) * 100) : 0;

    res.json({
      success: true,
      results: {
        compatibilityScore,
        matchingAnswers,
        totalAnswers,
        quiz: room.selectedQuiz,
        answers: room.quizAnswers.map((qa) => ({
          user: qa.userId?.name || "Unknown",
          answers: qa.answers,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ==================== LEAVE ROOM ==================== */
// DELETE /api/rooms/:roomId/leave
export const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;        // ← FIXED

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    room.participants = room.participants.filter(
      (p) => p.userId.toString() !== userId.toString()
    );

    if (room.participants.length === 0) {
      await Room.findByIdAndDelete(roomId);
      return res.json({ success: true, message: "Left room (deleted as it's empty)" });
    }

    room.status = "waiting";
    await room.save();

    res.json({
      success: true,
      message: "Left room",
      remainingParticipants: room.participants.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};