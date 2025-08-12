import express from 'express';
<<<<<<< HEAD

import {
    createReview,
    getReview,
    updateReview,
    deleteReview,
    getReviewsByCarId} from '../controllers/reviewController.js';

// import {authenticateUser} from '../middleware/authMiddleware.js';


const router = express.Router();

// router.post('/create', authenticateUser, createReview);
// router.put('/update/:id', authenticateUser, updateReview);
// router.delete('/delete/:id', authenticateUser, deleteReview);

router.post('/create', createReview);

router.get('/:id', getReview);

router.get('/car/:car_id', getReviewsByCarId);

router.put('/:id', updateReview);

router.delete('/:id', deleteReview);

export default router;




=======
import { handleReview, getReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', handleReview); // To create a review
router.get('/', getReviews); // To get all reviews

export default router;
>>>>>>> 11e8a56 (Describe your changes here)
