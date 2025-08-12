import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import vehicleRoute from './routes/vehicleRoute.js';
import bookingRoutes from './routes/bookingRoutes.js';
<<<<<<< HEAD
import vehicleRoutes from './routes/vehicleRoutes.js';
=======
import reviewRoutes from './routes/reviewRoutes.js';
>>>>>>> 11e8a56 (Describe your changes here)

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use('/api', authRoutes);
app.use('/api/booking', bookingRoutes);
<<<<<<< HEAD
app.use('/api/vehicles', vehicleRoutes);
=======
app.use('/api/vehicle', vehicleRoute);
app.use('/api/review', reviewRoutes)
>>>>>>> 11e8a56 (Describe your changes here)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})