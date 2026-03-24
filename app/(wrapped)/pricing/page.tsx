import { genPageMetadata } from 'app/seo'
import PricingContent from 'components/pricing-content'
import { createWebPageSchema } from '@/components/structuredData'

export const metadata = genPageMetadata({
  title: 'Pricing — Free & Open Source LLM Observability',
  description:
    'OpenLIT is 100% open source (Apache 2.0) and free to self-host. No license fees, no usage limits. Cloud managed option coming soon.',
  canonicalUrl: 'https://openlit.io/pricing',
})

const pageSchema = createWebPageSchema(
  'Pricing — Free & Open Source LLM Observability',
  'https://openlit.io/pricing',
  'OpenLIT is 100% open source (Apache 2.0) and free to self-host.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Pricing', url: 'https://openlit.io/pricing' },
  ]
)

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <PricingContent />
    </>
  )
}

export const runtime = 'edge'
