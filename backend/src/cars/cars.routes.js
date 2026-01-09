import express from 'express';
import { addCar, getCarsByDriver, getAllCars, getCarById } from './cars.controller.js';

const router = express.Router();

router.post('/', addCar);
router.get('/', getCarsByDriver);
router.get('/all', getAllCars);
router.get('/:id', getCarById);

export default router;
