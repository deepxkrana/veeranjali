import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
