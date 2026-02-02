import React from 'react';
import { useUser } from '../contexts/UserContext.jsx';
import { Link } from 'react-router-dom';
import { DocumentArrowDownIcon, SparklesIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

function downloadCSV(filename, rows) {
  const csvContent = [Object.keys(rows[0]).join(','), ...rows.map(r => Object.values(r).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function PremiumPanel() {
  const { user } = useUser();
  const isPremium = user?.plan === 'premium';

  const sampleRows = [
    { Date: '2026-01-01', Session: 'Marriage Counseling', Rating: 5, Notes: 'Great progress' },
    { Date: '2026-01-14', Session: 'Personal Growth', Rating: 4, Notes: 'Good insights' },
  ];

  function handleDownload() {
    if (!isPremium) {
      toast((t) => (
        <div className="p-2">
          <div className="font-semibold">Upgrade required</div>
          <div className="text-sm">You're currently on Basic. Upgrade to download full reports.</div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); window.location.href = '/pricing'; }}
              className="px-3 py-1 bg-primary-purple text-white rounded text-sm"
            >Upgrade</button>
            <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 border rounded text-sm">Close</button>
          </div>
        </div>
      ));
      return;
    }

    downloadCSV('monthly-report.csv', sampleRows);
    toast.success('Report downloaded (sample CSV).');
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="md:col-span-2 bg-card-bg p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <SparklesIcon className="size-6 text-primary-purple" />
          <div>
            <h3 className="text-xl font-semibold">Exclusive Monthly Report</h3>
            <p className="text-sm text-text-secondary">Premium members get a downloadable report with personalized insights and action items.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card-bg p-4 rounded-lg border border-gray-border">
            <p className="text-sm text-text-secondary">This Month</p>
            <p className="font-bold text-2xl mt-2">Summary</p>
            <p className="text-sm text-text-secondary mt-2">A concise summary of your recent sessions and progress.</p>
          </div>

          <div className="bg-card-bg p-4 rounded-lg border border-gray-border">
            <p className="text-sm text-text-secondary">Progress Score</p>
            <p className="font-bold text-2xl mt-2">79</p>
            <p className="text-sm text-text-secondary mt-2">A combined metric to show improvements over time.</p>
          </div>

          <div className="bg-card-bg p-4 rounded-lg border border-gray-border">
            <p className="text-sm text-text-secondary">Avg Session Rating</p>
            <p className="font-bold text-2xl mt-2">4.7</p>
            <p className="text-sm text-text-secondary mt-2">Average rating across sessions for the period.</p>
          </div>

          <div className="bg-card-bg p-4 rounded-lg border border-gray-border">
            <p className="text-sm text-text-secondary">Exports</p>
            <p className="font-semibold mt-2">CSV export</p>
            <div className="mt-3 flex gap-2">
              <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-2 bg-primary-purple text-white rounded-lg text-sm">
                <DocumentArrowDownIcon className="size-4" /> Download Sample Report
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-text-secondary">Integration: Backend should provide a secured export endpoint and return a pre-signed file or stream for large reports. This client-side CSV is a development placeholder.</div>
      </div>

      <div className="bg-card-bg p-6 rounded-lg">
        <h3 className="text-lg font-semibold">Member Perks</h3>
        <ul className="mt-4 space-y-3 text-sm text-text-secondary">
          <li>Access to advanced analytics</li>
          <li>Monthly personalized action items</li>
          <li>Priority scheduling and exclusive workshops</li>
        </ul>

        <div className="mt-6">
          <Link to="/pricing" className="w-full inline-block text-center bg-primary-purple text-white px-4 py-2 rounded-lg">Learn More / Upgrade</Link>
        </div>
      </div>
    </section>
  );
}
