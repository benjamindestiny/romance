import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { HomeIcon, MapIcon, CalendarIcon, UsersIcon, Cog6ToothIcon, AcademicCapIcon, SparklesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import UserIndicatorMobile from './UserIndicatorMobile';
import ProfilePhoto from '../assets/nature.jpg';
import { useUser } from '../contexts/UserContext.jsx';

export default function Sidebar() {
  const location = useLocation();
  const { user, setUser } = useUser();


  return (
    <div className='flex flex-col justify-between'>
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-dark-bg border-r border-gray-border p-4 space-y-6">
        <h1 className="text-primary-purple text-2xl font-bold">Romance</h1>
        <p className="text-sm text-text-secondary">Logged in as <strong>{user?.name || 'Guest'}</strong></p>
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <HomeIcon className="size-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <AcademicCapIcon className="size-5" />
            <span>Quiz</span>
          </NavLink>
          <NavLink
            to="/journey"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <MapIcon className="size-5" />
            <span>My Journey</span>
          </NavLink>
          <NavLink
            to="/sessions"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <CalendarIcon className="size-5" />
            <span>Sessions</span>
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <UsersIcon className="size-5" />
            <span>Community</span>
          </NavLink>
          <NavLink
            to="/collaborate"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <SparklesIcon className="size-5" />
            <span>Collaborate</span>
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <ExclamationTriangleIcon className="size-5" />
            <span>Report Issue</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <Cog6ToothIcon className="size-5" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              aria-label="Demo name"
              placeholder="Set demo name"
              className="w-full bg-[#0F0F0F] border border-gray-border rounded px-3 py-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = e.target.value.trim();
                  if (value) setUser((p) => ({ ...p, name: value }));
                }
              }}
            />
            <button
              onClick={() => setUser((p) => ({ ...p, plan: p.plan === 'premium' ? 'basic' : 'premium' }))}
              className="px-3 py-2 rounded bg-primary-purple text-white text-sm"
            >Toggle Plan</button>
          </div>
          <div>
            <Link to="/settings" className="text-sm text-text-secondary">Account settings</Link>
          </div>
        </div>
      </aside>
      <div className="fixed bottom-14 left-0 right-0 bg-dark-bg border-t border-gray-border p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={ProfilePhoto} alt={user?.name || 'Guest'} className="size-10 rounded-full" />
            <div>
              <p className="font-semibold">{user?.name || 'Guest'}</p>
              <p className="text-xs text-text-secondary">Plan: <strong>{user?.plan || 'basic'}</strong></p>
            </div>
          </div>
          <Link to="/settings">
            <Cog6ToothIcon className="size-6 text-text-secondary cursor-pointer" />
          </Link>
        </div>
      </div>
      {location.pathname !== '/settings' && <UserIndicatorMobile />}
    </div>
  );
}
