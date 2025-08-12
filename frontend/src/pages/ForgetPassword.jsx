import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgot-password.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        // Simulate an API call
        setTimeout(() => {
            if (email === 'error@example.com') {
                setError('Could not find a user with that email.');
            } else {
                setSuccessMessage('A password reset link has been sent to your email.');
            }
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="forgot-password-container">
            {/* Top-left logo and brand name */}
            <Link to="/" className="logo-link">
                <img
                    src="https://via.placeholder.com/40x40.png?text=L"
                    alt="ChauffeurLux Logo"
                    style={{ height: '40px', width: '40px' }}
                />
                ChauffeurLux
            </Link>

            {/* Main form container */}
            <div className="form-card">
                <h2 className="form-title">
                    Forgot Your Password?
                </h2>

                <p className="form-description">
                    Enter your email to receive a password reset link.
                </p>

                {/* Email submission form */}
                <form className="forgot-password-form" onSubmit={handleEmailSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="form-button"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                {/* Display error or success message */}
                {error && (
                    <p className="error-message">{error}</p>
                )}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}

                {/* Link to return to the login page */}
                <p className="return-link">
                    <Link to="/login" className="return-link-anchor">
                        Return to Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}