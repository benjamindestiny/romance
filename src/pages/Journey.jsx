import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import StatCard from '../components/StatCard.jsx';
import MilestoneCard from '../components/MilestoneCard.jsx';
import MilestoneDetailModal from '../components/MilestoneDetailModal.jsx';
import {
  SparklesIcon,
  CalendarDaysIcon,
  StarIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon
} from '@heroicons/react/24/solid';

const MILESTONES = [
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
];

// Backend will provide this data
const JOURNEY_STATS = {
  title: 'Relationship Transformation Challenge',
  description: 'A comprehensive 90-day journey to strengthen your relationship skills and emotional intelligence.',
  dateRange: {
    start: '2025-01-01',
    end: '2025-03-31'
  },
  overallProgress: 0,  // Default: 0 - Backend will update this with actual progress percentage
  streakDays: 0,       // Default: 0 - Backend will update this with actual streak days
  totalPoints: 0       // Default: 0 - Backend will update this with actual total points
};

export default function Journey() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('timeline');

  // TODO (Backend): Replace MILESTONES with API call to fetch journey milestones
  // TODO (Backend): Replace JOURNEY_STATS with API call to fetch user journey data

  // Frontend calculations: Count milestones by status for filtering UI
  // Backend can handle this, but frontend needs it for filter button labels
  const completedCount = MILESTONES.filter(m => m.status === 'completed').length;
  const inProgressCount = MILESTONES.filter(m => m.status === 'in-progress').length;
  const lockedCount = MILESTONES.filter(m => m.status === 'locked').length;

  // Frontend filtering: Display milestones based on user-selected filter
  // Note: Backend can also implement this if pagination/performance requires it
  /* FILTER EXPLANATION:
    Using ternary operator (? :) - a simple if/else for one line
    Syntax: condition ? ifTrue : ifFalse
    
    filterType === 'all' ? MILESTONES : MILESTONES.filter(...)
    Translation: "If user clicked 'all', show ALL milestones. Otherwise, show only filtered ones"
    
    .filter(m => m.status === filterType)
    - Goes through each milestone (m)
    - Keeps only milestones where status matches what user selected
    - Example: if user clicked 'completed', keep only milestones with status='completed'
  */
  const filteredMilestones = filterType === 'all' 
    ? MILESTONES 
    : MILESTONES.filter(m => m.status === filterType);

  // Frontend event handler: Open modal when user clicks milestone
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
            <p className="text-2xl font-bold">{JOURNEY_STATS.title}</p>
            <p className="text-sm text-text-secondary mt-1">
              {JOURNEY_STATS.description}
            </p>
            <p className="text-xs text-text-secondary mt-2 flex items-center gap-2">
              <CalendarDaysIcon className="size-4" />
              {/* 
                Convert date strings to readable format using toLocaleDateString()
                Example: '2025-01-01' becomes 'Jan 1, 2025'
                
                How it works:
                new Date(dateString) - Turns text date into Date object the browser understands
                toLocaleDateString('en-US', {...options}) - Formats the date for display
                  - 'en-US' = Show in American English format
                  - month: 'short' = Show month as 3 letters (Jan, Feb, etc)
                  - day: 'numeric' = Show day as number (1, 2, 3... not 01, 02, 03)
                  - year: 'numeric' = Show year as 4 digits (2025)
              */}
              {new Date(JOURNEY_STATS.dateRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(JOURNEY_STATS.dateRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <button className="p-2 hover:bg-card-bg rounded-lg transition-colors">
            <BellIcon className="size-6 text-text-secondary" />
          </button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* MATH.FLOOR EXPLANATION:
            Math.floor() removes decimal numbers and keeps only whole numbers
            Example 1: Math.floor(5.7) = 5
            Example 2: Math.floor(125.9) = 125

            In this calculation: totalPoints * 0.1
            - 0.1 means 10% (10 out of 100)
            - If totalPoints = 1250, then 0.1 * 1250 = 125
            - We use floor() to make sure we show whole numbers (125, not 125.5)
          */}
          <StatCard 
            icon={<ChartBarIcon className="size-6 text-white mb-2" />}
            value={`${JOURNEY_STATS.overallProgress}%`}
            label="Overall Progress"
            subtext="+5% this week"
          />
          <StatCard 
            icon={<StarIcon className="size-6 text-white mb-2" />}
            value={JOURNEY_STATS.streakDays}
            label="Current Streak"
            subtext="Keep going!"
          />
          <StatCard 
            icon={<StarIcon className="size-6 text-white mb-2" />}
            value={JOURNEY_STATS.totalPoints}
            label="Total Points"
            subtext={`+${Math.floor(JOURNEY_STATS.totalPoints * 0.1)} this month`}
          />
          <StatCard 
            icon={<StarIcon className="size-6 text-white mb-2" />}
            value={`${completedCount}/${MILESTONES.length}`}
            label="Milestones"
            subtext={`${inProgressCount} in progress`}
          />
        </section>

        {/* Filter and View Controls */}
        <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
            {/* MAP EXPLANATION:
              .map() transforms array items into JSX elements
              
              Array of filter objects:
              [
                { value: 'all', label: 'All Milestones' },
                { value: 'completed', label: 'Completed', count: 2 },
                { value: 'in-progress', label: 'In Progress', count: 1 },
                { value: 'locked', label: 'Locked', count: 3 }
              ]
              
              .map(filter => {...})
              For each filter object in the array, create one button
              
              Result: 4 buttons on screen (one for each filter option)
              Each button shows: label + count (if it exists)
            */}
            {[
              { value: 'all', label: 'All Milestones' },
              { value: 'completed', label: 'Completed', count: completedCount },
              { value: 'in-progress', label: 'In Progress', count: inProgressCount },
              { value: 'locked', label: 'Locked', count: lockedCount }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                  filterType === filter.value
                    ? 'bg-primary-purple text-white'
                    : 'bg-card-bg text-text-secondary border border-gray-border/30'
                }`}
              >
                {filter.label} {filter.count !== undefined && `(${filter.count})`}
              </button>
            ))}
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
              /* MAP EXPLANATION:
                .map() transforms array items into JSX elements
                
                filteredMilestones array contains milestone objects with id, title, date, etc
                
                .map(milestone => {...})
                For each milestone in the filtered list, create one MilestoneCard component
                
                Result: One card displayed for each milestone that passes the filter
                If user selected "completed" filter, only completed milestone cards show
              */
              filteredMilestones.map((milestone) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  onClick={() => handleSelectMilestone(milestone)}
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
              {/* MAP EXPLANATION:
                .map() transforms array items into JSX elements
                
                Array: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                
                .map(day => {...})
                For each day name in the array, create one header box
                
                Result: 7 header boxes showing day names at top of calendar
              */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-text-secondary py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* ARRAY.FROM() EXPLANATION:
                Array.from() creates a new array with specified number of items.
                Think of it as: "Create an array with 31 empty slots"
                
                Syntax: Array.from({ length: 31 }, callback_function)
                - { length: 31 } = Make array with 31 slots (for 31 days of month)
                - (_, i) => { ... } = For each slot, run code. i = slot number (0, 1, 2... 30)
                - _ = We don't use first parameter, so we name it _ (unused)
                - i = Index/position (0, 1, 2... 30)
                - i + 1 = Convert to day number (1, 2, 3... 31)
                
                Result: A loop that creates one calendar day box for each number 1-31
              */}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                
                /* FIND() EXPLANATION:
                  .find() searches through array and returns FIRST item that matches condition
                  
                  MILESTONES.find(m => new Date(m.date).getDate() === day)
                  Translation: "Look through all milestones and return the one with matching day number"
                  
                  new Date(m.date).getDate()
                  - new Date(m.date) = Convert '2025-01-05' text into Date object
                  - .getDate() = Extract just the day number from date (5 from Jan 5)
                  - === day = Does this day number match the calendar day (1-31)?
                  - Result: If milestone is on Jan 5, it returns that milestone for day 5
                  
                  If no milestone found, returns: undefined (nothing)
                */
                const milestone = MILESTONES.find(m => new Date(m.date).getDate() === day);
                
                /* NEW DATE EXPLANATION:
                  new Date() with no parameters = Today's date
                  new Date().getDate() = Extract just today's day number
                  Example: If today is Feb 8, 2026, getDate() returns 8
                  
                  isToday checks: Does calendar day number match today's day number?
                  If yes, highlight the calendar box with a ring (ring-2 ring-primary-purple)
                */
                const isToday = new Date().getDate() === day;
                const statusColors = {
                  completed: 'bg-green-500/10 border-green-500/30',
                  'in-progress': 'bg-blue-500/10 border-blue-500/30',
                  locked: 'bg-gray-500/10 border-gray-500/30'
                };

                return (
                  <div
                    key={day}
                    onClick={() => milestone && handleSelectMilestone(milestone)}
                    className={`aspect-square rounded-lg border flex items-center justify-center text-sm font-medium transition-all ${
                      milestone
                        ? `${statusColors[milestone.status]} border-2 cursor-pointer hover:scale-105`
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
      <MilestoneDetailModal 
        milestone={selectedMilestone}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <BottomNav />
    </div>
  );
}

