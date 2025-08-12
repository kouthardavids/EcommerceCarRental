import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignupPage';
import Home from './pages/Homepage';
import Catalogue from './pages/Catalogue';
import BookingPage from './pages/BookingPage';
import AboutUs from './pages/AboutPage';
import ForgotPassword from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import DetailPage from './pages/DetailPage';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}
