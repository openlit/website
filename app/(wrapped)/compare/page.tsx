import { genPageMetadata } from 'app/seo'
import CompareIndex from 'components/compare/index'
import {
  createItemListSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { GitCompare } from 'lucide-react'
import competitors from '@/data/comparisons'

const COMPARE_DESCRIPTION =
  'Compare OpenLIT against Langfuse, Helicone, LangSmith, Datadog, Arize Phoenix, Comet Opik, Braintrust, and OpenLLMetry. Honest, feature-by-feature comparison of LLM observability and monitoring tools.'

export const metadata = genPageMetadata({
  title: 'OpenLIT vs Alternatives: LLM Observability Comparison',
  description: COMPARE_DESCRIPTION,
  keywords: [
    'OpenLIT vs Langfuse',
    'Langfuse alternatives',
    'open source LLM observability',
    'OpenLIT vs Phoenix',
    'OpenLIT vs Opik',
    'OpenLIT vs Braintrust',
    'OpenLIT vs OpenLLMetry',
    'Apache 2.0 LLM observability',
  ],
  canonicalUrl: 'https://openlit.io/compare',
  markdownUrl: 'https://openlit.io/compare.md',
})

const pageSchema = createWebPageSchema(
  'OpenLIT vs Alternatives: LLM Observability Comparison',
  'https://openlit.io/compare',
  COMPARE_DESCRIPTION,
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Compare', url: 'https://openlit.io/compare' },
  ]
)

const listSchema = createItemListSchema({
  name: 'OpenLIT vs LLM observability alternatives',
  url: 'https://openlit.io/compare',
  description: COMPARE_DESCRIPTION,
  items: competitors.map((c) => ({
    name: c.tagline,
    url: `https://openlit.io/compare/${c.slug}`,
    description: c.description,
  })),
})

export default function ComparePage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, listSchema])} />
      <FeaturePageHeader
        eyebrow="Product"
        title="Compare"
        icon={<GitCompare className="h-4 w-4" />}
        tone="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300"
      />
      <CompareIndex />
    </>
  )
}

export const runtime = 'edge'
