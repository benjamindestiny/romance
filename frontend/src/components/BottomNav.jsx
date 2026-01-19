import { Link } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/solid';

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-bg border-t border-gray-border flex justify-around py-2 z-20">
      <Link to="/" className="flex flex-col items-center space-y-1 text-text-secondary">
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/sessions" className="flex flex-col items-center space-y-1 text-text-secondary">
        <CalendarIcon className="h-6 w-6" />
        <span className="text-xs">Sessions</span>
      </Link>
      <Link to="/messages" className="flex flex-col items-center space-y-1 text-text-secondary">
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
        <span className="text-xs">Messages</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center space-y-1 text-text-secondary">
        <UserIcon className="h-6 w-6" />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  );
}