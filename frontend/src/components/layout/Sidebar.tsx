import { Link, useLocation } from 'react-router-dom';
import { Bookmark, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FileText },
  { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { href: '/dashboard/corrections', label: 'Corrections', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ivory-400 bg-white lg:block">
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-navy text-ivory'
                      : 'text-charcoal hover:bg-ivory-400 hover:text-navy'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
