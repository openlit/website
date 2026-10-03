import type { YoutubeVideo } from './types'
import {
  getYoutubeChannelId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
  YOUTUBE_CHANNEL_HANDLE,
  YOUTUBE_REVALIDATE_SECONDS,
} from './config'
import { looksLikeShort } from './parse-rss'

type WalkNode = Record<string, unknown> | unknown[] | string | number | boolean | null

function walk(node: WalkNode, visit: (obj: Record<string, unknown>) => void) {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    node.forEach((child) => walk(child as WalkNode, visit))
    return
  }
  visit(node as Record<string, unknown>)
  Object.values(node).forEach((child) => walk(child as WalkNode, visit))
}

function textFrom(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const obj = value as Record<string, unknown>
  if (typeof obj.simpleText === 'string') return obj.simpleText
  if (typeof obj.content === 'string') return obj.content
  if (Array.isArray(obj.runs)) {
    return obj.runs
      .map((run) => (run && typeof run === 'object' && 'text' in run ? String(run.text) : ''))
      .join('')
  }
  return ''
}

/**
 * Fallback when the Atom RSS feed is unreachable from the host.
 * Parses public channel /videos and /shorts pages (ytInitialData).
 * Prefer RSS or the Data API in production when available.
 */
export async function fetchYoutubeViaChannelPages(): Promise<YoutubeVideo[]> {
  const channelId = getYoutubeChannelId()
  const handle = YOUTUBE_CHANNEL_HANDLE
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (compatible; OpenLITBot/1.0; +https://openlit.io) AppleWebKit/537.36 (KHTML, like Gecko)',
    'Accept-Language': 'en-US,en;q=0.9',
  }

  const [videosHtml, shortsHtml] = await Promise.all([
    fetch(`https://www.youtube.com/${handle}/videos`, {
      headers,
      next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    }).then(async (res) => (res.ok ? res.text() : '')),
    fetch(`https://www.youtube.com/${handle}/shorts`, {
      headers,
      next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    }).then(async (res) => (res.ok ? res.text() : '')),
  ])

  if (!videosHtml && !shortsHtml) {
    throw new Error('Channel pages unavailable')
  }

  const byId = new Map<string, YoutubeVideo>()

  const ingest = (html: string, forceShort: boolean) => {
    const match = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)
    if (!match) return
    let data: WalkNode
    try {
      data = JSON.parse(match[1]) as WalkNode
    } catch {
      return
    }

    walk(data, (obj) => {
      // Long-form cards
      const videoRenderer = (obj.videoRenderer || obj.gridVideoRenderer) as
        | Record<string, unknown>
        | undefined
      if (videoRenderer && typeof videoRenderer.videoId === 'string') {
        const id = videoRenderer.videoId
        const title = textFrom(videoRenderer.title) || textFrom(videoRenderer.headline) || 'Untitled video'
        const description = textFrom(videoRenderer.descriptionSnippet)
        const publishedAt = textFrom(videoRenderer.publishedTimeText)
        const thumbs = (videoRenderer.thumbnail as { thumbnails?: { url?: string }[] } | undefined)
          ?.thumbnails
        const thumbnailUrl = thumbs?.[thumbs.length - 1]?.url || youtubeThumbnailUrl(id)
        const existing = byId.get(id)
        byId.set(id, {
          id,
          title: existing?.title || title,
          description: existing?.description || description,
          publishedAt: existing?.publishedAt || publishedAt,
          thumbnailUrl: existing?.thumbnailUrl || thumbnailUrl,
          url: youtubeWatchUrl(id),
          embedUrl: youtubeEmbedUrl(id),
          isShort: Boolean(existing?.isShort || forceShort || looksLikeShort(title, description)),
        })
      }

      // Shorts shelf / lockup
      const shortsLockup = obj.shortsLockupViewModel as Record<string, unknown> | undefined
      if (shortsLockup) {
        const onTap = shortsLockup.onTap as Record<string, unknown> | undefined
        const command = onTap?.innertubeCommand as Record<string, unknown> | undefined
        const reel = command?.reelWatchEndpoint as Record<string, unknown> | undefined
        const id = typeof reel?.videoId === 'string' ? reel.videoId : ''
        if (id) {
          const overlay = shortsLockup.overlayMetadata as Record<string, unknown> | undefined
          const title =
            textFrom(overlay?.primaryText) ||
            textFrom(shortsLockup.accessibilityText) ||
            'Untitled Short'
          const existing = byId.get(id)
          byId.set(id, {
            id,
            title: existing?.title || title,
            description: existing?.description || '',
            publishedAt: existing?.publishedAt || '',
            thumbnailUrl: existing?.thumbnailUrl || youtubeThumbnailUrl(id),
            url: youtubeWatchUrl(id),
            embedUrl: youtubeEmbedUrl(id),
            isShort: true,
          })
        }
      }

      const reelItem = obj.reelItemRenderer as Record<string, unknown> | undefined
      if (reelItem && typeof reelItem.videoId === 'string') {
        const id = reelItem.videoId
        const title = textFrom(reelItem.headline) || 'Untitled Short'
        const existing = byId.get(id)
        byId.set(id, {
          id,
          title: existing?.title || title,
          description: existing?.description || '',
          publishedAt: existing?.publishedAt || '',
          thumbnailUrl: existing?.thumbnailUrl || youtubeThumbnailUrl(id),
          url: youtubeWatchUrl(id),
          embedUrl: youtubeEmbedUrl(id),
          isShort: true,
        })
      }
    })
  }

  ingest(videosHtml, false)
  ingest(shortsHtml, true)

  // Prefer channel uploads order from videos page; shorts-only entries append
  const videos = Array.from(byId.values())
  if (!videos.length) {
    throw new Error(`No videos parsed for channel ${channelId}`)
  }
  return videos
}
