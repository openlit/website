import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import ShortsFeed from '@/components/shorts/shorts-feed'
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
  getYoutubeChannelUrl,
  youtubeEmbedUrl,
  youtubeShortsUrl,
  YOUTUBE_REVALIDATE_SECONDS,
} from 'lib/youtube'

export const revalidate = YOUTUBE_REVALIDATE_SECONDS

type PageProps = {
  params: { id: string }
}

export async function generateStaticParams() {
  const catalog = await getYoutubeCatalog()
  return catalog.shorts.map((video) => ({ id: video.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { video } = await getVideoById(params.id)
  if (!video) {
    return genPageMetadata({
      title: 'Short not found',
      description: 'This OpenLIT Short could not be found.',
      canonicalUrl: `https://openlit.io/shorts/${params.id}`,
    })
  }

  if (!video.isShort) {
    return genPageMetadata({
      title: video.title,
      description: video.description || video.title,
      canonicalUrl: `https://openlit.io/videos/${video.id}`,
    })
  }

  const description = video.description || video.title
  const watchUrl = `https://openlit.io/shorts/${video.id}`
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
          width: 720,
          height: 1280,
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
        streamUrl: youtubeShortsUrl(video.id),
        width: 720,
        height: 1280,
      },
    },
  }
}

export default async function ShortWatchPage({ params }: PageProps) {
  const { video, catalog } = await getVideoById(params.id)
  if (!video) notFound()
  if (!video.isShort) redirect(`/videos/${video.id}`)

  const watchUrl = `https://openlit.io/shorts/${video.id}`
  const description = video.description || video.title
  const embed = youtubeEmbedUrl(video.id)

  const pageSchema = createWebPageSchema(video.title, watchUrl, description, [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Shorts', url: 'https://openlit.io/shorts' },
    { name: video.title, url: watchUrl },
  ])

  const videoSchema = createVideoObjectSchema({
    name: video.title,
    description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.publishedAt || undefined,
    duration: durationForSchema(video.duration),
    embedUrl: embed,
    watchPageUrl: watchUrl,
  })

  return (
    <div className="w-full">
      <JsonLd data={createJsonLdGraph([pageSchema, videoSchema])} />
      <ShortsFeed
        shorts={catalog.shorts}
        initialId={video.id}
        channelUrl={getYoutubeChannelUrl()}
      />
    </div>
  )
}

export const runtime = 'edge'
