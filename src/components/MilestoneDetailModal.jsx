import React from 'react';
import { XMarkIcon, CheckCircleIcon, ClockIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const statusConfig = {
  completed: {
    icon: CheckCircleIcon,
    label: 'Completed',
    color: 'text-green-400'
  },
  'in-progress': {
    icon: ClockIcon,
    label: 'In Progress',
    color: 'text-blue-400'
  },
  locked: {
    icon: LockClosedIcon,
    label: 'Locked',
    color: 'text-gray-400'
  }
};

export default function MilestoneDetailModal({ milestone, isOpen, onClose }) {
  if (!isOpen || !milestone) return null;

  const status = statusConfig[milestone.status];
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card-bg rounded-xl p-6 max-w-md w-full border border-gray-border">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{milestone.title}</h3>
            <p className="text-sm text-text-secondary mt-1">
              {new Date(milestone.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-2 ${status.color} mb-4`}>
          <StatusIcon className="size-5" />
          <span className="text-sm font-medium">{status.label}</span>
        </div>

        {/* Description */}
        <p className="text-text-secondary mb-6">{milestone.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-border/5 rounded-lg">
          <div>
            <p className="text-xs text-text-secondary mb-1">Points</p>
            <p className="text-2xl font-bold text-primary-purple">{milestone.points}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary mb-1">Status</p>
            <p className={`text-sm font-semibold ${status.color}`}>{status.label}</p>
          </div>
        </div>

        {/* Lock Message */}
        {milestone.status === 'locked' && (
          <p className="text-xs text-text-secondary text-center p-2 bg-gray-border/5 rounded-lg mb-3">
            Complete previous milestones to unlock
          </p>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-gray-border/20 hover:bg-gray-border/40 text-text-primary py-2 rounded-lg font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
