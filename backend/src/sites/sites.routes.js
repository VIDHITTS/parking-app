import express from 'express';
import { getAllSites, createSite, toggleSiteStatus } from './sites.controller.js';

const router = express.Router();

router.get('/', getAllSites);
router.post('/', createSite);
router.patch('/:id/status', toggleSiteStatus);

export default router;
