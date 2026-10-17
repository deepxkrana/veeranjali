import { beforeEach, describe, expect, it, vi } from 'vitest';

const { prisma } = vi.hoisted(() => ({
  prisma: {
    storySubmission: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => prisma),
  StoryStatus: {
    DRAFT: 'DRAFT',
    SUBMITTED_FOR_REVIEW: 'SUBMITTED_FOR_REVIEW',
    NEEDS_CHANGES: 'NEEDS_CHANGES',
    RESUBMITTED: 'RESUBMITTED',
  },
}));

import { contributorService } from '../../src/services/contributor.service.js';

describe('contributor story transitions', () => {
  beforeEach(() => vi.clearAllMocks());

  it('submits a draft for review', async () => {
    prisma.storySubmission.findFirst.mockResolvedValue({ id: 'story-1', status: 'DRAFT' });
    prisma.storySubmission.update.mockResolvedValue({ id: 'story-1', status: 'SUBMITTED_FOR_REVIEW' });

    const result = await contributorService.submitForReview('story-1', 'contributor-1');

    expect(result?.status).toBe('SUBMITTED_FOR_REVIEW');
    expect(prisma.storySubmission.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'story-1' },
      data: expect.objectContaining({ status: 'SUBMITTED_FOR_REVIEW' }),
    }));
  });

  it('does not submit a story that is already under review', async () => {
    prisma.storySubmission.findFirst.mockResolvedValue({ id: 'story-1', status: 'SUBMITTED_FOR_REVIEW' });

    const result = await contributorService.submitForReview('story-1', 'contributor-1');

    expect(result).toBeNull();
    expect(prisma.storySubmission.update).not.toHaveBeenCalled();
  });

  it('resubmits a story after changes were requested', async () => {
    prisma.storySubmission.findFirst.mockResolvedValue({ id: 'story-1', status: 'NEEDS_CHANGES' });
    prisma.storySubmission.update.mockResolvedValue({ id: 'story-1', status: 'RESUBMITTED' });

    const result = await contributorService.resubmitForReview('story-1', 'contributor-1');

    expect(result?.status).toBe('RESUBMITTED');
  });

  it('prevents editing a published story', async () => {
    prisma.storySubmission.findFirst.mockResolvedValue({ id: 'story-1', status: 'PUBLISHED' });

    await expect(contributorService.updateSubmission('story-1', 'contributor-1', { title: 'Updated' }))
      .rejects.toThrow('current status');
    expect(prisma.storySubmission.update).not.toHaveBeenCalled();
  });
});
