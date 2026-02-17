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

  // User data from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = userData.name || "Guest";
  const joinDate = userData.createdAt
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
      setResponseSaved(true);
      setTimeout(() => setResponseSaved(false), 2500);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("dailyPromptResponse");
    if (saved) setUserResponse(saved);
  }, []);

  // Placeholder scores
  const [scores] = useState({
    communication: 65,
    emotionalIntelligence: 80,
    conflictResolution: 50,
    selfAwareness: 70,
  });

  // Success Spotlights
  const [spotlights] = useState([
    {
      id: 1,
      name: "Aisha & Marcus",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      story:
        "We were on the edge of breaking up then we did the 30-day intimacy challenge. Still going strong 7 months later.",
      impact: "+42",
      time: "2 days ago",
      likes: 284,
      image: "https://picsum.photos/id/1015/600/300",
    },
    {
      id: 2,
      name: "Priya & Daniel",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      story:
        "Got engaged after using the conflict tools for just 3 weeks. Best decision we ever made.",
      impact: "+31",
      time: "Yesterday",
      likes: 192,
      image: "https://picsum.photos/id/870/600/300",
    },
    {
      id: 3,
      name: "Elena & Lucas",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      story:
        "9 months long-distance and our bond is stronger than ever. Thank you Romance.",
      impact: "+27",
      time: "4 days ago",
      likes: 157,
      image: "https://picsum.photos/id/669/600/300",
    },
  ]);

  if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;

  return (
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
              icon={
                <ExclamationTriangleIcon className="size-6 text-primary-purple" />
              }
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

          {/* Progress Section */}
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
            <Link to="/report">
              <button className="w-full bg-primary-purple text-white py-3 rounded-lg mt-4 text-sm">
                View Full Report
              </button>
            </Link>
          </div>
        </section>

        {/* Recommended For You */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recommended For You</h2>
            <Link to="/recommendations" className="text-primary-purple text-sm">
              See More
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {[LongDistance, Friendship, OnlineDating].map((img, idx) => (
              <div key={idx} className="min-w-[280px] bg-card-bg rounded-lg overflow-hidden">
                <img className="w-full h-32 object-cover" src={img} loading="lazy" />
                <div className="p-4">
                  <p className="text-xs text-text-secondary mb-1">
                    {idx === 0
                      ? "Article • 8 min read"
                      : idx === 1
                      ? "Workshop • Jan 20"
                      : "Guide • 10 min read"}
                  </p>
                  <p className="font-semibold mb-1">
                    {idx === 0
                      ? "Building Intimacy in Long-Distance Relationships"
                      : idx === 1
                      ? "Making Meaningful Friendships as an Adult"
                      : "Safety Tips for Online Dating"}
                  </p>
                  <p className="text-sm text-text-secondary mb-2">
                    {idx === 0
                      ? "Practical tips to maintain emotional connection across miles..."
                      : idx === 1
                      ? "Join our community workshop on building lasting connections..."
                      : "Learn how to stay safe while meeting new people online..."}
                  </p>
                  <Link to="/" className="text-primary-purple text-sm">
                    {idx === 0 ? "Read More +" : idx === 1 ? "Join +" : "Read More +"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Success Spotlights */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <SparklesIcon className="size-5 text-pink-accent" />
              Success Spotlights
            </h2>
            <Link to="/collaborate" className="text-primary-purple text-sm">
              Join the wins
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlights.map((spot) => (
              <div
                key={spot.id}
                className="bg-card-bg rounded-3xl overflow-hidden group hover:ring-1 hover:ring-pink-accent/30 transition-all duration-300"
              >
                <div className="h-52 relative">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <img
                      src={spot.avatar}
                      alt={spot.name}
                      className="size-10 rounded-full ring-2 ring-white/50"
                    />
                    <div>
                      <p className="font-semibold text-white text-sm">{spot.name}</p>
                      <p className="text-xs text-white/70">{spot.time}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-snug text-text-secondary mb-4 line-clamp-3">
                    "{spot.story}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
                      <span className="text-xl">↑</span>
                      {spot.impact} pts
                    </div>
                    <div className="flex items-center gap-1 text-text-secondary text-sm">
                      <HeartIcon className="size-4" /> {spot.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
