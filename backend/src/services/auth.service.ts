import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../middleware/errorHandler.js';

const prisma = new PrismaClient();

// Simple in-memory session store (replace with Redis in production)
const sessions = new Map<string, { userId: string; expiresAt: Date }>();

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  sessionId: string;
}

export const authService = {
  async register(input: RegisterInput): Promise<{ user: AuthResult['user'] }> {
    const { name, email, password } = input;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new AppError(409, 'EMAIL_EXISTS', 'An account with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: UserRole.USER,
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async login(input: LoginInput): Promise<AuthResult | null> {
    const { email, password } = input;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    // Check if suspended
    if (user.suspendedAt) {
      throw new AppError(403, 'ACCOUNT_SUSPENDED', 'Your account has been suspended');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return null;
    }

    // Create session
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    sessions.set(sessionId, { userId: user.id, expiresAt });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      sessionId,
    };
  },

  async validateSession(sessionId: string): Promise<AuthResult['user'] | null> {
    const session = sessions.get(sessionId);

    if (!session) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      sessions.delete(sessionId);
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user || user.suspendedAt) {
      sessions.delete(sessionId);
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },

  async logout(sessionId: string): Promise<void> {
    sessions.delete(sessionId);
  },
};

// Export sessions for middleware access
export { sessions };
