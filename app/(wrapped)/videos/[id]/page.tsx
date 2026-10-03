import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import VideoWatch from '@/components/videos/video-watch'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import JsonLd from '@/components/json-ld'
import {
  createJsonLdGraph,
  createVideoObjectSchema,
  createWebPageSchema,
} from '@/components/structuredData'
import {
  durationForSchema,
  getVideoById,
  getYoutubeCatalog,
  youtubeEmbedUrl,
  youtubeWatchUrl,
  YOUTUBE_REVALIDATE_SECONDS,
} from 'lib/youtube'
import { Clapperboard } from 'lucide-react'

export const revalidate = YOUTUBE_REVALIDATE_SECONDS

type PageProps = {
  params: { id: string }
}

export async function generateStaticParams() {
  const catalog = await getYoutubeCatalog()
  return catalog.videos.map((video) => ({ id: video.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { video } = await getVideoById(params.id)
  if (!video) {
    return genPageMetadata({
      title: 'Video not found',
      description: 'This OpenLIT video could not be found.',
      canonicalUrl: `https://openlit.io/videos/${params.id}`,
    })
  }

  if (video.isShort) {
    return genPageMetadata({
      title: video.title,
      description: video.description || video.title,
      canonicalUrl: `https://openlit.io/shorts/${video.id}`,
    })
  }

  const description = video.description || video.title
  const watchUrl = `https://openlit.io/videos/${video.id}`
  const embed = youtubeEmbedUrl(video.id)

  return {
    ...genPageMetadata({
      title: video.title,
      description,
      image: video.thumbnailUrl,
      canonicalUrl: watchUrl,
    }),
    openGraph: {
      title: `${video.title} | OpenLIT`,
      description,
      url: watchUrl,
      type: 'video.other',
      images: [video.thumbnailUrl],
      videos: [
        {
          url: embed,
          secureUrl: embed,
          type: 'text/html',
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: 'player',
      title: `${video.title} | OpenLIT`,
      description,
      images: [video.thumbnailUrl],
      players: {
        playerUrl: embed,
        streamUrl: youtubeWatchUrl(video.id),
        width: 1280,
        height: 720,
      },
    },
  }
}

export default async function VideoWatchPage({ params }: PageProps) {
  const { video, catalog } = await getVideoById(params.id)
  if (!video) notFound()
  if (video.isShort) redirect(`/shorts/${video.id}`)

  const watchUrl = `https://openlit.io/videos/${video.id}`
  const description = video.description || video.title
  const embed = youtubeEmbedUrl(video.id)

  const pageSchema = createWebPageSchema(video.title, watchUrl, description, [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Videos', url: 'https://openlit.io/videos' },
    { name: video.title, url: watchUrl },
  ])

  const videoSchema = createVideoObjectSchema({
    name: video.title,
    description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.publishedAt || undefined,
    duration: durationForSchema(video.duration),
    embedUrl: embed,
    contentUrl: youtubeWatchUrl(video.id),
    watchPageUrl: watchUrl,
  })

  const related = catalog.videos.filter((item) => item.id !== video.id).slice(0, 4)

  return (
    <div className="w-full">
      <JsonLd data={createJsonLdGraph([pageSchema, videoSchema])} />
      <FeaturePageHeader
        eyebrow="Videos"
        title={video.title}
        icon={<Clapperboard className="h-4 w-4" />}
        tone="border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-300"
      />
      <VideoWatch video={video} related={related} />
    </div>
  )
}

export const runtime = 'edge'
