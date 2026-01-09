import express from 'express';
import {
    createParking,
    getAllParkings,
    getParkingsByCarId,
    markParkingAsPaid,
    getParkingById,
    deleteParking
} from './parkings.controller.js';

const router = express.Router();

router.post('/', createParking);
router.get('/', getAllParkings);
router.get('/car/:car_id', getParkingsByCarId);
router.get('/:id', getParkingById);
router.patch('/:id/pay', markParkingAsPaid);
router.delete('/:id', deleteParking);

export default router;
