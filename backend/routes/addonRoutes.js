import express from "express";
import {fetchAddons, fetchAddonById, createNewAddon, updateExistingAddon, deleteExistingAddon} from '../controllers/addonController.js';

const router = express.Router();

router.get('/', fetchAddons);
router.get('/:addon_id', fetchAddonById);
router.post('/', createNewAddon);
router.put('/:addon_id', updateExistingAddon);
router.delete('/:addon_id', deleteExistingAddon);

export default router;  