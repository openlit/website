import { genPageMetadata } from 'app/seo'
import PricingContent from 'components/pricing-content'
import { createPricingGraph, createWebPageSchema, SCHEMA_IDS } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { createFaqPageSchema } from 'constants/home-faq'
import { PRICING_FAQ_ITEMS, PRICING_SEO } from 'constants/pricing'
import { Tag } from 'lucide-react'

export const metadata = genPageMetadata({
  title: PRICING_SEO.title,
  description: PRICING_SEO.description,
  keywords: [...PRICING_SEO.keywords],
  canonicalUrl: 'https://openlit.io/pricing',
  markdownUrl: 'https://openlit.io/pricing.md',
})

const pageSchema = createWebPageSchema(
  PRICING_SEO.title,
  'https://openlit.io/pricing',
  PRICING_SEO.description,
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Pricing', url: 'https://openlit.io/pricing' },
  ],
  {
    fields: {
      mainEntity: { '@id': SCHEMA_IDS.product },
    },
  }
)

const faqSchema = createFaqPageSchema(PRICING_FAQ_ITEMS, 'https://openlit.io/pricing')

export default function PricingPage() {
  return (
    <>
      <JsonLd data={createPricingGraph({ webpage: pageSchema, faq: faqSchema })} />
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
