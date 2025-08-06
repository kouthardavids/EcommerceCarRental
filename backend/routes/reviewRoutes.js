import express from 'express';

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




