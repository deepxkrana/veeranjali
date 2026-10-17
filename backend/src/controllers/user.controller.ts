import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service.js';

export const userController = {
  async getBookmarks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      const bookmarks = await userService.getBookmarks(userId);

      res.json({ data: bookmarks });
    } catch (error) {
      next(error);
    }
  },

  async addBookmark(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = req.params.personId!;
      const userId = req.user!.id;

      await userService.addBookmark(userId, personId);

      res.json({ message: 'Bookmark added' });
    } catch (error) {
      next(error);
    }
  },

  async removeBookmark(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = req.params.personId!;
      const userId = req.user!.id;

      await userService.removeBookmark(userId, personId);

      res.json({ message: 'Bookmark removed' });
    } catch (error) {
      next(error);
    }
  },

  async createCorrectionReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { personId, message, supportingSourceUrl } = req.body;
      const reporterId = req.user!.id;

      const report = await userService.createCorrectionReport({
        personId,
        reporterId,
        message,
        supportingSourceUrl,
      });

      res.status(201).json({
        data: report,
        message: 'Correction report submitted',
      });
    } catch (error) {
      next(error);
    }
  },

  async getCorrectionReports(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reporterId = req.user!.id;

      const reports = await userService.getCorrectionReports(reporterId);

      res.json({ data: reports });
    } catch (error) {
      next(error);
    }
  },

  async createContributorApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { reason, relevantExperience, supportingLinks } = req.body;

      const application = await userService.createContributorApplication({
        userId,
        reason,
        relevantExperience,
        supportingLinks,
      });

      res.status(201).json({
        data: application,
        message: 'Application submitted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
