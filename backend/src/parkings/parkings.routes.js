import express from 'express';
import {
    getStats,
    createSession,
    getAllSessions,
    updateStatus,
    reassignValet
} from './parkings.controller.js';

const router = express.Router();

router.get('/stats', getStats);
router.post('/', createSession);
router.get('/', getAllSessions);
router.patch('/:id/status', updateStatus);
router.patch('/:id/reassign', reassignValet);

export default router;
