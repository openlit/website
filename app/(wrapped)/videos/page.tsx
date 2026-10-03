import { genPageMetadata } from 'app/seo'
import VideosList from '@/components/videos/videos-list'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import JsonLd from '@/components/json-ld'
import {
  createItemListSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import { getYoutubeCatalog, YOUTUBE_REVALIDATE_SECONDS } from 'lib/youtube'
import { Clapperboard } from 'lucide-react'
import siteMetadata from 'data/siteMetadata'

export const revalidate = YOUTUBE_REVALIDATE_SECONDS

const TITLE = 'OpenLIT Videos: Agent Observability Demos & Talks'
const DESCRIPTION =
  'Watch OpenLIT demos, talks, and deep dives on agent observability, OpenTelemetry tracing, evals, and prompt management. Updated automatically from the OpenLIT YouTube channel.'

export const metadata = genPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'OpenLIT videos',
    'OpenLIT YouTube',
    'agent observability demo',
    'OpenTelemetry LLM tracing video',
    'AI agent monitoring tutorial',
  ],
  canonicalUrl: 'https://openlit.io/videos',
  markdownUrl: 'https://openlit.io/videos.md',
})

export default async function VideosPage() {
  const catalog = await getYoutubeCatalog()

  const pageSchema = createWebPageSchema(TITLE, 'https://openlit.io/videos', DESCRIPTION, [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Videos', url: 'https://openlit.io/videos' },
  ])

  const listSchema = createItemListSchema({
    name: 'OpenLIT YouTube videos',
    url: 'https://openlit.io/videos',
    description: DESCRIPTION,
    items: catalog.videos.slice(0, 30).map((video) => ({
      name: video.title,
      url: `${siteMetadata.siteUrl}/videos/${video.id}`,
      description: video.description,
    })),
  })

  return (
    <div className="w-full">
      <JsonLd data={createJsonLdGraph([pageSchema, listSchema])} />
      <FeaturePageHeader
        eyebrow="Resources"
        title="Videos"
        icon={<Clapperboard className="h-4 w-4" />}
        tone="border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-300"
      />
      <VideosList videos={catalog.videos} error={catalog.error} source={catalog.source} />
    </div>
  )
}

export const runtime = 'edge'
