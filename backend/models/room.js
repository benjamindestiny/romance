import mongoose from "mongoose";
import crypto from "crypto";

const roomSchema = new mongoose.Schema(
  {
    // Unique room code for external sharing (WhatsApp/SMS)
    // WHY: Couples share this code externally - no in-app messaging
    roomCode: {
      type: String,
      unique: true,
      required: true,
      index: true,
      // 6-character alphanumeric code like "ABC123"
    },

    // Creator of the room
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // WHY: Know who started the quiz session
    },

    // Both people in the quiz
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        // Status: pending, joined, completed
        status: {
          type: String,
          enum: ["pending", "joined", "completed"],
          default: "pending",
          // WHY: Track if person is still in room or finished
        },
      },
    ],

    // Quiz they're playing
    selectedQuiz: {
      type: String,
      default: null,
      // WHY: Both answer same questions for compatibility
      // Example: "love-languages", "conflict-resolution", "future-goals"
    },

    // Answers submitted by each participant
    quizAnswers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        answers: [
          {
            questionId: String,
            answer: String,
          },
        ],
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Room status
    status: {
      type: String,
      enum: ["waiting", "active", "completed", "expired"],
      default: "waiting",
      // WHY: "waiting" = one person in room, "active" = both here, "completed" = quiz done
    },

    // Auto-expiry: Room valid for 24 hours only
    expiresAt: {
      type: Date,
      index: { expires: 0 },
      // WHY: MongoDB TTL index auto-deletes old rooms (privacy + cleanup)
    },
  },
  {
    timestamps: true,
  },
);

// Static method to generate unique room code
// WHY: Called during room creation to generate shareable code
roomSchema.statics.generateRoomCode = function () {
  // Generate 6-char alphanumeric: A-Z, 0-9
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const Room = mongoose.model("Room", roomSchema);

export default Room;
