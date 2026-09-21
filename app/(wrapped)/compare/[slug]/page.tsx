import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import ComparisonPage from 'components/compare/comparison-page'
import competitors, { getCompetitor } from '@/data/comparisons'
import { createComparisonPageSchema, createJsonLdGraph } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { GitCompare } from 'lucide-react'

export async function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) return {}

  return genPageMetadata({
    title: `${competitor.tagline}: LLM Observability Comparison`,
    description: competitor.description,
    keywords: [
      competitor.tagline,
      `${competitor.name} alternative`,
      `OpenLIT vs ${competitor.name}`,
      'LLM observability comparison',
      'open source Agent Harness Engineering',
    ],
    canonicalUrl: `https://openlit.io/compare/${params.slug}`,
    markdownUrl: `https://openlit.io/compare/${params.slug}.md`,
  })
}

export default function CompareSlugPage({ params }: { params: { slug: string } }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) notFound()

  const pageSchema = createComparisonPageSchema({
    name: `${competitor.tagline}: LLM Observability Comparison`,
    url: `https://openlit.io/compare/${params.slug}`,
    description: competitor.description,
    competitorName: competitor.name,
    breadcrumbs: [
      { name: 'Home', url: 'https://openlit.io' },
      { name: 'Compare', url: 'https://openlit.io/compare' },
      { name: competitor.tagline, url: `https://openlit.io/compare/${params.slug}` },
    ],
  })

  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema])} />
      <FeaturePageHeader
        eyebrow="Compare"
        title={`OpenLIT vs ${competitor.name}`}
        icon={<GitCompare className="h-4 w-4" />}
        tone="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-300"
      />
      <ComparisonPage competitor={competitor} />
    </>
  )
}

export const runtime = 'edge'
