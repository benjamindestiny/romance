import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { FlagIcon, SunIcon, FireIcon, ScaleIcon, RocketLaunchIcon, CameraIcon } from '@heroicons/react/20/solid';

// Icon mapping - maps string names to actual components
const iconMap = {
  FlagIcon,
  SunIcon,
  FireIcon,
  ScaleIcon,
  RocketLaunchIcon,
  CameraIcon
};

export default function Journey() {
  const [journeyData, setJourneyData] = useState({
    title: "90-Day Transformation Challenge",
    startDate: "2025-01-01",
    overallProgress: 45,
    streakDays: 12,
    totalPoints: 1250,
    milestones: [
      {
        id: "m1",
        title: "Define clear goals",
        date: "2025-01-05",
        status: "completed",
        description: "Wrote down 3 specific, measurable goals for the next 90 days.",
        points: 100,
        icon: "FlagIcon"
      },
      {
        id: "m2",
        title: "Build morning routine",
        date: "2025-01-15",
        status: "completed",
        description: "5-day streak of waking up at 5:30am + meditation.",
        points: 150,
        icon: "SunIcon"
      },
      {
        id: "m3",
        title: "First gym session",
        date: "2025-02-01",
        status: "in-progress",
        description: "Complete 3 full-body workouts this week.",
        points: 200,
        icon: "FireIcon"
      },
      {
        id: "m4",
        title: "Lose first 5kg",
        date: "2025-02-20",
        status: "locked",
        description: "Track calories daily and hit protein target.",
        points: 300,
        icon: "ScaleIcon"
      },
      {
        id: "m5",
        title: "Run 5km non-stop",
        date: "2025-03-10",
        status: "locked",
        description: "Train consistently for the next 3 weeks.",
        points: 250,
        icon: "RocketLaunchIcon"
      },
      {
        id: "m6",
        title: "Final body measurement",
        date: "2025-03-30",
        status: "locked",
        description: "Take progress photos and measurements.",
        points: 250,
        icon: "CameraIcon"
      }
    ]
  });
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [viewMode, setViewMode] = useState("timeline");

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <Sidebar />
      <div>
        <h1 className="text-4xl font-bold mb-4">States are now set up.</h1>
        <p className="text-gray-400">Journey title: {journeyData.title}</p>
        <p className="text-gray-400">Progress: {journeyData.overallProgress}%</p>
        <p className="text-gray-400">Milestones count: {journeyData.milestones.length}</p>
        <p className="text-gray-400">Icons List below</p>
        {journeyData.milestones.map(d => {
          const IconComponent = iconMap[d.icon];
          return (
            <div key={d.id}>
              <p>{d.id}</p>
              <p>{d.id}</p>
              <p>{d.title}</p>
              <p>date: {d.date}</p>
              <p>status: {d.status}</p>
              <p>description: {d.description}</p>
              <p>points: {d.points}</p>
              <p>{d.icon}</p>
              {IconComponent && <IconComponent className="w-6 h-6" />}
            </div>
          );
        })}
      </div>
      <BottomNav />
    </main>
  );
}

