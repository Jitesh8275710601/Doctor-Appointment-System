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
     <footer className="footer">
    💙 Docure+ 
  <p>Quality healthcare made accessible for everyone.</p>
</footer>


        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Services</p>
            <p>Find Doctors</p>
            <p>Patient Portal</p>
          </div>

          <div>
            <h4>Support</h4>
            <p>FAQ</p>
            <p>Contact Us</p>
            <p>Help Center</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>Email: contact@healthcare.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Medical Center, NY</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 HealthCare+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;