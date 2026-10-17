import { Request, Response, NextFunction } from 'express';
import { publicService } from '../services/public.service.js';

export const publicController = {
  async getForces(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const forces = await publicService.getUniqueForces();
      res.json({ data: forces });
    } catch (error) {
      next(error);
    }
  },

  async getRanks(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ranks = await publicService.getUniqueRanks();
      res.json({ data: ranks });
    } catch (error) {
      next(error);
    }
  },

  async getStates(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const states = await publicService.getUniqueStates();
      res.json({ data: states });
    } catch (error) {
      next(error);
    }
  },

  async getAwards(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const awards = await publicService.getAwards();
      res.json({ data: awards });
    } catch (error) {
      next(error);
    }
  },

  async getOnThisDay(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const events = await publicService.getOnThisDay();
      res.json({ data: events });
    } catch (error) {
      next(error);
    }
  },
};
