import express from "express";
import {getallVehicles, getVehicleById} from "../controllers/vehicleController.js";

const router = express.Router();

router.get('/', getallVehicles);
router.get('/:car_id', getVehicleById);

export default router;