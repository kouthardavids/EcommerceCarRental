import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import './detail.css';

const CarBookingDetailPage = () => {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        // Fetch car details
        const vehicleRes = await fetch(`http://localhost:5005/api/vehicle/vehicles/${id}`);
        if (!vehicleRes.ok) {
          const text = await vehicleRes.text();
          throw new Error(`Error ${vehicleRes.status}: ${text}`);
        }
        const vehicleData = await vehicleRes.json();

        // Fetch images separately
        const imagesRes = await fetch(`http://localhost:5005/api/vehicle/vehicles/${id}/images`);
        if (!imagesRes.ok) {
          const text = await imagesRes.text();
          throw new Error(`Error ${imagesRes.status}: ${text}`);
        }
        const imagesData = await imagesRes.json();

        // Assume imagesData is an array of URLs, assign to vehicleData.images
        vehicleData.images = imagesData;

        setCar(vehicleData);
        setCurrentImageIndex(0);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load car');
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  const nextImage = () => {
    if (!car?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    if (!car?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleMessageSubmit = () => {
    if (!contactInfo.name || !contactInfo.email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Message sent successfully! We will contact you within 24 hours.');
    setShowMessageModal(false);
    setMessage('');
    setContactInfo({ name: '', email: '', phone: '' });
  };

  const handleBookNow = () => {
    alert('Redirecting to booking form...');
  };

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>No car data found.</p>;

  return (
    <div className="car-detail-page">
      <Navbar />

      <div className="container">
        <div className="car-header">
          <h1 className="car-title">{car.brand} {car.model_name}</h1>
          <p className="car-subtitle">{car.year} • {car.category} • {car.color}</p>
        </div>

        <div className="main-content">
          <div className="image-gallery">
            <div className="main-image-container">
              <img
                src={
                  car.images && car.images.length > 0
                    ? car.images[currentImageIndex]
                    : 'https://via.placeholder.com/800x600?text=No+Image'
                }
                alt={`${car.brand} ${car.model_name}`}
                className="main-image"
              />
              {car.images && car.images.length > 1 && (
                <>
                  <button className="image-nav prev" onClick={prevImage}>‹</button>
                  <button className="image-nav next" onClick={nextImage}>›</button>
                  <div className="image-counter">{currentImageIndex + 1} / {car.images.length}</div>
                </>
              )}
            </div>

            {car.images && car.images.length > 1 && (
              <div className="thumbnail-container">
                {car.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${car.brand} ${car.model_name} ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="car-info">
            <div className="price-card">
              <div className="price">R{car.rental_price_per_day}</div>
              <div className="price-period">per day</div>

              <div className="action-buttons">
                <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
                <button className="btn btn-secondary" onClick={() => setShowMessageModal(true)}>Send Message</button>
              </div>
            </div>

            <div className="info-card">
              <h3 className="card-title">Quick Specifications</h3>
              <div className="quick-specs">
                <div className="spec-item">
                  <span className="spec-label">Seats:</span>
                  <span className="spec-value">{car.seats}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Year:</span>
                  <span className="spec-value">{car.year}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Engine:</span>
                  <span className="spec-value">{car.specifications?.engine}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Power:</span>
                  <span className="spec-value">{car.specifications?.power}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3 className="card-title">Description</h3>
          <p className="description">{car.description}</p>
        </div>

        <div className="details-section">
          <div className="info-card">
            <h3 className="card-title">Premium Features</h3>
            <div className="features-list">
              {car.features?.map((feature, index) => (
                <div key={index} className="feature-item"><span>✓</span> <span>{feature}</span></div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <h3 className="card-title">Full Specifications</h3>
            <div className="specs-grid">
              {car.specifications &&
                Object.entries(car.specifications).map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <span className="spec-label">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {showMessageModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Send us a Message</h3>
              <button className="close-btn" onClick={() => setShowMessageModal(false)}>×</button>
            </div>

            <div>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi, I'm interested in booking the ${car.brand} ${car.model_name}. Could you please provide more information about availability and pricing?`}
                />
              </div>

              <button onClick={handleMessageSubmit} className="btn-submit">Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarBookingDetailPage;
