export default function AuditLogsPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Audit Logs</h1>
      <p className="mt-2 text-slate-600">View platform activity and changes.</p>

      <div className="mt-8">
        <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">No audit logs to display.</p>
        </div>
      </div>
    </div>
  );
}
