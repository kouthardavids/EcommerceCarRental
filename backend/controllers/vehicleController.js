import { Vehicle } from '../models/vehicleModel.js';

// fetch all vehicles
export const getallVehicles = async (req,res) => {
    try{
        const vehicles = await Vehicle.getAll();
        res.json(vehicles);
    } catch(err){
        console.error('Error gettign vehicles:', err);
        res.status(500).json({error: 'Failed to get vehicles'});
    }
};

// getting a single car
export const getVehicleById = async (req,res) => {
    try{
        const vehicle = await Vehicle.getById(req.params.id);

        if (!vehicle) {
            return res.status(400).json({error: 'Vehicle not found'});
        }
        res.json(vehicle);
    }catch (err) {
        console.error('Error getting vehicle:', err);
        res.status(500).json({error: 'Failed to fetch vehicle'});
    }
};
