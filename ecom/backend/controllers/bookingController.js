import {getBooking, getBookingById, createBooking, updateBooking, deleteBooking} from '../models/bookingModel.js';

export const fetchBooking = async(req,res) => {
    try {
        const bookings = await getBooking();
        res.status(200).json(bookings);
    } catch (e) {
        console.error('Error in getBooking:', e);
        res.status(500).json({message: 'Failed to retrieve bookings'});
    }
}

export const fetchBookingById = async(req,res) => {
    try {
        const {booking_id} = req.params;
        const booking = await getBookingById(booking_id);
        if (!booking) {
            return res.status(404).json({message: 'Booking not found'});
        };
        res.status(200).json(booking);
    } catch (e) {
        console.error('Error in getBookingById:', e);
        res.status(500).json({message: 'Failed to retrieve booking'});
    }
}

export const createNewBooking = async(req,res) => {
    try {
        const newBooking = req.body;
        const result = await createBooking(newBooking);
        res.status(200).json(result);
    } catch (e) {
        console.error('Error in createBooking:', e);
        res.status(500).json({message: 'Failed to create booking'});
    }
}

export const updateExistingBooking = async(req,res) => {
    try {
        const {booking_id} = req.params;
        const updatedBooking = req.body;
        const result = await updateBooking(booking_id, updatedBooking);
        res.status(200).json(result);
    } catch (e) {
        console.error('Error in updateBooking:', e);
        res.status(500).json({message: 'Failed to update booking'});
    }
}

export const deleteExistingBooking = async(req,res) => {
    try {
        const {booking_id} = req.params;
        const result = await deleteBooking(booking_id);
        res.status(200).json({message: result.message});
    } catch (e) {
        console.error('Error in deleteBooking:', e);
        res.status(500).json({message: 'Failed to deleted booking'});
    }
}