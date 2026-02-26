import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import LogoLoading from "../components/LogoLoading.jsx";
import axios from "axios";
import {
  HeartIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function Journey() {
  const [showLoader, setShowLoader] = useState(true);
  const [userData, setUserData] = useState(null);
  const [selectedStage, setSelectedStage] = useState(2);

  const token = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const scores = userData?.scores || {};
  const healthHistory = Object.values(scores); // Use current scores for chart

  const stages = [
    {
      id: 0,
      title: "Awareness",
      subtitle: "Knowing yourself",
      progress: scores.selfAwareness || 0,
      color: "from-purple-600 to-pink-500",
    },
    {
      id: 1,
      title: "Connection",
      subtitle: "Real intimacy",
      progress: scores.communication || 0,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 2,
      title: "Growth",
      subtitle: "Healing together",
      progress: scores.emotionalIntelligence || 0,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 3,
      title: "Mastery",
      subtitle: "Thriving as one",
      progress: scores.conflictResolution || 0,
      color: "from-amber-400 to-yellow-500",
    },
  ];

  const currentStage = stages[selectedStage];

  // Simple SVG line chart
  const max = Math.max(...healthHistory) || 100;
  const points = healthHistory
    .map((v, i) => {
      const x = (i / (healthHistory.length - 1)) * 100;
      const y = 100 - (v / max) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  const addReflection = () => {
    if (!newReflection.trim()) return;
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setReflections([
      { date: today, text: newReflection, impact: "+15" },
      ...reflections,
    ]);
    setNewReflection("");
    setShowModal(false);
  };

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-purple via-pink-accent to-purple-400 bg-clip-text text-transparent">
              Your Journey
            </h1>
            <p className="text-text-secondary mt-2 text-lg">
              Week 17 • You’re doing better than you think
            </p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-primary-purple">
              {Math.round(
                Object.values(scores).reduce((a, b) => a + b, 0) /
                  Object.keys(scores).length,
              ) || 0}
            </div>
            <div className="uppercase text-xs tracking-[3px] text-green-400">
              Health Score ↑
            </div>
          </div>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stages.map((stage) => (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`bg-card-bg rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedStage === stage.id ? "ring-2 ring-pink-accent scale-105" : "hover:ring-1 hover:ring-primary-purple/30"}`}
            >
              <div
                className={`h-1.5 bg-gradient-to-r ${stage.color} rounded w-[${stage.progress}%] mb-6`}
              />
              <div className="font-bold text-2xl">{stage.title}</div>
              <div className="text-text-secondary">{stage.subtitle}</div>
              <div className="mt-8 text-sm text-primary-purple font-medium">
                {stage.progress}% complete
              </div>
            </div>
          ))}
        </div>

        {/* Stage Detail + Chart */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Stage Info */}
          <div className="lg:col-span-5 bg-card-bg rounded-3xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="uppercase text-xs tracking-widest text-pink-accent">
                  CURRENT STAGE
                </div>
                <div className="text-4xl font-bold mt-1">
                  {currentStage.title}
                </div>
              </div>
              <SparklesIcon className="size-10 text-pink-accent/70" />
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">
              {currentStage.subtitle} • You’ve grown so much here already.
            </p>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-3 flex justify-between">
                  <span>Weekly Goal</span>
                  <span className="text-green-400">3/4 done</span>
                </div>
                <div className="h-3 bg-progress-bg rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-purple to-pink-accent h-full w-[75%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Health Trend Chart */}
          <div className="lg:col-span-7 bg-card-bg rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-xl">Health Trend</h3>
                <p className="text-green-400 text-sm">
                  Your progress across categories
                </p>
              </div>
              <ChartBarIcon className="size-7 text-text-secondary" />
            </div>

            <div className="h-64 relative">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
              >
                {/* Area fill */}
                <polygon
                  points={`0,100 ${points} 100,100`}
                  fill="url(#grad)"
                  opacity="0.15"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Dots */}
                {healthHistory.map((v, i) => {
                  const x = (i / (healthHistory.length - 1)) * 100;
                  const y = 100 - (v / max) * 90;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="1.8"
                      fill="#fff"
                      stroke="#EC4899"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between text-xs text-text-secondary mt-3 px-1">
              {healthHistory.map((_, i) => (
                <div key={i}>W{i + 1}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Actions */}
        <div className="bg-card-bg rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <HeartIcon className="size-6 text-pink-accent" />
            <h3 className="font-semibold text-xl">Your Journey Milestones</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-dark-bg rounded-xl">
              <div>
                <div className="font-medium">Quizzes Completed</div>
                <div className="text-sm text-text-secondary">
                  Total growth sessions
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-purple">
                {userData?.milestone || 0}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-dark-bg rounded-xl">
              <div>
                <div className="font-medium">Current Streak</div>
                <div className="text-sm text-text-secondary">
                  Days of consistent growth
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-purple">
                {userData?.dailyStreak || 0}
              </div>
            </div>

            <div className="flex justify-between items-center p-4 bg-dark-bg rounded-xl">
              <div>
                <div className="font-medium">Account Created</div>
                <div className="text-sm text-text-secondary">
                  Days since joining
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-purple">
                {userData?.createdAt
                  ? Math.floor(
                      (new Date() - new Date(userData.createdAt)) /
                        (1000 * 60 * 60 * 24),
                    )
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
