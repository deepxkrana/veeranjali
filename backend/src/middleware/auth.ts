import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';
import { UserRole } from '@prisma/client';
import { authService } from '../services/auth.service.js';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: UserRole;
      };
      session?: {
        sessionId: string;
        suspendedAt?: Date | null;
      };
    }
  }
}

export async function loadUser(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const cookieHeader = req.headers.cookie;
    const sessionId = cookieHeader
      ?.split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('sessionId='))
      ?.slice('sessionId='.length);

    if (sessionId) {
      const user = await authService.validateSession(sessionId);
      if (user) {
        req.user = user;
        req.session = { sessionId };
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware to check if user is authenticated
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    throw new AppError(401, 'UNAUTHORIZED', 'You must be logged in to access this resource.');
  }
  next();
}

/**
 * Middleware to check if user has required role(s)
 */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError(401, 'UNAUTHORIZED', 'You must be logged in to access this resource.');
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(403, 'FORBIDDEN', 'You do not have permission to access this resource.');
    }

    next();
  };
}

/**
 * Middleware to check if user is not suspended
 */
export function requireActiveUser(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) {
    throw new AppError(401, 'UNAUTHORIZED', 'You must be logged in to access this resource.');
  }

  // Check suspension status in session or user object
  if (req.session?.suspendedAt || (req.user as any).suspendedAt) {
    throw new AppError(403, 'ACCOUNT_SUSPENDED', 'Your account has been suspended.');
  }

  next();
}
