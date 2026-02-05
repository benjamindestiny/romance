import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Billing from "./pages/Billing";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import Reports from "./pages/Reports.jsx";
import Quiz from "./pages/Quiz.jsx";
import Journey from "./pages/Journey.jsx";
import ToastProvider from "./components/ToastProvider.jsx";
import Collaborate from "./pages/Collaborate.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="billing" element={<Billing />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/reports" element={<Reports />} />

        {/* Journey (coming soon) */}
        <Route path="/journey" element={<Journey />} />

        {/* Quiz (coming soon) */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Collaborate (coming soon) */}
        <Route path="/collaborate" element={<Collaborate />} />
      </Routes>
    </>
  );
};

export default App;
