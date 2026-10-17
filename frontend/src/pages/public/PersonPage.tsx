import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, Award, BookOpen, AlertTriangle } from 'lucide-react';
import { peopleApi } from '@/lib/api/people';
import { queryKeys } from '@/lib/queryKeys';

export default function PersonPage() {
  const { slug = '' } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.person(slug),
    queryFn: () => peopleApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
  const person = data?.data;

  if (isLoading) return <div className="container py-12 text-center text-slate-500">Loading tribute...</div>;
  if (isError || !person) return <div className="container py-12 text-center text-red-700">This tribute could not be found.</div>;

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm">
        <Link to="/" className="text-slate-500 hover:text-saffron">Home</Link>
        <span className="mx-2 text-slate-400">/</span>
        <Link to="/search" className="text-slate-500 hover:text-saffron">Archive</Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="text-charcoal">{person.displayName || person.fullName}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-ivory-400 bg-white p-8">
            <div className="border-b border-ivory-400 pb-6">
              <p className="text-sm font-medium text-saffron">{person.rank} • {person.force}</p>
              <h1 className="mt-2 font-serif text-3xl font-bold text-navy lg:text-4xl">{person.fullName}</h1>
              {person.shortSummary && <p className="mt-4 text-lg text-slate-600">{person.shortSummary}</p>}
            </div>
            <div className="grid gap-4 border-b border-ivory-400 py-6 sm:grid-cols-2">
              {person.hometown && <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-slate-400" /><div><p className="text-sm text-slate-500">Hometown</p><p className="font-medium text-charcoal">{person.hometown}</p></div></div>}
              {person.dateOfDeath && <div className="flex items-start gap-3"><Calendar className="mt-0.5 h-5 w-5 text-slate-400" /><div><p className="text-sm text-slate-500">Date of Death</p><p className="font-medium text-charcoal">{new Date(person.dateOfDeath).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div></div>}
            </div>
            {person.fullBiography && <div className="py-6"><h2 className="font-serif text-xl font-semibold text-navy">Biography</h2><p className="mt-4 whitespace-pre-line text-slate-600">{person.fullBiography}</p></div>}
            {person.timelineEvents && person.timelineEvents.length > 0 && <div className="border-t border-ivory-400 pt-6"><h2 className="font-serif text-xl font-semibold text-navy">Timeline</h2><ul className="mt-4 space-y-4">{person.timelineEvents.map((event) => <li key={event.id} className="border-l-2 border-saffron pl-4"><p className="font-medium text-charcoal">{event.title}</p>{event.date && <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString('en-IN')}</p>}{event.description && <p className="mt-1 text-sm text-slate-600">{event.description}</p>}</li>)}</ul></div>}
          </div>
        </div>
        <div className="space-y-6">
          {person.awards && person.awards.length > 0 && <div className="rounded-xl border border-ivory-400 bg-white p-6"><h3 className="flex items-center gap-2 font-semibold text-navy"><Award className="h-5 w-5" />Awards</h3><ul className="mt-4 space-y-3">{person.awards.map((item) => <li key={item.award.id} className="rounded-lg bg-ivory-200 p-3"><p className="font-medium text-charcoal">{item.award.name}</p>{item.citation && <p className="mt-1 text-sm text-slate-500">{item.citation}</p>}</li>)}</ul></div>}
          {person.operations && person.operations.length > 0 && <div className="rounded-xl border border-ivory-400 bg-white p-6"><h3 className="flex items-center gap-2 font-semibold text-navy"><BookOpen className="h-5 w-5" />Operations</h3><ul className="mt-4 space-y-2">{person.operations.map((item) => <li key={item.operation.id}><Link to={`/operations/${item.operation.slug}`} className="text-slate-600 hover:text-saffron">{item.operation.name}</Link></li>)}</ul></div>}
          <div className="rounded-xl border border-ivory-400 bg-white p-6"><h3 className="font-semibold text-navy">Verification Status</h3><p className="mt-2 text-sm text-slate-600">{person.verificationStatus.replace(/_/g, ' ').toLowerCase()}</p></div>
          <Link to="/dashboard/corrections" className="flex items-center gap-2 rounded-lg border border-ivory-400 p-4 text-sm text-slate-600 transition-colors hover:bg-ivory-400"><AlertTriangle className="h-4 w-4" />Report an error</Link>
        </div>
      </div>
    </div>
  );
}
