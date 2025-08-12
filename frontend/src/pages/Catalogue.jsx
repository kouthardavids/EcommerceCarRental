import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../components/Navbar";
import './catalogue.css'

const Catalogue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5005/api/vehicle/vehicles-with-images')
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        setVehicles(data);
        const uniqueCategories = [...new Set(data.map(v => v.category || "All Vehicles"))];
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || "");
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  }, []);

  const getVehicleImage = (vehicle) => {
    if (vehicle.images && vehicle.images.length > 0) {
      return vehicle.images[0];
    }
    return `https://images.unsplash.com/photo-1549317336-206569e8475c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80`;
  };

  const filteredVehicles = vehicles.filter(
    (v) => (v.category || "All Vehicles") === selectedCategory
  );

  if (loading) {
    return (
      <div className="catalogue-app">
        <NavBar />
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading luxury vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogue-app">
        <NavBar />
        <div className="error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogue-app">

      <NavBar />

      <div className="container">
        <div className="header">
          <h1>All Available Cars</h1>
          <p>Discover luxury vehicles for every occasion</p>
        </div>

        <div className="vehicles-grid">
          {filteredVehicles.length === 0 ? (
            <div className="no-vehicles">
              <h3>No vehicles available</h3>
              <p>Please check back later or try a different category.</p>
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <div className="vehicle-card" key={vehicle.car_id}>
                <div className="vehicle-image">
                  <img
                    src={getVehicleImage(vehicle)}
                    alt={`${vehicle.brand} ${vehicle.model_name}`}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80";
                    }}
                  />
                  <div className="price-badge">
                    R{vehicle.rental_price_per_day || "TBD"}/day
                  </div>
                </div>

                <div className="vehicle-content">
                  <h3 className="vehicle-title">
                    {vehicle.brand} {vehicle.model_name}
                  </h3>

                  <div className="vehicle-meta">
                    <span>🗓️ {vehicle.year}</span>
                    <span>👥 {vehicle.seats} seats</span>
                    <span>🎨 {vehicle.color}</span>
                  </div>

                  <p className="vehicle-description">
                    {vehicle.description || "Experience luxury and comfort with this premium vehicle, perfect for any occasion."}
                  </p>

                  <Link to={`/details/${vehicle.car_id}`}>
                    <button className="book-btn">Book Now</button>
                  </Link>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer>
        <p>&copy; 2025 ChauffeurLux - Luxury Transportation</p>
      </footer>
    </div>
  );
};

export default Catalogue;