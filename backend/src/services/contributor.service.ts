import { PrismaClient, StoryStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateSubmissionInput {
  contributorId: string;
  title: string;
  content: string;
  structuredData?: any;
}

interface UpdateSubmissionInput {
  title?: string;
  content?: string;
  structuredData?: any;
}

export const contributorService = {
  async getSubmissionsByContributor(contributorId: string) {
    const submissions = await prisma.storySubmission.findMany({
      where: { contributorId },
      include: {
        person: {
          select: {
            id: true,
            slug: true,
            fullName: true,
            displayName: true,
          },
        },
        revisions: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return {
      data: submissions,
    };
  },

  async getSubmissionById(id: string, contributorId: string) {
    return prisma.storySubmission.findFirst({
      where: {
        id,
        contributorId,
      },
      include: {
        person: true,
        revisions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
  },

  async createSubmission(input: CreateSubmissionInput) {
    return prisma.storySubmission.create({
      data: {
        contributorId: input.contributorId,
        title: input.title,
        content: input.content,
        structuredData: input.structuredData || {},
        status: StoryStatus.DRAFT,
      },
    });
  },

  async updateSubmission(id: string, contributorId: string, updates: UpdateSubmissionInput) {
    // Check ownership and allowed status
    const existing = await prisma.storySubmission.findFirst({
      where: { id, contributorId },
    });

    if (!existing) {
      return null;
    }

    // Can only edit DRAFT or NEEDS_CHANGES
    if (existing.status !== StoryStatus.DRAFT && existing.status !== StoryStatus.NEEDS_CHANGES) {
      throw new Error('Cannot update submission in current status');
    }

    return prisma.storySubmission.update({
      where: { id },
      data: updates,
    });
  },

  async submitForReview(id: string, contributorId: string) {
    const existing = await prisma.storySubmission.findFirst({
      where: { id, contributorId },
    });

    if (!existing || existing.status !== StoryStatus.DRAFT) {
      return null;
    }

    return prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.SUBMITTED_FOR_REVIEW,
        submittedAt: new Date(),
      },
    });
  },

  async resubmitForReview(id: string, contributorId: string) {
    const existing = await prisma.storySubmission.findFirst({
      where: { id, contributorId },
    });

    if (!existing || existing.status !== StoryStatus.NEEDS_CHANGES) {
      return null;
    }

    return prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.RESUBMITTED,
        submittedAt: new Date(),
      },
    });
  },
};
