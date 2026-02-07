import Room from "../models/room.js";
import User from "../models/user.js";

// ==================== CREATE ROOM ====================
// POST /api/rooms/create
// WHY: User A creates a quiz room and gets a shareable code
export const createRoom = async (req, res) => {
  try {
    const userId = req.userId;

    // Generate unique code
    let roomCode;
    let codeExists = true;

    // Keep generating until we get unique code
    // WHY: Ensure code is unique so no collisions
    while (codeExists) {
      roomCode = Room.generateRoomCode();
      const existing = await Room.findOne({ roomCode });
      if (!existing) {
        codeExists = false;
      }
    }

    // Create new room with creator as first participant
    const room = new Room({
      roomCode,
      createdBy: userId,
      participants: [
        {
          userId,
          status: "joined",
        },
      ],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      status: "waiting", // Waiting for second person
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

// ==================== JOIN ROOM ====================
// POST /api/rooms/join
// WHY: User B joins with the code User A shared
export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = req.userId;

    if (!roomCode) {
      return res.status(400).json({
        success: false,
        message: "Room code required",
      });
    }

    // Find room by code
    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Check if room is expired
    if (room.status === "expired" || new Date() > room.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Room has expired",
      });
    }

    // Check if already 2 people in room
    if (room.participants.length >= 2) {
      return res.status(400).json({
        success: false,
        message: "Room is full",
      });
    }

    // Check if user already in room
    const alreadyJoined = room.participants.some(
      (p) => p.userId.toString() === userId.toString(),
    );
    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "You already joined this room",
      });
    }

    // Add user to room
    room.participants.push({
      userId,
      status: "joined",
    });

    // If 2 people now, room becomes active
    // WHY: Can't start quiz until both people are here
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET ROOM ====================
// GET /api/rooms/:roomId
// WHY: Fetch room details, participants, quiz status
export const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("createdBy", "firstName lastName email")
      .populate("participants.userId", "firstName lastName email");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
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
          name: `${p.userId.firstName} ${p.userId.lastName}`,
          status: p.status,
        })),
        answersSubmitted: room.quizAnswers.length,
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

// ==================== UPDATE ROOM STATUS ====================
// PUT /api/rooms/:roomId/status
// WHY: Change room state (waiting -> active -> completed)
export const updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status, selectedQuiz } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Update status and quiz if provided
    if (status) room.status = status;
    if (selectedQuiz) room.selectedQuiz = selectedQuiz;

    await room.save();

    res.json({
      success: true,
      message: "Room updated",
      room: {
        id: room._id,
        status: room.status,
        selectedQuiz: room.selectedQuiz,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== SUBMIT QUIZ ANSWERS ====================
// POST /api/rooms/:roomId/submit
// WHY: Save user's quiz answers for compatibility scoring
export const submitQuizAnswers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { answers } = req.body;
    const userId = req.userId;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers array required",
      });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Check if user is in room
    const participantIndex = room.participants.findIndex(
      (p) => p.userId.toString() === userId.toString(),
    );

    if (participantIndex === -1) {
      return res.status(403).json({
        success: false,
        message: "You are not in this room",
      });
    }

    // Remove old submission if exists
    // WHY: Allow user to resubmit answers
    room.quizAnswers = room.quizAnswers.filter(
      (qa) => qa.userId.toString() !== userId.toString(),
    );

    // Add new submission
    room.quizAnswers.push({
      userId,
      answers,
      submittedAt: new Date(),
    });

    // Mark participant as completed
    room.participants[participantIndex].status = "completed";

    // If both completed, mark room as completed
    const allCompleted = room.participants.every(
      (p) => p.status === "completed",
    );
    if (allCompleted) {
      room.status = "completed";
    }

    await room.save();

    res.json({
      success: true,
      message: "Answers submitted",
      submissionsCount: room.quizAnswers.length,
      roomStatus: room.status,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== GET QUIZ RESULTS ====================
// GET /api/rooms/:roomId/results
// WHY: Get compatibility score and comparison of answers
export const getQuizResults = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("participants.userId", "firstName lastName")
      .populate("quizAnswers.userId", "firstName lastName");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (room.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Quiz not completed yet",
      });
    }

    // Calculate compatibility score
    // WHY: Simple algorithm: matching answers / total answers
    let matchingAnswers = 0;
    let totalAnswers = 0;

    if (room.quizAnswers.length === 2) {
      const [submission1, submission2] = room.quizAnswers;

      // Compare answers
      submission1.answers.forEach((answer1, index) => {
        const answer2 = submission2.answers[index];
        if (answer2 && answer1.answer === answer2.answer) {
          matchingAnswers++;
        }
        totalAnswers++;
      });
    }

    const compatibilityScore =
      totalAnswers > 0 ? Math.round((matchingAnswers / totalAnswers) * 100) : 0;

    res.json({
      success: true,
      results: {
        compatibilityScore,
        matchingAnswers,
        totalAnswers,
        quiz: room.selectedQuiz,
        answers: room.quizAnswers.map((qa) => ({
          user: `${qa.userId.firstName} ${qa.userId.lastName}`,
          answers: qa.answers,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== LEAVE ROOM ====================
// DELETE /api/rooms/:roomId/leave
// WHY: User exits room, delete if empty
export const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.userId;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Remove user from room
    room.participants = room.participants.filter(
      (p) => p.userId.toString() !== userId.toString(),
    );

    // If no one left, delete room
    // WHY: Clean up empty rooms
    if (room.participants.length === 0) {
      await Room.findByIdAndDelete(roomId);
      return res.json({
        success: true,
        message: "Left room (deleted as it's empty)",
      });
    }

    // If someone still here, update room status
    room.status = "waiting"; // Back to waiting for new person
    await room.save();

    res.json({
      success: true,
      message: "Left room",
      remainingParticipants: room.participants.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
