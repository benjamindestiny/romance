/**
 * COLLABORATE PAGE - Couple Quiz Rooms
 *
 * PURPOSE: Let couples create/join rooms and play quizzes together
 *
 * FLOW:
 * 1. Menu View: Show instructions + "Create Room" / "Join Room" buttons
 * 2. Create View: Display room code to share with partner
 * 3. Join View: Input code you received from partner
 * 4. Room View: See participants + select quiz to play
 *
 * HOW IT WORKS:
 * - User A: Creates room → Gets 6-char code (ABC123)
 * - User A: Copies code & sends via WhatsApp/text (external app)
 * - User B: Receives code via WhatsApp
 * - User B: Opens Romance app → Collaborate → "Join Room"
 * - User B: Enters code "ABC123"
 * - Both: Now in same room, can play quizzes together
 *
 * WHY THIS DESIGN?
 * - Simple: No database tracking of friendships/requests
 * - Secure: Code is unique & expires in 24 hours
 * - Lightweight: Use existing messaging apps for communication
 * - Privacy: Only 2 people can be in a room
 *
 * TECHNICAL:
 * - Backend: /api/rooms/create, /api/rooms/join endpoints
 * - State: view = "menu" | "create" | "join" | "room"
 * - Token: Stored in localStorage from login
 */

import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import LogoLoading from "../components/LogoLoading.jsx";
import {
  LinkIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

export default function Collaborate() {
  const [showLoader, setShowLoader] = useState(true);
  const [view, setView] = useState("menu"); // menu, create, join, room
  const [roomCode, setRoomCode] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const token = sessionStorage.getItem("token");

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rooms/create`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setRoomCode(response.data.roomCode);
      setRoomId(response.data.roomId);
      setView("create");
      toast.success("Room created! Share the code with your partner.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create room");
      console.error("Create room error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();

    if (!joinCode.trim()) {
      toast.error("Please enter a room code");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/rooms/join",
        { roomCode: joinCode },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setRoomId(response.data.roomId);
      setRoomCode(response.data.roomCode);
      setRoomData(response.data);
      setView("room");
      toast.success("Joined room successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join room");
      console.error("Join room error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Room code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-primary-purple text-2xl font-bold md:hidden mb-4">
            Collaborate
          </h1>
          <p className="text-xl font-bold">Couple Quiz Challenge</p>
          <p className="text-sm text-text-secondary">
            Play quizzes together to understand each other better
          </p>
        </header>

        {/* Menu View */}
        {view === "menu" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card-bg rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-purple mb-6">
                How it works
              </h2>
              <ol className="text-left space-y-4 mb-8 text-text-secondary">
                <li>
                  <span className="bg-primary-purple text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">
                    1
                  </span>
                  Create a room or join your partner's room
                </li>
                <li>
                  <span className="bg-primary-purple text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">
                    2
                  </span>
                  Share the room code via text/WhatsApp/email
                </li>
                <li>
                  <span className="bg-primary-purple text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">
                    3
                  </span>
                  Both answer quiz questions simultaneously
                </li>
                <li>
                  <span className="bg-primary-purple text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-3 font-bold">
                    4
                  </span>
                  See compatibility results and learn about each other
                </li>
              </ol>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleCreateRoom}
                  disabled={loading}
                  className="flex-1 bg-primary-purple text-white py-3 px-6 rounded-lg font-semibold hover:brightness-90 disabled:opacity-50 transition"
                >
                  {loading ? "Creating..." : "✨ Create Room"}
                </button>
                <button
                  onClick={() => setView("join")}
                  className="flex-1 border-2 border-pink-accent text-pink-accent py-3 px-6 rounded-lg font-semibold hover:bg-pink-accent/10 transition"
                >
                  🔗 Join Room
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Room View */}
        {view === "create" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg rounded-lg p-8 text-center">
              <CheckCircleIcon className="size-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary-purple mb-2">
                Room Created!
              </h2>
              <p className="text-text-secondary mb-8">
                Share this code with your partner
              </p>

              {/* Large Room Code Display */}
              <div className="bg-dark-bg rounded-lg p-6 mb-6 border-2 border-primary-purple">
                <p className="text-sm text-text-secondary mb-2">ROOM CODE</p>
                <p className="text-5xl font-bold text-primary-purple font-mono">
                  {roomCode}
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                <button
                  onClick={copyToClipboard}
                  className="w-full bg-primary-purple text-white py-3 rounded-lg font-semibold hover:brightness-90 transition flex items-center justify-center gap-2"
                >
                  <LinkIcon className="size-5" />
                  Copy Code to Clipboard
                </button>
                <button
                  onClick={() => setView("menu")}
                  className="w-full border-2 border-text-secondary text-text-secondary py-3 rounded-lg font-semibold hover:bg-text-secondary/10 transition"
                >
                  Back
                </button>
              </div>

              <div className="bg-primary-purple/10 border border-primary-purple rounded-lg p-4 text-sm text-text-secondary">
                <p className="font-semibold text-primary-purple mb-2">
                  Share via:
                </p>
                <p className="text-xs">
                  WhatsApp • Telegram • SMS • Email • Or any messaging app
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Join Room View */}
        {view === "join" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-primary-purple mb-6 text-center">
                Join a Room
              </h2>

              <form onSubmit={handleJoinRoom} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-secondary mb-2">
                    Enter Room Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ABC123"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    maxLength="6"
                    className="w-full px-4 py-3 bg-dark-bg border border-gray-border rounded-lg text-center text-2xl font-mono text-primary-purple focus:outline-none focus:ring-2 focus:ring-primary-purple"
                  />
                  <p className="text-xs text-text-secondary mt-2">
                    Your partner will share this 6-character code with you
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || joinCode.length !== 6}
                  className="w-full bg-primary-purple text-white py-3 rounded-lg font-semibold hover:brightness-90 disabled:opacity-50 transition"
                >
                  {loading ? "Joining..." : "Join Room"}
                </button>

                <button
                  type="button"
                  onClick={() => setView("menu")}
                  className="w-full border-2 border-text-secondary text-text-secondary py-3 rounded-lg font-semibold hover:bg-text-secondary/10 transition"
                >
                  Back
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Room View */}
        {view === "room" && roomData && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-primary-purple mb-4 text-center">
                Room: {roomCode}
              </h2>

              {/* Participants */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Participants</h3>
                <div className="space-y-3">
                  {roomData.participants?.map((participant) => (
                    <div
                      key={participant.userId || Math.random()}
                      className="bg-dark-bg rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{participant.name}</p>
                        <p className="text-xs text-text-secondary">
                          Joined{" "}
                          {new Date(participant.joinedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="size-3 rounded-full bg-green-500"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiz Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Select a Quiz</h3>
                <div className="space-y-3">
                  <button className="w-full bg-primary-purple/20 hover:bg-primary-purple/30 text-primary-purple border border-primary-purple rounded-lg p-4 text-left transition">
                    💑 Couple Compatibility Quiz
                  </button>
                  <button className="w-full bg-primary-purple/20 hover:bg-primary-purple/30 text-primary-purple border border-primary-purple rounded-lg p-4 text-left transition">
                    🎯 Love Language Quiz
                  </button>
                  <button className="w-full bg-primary-purple/20 hover:bg-primary-purple/30 text-primary-purple border border-primary-purple rounded-lg p-4 text-left transition">
                    🤝 Communication Style Quiz
                  </button>
                </div>
              </div>

              <button
                onClick={() => setView("menu")}
                className="w-full border-2 border-text-secondary text-text-secondary py-3 rounded-lg font-semibold hover:bg-text-secondary/10 transition"
              >
                Leave Room
              </button>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
