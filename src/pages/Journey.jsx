import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import {
  CheckCircleIcon,
  ClockIcon,
  LockClosedIcon,
  SparklesIcon,
  CalendarDaysIcon,
  StarIcon,
  ChevronRightIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

// Status Configuration
const getStatusConfig = (status) => {
  const configs = {
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
  return configs[status] || configs.locked;
};

// Modal Component
const MilestoneModal = ({ milestone, isOpen, onClose }) => {
  if (!isOpen || !milestone) return null;

  const status = getStatusConfig(milestone.status);
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card-bg rounded-xl p-6 max-w-md w-full border border-gray-border">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{milestone.title}</h3>
            <p className="text-sm text-text-secondary mt-1">
              {new Date(milestone.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <XMarkIcon className="size-6" />
          </button>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-2 ${status.color} mb-4`}>
          <StatusIcon className="size-5" />
          <span className="text-sm font-medium">{status.label}</span>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-6">{milestone.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-border/5 rounded-lg">
          <div>
            <p className="text-xs text-text-secondary mb-1">Points</p>
            <p className="text-2xl font-bold text-primary-purple">{milestone.points}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-1">Status</p>
            <p className={`text-sm font-semibold ${status.color}`}>{status.label}</p>
          </div>
        </div>

        {/* Status-specific Messages */}
        {milestone.status === 'locked' && (
          <p className="text-xs text-text-secondary text-center p-2 bg-gray-border/5 rounded-lg mb-3">
            Complete previous milestones to unlock
          </p>
        )}

        {/* Close Button */}
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

// Stats Card Component
const StatsCard = ({ label, value, icon: Icon, subtext, color = 'text-primary-purple' }) => (
  <div className="bg-card-bg rounded-lg p-4 border border-gray-border/30">
    <p className="text-xs text-text-secondary mb-2 uppercase font-semibold">{label}</p>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {subtext && <p className="text-xs text-text-secondary mt-1">{subtext}</p>}
      </div>
      {Icon && <Icon className="size-8 text-text-secondary opacity-50" />}
    </div>
  </div>
);

// Milestone Card Component
const MilestoneCard = ({ milestone, onSelect }) => {
  const status = getStatusConfig(milestone.status);
  const StatusIcon = status.icon;

  return (
    <div
      onClick={() => onSelect(milestone)}
      className={`relative cursor-pointer transition-all duration-300 ${status.bg} border-l-4 ${status.border} p-5 rounded-lg hover:shadow-lg group`}
    >
      {/* Timeline indicator */}
      <div className="absolute -left-6 top-5">
        <div className={`w-12 h-12 rounded-full border-4 border-dark-bg flex items-center justify-center ${status.bg}`}>
          <StatusIcon className={`size-6 ${status.color}`} />
        </div>
      </div>

      {/* Card content */}
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
          <div className="text-right">
            <p className={`text-sm font-bold ${status.color}`}>
              {status.label}
            </p>
            <p className="text-xs text-text-secondary mt-1">{milestone.points} pts</p>
            <ChevronRightIcon className="size-5 text-text-secondary group-hover:text-primary-purple transition-colors mt-2" />
          </div>
        </div>

        {/* Progress bar for in-progress milestones */}
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
  );
};

// Filter Button Component
const FilterButton = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
      isActive
        ? 'bg-primary-purple text-white'
        : 'bg-card-bg text-text-secondary hover:bg-card-bg border border-gray-border/30'
    }`}
  >
    {label} {count !== undefined && `(${count})`}
  </button>
);

// Main Journey Page
export default function Journey() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('timeline');

  // Journey Data
  const journey = {
    title: 'Relationship Transformation Challenge',
    description: 'A comprehensive 90-day journey to strengthen your relationship skills and emotional intelligence.',
    duration: 'Jan 1 - Mar 31, 2025',
    stats: {
      overallProgress: 45,
      streakDays: 12,
      totalPoints: 1250
    },
    milestones: [
      {
        id: 'm1',
        title: 'Define clear relationship goals',
        date: '2025-01-05',
        status: 'completed',
        description: 'Identified 3 specific, measurable relationship goals for personal growth and partnership improvement.',
        points: 100
      },
      {
        id: 'm2',
        title: 'Complete communication workshop',
        date: '2025-01-15',
        status: 'completed',
        description: 'Successfully completed the active listening and emotional expression workshop series.',
        points: 150
      },
      {
        id: 'm3',
        title: 'First counseling session',
        date: '2025-02-01',
        status: 'in-progress',
        description: 'Schedule and attend your first session with a licensed therapist. Focus on setting the foundation.',
        points: 200
      },
      {
        id: 'm4',
        title: 'Build conflict resolution skills',
        date: '2025-02-20',
        status: 'locked',
        description: 'Learn and practice effective techniques for handling disagreements with compassion and understanding.',
        points: 300
      },
      {
        id: 'm5',
        title: 'Emotional intelligence breakthrough',
        date: '2025-03-10',
        status: 'locked',
        description: 'Develop deeper awareness of your emotions and improve your ability to empathize with your partner.',
        points: 250
      },
      {
        id: 'm6',
        title: 'Celebrate 90-day growth',
        date: '2025-03-30',
        status: 'locked',
        description: 'Reflect on your journey, measure progress, and celebrate the transformation you\'ve achieved.',
        points: 250
      }
    ]
  };

  // Calculate milestone counts
  const completedCount = journey.milestones.filter(m => m.status === 'completed').length;
  const inProgressCount = journey.milestones.filter(m => m.status === 'in-progress').length;
  const lockedCount = journey.milestones.filter(m => m.status === 'locked').length;

  // Filter milestones based on type
  const getFilteredMilestones = () => {
    if (filterType === 'all') return journey.milestones;
    return journey.milestones.filter(m => m.status === filterType);
  };

  const filteredMilestones = getFilteredMilestones();

  // Handle milestone selection
  const handleSelectMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary pb-32 md:pb-0">
      <Sidebar />
      <main className='md:ml-64 p-4 md:p-6'>

        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden mb-2">
              Romance
            </h1>
            <p className="text-2xl font-bold">{journey.title}</p>
            <p className="text-sm text-text-secondary mt-1">
              {journey.description}
            </p>
            <p className="text-xs text-text-secondary mt-2 flex items-center gap-2">
              <CalendarDaysIcon className="size-4" />
              {journey.duration}
            </p>
          </div>
          <button className="p-2 hover:bg-card-bg rounded-lg transition-colors">
            <BellIcon className="size-6 text-text-secondary" />
          </button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            label="Overall Progress"
            value={`${journey.stats.overallProgress}%`}
            icon={ChartBarIcon}
            color="text-primary-purple"
          />
          <StatsCard 
            label="Current Streak"
            value={journey.stats.streakDays}
            subtext="🔥 Keep going!"
            color="text-green-400"
          />
          <StatsCard 
            label="Total Points"
            value={journey.stats.totalPoints}
            subtext={`+${Math.floor(journey.stats.totalPoints * 0.1)} this month`}
            color="text-primary-purple"
          />
          <StatsCard 
            label="Milestones"
            value={`${completedCount}/${journey.milestones.length}`}
            subtext={`${inProgressCount} in progress`}
            icon={StarIcon}
            color="text-yellow-400"
          />
        </section>

        {/* Filter and View Controls */}
        <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            <FilterButton
              label="All Milestones"
              isActive={filterType === 'all'}
              onClick={() => setFilterType('all')}
            />
            <FilterButton
              label="✓ Completed"
              count={completedCount}
              isActive={filterType === 'completed'}
              onClick={() => setFilterType('completed')}
            />
            <FilterButton
              label="⏳ In Progress"
              count={inProgressCount}
              isActive={filterType === 'in-progress'}
              onClick={() => setFilterType('in-progress')}
            />
            <FilterButton
              label="🔒 Locked"
              count={lockedCount}
              isActive={filterType === 'locked'}
              onClick={() => setFilterType('locked')}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'timeline'
                  ? 'bg-primary-purple text-white'
                  : 'bg-card-bg text-text-secondary border border-gray-border/30'
              }`}
            >
              <ChartBarIcon className="size-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'calendar'
                  ? 'bg-primary-purple text-white'
                  : 'bg-card-bg text-text-secondary border border-gray-border/30'
              }`}
            >
              <CalendarIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <section className="space-y-4">
            {filteredMilestones.length > 0 ? (
              filteredMilestones.map((milestone) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  onSelect={handleSelectMilestone}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <SparklesIcon className="size-12 text-text-secondary mx-auto mb-4 opacity-50" />
                <p className="text-text-secondary mb-2">No milestones found</p>
                <p className="text-xs text-text-secondary">Try adjusting your filter settings</p>
              </div>
            )}
          </section>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <section className="bg-card-bg rounded-lg p-6 border border-gray-border/30">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CalendarIcon className="size-6 text-primary-purple" />
              Journey Calendar
            </h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-text-secondary py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const milestone = journey.milestones.find(m => new Date(m.date).getDate() === day);
                const isToday = new Date().getDate() === day;
                const status = milestone ? getStatusConfig(milestone.status) : null;

                return (
                  <div
                    key={day}
                    onClick={() => milestone && handleSelectMilestone(milestone)}
                    className={`aspect-square rounded-lg border flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${
                      milestone
                        ? `${status.bg} ${status.border} border-2 hover:scale-105`
                        : 'bg-gray-border/5 border-gray-border/20'
                    } ${isToday ? 'ring-2 ring-primary-purple' : ''}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Call to Action */}
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
      <MilestoneModal 
        milestone={selectedMilestone}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <BottomNav />
    </div>
  );
}

