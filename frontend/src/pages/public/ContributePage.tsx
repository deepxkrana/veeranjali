import { Link } from 'react-router-dom';

export default function ContributePage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-navy">Share a Story</h1>
        <p className="mt-4 text-lg text-slate-600">
          Help us preserve the memory of those who served the nation with courage and dedication.
        </p>

        <div className="mt-12 space-y-8">
          <section className="rounded-xl border border-ivory-400 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-navy">Become a Contributor</h2>
            <p className="mt-4 text-slate-600">
              Contributors can submit stories for review by our editorial team. All submissions are verified before publication.
            </p>
            <Link
              to="/register"
              className="mt-6 inline-block rounded-lg bg-saffron px-6 py-3 font-medium text-ivory transition-colors hover:bg-saffron-600"
            >
              Apply to Contribute
            </Link>
          </section>

          <section className="rounded-xl border border-ivory-400 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-navy">Contributor Guidelines</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>All submissions must include verifiable sources</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>Respect privacy and dignity of individuals and families</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>Use respectful and appropriate language</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>Provide attribution for all images and documents</span>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-ivory-400 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-navy">Source Requirements</h2>
            <p className="mt-4 text-slate-600">
              Every story requires supporting sources. Accepted sources include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Official government or military records</li>
              <li>• Published news articles from reputable sources</li>
              <li>• Published books or academic publications</li>
              <li>• Family records (with appropriate verification)</li>
            </ul>
          </section>

          <section className="rounded-xl border border-ivory-400 bg-white p-8">
            <h2 className="font-serif text-2xl font-semibold text-navy">Privacy and Consent</h2>
            <p className="mt-4 text-slate-600">
              We take privacy seriously. We do not publish:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Private addresses or contact information</li>
              <li>• Sensitive personal data</li>
              <li>• Graphic photographs or descriptions</li>
              <li>• Information that could compromise security</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
