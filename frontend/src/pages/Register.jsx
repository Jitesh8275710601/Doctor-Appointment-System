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
          <input type="text" placeholder="First Name *" />
          <input type="text" placeholder="Last Name *" />
          <input type="email" placeholder="Email Address *" />
          <input type="tel" placeholder="Phone Number *" />
          <input type="date" placeholder="dd-mm-yyyy" />
          <input type="password" placeholder="Password *" />
          <small>Must be at least 8 characters</small>
          <input type="password" placeholder="Confirm Password *" />

         <label className="checkbox-container">
  <input type="checkbox" />

  <span>
    I agree to the Terms & Conditions and Privacy Policy
  </span>
</label>

          <button type="submit" className="btn">
            Create Account
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
};


export default Register;