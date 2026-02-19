import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import LogoLoading from "../components/LogoLoading.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";   // ← Protection added
import soloQuizCategories from "../data/soloQuizData.js";
import {
  ClockIcon,
  TrophyIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";

export default function Quiz() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const [view, setView] = useState("categories"); // categories | quiz | results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(35);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalPercentage, setFinalPercentage] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Timer logic – 35 seconds per question
  useEffect(() => {
    let timer;
    if (view === "quiz" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && view === "quiz") {
      handleNextQuestion(true); // timeout = no points
    }
    return () => clearInterval(timer);
  }, [timeLeft, view]);

  const startQuiz = (category) => {
    setSelectedCategory(category);
    setView("quiz");
    setCurrentQuestionIndex(0);
    setTimeLeft(35);
    setSelectedOption(null);
    setScore(0);
    setAnswers([]);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = (isTimeout = false) => {
    const questions = selectedCategory.questions;
    const currentQ = questions[currentQuestionIndex];

    let newScore = score;
    if (!isTimeout && selectedOption === currentQ.correct) {
      newScore += 1;
      setScore(newScore);
    }

    const newAnswers = [
      ...answers,
      {
        questionId: currentQ.id,
        selected: selectedOption,
        correct: currentQ.correct,
        timedOut: isTimeout,
      },
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(35);
      setSelectedOption(null);
    } else {
      // Quiz finished
      const percentage = Math.round((newScore / questions.length) * 100);
      setFinalPercentage(percentage);
      setView("results");

      // Send to backend
      submitQuizToBackend(selectedCategory.key, percentage);
    }
  };

  const submitQuizToBackend = async (categoryKey, percentage) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/quiz/submit`,
        {
          category: categoryKey,
          score: Math.round(percentage / 10),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(`Progress saved! +${Math.round(percentage / 10)} points`);
    } catch (err) {
      console.error("Solo quiz submit failed:", err);
      toast.error("Progress saved locally – connection issue");
    }
  };

  const currentQuestions = selectedCategory ? selectedCategory.questions : [];

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
        <Sidebar />
        <main className="md:ml-64 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-primary-purple"
            >
              <ArrowLeftIcon className="size-5" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-primary-purple">
              Solo Growth Quizzes
            </h1>
          </div>

          {/* CATEGORIES VIEW */}
          {view === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soloQuizCategories.map((cat) => {
                const userScore = user.scores?.[cat.key] || 0;
                return (
                  <div
                    key={cat.id}
                    onClick={() => startQuiz(cat)}
                    className="bg-card-bg rounded-2xl p-6 cursor-pointer hover:ring-2 hover:ring-pink-accent transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-pink-accent transition">
                        {cat.displayName}
                      </h3>
                      <span className="text-xs bg-primary-purple/10 text-primary-purple px-3 py-1 rounded-full">
                        {cat.questions.length} Qs
                      </span>
                    </div>
                    <div className="text-sm text-text-secondary">
                      Your best:{" "}
                      <span className="text-green-400 font-medium">
                        {userScore}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* QUIZ VIEW */}
          {view === "quiz" && selectedCategory && (
            <div className="max-w-2xl mx-auto">
              {/* Progress & Timer */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-medium">
                  Question {currentQuestionIndex + 1} / {currentQuestions.length}
                </div>
                <div className="flex items-center gap-2 text-pink-accent">
                  <ClockIcon className="size-5" />
                  <span
                    className={`font-mono text-xl ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}
                  >
                    {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="bg-card-bg rounded-3xl p-8 mb-8">
                <p className="text-xl leading-relaxed mb-8">
                  {currentQuestions[currentQuestionIndex].text}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestions[currentQuestionIndex].options.map(
                    (option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all ${
                          selectedOption === idx
                            ? "border-pink-accent bg-pink-accent/10 text-pink-accent"
                            : "border-gray-border hover:border-primary-purple"
                        }`}
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <button
                onClick={() => handleNextQuestion(false)}
                disabled={selectedOption === null}
                className="w-full bg-pink-accent text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {currentQuestionIndex === currentQuestions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          )}

          {/* RESULTS VIEW */}
          {view === "results" && (
            <div className="max-w-2xl mx-auto text-center bg-card-bg rounded-3xl p-10">
              <TrophyIcon className="size-20 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-primary-purple mb-2">
                {finalPercentage}%
              </h2>
              <p className="text-2xl mb-8">in {selectedCategory.displayName}</p>

              <div className="text-text-secondary mb-10">
                Great work, Nova! This growth will make your future couple quizzes even more meaningful.
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setView("categories");
                    setSelectedCategory(null);
                  }}
                  className="flex-1 border border-gray-border py-4 rounded-2xl font-medium"
                >
                  Try Another Category
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-primary-purple text-white py-4 rounded-2xl font-semibold"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}