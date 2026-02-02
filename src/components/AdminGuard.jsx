import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { validateToken } from '../utils/validateToken';

// AdminGuard: frontend-only demo guard that accepts a token via query param (?token=...)
// or respects a sessionStorage flag set after successful validation.
export default function AdminGuard({ children }) {
  const loc = useLocation();
  const [state, setState] = useState({ loading: true, ok: false });

  useEffect(() => {
    async function check() {
      // If we already validated in this session, allow
      const session = sessionStorage.getItem('isAdmin');
      if (session === 'true') {
        setState({ loading: false, ok: true });
        return;
      }

      const params = new URLSearchParams(loc.search);
      const token = params.get('token') || params.get('t'); // support t as short param

      if (!token) {
        setState({ loading: false, ok: false });
        return;
      }

      // Validate token with frontend mock validator (replace with backend call in prod)
      const valid = await validateToken(token);
      if (valid) {
        // Mark session — this is just for demo. In production, backend should return a session/jwt.
        sessionStorage.setItem('isAdmin', 'true');
        setState({ loading: false, ok: true });
      } else {
        setState({ loading: false, ok: false });
      }
    }

    check();
  }, [loc.search]);

  if (state.loading) return <div className="p-6">Checking admin access…</div>;
  if (!state.ok) {
    // Show friendly instructions for developers to try a demo token
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Admin access required</h2>
        <p className="text-sm text-text-secondary mb-4">To demo the admin panel locally, open a URL like:</p>
        <pre className="bg-[#0F0F0F] p-3 rounded text-xs">/admin?token=demo-abc123def456ghi-7890</pre>
        <p className="text-sm text-text-secondary mt-3">This is a frontend-only demo. For production, implement a backend API that validates tokens and issues a server-side session or JWT.</p>
      </div>
    );
  }

  return <>{children}</>;
}
