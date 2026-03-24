import { genPageMetadata } from 'app/seo'
import CompareIndex from 'components/compare/index'
import { createWebPageSchema } from '@/components/structuredData'

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
      <CompareIndex />
    </>
  )
}

export const runtime = 'edge'
