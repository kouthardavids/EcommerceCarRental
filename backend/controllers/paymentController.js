import Payment from '..models/paymentModel.js';

export const createPayment = async (req, res) => {
    try{
        const {booking_id, user_id, payment_method, payment_status,payment_reference} = req.body;

        // adding validation
        if (!booking_id || !user_id || !payment_method){
            return res.status(400).json({error: 'Missing required fields: booking_id, user_id, payment_method'});
        }

        const newPayment = await Payment.create({
            booking_id,
            user_id,
            payment_method,
            payment_status,
            payment_reference
        });

        res.status(201).json({
            success: true,
            payment: newPayment
        });
    } catch (err) {
        console.error('Payment failed:', err);
        res.status(500).json({
            error: 'Payment failed',
            details: process.env.NODE_ENV === 'development'? err.message: undefined
        });
    }
};

// getting payments by Id
export const getPayment = async (req, res) => {
    try{
        const payment = await Payment.getById(req,params,id);

        if (!payment || payment.length === 0){
            return res.status(404).json({
                error: 'Payment not found'
            });
        }
        res.json({
            success: true,
            payment: payment[0] 
        });
    } catch (err){
        console.error('Error getting payment');
        res.status(500).json({error: 'Failed to get payment details'});
    }
};

// updating payment status
export const updatePaymentStatus = async (req,res) => {
    try{
        const {new_status} = req.body;

        if (!new_status){
            return res.status(400).json({
                error: 'new_status is required'
            });
        }
        await Payment.updatePaymentStatus(req.params.id, new_status);

        res.json({
            success: true,
            message: 'Payment status updated successfully'
        });
    } catch (err) {
        console.error('Status update failed', err);
        res.status(500).json({
            error: 'Failed to update payment status',
            details: process.env.NODE_ENV === 'development' ? err.message: 'undefined'
        });
    }
};

// cancelling payment,
export const cancelPayment = async (req, res) => {
    try {
        const paymentId = req.params.id;

        // check for an existing payment
        const exisitingPayment = await Payment.getById(paymentId);

        if(!exisitingPayment || exisitingPayment.length === 0){
            return res.status(404).json({
                success: true,
                error: 'Payment not found'
            });
        }
        // check if payment was previously cancelled
        if (exisitingPayment[0].payment_status === 'cancelled'){
            return res.status(400).json({
                success: false,
                error: 'Payment has already been cancelled'
            });
        }

        // check if payment has been approved, see if can be cancelled
        if (!exisitingPayment[0].payment_status === 'completed'){
            return res.status(400).json({
                success: false,
                error: 'Processed payments cannot be cancelled'
            });
        }

        // proceed with cancellation
        const cancelledPayment = await Payment.cancel(payment_id);

        res.json({
            success: true,
            message: "Payment successfully cancelled",
            payment: cancelledPayment
        });
    } catch (err){
        console.error('Payment cancellation failed', err);
        res.status(500).json({
            success: false,
            error: 'Payment cancellation failed',
            details: process.env.NODE_ENV === 'development' ? err.messagr: undefined
        });
    }

}
