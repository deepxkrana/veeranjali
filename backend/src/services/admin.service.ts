import { PrismaClient, StoryStatus, ApplicationStatus, UserRole, CorrectionStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface ListParams {
  page: number;
  limit: number;
  status?: string;
}

export const adminService = {
  // Dashboard
  async getDashboardStats() {
    const [
      totalUsers,
      totalContributors,
      pendingApplications,
      pendingSubmissions,
      pendingCorrections,
      publishedPeople,
      totalSubmissions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.CONTRIBUTOR } }),
      prisma.contributorApplication.count({ where: { status: ApplicationStatus.PENDING } }),
      prisma.storySubmission.count({
        where: { status: { in: [StoryStatus.SUBMITTED_FOR_REVIEW, StoryStatus.RESUBMITTED] } },
      }),
      prisma.correctionReport.count({ where: { status: CorrectionStatus.PENDING } }),
      prisma.person.count({ where: { publishedAt: { not: null } } }),
      prisma.storySubmission.count(),
    ]);

    return {
      users: {
        total: totalUsers,
        contributors: totalContributors,
      },
      content: {
        published: publishedPeople,
        totalSubmissions,
      },
      pending: {
        applications: pendingApplications,
        submissions: pendingSubmissions,
        corrections: pendingCorrections,
      },
    };
  },

  // Applications
  async getApplications(params: ListParams) {
    const { page, limit, status } = params;

    const where: any = {};
    if (status) {
      where.status = status as ApplicationStatus;
    }

    const total = await prisma.contributorApplication.count({ where });

    const applications = await prisma.contributorApplication.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: applications,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getApplicationById(id: string) {
    return prisma.contributorApplication.findUnique({
      where: { id },
      include: {
        user: true,
        reviewer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  async reviewApplication(id: string, reviewerId: string, input: { status: ApplicationStatus; adminNote?: string }) {
    // Update application
    const application = await prisma.contributorApplication.update({
      where: { id },
      data: {
        status: input.status,
        adminNote: input.adminNote,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
      },
    });

    // If approved, update user role
    if (input.status === ApplicationStatus.APPROVED) {
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: UserRole.CONTRIBUTOR },
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        actorId: reviewerId,
        action: `APPLICATION_${input.status}`,
        entityType: 'ContributorApplication',
        entityId: id,
        metadata: { adminNote: input.adminNote },
      },
    });

    return application;
  },

  // Submissions
  async getSubmissions(params: ListParams) {
    const { page, limit, status } = params;

    const where: any = {};
    if (status) {
      where.status = status as StoryStatus;
    }

    const total = await prisma.storySubmission.count({ where });

    const submissions = await prisma.storySubmission.findMany({
      where,
      include: {
        contributor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        person: {
          select: {
            id: true,
            slug: true,
            fullName: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: submissions,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getSubmissionById(id: string) {
    return prisma.storySubmission.findUnique({
      where: { id },
      include: {
        contributor: true,
        person: true,
        revisions: {
          include: {
            editor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  async requestChanges(id: string, reviewerId: string, adminNote?: string) {
    const submission = await prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.NEEDS_CHANGES,
        adminNote,
        reviewedAt: new Date(),
      },
    });

    // Create revision snapshot
    await prisma.storyRevision.create({
      data: {
        storySubmissionId: id,
        editorId: reviewerId,
        contentSnapshot: { title: submission.title, content: submission.content },
        changeSummary: adminNote || 'Changes requested',
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        actorId: reviewerId,
        action: 'REQUEST_CHANGES',
        entityType: 'StorySubmission',
        entityId: id,
        metadata: { adminNote },
      },
    });

    return submission;
  },

  async approveSubmission(id: string, reviewerId: string, adminNote?: string) {
    const submission = await prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.APPROVED,
        adminNote,
        reviewedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: reviewerId,
        action: 'APPROVE_SUBMISSION',
        entityType: 'StorySubmission',
        entityId: id,
        metadata: { adminNote },
      },
    });

    return submission;
  },

  async publishSubmission(id: string, reviewerId: string, adminNote?: string) {
    const submission = await prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.PUBLISHED,
        adminNote,
        publishedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: reviewerId,
        action: 'PUBLISH_SUBMISSION',
        entityType: 'StorySubmission',
        entityId: id,
        metadata: { adminNote },
      },
    });

    return submission;
  },

  async rejectSubmission(id: string, reviewerId: string, adminNote?: string) {
    const submission = await prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.REJECTED,
        adminNote,
        reviewedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: reviewerId,
        action: 'REJECT_SUBMISSION',
        entityType: 'StorySubmission',
        entityId: id,
        metadata: { adminNote },
      },
    });

    return submission;
  },

  async archiveSubmission(id: string, reviewerId: string, adminNote?: string) {
    const submission = await prisma.storySubmission.update({
      where: { id },
      data: {
        status: StoryStatus.ARCHIVED,
        adminNote,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: reviewerId,
        action: 'ARCHIVE_SUBMISSION',
        entityType: 'StorySubmission',
        entityId: id,
        metadata: { adminNote },
      },
    });

    return submission;
  },

  // Users
  async getUsers(params: ListParams) {
    const { page, limit } = params;

    const total = await prisma.user.count();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        suspendedAt: true,
        createdAt: true,
        _count: {
          select: {
            storySubmissions: true,
            bookmarks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async updateUserRole(id: string, role: UserRole, actorId: string) {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });

    await prisma.auditLog.create({
      data: {
        actorId,
        action: 'UPDATE_USER_ROLE',
        entityType: 'User',
        entityId: id,
        metadata: { newRole: role },
      },
    });

    return user;
  },

  async suspendUser(id: string, suspended: boolean, actorId: string) {
    const user = await prisma.user.update({
      where: { id },
      data: { suspendedAt: suspended ? new Date() : null },
    });

    await prisma.auditLog.create({
      data: {
        actorId,
        action: suspended ? 'SUSPEND_USER' : 'REACTIVATE_USER',
        entityType: 'User',
        entityId: id,
      },
    });

    return user;
  },

  // Correction Reports
  async getCorrectionReports(params: ListParams) {
    const { page, limit, status } = params;

    const where: any = {};
    if (status) {
      where.status = status as CorrectionStatus;
    }

    const total = await prisma.correctionReport.count({ where });

    const reports = await prisma.correctionReport.findMany({
      where,
      include: {
        person: {
          select: {
            id: true,
            slug: true,
            fullName: true,
            displayName: true,
          },
        },
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        resolver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: reports,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async resolveCorrectionReport(id: string, resolverId: string, input: { status: CorrectionStatus; adminNote?: string }) {
    const report = await prisma.correctionReport.update({
      where: { id },
      data: {
        status: input.status,
        adminNote: input.adminNote,
        resolvedBy: resolverId,
        resolvedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: resolverId,
        action: 'RESOLVE_CORRECTION',
        entityType: 'CorrectionReport',
        entityId: id,
        metadata: { status: input.status, adminNote: input.adminNote },
      },
    });

    return report;
  },

  // Audit Logs
  async getAuditLogs(params: ListParams) {
    const { page, limit } = params;

    const total = await prisma.auditLog.count();

    const logs = await prisma.auditLog.findMany({
      include: {
        actor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: logs,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
