import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { publicApi } from '@/lib/api/public';
import { queryKeys } from '@/lib/queryKeys';

export default function OnThisDayPage() {
  const today = new Date();
  const month = today.toLocaleDateString('en-IN', { month: 'long' });
  const day = today.getDate();
  const { data: people = [], isLoading } = useQuery({ queryKey: queryKeys.reference('on-this-day'), queryFn: publicApi.getOnThisDay });

  return (
    <div className="container py-8">
      <h1 className="font-serif text-3xl font-bold text-navy">
        On This Day: {month} {day}
      </h1>
      <p className="mt-2 text-slate-600">
        Remembering those who lost their lives on this day in history.
      </p>

      <div className="mt-8 rounded-xl border border-ivory-400 bg-white p-8">{isLoading && <p className="text-center text-slate-500">Loading remembrance entries...</p>}{!isLoading && people.length > 0 && <div className="grid gap-4 md:grid-cols-2">{people.map((person) => <Link key={person.id} to={`/people/${person.slug}`} className="rounded-lg bg-ivory-200 p-5 hover:shadow-soft"><h2 className="font-serif text-lg font-semibold text-navy">{person.display_name || person.full_name}</h2><p className="mt-1 text-sm text-slate-500">{person.rank} • {person.force}</p>{person.short_summary && <p className="mt-3 text-sm text-slate-600">{person.short_summary}</p>}</Link>)}</div>}{!isLoading && people.length === 0 && <p className="text-center text-slate-500">
          No events recorded for today's date in our archive yet.
        </p>}</div>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-semibold text-navy">
          How You Can Help
        </h2>
        <p className="mt-4 text-slate-600">
          If you know of someone who should be remembered, consider contributing their story to the archive.
        </p>
      </div>
    </div>
  );
}
