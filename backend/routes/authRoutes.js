import express from 'express';
import { registerUser, userLogin, loginAdmin, handleGoogleSignup} from '../controllers/authController.js';

const router = express.Router();

router.post('/customer-login', userLogin);
router.post('/customer-register', registerUser);
router.post('/admin-login', loginAdmin);
router.post('/google-signup', handleGoogleSignup);

export default router;