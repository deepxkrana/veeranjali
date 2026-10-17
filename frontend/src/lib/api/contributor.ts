import apiClient from './client';
import type { StorySubmission } from '@/types';

export const contributorApi = {
  async list(): Promise<StorySubmission[]> {
    const response = await apiClient.get('/contributor/submissions');
    return response.data.data;
  },
  async get(id: string): Promise<StorySubmission> {
    const response = await apiClient.get(`/contributor/submissions/${id}`);
    return response.data.data;
  },
  async create(data: { title: string; content: string; structuredData?: Record<string, unknown> }): Promise<StorySubmission> {
    const response = await apiClient.post('/contributor/submissions', data);
    return response.data.data;
  },
  async update(id: string, data: { title?: string; content?: string; structuredData?: Record<string, unknown> }): Promise<StorySubmission> {
    const response = await apiClient.patch(`/contributor/submissions/${id}`, data);
    return response.data.data;
  },
  async submit(id: string): Promise<StorySubmission> {
    const response = await apiClient.post(`/contributor/submissions/${id}/submit`);
    return response.data.data;
  },
  async resubmit(id: string): Promise<StorySubmission> {
    const response = await apiClient.post(`/contributor/submissions/${id}/resubmit`);
    return response.data.data;
  },
};
