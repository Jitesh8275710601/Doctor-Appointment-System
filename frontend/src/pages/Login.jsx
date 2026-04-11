import React from "react";
import "../styles/Login.css";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="header">
          <div className="logo">💙</div>
          <h2>HealthCare+</h2>
          <h1>Welcome Back</h1>
          <p>Sign in to manage your healthcare</p>
        </div>

        {/* Form */}
        <div className="form" >
          <h3>Patient Login</h3>
          <p className="sub-text">
            Access your appointments and medical records
          </p>

          <label>Email</label>
          <input type="email" placeholder="patient@example.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>

          <button className="btn" onClick={() => navigate("/home")}>
            Sign In
          </button>

          <p className="signup">
            Don’t have an account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;