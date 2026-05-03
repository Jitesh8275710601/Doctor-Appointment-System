import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import FindDoctor from "./pages/Finddoctor";
import Navbar from "./Components/Navbar";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <>
      <Navbar /> {/* 👈 Always visible */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/finddoctor" element={<FindDoctor />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
      </Routes>
    </>
  );
}

export default App;