import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Billing from "./pages/Billing";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="billing" element={<Billing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
