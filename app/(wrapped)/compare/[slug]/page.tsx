import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import ComparisonPage from 'components/compare/comparison-page'
import competitors, { getCompetitor } from '@/data/comparisons'

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

  return <ComparisonPage competitor={competitor} />
}

export const runtime = 'edge'
