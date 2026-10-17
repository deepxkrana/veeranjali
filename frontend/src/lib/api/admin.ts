import apiClient from './client';
import type { AuditLog, ContributorApplication, CorrectionReport, StorySubmission, User } from '@/types';

interface Paged<T> { data: T[]; meta: { page: number; pageSize: number; total: number; totalPages: number } }

export const adminApi = {
  async dashboard() { const response = await apiClient.get('/admin/dashboard'); return response.data.data; },
  async applications(status?: string): Promise<Paged<ContributorApplication>> { const response = await apiClient.get('/admin/applications', { params: { status } }); return response.data; },
  async reviewApplication(id: string, status: 'APPROVED' | 'REJECTED', adminNote?: string) { const response = await apiClient.patch(`/admin/applications/${id}`, { status, adminNote }); return response.data.data; },
  async submissions(status?: string): Promise<Paged<StorySubmission>> { const response = await apiClient.get('/admin/submissions', { params: { status } }); return response.data; },
  async submission(id: string): Promise<StorySubmission> { const response = await apiClient.get(`/admin/submissions/${id}`); return response.data.data; },
  async reviewSubmission(id: string, action: 'request-changes' | 'approve' | 'publish' | 'reject' | 'archive', adminNote?: string) { const response = await apiClient.post(`/admin/submissions/${id}/${action}`, { adminNote }); return response.data.data; },
  async users(): Promise<Paged<User>> { const response = await apiClient.get('/admin/users'); return response.data; },
  async updateRole(id: string, role: User['role']) { const response = await apiClient.patch(`/admin/users/${id}/role`, { role }); return response.data.data; },
  async suspendUser(id: string, suspended: boolean) { const response = await apiClient.patch(`/admin/users/${id}/suspend`, { suspended }); return response.data.data; },
  async corrections(status?: string): Promise<Paged<CorrectionReport>> { const response = await apiClient.get('/admin/correction-reports', { params: { status } }); return response.data; },
  async resolveCorrection(id: string, status: 'ACCEPTED' | 'RESOLVED' | 'REJECTED', adminNote?: string) { const response = await apiClient.patch(`/admin/correction-reports/${id}`, { status, adminNote }); return response.data.data; },
  async auditLogs(): Promise<Paged<AuditLog>> { const response = await apiClient.get('/admin/audit-logs'); return response.data; },
};
