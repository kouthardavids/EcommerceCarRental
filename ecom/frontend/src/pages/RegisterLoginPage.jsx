import React, { useState } from 'react';
import './RegisterLogin.css'

const App = () => {
    // State variables for form inputs: store our data
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Handle sign-up form submission
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to your backend
        console.log('Sign Up Attempt:', { signupEmail, signupPassword, confirmPassword });
        // Add your sign-up logic here (e.g., API call, Firebase auth)
        console.log('Sign Up button clicked! Check console for data.');
    };

    // Handle login form submission
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to your backend
        console.log('Login Attempt:', { loginEmail, loginPassword });
        // Add your login logic here (e.g., API call, Firebase auth)
        console.log('Login button clicked! Check console for data.');
    };

    // Handle forgot password click
    const handleForgotPassword = (e) => {
        e.preventDefault();
        console.log('Forgot Password clicked');
        // Add your forgot password logic here (e.g., show a modal, redirect to reset page)
        console.log('Forgot Password clicked!');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
            <div className="row bg-white rounded-3 shadow-lg overflow-hidden w-100" style={{ maxWidth: '960px' }}>
                {/* Left Side: Sign Up */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center text-white bg-gradient-custom">
                    <h2 className="h2 fw-bold mb-4 text-center text-md-start">Create Your Account</h2>
                    <p className="lead mb-5 text-center text-md-start text-white-75">Join our community and discover amazing products!</p>

                    {/* Google Sign Up Button */}
                    <button className="btn btn-light w-100 py-3 mb-4 d-flex align-items-center justify-content-center rounded-3">
                        {/* Google Icon SVG */}
                        <svg className="google-icon me-2" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.24 10.27c.28 0 .54.02.79.06 1.48-.9 2.51-2.45 2.51-4.22 0-2.88-2.34-5.22-5.22-5.22S7.08 3.17 7.08 6.05c0 2.68 2.01 4.88 4.63 5.17l-.01.01zm-3.84 5.25c-.28 0-.54-.02-.79-.06-1.48.9-2.51 2.45-2.51 4.22 0 2.88 2.34 5.22 5.22 5.22s5.22-2.34 5.22-5.22c0-2.68-2.01-4.88-4.63-5.17l.01-.01z" fill="#4285F4"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#FBBC05"/>
                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#EA4335"/>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="#34A853"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div className="d-flex align-items-center mb-4">
                        <div className="flex-grow-1 border-top border-white border-opacity-25"></div>
                        <span className="flex-shrink-0 mx-3 text-white-75">or sign up with email</span>
                        <div className="flex-grow-1 border-top border-white border-opacity-25"></div>
                    </div>

                    <form onSubmit={handleSignupSubmit} className="d-grid gap-3">
                        <div>
                            <label htmlFor="signup-email" className="visually-hidden">Email</label>
                            <input
                                type="email"
                                id="signup-email"
                                placeholder="Email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                className="form-control form-control-lg rounded-3 form-control-dark-bg"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="signup-password" className="visually-hidden">Password</label>
                            <input
                                type="password"
                                id="signup-password"
                                placeholder="Password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                className="form-control form-control-lg rounded-3 form-control-dark-bg"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="visually-hidden">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control form-control-lg rounded-3 form-control-dark-bg"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-light w-100 py-3 fw-bold rounded-3"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Right Side: Login */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
                    <h2 className="h2 fw-bold text-dark mb-4 text-center text-md-start">Welcome Back!</h2>
                    <p className="lead text-secondary mb-5 text-center text-md-start">Log in to continue your shopping experience.</p>

                    <form onSubmit={handleLoginSubmit} className="d-grid gap-3">
                        <div>
                            <label htmlFor="login-email" className="visually-hidden">Email</label>
                            <input
                                type="email"
                                id="login-email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                className="form-control form-control-lg rounded-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="login-password" className="visually-hidden">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="form-control form-control-lg rounded-3"
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <a
                                href="#"
                                onClick={handleForgotPassword}
                                className="text-decoration-none text-primary small"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-3 fw-bold rounded-3"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;
