import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";


const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    // Vehicle Selection
    selectedVehicle: null,

    // Trip Details
    serviceType: 'one-way',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    pickupLocation: '',
    dropoffLocation: '',

    // Passenger Details
    passengerCount: 1,
    specialRequests: '',

    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Payment
    paymentMethod: 'card'
  });

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
    (v) => selectedCategory === "" || (v.category || "All Vehicles") === selectedCategory
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVehicleSelect = (vehicle) => {
    setFormData(prev => ({ ...prev, selectedVehicle: vehicle }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const calculateTotal = () => {
    const vehicle = formData.selectedVehicle;
    if (!vehicle) return 0;

    const basePrice = vehicle.rental_price_per_day || 0;
    const passengerMultiplier = Math.max(1, Math.ceil(formData.passengerCount / 4));
    const serviceMultiplier = formData.serviceType === 'round-trip' ? 1.8 : 1;

    return Math.round(basePrice * passengerMultiplier * serviceMultiplier);
  };

  const renderProgressBar = () => (
    <div className="progress-bar">
      <div className="progress-steps">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
            <div className="step-number">{step}</div>
            <div className="step-label">
              {step === 1 && 'Vehicle'}
              {step === 2 && 'Details'}
              {step === 3 && 'Information'}
              {step === 4 && 'Confirmation'}
            </div>
          </div>
        ))}
      </div>
      <div className="progress-line">
        <div className="progress-fill" style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
      </div>
    </div>
  );

  const renderStep1 = () => {
    if (loading) {
      return (
        <div className="booking-step">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading luxury vehicles...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="booking-step">
          <div className="error">
            <p>⚠️ {error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="booking-step">
        <h2>Select Your Vehicle</h2>

        <div className="categories">
          <button
            className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            All Vehicles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${category === selectedCategory ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="vehicles-grid">
          {filteredVehicles.length === 0 ? (
            <div className="no-vehicles">
              <h3>No vehicles available</h3>
              <p>Please check back later or try a different category.</p>
            </div>
          ) : (
            filteredVehicles.map((vehicle) => (
              <div
                className={`vehicle-card ${formData.selectedVehicle?.car_id === vehicle.car_id ? 'selected' : ''}`}
                key={vehicle.car_id}
                onClick={() => handleVehicleSelect(vehicle)}
              >
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="booking-step">
      <h2>Trip Details</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Service Type</label>
          <select
            value={formData.serviceType}
            onChange={(e) => handleInputChange('serviceType', e.target.value)}
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
            <option value="hourly">Hourly Service</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number of Passengers</label>
          <input
            type="number"
            min="1"
            max="12"
            value={formData.passengerCount}
            onChange={(e) => handleInputChange('passengerCount', parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Pickup Date</label>
          <input
            type="date"
            value={formData.pickupDate}
            onChange={(e) => handleInputChange('pickupDate', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Pickup Time</label>
          <input
            type="time"
            value={formData.pickupTime}
            onChange={(e) => handleInputChange('pickupTime', e.target.value)}
          />
        </div>

        {formData.serviceType === 'round-trip' && (
          <>
            <div className="form-group">
              <label>Return Date</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Return Time</label>
              <input
                type="time"
                value={formData.returnTime}
                onChange={(e) => handleInputChange('returnTime', e.target.value)}
              />
            </div>
          </>
        )}

        <div className="form-group full-width">
          <label>Pickup Location</label>
          <input
            type="text"
            placeholder="Enter pickup address"
            value={formData.pickupLocation}
            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>Drop-off Location</label>
          <input
            type="text"
            placeholder="Enter destination address"
            value={formData.dropoffLocation}
            onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
          />
        </div>

        <div className="form-group full-width">
          <label>Special Requests (Optional)</label>
          <textarea
            placeholder="Any special requirements or requests..."
            value={formData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="booking-step">
      <h2>Personal Information</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Payment Method</label>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              />
              <span>Cash Payment</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="corporate"
                checked={formData.paymentMethod === 'corporate'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              />
              <span>Corporate Account</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => {
    const selectedVehicle = formData.selectedVehicle;
    const total = calculateTotal();

    return (
      <div className="booking-step">
        <h2>Booking Confirmation</h2>

        <div className="confirmation-details">
          <div className="booking-summary">
            <h3>Booking Summary</h3>

            {selectedVehicle && (
              <div className="summary-section">
                <h4>Vehicle</h4>
                <div className="vehicle-summary">
                  <img src={getVehicleImage(selectedVehicle)} alt={`${selectedVehicle.brand} ${selectedVehicle.model_name}`} />
                  <div>
                    <p><strong>{selectedVehicle.brand} {selectedVehicle.model_name}</strong></p>
                    <p>Year: {selectedVehicle.year} | Color: {selectedVehicle.color}</p>
                    <p>Seats: {selectedVehicle.seats} | Category: {selectedVehicle.category}</p>
                    <p>Base Price: R{selectedVehicle.rental_price_per_day}/day</p>
                  </div>
                </div>
              </div>
            )}

            <div className="summary-section">
              <h4>Trip Details</h4>
              <p><strong>Service:</strong> {formData.serviceType.replace('-', ' ').toUpperCase()}</p>
              <p><strong>Date:</strong> {formData.pickupDate}</p>
              <p><strong>Time:</strong> {formData.pickupTime}</p>
              <p><strong>Passengers:</strong> {formData.passengerCount}</p>
              <p><strong>From:</strong> {formData.pickupLocation}</p>
              <p><strong>To:</strong> {formData.dropoffLocation}</p>
              {formData.serviceType === 'round-trip' && (
                <>
                  <p><strong>Return Date:</strong> {formData.returnDate}</p>
                  <p><strong>Return Time:</strong> {formData.returnTime}</p>
                </>
              )}
            </div>

            <div className="summary-section">
              <h4>Contact Information</h4>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Payment:</strong> {formData.paymentMethod.replace('-', ' ').toUpperCase()}</p>
            </div>

            {formData.specialRequests && (
              <div className="summary-section">
                <h4>Special Requests</h4>
                <p>{formData.specialRequests}</p>
              </div>
            )}
          </div>

          <div className="price-breakdown">
            <h3>Price Breakdown</h3>
            <div className="price-item">
              <span>Base Price (per day)</span>
              <span>R{selectedVehicle?.rental_price_per_day || 0}</span>
            </div>
            <div className="price-item">
              <span>Service Type</span>
              <span>{formData.serviceType === 'round-trip' ? '×1.8' : '×1.0'}</span>
            </div>
            <div className="price-item">
              <span>Passenger Factor</span>
              <span>×{Math.max(1, Math.ceil(formData.passengerCount / 4))}</span>
            </div>
            <div className="price-total">
              <span><strong>Total</strong></span>
              <span><strong>R{total}</strong></span>
            </div>
          </div>
        </div>

        <div className="terms">
          <label className="checkbox-label">
            <input type="checkbox" required />
            <span>I agree to the Terms & Conditions and Privacy Policy</span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="booking-page">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Cinzel', serif;
                    background: #F9F9F9;
                    line-height: 1.6;
                }

                .booking-page {
                    min-height: 100vh;
                    background: #F9F9F9;
                }

                .booking-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 100px 20px;
                }

                .loading, .error {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 300px;
                    gap: 20px;
                }

                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f0f0f0;
                    border-top: 3px solid #d4af37;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .progress-bar {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    position: relative;
                }

                .progress-steps {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    z-index: 2;
                }

                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }

                .step-number {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #e0e0e0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: #666;
                    transition: all 0.3s ease;
                }

                .step.active .step-number {
                    background: #d4af37;
                    color: #000;
                }

                .step-label {
                    font-size: 0.9rem;
                    color: #666;
                    font-weight: 600;
                }

                .step.active .step-label {
                    color: #333;
                }

                .progress-line {
                    position: absolute;
                    top: 50px;
                    left: 50px;
                    right: 50px;
                    height: 2px;
                    background: #e0e0e0;
                    z-index: 1;
                }

                .progress-fill {
                    height: 100%;
                    background: #d4af37;
                    transition: width 0.3s ease;
                }

                .booking-content {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    min-height: 500px;
                    display: flex;
                    flex-direction: column;
                }

                .booking-step {
                    padding: 40px;
                    flex: 1;
                }

                .booking-step h2 {
                    margin-bottom: 30px;
                    color: #333;
                    font-size: 1.8rem;
                    text-align: center;
                }

                .categories {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 30px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .category-btn {
                    background: white;
                    border: 1px solid #e5e5e5;
                    padding: 10px 20px;
                    border-radius: 100px;
                    cursor: pointer;
                    font-family: 'Cinzel', serif;
                    font-size: 14px;
                    font-weight: 500;
                    color: #666;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }

                .category-btn:hover {
                    background: #f9f9f9;
                    border-color: #d4af37;
                    transform: translateY(-1px);
                }

                .category-btn.active {
                    background: #d4af37;
                    border-color: #d4af37;
                    color: white;
                    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
                }

                .vehicles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 25px;
                }

                .vehicle-card {
                    background: white;
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .vehicle-card:hover {
                    border-color: #d4af37;
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                }

                .vehicle-card.selected {
                    border-color: #d4af37;
                    background: #fefdf8;
                    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
                    transform: translateY(-4px);
                }

                .vehicle-image {
                    position: relative;
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                }

                .vehicle-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .vehicle-card:hover .vehicle-image img {
                    transform: scale(1.05);
                }

                .price-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    color: white;
                    padding: 6px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .vehicle-content {
                    padding: 20px;
                }

                .vehicle-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 8px;
                    line-height: 1.3;
                }

                .vehicle-meta {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 12px;
                    font-size: 12px;
                    color: #666;
                    flex-wrap: wrap;
                }

                .vehicle-meta span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .vehicle-description {
                    color: #555;
                    font-size: 13px;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .form-group.full-width {
                    grid-column: 1 / -1;
                }

                .form-group label {
                    font-weight: 600;
                    color: #333;
                }

                .form-group input,
                .form-group select,
                .form-group textarea {
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: 'Cinzel', serif;
                    transition: border-color 0.3s ease;
                }

                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #d4af37;
                }

                .payment-options {
                    display: flex;
                    gap: 20px;
                    margin-top: 10px;
                    flex-wrap: wrap;
                }

                .payment-option {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }

                .confirmation-details {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 30px;
                }

                .booking-summary {
                    background: #f8f8f8;
                    padding: 25px;
                    border-radius: 8px;
                }

                .summary-section {
                    margin-bottom: 25px;
                }

                .summary-section h4 {
                    margin-bottom: 10px;
                    color: #333;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                }

                .summary-section p {
                    margin-bottom: 5px;
                    color: #555;
                }

                .vehicle-summary {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .vehicle-summary img {
                    width: 100px;
                    height: 70px;
                    object-fit: cover;
                    border-radius: 6px;
                }

                .price-breakdown {
                    background: #f8f8f8;
                    padding: 25px;
                    border-radius: 8px;
                    height: fit-content;
                }

                .price-breakdown h3 {
                    margin-bottom: 20px;
                    color: #333;
                }

                .price-item {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    color: #555;
                }

                .price-total {
                    display: flex;
                    justify-content: space-between;
                    border-top: 2px solid #d4af37;
                    padding-top: 15px;
                    margin-top: 15px;
                    font-size: 1.2rem;
                }

                .terms {
                    margin-top: 30px;
                    text-align: center;
                }

                .checkbox-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .navigation-buttons {
                    display: flex;
                    justify-content: space-between;
                    padding: 30px 40px;
                    border-top: 1px solid #e0e0e0;
                    background: #f8f8f8;
                }

                .btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: 'Cinzel', serif;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .btn-secondary {
                    background: #e0e0e0;
                    color: #333;
                }

                .btn-secondary:hover {
                    background: #d0d0d0;
                }

        .btn-primary {
          background: #d4af37;
          color: #000;
        }

        .btn-primary:hover {
          background: #b8941f;
          transform: translateY(-1px);
        }

        .btn-success {
          background: #28a745;
          color: white;
          font-size: 1.1rem;
          padding: 15px 30px;
        }

        .btn-success:hover {
          background: #218838;
        }

        @media (max-width: 768px) {
          .booking-container {
            padding: 0 10px;
          }

          .progress-steps {
            flex-wrap: wrap;
            gap: 10px;
          }

          .progress-line {
            display: none;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .confirmation-details {
            grid-template-columns: 1fr;
          }

          .payment-options {
            flex-direction: column;
            gap: 10px;
          }

          .navigation-buttons {
            padding: 20px;
          }

          .booking-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <Navbar />

      <div className="booking-container">
        {renderProgressBar()}

        <div className="booking-content">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="navigation-buttons">
            <div>
              {currentStep > 1 && (
                <button className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
              )}
            </div>
            <div>
              {currentStep < 4 ? (
                <button className="btn btn-primary" onClick={nextStep}>
                  Next Step
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => alert('Booking confirmed! You will receive a confirmation email shortly.')}>
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;