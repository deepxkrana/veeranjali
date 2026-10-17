import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ListParams {
  page: number;
  limit: number;
}

export const operationsService = {
  async listOperations(params: ListParams) {
    const { page, limit } = params;

    const total = await prisma.operation.count();

    const operations = await prisma.operation.findMany({
      include: {
        _count: {
          select: { people: true },
        },
      },
      orderBy: { startDate: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: operations.map((op) => ({
        ...op,
        peopleCount: op._count.people,
      })),
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getOperationBySlug(slug: string) {
    const operation = await prisma.operation.findUnique({
      where: { slug },
      include: {
        people: {
          where: { person: { publishedAt: { not: null } } },
          include: {
            person: {
              select: {
                id: true,
                slug: true,
                fullName: true,
                displayName: true,
                rank: true,
                force: true,
                profileImage: true,
                shortSummary: true,
              },
            },
          },
        },
      },
    });

    return operation;
  },
};
