import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { 
  FlagIcon, 
  SunIcon, 
  FireIcon, 
  ScaleIcon, 
  RocketLaunchIcon, 
  CameraIcon, 
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  LockClosedIcon,
  XMarkIcon,
  SparklesIcon,
  CalendarDaysIcon,
  StarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';

const iconMap = {
  FlagIcon,
  SunIcon,
  FireIcon,
  ScaleIcon,
  RocketLaunchIcon,
  CameraIcon
};

const statusConfig = {
  completed: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: CheckCircleIcon,
    label: 'Completed',
    color: 'text-green-400'
  },
  'in-progress': {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: ClockIcon,
    label: 'In Progress',
    color: 'text-blue-400'
  },
  locked: {
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    icon: LockClosedIcon,
    label: 'Locked',
    color: 'text-gray-400'
  }
};

const MilestoneDetailModal = ({ milestone, isOpen, onClose }) => {
  if (!isOpen || !milestone) return null;

  const IconComponent = iconMap[milestone.icon];
  const status = statusConfig[milestone.status];
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card-bg rounded-xl p-6 max-w-md w-full border border-gray-border">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-purple/20 rounded-lg">
              {IconComponent && <IconComponent className="size-6 text-primary-purple" />}
            </div>
            <div>
              <h3 className="text-lg font-bold">{milestone.title}</h3>
              <p className="text-sm text-text-secondary">
                {new Date(milestone.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <XMarkIcon className="size-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className={`flex items-center gap-2 ${status.color} mb-4`}>
            <StatusIcon className="size-5" />
            <span className="text-sm font-medium">{status.label}</span>
          </div>
        </div>

        <p className="text-text-secondary mb-6">{milestone.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-border/5 rounded-lg">
          <div>
            <p className="text-xs text-text-secondary mb-1">Points Earned</p>
            <p className="text-2xl font-bold text-primary-purple">{milestone.points}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-1">Status</p>
            <p className={`text-sm font-semibold ${status.color}`}>{status.label}</p>
          </div>
        </div>

        {milestone.status === 'in-progress' && (
          <button className="w-full bg-primary-purple hover:bg-primary-purple/80 text-white py-2 rounded-lg font-medium transition-colors mb-2">
            Update Progress
          </button>
        )}

        {milestone.status === 'locked' && (
          <p className="text-xs text-text-secondary text-center p-2 bg-gray-border/5 rounded-lg mb-2">
            Complete previous milestones to unlock this one
          </p>
        )}

        <button 
          onClick={onClose}
          className="w-full bg-gray-border/20 hover:bg-gray-border/40 text-text-primary py-2 rounded-lg font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Journey() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [viewMode, setViewMode] = useState("timeline");
  const [journeyData, setJourneyData] = useState({
    title: "Relationship Transformation Challenge",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    overallProgress: 45,
    streakDays: 12,
    totalPoints: 1250,
    description: "A comprehensive 90-day journey to strengthen your relationship skills and emotional intelligence.",
    milestones: [
      {
        id: "m1",
        title: "Define clear relationship goals",
        date: "2025-01-05",
        status: "completed",
        description: "Identified 3 specific, measurable relationship goals for personal growth and partnership improvement.",
        points: 100,
        icon: "FlagIcon"
      },
      {
        id: "m2",
        title: "Complete communication workshop",
        date: "2025-01-15",
        status: "completed",
        description: "Successfully completed the active listening and emotional expression workshop series.",
        points: 150,
        icon: "SunIcon"
      },
      {
        id: "m3",
        title: "First counseling session",
        date: "2025-02-01",
        status: "in-progress",
        description: "Schedule and attend your first session with a licensed therapist. Focus on setting the foundation.",
        points: 200,
        icon: "FireIcon"
      },
      {
        id: "m4",
        title: "Build conflict resolution skills",
        date: "2025-02-20",
        status: "locked",
        description: "Learn and practice effective techniques for handling disagreements with compassion and understanding.",
        points: 300,
        icon: "ScaleIcon"
      },
      {
        id: "m5",
        title: "Emotional intelligence breakthrough",
        date: "2025-03-10",
        status: "locked",
        description: "Develop deeper awareness of your emotions and improve your ability to empathize with your partner.",
        points: 250,
        icon: "RocketLaunchIcon"
      },
      {
        id: "m6",
        title: "Celebrate 90-day growth",
        date: "2025-03-30",
        status: "locked",
        description: "Reflect on your journey, measure progress, and celebrate the transformation you've achieved.",
        points: 250,
        icon: "CameraIcon"
      }
    ]
  });

  const filteredMilestones = timelineFilter === "all" 
    ? journeyData.milestones
    : journeyData.milestones.filter(m => m.status === timelineFilter);

  const openMilestoneDetail = (milestone) => {
    setSelectedMilestone(milestone);
    setShowDetailModal(true);
  };

  const completedCount = journeyData.milestones.filter(m => m.status === 'completed').length;
  const inProgressCount = journeyData.milestones.filter(m => m.status === 'in-progress').length;
  const lockedCount = journeyData.milestones.filter(m => m.status === 'locked').length;

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary pb-32 md:pb-0">
      <Sidebar />
      <main className='md:ml-64 p-4 md:p-6'>
        {/* Header Section */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden mb-2">
              Romance
            </h1>
            <p className="text-2xl font-bold">{journeyData.title}</p>
            <p className="text-sm text-text-secondary mt-1">
              {journeyData.description}
            </p>
            <p className="text-xs text-text-secondary mt-2 flex items-center gap-2">
              <CalendarDaysIcon className="size-4" />
              Jan 1 - Mar 31, 2025
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-card-bg rounded-lg transition-colors">
              <BellIcon className="size-6 text-text-secondary" />
            </button>
          </div>
        </header>

        {/* Stats Cards Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card-bg rounded-lg p-4 border border-gray-border/30">
            <p className="text-xs text-text-secondary mb-2 uppercase font-semibold">Overall Progress</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-primary-purple">
                {journeyData.overallProgress}%
              </p>
              <div className="flex-1 h-12 bg-progress-bg rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-purple to-pink-accent rounded-lg transition-all duration-500"
                  style={{ width: `${journeyData.overallProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-card-bg rounded-lg p-4 border border-gray-border/30">
            <p className="text-xs text-text-secondary mb-2 uppercase font-semibold">Current Streak</p>
            <p className="text-3xl font-bold">
              {journeyData.streakDays}
            </p>
            <p className="text-xs text-green-400 mt-1">🔥 Keep going!</p>
          </div>

          <div className="bg-card-bg rounded-lg p-4 border border-gray-border/30">
            <p className="text-xs text-text-secondary mb-2 uppercase font-semibold">Total Points</p>
            <p className="text-3xl font-bold text-primary-purple">
              {journeyData.totalPoints}
            </p>
            <p className="text-xs text-text-secondary mt-1">+{Math.floor(journeyData.totalPoints * 0.1)} this month</p>
          </div>

          <div className="bg-card-bg rounded-lg p-4 border border-gray-border/30">
            <p className="text-xs text-text-secondary mb-2 uppercase font-semibold">Milestones</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold">{completedCount}/{journeyData.milestones.length}</p>
              <StarIcon className="size-5 text-yellow-400" />
            </div>
            <p className="text-xs text-text-secondary mt-1">{inProgressCount} in progress</p>
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { value: "all", label: "All Milestones" },
            { value: "completed", label: "✓ Completed", count: completedCount },
            { value: "in-progress", label: "⏳ In Progress", count: inProgressCount },
            { value: "locked", label: "🔒 Locked", count: lockedCount }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setTimelineFilter(filter.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                timelineFilter === filter.value
                  ? 'bg-primary-purple text-white'
                  : 'bg-card-bg text-text-secondary hover:bg-card-bg border border-gray-border/30'
              }`}
            >
              {filter.label} {filter.count !== undefined && `(${filter.count})`}
            </button>
          ))}
        </div>

        {/* Milestones Timeline */}
        <section className="space-y-4">
          {filteredMilestones.length > 0 ? (
            filteredMilestones.map((milestone, index) => {
              const IconComponent = iconMap[milestone.icon];
              const status = statusConfig[milestone.status];
              const isLast = index === filteredMilestones.length - 1;

              return (
                <div key={milestone.id} className="relative">
                  {/* Timeline connector line */}
                  {!isLast && (
                    <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-gray-border to-transparent" />
                  )}

                  <div
                    onClick={() => openMilestoneDetail(milestone)}
                    className={`relative cursor-pointer transition-all duration-300 ${status.bg} border-l-4 ${status.border} p-5 rounded-lg hover:border-l-primary-purple hover:shadow-lg group`}
                  >
                    {/* Status Indicator Circle */}
                    <div className="absolute -left-6 top-5">
                      <div className={`w-12 h-12 rounded-full border-4 border-dark-bg flex items-center justify-center ${status.bg}`}>
                        {IconComponent && (
                          <IconComponent className={`size-6 ${status.color}`} />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="ml-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold group-hover:text-primary-purple transition-colors">
                            {milestone.title}
                          </h3>
                          <p className="text-xs text-text-secondary mt-1">
                            {new Date(milestone.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                          <p className="text-sm text-text-secondary mt-2">
                            {milestone.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className={`text-sm font-bold ${status.color}`}>
                              {status.label}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">{milestone.points} pts</p>
                          </div>
                          <ChevronRightIcon className="size-5 text-text-secondary group-hover:text-primary-purple transition-colors" />
                        </div>
                      </div>

                      {/* Progress indicator for in-progress */}
                      {milestone.status === 'in-progress' && (
                        <div className="mt-4 pt-4 border-t border-gray-border/30">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-text-secondary">Progress</span>
                            <span className="text-primary-purple font-semibold">65%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-border rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary-purple to-pink-accent w-[65%]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <SparklesIcon className="size-12 text-text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-text-secondary mb-2">No milestones found</p>
              <p className="text-xs text-text-secondary">Try adjusting your filter settings</p>
            </div>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-primary-purple/20 to-pink-accent/20 border border-primary-purple/30 rounded-lg p-6 text-center">
            <SparklesIcon className="size-8 text-primary-purple mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Ready for a new journey?</h3>
            <p className="text-sm text-text-secondary mb-4">
              Create a new transformation challenge to track your next milestone
            </p>
            <button className="bg-primary-purple hover:bg-primary-purple/80 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Start New Journey
            </button>
          </div>
        </section>
      </main>

      {/* Modal */}
      <MilestoneDetailModal 
        milestone={selectedMilestone}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />

      <BottomNav />
    </div>
  );
}

