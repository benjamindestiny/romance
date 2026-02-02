import React, { useState } from 'react';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

// PlanSection: simple, manual-friendly component that shows Basic vs Premium features.
// Backend integration note: The backend should pass the user's plan (e.g., 'basic'|'premium') via props,
// a user context, or an API. For development preview, toggleLocal is available but should be removed in production.
export default function HighlightsGrid({ plan = 'basic' }) {
  // localPlan lets you preview the other tier in the UI. Replace with backend value in integration.
  const [localPlan, setLocalPlan] = useState(plan);
  const isPremium = localPlan === 'premium';

  const basicFeatures = [
    'Weekly summary',
    'Session reminders',
    'Community access'
  ];

  const premiumFeatures = [
    'Personalized monthly report',
    'Session insights & trends',
    'Priority scheduling',
    'Exclusive workshops'
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-card-bg p-6 rounded-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{isPremium ? 'Premium Member' : 'Basic Member'}</h3>
            <p className="text-sm text-text-secondary mt-1">{isPremium ? 'All premium features enabled' : 'Essentials to get started'}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{isPremium ? 'Premium' : 'Basic'}</p>
            <p className="text-sm text-text-secondary">{isPremium ? '$9/mo' : 'Free'}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {basicFeatures.map((f) => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircleIcon className="size-4 text-primary-purple" />
              <span className="text-sm">{f}</span>
            </div>
          ))}

          {isPremium && (
            <>
              <hr className="my-3 border-gray-border" />
              {premiumFeatures.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircleIcon className="size-4 text-primary-purple" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link to={isPremium ? '/billing' : '/pricing'} className="bg-primary-purple text-white px-4 py-2 rounded-lg text-sm font-medium">{isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}</Link>

          {/* Developer helper: toggle preview (remove when backend integration is ready) */}
          <button
            onClick={() => setLocalPlan(isPremium ? 'basic' : 'premium')}
            className="text-sm text-text-secondary"
            aria-label="Toggle plan preview"
          >
            Preview {isPremium ? 'Basic' : 'Premium'}
          </button>
        </div>
      </div>

      <div className="bg-card-bg p-6 rounded-lg">
        <h3 className="text-lg font-semibold">Premium Highlights</h3>
        <p className="text-sm text-text-secondary mt-1">Examples of premium-only content your backend can toggle on per user.</p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Personalized Report</p>
              <p className="font-semibold">Monthly summary & action items</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{isPremium ? 'Ready' : 'Locked'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Session Insights</p>
              <p className="font-semibold">Trends & engagement metrics</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{isPremium ? 'Ready' : 'Locked'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Priority Support</p>
              <p className="font-semibold">Fast responses from our team</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{isPremium ? 'Included' : 'Upgrade'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-text-secondary">Tip: The backend should set the user's plan and pass it into this component (e.g., via props, user session, or API response). Keep this component dumb and presentational for easy integration.</div>
      </div>
    </section>
  );
}
