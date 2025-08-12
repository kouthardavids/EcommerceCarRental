import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"; 

const Navbar = () => {
  return (
    <header>
      <div className="logo">
        <img src="logo.png" alt="ChauffeurLux Logo" />
        <span>ChauffeurLux</span>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalogue">Catalogue</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><HashLink smooth to="/#contact">Contact</HashLink></li>
          <li><Link to="/booking" className="cta">Book Now</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
