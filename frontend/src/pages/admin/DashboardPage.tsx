import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import { queryKeys } from '@/lib/queryKeys';

export default function AdminDashboardPage() {
  const { data } = useQuery({ queryKey: queryKeys.adminDashboard, queryFn: adminApi.dashboard });
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Admin Dashboard</h1>
      <p className="mt-2 text-slate-600">Overview of platform activity.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Pending Applications</h2>
          <p className="mt-2 text-3xl font-bold text-saffron">{data?.pending.applications ?? 0}</p>
          <p className="mt-1 text-sm text-slate-500">Contributor applications</p>
        </div>

        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Pending Submissions</h2>
          <p className="mt-2 text-3xl font-bold text-saffron">{data?.pending.submissions ?? 0}</p>
          <p className="mt-1 text-sm text-slate-500">Stories awaiting review</p>
        </div>

        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Corrections</h2>
          <p className="mt-2 text-3xl font-bold text-maroon">{data?.pending.corrections ?? 0}</p>
          <p className="mt-1 text-sm text-slate-500">Reports to review</p>
        </div>

        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Total Users</h2>
          <p className="mt-2 text-3xl font-bold text-navy">{data?.users.total ?? 0}</p>
          <p className="mt-1 text-sm text-slate-500">Registered users</p>
        </div>
      </div>
    </div>
  );
}
