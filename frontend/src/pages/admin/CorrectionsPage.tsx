export default function CorrectionsPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Correction Reports</h1>
      <p className="mt-2 text-slate-600">Review and resolve reported errors.</p>

      <div className="mt-8">
        <div className="rounded-lg border border-ivory-400 bg-white p-8 text-center">
          <p className="text-slate-500">No correction reports to review.</p>
        </div>
      </div>
    </div>
  );
}
