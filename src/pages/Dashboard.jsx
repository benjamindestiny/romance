import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import StatCard from '../components/StatCard.jsx';
import QuickActionCard from '../components/QuickActionCard.jsx';
import { Link } from 'react-router-dom';
import LongDistance from '../assets/long-distance.jpg';
import OnlineDating from '../assets/online-dating.jpg';
import Friendship from '../assets/meaningful-friendship.jpg';
import { 
  BellIcon, 
  HeartIcon,
  CalendarDaysIcon,
  FireIcon,
  TrophyIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';
import { useUser } from '../contexts/UserContext.jsx';
import { useLocalStorage } from '../hooks';

export default function Dashboard() {
  const { user } = useUser();

  const [stats, setStats] = useLocalStorage('dashboardStats', {
    relationshipHealth: 72,
    upcomingSessions: [
      { id: 1, dateLabel: 'Tomorrow', title: 'Marriage Counseling Session', coach: 'Dr. Emily Johnson', type: 'Video Call', time: 'Tomorrow at 2:00 PM', duration: '60 minutes', cta: 'Join' },
      { id: 2, dateLabel: 'Thu', title: 'Personal Growth Workshop', coach: 'Sarah Chen', type: 'Group Session', time: 'Thursday at 6:00 PM', duration: '30 minutes' },
      { id: 3, dateLabel: 'Sat', title: 'Dating Strategy Session', coach: 'Michael Torres', type: '1-on-1 Coaching', time: 'Saturday at 10:00 AM', duration: '45 minutes' }
    ],
    dayStreak: 5,
    milestones: 2,
    upcomingCount: 3,
    progress: {
      communication: 92,
      emotional: 78,
      conflict: 85,
      selfAwareness: 91
    }
  });

  useEffect(() => {
    if (!stats || typeof stats.relationshipHealth !== 'number') return;
  }, [stats]);

  const today = new Date();
  const dateStr = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden">Romance</h1>
            <p className="text-xl font-bold">Welcome Back, {user?.name ?? 'Friend'}</p>
            <p className="text-sm text-text-secondary">{dateStr}</p>
          </div>
          <div className="flex items-center space-x-4">
            <BellIcon className="size-6 text-text-secondary" />
            <Link to="/collaborate">
              <button className="bg-pink-accent text-white px-4 py-2 rounded-lg text-sm font-medium hidden md:block">Collaborate</button>
            </Link>
          </div>
        </header>

        {/* Stat Cards Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<HeartIcon className="size-6 text-white mb-2 z-10" />} 
            value={`${stats.relationshipHealth}%`} 
            label="Relationship Health" 
            subtext={`${stats.relationshipHealth - 2}% this week`} 
            subtextColor="text-green-500" 
          />
          <StatCard 
            icon={<CalendarDaysIcon className="size-6 text-white mb-2 z-10" />} 
            value={stats.upcomingCount} 
            label="Upcoming Sessions" 
            subtext={`Next: ${stats.upcomingSessions[0]?.dateLabel ?? 'TBD'}`} 
          />
          <StatCard 
            icon={<FireIcon className="size-6 text-white mb-2 z-10" />} 
            value={stats.dayStreak} 
            label="Day Streak" 
            subtext="Keep it up!" 
          />
          <StatCard 
            icon={<TrophyIcon className="size-6 text-white mb-2 z-10" />} 
            value={stats.milestones} 
            label="Milestones Reached" 
            subtext={`+${stats.milestones} this month`} 
          />
        </section>

        {/* Quick Actions Section */}
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

        {/* Upcoming Sessions & Progress Section */}
        <section className="md:flex md:space-x-6 mb-8">
          <div className="md:w-[75%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
              <Link to="/sessions" className="text-primary-purple text-sm">View All</Link>
            </div>
            <div className="space-y-4">
              {stats.upcomingSessions.map((s) => (
                <div key={s.id} className="bg-card-bg p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-primary-purple font-bold text-sm uppercase">{s.dateLabel}</p>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-text-secondary">{s.coach} • {s.type}</p>
                    <p className="text-sm text-text-secondary">{s.time} • {s.duration}</p>
                  </div>
                  {s.cta ? (
                    <button className="bg-pink-accent text-white px-4 py-2 rounded-lg text-sm">{s.cta}</button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Progress</h2>
              <Link to="/progress" className="text-primary-purple text-sm">Details</Link>
            </div>
            <div className="bg-card-bg p-4 rounded-lg space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <p>Communication Skills</p>
                  <p>{stats.progress.communication}%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title={`Communication Skills: ${stats.progress.communication}% - Excellent progress!`}>
                  <div className="bg-primary-purple h-2 rounded-full hover:bg-pink-accent transition-colors" style={{ width: `${stats.progress.communication}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <p>Emotional Intelligence</p>
                  <p>{stats.progress.emotional}%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title={`Emotional Intelligence: ${stats.progress.emotional}% - Good progress!`}>
                  <div className="bg-primary-purple h-2 rounded-full hover:bg-pink-accent transition-colors" style={{ width: `${stats.progress.emotional}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <p>Conflict Resolution</p>
                  <p>{stats.progress.conflict}%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title={`Conflict Resolution: ${stats.progress.conflict}% - Great work!`}>
                  <div className="bg-primary-purple h-2 rounded-full hover:bg-pink-accent transition-colors" style={{ width: `${stats.progress.conflict}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <p>Self-Awareness</p>
                  <p>{stats.progress.selfAwareness}%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title={`Self-Awareness: ${stats.progress.selfAwareness}% - Outstanding!`}>
                  <div className="bg-primary-purple h-2 rounded-full hover:bg-pink-accent transition-colors" style={{ width: `${stats.progress.selfAwareness}%` }} />
                </div>
              </div>
            </div>
            <Link to="/report">
              <button className="w-full bg-primary-purple text-white py-3 rounded-lg mt-4 text-sm">View Full Report</button>
            </Link>
          </div>
        </section>

        {/* Recommended For You Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recommended For You</h2>
            <Link to="/recommendations" className="text-primary-purple text-sm">See More</Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            <div className="min-w-[280px] bg-card-bg rounded-lg overflow-hidden">
              <img className="w-full h-32 object-cover" src={LongDistance} loading='lazy' />
              <div className="p-4">
                <p className="text-xs text-text-secondary mb-1">Article • 8 min read</p>
                <p className="font-semibold mb-1">Building Intimacy in Long-Distance Relationships</p>
                <p className="text-sm text-text-secondary mb-2">Practical tips to maintain emotional connection across miles...</p>
                <Link to="/article" className="text-primary-purple text-sm">Read More +</Link>
              </div>
            </div>
            <div className="min-w-[280px] bg-card-bg rounded-lg overflow-hidden">
              <img className="w-full h-32 object-cover" src={Friendship} loading='lazy' />
              <div className="p-4">
                <p className="text-xs text-text-secondary mb-1">Workshop • Jan 20</p>
                <p className="font-semibold mb-1">Making Meaningful Friendships as an Adult</p>
                <p className="text-sm text-text-secondary mb-2">Join our community workshop on building lasting connections...</p>
                <Link to="/workshop" className="text-primary-purple text-sm">Join +</Link>
              </div>
            </div>
            <div className="min-w-[280px] bg-card-bg rounded-lg overflow-hidden">
              <img className="w-full h-32 object-cover" src={OnlineDating} loading='lazy' />
              <div className="p-4">
                <p className="text-xs text-text-secondary mb-1">Guide • 10 min read</p>
                <p className="font-semibold mb-1">Safety Tips for Online Dating</p>
                <p className="text-sm text-text-secondary mb-2">Learn how to stay safe while meeting new people online...</p>
                <Link to="/safety-guide" className="text-primary-purple text-sm">Read More +</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Bottom Navigation Components */}
      <BottomNav />
    </div>
  );
}