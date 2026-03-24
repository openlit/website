import { genPageMetadata } from 'app/seo'
import AboutUsContent from 'components/about-us-content'
import { createWebPageSchema } from '@/components/structuredData'

export const metadata = genPageMetadata({
  title: 'About Us',
  description:
    'Learn about OpenLIT — the open-source AI engineering platform built on OpenTelemetry. Meet the team behind the LLM observability and monitoring tools used by developers worldwide.',
  canonicalUrl: 'https://openlit.io/about-us',
})

const pageSchema = createWebPageSchema(
  'About Us — OpenLIT',
  'https://openlit.io/about-us',
  'Learn about OpenLIT — the open-source AI engineering platform built on OpenTelemetry.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'About Us', url: 'https://openlit.io/about-us' },
  ]
)

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <AboutUsContent />
    </>
  )
}

export const runtime = 'edge'
