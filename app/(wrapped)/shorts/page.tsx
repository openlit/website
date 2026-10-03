import { redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import ShortsFeed from '@/components/shorts/shorts-feed'
import JsonLd from '@/components/json-ld'
import {
  createItemListSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import { getYoutubeCatalog, getYoutubeChannelUrl, YOUTUBE_REVALIDATE_SECONDS } from 'lib/youtube'
import siteMetadata from 'data/siteMetadata'

export const revalidate = YOUTUBE_REVALIDATE_SECONDS

const TITLE = 'OpenLIT Shorts: Quick Agent Observability Tips'
const DESCRIPTION =
  'Vertical Shorts from OpenLIT — quick tips on tracing AI agents, OpenTelemetry, evals, and prompt management. Swipe like YouTube Shorts; plays count on YouTube.'

export const metadata = genPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'OpenLIT Shorts',
    'YouTube Shorts',
    'agent observability shorts',
    'OpenTelemetry tips',
    'LLM monitoring short video',
  ],
  canonicalUrl: 'https://openlit.io/shorts',
  markdownUrl: 'https://openlit.io/shorts.md',
})

export default async function ShortsIndexPage() {
  const catalog = await getYoutubeCatalog()
  if (catalog.shorts[0]?.id) {
    redirect(`/shorts/${catalog.shorts[0].id}`)
  }

  const pageSchema = createWebPageSchema(TITLE, 'https://openlit.io/shorts', DESCRIPTION, [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Shorts', url: 'https://openlit.io/shorts' },
  ])

  const listSchema = createItemListSchema({
    name: 'OpenLIT YouTube Shorts',
    url: 'https://openlit.io/shorts',
    description: DESCRIPTION,
    items: catalog.shorts.slice(0, 30).map((video) => ({
      name: video.title,
      url: `${siteMetadata.siteUrl}/shorts/${video.id}`,
      description: video.description,
    })),
  })

  return (
    <div className="w-full">
      <JsonLd data={createJsonLdGraph([pageSchema, listSchema])} />
      <ShortsFeed shorts={catalog.shorts} channelUrl={getYoutubeChannelUrl()} />
    </div>
  )
}

export const runtime = 'edge'
