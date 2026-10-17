import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { validateRequest } from '../../src/middleware/validateRequest.js';

function request(body: unknown = {}, query: unknown = {}, params: unknown = {}) {
  return { body, query, params } as never;
}

describe('validateRequest', () => {
  const schema = z.object({
    body: z.object({
      title: z.string().min(5),
    }),
    query: z.object({}),
    params: z.object({}),
  });

  it('calls next without an error for valid input', async () => {
    const next = vi.fn();

    await validateRequest(schema)(request({ title: 'A story' }), {} as never, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('passes Zod errors to next for invalid input', async () => {
    const next = vi.fn();

    await validateRequest(schema)(request({ title: 'bad' }), {} as never, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0]?.[0]).toBeInstanceOf(z.ZodError);
  });
});
