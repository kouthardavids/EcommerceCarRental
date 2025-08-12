import express from 'express';
import {
  getAllVehiclesController,
  getVehiclesWithImagesController,
  getVehicleById,
  getImagesByCarId,
} from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/vehicles', getAllVehiclesController);
router.get('/vehicles-with-images', getVehiclesWithImagesController);  // put this BEFORE
router.get('/vehicles/:id', getVehicleById);                          // param route LAST
router.get('/vehicles/:id/images', getImagesByCarId);

export default router;
