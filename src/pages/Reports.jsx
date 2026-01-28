import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import BottomNav from '../components/BottomNav.jsx';
import toast from 'react-hot-toast';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  DocumentTextIcon,
  ShieldExclamationIcon,
  BugAntIcon
} from '@heroicons/react/24/solid';

export default function Reports() {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    
    toast.success('Report submitted successfully. We\'ll review it within 24 hours.');
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setReportType('');
      setDescription('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans pb-32 md:pb-0">
      <Sidebar />
      <main className="md:ml-64 p-4 max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-primary-purple text-3xl font-bold md:hidden mb-2">Romance</h1>
          <h2 className="text-2xl font-bold">Report an Issue</h2>
          <p className="text-text-secondary mt-2">Help us keep Romance safe and enjoyable for everyone. We take all reports seriously.</p>
        </header>

        {submitted ? (
          <div className="bg-card-bg rounded-2xl p-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircleIcon className="size-16 text-green-500" />
            </div>
            <h3 className="text-xl font-bold">Thank You for Your Report</h3>
            <p className="text-text-secondary">Our team will review your report and take appropriate action. We appreciate your help in keeping our community safe.</p>
            <p className="text-sm text-text-secondary">You'll receive an email update within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type Selection */}
            <div className="bg-card-bg rounded-2xl p-6">
              <label className="block text-lg font-semibold mb-4">What would you like to report?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setReportType(type.id)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      reportType === type.id
                        ? 'border-primary-purple bg-primary-purple/10'
                        : 'border-gray-border hover:border-primary-purple/50'
                    }`}
                  >
                    {type.icon}
                    <span className="text-left">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card-bg rounded-2xl p-6">
              <label className="block text-lg font-semibold mb-4">Please describe the issue</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide as much detail as possible. Include dates, names, or other relevant information..."
                className="w-full bg-[#0F0F0F] border border-gray-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-purple h-32 resize-none"
              />
              <p className="text-xs text-text-secondary mt-2">Character count: {description.length}/2000</p>
            </div>

            {/* Helpful Info */}
            <div className="bg-card-bg rounded-2xl p-6 border border-primary-purple/20">
              <h3 className="font-semibold mb-3">Tips for Better Reports:</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>✓ Include specific dates and times if applicable</li>
                <li>✓ Mention usernames or profile information if relevant</li>
                <li>✓ Describe the impact or harm caused</li>
                <li>✓ Don't include personal information of others unnecessarily</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-pink-accent text-white py-3 rounded-lg font-bold hover:bg-pink-500 transition-colors"
              >
                Submit Report
              </button>
              <button
                type="reset"
                onClick={() => setReportType('')}
                className="px-6 py-3 border border-gray-border rounded-lg font-semibold hover:bg-card-bg transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Privacy Notice */}
            <div className="bg-[#0F0F0F] rounded-lg p-4 border border-gray-border text-xs text-text-secondary">
              <p>
                <strong>Privacy:</strong> Your report is confidential and will only be shared with our moderation team. We never disclose the identity of report submitters unless required by law.
              </p>
            </div>
          </form>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
