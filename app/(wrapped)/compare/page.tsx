import { genPageMetadata } from 'app/seo'
import CompareIndex from 'components/compare/index'
import { createWebPageSchema } from '@/components/structuredData'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { GitCompare } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'OpenLIT vs Alternatives — LLM Observability Comparison',
  description:
    'Compare OpenLIT against Langfuse, Helicone, LangSmith, and Datadog. Honest, feature-by-feature comparison of LLM observability and monitoring tools.',
  canonicalUrl: 'https://openlit.io/compare',
})

const pageSchema = createWebPageSchema(
  'OpenLIT vs Alternatives — LLM Observability Comparison',
  'https://openlit.io/compare',
  'Compare OpenLIT against Langfuse, Helicone, LangSmith, and Datadog.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Compare', url: 'https://openlit.io/compare' },
  ]
)

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
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
