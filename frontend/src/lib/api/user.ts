import apiClient from './client';
import type { CorrectionReport, Person } from '@/types';

export const userApi = {
  async getBookmarks(): Promise<Person[]> {
    const response = await apiClient.get('/me/bookmarks');
    return response.data.data;
  },
  async addBookmark(personId: string): Promise<void> {
    await apiClient.post(`/me/bookmarks/${personId}`);
  },
  async removeBookmark(personId: string): Promise<void> {
    await apiClient.delete(`/me/bookmarks/${personId}`);
  },
  async getCorrectionReports(): Promise<CorrectionReport[]> {
    const response = await apiClient.get('/me/correction-reports');
    return response.data.data;
  },
  async applyAsContributor(data: { reason: string; relevantExperience?: string; supportingLinks?: string }) {
    const response = await apiClient.post('/me/contributor-applications', data);
    return response.data.data;
  },
};
