import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import { 
  BellIcon, 
  UserCircleIcon, 
  LockClosedIcon, 
  Cog6ToothIcon, 
  CreditCardIcon, 
  BellAlertIcon, 
  StopIcon, 
  ShieldExclamationIcon,
  KeyIcon
} 
from '@heroicons/react/24/solid';
import ProfilePhoto from '../assets/nature.jpg';

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const activeSectionsLinks = [
    { id: 'profile', label: 'Profile', icon: <UserCircleIcon className="size-5" /> },
    { id: 'account', label: 'Account & Security', icon: <LockClosedIcon className="size-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellAlertIcon className="size-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <Cog6ToothIcon className="size-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCardIcon className="size-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F14] text-gray-100 font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 md:p-6">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-[#FF69B4] text-2xl font-bold md:hidden">Romance</h1>
            <p className="text-xl font-bold">Settings</p>
            <p className="text-sm text-gray-400">Personalize your Romance experience</p>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <BellIcon className="h-6 w-6 text-gray-400" />
            <button className="bg-[#FF69B4] text-white px-6 py-3 rounded-full text-sm font-medium flex-1 md:flex-none">
              Save Changes
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="hidden lg:block col-span-1 bg-[#18121F] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#FF69B4] mb-4">Categories</h2>
            <nav className="space-y-2">
              {activeSectionsLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-3 w-full text-left rounded-md p-3 ${activeSection === item.id ? 'bg-[#FF69B4]/20 text-[#FF69B4] font-medium' : 'hover:bg-[#2D2D3A]'
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
          <div className="col-span-1 lg:col-span-3 space-y-8">
            <div className="lg:hidden mb-6">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="w-full bg-[#18121F] border border-[#2D2D3A] rounded-lg px-4 py-3 text-gray-100"
              >
                <option value="profile">Profile</option>
                <option value="account">Account & Security</option>
                <option value="notifications">Notifications</option>
                <option value="privacy">Privacy</option>
                <option value="billing">Billing</option>
              </select>
            </div>

            {/* Profile Section */}
            {activeSection === 'profile' && (
              <section className="bg-[#18121F] rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-[#FF69B4] mb-6">Profile Information</h2>
                <p className="text-sm text-gray-400 mb-6">Update your personal details and profile picture</p>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative">
                    <img
                      src={ProfilePhoto}
                      alt="Sarah Mitchell"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#FF69B4]/30"
                    />
                    <button className="absolute -bottom-2 -right-2 bg-[#FF69B4] text-white p-3 rounded-full shadow-md">
                      <UserCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">First Name</label>
                      <input type="text" defaultValue="Sarah" className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                      <input type="text" defaultValue="Mitchell" className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                      <input type="email" defaultValue="sarah.mitchell@example.com" className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                      <input type="date" defaultValue="1992-05-15" className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">Bio</label>
                      <textarea
                        defaultValue="Passionate about personal growth and building meaningful connections. On a journey to discover deeper intimacy and emotional intelligence."
                        className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3 h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Location</label>
                      <input type="text" defaultValue="San Francisco, CA" className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Timezone</label>
                      <select className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3">
                        <option>Pacific Time (PT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Account and Security Section */}
            {activeSection === 'account' && (
              <section className='bg-[#18121F] rounded-2xl p-6'>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col space-y-2'>
                    <h3 className='text-3xl font-semibold'>Account and Security</h3>
                    <p className='text-gray-600 font-medium'>Manage your password and security settings</p>
                  </div>
                  <div className='bg-[#FF69B4] p-2 rounded-lg'>
                    <ShieldExclamationIcon className='size-10' />
                  </div>
                </div>
                <div className="flex justify-between bg-[#18121F] border p-3 border-">
                  <div className="flex items-center gap-4">
                    <span className="bg-[#842591] p-2 w-12 flex items-center justify-center rounded-md">
                      <KeyIcon className='size-7' />
                    </span>
                    <div className="flex flex-col">
                      <h4 className="text-lg font-semibold mt-4">Password</h4>
                      <p className="text-gray-400">Last Changed 3 months ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="bg-[#FF69B4] p-2 rounded-md">Change Password</button>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'danger' && 
            <section className="bg-[#18121F] border border-red-800/50 rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl text-red-400">Danger</span>
                <h2 className="text-2xl font-semibold text-red-400">Danger Zone</h2>
              </div>
              <p className="text-sm text-gray-400 mb-6">Irreversible actions - proceed with caution</p>
              <div className="space-y-4">
                <button className="w-full bg-[#2D2D3A] hover:bg-[#3A3A45] text-gray-100 py-3 rounded-lg font-medium">
                  Temporarily Deactivate Account
                </button>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold">
                  Permanently Delete Account
                </button>
              </div>
            </section>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;