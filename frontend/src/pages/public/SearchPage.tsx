import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { peopleApi, type SearchParams } from '@/lib/api/people';
import { queryKeys } from '@/lib/queryKeys';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const params: SearchParams = {
    q: searchParams.get('q') || undefined,
    force: searchParams.get('force') || undefined,
    rank: searchParams.get('rank') || undefined,
    state: searchParams.get('state') || undefined,
    operation: searchParams.get('operation') || undefined,
    award: searchParams.get('award') || undefined,
    year: searchParams.get('year') || undefined,
    page: Number(searchParams.get('page') || 1),
    limit: 20,
    sort: 'publishedAt',
    order: 'desc',
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.people(params),
    queryFn: () => peopleApi.search(params),
  });
  const results = data?.data ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  return (
    <div className="container py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-navy">Search the Archive</h1>
        <p className="mt-2 text-slate-600">
          Find stories of courage and service by name, unit, operation, or location.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, unit, operation, location..."
              className="w-full rounded-lg border border-ivory-400 bg-white py-3 pl-12 pr-4 text-charcoal placeholder-slate-400 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-navy px-6 py-3 font-medium text-ivory transition-colors hover:bg-navy-700 disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-lg border border-ivory-400 px-4 py-3 text-charcoal transition-colors hover:bg-ivory-400"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8 rounded-lg border border-ivory-400 bg-white p-6">
          <h3 className="mb-4 font-semibold text-navy">Filters</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Force</label>
              <select className="w-full rounded-lg border border-ivory-400 bg-white px-3 py-2 text-charcoal">
                <option value="">All Forces</option>
                <option value="army">Indian Army</option>
                <option value="navy">Indian Navy</option>
                <option value="airforce">Indian Air Force</option>
                <option value="capf">CAPF</option>
                <option value="police">Police</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">State</label>
              <select className="w-full rounded-lg border border-ivory-400 bg-white px-3 py-2 text-charcoal">
                <option value="">All States</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Rank</label>
              <select className="w-full rounded-lg border border-ivory-400 bg-white px-3 py-2 text-charcoal">
                <option value="">All Ranks</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Year</label>
              <input
                type="number"
                placeholder="e.g., 1999"
                className="w-full rounded-lg border border-ivory-400 bg-white px-3 py-2 text-charcoal"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div>
        {searchParams.get('q') && (
          <p className="mb-4 text-slate-600">
            Showing results for "<span className="font-medium text-charcoal">{searchParams.get('q')}</span>"
          </p>
        )}

        {isLoading ? (
          <div className="py-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-saffron border-t-transparent"></div>
            <p className="mt-4 text-slate-500">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <Link to={`/people/${result.slug}`} key={result.id} className="rounded-lg border border-ivory-400 bg-white p-6 transition-shadow hover:shadow-soft">
                <h3 className="font-serif text-lg font-semibold text-navy">{result.fullName}</h3>
                <p className="mt-1 text-sm text-slate-500">{result.rank} • {result.force}</p>
                <p className="mt-2 text-sm text-slate-600">{result.shortSummary}</p>
              </Link>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-12 text-center text-red-700">
            Unable to load archive results. Please try again.
          </div>
        ) : searchParams.get('q') ? (
          <div className="rounded-lg border border-ivory-400 bg-white p-12 text-center">
            <p className="text-slate-500">No results found. Try adjusting your search terms.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
