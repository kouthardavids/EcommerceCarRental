import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function RegisterPage() {
    const gold = '#C5A357';
    const goldHover = '#b8954e';
    const [hover, setHover] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const inputStyle = {
        fontSize: '1.125rem',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #ced4da',
        width: '100%',
        boxSizing: 'border-box',
    };

    const handleSuccessLogin = async (credentialResponse) => {
        try {
            setLoading(true);
            const { credential } = credentialResponse; // JWT from Google

            const res = await axios.post('http://localhost:5005/api/google-signup', {
                idToken: credential,
            });

            console.log('Google signup response:', res.data);

            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            setLoading(false);
            setRedirectToHome(true);
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong signing up with Google.');
            setLoading(false);
        }
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5005/api/customer-register', {
                email,
                password,
            });

            console.log('Email signup response:', res.data);

            // Save tokens and user info (if returned)
            localStorage.setItem('jwtToken', res.data.accesstoken);
            // If your backend returns user data here, use it; else fallback to email only
            localStorage.setItem('user', JSON.stringify(res.data.user || { email }));

            setLoading(false);
            setRedirectToHome(true);
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f8f9fa',
                padding: '1rem',
            }}
        >
            <Link
                to="/"
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: gold,
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    gap: '0.5rem',
                }}
                onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
                <img
                    src="https://via.placeholder.com/40x40.png?text=L"
                    alt="ChauffeurLux Logo"
                    style={{ height: '40px', width: '40px' }}
                />
                ChauffeurLux
            </Link>

            <div
                style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    width: '100%',
                    maxWidth: '420px',
                }}
            >
                <h2
                    style={{
                        fontWeight: '700',
                        color: '#212529',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                    }}
                >
                    Create Your Account
                </h2>

                {/* Google login */}
                <div
                    style={{
                        width: '100%',
                        marginBottom: '.9rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ width: '100%', maxWidth: '360px' }}>
                        <GoogleLogin
                            onSuccess={handleSuccessLogin}
                            onError={() => setError('Google Login Failed')}
                            shape="pill"
                            theme="outline"
                            size="large"
                            text="continue_with"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <div style={{ flexGrow: 1, borderTop: '1px solid #adb5bd' }}></div>
                    <span
                        style={{
                            margin: '0 1rem',
                            color: '#6c757d',
                            fontSize: '0.8rem',
                        }}
                    >
                        or sign up with email
                    </span>
                    <div style={{ flexGrow: 1, borderTop: '1px solid #adb5bd' }}></div>
                </div>

                {/* Email signup */}
                <form style={{ display: 'grid', gap: '1rem' }} onSubmit={handleEmailSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        style={inputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        style={inputStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        style={inputStyle}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: hover ? goldHover : gold,
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem',
                            fontWeight: '700',
                            borderRadius: '0.75rem',
                            width: '100%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        disabled={loading}
                    >
                        {loading ? 'Please wait...' : 'Sign Up'}
                    </button>
                </form>

                {error && (
                    <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
                )}

                <p
                    style={{
                        marginTop: '1.5rem',
                        textAlign: 'center',
                        color: '#6c757d',
                        fontSize: '0.875rem',
                    }}
                >
                    Already have an account?
                    <Link
                        to="/login"
                        style={{
                            color: gold,
                            textDecoration: 'none',
                            marginLeft: '0.25rem',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
