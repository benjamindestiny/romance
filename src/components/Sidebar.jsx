import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MapIcon, CalendarIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, UsersIcon, BookOpenIcon, AcademicCapIcon, SparklesIcon, WrenchScrewdriverIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-dark-bg border-r border-gray-border p-4 space-y-6">
      <h1 className="text-primary-purple text-2xl font-bold">Romance</h1>
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <HomeIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/journey"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <MapIcon className="h-5 w-5" />
          <span>My Journey</span>
        </NavLink>
        <NavLink
          to="/sessions"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <CalendarIcon className="h-5 w-5" />
          <span>Sessions</span>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <span>Messages</span>
          <span className="ml-auto bg-pink-accent text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span>Explore</span>
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <UsersIcon className="h-5 w-5" />
          <span>Community</span>
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <BookOpenIcon className="h-5 w-5" />
          <span>Resources</span>
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <AcademicCapIcon className="h-5 w-5" />
          <span>Courses</span>
        </NavLink>
        <NavLink
          to="/discover"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <SparklesIcon className="h-5 w-5" />
          <span>Discover</span>
        </NavLink>
        <NavLink
          to="/tools"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <WrenchScrewdriverIcon className="h-5 w-5" />
          <span>Tools</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 rounded-md p-2 ${
              isActive ? 'bg-card-bg text-primary-purple font-medium' : 'hover:bg-card-bg'
            }`
          }
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}