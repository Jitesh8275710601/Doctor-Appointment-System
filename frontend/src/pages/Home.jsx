import React from "react";
import "../styles/Home.css"; // adjust path if needed


const doctors = [
  {
    name: "Dr. Chinmay Pujare",
    specialty: "Cardiologist",
    rating: 4.9,
    patients: "2500+ patients",
    img: "/doctor1.png",
  },
  {
    name: "Dr. Roshan Shirke",
    specialty: "Neurologist",
    rating: 4.8,
    patients: "3200+ patients",
    img: "/doctor1.png",
  },
  {
    name: "Dr. Jitesh Khadapkar",
    specialty: "Pediatrician",
    rating: 5.0,
    patients: "1800+ patients",
    img: "/doctor1.png",
  },
];

const Home = () => {
  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Your Health, Our Priority</h1>
        <p>
          Book appointments with top doctors instantly. Quality healthcare made
          accessible and convenient for everyone.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Book Appointment</button>
          <button className="secondary-btn">Learn More</button>
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
            <h2>4.9</h2>
            <p>Rating</p>
          </div>
        </div>
<img
  src="/doctormain.png"
  alt="Doctor"
  className="doctormain"
/>
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
        </div>
      </section>

      {/* DOCTORS SECTION */}
      <section className="doctors">
        <h2>Meet Our Doctors</h2>
        <p>Trusted healthcare professionals at your service</p>

        <div className="doctor-list">
          {doctors.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <img src={doc.img} alt={doc.name} />
              <h3>{doc.name}</h3>
              <p className="specialty">{doc.specialty}</p>
              <p>⭐ {doc.rating}</p>
              <p className="patients">{doc.patients}</p>
              <button className="primary-btn">View Profile</button>
            </div>
          ))}
        </div>
      </section>

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
        <div className="footer-top">
          <h3>HealthCare+</h3>
          <p>
            Quality healthcare made accessible for everyone. Your health, our
            priority.
          </p>
        </div>

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