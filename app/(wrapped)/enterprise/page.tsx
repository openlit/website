import { genPageMetadata } from 'app/seo'
import EnterpriseContent from 'components/enterprise-content'
import { createJsonLdGraph, createWebPageSchema, SCHEMA_IDS } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { createFaqPageSchema } from 'constants/home-faq'
import { ENTERPRISE_FAQ_ITEMS, ENTERPRISE_SEO, ENTERPRISE_URL } from 'constants/enterprise'
import { Building2 } from 'lucide-react'

export const metadata = genPageMetadata({
  title: ENTERPRISE_SEO.title,
  description: ENTERPRISE_SEO.description,
  keywords: [...ENTERPRISE_SEO.keywords],
  canonicalUrl: ENTERPRISE_URL,
  markdownUrl: `${ENTERPRISE_URL}.md`,
})

const pageSchema = createWebPageSchema(
  ENTERPRISE_SEO.title,
  ENTERPRISE_URL,
  ENTERPRISE_SEO.description,
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Enterprise', url: ENTERPRISE_URL },
  ],
  {
    fields: {
      mainEntity: { '@id': SCHEMA_IDS.product },
    },
  }
)

const faqSchema = createFaqPageSchema(ENTERPRISE_FAQ_ITEMS, ENTERPRISE_URL)

export default function EnterprisePage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, faqSchema])} />
      <FeaturePageHeader
        eyebrow="Product"
        title="Enterprise Edition"
        icon={<Building2 className="h-4 w-4" />}
        tone="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/70 dark:bg-orange-950/40 dark:text-orange-300"
      />
      <EnterpriseContent />
    </>
  )
}

export const runtime = 'edge'
