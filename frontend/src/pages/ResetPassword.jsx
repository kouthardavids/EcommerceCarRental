import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './reset-password.css';

export default function ResetPasswordPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState('customer');

    // Get user type from URL parameters, defaulting to 'customer'
    useEffect(() => {
        const typeFromUrl = searchParams.get('type');
        if (typeFromUrl && (typeFromUrl === 'admin' || typeFromUrl === 'employee' || typeFromUrl === 'customer')) {
            setUserType(typeFromUrl);
        }
    }, [searchParams]);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        // Simulate an API call with a delay
        try {
            console.log('Sending reset password request with token:', token);
            console.log('New password:', password);
            console.log('User type:', userType);

            // Placeholder for an actual API call
            setTimeout(() => {
                const isSuccess = true; // Simulating a successful response
                if (isSuccess) {
                    setSuccessMessage('Password reset successful. Redirecting to login...');
                    setTimeout(() => navigate('/login'), 2500);
                } else {
                    setError('Reset failed. Please try again.');
                }
                setLoading(false);
            }, 2000);
            
        } catch (err) {
            setError('Reset failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <Link to="/" className="logo-link">
                <img
                    src="https://via.placeholder.com/40x40.png?text=L"
                    alt="ChauffeurLux Logo"
                    style={{ height: '40px', width: '40px' }}
                />
                ChauffeurLux
            </Link>

            <div className="form-card">
                <h2 className="form-title">
                    Reset Your Password
                </h2>

                <p className="form-description">
                    Enter a new password for your {userType} account.
                </p>

                <form className="reset-password-form" onSubmit={handleReset}>
                    <input
                        type="password"
                        placeholder="New Password (min 6 characters)"
                        required
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength="6"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        required
                        className="form-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength="6"
                    />
                    <button
                        type="submit"
                        className="form-button"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                {error && (
                    <p className="error-message">{error}</p>
                )}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}

                <p className="return-link">
                    <Link to="/login" className="return-link-anchor">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
}