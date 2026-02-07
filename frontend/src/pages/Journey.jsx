import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import LogoLoading from "../components/LogoLoading.jsx";


export default function Journey() {
    const [showLoader, setShowLoader] = useState(true);


     if (showLoader)
    return <LogoLoading onComplete={() => setShowLoader(false)} />;
  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">My Journey</h1>
          <p className="text-text-secondary mt-2">We're designing a personalized journey experience for you. Coming soon.</p>
        </header>

        <div className="bg-card-bg rounded-lg p-8 text-center">

          <p className="text-lg font-semibold mb-2">Coming Soon</p>
          <p className="text-text-secondary">This area will show your progress timeline, milestones, and curated next steps once it's ready.</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
