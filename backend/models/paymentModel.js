import db from '../config/db.js';

const Payment = {
    async create({booking_id, user_id, amount, payment_method, payment_status = 'Pending', payment_reference}) {
        if (!amount || amount <= 0) {
            throw new Error('INVALID_AMOUNT');
        }
        
        const [result] = await db.query(
            'INSERT INTO payments (booking_id, user_id, amount, payment_method, payment_status, payment_reference) VALUES (?,?,?,?,?,?)',
            [booking_id, user_id, amount, payment_method, payment_status, payment_reference]
        );
        return {payment_id: result.insertId};
    },

    // fetching payment with ID
    async getById(payment_id){
        const [rows] = await db.query('SELECT * FROM payments WHERE payment_id = ?',
            [payment_id]
        );
         return rows [0];
    },
    // updating the payment status
    async updateStatus(payment_id, new_status){
        await db.query('UPDATE payments SET payment_status = ? WHERE payment_id = ?', [new_status, payment_id]);
    },
    // cancelling/delete payments
    async cancel(payment_id){
        await db.query('UPDATE payments SET payment_status = "cancelled" WHERE payment_id = ?',[payment_id]);
        return this.getById(payment_id);
    },

    // refunding payment
   
    async processRefund(payment_id, refund_reason = "Customer request") {
    // 1. Fetch payment with days since payment
    const [rows] = await db.query(`
        SELECT *, DATEDIFF(NOW(), payment_date) AS days_since_payment
        FROM payments
        WHERE payment_id = ?
    `, [payment_id]);

    const payment = rows[0];

    if (!payment) {
        throw new Error('PAYMENT_NOT_FOUND');
    }

    if (payment.payment_status !== 'Paid') {
        throw new Error('NOT_PAID');
    }

    // refund within 7 days
    if (payment.days_since_payment > 7) {
        throw new Error('REFUND_PERIOD_EXPIRED');
    }

    if (refund_amount > payment.amount){
        throw new Error('REFUND_AMOUNT_EXCEEDS_PAYMENT');
    }

    // 5. Update payment status to 'Refunded'
    await db.query(`
        UPDATE payments
        SET payment_status = 'Refunded',amount = amount - ?, payment_reference = ? | Refunded: ', ?) WHERE payment_id = ?
    `, [amount, refund_reason, payment_id]);
     ([refund_reason, payment_id]);

     return this.getById(payment_id);
    }

   
}


export default Payment;

