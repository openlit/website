import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { GuideContent } from '@/components/guides/guide-content'
import { createJsonLdGraph, createWebPageSchema, SCHEMA_IDS } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import BEST_GUIDES, { getBestGuide } from 'data/best-guides'
import { createFaqPageSchema } from 'constants/home-faq'
import { ListOrdered } from 'lucide-react'

const SITE = 'https://openlit.io'

export async function generateStaticParams() {
  return BEST_GUIDES.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = getBestGuide(params.slug)
  if (!guide) return {}

  return genPageMetadata({
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    canonicalUrl: `${SITE}/guides/${guide.slug}`,
    markdownUrl: `${SITE}/guides/${guide.slug}.md`,
  })
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getBestGuide(params.slug)
  if (!guide) notFound()

  const url = `${SITE}/guides/${guide.slug}`
  const pageSchema = createWebPageSchema(
    guide.title,
    url,
    guide.description,
    [
      { name: 'Home', url: SITE },
      { name: 'Guides', url: `${SITE}/guides` },
      { name: guide.name, url },
    ],
    {
      pageType: 'Article',
      about: { '@type': 'Thing', name: guide.name },
      fields: {
        headline: guide.title,
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { '@id': SCHEMA_IDS.org },
        keywords: guide.keywords.join(', '),
        mainEntity: { '@id': `${url}#itemlist` },
      },
    }
  )
  const listSchema = {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name: guide.title,
    numberOfItems: guide.tools.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: guide.tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item:
        tool.name === 'OpenLIT'
          ? { '@id': SCHEMA_IDS.software }
          : {
              '@type': 'SoftwareApplication',
              name: tool.name,
              url: tool.url,
              applicationCategory: 'DeveloperApplication',
              description: tool.summary,
            },
    })),
  }
  const faqSchema = createFaqPageSchema(guide.faq, url)

  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, listSchema, faqSchema])} />
      <FeaturePageHeader
        eyebrow="Guides"
        title={guide.name}
        icon={<ListOrdered className="h-4 w-4" />}
        tone="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300"
      />
      <GuideContent guide={guide} />
    </>
  )
}

export const runtime = 'edge'
