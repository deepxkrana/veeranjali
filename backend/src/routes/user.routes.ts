import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { userController } from '../controllers/user.controller.js';
import { requireAuth, requireActiveUser } from '../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(requireAuth);
router.use(requireActiveUser);

// Validation schemas
const personIdSchema = z.object({
  params: z.object({
    personId: z.string(),
  }),
});

const createCorrectionSchema = z.object({
  body: z.object({
    personId: z.string(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    supportingSourceUrl: z.string().url().optional(),
  }),
});

const createApplicationSchema = z.object({
  body: z.object({
    reason: z.string().min(50, 'Reason must be at least 50 characters'),
    relevantExperience: z.string().optional(),
    supportingLinks: z.string().optional(),
  }),
});

// Routes
// Bookmarks
router.get('/bookmarks', userController.getBookmarks);
router.post('/bookmarks/:personId', validateRequest(personIdSchema), userController.addBookmark);
router.delete('/bookmarks/:personId', validateRequest(personIdSchema), userController.removeBookmark);

// Correction Reports
router.post('/correction-reports', validateRequest(createCorrectionSchema), userController.createCorrectionReport);
router.get('/correction-reports', userController.getCorrectionReports);

// Contributor Application
router.post('/contributor-applications', validateRequest(createApplicationSchema), userController.createContributorApplication);

export { router as userRoutes };
