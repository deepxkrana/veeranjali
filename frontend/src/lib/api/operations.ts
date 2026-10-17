import apiClient from './client';
import type { Operation, Person } from '@/types';

interface OperationSummary extends Operation {
  peopleCount: number;
}

export interface OperationsResponse {
  data: OperationSummary[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface OperationDetail extends Operation {
  people: Array<{
    role?: string;
    description?: string;
    person: Pick<Person, 'id' | 'slug' | 'fullName' | 'displayName' | 'rank' | 'force' | 'profileImage' | 'shortSummary'>;
  }>;
}

export const operationsApi = {
  async list(params: { page?: number; limit?: number } = {}): Promise<OperationsResponse> {
    const response = await apiClient.get('/operations', { params });
    return response.data;
  },

  async getBySlug(slug: string): Promise<{ data: OperationDetail }> {
    const response = await apiClient.get(`/operations/${slug}`);
    return response.data;
  },
};
