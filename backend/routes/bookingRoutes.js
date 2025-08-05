import express from "express";
import {fetchBooking, fetchBookingById, createNewBooking, updateExistingBooking, deleteExistingBooking} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', fetchBooking);
router.get('/:booking_id', fetchBookingById);
router.post('/', createNewBooking);
router.put('/:booking_id', updateExistingBooking);
router.delete('/:booking_id', deleteExistingBooking);

export default router;