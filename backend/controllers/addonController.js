import {getAddons, getAddonById, createAddon, updateAddon, deleteAddon} from '../models/addonModel.js';

export const fetchAddons = async(req,res) => {
    try {
        const addons = await getAddons();
        res.status(200).json(addons);
    } catch (e) {
        console.error('Error in getAddons:', e);
        res.status(500).json({message: 'Failed to retrieve addons'});
    }
}

export const fetchAddonById = async(req,res) => {
    try {
        const {addon_id} = req.params;
        const addon = await getAddonById(addon_id);
        if (!addon) {
            return res.satus(404).json({message: 'Add-on not found'});
        }
        res.status(200).json(addon);
    } catch (e) {
        console.error('Error in getAddonById:', e);
        res.status(500).json({message: 'Failed to retrieve add-on'});
    }
}

export const createNewAddon = async(req,res) => {
    try {
        const newAddon = req.body;
        const result = await createAddon(newAddon);
        res.status(200).json(result);
    } catch (e) {
        console.error('Error in createAddon:', e);
        res.status(500).json({message: 'Failed to create add-on'});
    }
}

export const updateExistingAddon = async(req,res) => {
    try {
        const {addon_id} = req.params;
        const updatedAddon = req.body;
        const result = await updateAddon(addon_id, updatedAddon);
        res.status(200).json(result)
    } catch (e) {
        console.error('Error in updateAddon:', e);
        res.status(500).json({message: 'Failed to update add-on'});
    }
}

export const deleteExistingAddon = async(req,res) => {
    try {
        const {addon_id} = req.params;
        const result = await deleteAddon(addon_id);
        res.status(200).json({message: result.message});
    } catch (e) {
        console.error('Error in deleteAddon:', e);
        res.status(500).json({message: 'Failed to deleted add-on'});
    }
}