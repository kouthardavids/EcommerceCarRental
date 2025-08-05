import db from '../config/db.js';

export const getBooking = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM bookings');
        return rows;
    } catch (e) {
        console.error('Error fetching all bookings: ', e);
        throw e;
    }
}

export const getBookingById = async(booking_id) => {
    try {
        const [rows] = await db.query('SELECT * FROM bookings WHERE booking_id = ?', [booking_id]);
        return rows[0];
    } catch (e) {
        console.error('Error fetching booking: ', e);
        throw e;
    }
}

export const createBooking = async (booking) => {
    try {
        const {user_id, car_id, full_name, email, start_date, end_date, total_price} = booking;
        const [result] = await db.query(
            `INSERT INTO bookings(user_id, car_id, full_name, email, start_date, end_date, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [user_id, car_id, full_name, email, start_date, end_date, total_price]
        );
        return {
            message: 'Booking record created successfully',
            bookingId: result.insertId
        };
    } catch (e) {
        console.error('Error creating booking: ', e);
        throw e;
    }
}

export const updateBooking = async(booking_id, bookingData) => {
    try {
        const {user_id, car_id, full_name, email, start_date, end_date, total_price, status} = bookingData;
        const [result] = await db.query(
            `UPDATE bookings
            SET user_id = ?, car_id = ?, full_name = ?, email = ?, start_date = ?, end_date = ?, total_price = ?, status = ?
            WHERE booking_id = ?`,
            [user_id, car_id, full_name, email, start_date, end_date, total_price, status, booking_id]
        );

        if (result.affectedRows === 0) {
                return {message: 'No booking record found or no changes made'}
            }
        
        return {message: 'Booking updated successfully'};
    } catch (e) {
        console.error('Error updating booking: ', e);
        throw e;
    }
}

export const deleteBooking = async(booking_id) => {
    try {
        const [result] = await db.query('DELETE FROM bookings WHERE booking_id = ?', [booking_id]);
        return {message: 'Booking deleted succesfully'};
    } catch (e) {
        console.error('Error deleting booking: ', e);
        throw e;
    }
}