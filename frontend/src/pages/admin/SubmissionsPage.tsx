import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { adminApi } from '@/lib/api/admin';
import { queryKeys } from '@/lib/queryKeys';

export default function AdminSubmissionsPage() {
  const { data, isLoading } = useQuery({ queryKey: queryKeys.adminSubmissions, queryFn: () => adminApi.submissions('SUBMITTED_FOR_REVIEW') });
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Story Submissions</h1>
      <p className="mt-2 text-slate-600">Review and manage story submissions.</p>

      <div className="mt-8">{isLoading && <p className="text-slate-500">Loading submissions...</p>}{!isLoading && data?.data.length ? <div className="space-y-3">{data.data.map((submission) => <Link key={submission.id} to={`/admin/submissions/${submission.id}`} className="block rounded-lg border border-ivory-400 bg-white p-5 hover:shadow-soft"><h2 className="font-semibold text-navy">{submission.title}</h2><p className="mt-1 text-sm text-slate-500">Status: {submission.status.replace(/_/g, ' ')}</p></Link>)}</div> : !isLoading && <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">No submissions to review.</p>
        </div>}</div>
    </div>
  );
}
