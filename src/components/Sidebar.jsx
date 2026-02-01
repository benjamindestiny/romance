import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, MapIcon, CalendarIcon, UsersIcon, AcademicCapIcon, WrenchScrewdriverIcon, Cog6ToothIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import UserIndicatorMobile from './UserIndicatorMobile';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className='flex flex-col justify-between'>
      <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-dark-bg border-r border-gray-border p-4 space-y-6">
        <h1 className="text-primary-purple text-2xl font-bold">Romance</h1>
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
            <HomeIcon className="size-5" />
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
            to="/courses"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <AcademicCapIcon className="size-5" />
            <span>Courses</span>
          </NavLink>
          <NavLink
            to="/tools"
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md p-2 ${isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
              }`
            }
          >
            <WrenchScrewdriverIcon className="size-5" />
            <span>Tools</span>
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
      </aside>
      {location.pathname !== '/settings' && <UserIndicatorMobile />}
    </div>
  );
}
