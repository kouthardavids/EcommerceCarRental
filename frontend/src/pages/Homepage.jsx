import React from "react";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <NavBar />
      
      <section className="slideshow">
        <div className="slide-track">
          <img src="1.jpg" alt="Luxury Car 1" />
          <img src="2.jpg" alt="Luxury Car 2" />
          <img src="3.jpg" alt="Luxury Car 3" />
          <img src="4.jpg" alt="Luxury Car 4" />
          <img src="5.jpg" alt="Luxury Car 5" />
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>OUR SERVICES</h2>
          <h1>Tailored Luxury Transportation</h1>
          <div className="service-grid">
            <div className="service-card">
              <h3>Corporate Travel</h3>
              <p>Impeccable service for executives with strict punctuality and discretion.</p>
            </div>
            <div className="service-card">
              <h3>Special Events</h3>
              <p>Weddings, galas, and celebrations with our luxury fleet.</p>
            </div>
            <div className="service-card">
              <h3>Airport Transfers</h3>
              <p>Seamless airport transportation with flight monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready for Your Luxury Experience?</h2>
          <p>Contact us now to arrange your private chauffeur service</p>
          <a href="#" className="btn">GET A QUOTE</a>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <h3>ChauffeurLux</h3>
              <p>Providing exceptional chauffeur services. Luxury, discretion, and professionalism at every turn.</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/catalogue">Catalogue</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3 id="contact">Contact</h3>
              <ul>
                <li>+27 21 987 6543</li>
                <li>+27 83 459 7890</li>
                <li>info@chauffeurlux.com</li>
                <li>25 Bree Street, Cape Town</li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 ChauffeurLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;