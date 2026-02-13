import { useState } from "react";
import LogoLoading from "../components/LogoLoading";

import {
  BellIcon,
  HeartIcon,
  CalendarDaysIcon,
  FireIcon,
  TrophyIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [showLoader, setShowLoader] = useState(true);

  const spotlights = [
    {
      id: 1,
      name: "Sarah M.",
      time: "2 hours ago",
      story:
        "I finally resolved a long-standing conflict with my colleague using active listening techniques!",
      impact: 24,
      likes: 12,
      image: "/images/spotlight1.jpg",
      avatar: "/images/avatar1.jpg",
    },
    {
      id: 2,
      name: "James L.",
      time: "5 hours ago",
      story:
        "Practiced emotional regulation during a stressful meeting. Felt proud of my growth.",
      impact: 18,
      likes: 9,
      image: "/images/spotlight2.jpg",
      avatar: "/images/avatar2.jpg",
    },
    {
      id: 3,
      name: "Emily R.",
      time: "1 day ago",
      story:
        "Used constructive feedback methods and saw immediate positive results!",
      impact: 30,
      likes: 15,
      image: "/images/spotlight3.jpg",
      avatar: "/images/avatar3.jpg",
    },
  ];

  if (showLoader) {
    return <LogoLoading onComplete={() => setShowLoader(false)} />;
  }

  return (
    <div className="min-h-screen bg-dashboard-bg text-text-primary p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <BellIcon className="size-6 text-text-secondary cursor-pointer hover:text-primary-purple transition-colors" />
      </div>

      {/* Progress Section */}
      <div className="bg-card-bg p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <SparklesIcon className="size-5 text-primary-purple" />
          Your Progress
        </h2>

        <div className="bg-card-bg p-4 rounded-lg space-y-4">
          {[
            { label: "Communication Skills", value: "0%" },
            { label: "Emotional Intelligence", value: "0%" },
            { label: "Conflict Resolution", value: "0%" },
            { label: "Self-Awareness", value: "0%" },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm">
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
              <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity">
                <div className="bg-primary-purple h-2 rounded-full w-[0%] hover:bg-pink-accent transition-colors"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Spotlights */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TrophyIcon className="size-5 text-yellow-400" />
          Success Spotlights
        </h2>

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
                    <p className="font-semibold text-white text-sm">
                      {spot.name}
                    </p>
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
                    <HeartIcon className="size-4" />
                    {spot.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
