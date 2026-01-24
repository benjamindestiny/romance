import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Billing from "./pages/Billing"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="billing" element={<Billing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
