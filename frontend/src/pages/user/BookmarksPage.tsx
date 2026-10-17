import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { userApi } from '@/lib/api/user';
import { queryKeys } from '@/lib/queryKeys';

export default function BookmarksPage() {
  const { data: bookmarks = [], isLoading } = useQuery({ queryKey: queryKeys.bookmarks, queryFn: userApi.getBookmarks });
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Your Bookmarks</h1>
      <p className="mt-2 text-slate-600">Stories you've saved for later.</p>

      <div className="mt-8">
        {isLoading && <p className="text-slate-500">Loading bookmarks...</p>}
        {!isLoading && bookmarks.length > 0 && <div className="grid gap-4 md:grid-cols-2">{bookmarks.map((person) => <Link key={person.id} to={`/people/${person.slug}`} className="rounded-lg border border-ivory-400 bg-white p-6 hover:shadow-soft"><h2 className="font-serif text-lg font-semibold text-navy">{person.displayName || person.fullName}</h2><p className="mt-1 text-sm text-slate-500">{person.rank} • {person.force}</p>{person.shortSummary && <p className="mt-3 text-sm text-slate-600">{person.shortSummary}</p>}</Link>)}</div>}
        {!isLoading && bookmarks.length === 0 &&
        <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">
            You haven't bookmarked any stories yet. Browse the archive to find stories to save.
          </p>
        </div>}
      </div>
    </div>
  );
}
