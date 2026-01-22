import React from 'react';
import { Link } from 'react-router-dom';

export default function QuickActionCard({ to, icon, title, description }) {
  return (
    <Link to={to} className="bg-card-bg p-4 rounded-lg flex items-start space-x-4">
      <div className="bg-primary-purple/20 p-2 rounded-md">
        {icon}
      </div>
      <div>
        <p className="font-semibold"> {title}</p>
        <p className="text-sm text-text-secondary"> {description}</p>
      </div>
    </Link>
  );
}