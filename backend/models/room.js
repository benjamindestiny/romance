// ====================== models/room.js ======================
// Room model for couple collaboration quizzes
// Fixed: Default export + clean structure

import mongoose from "mongoose";
import crypto from "crypto";

const roomSchema = new mongoose.Schema(
  {
    // Unique room code for external sharing (WhatsApp/SMS)
    roomCode: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    // Creator of the room
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Participants (max 2 people)
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["pending", "joined", "completed"],
          default: "pending",
        },
      },
    ],

    // Which quiz they are playing
    selectedQuiz: {
      type: String,
      default: null,
    },

    // Answers submitted by each person
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
    },

    // Auto-delete after 24 hours
    expiresAt: {
      type: Date,
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

// Generate unique 6-character room code
roomSchema.statics.generateRoomCode = function () {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const Room = mongoose.model("Room", roomSchema);

export default Room;