import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SearchParams {
  query?: string;
  force?: string;
  rank?: string;
  state?: string;
  operation?: string;
  award?: string;
  year?: string;
  page: number;
  limit: number;
  sort: 'name' | 'dateOfDeath' | 'publishedAt';
  order: 'asc' | 'desc';
}

export const peopleService = {
  async searchPublishedPeople(params: SearchParams) {
    const {
      query,
      force,
      rank,
      state,
      operation,
      award,
      year,
      page,
      limit,
      sort,
      order,
    } = params;

    const where: any = {
      publishedAt: { not: null }, // Only published
    };

    // Text search
    if (query) {
      where.OR = [
        { fullName: { contains: query, mode: 'insensitive' } },
        { displayName: { contains: query, mode: 'insensitive' } },
        { aliases: { contains: query, mode: 'insensitive' } },
        { shortSummary: { contains: query, mode: 'insensitive' } },
      ];
    }

    // Filters
    if (force) {
      where.force = { contains: force, mode: 'insensitive' };
    }
    if (rank) {
      where.rank = { contains: rank, mode: 'insensitive' };
    }
    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }
    if (year) {
      const yearNum = parseInt(year, 10);
      const startDate = new Date(yearNum, 0, 1);
      const endDate = new Date(yearNum, 11, 31);
      where.dateOfDeath = { gte: startDate, lte: endDate };
    }

    // Award filter
    if (award) {
      where.awards = {
        some: {
          award: {
            name: { contains: award, mode: 'insensitive' },
          },
        },
      };
    }

    // Operation filter
    if (operation) {
      where.operations = {
        some: {
          operation: {
            OR: [
              { name: { contains: operation, mode: 'insensitive' } },
              { slug: operation },
            ],
          },
        },
      };
    }

    // Count total
    const total = await prisma.person.count({ where });

    // Get results
    const people = await prisma.person.findMany({
      where,
      include: {
        awards: {
          include: {
            award: true,
          },
        },
        operations: {
          include: {
            operation: true,
          },
        },
      },
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: people,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getPublishedPersonBySlug(slug: string) {
    const person = await prisma.person.findUnique({
      where: { slug },
      include: {
        serviceRecords: {
          orderBy: { startDate: 'desc' },
        },
        timelineEvents: {
          orderBy: [{ displayOrder: 'asc' }, { date: 'asc' }],
        },
        awards: {
          include: {
            award: true,
          },
        },
        operations: {
          include: {
            operation: true,
          },
        },
        sources: {
          include: {
            source: true,
          },
          orderBy: { sourceOrder: 'asc' },
        },
        mediaAssets: {
          where: { approvalStatus: 'APPROVED' },
        },
      },
    });

    if (!person || !person.publishedAt) {
      return null;
    }

    return person;
  },

  async getRelatedPeople(personId: string, limit: number = 5) {
    // Get the person's operations and force
    const person = await prisma.person.findUnique({
      where: { id: personId },
      include: {
        operations: true,
      },
    });

    if (!person) return [];

    const operationIds = person.operations.map((po) => po.operationId);

    // Find related people by same operation or force
    const related = await prisma.person.findMany({
      where: {
        AND: [
          { id: { not: personId } },
          { publishedAt: { not: null } },
          {
            OR: [
              { force: person.force },
              {
                operations: {
                  some: { operationId: { in: operationIds } },
                },
              },
            ],
          },
        ],
      },
      take: limit,
    });

    return related;
  },
};
