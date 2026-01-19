import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MapIcon, CalendarIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, UsersIcon, BookOpenIcon, AcademicCapIcon, SparklesIcon, WrenchScrewdriverIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed top-0 left-0 h-full w-64 bg-dark-bg border-r border-gray-border p-4 space-y-6">
      <h1 className="text-primary-purple text-2xl font-bold">Romance</h1>
      <nav className="space-y-2">
        <Link to="/" className="flex items-center space-x-3 bg-primary-purple/20 rounded-md p-2 text-primary-purple font-medium">
          <HomeIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link to="/journey" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <MapIcon className="h-5 w-5" />
          <span>My Journey</span>
        </Link>
        <Link to="/sessions" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <CalendarIcon className="h-5 w-5" />
          <span>Sessions</span>
        </Link>
        <Link to="/messages" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <span>Messages</span>
          <span className="ml-auto bg-pink-accent text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
        </Link>
        <Link to="/explore" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <span>Explore</span>
        </Link>
        <Link to="/community" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <UsersIcon className="h-5 w-5" />
          <span>Community</span>
        </Link>
        <Link to="/resources" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <BookOpenIcon className="h-5 w-5" />
          <span>Resources</span>
        </Link>
        <Link to="/courses" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <AcademicCapIcon className="h-5 w-5" />
          <span>Courses</span>
        </Link>
        <Link to="/discover" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <SparklesIcon className="h-5 w-5" />
          <span>Discover</span>
        </Link>
        <Link to="/tools" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <WrenchScrewdriverIcon className="h-5 w-5" />
          <span>Tools</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-3 p-2 hover:bg-card-bg rounded-md">
          <Cog6ToothIcon className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}