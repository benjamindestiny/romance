import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem('user');
      return raw ? JSON.parse(raw) : { id: null, name: 'Guest', plan: 'basic' };
    } catch (e) {
      return { id: null, name: 'Guest', plan: 'basic' };
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('user', JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
