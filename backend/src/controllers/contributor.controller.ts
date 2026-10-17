import { Request, Response, NextFunction } from 'express';
import { contributorService } from '../services/contributor.service.js';
import { AppError } from '../middleware/errorHandler.js';

export const contributorController = {
  async getSubmissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contributorId = req.user!.id;

      const result = await contributorService.getSubmissionsByContributor(contributorId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getSubmissionById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const contributorId = req.user!.id;

      const submission = await contributorService.getSubmissionById(id, contributorId);

      if (!submission) {
        throw new AppError(404, 'NOT_FOUND', 'Submission not found');
      }

      res.json({ data: submission });
    } catch (error) {
      next(error);
    }
  },

  async createSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contributorId = req.user!.id;
      const { title, content, structuredData } = req.body;

      const submission = await contributorService.createSubmission({
        contributorId,
        title,
        content,
        structuredData,
      });

      res.status(201).json({
        data: submission,
        message: 'Draft created successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  async updateSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const contributorId = req.user!.id;
      const updates = req.body;

      const submission = await contributorService.updateSubmission(id, contributorId, updates);

      if (!submission) {
        throw new AppError(404, 'NOT_FOUND', 'Submission not found or cannot be updated');
      }

      res.json({
        data: submission,
        message: 'Submission updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  async submitForReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const contributorId = req.user!.id;

      const submission = await contributorService.submitForReview(id, contributorId);

      if (!submission) {
        throw new AppError(400, 'INVALID_STATE', 'Submission cannot be submitted for review');
      }

      res.json({
        data: submission,
        message: 'Submission sent for review',
      });
    } catch (error) {
      next(error);
    }
  },

  async resubmitForReview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id!;
      const contributorId = req.user!.id;

      const submission = await contributorService.resubmitForReview(id, contributorId);

      if (!submission) {
        throw new AppError(400, 'INVALID_STATE', 'Submission cannot be resubmitted');
      }

      res.json({
        data: submission,
        message: 'Submission resubmitted for review',
      });
    } catch (error) {
      next(error);
    }
  },
};
