import db from './config/db.js';


// adding extra services, vehicle_id, addon_id
const VehicleAddon = {
    async addAddonToVehicle(vehicle_id, addon_id){
        const [result] = await db.query('INSERT INTO vehicle_addons (vehicle_id, addon_id) VALUES (?, ?)', [vehicle_id, addon_id]);
        return {vehicle_id, addon_id};
    },

    // removing addons, vehicle_id / addon_id
    async removeAddonFromVehicle(vehicle_id, addon_id){
        await db.query('DELETE FROM vehicle_addons WHERE vehicle_id = ? AND addon_id = ?', [vehicle_id, addon_id]);
        return {vehicle_id, addon_id};
    },

    // fetching all addons for specified car
    async getAddonsForVehicle (vehicle_id){
        const [rows] = await db.query('SELECT a.* FROM addons a JOIN vehicle_addons va ON a.addon_id = va.addon_id WHERE va.vehicle_id = ?', [vehicle_id]);
        return rows;
    },
    // check for vehicle addon specified
    async vehicleHasAddon(vehicle_id, addon_id){
        const [rows] = await db.query('SELECT 1 FROM vehicle_addons WHERE vehicle_id = ? AND addon_id = ? LIMIT 1', [vehicle_id, addon_id]);
        return rows.length > 0;
    }
}

export default VehicleAddon;