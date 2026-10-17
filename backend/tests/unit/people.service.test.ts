import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prisma } = vi.hoisted(() => ({
  prisma: {
    person: {
      count: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => prisma),
}));

import { peopleService } from '../../src/services/people.service.js';

describe('people search filters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prisma.person.count.mockResolvedValue(0);
    prisma.person.findMany.mockResolvedValue([]);
  });

  it('always limits results to published people', async () => {
    await peopleService.searchPublishedPeople({
      page: 1,
      limit: 20,
      sort: 'publishedAt',
      order: 'desc',
    });

    expect(prisma.person.count).toHaveBeenCalledWith(expect.objectContaining({
      where: { publishedAt: { not: null } },
    }));
  });

  it('combines text, force, state, award, operation, and year filters', async () => {
    await peopleService.searchPublishedPeople({
      query: 'Aarav',
      force: 'Army',
      state: 'Maharashtra',
      award: 'Sena',
      operation: 'vijay',
      year: '2000',
      page: 2,
      limit: 10,
      sort: 'name',
      order: 'asc',
    });

    const where = prisma.person.count.mock.calls[0]?.[0].where;
    expect(where.force).toEqual({ contains: 'Army', mode: 'insensitive' });
    expect(where.state).toEqual({ contains: 'Maharashtra', mode: 'insensitive' });
    expect(where.awards.some.award.name).toEqual({ contains: 'Sena', mode: 'insensitive' });
    expect(where.operations.some.operation.OR).toEqual([
      { name: { contains: 'vijay', mode: 'insensitive' } },
      { slug: 'vijay' },
    ]);
    expect(where.dateOfDeath.gte).toEqual(new Date(2000, 0, 1));
    expect(where.dateOfDeath.lte).toEqual(new Date(2000, 11, 31));
    expect(where.OR).toHaveLength(4);
    expect(prisma.person.findMany).toHaveBeenCalledWith(expect.objectContaining({
      orderBy: { name: 'asc' },
      skip: 10,
      take: 10,
    }));
  });
});
