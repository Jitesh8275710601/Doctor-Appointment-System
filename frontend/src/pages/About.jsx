import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">💙 <span>HealthCare+</span></div>
        <div className="menu">☰</div>
      </header>

      {/* HERO / ABOUT */}
      <section className="about-hero">
        <h1>About HealthCare+</h1>
        <p>
          We're on a mission to make quality healthcare accessible,
          convenient, and affordable for everyone.
        </p>

      <img
  src="/doctormain.png"
  alt="Doctor"
  className="doctormain"
/>
      </section>

      {/* STORY */}
      <section className="story">
        <h2>Our Story</h2>
        <p>
          Founded in 2015, HealthCare+ began with a simple vision: to bridge
          the gap between patients and quality healthcare providers.
        </p>

        <p>
          Today, we've grown into a leading healthcare platform, serving over
          50,000 patients and partnering with more than 500 certified medical
          professionals.
        </p>

        <p>
          Our platform combines cutting-edge technology with compassionate care.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">

        <div className="box">
          <h3>🎯 Our Mission</h3>
          <p>
            To empower individuals to take control of their health by
            providing easy access to quality healthcare services.
          </p>
        </div>

        <div className="box">
          <h3>🚀 Our Vision</h3>
          <p>
            To become the most trusted healthcare platform globally through
            innovation, technology, and compassion.
          </p>
        </div>

      </section>

      {/* CORE VALUES */}
      <section className="values">
        <h2>Our Core Values</h2>

        <div className="value-list">

          <div className="value-card">
            ❤️ <h4>Compassionate Care</h4>
            <p>We treat every patient with empathy and respect.</p>
          </div>

          <div className="value-card">
            🛡️ <h4>Patient Safety</h4>
            <p>Your safety is our top priority.</p>
          </div>

          <div className="value-card">
            ⭐ <h4>Excellence</h4>
            <p>We strive for the highest standards.</p>
          </div>

          <div className="value-card">
            🤝 <h4>Collaboration</h4>
            <p>Working together to deliver better care.</p>
          </div>

        </div>
      </section>

      {/* JOURNEY */}
      <section className="journey">
        <h2>Our Journey</h2>

        <div className="timeline">
          <div className="step">
            <span>2015</span>
            <p>Founded</p>
          </div>

          <div className="step">
            <span>2018</span>
            <p>50K Patients</p>
          </div>

          <div className="step">
            <span>2021</span>
            <p>100+ Doctors</p>
          </div>

          <div className="step">
            <span>2026</span>
            <p>500+ Doctors</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <h2>Leadership Team</h2>

        <div className="team-list">

          <div className="team-card">
            <img src="/doctor1.png" alt="doctor" />
            <h4>Dr. Chinmay Pujare</h4>
            <p>Chief Medical Officer</p>
          </div>

          <div className="team-card">
            <img src="/doctor1.png" alt="doctor" />
            <h4>Dr. Roshan Shirke</h4>
            <p>Director of Cardiology</p>
          </div>

          <div className="team-card">
            <img src="/doctor1.png" alt="doctor" />
            <h4>Dr. Jitesh Khadapkar</h4>
            <p>Head of Pediatrics</p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <h2>500+</h2>
          <p>Expert Doctors</p>
        </div>

        <div>
          <h2>50K+</h2>
          <p>Happy Patients</p>
        </div>

        <div>
          <h2>25+</h2>
          <p>Specialties</p>
        </div>

        <div>
          <h2>4.9</h2>
          <p>Average Rating</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>💙 HealthCare+</h3>
        <p>Quality healthcare made accessible for everyone.</p>

        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Services</p>
            <p>Find Doctors</p>
          </div>

          <div>
            <h4>Support</h4>
            <p>FAQ</p>
            <p>Contact</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>Email: contact@healthcare.com</p>
            <p>Phone: +1 555 123 4567</p>
          </div>
        </div>

        <p className="copyright">
          © 2026 HealthCare+. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default About;