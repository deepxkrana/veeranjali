export default function SettingsPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-navy">Account Settings</h1>
      <p className="mt-2 text-slate-600">Manage your account preferences.</p>

      <div className="mt-8 space-y-6">
        <section className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Profile Information</h2>
          <p className="mt-1 text-sm text-slate-500">
            Update your name and bio.
          </p>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal">Name</label>
              <input
                type="text"
                className="mt-1 w-full max-w-md rounded-lg border border-ivory-400 bg-white px-4 py-2 text-charcoal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal">Bio</label>
              <textarea
                rows={3}
                className="mt-1 w-full max-w-md rounded-lg border border-ivory-400 bg-white px-4 py-2 text-charcoal"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-ivory"
            >
              Save Changes
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-ivory-400 bg-white p-6">
          <h2 className="font-semibold text-navy">Contributor Application</h2>
          <p className="mt-1 text-sm text-slate-500">
            Apply to become a contributor and submit stories.
          </p>
          <button
            type="button"
            className="mt-4 rounded-lg bg-saffron px-4 py-2 text-sm font-medium text-ivory"
          >
            Apply to Contribute
          </button>
        </section>
      </div>
    </div>
  );
}
