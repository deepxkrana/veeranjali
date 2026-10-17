import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { userApi } from '@/lib/api/user';
import { queryKeys } from '@/lib/queryKeys';

export default function UserDashboardPage() {
  const { data: bookmarks = [] } = useQuery({ queryKey: queryKeys.bookmarks, queryFn: userApi.getBookmarks });
  const { data: corrections = [] } = useQuery({ queryKey: queryKeys.corrections, queryFn: userApi.getCorrectionReports });
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-2 text-slate-600">Welcome back to Veeranjali.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Bookmarks</h2>
          <p className="mt-2 text-3xl font-bold text-saffron">{bookmarks.length}</p>
          <p className="mt-1 text-sm text-slate-500">Stories saved</p>
        </div>

        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Correction Reports</h2>
          <p className="mt-2 text-3xl font-bold text-saffron">{corrections.length}</p>
          <p className="mt-1 text-sm text-slate-500">Reports submitted</p>
        </div>

        <div className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Contributor Status</h2>
          <p className="mt-2 text-sm text-slate-500">Not a contributor</p>
          <Link to="/contribute" className="mt-3 inline-block rounded-lg bg-saffron px-4 py-2 text-sm font-medium text-ivory">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
