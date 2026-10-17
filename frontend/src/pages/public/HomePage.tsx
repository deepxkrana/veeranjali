import { Link } from 'react-router-dom';
import { Search, BookOpen, Heart, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy to-navy-700 py-20 text-ivory">
        <div className="container text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Every life of service deserves to be remembered.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ivory-400">
            Veeranjali is a growing digital archive of the lives, service, courage, and sacrifice of India's soldiers, police personnel, CAPF members, and public servants.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-saffron px-6 py-3 font-medium text-ivory transition-colors hover:bg-saffron-600"
            >
              <Search className="h-5 w-5" />
              Explore the Archive
            </Link>
            <Link
              to="/contribute"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-ivory-400 px-6 py-3 font-medium text-ivory transition-colors hover:bg-ivory hover:text-navy"
            >
              <Heart className="h-5 w-5" />
              Share a Story
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="border-b border-ivory-400 bg-ivory-200 py-12">
        <div className="container">
          <form action="/search" method="get" className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                name="q"
                placeholder="Search by name, unit, operation, or location..."
                className="w-full rounded-lg border border-ivory-400 bg-white py-3 pl-12 pr-4 text-charcoal placeholder-slate-400 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Browse By */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-navy">
            Browse the Archive
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/browse?by=force"
              className="group rounded-xl border border-ivory-400 bg-white p-6 text-center transition-all hover:border-saffron hover:shadow-soft"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-ivory transition-colors group-hover:bg-saffron">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-navy">By Force</h3>
              <p className="mt-1 text-sm text-slate-500">Indian Army, Navy, Air Force & more</p>
            </Link>

            <Link
              to="/browse?by=state"
              className="group rounded-xl border border-ivory-400 bg-white p-6 text-center transition-all hover:border-saffron hover:shadow-soft"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-ivory transition-colors group-hover:bg-saffron">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-navy">By State</h3>
              <p className="mt-1 text-sm text-slate-500">Explore by home state</p>
            </Link>

            <Link
              to="/browse?by=operation"
              className="group rounded-xl border border-ivory-400 bg-white p-6 text-center transition-all hover:border-saffron hover:shadow-soft"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-ivory transition-colors group-hover:bg-saffron">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-navy">By Operation</h3>
              <p className="mt-1 text-sm text-slate-500">Operations and missions</p>
            </Link>

            <Link
              to="/browse?by=award"
              className="group rounded-xl border border-ivory-400 bg-white p-6 text-center transition-all hover:border-saffron hover:shadow-soft"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-ivory transition-colors group-hover:bg-saffron">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-navy">By Award</h3>
              <p className="mt-1 text-sm text-slate-500">Gallantry awards & honors</p>
            </Link>
          </div>
        </div>
      </section>

      {/* On This Day */}
      <section className="bg-ivory-200 py-16">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-navy">On This Day</h2>
            <Link to="/on-this-day" className="text-sm font-medium text-saffron hover:underline">
              View all
            </Link>
          </div>
          <p className="mt-4 text-slate-600">
            Remembering those who lost their lives on this day in history.
          </p>
          <div className="mt-6 rounded-lg border border-ivory-400 bg-white p-6">
            <p className="text-slate-500">
              No events recorded for today's date in our archive yet.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-navy">Our Mission</h2>
            <p className="mt-6 text-slate-600">
              Veeranjali is dedicated to preserving the memory of those who served the nation with courage and dedication. We aim to create a comprehensive, accessible, and respectful digital archive that honors their sacrifice and keeps their stories alive for future generations.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-bold text-saffron">100+</div>
                <div className="mt-1 text-sm text-slate-500">Stories Preserved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-saffron">Verified</div>
                <div className="mt-1 text-sm text-slate-500">Sourced Content</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-saffron">Open</div>
                <div className="mt-1 text-sm text-slate-500">Accessible Archive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ivory-400 py-16">
        <div className="container text-center">
          <h2 className="font-serif text-2xl font-bold text-navy">
            Know someone whose story should be remembered?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Help us expand the archive by contributing stories of courage and service.
          </p>
          <Link
            to="/contribute"
            className="mt-6 inline-block rounded-lg bg-saffron px-6 py-3 font-medium text-ivory transition-colors hover:bg-saffron-600"
          >
            Become a Contributor
          </Link>
        </div>
      </section>
    </div>
  );
}
