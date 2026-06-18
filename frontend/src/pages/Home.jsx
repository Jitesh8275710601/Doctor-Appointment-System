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
            <button className="primary-btn">
                Book Appointment
            </button>

            <button className="secondary-btn">
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
        <button className="secondary-btn">Book Your Appointment Now</button>
      </section>

      {/* FOOTER */}
<footer className="footer">
  <div className="footer-container">

    {/* Logo & Description */}
    <div className="footer-logo">
      <h2>💙 Docure+</h2>
      <p>
        Quality healthcare made accessible for everyone.
      </p>
    </div>

    {/* Footer Links */}
    <div className="footer-links">

      <div className="footer-column">
        <h4>Quick Links</h4>
        <a href="/">About Us</a>
        <a href="/">Services</a>
        <a href="/">Find Doctors</a>
        <a href="/">Patient Portal</a>
      </div>

      <div className="footer-column">
        <h4>Support</h4>
        <a href="/">FAQ</a>
        <a href="/">Contact Us</a>
        <a href="/">Help Center</a>
      </div>

      <div className="footer-column">
        <h4>Contact</h4>
        <p>📧 contact@healthcare.com</p>
        <p>📞 +1 (555) 123-4567</p>
        <p>📍 123 Medical Center, NY</p>
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