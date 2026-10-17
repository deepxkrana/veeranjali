import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/admin';
import { queryKeys } from '@/lib/queryKeys';

export default function ApplicationsPage() {
  const client = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: queryKeys.adminApplications, queryFn: () => adminApi.applications('PENDING') });
  const review = useMutation({ mutationFn: ({ id, status }: { id: string; status: 'APPROVED' | 'REJECTED' }) => adminApi.reviewApplication(id, status), onSuccess: () => { void client.invalidateQueries({ queryKey: queryKeys.adminApplications }); } });
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Contributor Applications</h1>
      <p className="mt-2 text-slate-600">Review and manage contributor applications.</p>

      <div className="mt-8">{isLoading && <p className="text-slate-500">Loading applications...</p>}{!isLoading && data?.data.length ? <div className="space-y-4">{data.data.map((application) => <div key={application.id} className="rounded-lg border border-ivory-400 bg-white p-6"><h2 className="font-semibold text-navy">{application.user?.name || application.userId}</h2><p className="mt-2 text-sm text-slate-600">{application.reason}</p><div className="mt-4 flex gap-3"><button onClick={() => review.mutate({ id: application.id, status: 'APPROVED' })} className="rounded bg-green-700 px-4 py-2 text-sm text-white">Approve</button><button onClick={() => review.mutate({ id: application.id, status: 'REJECTED' })} className="rounded bg-maroon px-4 py-2 text-sm text-white">Reject</button></div></div>)}</div> : !isLoading && <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">No pending applications.</p>
        </div>}</div>
    </div>
  );
}
