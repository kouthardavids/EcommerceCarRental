import db from '../config/db.js';

// get all vehicles form table
export const Vehicle = {
    async getAll(){
        const [rows] = await db.query('SELECT * FROM vehicles');
        return rows;
    },

    // get car by ID
    async getById(car_id){
        const [rows] = await db.query('SELECT * FROM vehicles WHERE car_id = ?',[car_id]);
        return rows[0];
    }
}