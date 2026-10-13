import { genPageMetadata } from 'app/seo'
import { createJsonLdGraph, createWebPageSchema } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'

export const metadata = genPageMetadata({
  title: 'Contact OpenLIT',
  description:
    'Contact OpenLIT at contact@openlit.io. Headquarters in New Delhi, India. Security reports, product questions, and press. Self-host and create API keys without a sales call.',
  canonicalUrl: 'https://openlit.io/contact',
  markdownUrl: 'https://openlit.io/contact.md',
})

const pageSchema = createWebPageSchema(
  'Contact OpenLIT',
  'https://openlit.io/contact',
  'Email contact@openlit.io. OpenLIT is headquartered in New Delhi, India.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Contact', url: 'https://openlit.io/contact' },
  ],
  { pageType: 'ContactPage' }
)

export const runtime = 'edge'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <JsonLd data={createJsonLdGraph([pageSchema])} />
      <article className="max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">Contact</h1>
        <p className="mb-8 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
          Email{' '}
          <a href="mailto:contact@openlit.io" className="text-primary-500 underline">
            contact@openlit.io
          </a>
          . OpenLIT is headquartered in New Delhi, Delhi, India. No public phone number is listed.
          The same people who maintain the open-source project read this inbox.
        </p>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">What to include</h2>
          <p className="mb-4 leading-relaxed">
            Tell us what you are trying to do with agents, which SDK or coding agent you use, and
            whether you are self-hosting. If something is broken, include the OpenLIT version, the
            deployment method (Docker Compose or Helm), and a short trace or log excerpt with
            secrets removed.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Security</h2>
          <p className="mb-4 leading-relaxed">
            Report vulnerabilities through the{' '}
            <a
              href="https://github.com/openlit/openlit/blob/main/SECURITY.md"
              className="text-primary-500 underline"
            >
              GitHub security policy
            </a>{' '}
            rather than a public issue. Please avoid posting live API keys, Vault secrets, or
            customer prompts in email.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Self-serve instead of email</h2>
          <p className="mb-4 leading-relaxed">
            You can start without contacting us. The OSS edition is free under Apache 2.0. The local
            sandbox is documented at{' '}
            <a href="/sandbox" className="text-primary-500 underline">
              /sandbox
            </a>
            . API keys are created in your own OpenLIT UI under Settings → API Keys. Pricing is on
            the{' '}
            <a href="/pricing" className="text-primary-500 underline">
              pricing page
            </a>
            . CLI install notes are in the{' '}
            <a
              href="https://docs.openlit.io/latest/cli/installation"
              className="text-primary-500 underline"
            >
              CLI documentation
            </a>
            .
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Other channels</h2>
          <p className="leading-relaxed">
            The code is on{' '}
            <a href="https://github.com/openlit/openlit" className="text-primary-500 underline">
              GitHub
            </a>
            . Community chat is on{' '}
            <a href="https://discord.com/invite/RbNPvG54" className="text-primary-500 underline">
              Discord
            </a>
            . Company updates are on{' '}
            <a
              href="https://www.linkedin.com/company/openlit/"
              className="text-primary-500 underline"
            >
              LinkedIn
            </a>
            . Documentation starts at{' '}
            <a
              href="https://docs.openlit.io/latest/overview"
              className="text-primary-500 underline"
            >
              docs.openlit.io
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  )
}
