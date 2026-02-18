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
import ProtectedRoutes from "../components/ProtectedRoutes.jsx";   // ← NEW IMPORT
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

      const updatedUser = {
        ...userData,
        progress: {
          ...(userData?.progress || {}),
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

  useEffect(() => {
    const saved = localStorage.getItem("dailyPromptResponse");
    if (saved) setUserResponse(saved);
  }, []);

  const scores = userData?.progress || {
    communication: 0,
    emotionalIntelligence: 0,
    conflictResolution: 0,
    selfAwareness: 0,
  };

  const [spotlights] = useState([
    {
      id: 1,
      name: "Aisha & Marcus",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      story: "We were on the edge of breaking up then we did the 30-day intimacy challenge. Still going strong 7 months later.",
      impact: "+42",
      time: "2 days ago",
      likes: 284,
      image: "https://picsum.photos/id/1015/600/300",
    },
    {
      id: 2,
      name: "Priya & Daniel",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      story: "Got engaged after using the conflict tools for just 3 weeks. Best decision we ever made.",
      impact: "+31",
      time: "Yesterday",
      likes: 192,
      image: "https://picsum.photos/id/870/600/300",
    },
    {
      id: 3,
      name: "Elena & Lucas",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      story: "9 months long-distance and our bond is stronger than ever. Thank you Romance.",
      impact: "+27",
      time: "4 days ago",
      likes: 157,
      image: "https://picsum.photos/id/669/600/300",
    },
  ]);

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
    <ProtectedRoute>   {/* ← ALL CONTENT IS NOW PROTECTED */}
      <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
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

          {/* Stat Cards */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<HeartIcon className="size-6 text-white mb-2" />}
              value="0%"
              label="Relationship Health"
              subtext="+0% this week"
              subtextColor="text-green-500"
            />
            <StatCard
              icon={<CalendarDaysIcon className="size-6 text-white mb-2" />}
              value="0"
              label="Upcoming Sessions"
              subtext="Next: Tomorrow"
            />
            <StatCard
              icon={<FireIcon className="size-6 text-white mb-2" />}
              value="0"
              label="Day Streak"
              subtext="Keep it up!"
            />
            <StatCard
              icon={<TrophyIcon className="size-6 text-white mb-2" />}
              value="0"
              label="Milestones Reached"
              subtext="+0 this month"
            />
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickActionCard
                to="/counseling"
                icon={<UserCircleIcon className="size-6 text-primary-purple" />}
                title="Book Counseling"
                description="Connect with a licensed therapist for your relationship."
              />
              <QuickActionCard
                to="/community"
                icon={<UsersIcon className="size-6 text-primary-purple" />}
                title="Join Community"
                description="Connect with others on similar journeys and share experiences."
              />
              <QuickActionCard
                to="/reports"
                icon={<ExclamationTriangleIcon className="size-6 text-primary-purple" />}
                title="Report an Issue"
                description="Help us keep our community safe and trustworthy."
              />
            </div>
          </section>

          {/* Daily Prompt + Progress */}
          <section className="md:flex md:space-x-6 mb-8">
            <div className="md:w-[75%]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Today's Prompt</h2>
                <span className="text-primary-purple text-sm">Reflect daily</span>
              </div>
              <div className="bg-card-bg p-6 rounded-2xl">
                <p className="text-lg leading-snug mb-6">{dailyPrompt}</p>
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Write your thoughts here..."
                  className="w-full bg-[#0F0F0F] border border-gray-border rounded-xl px-5 py-4 text-sm min-h-[110px] focus:outline-none focus:border-pink-accent resize-none"
                />
                <button
                  onClick={saveResponse}
                  className="mt-4 bg-pink-accent text-white px-8 py-3 rounded-xl text-sm font-medium w-full md:w-auto"
                >
                  Save Reflection
                </button>
                {responseSaved && (
                  <p className="text-green-400 text-sm mt-3">
                    Saved! +5 to your health score today.
                  </p>
                )}
              </div>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Progress</h2>
                <Link to="/progress" className="text-primary-purple text-sm">
                  Details
                </Link>
              </div>
              <div className="bg-card-bg p-4 rounded-lg space-y-4">
                {Object.entries(scores).map(([key, value]) => {
                  const label = key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase());
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <p>{label}</p>
                        <p>{value}%</p>
                      </div>
                      <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                        <div
                          className="bg-primary-purple h-2 rounded-full hover:bg-pink-accent transition-colors"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/journey">
                <button className="w-full bg-primary-purple text-white py-3 rounded-lg mt-4 text-sm">
                  View Full Report
                </button>
              </Link>
            </div>
          </section>

          {/* Recommended For You & Success Spotlights sections remain exactly as before */}
          {/* ... (your full recommended and spotlights sections here - unchanged) ... */}

        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}