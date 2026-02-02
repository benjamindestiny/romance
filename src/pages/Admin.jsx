import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';

export default function Admin() {
  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Admin Panel (Demo)</h1>
          <p className="text-text-secondary mt-2">This is a frontend demo of admin access controlled by a token in the URL. Replace with secure backend validation.</p>
        </header>

        <section className="grid grid-cols-1 gap-4 mb-8">
          <div className="bg-card-bg p-6 rounded-lg">
            <h3 className="font-semibold">Quick actions</h3>
            <p className="text-sm text-text-secondary mt-1">These are placeholders to show what an admin could do.</p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-primary-purple text-white rounded-lg">View Users</button>
              <button className="px-4 py-2 bg-pink-accent text-white rounded-lg">Trigger Report Job</button>
            </div>
          </div>

          <div className="bg-card-bg p-6 rounded-lg">
            <h3 className="font-semibold">Current session</h3>
            <p className="text-sm text-text-secondary mt-1">Session info and quick debugging tools live here.</p>
            <div className="mt-4 text-sm">
              <p>SessionStorage: <code>{sessionStorage.getItem('isAdmin') || 'false'}</code></p>
              <p className="mt-2">Try removing the token from the URL and refreshing to see the guard in action.</p>
            </div>
          </div>
        </section>

        <section className="bg-card-bg p-6 rounded-lg">
          <h3 className="font-semibold">Notes for backend dev</h3>
          <ul className="text-sm text-text-secondary list-disc ml-5 mt-2 space-y-1">
            <li>Provide an endpoint to generate short-lived admin tokens: POST /api/admin/generate-link</li>
            <li>Provide an endpoint to validate tokens: POST /api/admin/validate {"token": "..."}</li>
            <li>Tokens must be signed (JWT/HMAC) and have expiry & nonce for single use.</li>
          </ul>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
