import { genPageMetadata } from 'app/seo'
import PricingContent from 'components/pricing-content'
import { createWebPageSchema } from '@/components/structuredData'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { createFaqPageSchema } from 'constants/home-faq'
import { PRICING_FAQ_ITEMS, PRICING_SEO } from 'constants/pricing'
import { Tag } from 'lucide-react'

export const metadata = genPageMetadata({
  title: PRICING_SEO.title,
  description: PRICING_SEO.description,
  keywords: [...PRICING_SEO.keywords],
  canonicalUrl: 'https://openlit.io/pricing',
})

const pageSchema = createWebPageSchema(
  PRICING_SEO.title,
  'https://openlit.io/pricing',
  PRICING_SEO.description,
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Pricing', url: 'https://openlit.io/pricing' },
  ]
)

const faqSchema = createFaqPageSchema(PRICING_FAQ_ITEMS)

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OpenLIT',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Linux, Windows, macOS',
  url: 'https://openlit.io/pricing',
  description: PRICING_SEO.description,
  offers: [
    {
      '@type': 'Offer',
      name: 'OpenLIT OSS',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description:
        'Free open source Harness Engineering platform. Self-host under Apache 2.0 with unlimited usage.',
      url: 'https://github.com/openlit/openlit',
    },
    {
      '@type': 'Offer',
      name: 'OpenLIT Cloud',
      availability: 'https://schema.org/PreOrder',
      description:
        'Fully hosted OpenLIT coming soon. Feature set and pricing shared at launch.',
      url: 'https://openlit.io/pricing',
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <FeaturePageHeader
        eyebrow="Product"
        title="Pricing"
        icon={<Tag className="h-4 w-4" />}
        tone="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/70 dark:bg-orange-950/40 dark:text-orange-300"
      />
      <PricingContent />
    </>
  )
}

export const runtime = 'edge'
