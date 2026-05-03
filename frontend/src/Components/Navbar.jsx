import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">
        💙 <span>DocCure+</span>
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Nav Links */}
      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link to="/finddoctor" onClick={() => setMenuOpen(false)}>Find Doctor</Link>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Resgister</Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;