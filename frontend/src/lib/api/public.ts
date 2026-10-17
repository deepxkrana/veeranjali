import apiClient from './client';
import type { Award } from '@/types';

export const publicApi = {
  async getForces(): Promise<string[]> {
    const response = await apiClient.get('/forces');
    return response.data.data;
  },
  async getRanks(): Promise<string[]> {
    const response = await apiClient.get('/ranks');
    return response.data.data;
  },
  async getStates(): Promise<string[]> {
    const response = await apiClient.get('/states');
    return response.data.data;
  },
  async getAwards(): Promise<Array<Award & { peopleCount: number }>> {
    const response = await apiClient.get('/awards');
    return response.data.data;
  },
  async getOnThisDay(): Promise<Array<{ id: string; slug: string; full_name: string; display_name?: string; rank?: string; force?: string; short_summary?: string; date_of_death?: string }>> {
    const response = await apiClient.get('/on-this-day');
    return response.data.data;
  },
};
