import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🕰️ TimeCapsule</div>
      
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#examples">Examples</a></li>
        <li><a href="#contact">Contact Us</a></li>
        <li><Link to="/auth">Auth</Link></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="auth-btn">Login</Link>
        <Link to="/register" className="auth-btn register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
