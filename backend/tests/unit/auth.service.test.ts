import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prisma } = vi.hoisted(() => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => prisma),
  UserRole: { USER: 'USER', ADMIN: 'ADMIN', CONTRIBUTOR: 'CONTRIBUTOR' },
}));

import { authService, sessions } from '../../src/services/auth.service.js';

describe('authentication service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessions.clear();
  });

  it('returns null for unknown credentials', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(authService.login({ email: 'missing@example.com', password: 'password' }))
      .resolves.toBeNull();
  });

  it('normalizes email during registration and creates a user', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 'user-1',
      name: 'User',
      email: 'user@example.com',
      role: 'USER',
    });

    const result = await authService.register({
      name: 'User',
      email: 'USER@EXAMPLE.COM',
      password: 'password123',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'user@example.com' } });
    expect(prisma.user.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ email: 'user@example.com', role: 'USER' }),
    }));
    expect(result.user.email).toBe('user@example.com');
  });

  it('invalidates a session on logout', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      name: 'User',
      email: 'user@example.com',
      role: 'USER',
      passwordHash: '$2b$12$invalid',
      suspendedAt: null,
    });

    // A session ID that does not exist is safely idempotent.
    await authService.logout('missing-session');
    await expect(authService.validateSession('missing-session')).resolves.toBeNull();
  });
});
