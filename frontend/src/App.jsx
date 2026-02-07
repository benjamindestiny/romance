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
import Collaborate from "./pages/Collaborate.jsx";
import Profiles from "./pages/Profiles.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forget" element={<ForgotPassword />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="billing" element={<Billing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="report" element={<Reports />} />
        <Route path="journey" element={<Journey />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="collaborate" element={<Collaborate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
