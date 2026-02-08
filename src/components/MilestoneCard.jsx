import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const statusColors = {
  completed: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    labelColor: 'text-green-400'
  },
  'in-progress': {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    labelColor: 'text-blue-400'
  },
  locked: {
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    labelColor: 'text-gray-400'
  }
};

export default function MilestoneCard({ milestone, onClick }) {
  const colors = statusColors[milestone.status];

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    locked: 'Locked'
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 ${colors.bg} border-l-4 ${colors.border} p-5 rounded-lg hover:shadow-lg group`}
    >
      {/* Timeline Indicator */}
      <div className="absolute -left-6 top-5">
        <div className={`w-12 h-12 rounded-full border-4 border-dark-bg flex items-center justify-center ${colors.bg}`}>
          <div className={`w-5 h-5 rounded-full ${colors.labelColor}`} />
        </div>
      </div>

      {/* Content */}
      <div className="ml-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold group-hover:text-primary-purple transition-colors">
              {milestone.title}
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {new Date(milestone.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p className="text-sm text-text-secondary mt-2">
              {milestone.description}
            </p>
          </div>
          <div className="text-right flex items-center gap-2">
            <div>
              <p className={`text-sm font-bold ${colors.labelColor}`}>
                {statusLabels[milestone.status]}
              </p>
              <p className="text-xs text-text-secondary mt-1">{milestone.points} pts</p>
            </div>
            <ChevronRightIcon className="size-5 text-text-secondary group-hover:text-primary-purple transition-colors" />
          </div>
        </div>

        {/* Progress Bar for In-Progress */}
        {milestone.status === 'in-progress' && (
          <div className="mt-4 pt-4 border-t border-gray-border/30">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-text-secondary">Progress</span>
              <span className="text-primary-purple font-semibold">65%</span>
            </div>
            <div className="w-full h-2 bg-gray-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-purple to-pink-accent w-[65%]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
