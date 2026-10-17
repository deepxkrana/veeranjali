import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateCorrectionReportInput {
  personId: string;
  reporterId: string;
  message: string;
  supportingSourceUrl?: string;
}

interface CreateContributorApplicationInput {
  userId: string;
  reason: string;
  relevantExperience?: string;
  supportingLinks?: string;
}

export const userService = {
  async getBookmarks(userId: string) {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
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
      orderBy: { createdAt: 'desc' },
    });

    return bookmarks.map((b) => b.person);
  },

  async addBookmark(userId: string, personId: string) {
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_personId: { userId, personId },
      },
    });

    if (existing) {
      return existing;
    }

    return prisma.bookmark.create({
      data: { userId, personId },
    });
  },

  async removeBookmark(userId: string, personId: string) {
    await prisma.bookmark.delete({
      where: {
        userId_personId: { userId, personId },
      },
    });
  },

  async createCorrectionReport(input: CreateCorrectionReportInput) {
    return prisma.correctionReport.create({
      data: input,
    });
  },

  async getCorrectionReports(reporterId: string) {
    return prisma.correctionReport.findMany({
      where: { reporterId },
      include: {
        person: {
          select: {
            id: true,
            slug: true,
            fullName: true,
            displayName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async createContributorApplication(input: CreateContributorApplicationInput) {
    // Check for existing pending application
    const existing = await prisma.contributorApplication.findFirst({
      where: {
        userId: input.userId,
        status: 'PENDING',
      },
    });

    if (existing) {
      throw new Error('You already have a pending application');
    }

    return prisma.contributorApplication.create({
      data: input,
    });
  },
};
