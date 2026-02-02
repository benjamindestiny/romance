import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import QuickActionCard from '../components/QuickActionCard.jsx';
import PremiumPanel from '../components/PremiumPanel.jsx';
import { useUser } from '../contexts/UserContext.jsx';
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

function UserGreeting() {
  const { user } = useUser();
  return (
    <div>
      <p className="text-xl font-bold">Welcome back, {user?.name || 'Guest'}</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden">Romance</h1>
            <UserGreeting />
            <p className="text-sm text-text-secondary">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="flex items-center space-x-4">
            <BellIcon className="size-6 text-text-secondary" />
            <Link to='/collaborate'><button className="bg-pink-accent text-white px-4 py-2 rounded-lg text-sm font-medium hidden md:block">Collaborate</button></Link>
          </div>
        </header>

        {/* Premium Panel */}
        <PremiumPanel />

        {/* Recent Activity */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-card-bg p-4 rounded-lg">
              <p className="text-sm text-text-secondary">Jan 20 • Workshop</p>
              <p className="font-semibold">Making Meaningful Friendships</p>
            </div>
            <div className="bg-card-bg p-4 rounded-lg">
              <p className="text-sm text-text-secondary">Jan 18 • Session</p>
              <p className="font-semibold">Dating Strategy Session</p>
            </div>
          </div>
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
              <div className="bg-card-bg p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-primary-purple font-bold text-sm uppercase">Jan 14</p>
                  <p className="font-semibold">Marriage Counseling Session</p>
                  <p className="text-sm text-text-secondary">Dr. Emily Johnson • Video Call</p>
                  <p className="text-sm text-text-secondary">Tomorrow at 2:00 PM • 60 minutes</p>
                </div>
                <Link to='/join'>
                  <button className="bg-pink-accent text-white px-4 py-2 rounded-lg text-sm">Join</button>
                </Link>
              </div>
              <div className="bg-card-bg p-4 rounded-lg">
                <p className="text-primary-purple font-bold text-sm uppercase">Jan 16</p>
                <p className="font-semibold">Personal Growth Workshop</p>
                <p className="text-sm text-text-secondary">Sarah Chen • Group Session</p>
                <p className="text-sm text-text-secondary">Thursday at 6:00 PM • 30 minutes</p>
              </div>
              <div className="bg-card-bg p-4 rounded-lg">
                <p className="text-primary-purple font-bold text-sm uppercase">Jan 18</p>
                <p className="font-semibold">Dating Strategy Session</p>
                <p className="text-sm text-text-secondary">Michael Torres • 1-on-1 Coaching</p>
                <p className="text-sm text-text-secondary">Saturday at 10:00 AM • 45 minutes</p>
              </div>
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
                  <p>0%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title="Communication Skills: 92% - Excellent progress! Keep practicing active listening and expressing your feelings clearly.">
                  <div className="bg-primary-purple h-2 rounded-full w-[0%] hover:bg-pink-accent transition-colors"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <p>Emotional Intelligence</p>
                  <p>0%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title="Emotional Intelligence: 78% - Good progress! Focus on recognizing emotions in yourself and others. Consider taking our EQ assessment.">
                  <div className="bg-primary-purple h-2 rounded-full w-[0%] hover:bg-pink-accent transition-colors"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <p>Conflict Resolution</p>
                  <p>0%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title="Conflict Resolution: 85% - Great work! Continue practicing compromise and finding win-win solutions in disagreements.">
                  <div className="bg-primary-purple h-2 rounded-full w-[0%] hover:bg-pink-accent transition-colors"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <p>Self-Awareness</p>
                  <p>0%</p>
                </div>
                <div className="bg-progress-bg h-2 rounded-full cursor-pointer hover:opacity-80 transition-opacity" title="Self-Awareness: 91% - Outstanding! You're very in tune with your thoughts and feelings. Consider mentoring others.">
                  <div className="bg-primary-purple h-2 rounded-full w-[0%] hover:bg-pink-accent transition-colors"></div>
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

        {/* Community Highlights Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Community Highlights</h2>
          <div className="space-y-4">
            <div className="bg-card-bg p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="size-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">J</span>
                </div>
                <div>
                  <p className="font-semibold">James Wilson</p>
                  <p className="text-xs text-text-secondary">1 hour ago</p>
                </div>
              </div>
              <p className="text-sm mb-2">Just completed my first month of therapy sessions. The progress has been incredible! Thanks to this amazing community for the support.</p>
              <div className="flex space-x-4 text-text-secondary text-sm">
                <div className="flex items-center">
                  <HeartIcon className="size-4 mr-1" /> 24
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="size-4 mr-1" /> 11
                </div>
              </div>
            </div>
            <div className="bg-card-bg p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="size-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Maria Garcia</p>
                  <p className="text-xs text-text-secondary">3 hours ago</p>
                </div>
              </div>
              <p className="text-sm mb-2">Anyone else in a long-distance relationship? Looking for advice on staying connected daily.</p>
              <div className="flex space-x-4 text-text-secondary text-sm">
                <div className="flex items-center">
                  <HeartIcon className="size-4 mr-1" /> 32
                </div>
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="size-4 mr-1" /> 18
                </div>
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