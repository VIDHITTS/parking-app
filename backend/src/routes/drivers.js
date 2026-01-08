import express from 'express';
import { addDriver, getAllDrivers, getDriverById } from '../controllers/driverController.js';

const router = express.Router();

router.post('/', addDriver);
router.get('/', getAllDrivers);
router.get('/:id', getDriverById);

export default router;
