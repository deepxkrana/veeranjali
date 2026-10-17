import { Router } from 'express';
import { publicController } from '../controllers/public.controller.js';

const router = Router();

// Public data endpoints
router.get('/forces', publicController.getForces);
router.get('/ranks', publicController.getRanks);
router.get('/states', publicController.getStates);
router.get('/awards', publicController.getAwards);
router.get('/on-this-day', publicController.getOnThisDay);

export { router as publicRoutes };
