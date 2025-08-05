import db from '../config/db.js';

export const getAddons = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM addons');
        return rows;
    } catch (e) {
        console.error('Error fetching all add-ons: ', e);
        throw e;
    }
}

export const getAddonById = async (addon_id) => {
    try {
        const [rows] = await db.query('SELECT * FROM addons WHERE addon_id = ?', [addon_id]);
        return rows[0];
    } catch (e) {
        console.error('Error fetching add-on: ', e);
        throw e;
    }
}

export const createAddon = async (addon) => {
    try {
        const { name, description, price } = addon;

        // Input validation: making it more robust
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return { message: 'Invalid or missing name' };
        }
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return { message: 'Invalid or missing description' };
        }
        if (typeof price !== 'number' || price < 0) {
            return { message: 'Invalid or missing price' };
        }

        const [result] = await db.query(
            `INSERT INTO addons(name, description, price)
            VALUES (?, ?, ?)`, [name, description, price]
        );
        return {
            message: 'Add-on created successfully',
            addonId: result.insertId
        }
    } catch (e) {
        console.error('Error creating add-on: ', e);
        throw e;
    }
}

export const updateAddon = async (addon_id, addonData) => {
    try {
        const { name, description, price } = addonData;
        const [result] = await db.query(
            `UPDATE addons
            SET name = ?, description = ?, price = ?
            WHERE addon_id = ?`,
            [name, description, price, addon_id]
        );
        if (result.affectedRows === 0) {
            return { message: 'No add-on found or no changes made' }
        }
        return { message: 'Add-on updated successfully' };
    } catch (e) {
        console.error('Error updating add-on: ', e);
        throw e;
    }
}

export const deleteAddon = async (addon_id) => {
    try {
        const [result] = await db.query('DELETE FROM addons WHERE addon_id = ?', [addon_id]);
        return { message: 'Add-on delete successfully' }
    } catch (e) {
        console.error('Error deleting add-on: ', e);
        throw e;
    }
}