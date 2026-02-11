import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import { HeartIcon, ChartBarIcon, PlusIcon, SparklesIcon, CalendarIcon } from '@heroicons/react/24/solid';

export default function Journey() {
  const [selectedStage, setSelectedStage] = useState(2);
  const [reflections, setReflections] = useState([
    { date: 'Feb 8', text: 'I finally told him how I really feel about the future. Felt scary but good.', impact: '+12' },
    { date: 'Feb 3', text: 'Completed the 7-day gratitude challenge together.', impact: '+8' }
  ]);
  const [newReflection, setNewReflection] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [healthHistory] = useState([62, 68, 71, 79, 84, 88, 92]); // backend will replace this array

  const stages = [
    { id: 0, title: 'Awareness', subtitle: 'Knowing yourself', progress: 100, color: 'from-purple-600 to-pink-500' },
    { id: 1, title: 'Connection', subtitle: 'Real intimacy', progress: 85, color: 'from-pink-500 to-rose-500' },
    { id: 2, title: 'Growth', subtitle: 'Healing together', progress: 60, color: 'from-violet-500 to-purple-600' },
    { id: 3, title: 'Mastery', subtitle: 'Thriving as one', progress: 25, color: 'from-amber-400 to-yellow-500' },
  ];

  const currentStage = stages[selectedStage];

  // Simple SVG line chart
  const max = Math.max(...healthHistory);
  const points = healthHistory.map((v, i) => {
    const x = (i / (healthHistory.length - 1)) * 100;
    const y = 100 - (v / max) * 90;
    return `${x},${y}`;
  }).join(' ');

  const addReflection = () => {
    if (!newReflection.trim()) return;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setReflections([{ date: today, text: newReflection, impact: '+15' }, ...reflections]);
    setNewReflection('');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-purple via-pink-accent to-purple-400 bg-clip-text text-transparent">Your Journey</h1>
            <p className="text-text-secondary mt-2 text-lg">Week 17 • You’re doing better than you think</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-primary-purple">92</div>
            <div className="uppercase text-xs tracking-[3px] text-green-400">Health Score ↑</div>
          </div>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stages.map(stage => (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className={`bg-card-bg rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedStage === stage.id ? 'ring-2 ring-pink-accent scale-105' : 'hover:ring-1 hover:ring-primary-purple/30'}`}
            >
              <div className={`h-1.5 bg-gradient-to-r ${stage.color} rounded w-[${stage.progress}%] mb-6`} />
              <div className="font-bold text-2xl">{stage.title}</div>
              <div className="text-text-secondary">{stage.subtitle}</div>
              <div className="mt-8 text-sm text-primary-purple font-medium">{stage.progress}% complete</div>
            </div>
          ))}
        </div>

        {/* Stage Detail + Chart */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Stage Info */}
          <div className="lg:col-span-5 bg-card-bg rounded-3xl p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="uppercase text-xs tracking-widest text-pink-accent">CURRENT STAGE</div>
                <div className="text-4xl font-bold mt-1">{currentStage.title}</div>
              </div>
              <SparklesIcon className="size-10 text-pink-accent/70" />
            </div>

            <p className="text-text-secondary leading-relaxed mb-8">{currentStage.subtitle} • You’ve grown so much here already.</p>

            <div className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-3 flex justify-between">
                  <span>Weekly Goal</span>
                  <span className="text-green-400">3/4 done</span>
                </div>
                <div className="h-3 bg-progress-bg rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-purple to-pink-accent h-full w-[75%] rounded-full" />
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-primary-purple to-pink-accent text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 transition"
              >
                <PlusIcon className="size-5" /> Add Today’s Reflection
              </button>
            </div>
          </div>

          {/* Right - Health Trend Chart */}
          <div className="lg:col-span-7 bg-card-bg rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-xl">Health Trend</h3>
                <p className="text-green-400 text-sm">+19 points this month</p>
              </div>
              <ChartBarIcon className="size-7 text-text-secondary" />
            </div>

            <div className="h-64 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Area fill */}
                <polygon points={`0,100 ${points} 100,100`} fill="url(#grad)" opacity="0.15" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Line */}
                <polyline points={points} fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Dots */}
                {healthHistory.map((v, i) => {
                  const x = (i / (healthHistory.length - 1)) * 100;
                  const y = 100 - (v / max) * 90;
                  return <circle key={i} cx={x} cy={y} r="1.8" fill="#fff" stroke="#EC4899" strokeWidth="2" />;
                })}
              </svg>
            </div>

            <div className="flex justify-between text-xs text-text-secondary mt-3 px-1">
              {healthHistory.map((_, i) => (
                <div key={i}>W{i + 1}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Reflections Timeline */}
        <div className="mt-12 bg-card-bg rounded-3xl p-8">
          <div className="font-semibold text-lg mb-6 flex items-center gap-2">
            <CalendarIcon className="size-5" /> Your Reflections
          </div>

          <div className="space-y-8">
            {reflections.map((r, i) => (
              <div key={i} className="flex gap-6">
                <div className="shrink-0 w-14 text-right">
                  <div className="text-xs text-text-secondary">{r.date}</div>
                  <div className="text-green-400 font-bold text-sm">+{r.impact}</div>
                </div>
                <div className="flex-1 border-l border-gray-border pl-6">
                  <p className="text-text-secondary leading-relaxed">“{r.text}”</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reflection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card-bg rounded-3xl max-w-lg w-full p-8">
            <h3 className="text-2xl font-bold mb-2">How are you feeling today?</h3>
            <p className="text-text-secondary mb-6">One sentence can change everything.</p>

            <textarea
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              placeholder="I finally opened up about..."
              className="w-full h-40 bg-[#0F0F0F] border border-gray-border rounded-2xl p-5 focus:outline-none focus:border-pink-accent resize-none"
            />

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 border border-gray-border rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addReflection}
                className="flex-1 py-4 bg-pink-accent rounded-2xl font-semibold text-white"
              >
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}