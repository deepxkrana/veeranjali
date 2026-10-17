import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import type { User } from '@/types';
import { queryKeys } from '@/lib/queryKeys';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: authApi.getCurrentUser,
    retry: false,
  });

  const value = useMemo<AuthContextValue>(() => ({
    user: data?.user ?? null,
    isLoading,
    isAuthenticated: Boolean(data?.user),
    logout: async () => {
      await authApi.logout();
      queryClient.setQueryData(queryKeys.currentUser, null);
    },
  }), [data?.user, isLoading, queryClient]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
