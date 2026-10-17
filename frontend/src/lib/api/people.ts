import apiClient from './client';
import type { Person } from '@/types';

export interface SearchParams {
  q?: string;
  force?: string;
  rank?: string;
  state?: string;
  operation?: string;
  award?: string;
  year?: string;
  page?: number;
  limit?: number;
  sort?: 'name' | 'dateOfDeath' | 'publishedAt';
  order?: 'asc' | 'desc';
}

interface SearchResponse {
  data: Person[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const peopleApi = {
  async search(params: SearchParams): Promise<SearchResponse> {
    const response = await apiClient.get('/people', { params });
    return response.data;
  },

  async getBySlug(slug: string): Promise<{ data: Person }> {
    const response = await apiClient.get(`/people/${slug}`);
    return response.data;
  },
};
