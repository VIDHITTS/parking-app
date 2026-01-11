import express from 'express';
import {
    getStats,
    createSession,
    getAllSessions,
    updateStatus
} from './parkings.controller.js';

const router = express.Router();

router.get('/stats', getStats);
router.post('/', createSession);
router.get('/', getAllSessions);
router.patch('/:id/status', updateStatus);

export default router;
