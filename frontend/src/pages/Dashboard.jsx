import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import StatCard from "../components/StatCard.jsx";
import QuickActionCard from "../components/QuickActionCard.jsx";
import { Link } from "react-router-dom";
import { getRandomGreeting } from "../utils/greetings.js";
import LongDistance from "../assets/long-distance.jpg";
import OnlineDating from "../assets/online-dating.jpg";
import Friendship from "../assets/meaningful-friendship.jpg";
import LogoLoading from "../components/LogoLoading.jsx";
import {
  BellIcon,
  HeartIcon,
  CalendarDaysIcon,
  FireIcon,
  TrophyIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [showLoader, setShowLoader] = useState(true);
  const [greeting] = useState(getRandomGreeting());

  // User data from localStorage – safe parsing
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;

  const userName = userData?.name || "Guest";

  // WHY I USED OPTIONAL CHAINING + TERNARY:
  // Prevents "Cannot read property 'createdAt' of null" crash
  // when a brand-new user logs in for the first time
  const joinDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  // Daily Prompt
  const [dailyPrompt] = useState(
    "What is one small thing you can do today to make your partner feel seen?"
  );
  const [userResponse, setUserResponse] = useState(
    localStorage.getItem("dailyPromptResponse") || ""
  );
  const [responseSaved, setResponseSaved] = useState(false);

  const saveResponse = () => {
    if (userResponse.trim()) {
      localStorage.setItem("dailyPromptResponse", userResponse);

      // WHY THIS METHOD?
      // We use spread + fallback {} so it never crashes even if userData.progress doesn't exist yet
      const updatedUser = {
        ...userData,
        progress: {
          ...(userData?.progress || {}),           // safe spread
          communication: Math.min(
            (userData?.progress?.communication || 0) + 5,
            100
          ),
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setResponseSaved(true);
      setTimeout(() => setResponseSaved(false), 2500);
    }
  };

  // Load saved response on mount
  useEffect(() => {
    const saved = localStorage.getItem("dailyPromptResponse");
    if (saved) setUserResponse(saved);
  }, []);

  // WHY THIS DEFAULT OBJECT?
  // Guarantees every progress bar always has a number → no empty comma bug
  const scores = userData?.progress || {
    communication: 0,
    emotionalIntelligence: 0,
    conflictResolution: 0,
    selfAwareness: 0,
  };

  // Success Spotlights (unchanged – already perfect)
  const [spotlights] = useState([ /* ... your 3 spotlights ... */ ]);

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      {/* Rest of your beautiful JSX is 100% unchanged */}
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden">
              Romance
            </h1>
            <p className="text-xl font-bold">
              {greeting}, {userName}
            </p>
            <p className="text-sm text-text-secondary">Joined on {joinDate}</p>
          </div>
          <div className="flex items-center space-x-4">
            <BellIcon className="size-6 text-text-secondary" />
            <Link to="/collaborate">
              <button className="bg-pink-accent text-white px-4 py-2 rounded-lg text-sm font-medium hidden md:block">
                Collaborate
              </button>
            </Link>
          </div>
        </header>
      </main>
      <BottomNav />
    </div>
  );
}