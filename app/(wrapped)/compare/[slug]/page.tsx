import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import ComparisonPage from 'components/compare/comparison-page'
import competitors, { getCompetitor } from '@/data/comparisons'
import { createWebPageSchema } from '@/components/structuredData'

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
      <ComparisonPage competitor={competitor} />
    </>
  )
}

export const runtime = 'edge'
