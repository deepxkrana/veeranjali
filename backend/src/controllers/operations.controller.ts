import { Request, Response, NextFunction } from 'express';
import { operationsService } from '../services/operations.service.js';
import { AppError } from '../middleware/errorHandler.js';

export const operationsController = {
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = '1', limit = '20' } = req.query;

      const result = await operationsService.listOperations({
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug!;

      const operation = await operationsService.getOperationBySlug(slug);

      if (!operation) {
        throw new AppError(404, 'NOT_FOUND', 'Operation not found');
      }

      res.json({ data: operation });
    } catch (error) {
      next(error);
    }
  },
};
