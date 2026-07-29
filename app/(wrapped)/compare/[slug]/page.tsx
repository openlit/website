import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import ComparisonPage from 'components/compare/comparison-page'
import competitors, { getCompetitor } from '@/data/comparisons'
import { createWebPageSchema } from '@/components/structuredData'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { GitCompare } from 'lucide-react'

export async function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) return {}

  return genPageMetadata({
    title: `${competitor.tagline} — LLM Observability Comparison`,
    description: competitor.description,
    canonicalUrl: `https://openlit.io/compare/${params.slug}`,
  })
}

export default function CompareSlugPage({ params }: { params: { slug: string } }) {
  const competitor = getCompetitor(params.slug)
  if (!competitor) notFound()

  const pageSchema = createWebPageSchema(
    `${competitor.tagline} — LLM Observability Comparison`,
    `https://openlit.io/compare/${params.slug}`,
    competitor.description,
    [
      { name: 'Home', url: 'https://openlit.io' },
      { name: 'Compare', url: 'https://openlit.io/compare' },
      { name: competitor.tagline, url: `https://openlit.io/compare/${params.slug}` },
    ]
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
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
