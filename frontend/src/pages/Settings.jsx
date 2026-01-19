
import React from 'react'
import Sidebar from '../components/Sidebar.jsx'

function Settings() {
  return (
    <div className="flex">
      <Sidebar />
      <main className='md:ml-64 p-4'>
        {/* Header Section */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-primary-purple text-2xl font-bold md:hidden">Romance</h1>
            <p className="text-xl font-bold">Welcome Back, Sarah</p>
            <p className="text-sm text-text-secondary">Monday, January 13, 2026</p>
          </div>
          <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6 text-text-secondary" />
            <button className="bg-pink-accent text-white px-4 py-2 rounded-lg text-sm font-medium hidden md:block">+ New Session</button>
          </div>
        </header>        
      </main>
    </div>
  )
}

export default Settings;
