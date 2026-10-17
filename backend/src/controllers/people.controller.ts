import { Request, Response, NextFunction } from 'express';
import { peopleService } from '../services/people.service.js';
import { AppError } from '../middleware/errorHandler.js';

export const peopleController = {
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        q,
        force,
        rank,
        state,
        operation,
        award,
        year,
        page = '1',
        limit = '20',
        sort = 'publishedAt',
        order = 'desc',
      } = req.query;

      const result = await peopleService.searchPublishedPeople({
        query: q as string,
        force: force as string,
        rank: rank as string,
        state: state as string,
        operation: operation as string,
        award: award as string,
        year: year as string,
        page: parseInt(page as string, 10),
        limit: Math.min(parseInt(limit as string, 10), 100),
        sort: sort as 'name' | 'dateOfDeath' | 'publishedAt',
        order: order as 'asc' | 'desc',
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = req.params.slug!;

      const person = await peopleService.getPublishedPersonBySlug(slug);

      if (!person) {
        throw new AppError(404, 'NOT_FOUND', 'Person not found');
      }

      res.json({ data: person });
    } catch (error) {
      next(error);
    }
  },
};
