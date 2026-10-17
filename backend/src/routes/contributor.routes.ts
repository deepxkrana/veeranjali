import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { contributorController } from '../controllers/contributor.controller.js';
import { requireAuth, requireRole, requireActiveUser } from '../middleware/auth.js';
import { UserRole } from '@prisma/client';

const router = Router();

// All contributor routes require authentication and contributor role
router.use(requireAuth);
router.use(requireActiveUser);
router.use(requireRole(UserRole.CONTRIBUTOR));

// Validation schemas
const createSubmissionSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(100, 'Content must be at least 100 characters'),
    structuredData: z.record(z.any()).optional(),
  }),
});

const updateSubmissionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').optional(),
    content: z.string().min(100, 'Content must be at least 100 characters').optional(),
    structuredData: z.record(z.any()).optional(),
  }),
});

const submissionIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

// Routes
router.get('/submissions', contributorController.getSubmissions);

router.post(
  '/submissions',
  validateRequest(createSubmissionSchema),
  contributorController.createSubmission
);

router.get(
  '/submissions/:id',
  validateRequest(submissionIdSchema),
  contributorController.getSubmissionById
);

router.patch(
  '/submissions/:id',
  validateRequest(updateSubmissionSchema),
  contributorController.updateSubmission
);

router.post(
  '/submissions/:id/submit',
  validateRequest(submissionIdSchema),
  contributorController.submitForReview
);

router.post(
  '/submissions/:id/resubmit',
  validateRequest(submissionIdSchema),
  contributorController.resubmitForReview
);

export { router as contributorRoutes };
