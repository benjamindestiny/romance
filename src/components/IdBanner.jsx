import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function IdBanner({ resource }) {
  const params = useParams();
  const location = useLocation();
  const searchId = new URLSearchParams(location.search).get('id');
  const pathId = params.id;
  const id = pathId || searchId;

  if (!id) return null;

  return (
    <div className="bg-card-bg rounded-lg p-3 mb-6 text-sm">
      <strong className="mr-2">{resource || 'Resource'} ID:</strong>
      <span className="text-text-secondary">{id}</span>
      <div className="mt-2 text-xs text-text-secondary">This is a frontend-only display to help backend integration. The server should validate and authorize access for this ID.</div>
    </div>
  );
}
