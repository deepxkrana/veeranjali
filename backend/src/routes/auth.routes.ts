import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { authController } from '../controllers/auth.controller.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

// Routes
router.post(
  '/register',
  authRateLimiter,
  validateRequest(registerSchema),
  authController.register
);

router.post(
  '/login',
  authRateLimiter,
  validateRequest(loginSchema),
  authController.login
);

router.post('/logout', authController.logout);

router.get('/me', requireAuth, authController.getCurrentUser);

export { router as authRoutes };
