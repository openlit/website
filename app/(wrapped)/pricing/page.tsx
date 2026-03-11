import { genPageMetadata } from 'app/seo'
import PricingContent from 'components/pricing-content'

export const metadata = genPageMetadata({
  title: 'Pricing — Free & Open Source LLM Observability',
  description:
    'OpenLIT is 100% open source (Apache 2.0) and free to self-host. No license fees, no usage limits. Cloud managed option coming soon.',
  canonicalUrl: 'https://openlit.io/pricing',
})

export default function PricingPage() {
  return <PricingContent />
}

export const runtime = 'edge'
