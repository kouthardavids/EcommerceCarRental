import db from ('../config/db.js');

// creating review using review table from db with validation checks
const Review = {
    async create(user_id, car_id, rating, comment){
        if (rating < 1 || rating > 5){
            throw new Error('Rating must be between 1 and 5');
        }

        // checkinf for existing user
        const [userCheck] = await db.query('SELECT 1 FROM users WHERE user_id = ?', [user_id]);

        if (userCheck.length === 0 ){
            throw new Error('User does not exist');
        }

        // checking for existing vehicle
        const [vehicleCheck] = await db.query('SELECT 1 FROM vehicles WHERE car_id = ?', [car_id]);
        if (vehicleCheck.length === 0){
            throw new Error ('Vehicle does not exist');
        }

        // making a review
        const [result] = db.query('INSERT INTO reviews (user_id, car_id, rating, comment) VALUES (?,?,?,?', [user_id, car_id, rating, comment]);

        return {
            review_id: result.insertId,
            user_id,
            car_id,
            rating,
            comment,
            review_date: new Date().toISOString()
        };
    }
}

export default Review;