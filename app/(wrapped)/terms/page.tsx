import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Terms of Service',
  description:
    'OpenLIT Terms of Service — the terms governing your use of the OpenLIT website and open-source software.',
  canonicalUrl: 'https://openlit.io/terms',
})

export const runtime = 'edge'

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      <p className="mb-4 text-stone-500 dark:text-stone-400">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using the OpenLIT website at{' '}
          <a href="https://openlit.io" className="text-primary-500 underline">
            https://openlit.io
          </a>{' '}
          (&quot;Site&quot;), you agree to be bound by these Terms of Service. If you do not agree,
          please do not use the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">2. Open-Source Software</h2>
        <p className="mb-4">
          The OpenLIT software is open-source and licensed under the Apache 2.0 License. Use of the
          software is governed by that license, available at{' '}
          <a
            href="https://github.com/openlit/openlit/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 underline"
          >
            github.com/openlit/openlit/blob/main/LICENSE
          </a>
          . These Terms of Service apply to your use of this website only, not to your use of the
          software itself.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">3. Website Use</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="mb-4 list-disc pl-6">
          <li>Use the Site for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>
            Scrape, crawl, or index the Site in a manner that places excessive load on our servers
          </li>
          <li>Impersonate OpenLIT or misrepresent your affiliation with OpenLIT</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">4. Intellectual Property</h2>
        <p className="mb-4">
          All content on this Site — including text, graphics, logos, and documentation — is owned
          by or licensed to OpenLIT. The OpenLIT name and logo are trademarks of OpenLIT. Nothing on
          this Site grants you a license to use our trademarks.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">5. Disclaimer of Warranties</h2>
        <p className="mb-4">
          The Site is provided &quot;as is&quot; without warranties of any kind, express or implied.
          We do not warrant that the Site will be uninterrupted, error-free, or free of harmful
          components.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">6. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, OpenLIT shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">7. Third-Party Links</h2>
        <p className="mb-4">
          The Site may contain links to third-party websites. We are not responsible for the content
          or privacy practices of those sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">8. Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the Site after changes
          constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">9. Contact</h2>
        <p className="mb-4">
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:contact@openlit.io" className="text-primary-500 underline">
            contact@openlit.io
          </a>
          .
        </p>
      </section>
    </div>
  )
}
