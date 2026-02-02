import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// TokenGuard (renamed behavior): now a light IdGuard that reads an `id` from path or query.
// Frontend-only: it stores the id in session for dev convenience and displays nothing else.
// Backend note: the server should validate and authorize resource access for this `id`.
export default function TokenGuard({ children, resource = 'generic' }) {
  const location = useLocation();
  const params = useParams();
  const search = new URLSearchParams(location.search);
  const queryId = search.get('id');
  const pathId = params.id;
  const id = pathId || queryId;

  useEffect(() => {
    if (id) {
      sessionStorage.setItem(`id_${resource}`, id);
    }
  }, [id, resource]);

  return children;
}
