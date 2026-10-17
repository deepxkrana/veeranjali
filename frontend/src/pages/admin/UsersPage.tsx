export default function UsersPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">User Management</h1>
      <p className="mt-2 text-slate-600">Manage user accounts and roles.</p>

      <div className="mt-8">
        <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">No users found.</p>
        </div>
      </div>
    </div>
  );
}
