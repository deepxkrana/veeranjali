import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  History,
  UserCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/applications', label: 'Applications', icon: UserCheck },
  { href: '/admin/submissions', label: 'Submissions', icon: FileText },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/corrections', label: 'Corrections', icon: AlertTriangle },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: History },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ivory-400 bg-white lg:block">
      <nav className="p-4">
        <div className="mb-4 px-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Admin Panel
          </span>
        </div>
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
