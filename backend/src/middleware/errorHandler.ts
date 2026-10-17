import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config/index.js';

export interface ApiError {
  code: string;
  message: string;
  fields?: Record<string, string[]>;
  requestId?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly fields?: Record<string, string[]>;

  constructor(statusCode: number, code: string, message: string, fields?: Record<string, string[]>) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
  }
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = req.headers['x-request-id'] as string | undefined;

  // Zod validation error
  if (error instanceof ZodError) {
    const fields: Record<string, string[]> = {};
    error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      if (!fields[path]) {
        fields[path] = [];
      }
      fields[path]!.push(issue.message);
    });

    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'The request could not be processed.',
        fields,
        requestId,
      },
    });
    return;
  }

  // Application error
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        fields: error.fields,
        requestId,
      },
    });
    return;
  }

  // Generic error
  console.error('Unhandled error:', error);

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: config.isProduction
        ? 'An unexpected error occurred.'
        : error.message,
      requestId,
    },
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      requestId: req.headers['x-request-id'] as string | undefined,
    },
  });
}
