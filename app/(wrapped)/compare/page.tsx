import { genPageMetadata } from 'app/seo'
import CompareIndex from 'components/compare/index'

export const metadata = genPageMetadata({
  title: 'OpenLIT vs Alternatives — LLM Observability Comparison',
  description:
    'Compare OpenLIT against Langfuse, Helicone, LangSmith, and Datadog. Honest, feature-by-feature comparison of LLM observability and monitoring tools.',
  canonicalUrl: 'https://openlit.io/compare',
})

export default function ComparePage() {
  return <CompareIndex />
}

export const runtime = 'edge'
