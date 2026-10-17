import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { operationsApi } from '@/lib/api/operations';
import { queryKeys } from '@/lib/queryKeys';

export default function OperationPage() {
  const { slug = '' } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.operation(slug),
    queryFn: () => operationsApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
  const operation = data?.data;

  if (isLoading) return <div className="container py-12 text-center text-slate-500">Loading operation...</div>;
  if (isError || !operation) return <div className="container py-12 text-center text-red-700">This operation could not be found.</div>;

  return (
    <div className="container py-8">
      <nav className="mb-6 text-sm"><Link to="/" className="text-slate-500 hover:text-saffron">Home</Link><span className="mx-2 text-slate-400">/</span><Link to="/browse" className="text-slate-500 hover:text-saffron">Browse</Link><span className="mx-2 text-slate-400">/</span><span className="text-charcoal">{operation.name}</span></nav>
      <div className="rounded-xl border border-ivory-400 bg-white p-8">
        <h1 className="font-serif text-3xl font-bold text-navy">{operation.name}</h1>
        {operation.description && <p className="mt-4 text-lg text-slate-600">{operation.description}</p>}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {operation.startDate && <div><p className="text-sm text-slate-500">Start Date</p><p className="font-medium text-charcoal">{new Date(operation.startDate).toLocaleDateString('en-IN')}</p></div>}
          {operation.endDate && <div><p className="text-sm text-slate-500">End Date</p><p className="font-medium text-charcoal">{new Date(operation.endDate).toLocaleDateString('en-IN')}</p></div>}
          {operation.location && <div><p className="text-sm text-slate-500">Location</p><p className="font-medium text-charcoal">{operation.location}</p></div>}
        </div>
        {operation.historicalContext && <div className="mt-8 border-t border-ivory-400 pt-8"><h2 className="font-serif text-xl font-semibold text-navy">Historical Context</h2><p className="mt-4 whitespace-pre-line text-slate-600">{operation.historicalContext}</p></div>}
        <div className="mt-8 border-t border-ivory-400 pt-8"><h2 className="font-serif text-xl font-semibold text-navy">Participants</h2>{operation.people.length > 0 ? <ul className="mt-4 grid gap-4 sm:grid-cols-2">{operation.people.map((participant) => <li key={participant.person.id}><Link to={`/people/${participant.person.slug}`} className="font-medium text-navy hover:text-saffron">{participant.person.displayName || participant.person.fullName}</Link><p className="text-sm text-slate-500">{participant.person.rank} • {participant.person.force}</p></li>)}</ul> : <p className="mt-4 text-slate-500">Participant information will be displayed here when available.</p>}</div>
      </div>
    </div>
  );
}
