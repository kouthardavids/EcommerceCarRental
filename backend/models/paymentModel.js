import db from '..config/db.js';

const Payment = {
    // need to make new payment record
    async create ({booking_id, user_id, payment_method, payment_status, payment_reference}) {
        const [result] = await db.query(
            'INSERT INTO payments (booking_id, user_id, payment_method, payment_status, payment_reference) VALUES (?,?,?,?,?)',
            [booking_id, user_id, payment_method, payment_status, payment_reference]
        );
        return {payment_id: result.insertId};
    },

    // fetching payment with ID
    async getById(payment_id){
        const [rows] = await db.query('SELECT * FROM payments WHERE payment_id=?',
            [payment_id]
        );
         return rows;
    },
    // updating the payment status
    async updateStatus(payment_id, new_status){
        await db.query('UPDATE payments SET payment_status = ? WHERE payment_id = ?', [new_status, payment_id]);
    },
    // cancelling/delete payments
    async delete(payment_id){
        await db.query('DELETE FROM payments WHERE payment_id=?',[payment_id]);
    },

}



export default Payment;

// will add error handling at later stage