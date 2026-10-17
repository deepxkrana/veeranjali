import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { addRequestId } from './middleware/requestId.js';
import { loadUser } from './middleware/auth.js';
import { authRoutes } from './routes/auth.routes.js';
import { peopleRoutes } from './routes/people.routes.js';
import { operationsRoutes } from './routes/operations.routes.js';
import { contributorRoutes } from './routes/contributor.routes.js';
import { adminRoutes } from './routes/admin.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { publicRoutes } from './routes/public.routes.js';

export function createApp() {
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: config.isProduction,
    crossOriginEmbedderPolicy: config.isProduction,
  }));

  // CORS configuration
  app.use(cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  }));

  // Compression
  app.use(compression());

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request ID
  app.use(addRequestId);

  // Request logging
  app.use(requestLogger);

  // Populate the authenticated user from the HTTP-only session cookie.
  app.use(loadUser);

  // Rate limiting
  app.use(rateLimiter);

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  const apiRouter = express.Router();

  // Public routes
  apiRouter.use('/auth', authRoutes);
  apiRouter.use('/people', peopleRoutes);
  apiRouter.use('/operations', operationsRoutes);
  apiRouter.use('/forces', publicRoutes);
  apiRouter.use('/ranks', publicRoutes);
  apiRouter.use('/states', publicRoutes);
  apiRouter.use('/awards', publicRoutes);
  apiRouter.use('/on-this-day', publicRoutes);

  // Protected routes
  apiRouter.use('/me', userRoutes);
  apiRouter.use('/contributor', contributorRoutes);
  apiRouter.use('/admin', adminRoutes);

  app.use('/api/v1', apiRouter);

  // Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
