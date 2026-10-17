import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const publicService = {
  async getUniqueForces(): Promise<string[]> {
    const people = await prisma.person.findMany({
      where: {
        publishedAt: { not: null },
        force: { not: null },
      },
      select: { force: true },
      distinct: ['force'],
    });

    return people.map((p) => p.force).filter(Boolean) as string[];
  },

  async getUniqueRanks(): Promise<string[]> {
    const people = await prisma.person.findMany({
      where: {
        publishedAt: { not: null },
        rank: { not: null },
      },
      select: { rank: true },
      distinct: ['rank'],
    });

    return people.map((p) => p.rank).filter(Boolean) as string[];
  },

  async getUniqueStates(): Promise<string[]> {
    const people = await prisma.person.findMany({
      where: {
        publishedAt: { not: null },
        state: { not: null },
      },
      select: { state: true },
      distinct: ['state'],
    });

    return people.map((p) => p.state).filter(Boolean) as string[];
  },

  async getAwards() {
    const awards = await prisma.award.findMany({
      include: {
        _count: {
          select: { people: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return awards.map((award) => ({
      id: award.id,
      name: award.name,
      category: award.category,
      description: award.description,
      peopleCount: award._count.people,
    }));
  },

  async getOnThisDay() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Find people who died on this day (any year)
    const people = await prisma.$queryRaw`
      SELECT id, slug, full_name, display_name, rank, force, short_summary, date_of_death, death_terminology
      FROM people
      WHERE published_at IS NOT NULL
        AND EXTRACT(MONTH FROM date_of_death) = ${month}
        AND EXTRACT(DAY FROM date_of_death) = ${day}
      ORDER BY date_of_death DESC
      LIMIT 10
    `;

    return people;
  },
};
