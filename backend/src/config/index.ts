import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const configSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_DATABASE_URL: z.string().min(1, 'DIRECT_DATABASE_URL is required'),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
  CORS_ORIGIN: z.string().url('CORS_ORIGIN must be a valid URL'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

const parseResult = configSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('❌ Invalid environment configuration:');
  parseResult.error.issues.forEach((issue) => {
    console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

export const config = {
  port: parseInt(parseResult.data.PORT, 10),
  nodeEnv: parseResult.data.NODE_ENV,
  isDevelopment: parseResult.data.NODE_ENV === 'development',
  isProduction: parseResult.data.NODE_ENV === 'production',
  isTest: parseResult.data.NODE_ENV === 'test',
  database: {
    url: parseResult.data.DATABASE_URL,
    directUrl: parseResult.data.DIRECT_DATABASE_URL,
  },
  auth: {
    sessionSecret: parseResult.data.SESSION_SECRET,
  },
  frontend: {
    url: parseResult.data.FRONTEND_URL,
  },
  cors: {
    origin: parseResult.data.CORS_ORIGIN,
  },
  rateLimit: {
    windowMs: parseInt(parseResult.data.RATE_LIMIT_WINDOW_MS, 10),
    maxRequests: parseInt(parseResult.data.RATE_LIMIT_MAX_REQUESTS, 10),
  },
  logging: {
    level: parseResult.data.LOG_LEVEL,
  },
};

export type Config = typeof config;
