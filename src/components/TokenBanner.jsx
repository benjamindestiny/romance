import React from 'react';

// Small banner that shows if the current resource was accessed via token
export default function TokenBanner({ resource }) {
  const token = sessionStorage.getItem(`token_${resource}`);
  if (!token) return null;

  const masked = token.length > 10 ? `${token.slice(0, 6)}...${token.slice(-4)}` : token;

  return (
    <div className="bg-gradient-to-r from-yellow-900/10 to-transparent border border-yellow-700/20 rounded-lg p-3 mb-4 text-sm">
      <strong className="text-yellow-300">Token Access:</strong> You are viewing this page using a token ({masked}). This is a frontend-only preview — server-side validation should be implemented for production.
    </div>
  );
}
