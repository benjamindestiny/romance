import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import toast from 'react-hot-toast';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ShieldExclamationIcon,
  BugAntIcon,
  ClockIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';

export default function Reports() {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [reportHistory, setReportHistory] = useState([
    { id: 1, name: 'Sarah Mitchell', type: 'Harassment/Abuse', date: 'Jan 14, 2026', status: 'Resolved', excerpt: 'Inappropriate messages received' },
    { id: 2, name: 'James Wilson', type: 'Scam/Fraud Report', date: 'Jan 20, 2026', status: 'Under Review', excerpt: 'Suspicious payment request' },
  ]);

  const reportTypes = [
    { id: 'safety', label: 'Safety Concern', icon: <ShieldExclamationIcon className="size-5" /> },
    { id: 'scam', label: 'Scam/Fraud Report', icon: <ExclamationTriangleIcon className="size-5" /> },
    { id: 'bug', label: 'Report a Bug', icon: <BugAntIcon className="size-5" /> },
    { id: 'inappropriate', label: 'Inappropriate Content', icon: <ExclamationTriangleIcon className="size-5" /> },
    { id: 'harassment', label: 'Harassment/Abuse', icon: <ShieldExclamationIcon className="size-5" /> },
    { id: 'other', label: 'Other Issue', icon: <DocumentTextIcon className="size-5" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reportType || !description.trim()) {
      toast.error('Please select a report type and describe the issue');
      return;
    }

    // Simulate backend submission
    const newReport = {
      id: Date.now(),
      name: 'You',
      type: reportTypes.find(r => r.id === reportType)?.label || 'Other',
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
      excerpt: description.slice(0, 140)
    };

    setReportHistory((prev) => [newReport, ...prev]);
    toast.success("Report submitted successfully. We'll review it within 24 hours.");
    setSubmitted(true);

    // Reset form after brief feedback
    setTimeout(() => {
      setReportType('');
      setDescription('');
      setSubmitted(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-primary-purple text-3xl font-bold md:hidden mb-2">Romance</h1>
          <h2 className="text-3xl md:text-4xl font-extrabold">Report an Issue</h2>
          <p className="text-text-secondary mt-2 max-w-2xl">Help us keep Romance safe and enjoyable for everyone. Provide clear details and our team will follow up quickly.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: Form (larger column on desktop) */}
          <section className="md:col-span-2 bg-card-bg rounded-2xl p-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <CheckCircleIcon className="size-20 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">Thank you — report received</h3>
                <p className="text-text-secondary mt-2">We've received your report and our moderation team will review it.</p>
                <p className="text-sm text-text-secondary mt-1">You will be notified once a decision is made.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold mb-3">What would you like to report?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {reportTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setReportType(type.id)}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-all text-left ${
                          reportType === type.id ? 'border-primary-purple bg-primary-purple/10' : 'border-gray-border hover:border-primary-purple/40'
                        }`}
                      >
                        {type.icon}
                        <div>
                          <div className="font-semibold">{type.label}</div>
                          <div className="text-xs text-text-secondary">Quickly select a category</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-3">Describe the issue</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide as much detail as possible. Include dates, names, or other relevant information..."
                    className="w-full bg-[#0F0F0F] border border-gray-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-purple min-h-[160px] resize-vertical"
                    maxLength={2000}
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-text-secondary">
                    <span>Character count: {description.length}/2000</span>
                    <span>{reportType ? reportTypes.find(r => r.id === reportType).label : 'No category selected'}</span>
                  </div>
                </div>

                <div className="bg-[#0F0F0F] rounded-lg p-4 border border-gray-border text-xs text-text-secondary">
                  <p>
                    <strong>Privacy:</strong> Your report is confidential and will only be shared with our moderation team. We never disclose the identity of report submitters unless required by law.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="flex-1 bg-pink-accent text-white py-3 rounded-lg font-bold hover:bg-pink-500 transition-colors">Submit Report</button>
                  <button type="button" onClick={() => { setReportType(''); setDescription(''); }} className="px-6 py-3 border border-gray-border rounded-lg font-semibold hover:bg-card-bg">Clear</button>
                </div>
              </form>
            )}
          </section>

          {/* Right: History & Info */}
          <aside className="md:col-span-1 space-y-4">
            <div className="bg-card-bg rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Recent Reports</h4>
                <span className="text-xs text-text-secondary">Latest activity</span>
              </div>

              <ul className="space-y-3">
                {reportHistory.map((r) => (
                  <li key={r.id} className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      <UserCircleIcon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold">{r.name} • <span className="font-normal text-xs text-text-secondary">{r.type}</span></div>
                        <div className="text-xs text-text-secondary">{r.date}</div>
                      </div>
                      <div className="text-xs text-text-secondary mt-1">{r.excerpt}</div>
                      <div className={`mt-2 inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${r.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : r.status === 'Under Review' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-primary-purple/10 text-primary-purple'}`}>
                        {r.status}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-xs text-text-secondary">
                <div className="flex items-center gap-2"><ClockIcon className="size-4" /> Please allow up to 48 hours for our team to investigate.</div>
              </div>
            </div>

            <div className="bg-card-bg rounded-2xl p-4 shadow-sm border border-primary-purple/10">
              <h5 className="font-semibold mb-2">Need immediate help?</h5>
              <p className="text-xs text-text-secondary">If you or someone is in immediate danger, please contact local emergency services first. For urgent platform support, email support@romance.app.</p>
            </div>
          </aside>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
