import db from '../config/db.js';

// Check if the user exists when making a review
export const userCheck = async (userId) => {
    const [result] = await db.query(
        `SELECT 1 FROM users WHERE user_id = ?`, [userId]
    );
    return result[0]
};

// Check if the vehicle exists when making a review
export const vehicleCheck = async(carId) => {
    const [result] = await db.query(
        `SELECT 1 FROM vehicles WHERE car_id = ?`, [carId]
    );
    return result[0]
};

// Inserting review into the database
export const insertReview = async(userId, carId, rating, comment) => {
    const [result] = await db.query(
        `INSERT into reviews(user_id, car_id, rating, comment) VALUES (?, ?, ?, ?)`, [userId, carId, rating, comment]
    );
    return result.insertId
};

// Fetching all reviews
export const fetchReviews = async() => {
    const [result] = await db.query(`SELECT * FROM reviews`);

<<<<<<< HEAD
        // making a review
        const [result] = await db.query(
            'INSERT INTO reviews (user_id, car_id, rating, comment) VALUES (?, ?, ?, ?)',
            [user_id, car_id, rating, comment]
        );
        return {
            review_id: result.insertId,
            user_id,
            car_id,
            rating,
            comment,
            review_date: new Date().toISOString()
        };
},
        async getById(review_id){
            const [rows] = await db.query('SELECT * FROM reviews WHERE reveiw_id = ?',[review_id]);
            return rows[0];
        },
        async getByCarId(car_id){
            const [rows] = await db.query ('SELECT * FROM reviews WHERE car_id = ? ORDER BY review_date DESC', [car_id]);
            return rows;
        },
        async update(review_id, rating, comment){
            if (rating && (rating < 1 || rating > 5)){
                throw new Error ('Rating must be between 1 and 5');
            }
            await db.query('UPDATE reviews SET rating = ?, comment = ? WHERE review_id = ?', [rating, comment, reveiw_id]);
            return this.getById(review_id);
        },
        async delete (review_id){
            const [result] = await db.query('DELETE FROM reviews WHERE review_id = ?',[reveiw_id]);
            return result.affectedRows > 0;
        }
}

export default Review;
=======
    return result
};
>>>>>>> 11e8a56 (Describe your changes here)
