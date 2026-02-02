import React from 'react';
import { CheckCircleIcon, SparklesIcon, BoltIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Premium-focused showcase that looks upgraded visually but treats users as Basic by default.
// Clicking any premium feature will show a toast: "You're currently on Basic. Upgrade to access.".
// Backend integration: pass `plan='premium'` via props or user context to enable access.
export default function HighlightsGrid({ plan = 'basic' }) {
  const isPremium = plan === 'premium';

  const premiumFeatures = [
    {
      id: 'report',
      title: 'Personalized Report',
      description: 'Monthly summary with action items',
    },
    {
      id: 'insights',
      title: 'Session Insights',
      description: 'Trends & engagement metrics',
    },
    {
      id: 'priority',
      title: 'Priority Scheduling',
      description: 'Book with priority slots',
    },
    {
      id: 'workshops',
      title: 'Exclusive Workshops',
      description: 'Members-only live workshops',
    }
  ];

  function handleFeatureClick(feature) {
    if (isPremium) {
      toast.success(`${feature.title} opened`);
      return;
    }

    toast((t) => (
      <div className="p-2">
        <div className="font-semibold">Upgrade required</div>
        <div className="text-sm">You're currently on Basic. Upgrade to access <strong>{feature.title}</strong>.</div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => { toast.dismiss(t.id); window.location.href = '/pricing'; }}
            className="px-3 py-1 bg-primary-purple text-white rounded text-sm"
          >Upgrade</button>
          <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 border rounded text-sm">Close</button>
        </div>
      </div>
    ));
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="md:col-span-2 bg-gradient-to-r from-purple-800/30 to-pink-700/10 rounded-lg p-6 border border-purple-700/10 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold">Premium Experience</h3>
            <p className="text-sm text-text-secondary mt-2">Unlock deeper insights, priority support, and exclusive workshops—carefully designed and easy to access.</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{isPremium ? 'Premium' : 'Basic'}</p>
            <p className="text-sm text-text-secondary">{isPremium ? '$9/mo' : 'Your plan: Basic'}</p>
            {!isPremium && <Link to="/pricing" className="inline-block mt-2 bg-primary-purple text-white px-3 py-1 rounded text-sm">Upgrade</Link>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFeatureClick(f)}
              className="relative text-left group bg-card-bg p-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              {!isPremium && <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center text-white/90 font-semibold">Locked</div>}
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <BoltIcon className="size-5 text-primary-purple" />
                  <h4 className="font-semibold">{f.title}</h4>
                </div>
                <p className="text-sm text-text-secondary">{f.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-lg">
        <h3 className="text-lg font-semibold">Why Premium?</h3>
        <ul className="mt-4 space-y-3 text-sm text-text-secondary">
          <li>Tailored recommendations and monthly action items</li>
          <li>Access to advanced session analytics and trends</li>
          <li>Priority scheduling and dedicated support</li>
        </ul>

        <div className="mt-6">
          <Link to="/pricing" className="w-full inline-block text-center bg-primary-purple text-white px-4 py-2 rounded-lg">Learn More / Upgrade</Link>
        </div>
      </div>
    </section>
  );
}

