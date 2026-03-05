import React, { useState, useEffect } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import ProfilePhoto from '../assets/nature.jpg';

export default function UserIndicatorMobile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // example: load from localStorage or call an API
    const stored = localStorage.getItem('user');
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  const userName = userData?.name || 'Guest';
  const photo = userData?.profilePic || ProfilePhoto;

  return (
    <div className="md:hidden fixed bottom-14 left-0 right-0 bg-dark-bg border-t border-gray-border p-4 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={photo} alt="photo" className="size-10 rounded-full" />
          <p className="font-semibold">{userName}</p>
        </div>
        <Link to="/settings">
          <Cog6ToothIcon className="size-6 text-text-secondary cursor-pointer" />
        </Link>
      </div>
    </div>
  );
}