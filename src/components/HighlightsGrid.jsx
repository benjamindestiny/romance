import React, { useState } from 'react';
import { LightBulbIcon, SparklesIcon, UsersIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const TIPS = [
  "Practice active listening — repeat back what you hear to confirm understanding.",
  "Small daily check-ins build emotional intimacy over time.",
  "Set boundaries kindly and consistently to protect your needs.",
  "Celebrate small wins together — consistency beats perfection.",
  "Try a low-pressure shared activity to reconnect and have fun."
];

export default function HighlightsGrid() {
  const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * TIPS.length));
  const nextTip = () => setTipIndex(i => (i + 1) % TIPS.length);

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-card-bg p-4 rounded-lg flex flex-col justify-between">
        <div>
          <LightBulbIcon className="size-6 text-primary-purple mb-2" />
          <p className="text-sm text-text-secondary">Daily Tip</p>
          <p className="font-semibold mt-2">{TIPS[tipIndex]}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button onClick={nextTip} className="text-primary-purple text-sm">New Tip</button>
          <Link to="/tips" className="text-primary-purple text-sm">See Tips</Link>
        </div>
      </div>

      <Link to="/quiz" className="bg-card-bg p-4 rounded-lg flex flex-col justify-between hover:opacity-90">
        <div>
          <SparklesIcon className="size-6 text-primary-purple mb-2" />
          <p className="text-sm text-text-secondary">Try a Quiz</p>
          <p className="font-semibold mt-2">Short, reflective quizzes to help you grow.</p>
        </div>
        <div className="mt-4 text-primary-purple text-sm">Start Now</div>
      </Link>

      <div className="bg-card-bg p-4 rounded-lg flex flex-col justify-between">
        <div>
          <UsersIcon className="size-6 text-primary-purple mb-2" />
          <p className="text-sm text-text-secondary">Community Snapshot</p>
          <p className="font-semibold mt-2">Maria shared a tip • James completed 5 sessions</p>
        </div>
        <Link to="/community" className="mt-4 text-primary-purple text-sm">See Activity</Link>
      </div>

      <Link to="/resources" className="bg-card-bg p-4 rounded-lg flex flex-col justify-between hover:opacity-90">
        <div>
          <BookOpenIcon className="size-6 text-primary-purple mb-2" />
          <p className="text-sm text-text-secondary">Resources</p>
          <p className="font-semibold mt-2">Guides, articles, and workshops curated for you.</p>
        </div>
        <div className="mt-4 text-primary-purple text-sm">Explore</div>
      </Link>
    </section>
  );
}
