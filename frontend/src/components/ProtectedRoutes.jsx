import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 * 
 * Purpose: Wrap any page that should only be accessible to logged-in users
 * (Dashboard, Settings, Collaborate, Profiles, Journey, Reports, etc.)
 * 
 * How it works:
 * - Checks for JWT token in localStorage (same method used in Login/Signup)
 * - If no token → instantly redirects to login page
 * - If token exists → renders the protected children
 * 
 * Why this method? 
 * Client-side route guard using useEffect + useNavigate (standard React Router v6 pattern).
 * Prevents direct URL access by unregistered users while keeping the code clean and reusable.
 */

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/"); // redirects to Login page
    }
  }, [token, navigate]);

  // Return children only if authenticated, otherwise nothing (redirect happens)
  return token ? children : null;
};

export default ProtectedRoutes;