import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { adminController } from '../controllers/admin.controller.js';
import { requireAuth, requireRole, requireActiveUser } from '../middleware/auth.js';
import { UserRole } from '@prisma/client';

const router = Router();

// All admin routes require authentication and admin role
router.use(requireAuth);
router.use(requireActiveUser);
router.use(requireRole(UserRole.ADMIN));

// Validation schemas
const applicationIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const reviewApplicationSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: z.enum(['APPROVED', 'REJECTED']),
    adminNote: z.string().optional(),
  }),
});

const submissionIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const reviewSubmissionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    adminNote: z.string().optional(),
  }),
});

const updateUserRoleSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    role: z.enum(['USER', 'CONTRIBUTOR', 'ADMIN']),
  }),
});

const suspendUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    suspended: z.boolean(),
  }),
});

const resolveCorrectionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: z.enum(['ACCEPTED', 'RESOLVED', 'REJECTED']),
    adminNote: z.string().optional(),
  }),
});

const listQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    status: z.string().optional(),
  }),
});

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Contributor Applications
router.get('/applications', validateRequest(listQuerySchema), adminController.getApplications);
router.get('/applications/:id', validateRequest(applicationIdSchema), adminController.getApplicationById);
router.patch('/applications/:id', validateRequest(reviewApplicationSchema), adminController.reviewApplication);

// Story Submissions
router.get('/submissions', validateRequest(listQuerySchema), adminController.getSubmissions);
router.get('/submissions/:id', validateRequest(submissionIdSchema), adminController.getSubmissionById);
router.post('/submissions/:id/request-changes', validateRequest(reviewSubmissionSchema), adminController.requestChanges);
router.post('/submissions/:id/approve', validateRequest(reviewSubmissionSchema), adminController.approveSubmission);
router.post('/submissions/:id/publish', validateRequest(reviewSubmissionSchema), adminController.publishSubmission);
router.post('/submissions/:id/reject', validateRequest(reviewSubmissionSchema), adminController.rejectSubmission);
router.post('/submissions/:id/archive', validateRequest(reviewSubmissionSchema), adminController.archiveSubmission);

// Users
router.get('/users', validateRequest(listQuerySchema), adminController.getUsers);
router.patch('/users/:id/role', validateRequest(updateUserRoleSchema), adminController.updateUserRole);
router.patch('/users/:id/suspend', validateRequest(suspendUserSchema), adminController.suspendUser);

// Correction Reports
router.get('/correction-reports', validateRequest(listQuerySchema), adminController.getCorrectionReports);
router.patch('/correction-reports/:id', validateRequest(resolveCorrectionSchema), adminController.resolveCorrectionReport);

// Audit Logs
router.get('/audit-logs', validateRequest(listQuerySchema), adminController.getAuditLogs);

export { router as adminRoutes };
