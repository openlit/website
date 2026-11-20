import { genPageMetadata } from 'app/seo'
import { GuidesIndexContent } from '@/components/guides/guide-content'
import {
  createItemListSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import BEST_GUIDES from 'data/best-guides'
import { ListOrdered } from 'lucide-react'

const TITLE = 'LLM & Agent Observability Buyer’s Guides (2026)'
const DESCRIPTION =
  'Roundups of the best LLM observability platforms, AI agent observability platforms, and open-source LLM observability tools, compared on license, OpenTelemetry, and evals.'
const URL = 'https://openlit.io/guides'

export const metadata = genPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'best LLM observability tools',
    'agent observability platforms',
    'LLM observability comparison',
    'open source LLM observability',
  ],
  canonicalUrl: URL,
  markdownUrl: `${URL}.md`,
})

const pageSchema = createWebPageSchema(TITLE, URL, DESCRIPTION, [
  { name: 'Home', url: 'https://openlit.io' },
  { name: 'Guides', url: URL },
])

const listSchema = createItemListSchema({
  name: TITLE,
  url: URL,
  description: DESCRIPTION,
  items: BEST_GUIDES.map((guide) => ({
    name: guide.title,
    url: `${URL}/${guide.slug}`,
    description: guide.description,
  })),
})

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, listSchema])} />
      <FeaturePageHeader
        eyebrow="Resources"
        title="Guides"
        icon={<ListOrdered className="h-4 w-4" />}
        tone="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300"
      />
      <GuidesIndexContent />
    </>
  )
}

export const runtime = 'edge'
