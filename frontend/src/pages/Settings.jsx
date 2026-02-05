import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import AccountDeletionModal from '../components/AccountDeletionModal.jsx';
import {
  BellIcon,
  UserCircleIcon,
  LockClosedIcon,
  BellAlertIcon,
  ShieldExclamationIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
}
from '@heroicons/react/24/solid';
import ProfilePhoto from '../assets/nature.jpg';

function Settings() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(ProfilePhoto);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1992-05-15',
    bio: 'Passionate about personal growth and building meaningful connections. On a journey to discover deeper intimacy and emotional intelligence.',
    location: 'San Francisco, CA',
    timezone: 'Pacific Time (PT)',
  });
  const activeSectionsLinks = [
    { id: 'profile', label: 'Profile', icon: <UserCircleIcon className="size-5" /> },
    { id: 'account', label: 'Account & Security', icon: <LockClosedIcon className="size-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellAlertIcon className="size-5" /> },
    { id: 'privacy', label: 'Privacy & Data', icon: <ShieldExclamationIcon className="size-5" /> },
    { id: 'help', label: 'Help & Support', icon: <QuestionMarkCircleIcon className="size-5" /> }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Changes saved!');
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePhotoPreview(event.target?.result);
      toast.success('Photo selected! (Backend dwill upload to Cloudinary/Database)');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="min-h-screen bg-[#0F0F14] text-gray-100 font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 md:p-6">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#FF69B4] hover:text-[#E0559B] transition-colors mb-2"
            >
              <ArrowLeftIcon className="size-5" />
              <span className="text-sm font-medium">Go Back</span>
            </button>
            <h1 className="text-[#FF69B4] text-2xl font-bold md:hidden">Romance</h1>
            <p className="text-xl font-bold">Settings</p>
            <p className="text-sm text-gray-400">Personalize your Romance experience</p>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <BellIcon className="size-6 text-gray-400" />
            <button
              className="bg-[#FF69B4] text-white px-6 py-3 rounded-full text-sm font-medium flex-1 md:flex-none"
              onClick={handleSave}
              type="button"
            >
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
                <option value="privacy">Privacy & Data</option>
                <option value="help">Help & Support</option>
              </select>
            </div>

            {/* Profile Section */}
            {activeSection === 'profile' && (
              <section className="bg-[#18121F] rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-[#FF69B4] mb-6">Profile Information</h2>
                <p className="text-sm text-gray-400 mb-6">Update your personal details and profile picture</p>
                <form onSubmit={handleSave}>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="relative">
                      <img
                        src={profilePhotoPreview}
                        alt={profile.firstName + ' ' + profile.lastName}
                        className="size-32 rounded-full object-cover border-4 border-[#FF69B4]/30"
                      />
                      <label htmlFor="photo-upload" className="absolute -bottom-2 -right-2 bg-[#FF69B4] text-white p-3 rounded-full shadow-md cursor-pointer hover:bg-[#E0559B] transition-colors">
                        <UserCircleIcon className="size-5" />
                      </label>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      {uploading && (
                        <div className="md:col-span-2 bg-[#FF69B4]/10 border border-[#FF69B4]/30 rounded-lg p-3">
                          <p className="text-sm text-[#FF69B4]">Uploading photo...</p>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">First Name</label>
                        <input type="text" name="firstName" value={profile.firstName} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                        <input type="text" name="lastName" value={profile.lastName} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                        <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                        <input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                        <input type="date" name="dob" value={profile.dob} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          value={profile.bio}
                          onChange={handleProfileChange}
                          className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3 h-24"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Location</label>
                        <input type="text" name="location" value={profile.location} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Timezone</label>
                        <select name="timezone" value={profile.timezone} onChange={handleProfileChange} className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3">
                          <option>Pacific Time (PT)</option>
                          <option>West Africa Time (WAT)</option>
                          <option>Greenwich Merridian Time (GMT)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="mt-8 bg-[#FF69B4] text-white px-6 py-3 rounded-full text-sm font-medium w-full md:w-auto">Save Profile</button>
                </form>
              </section>
            )}

            {/* Account and Security Section */}
            {activeSection === 'account' && (
              <section className='bg-[#18121F] rounded-2xl p-6'>
                <div className='flex justify-between items-center mb-6'>
                  <div className='flex flex-col space-y-2'>
                    <h3 className='text-2xl font-semibold text-[#FF69B4]'>Account and Security</h3>
                    <p className='text-gray-400 font-medium'>Manage your password and security settings</p>
                  </div>
                  <div className='bg-[#FF69B4] p-2 rounded-lg'>
                    <ShieldExclamationIcon className='size-10 text-white' />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-[#842591] p-2 w-12 flex items-center justify-center rounded-md">
                        <KeyIcon className='size-7 text-white' />
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-lg font-semibold">Password</h4>
                        <p className="text-gray-400">Last Changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="bg-[#FF69B4] text-white px-4 py-2 rounded-md hover:bg-[#E0559B]">Change Password</button>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-[#842591] p-2 w-12 flex items-center justify-center rounded-md">
                        <ShieldExclamationIcon className='size-7 text-white' />
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-lg font-semibold">Two-Factor Authentication</h4>
                        <p className="text-gray-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="bg-[#FF69B4] text-white px-4 py-2 rounded-md hover:bg-[#E0559B]">Enable 2FA</button>
                  </div>
                  <div className="flex justify-between items-center bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-[#842591] p-2 w-12 flex items-center justify-center rounded-md">
                        <BellIcon className='size-7 text-white' />
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-lg font-semibold">Login History</h4>
                        <p className="text-gray-400">View recent login activity</p>
                      </div>
                    </div>
                    <button className="bg-[#FF69B4] text-white px-4 py-2 rounded-md hover:bg-[#E0559B]">View History</button>
                  </div>
                </div>
              </section>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <section className="bg-[#18121F] rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-[#FF69B4] mb-6">Notifications</h2>
                <p className="text-sm text-gray-400 mb-6">Choose how you want to be notified</p>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <p className="text-gray-400">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <p className="text-gray-400">Receive push notifications on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">SMS Notifications</h3>
                      <p className="text-gray-400">Receive text messages for important updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                    </label>
                  </div>
                  <div className="border-t border-[#2D2D3A] pt-6">
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>New Matches</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Messages</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Likes and Super Likes</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <section className="bg-[#18121F] rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#FF69B4] mb-2">Privacy & Data</h2>
                  <p className="text-sm text-gray-400">Control your privacy and how your data is used</p>
                </div>

                {/* Profile Visibility */}
                <div className="border-b border-[#2D2D3A] pb-6">
                  <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border border-[#2D2D3A] rounded-lg hover:border-[#FF69B4]/50 cursor-pointer transition-colors">
                      <input type="radio" name="visibility" value="public" className="mr-3 accent-[#FF69B4]" defaultChecked />
                      <div>
                        <p className="font-medium">Public</p>
                        <p className="text-sm text-gray-400">Anyone can see your profile and send you messages</p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-[#2D2D3A] rounded-lg hover:border-[#FF69B4]/50 cursor-pointer transition-colors">
                      <input type="radio" name="visibility" value="private" className="mr-3 accent-[#FF69B4]" />
                      <div>
                        <p className="font-medium">Private</p>
                        <p className="text-sm text-gray-400">Only people you match with can see your profile</p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-[#2D2D3A] rounded-lg hover:border-[#FF69B4]/50 cursor-pointer transition-colors">
                      <input type="radio" name="visibility" value="hidden" className="mr-3 accent-[#FF69B4]" />
                      <div>
                        <p className="font-medium">Hidden</p>
                        <p className="text-sm text-gray-400">Your profile is not visible to anyone (you're "invisible")</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Data & Personalization */}
                <div className="border-b border-[#2D2D3A] pb-6">
                  <h3 className="text-lg font-semibold mb-4">Data & Personalization</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#0F0F14] rounded-lg">
                      <div>
                        <p className="font-medium">Personalized Recommendations</p>
                        <p className="text-sm text-gray-400">Use your data to improve match suggestions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0F0F14] rounded-lg">
                      <div>
                        <p className="font-medium">Analytics & Improvements</p>
                        <p className="text-sm text-gray-400">Help us improve the app with anonymous analytics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0F0F14] rounded-lg">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-gray-400">Receive emails about new features and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#2D2D3A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF69B4]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF69B4]"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Blocked Users & Privacy */}
                <div className="border-b border-[#2D2D3A] pb-6">
                  <h3 className="text-lg font-semibold mb-4">Safety & Blocking</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3 text-left hover:border-[#FF69B4]/50 transition-colors">
                      <p className="font-medium">Manage Blocked Users</p>
                      <p className="text-sm text-gray-400">View and manage users you've blocked</p>
                    </button>
                    <button className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3 text-left hover:border-[#FF69B4]/50 transition-colors">
                      <p className="font-medium">Download Your Data</p>
                      <p className="text-sm text-gray-400">Get a copy of all your data in a portable format (GDPR)</p>
                    </button>
                  </div>
                </div>

                {/* Data Deletion */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-400">Data & Account</h3>
                  <p className="text-sm text-gray-400 mb-4">Manage your account and data</p>
                  <button className="w-full bg-[#0F0F14] border border-[#2D2D3A] rounded-lg px-4 py-3 text-left hover:border-[#FF69B4]/50 transition-colors">
                    <p className="font-medium">Export Profile</p>
                    <p className="text-sm text-gray-400">Download all your profile information and conversations</p>
                  </button>
                </div>
              </section>
            )}

            {/* Help & Support Section */}
            {activeSection === 'help' && (
              <section className="bg-[#18121F] rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#FF69B4] mb-2">Help & Support</h2>
                  <p className="text-sm text-gray-400">We're here to help. Find answers or contact our team.</p>
                </div>

                {/* Support Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/reports" className="bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4 hover:border-[#FF69B4]/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="size-6 text-[#FF69B4] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Report an Issue</h3>
                        <p className="text-sm text-gray-400 mt-1">Report bugs, safety concerns, scams, or inappropriate content</p>
                      </div>
                    </div>
                  </Link>

                  <a href="mailto:support@romance.app" className="bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4 hover:border-[#FF69B4]/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <EnvelopeIcon className="size-6 text-[#FF69B4] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email Support</h3>
                        <p className="text-sm text-gray-400 mt-1">support@romance.app - Response within 24 hours</p>
                      </div>
                    </div>
                  </a>

                  <a href="https://help.romance.app" target="_blank" rel="noopener noreferrer" className="bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4 hover:border-[#FF69B4]/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <QuestionMarkCircleIcon className="size-6 text-[#FF69B4] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Knowledge Base</h3>
                        <p className="text-sm text-gray-400 mt-1">Browse FAQs and troubleshooting guides</p>
                      </div>
                    </div>
                  </a>

                  <div className="bg-[#0F0F14] border border-[#2D2D3A] rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ShieldExclamationIcon className="size-6 text-[#FF69B4] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Safety & Trust</h3>
                        <p className="text-sm text-gray-400 mt-1">Learn about our safety features and community guidelines</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="border-t border-[#2D2D3A] pt-6">
                  <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3 text-sm">
                    <details className="group">
                      <summary className="cursor-pointer font-medium hover:text-[#FF69B4]">How do I report inappropriate content?</summary>
                      <p className="text-gray-400 mt-2 ml-4">Go to Reports page or use the report option on any profile or message. Our team reviews all reports within 24 hours.</p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer font-medium hover:text-[#FF69B4]">What if I feel unsafe?</summary>
                      <p className="text-gray-400 mt-2 ml-4">Please contact our safety team immediately at safety@romance.app. If you're in immediate danger, contact local authorities.</p>
                    </details>
                    <details className="group">
                      <summary className="cursor-pointer font-medium hover:text-[#FF69B4]">How do I delete my account?</summary>
                      <p className="text-gray-400 mt-2 ml-4">
                        <button onClick={() => setShowDeleteModal(true)} className="text-[#FF69B4] hover:underline">Click here</button> to start the account deletion process. Your feedback will help us improve.
                      </p>
                    </details>
                  </div>
                </div>

                {/* Account Deletion */}
                <div className="border-t border-[#2D2D3A] pt-6">
                  <h3 className="font-semibold mb-3">Account Management</h3>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 text-red-400 py-3 rounded-lg font-medium transition-colors"
                  >
                    Delete My Account
                  </button>
                  <p className="text-xs text-gray-400 mt-2">This action cannot be undone. Your account will be completely removed after 30 days.</p>
                </div>
              </section>
            )}

            {activeSection === 'danger' && (
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
              </section>
            )}
          </div>
        </div>
      </main>
      <AccountDeletionModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </div>
  );
}

export default Settings;