export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl font-bold text-navy">About Veeranjali</h1>

        <div className="mt-8 space-y-8 text-slate-600">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-navy">Our Mission</h2>
            <p className="mt-4">
              Veeranjali is a digital memorial and knowledge archive dedicated to Indian Army soldiers, Indian Navy and Air Force personnel, CAPF members, police personnel, and other public servants who lost their lives while serving the nation.
            </p>
            <p className="mt-4">
              We aim to create a comprehensive, accessible, and respectful archive that honors their sacrifice and keeps their stories alive for future generations.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-navy">Editorial Principles</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>All content is verified through reliable sources</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>We maintain strict privacy standards for families</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>Information is presented with dignity and respect</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-saffron"></span>
                <span>Corrections and updates are welcomed</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-navy">Verification Policy</h2>
            <p className="mt-4">
              Every story in our archive undergoes verification. We label content based on the source and reliability:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><strong>Officially Documented:</strong> Verified through official government or military records</li>
              <li><strong>Multiple Sources:</strong> Confirmed by multiple reliable sources</li>
              <li><strong>Family Submitted:</strong> Information provided by family members</li>
              <li><strong>Under Review:</strong> Currently being verified</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-navy">Privacy Statement</h2>
            <p className="mt-4">
              We respect the privacy of families and individuals. We do not publish:
            </p>
            <ul className="mt-4 space-y-2">
              <li>Private addresses or contact information</li>
              <li>Graphic descriptions or photographs</li>
              <li>Sensitive personal data</li>
              <li>Information that could compromise operational security</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-navy">Independent Archive</h2>
            <p className="mt-4">
              Veeranjali is an independent project. It is not affiliated with any government agency, military organization, or political party. All content is maintained for educational and memorial purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-navy">Contact</h2>
            <p className="mt-4">
              For corrections, family inquiries, or other concerns, please use the correction report feature on any profile page or contact us through the contributor application process.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
