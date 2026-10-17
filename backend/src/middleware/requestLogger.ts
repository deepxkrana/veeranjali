import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] as string | undefined;

  // Log request
  if (config.isDevelopment) {
    console.log(`→ ${req.method} ${req.path}`, {
      requestId,
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      body: Object.keys(req.body).length > 0 ? '[body]' : undefined,
    });
  }

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (config.isDevelopment) {
      console.log(`← ${req.method} ${req.path} ${res.statusCode} (${duration}ms)`);
    }
  });

  next();
}
