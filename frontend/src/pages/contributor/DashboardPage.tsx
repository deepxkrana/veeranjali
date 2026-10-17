import { useQuery } from '@tanstack/react-query';
import { contributorApi } from '@/lib/api/contributor';
import { queryKeys } from '@/lib/queryKeys';

export default function ContributorDashboardPage() {
  const { data: submissions = [] } = useQuery({ queryKey: queryKeys.submissions, queryFn: contributorApi.list });
  const count = (status: string) => submissions.filter((item) => item.status === status).length;
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Contributor Dashboard</h1>
      <p className="mt-2 text-slate-600">Manage your story submissions.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Drafts</h2>
          <p className="mt-2 text-3xl font-bold text-slate-600">{count('DRAFT')}</p>
        </div>
        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Submitted</h2>
          <p className="mt-2 text-3xl font-bold text-saffron">{count('SUBMITTED_FOR_REVIEW') + count('RESUBMITTED')}</p>
        </div>
        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Published</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">{count('PUBLISHED')}</p>
        </div>
        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Needs Changes</h2>
          <p className="mt-2 text-3xl font-bold text-maroon">{count('NEEDS_CHANGES')}</p>
        </div>
      </div>
    </div>
  );
}
