import React from "react";
import "../styles/Register.css";

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="header">
          <div className="logo">💙</div>
          <h2>HealthCare+</h2>
          <h1>Create Your Account</h1>
          <p>Join thousands of patients using HealthCare+</p>
        </div>

        <form className="form">
          <h2>Register</h2>
          <p className="sub-text">Fill in your information to get started</p>

          <input type="text" placeholder="First Name *" />
          <input type="text" placeholder="Last Name *" />
          <input type="email" placeholder="Email Address *" />
          <input type="tel" placeholder="Phone Number *" />
          <input type="date" placeholder="Date of Birth *" />
          <input type="password" placeholder="Password *" />
          <small className="hint">Must be at least 8 characters</small>
          <input type="password" placeholder="Confirm Password *" />

          <div className="checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <span>Terms & Conditions</span> and{" "}
              <span>Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="btn">
            Create Account
          </button>

          <p className="signin">
            Already have an account? <span>Sign in</span>
          </p>
        </form>

        <p className="back">← Back to Home</p>
      </div>
    </div>
  );
};

export default Register;