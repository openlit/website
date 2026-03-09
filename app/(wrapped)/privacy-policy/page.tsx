import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Privacy Policy',
  description: 'OpenLIT Privacy Policy — how we collect, use, and protect your information.',
  canonicalUrl: 'https://openlit.io/privacy-policy',
})

export const runtime = 'edge'

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-stone-500 dark:text-stone-400">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Overview</h2>
        <p className="mb-4">
          OpenLIT (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{' '}
          <a href="https://openlit.io" className="text-primary-500 underline">
            https://openlit.io
          </a>
          . This Privacy Policy explains how we handle information when you visit our website or use
          our open-source software.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Information We Collect</h2>
        <p className="mb-4">
          <strong>Website analytics:</strong> We use Google Analytics (GA4) to collect anonymous
          usage data such as pages visited, time on site, and geographic region. This data is
          aggregated and does not identify individual users.
        </p>
        <p className="mb-4">
          <strong>Contact information:</strong> If you contact us via email at{' '}
          <a href="mailto:contact@openlit.io" className="text-primary-500 underline">
            contact@openlit.io
          </a>
          , we receive and store your email address and message content in order to respond to your
          inquiry.
        </p>
        <p className="mb-4">
          <strong>Self-hosted software:</strong> OpenLIT is an open-source platform you deploy on
          your own infrastructure. We do not collect, access, or store any telemetry data processed
          by your OpenLIT installation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. How We Use Information</h2>
        <p className="mb-4">We use collected information to:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Understand how visitors use our website and improve content</li>
          <li>Respond to inquiries and support requests</li>
          <li>Monitor website performance and security</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Third-Party Services</h2>
        <p className="mb-4">
          Our website uses the following third-party services that may collect data according to
          their own privacy policies:
        </p>
        <ul className="mb-4 list-disc pl-6">
          <li>
            <strong>Google Analytics (GA4)</strong> — anonymous usage analytics
          </li>
          <li>
            <strong>GitHub</strong> — we display public repository statistics via the GitHub API
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Cookies</h2>
        <p className="mb-4">
          Our website uses a single functional cookie (<code>theme</code>) to remember your
          light/dark mode preference. Google Analytics may set additional cookies for analytics
          purposes. You can disable cookies in your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Data Retention</h2>
        <p className="mb-4">
          Analytics data is retained according to Google Analytics default retention settings (26
          months). Email correspondence is retained for as long as needed to address your inquiry.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have the right to access, correct, or delete personal
          data we hold about you. To exercise these rights, contact us at{' '}
          <a href="mailto:contact@openlit.io" className="text-primary-500 underline">
            contact@openlit.io
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">8. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be reflected by the
          updated date at the top of this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Contact</h2>
        <p className="mb-4">
          Questions about this Privacy Policy? Contact us at{' '}
          <a href="mailto:contact@openlit.io" className="text-primary-500 underline">
            contact@openlit.io
          </a>
          .
        </p>
      </section>
    </div>
  )
}
