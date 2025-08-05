import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import addonRoutes from './routes/addonRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
const PORT = process.env.PORT

const app = express();

app.use('/api', authRoutes);
app.use('/api/addon', addonRoutes);
app.use('/api/booking', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})