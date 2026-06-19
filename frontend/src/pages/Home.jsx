import React from "react";
import "../styles/Home.css"; // adjust path if needed


const Home = () => {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">

    <div className="hero-content">

        <span className="hero-tag">
            Trusted Healthcare Platform
        </span>

        <h1>
            Your Health,
            <span> Our Priority</span>
        </h1>

        <p>
            Book appointments with top doctors instantly.
            Quality healthcare made accessible and
            convenient for everyone.
        </p>

        <div className="hero-buttons">
            <button className="primary-btn"  onClick={() => window.open("/Finddoctor", "_self")}>
                Book Appointment
            </button>

            <button className="secondary-btn"  onClick={() => window.open("/Services", "_self")}>
                Learn More
            </button>
        </div>

        <div className="stats">

            <div>
                <h2>500+</h2>
                <p>Doctors</p>
            </div>

            <div>
                <h2>50K+</h2>
                <p>Patients</p>
            </div>

            <div>
                <h2>4.9★</h2>
                <p>Rating</p>
            </div>

        </div>

    </div>

    <div className="hero-image">

        <img src="/doctormain.png" alt="Doctor"/>

    </div>

</section>

      {/* WHY CHOOSE US */}
      <section className="features">
        <h2>Why Choose Us</h2>
        <p>Experience healthcare that puts you first</p>

        <div className="feature-cards">
          <div className="card">
            <h3>Easy Booking</h3>
            <p>Book appointments in seconds with our intuitive interface</p>
          </div>

          <div className="card">
            <h3>Expert Doctors</h3>
            <p>Access to certified and experienced professionals</p>
          </div>

          <div className="card">
            <h3>24/7 Support</h3>
            <p>Round-the-clock assistance for your healthcare needs</p>
          </div>

            <div className="card">
            <h3>Convenient Access</h3>
            <p>Access healthcare services from the comfort of your home</p>
          </div>
        </div>
      </section>

      {/* DOCTORS SECTION */}
    
      {/* CTA SECTION */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of patients who trust us with their healthcare
        </p>
        <button className="secondary-btn" 
        onClick={() => window.open("/Finddoctor", "_self")}
        >Book Your Appointment Now</button>
      </section>

      {/* FOOTER */}
<footer className="footer">
  <div className="footer-container">

    {/* Logo & Description */}
    <div className="footer-logo">
      <h2 style={{ color: "white"}}>💙 Docure+</h2>
      <p>
        Quality healthcare made accessible for everyone.
      </p>
    </div>

    {/* Footer Links */}
    <div className="footer-links">

      <div className="footer-column">
        <h4>Quick Links</h4>
        <a href="/about">About Us</a>
        <a href="/Services">Services</a>
        <a href="/Finddoctor">Find Doctors</a>
        <a href="/home">Patient Portal</a>
      </div>

      <div className="footer-column">
        <h4>Support</h4>
        <p href="/">FAQ</p>
        <a href="tel:+918275710601">Contact Us</a>
        <p href="/">Help Center</p>
      </div>

      <div className="footer-column">
        <h4>Contact</h4>
        <a href="mailto:jiteshkhadapkar03@gmail.com">📧 contact@healthcare.com</a>
        <a  href="tel:+918275710601">📞 +1 (555) 123-4567</a>
        <a href="https://maps.app.goo.gl/gBdvFmfxKyqYz3Jc8">📍 123 Medical Center, NY</a>
      </div>

    </div>

    {/* Social Icons */}
    <div className="footer-social">
      <a href="/">f</a>
      <a href="/">𝕏</a>
      <a href="/">📷</a>
      <a href="/">in</a>
    </div>

    <hr />

    {/* Copyright */}
    <div className="footer-bottom">
      © 2026 Docure+. All rights reserved.
    </div>

  </div>
</footer>
    </div>
  );
};

export default Home;