import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/search', label: 'Search' },
    { href: '/browse', label: 'Browse' },
    { href: '/on-this-day', label: 'On This Day' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-ivory-400 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/80">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-navy">Veeranjali</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-saffron',
                isActive(link.href) ? 'text-saffron' : 'text-charcoal'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/search"
            className="rounded-lg p-2 text-charcoal transition-colors hover:bg-ivory-400 hover:text-navy"
          >
            <Search className="h-5 w-5" />
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg p-2 text-charcoal transition-colors hover:bg-ivory-400 hover:text-navy"
          >
            <User className="h-5 w-5" />
          </Link>

          <Link
            to="/contribute"
            className="hidden rounded-lg bg-saffron px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-saffron-600 sm:block"
          >
            Share a Story
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-charcoal transition-colors hover:bg-ivory-400 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-ivory-400 bg-ivory md:hidden">
          <div className="container py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors hover:text-saffron',
                  isActive(link.href) ? 'text-saffron' : 'text-charcoal'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contribute"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 block rounded-lg bg-saffron px-4 py-2 text-center text-sm font-medium text-ivory"
            >
              Share a Story
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
