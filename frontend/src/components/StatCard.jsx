import React from 'react';

export default function StatCard({ icon, value, label, subtext, subtextColor = 'text-text-secondary' }) {
  return (
    <div className="bg-card-bg p-4 rounded-lg">
      <span className="flex justify-center bg-pink-accent p-2 size-10 rounded-lg">{icon}</span>
      <p className="text-2xl font-bold"> {value}</p>
      <p className="text-sm text-text-secondary"> {label}</p>
      <p className={`text-xs ${subtextColor}`}>{subtext}</p>
    </div>
  );
}
