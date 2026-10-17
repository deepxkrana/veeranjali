import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service.js';
import { AppError } from '../middleware/errorHandler.js';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const result = await authService.register({ name, email, password });

      res.status(201).json({
        data: {
          user: result.user,
        },
        message: 'Registration successful. Please log in.',
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      if (!result) {
        throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
      }

      // Set session cookie
      res.cookie('sessionId', result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        data: {
          user: result.user,
        },
        message: 'Login successful',
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sessionId = req.session?.sessionId;
      if (sessionId) {
        await authService.logout(sessionId);
      }

      // Clear session cookie
      res.clearCookie('sessionId');

      res.json({
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError(401, 'UNAUTHORIZED', 'Not authenticated');
      }

      res.json({
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
