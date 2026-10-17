import { describe, expect, it, vi } from 'vitest';
import { UserRole } from '@prisma/client';
import { requireActiveUser, requireAuth, requireRole } from '../../src/middleware/auth.js';

function response() {
  return {} as never;
}

describe('authorization middleware', () => {
  it('rejects unauthenticated requests', () => {
    const next = vi.fn();

    expect(() => requireAuth({} as never, response(), next)).toThrow('logged in');
    expect(next).not.toHaveBeenCalled();
  });

  it('allows authenticated requests with the required role', () => {
    const next = vi.fn();
    const req = { user: { id: '1', email: 'admin@example.com', name: 'Admin', role: UserRole.ADMIN } };

    requireRole(UserRole.ADMIN)(req as never, response(), next);

    expect(next).toHaveBeenCalledWith();
  });

  it('rejects authenticated requests with the wrong role', () => {
    const next = vi.fn();
    const req = { user: { id: '1', email: 'user@example.com', name: 'User', role: UserRole.USER } };

    expect(() => requireRole(UserRole.ADMIN)(req as never, response(), next)).toThrow('permission');
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects suspended users', () => {
    const next = vi.fn();
    const req = {
      user: { id: '1', email: 'user@example.com', name: 'User', role: UserRole.USER },
      session: { sessionId: 'session-1', suspendedAt: new Date() },
    };

    expect(() => requireActiveUser(req as never, response(), next)).toThrow('suspended');
    expect(next).not.toHaveBeenCalled();
  });
});
