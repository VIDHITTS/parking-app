import express from 'express';
import {
    getAllDrivers,
    addDriver,
    requestApproval,
    getPendingDrivers,
    approveDriver,
    rejectDriver
} from './drivers.controller.js';

const router = express.Router();

// Active Drivers
router.get('/', getAllDrivers);
router.post('/', addDriver); // Direct add (Legacy/SuperAdmin)

// Approval Workflow
router.post('/request-approval', requestApproval);
router.get('/pending', getPendingDrivers);
router.patch('/approve/:id', approveDriver);
router.patch('/reject/:id', rejectDriver);

export default router;
