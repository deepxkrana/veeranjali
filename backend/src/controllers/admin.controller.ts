import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service.js';
import { AppError } from '../middleware/errorHandler.js';

export const adminController = {
  // Dashboard
  async getDashboard(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await adminService.getDashboardStats();
      res.json({ data: stats });
    } catch (error) {
      next(error);
    }
  },

  // Applications
  async getApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = '1', limit = '20', status } = req.query;

      const result = await adminService.getApplications({
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
        status: status as string,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getApplicationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;

      const application = await adminService.getApplicationById(id);

      if (!application) {
        throw new AppError(404, 'NOT_FOUND', 'Application not found');
      }

      res.json({ data: application });
    } catch (error) {
      next(error);
    }
  },

  async reviewApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { status, adminNote } = req.body;
      const reviewerId = req.user!.id;

      const application = await adminService.reviewApplication(id, reviewerId, {
        status,
        adminNote,
      });

      res.json({
        data: application,
        message: `Application ${status.toLowerCase()}`,
      });
    } catch (error) {
      next(error);
    }
  },

  // Submissions
  async getSubmissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = '1', limit = '20', status } = req.query;

      const result = await adminService.getSubmissions({
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
        status: status as string,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;

      const submission = await adminService.getSubmissionById(id);

      if (!submission) {
        throw new AppError(404, 'NOT_FOUND', 'Submission not found');
      }

      res.json({ data: submission });
    } catch (error) {
      next(error);
    }
  },

  async requestChanges(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { adminNote } = req.body;
      const reviewerId = req.user!.id;

      const submission = await adminService.requestChanges(id, reviewerId, adminNote);

      res.json({
        data: submission,
        message: 'Changes requested',
      });
    } catch (error) {
      next(error);
    }
  },

  async approveSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { adminNote } = req.body;
      const reviewerId = req.user!.id;

      const submission = await adminService.approveSubmission(id, reviewerId, adminNote);

      res.json({
        data: submission,
        message: 'Submission approved',
      });
    } catch (error) {
      next(error);
    }
  },

  async publishSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { adminNote } = req.body;
      const reviewerId = req.user!.id;

      const submission = await adminService.publishSubmission(id, reviewerId, adminNote);

      res.json({
        data: submission,
        message: 'Story published',
      });
    } catch (error) {
      next(error);
    }
  },

  async rejectSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { adminNote } = req.body;
      const reviewerId = req.user!.id;

      const submission = await adminService.rejectSubmission(id, reviewerId, adminNote);

      res.json({
        data: submission,
        message: 'Submission rejected',
      });
    } catch (error) {
      next(error);
    }
  },

  async archiveSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { adminNote } = req.body;
      const reviewerId = req.user!.id;

      const submission = await adminService.archiveSubmission(id, reviewerId, adminNote);

      res.json({
        data: submission,
        message: 'Submission archived',
      });
    } catch (error) {
      next(error);
    }
  },

  // Users
  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = '1', limit = '20' } = req.query;

      const result = await adminService.getUsers({
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { role } = req.body;
      const actorId = req.user!.id;

      const user = await adminService.updateUserRole(id, role, actorId);

      res.json({
        data: user,
        message: 'User role updated',
      });
    } catch (error) {
      next(error);
    }
  },

  async suspendUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { suspended } = req.body;
      const actorId = req.user!.id;

      const user = await adminService.suspendUser(id, suspended, actorId);

      res.json({
        data: user,
        message: suspended ? 'User suspended' : 'User reactivated',
      });
    } catch (error) {
      next(error);
    }
  },

  // Correction Reports
  async getCorrectionReports(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = '1', limit = '20', status } = req.query;

      const result = await adminService.getCorrectionReports({
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
        status: status as string,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async resolveCorrectionReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const { status, adminNote } = req.body;
      const resolverId = req.user!.id;

      const report = await adminService.resolveCorrectionReport(id, resolverId, {
        status,
        adminNote,
      });

      res.json({
        data: report,
        message: 'Correction report updated',
      });
    } catch (error) {
      next(error);
    }
  },

  // Audit Logs
  async getAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = '1', limit = '50' } = req.query;

      const result = await adminService.getAuditLogs({
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
