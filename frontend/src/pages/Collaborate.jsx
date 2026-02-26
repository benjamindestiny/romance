import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import LogoLoading from "../components/LogoLoading.jsx";
import { LinkIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

// Import the clean quiz data
import { coupleQuizCategories } from "../utils/quizCategories.js";

export default function Collaborate() {
  const [showLoader, setShowLoader] = useState(true);
  const [view, setView] = useState("menu");
  const [roomCode, setRoomCode] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  // Quiz states
  const [myGender, setMyGender] = useState(null);
  const [quizCategory, setQuizCategory] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const token = localStorage.getItem("token");

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  // ==================== CREATE ROOM ====================
  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rooms/create`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = res.data.room || res.data;
      setRoomCode(data.roomCode);
      setRoomId(data.id || data.roomId);
      setRoomData(data);
      setView("genderSelect");
      toast.success("Room created! Now select your gender.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  // ==================== JOIN ROOM ====================
  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return toast.error("Please enter a room code");

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rooms/join`,
        { roomCode: joinCode.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = res.data.room || res.data;
      setRoomCode(data.roomCode);
      setRoomId(data.id || data.roomId);
      setRoomData(data);
      setView("genderSelect");
      toast.success("Joined room successfully!");
    } catch (error) {
      setJoinError("Invalid room code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenderSelect = (gender) => {
    setMyGender(gender);
    setView("room");
    toast.success(`Gender set as ${gender}. Questions are now personalized.`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Room code copied to clipboard!");
  };

  const leaveRoom = () => {
    setView("menu");
    setRoomCode("");
    setRoomId("");
    setRoomData(null);
    setMyGender(null);
    setQuizCategory(null);
    setCurrentQIndex(0);
    setUserAnswers([]);
    toast.success("Left the room");
  };

  const startCoupleQuiz = (category) => {
    setQuizCategory(category);
    setCurrentQIndex(0);
    setUserAnswers([]);
    setView("playing");
    toast.success(
      `Starting ${category.displayName} – be honest with each other ❤️`,
    );
  };

  const handleAnswer = (option) => {
    const newAnswers = [
      ...userAnswers,
      { questionId: quizCategory.questions[currentQIndex].id, answer: option },
    ];
    setUserAnswers(newAnswers);

    if (currentQIndex < quizCategory.questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      submitCoupleQuiz(newAnswers);
    }
  };

  const submitCoupleQuiz = async (answers) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/rooms/${roomId}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Answers submitted! Waiting for your partner...");
      setView("room");
    } catch (error) {
      toast.error("Failed to submit answers");
    }
  };

  const currentQuestion = quizCategory?.questions[currentQIndex];
  const questionText = currentQuestion
    ? myGender === "male"
      ? currentQuestion.male
      : currentQuestion.female
    : "";

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Your existing header, menu, genderSelect, create, join, room, and playing views remain exactly the same as before */}
        {/* Only the room view category list is now using the imported data */}

        {view === "menu" && (
          <div className="max-w-md mx-auto">
            <div className="bg-card-bg rounded-lg p-8">
              <h1 className="text-3xl font-bold text-primary-purple mb-8 text-center">
                Collaborate
              </h1>
              <p className="text-text-secondary mb-8 text-center">
                Take deep quizzes together with your partner. Create a room or
                join an existing one.
              </p>

              <button
                onClick={() => setView("create")}
                disabled={loading}
                className="w-full bg-primary-purple text-white py-4 rounded-lg font-semibold mb-4 hover:bg-primary-purple/90 transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Room"}
              </button>

              <form onSubmit={handleJoinRoom} className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter room code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full p-4 bg-dark-bg border border-gray-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-purple"
                  maxLength={8}
                />
                <button
                  type="submit"
                  disabled={loading || !joinCode.trim()}
                  className="w-full bg-transparent border-2 border-primary-purple text-primary-purple py-4 rounded-lg font-semibold hover:bg-primary-purple hover:text-white transition disabled:opacity-50"
                >
                  {loading ? "Joining..." : "Join Room"}
                </button>
              </form>

              {joinError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {joinError}
                </div>
              )}
            </div>
          </div>
        )}

        {view === "create" && (
          <div className="max-w-md mx-auto">
            <div className="bg-card-bg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-primary-purple mb-6 text-center">
                Creating Room...
              </h2>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-purple"></div>
              </div>
            </div>
          </div>
        )}

        {view === "genderSelect" && (
          <div className="max-w-md mx-auto">
            <div className="bg-card-bg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-primary-purple mb-6 text-center">
                Select Your Gender
              </h2>
              <p className="text-text-secondary mb-8 text-center">
                This helps personalize the questions for a better experience.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => handleGenderSelect("male")}
                  className="w-full bg-primary-purple text-white py-4 rounded-lg font-semibold hover:bg-primary-purple/90 transition"
                >
                  Male
                </button>
                <button
                  onClick={() => handleGenderSelect("female")}
                  className="w-full bg-transparent border-2 border-primary-purple text-primary-purple py-4 rounded-lg font-semibold hover:bg-primary-purple hover:text-white transition"
                >
                  Female
                </button>
              </div>
            </div>
          </div>
        )}

        {view === "room" && roomData && myGender && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card-bg rounded-lg p-8">
              <h2 className="text-2xl font-bold text-primary-purple mb-6 text-center">
                Room: <span className="font-mono">{roomCode}</span>
              </h2>

              <h3 className="text-lg font-semibold mb-4">Choose a Deep Quiz</h3>
              <div className="grid grid-cols-1 gap-3">
                {coupleQuizCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => startCoupleQuiz(cat)}
                    className="w-full bg-primary-purple/20 hover:bg-primary-purple/30 text-primary-purple border border-primary-purple rounded-lg p-5 text-left transition-all"
                  >
                    <span className="block font-semibold text-lg">
                      {cat.displayName}
                    </span>
                    <span className="text-xs text-text-secondary">
                      8 tough questions • Very revealing
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={leaveRoom}
                className="w-full mt-8 border-2 border-text-secondary text-text-secondary py-3 rounded-lg font-semibold"
              >
                Leave Room
              </button>
            </div>
          </div>
        )}

        {/* PLAYING QUIZ VIEW - unchanged */}
        {view === "playing" && quizCategory && currentQuestion && (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-6">
              <div>Question {currentQIndex + 1} / 8</div>
              <div className="text-pink-accent">For {myGender}</div>
            </div>

            <div className="bg-card-bg rounded-3xl p-8 mb-8">
              <p className="text-xl leading-relaxed mb-8">{questionText}</p>

              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-5 rounded-2xl border border-gray-border hover:border-pink-accent hover:bg-pink-accent/10 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
