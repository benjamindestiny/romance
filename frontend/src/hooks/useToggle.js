import { useState, useCallback } from 'react';

// Tiny utility hook for boolean toggles
export default function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle, setOn];
}
