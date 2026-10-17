import { Link } from 'react-router-dom';

export default function BrowsePage() {
  return (
    <div className="container py-8">
      <h1 className="font-serif text-3xl font-bold text-navy">Browse the Archive</h1>
      <p className="mt-2 text-slate-600">
        Explore stories by category, location, or recognition.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* By Force */}
        <section className="rounded-xl border border-ivory-400 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-navy">By Force</h2>
          <ul className="mt-4 space-y-2">
            {['Indian Army', 'Indian Navy', 'Indian Air Force', 'CAPF', 'Police'].map((force) => (
              <li key={force}>
                <Link
                  to={`/search?force=${encodeURIComponent(force)}`}
                  className="text-slate-600 hover:text-saffron"
                >
                  {force}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* By State */}
        <section className="rounded-xl border border-ivory-400 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-navy">By State</h2>
          <ul className="mt-4 space-y-2">
            {['Maharashtra', 'Karnataka', 'Uttarakhand', 'Rajasthan', 'Punjab'].map((state) => (
              <li key={state}>
                <Link
                  to={`/search?state=${encodeURIComponent(state)}`}
                  className="text-slate-600 hover:text-saffron"
                >
                  {state}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* By Award */}
        <section className="rounded-xl border border-ivory-400 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-navy">By Award</h2>
          <ul className="mt-4 space-y-2">
            {['Param Vir Chakra', 'Ashoka Chakra', 'Kirti Chakra', 'Shaurya Chakra', 'Vir Chakra'].map((award) => (
              <li key={award}>
                <Link
                  to={`/search?award=${encodeURIComponent(award)}`}
                  className="text-slate-600 hover:text-saffron"
                >
                  {award}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* By Operation */}
        <section className="rounded-xl border border-ivory-400 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-navy">By Operation</h2>
          <ul className="mt-4 space-y-2">
            {['Operation Vijay', 'Operation Safed Sagar', 'Operation Cactus'].map((op) => (
              <li key={op}>
                <Link
                  to={`/search?operation=${encodeURIComponent(op)}`}
                  className="text-slate-600 hover:text-saffron"
                >
                  {op}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* By Year */}
        <section className="rounded-xl border border-ivory-400 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-navy">By Year</h2>
          <ul className="mt-4 space-y-2">
            {[2020, 2019, 2018, 2017, 2016].map((year) => (
              <li key={year}>
                <Link
                  to={`/search?year=${year}`}
                  className="text-slate-600 hover:text-saffron"
                >
                  {year}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Featured */}
        <section className="rounded-xl border border-ivory-400 bg-white p-6">
          <h2 className="font-serif text-xl font-semibold text-navy">Featured Stories</h2>
          <p className="mt-4 text-sm text-slate-500">
            Curated stories highlighting extraordinary courage and dedication.
          </p>
          <Link
            to="/search?featured=true"
            className="mt-4 inline-block text-sm font-medium text-saffron hover:underline"
          >
            View featured stories →
          </Link>
        </section>
      </div>
    </div>
  );
}
