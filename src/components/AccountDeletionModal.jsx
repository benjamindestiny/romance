import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function AccountDeletionModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const reasons = [
    { id: 'found-partner', label: 'I found what I was looking for' },
    { id: 'not-meeting', label: 'Not meeting quality matches' },
    { id: 'safety-concerns', label: 'Safety or privacy concerns' },
    { id: 'features', label: 'Missing features I need' },
    { id: 'cost', label: 'Too expensive' },
    { id: 'other-app', label: 'Trying another app' },
    { id: 'personal', label: 'Personal reasons' },
  ];

  const toggleReason = (id) => {
    setSelectedReasons(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleConfirmDeletion = () => {
    // Simulate backend deletion
    toast.success('Your account has been deleted. We\'ll miss you!');
    setTimeout(() => {
      navigate('/');
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card-bg rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card-bg border-b border-gray-border p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Delete Your Account</h2>
          <button onClick={onClose} className="hover:bg-[#3A3A45] p-2 rounded-lg">
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3">
                <ExclamationTriangleIcon className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-400">This action cannot be undone</p>
                  <p className="text-sm text-text-secondary mt-1">All your data, matches, messages, and progress will be permanently deleted.</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold">Before you go, help us improve:</p>
                <p className="text-sm text-text-secondary">Why are you leaving? (Select all that apply)</p>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {reasons.map((reason) => (
                    <label key={reason.id} className="flex items-center gap-3 p-3 hover:bg-[#3A3A45] rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedReasons.includes(reason.id)}
                        onChange={() => toggleReason(reason.id)}
                        className="accent-pink-accent"
                      />
                      <span className="text-sm">{reason.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Tell us more (optional)..."
                className="w-full bg-[#0F0F0F] border border-gray-border rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple resize-none h-20"
              />

              <p className="text-xs text-text-secondary bg-[#0F0F0F] p-3 rounded-lg">
                Your feedback is valuable and helps us serve our community better. This information is confidential and separate from your account deletion.
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-border rounded-lg font-semibold hover:bg-[#3A3A45] transition-colors"
                >
                  Keep My Account
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-400">
                  ⚠️ Final Confirmation
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  You're about to permanently delete your account. Type "DELETE" below to confirm.
                </p>
              </div>

              <input
                type="text"
                placeholder='Type "DELETE" to confirm'
                className="w-full bg-[#0F0F0F] border border-gray-border rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-red-500"
                id="deleteConfirm"
              />

              <div className="space-y-2 text-sm text-text-secondary bg-[#0F0F0F] p-3 rounded-lg">
                <p><strong>What happens next:</strong></p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Your profile will be hidden immediately</li>
                  <li>Your matches will be notified of deletion</li>
                  <li>Your data will be deleted after 30 days (recovery window)</li>
                  <li>You'll receive a confirmation email</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 border border-gray-border rounded-lg font-semibold hover:bg-[#3A3A45] transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    const input = document.getElementById('deleteConfirm');
                    if (input.value === 'DELETE') {
                      handleConfirmDeletion();
                    } else {
                      toast.error('Please type DELETE to confirm');
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Delete My Account
                </button>
              </div>

              <p className="text-xs text-text-secondary text-center">
                Need help? <a href="mailto:support@romance.app" className="text-primary-purple hover:underline">Contact support</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
