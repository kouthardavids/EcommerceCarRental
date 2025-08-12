<<<<<<< HEAD
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
=======
import { userCheck, vehicleCheck, insertReview, fetchReviews } from "../models/reviewModel.js";

// Handle reviews when user creates one
export const handleReview = async (req, res) => {
  try {
    const { user_id, car_id, rating, comment } = req.body;

    // Check if the user exists
    const user = await userCheck(user_id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist. Cannot make a review." });
    }

    // Check if the vehicle exists
    const vehicle = await vehicleCheck(car_id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle does not exist. Cannot make a review." });
    }

    // Validate rating (must be between 1 and 5)
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Insert review into database
    const reviewId = await insertReview(user_id, car_id, rating, comment);

    return res.status(201).json({
      message: "Review added successfully.",
      review_id: reviewId
    });

  } catch (error) {
    console.error("Error handling review:", error);
    return res.status(500).json({ message: "Server error while adding review." });
  }
};

// Get all the reviews to display on the page
export const getReviews = async (req, res) => {
    try {
        const reviews = await fetchReviews();

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found.' });
        }

        return res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ message: 'Server error while fetching reviews.' });
    }
};
>>>>>>> 11e8a56 (Describe your changes here)
