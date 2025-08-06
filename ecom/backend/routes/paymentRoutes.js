import express from 'express';
import {
  createPayment,
  getPayment,
  updatePaymentStatus,
  cancelPayment,
  refundPayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Create a new payment
router.post('/create', createPayment);

// Get payment details by ID
router.get('/get/:id', getPayment);

// Update payment status
router.put('/update-status/:id', updatePaymentStatus);

// Cancel a payment
router.put('/cancel/:id', cancelPayment);

// Process refund
router.post('/refund/:id', refundPayment);

export default router;