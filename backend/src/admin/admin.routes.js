import express from 'express';
import { getInsights } from './admin.controller.js';

const router = express.Router();

router.get('/insights', getInsights);

export default router;
