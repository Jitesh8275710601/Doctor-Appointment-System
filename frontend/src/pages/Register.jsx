import React from "react";
import "../styles/Register.css";

const Register = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="logo">💙</div>

        <h2 className="title">DocCure+</h2>
        <h3>Create Your Account</h3>
        <p className="subtitle">
          Join thousands of patients using DocCure+
        </p>

        <form className="form">
          <h4>Register</h4>
          <p className="small-text">Fill in your information to get started</p>

          <input type="text" placeholder="First Name *" />
          <input type="text" placeholder="Last Name *" />
          <input type="email" placeholder="Email Address *" />
          <input type="tel" placeholder="Phone Number *" />
          <input type="date" placeholder="dd-mm-yyyy" />
          <input type="password" placeholder="Password *" />
          <small>Must be at least 8 characters</small>
          <input type="password" placeholder="Confirm Password *" />

          <div class="checkbox-container">
            <input type="checkbox" id="agree" />
            <label for="agree">I agree to the Terms & Conditions and Privacy Policy</label>
          </div>

          <button type="submit" className="btn">
            Create Account
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <a href="#">Sign in</a>
        </p>

        <p className="back">← Back to Home</p>
      </div>
    </div>
  );
};


export default Register;