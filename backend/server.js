import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})