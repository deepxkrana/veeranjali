import apiClient from './client';
import type { User } from '@/types';

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  message: string;
}

export const authApi = {
  async login(data: LoginInput): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', data);
    return response.data.data;
  },

  async register(data: RegisterInput): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', data);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getCurrentUser(): Promise<{ user: User }> {
    const response = await apiClient.get('/auth/me');
    return response.data.data;
  },
};
