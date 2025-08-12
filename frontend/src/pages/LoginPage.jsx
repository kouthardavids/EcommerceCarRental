import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function LoginPage() {
  const gold = '#C5A357';
  const goldHover = '#b8954e';
  const [hover, setHover] = useState(false);
  const [error, setError] = useState(null);
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
      const { credential } = credentialResponse;
      const res = await axios.post('http://localhost:5005/api/google-signup', {
        idToken: credential,
      });

      localStorage.setItem('jwtToken', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setRedirectToHome(true);
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed.');
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '1rem',
    }}>
      {/* Logo */}
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
        onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
      >
        <img
          src="https://via.placeholder.com/40x40.png?text=L"
          alt="ChauffeurLux Logo"
          style={{ height: '40px', width: '40px' }}
        />
        ChauffeurLux
      </Link>

      <div style={{
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '420px',
      }}>
        <h2 style={{
          fontWeight: '700',
          color: '#212529',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          Welcome Back!
        </h2>

        {/* Google login */}
        <div style={{
          width: '100%',
          marginBottom: '.9rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <div style={{ flexGrow: 1, borderTop: '1px solid #adb5bd' }}></div>
          <span style={{
            margin: '0 1rem',
            color: '#6c757d',
            fontSize: '0.8rem',
          }}>
            or log in with email
          </span>
          <div style={{ flexGrow: 1, borderTop: '1px solid #adb5bd' }}></div>
        </div>

        {/* Email login */}
        <form style={{ display: 'grid', gap: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={inputStyle}
          />
          <div style={{ textAlign: 'right' }}>
            <a
              href="#"
              style={{ color: gold, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              Forgot Password?
            </a>
          </div>
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
          >
            Log In
          </button>
        </form>

        {error && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
        )}

        <p style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '0.875rem',
        }}>
          Don't have an account?
          <Link
            to="/register"
            style={{
              color: gold,
              textDecoration: 'none',
              marginLeft: '0.25rem',
            }}
            onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
