import express from 'express';
import { registerUser, userLogin, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/customer-login', userLogin);
router.post('/customer-register', registerUser);
router.post('/admin-login', loginAdmin);

export default router;