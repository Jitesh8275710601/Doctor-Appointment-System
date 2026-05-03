import React from "react";
import "../styles/Login.css";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      <div className="card">
        <h2 className="logo">DocCure+</h2>
        <h3>Welcome Back</h3>
        <p className="subtitle">Sign in to manage your DocCure</p>

        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="patient@example.com"
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
          />

          <div class="login-options">
            <div class="remember-container">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember me</label>
            </div>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>


          <button type="submit">Sign In</button>
        </form>

        <p className="signup">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};
export default Login;