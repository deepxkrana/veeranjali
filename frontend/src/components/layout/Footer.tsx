import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-ivory-400 bg-ivory-200">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-navy">Veeranjali</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-600">
              Stories of courage. Lives of service. A nation remembers.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              A digital memorial archive dedicated to Indian armed forces personnel and public servants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-navy">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/search" className="text-sm text-slate-600 hover:text-saffron">
                  Search Archive
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-sm text-slate-600 hover:text-saffron">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/on-this-day" className="text-sm text-slate-600 hover:text-saffron">
                  On This Day
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slate-600 hover:text-saffron">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h3 className="font-semibold text-navy">Contribute</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/contribute" className="text-sm text-slate-600 hover:text-saffron">
                  Share a Story
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-slate-600 hover:text-saffron">
                  Become a Contributor
                </Link>
              </li>
              <li>
                <Link to="/about#editorial" className="text-sm text-slate-600 hover:text-saffron">
                  Editorial Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ivory-400 pt-8">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Veeranjali. All content is respectfully maintained for educational and memorial purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
