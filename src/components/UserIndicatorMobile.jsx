import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function UserIndicatorMobile() {
  return (
    <div className="md:hidden fixed bottom-14 left-0 right-0 bg-dark-bg border-t border-gray-border p-4 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="https://via.placeholder.com/40?text=SM" alt="Sarah Mitchell" className="size-10 rounded-full" />
          <p className="font-semibold">Sarah Mitchell</p>
        </div>
        <Link to="/settings">
          <Cog6ToothIcon className="size-6 text-text-secondary cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}