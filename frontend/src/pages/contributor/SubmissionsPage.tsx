import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { contributorApi } from '@/lib/api/contributor';
import { queryKeys } from '@/lib/queryKeys';

export default function SubmissionsPage() {
  const { data: submissions = [], isLoading } = useQuery({ queryKey: queryKeys.submissions, queryFn: contributorApi.list });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-navy">Your Submissions</h1>
        <Link
        to="/contributor/submissions/new"
          className="rounded-lg bg-saffron px-4 py-2 text-sm font-medium text-ivory"
        >
          New Submission
        </Link>
      </div>

      <div className="mt-8">
        {isLoading && <p className="text-slate-500">Loading submissions...</p>}
        {!isLoading && submissions.length > 0 && <div className="space-y-3">{submissions.map((submission) => <Link key={submission.id} to={`/contributor/submissions/${submission.id}`} className="block rounded-lg border border-ivory-400 bg-white p-5 hover:shadow-soft"><div className="flex items-center justify-between"><h2 className="font-semibold text-navy">{submission.title}</h2><span className="text-xs font-medium text-saffron">{submission.status.replace(/_/g, ' ')}</span></div><p className="mt-2 text-sm text-slate-500">Updated {new Date(submission.updatedAt).toLocaleDateString('en-IN')}</p></Link>)}</div>}
        {!isLoading && submissions.length === 0 && <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">
            You haven't created any submissions yet. Click "New Submission" to get started.
          </p>
        </div>}
      </div>
    </div>
  );
}
