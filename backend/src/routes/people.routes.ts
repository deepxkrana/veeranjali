import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { peopleController } from '../controllers/people.controller.js';

const router = Router();

// Validation schemas
const searchQuerySchema = z.object({
  query: z.object({
    q: z.string().optional(),
    force: z.string().optional(),
    rank: z.string().optional(),
    state: z.string().optional(),
    operation: z.string().optional(),
    award: z.string().optional(),
    year: z.string().optional(),
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    sort: z.enum(['name', 'dateOfDeath', 'publishedAt']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }),
});

const slugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});

// Routes
router.get('/', validateRequest(searchQuerySchema), peopleController.search);

router.get('/:slug', validateRequest(slugParamSchema), peopleController.getBySlug);

export { router as peopleRoutes };
