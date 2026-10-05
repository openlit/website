import { getYoutubeCatalog, YOUTUBE_REVALIDATE_SECONDS } from 'lib/youtube'
import siteMetadata from 'data/siteMetadata'

export const revalidate = YOUTUBE_REVALIDATE_SECONDS
export const runtime = 'edge'

const SITE = siteMetadata.siteUrl.replace(/\/$/, '')

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function videoEntry({
  loc,
  title,
  description,
  thumbnailUrl,
  playerUrl,
  publicationDate,
  durationSeconds,
}: {
  loc: string
  title: string
  description: string
  thumbnailUrl: string
  playerUrl: string
  publicationDate?: string
  durationSeconds?: number
}) {
  const desc = escapeXml((description || title).slice(0, 2048))
  const pub =
    publicationDate && !Number.isNaN(new Date(publicationDate).getTime())
      ? `<video:publication_date>${new Date(publicationDate).toISOString()}</video:publication_date>`
      : ''
  const duration =
    typeof durationSeconds === 'number' && durationSeconds > 0
      ? `<video:duration>${Math.round(durationSeconds)}</video:duration>`
      : ''

  // For YouTube embeds, advertise player_loc only. content_loc must point at the
  // actual media file bytes — not a youtube.com/watch page URL.
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(title.slice(0, 100))}</video:title>
      <video:description>${desc}</video:description>
      <video:player_loc>${escapeXml(playerUrl)}</video:player_loc>
      ${pub}
      ${duration}
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>
  </url>`
}

/**
 * Google Video Sitemap extension:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps
 */
export async function GET() {
  const catalog = await getYoutubeCatalog()
  const { parseIsoDurationSeconds } = await import('lib/youtube/duration')

  const longForm = catalog.videos.map((video) =>
    videoEntry({
      loc: `${SITE}/videos/${video.id}`,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      playerUrl: video.embedUrl,
      publicationDate: video.publishedAt,
      durationSeconds: parseIsoDurationSeconds(video.duration),
    })
  )

  const shorts = catalog.shorts.map((video) =>
    videoEntry({
      loc: `${SITE}/shorts/${video.id}`,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      playerUrl: video.embedUrl,
      publicationDate: video.publishedAt,
      durationSeconds: parseIsoDurationSeconds(video.duration),
    })
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${[...longForm, ...shorts].join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, s-maxage=${YOUTUBE_REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  })
}
