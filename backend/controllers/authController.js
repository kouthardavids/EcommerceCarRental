import { findExistingUser, insertUser, findAdmin } from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // First check if the user already exists in the database
        const user = await findExistingUser(email);

        if (user) {
            return res.status(400).json({ message: 'User already exists.' });
        };

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUserId = await insertUser(email, hashedPassword);

        // Generate JWT
        // Access Token
        const accesstoken = jwt.sign(
            { userId: newUserId, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Refresh Token
        const refreshToken = jwt.sign(
            { userId: newUserId, email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(201).json({
            message: 'User registered successfully.',
            accesstoken,
            refreshToken
        });
    } catch (error) {
        console.error("Something went wrong:", error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

// User Login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findExistingUser(email);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist. Please register.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Access Token
        const accesstoken = jwt.sign(
            { userId: user.user_id, email: user.email, role: 'customer' },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Refresh Token
        const refreshToken = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        return res.status(200).json({
            message: 'Login successful.',
            accesstoken,
            refreshToken
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Admin Login
export const loginAdmin = async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await findAdmin(email);

        if(!admin) {
            return res.status(400).json({ message: 'Admin does not exist.' })
        };

        const isMatch = await bcrypt.compare(password, admin.password_hash);

        if(!isMatch) {
            return res.status(401).json({ message: 'Incorrect credentials.' });
        };

        // Generate JWT
        // Access Token
        const accesstoken = jwt.sign(
            { userId: admin.id, email: admin.email, role: 'admin'},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { userId: admin.id, email: admin.email, role: 'admin'},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'Login successful.',
            accesstoken,
            refreshToken
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}