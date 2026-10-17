import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { operationsController } from '../controllers/operations.controller.js';

const router = Router();

// Validation schemas
const listQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
  }),
});

const slugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});

// Routes
router.get('/', validateRequest(listQuerySchema), operationsController.list);

router.get('/:slug', validateRequest(slugParamSchema), operationsController.getBySlug);

export { router as operationsRoutes };
