import React from 'react';

export default function StatCard({ icon, value, label, subtext, subtextColor = 'text-text-secondary' }) {
  return (
    <div className="bg-card-bg p-4 rounded-lg">
      {icon}
      <p className="text-2xl font-bold"> {value}</p>
      <p className="text-sm text-text-secondary"> {label}</p>
      <p className={`text-xs ${subtextColor}`}>{subtext}</p>
    </div>
  );
}