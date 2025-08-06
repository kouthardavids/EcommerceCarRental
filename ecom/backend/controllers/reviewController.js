import Review from '../models/reviewModel.js';

const errorMessages = {
    RATING_INVALID: 'Rating must be between 1 and 5',
    USER_NOT_FOUND: 'User not found',
    VEHICLE_NOT_FOUND: 'Vehicle not found',
    DUPLICATE_REVIEW: 'You have already reviewed this vehicle',
    REVIEW_NOT_FOUND: 'Review not found'
};

export const createReview = async (req, res) => {
    try {
        const { user_id, car_id, rating, comment } = req.body;
        const review = await Review.create(user_id, car_id, rating, comment);
        
        res.status(201).json({
            success: true,
            data: review
        });
    } catch (err) {
        console.error('Create review error:', err);
        
        const statusCode = 
            err.message === 'RATING_INVALID' ? 400 :
            err.message === 'USER_NOT_FOUND' || err.message === 'VEHICLE_NOT_FOUND' ? 404 :
            err.message === 'DUPLICATE_REVIEW' ? 409 : 500;
        
        res.status(statusCode).json({
            success: false,
            error: errorMessages[err.message] || 'Failed to create review'
        });
    }
};

export const getReview = async (req, res) => {
    try {
        const review = await Review.getById(req.params.id);
        
        if (!review) {
            return res.status(404).json({
                success: false,
                error: errorMessages.REVIEW_NOT_FOUND
            });
        }
        
        res.json({
            success: true,
            data: review
        });
    } catch (err) {
        console.error('Get review error:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch review'
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const updatedReview = await Review.update(req.params.id, rating, comment);
        
        res.json({
            success: true,
            data: updatedReview
        });
    } catch (err) {
        console.error('Update review error:', err);
        
        const statusCode = err.message === 'RATING_INVALID' ? 400 : 500;
        
        res.status(statusCode).json({
            success: false,
            error: errorMessages[err.message] || 'Failed to update review'
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const success = await Review.delete(req.params.id);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                error: errorMessages.REVIEW_NOT_FOUND
            });
        }
        
        res.status(204).end();
    } catch (err) {
        console.error('Delete review error:', err);
        res.status(500).json({
            success: false,
            error: 'Failed to delete review'
        });
    }
};