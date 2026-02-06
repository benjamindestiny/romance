import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { FlagIcon, SunIcon, FireIcon, ScaleIcon, RocketLaunchIcon, CameraIcon, BellIcon } from '@heroicons/react/20/solid';

const iconMap = {
  FlagIcon,
  SunIcon,
  FireIcon,
  ScaleIcon,
  RocketLaunchIcon,
  CameraIcon
};

export default function Journey() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [viewMode, setViewMode] = useState("timeline");
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

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Sidebar />
      <main className='md:ml-64 p-4 md:p-6'>
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden">
              Romance
            </h1>
            <p className="text-xl font-bold">My Journey</p>
            <p className="text-sm text-text-secondary">
              Track your growth, milestones, and progress
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <BellIcon className="size-6 text-text-secondary" />
          </div>
        </header>
        <section className="bg-card-bg rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-sm text-text-secondary mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-primary-purple">
                  {journeyData.overallProgress}%
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary mb-1">Streak</p>
                <p className="text-3xl font-bold">
                  {journeyData.streakDays} days
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Total Points</p>
              <p className="text-3xl font-bold">
                {journeyData.totalPoints}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Milestones</p>
              <p className="text-3xl font-bold">
                {journeyData.milestones.length}
              </p>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}

