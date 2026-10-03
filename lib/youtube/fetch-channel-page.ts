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
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value !== 'object') return ''
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

function thumbnailFrom(value: unknown): string | undefined {
  if (!value || typeof value !== 'object') return undefined
  const json = JSON.stringify(value)
  const match = json.match(/https:\/\/i\.ytimg\.com\/vi\/[^"\\]+/)
  return match?.[0]?.replace(/\\u0026/g, '&')
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

  const upsert = (
    id: string,
    partial: Partial<YoutubeVideo> & { title: string },
    forceShort: boolean
  ) => {
    if (!id || id.length !== 11) return
    const existing = byId.get(id)
    const title = existing?.title || partial.title
    const description = existing?.description || partial.description || ''
    byId.set(id, {
      id,
      title,
      description,
      publishedAt: existing?.publishedAt || partial.publishedAt || '',
      thumbnailUrl: existing?.thumbnailUrl || partial.thumbnailUrl || youtubeThumbnailUrl(id),
      url: youtubeWatchUrl(id),
      embedUrl: youtubeEmbedUrl(id),
      isShort: Boolean(existing?.isShort || forceShort || looksLikeShort(title, description)),
    })
  }

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
      // Modern channel grid cards
      const lockup = obj.lockupViewModel as Record<string, unknown> | undefined
      if (lockup && typeof lockup.contentId === 'string') {
        const metaRoot = lockup.metadata as Record<string, unknown> | undefined
        const meta = metaRoot?.lockupMetadataViewModel as Record<string, unknown> | undefined
        const title = textFrom(meta?.title) || 'Untitled video'
        const rows =
          (
            (meta?.metadata as Record<string, unknown> | undefined)?.contentMetadataViewModel as
              | Record<string, unknown>
              | undefined
          )?.metadataRows || []
        let publishedAt = ''
        if (Array.isArray(rows)) {
          for (const row of rows) {
            const parts = (row as Record<string, unknown>)?.metadataParts
            if (!Array.isArray(parts)) continue
            for (const part of parts) {
              const label = textFrom((part as Record<string, unknown>)?.accessibilityLabel)
              if (/ago|Streamed|Premiered|\d{4}/i.test(label)) {
                publishedAt = label
              }
            }
          }
        }
        upsert(
          lockup.contentId,
          {
            title,
            publishedAt,
            thumbnailUrl:
              thumbnailFrom(lockup.contentImage) || youtubeThumbnailUrl(lockup.contentId),
          },
          forceShort
        )
      }

      // Legacy long-form cards
      const videoRenderer = (obj.videoRenderer || obj.gridVideoRenderer) as
        | Record<string, unknown>
        | undefined
      if (videoRenderer && typeof videoRenderer.videoId === 'string') {
        const id = videoRenderer.videoId
        const title =
          textFrom(videoRenderer.title) || textFrom(videoRenderer.headline) || 'Untitled video'
        const description = textFrom(videoRenderer.descriptionSnippet)
        const publishedAt = textFrom(videoRenderer.publishedTimeText)
        const thumbs = (videoRenderer.thumbnail as { thumbnails?: { url?: string }[] } | undefined)
          ?.thumbnails
        upsert(
          id,
          {
            title,
            description,
            publishedAt,
            thumbnailUrl: thumbs?.[thumbs.length - 1]?.url || youtubeThumbnailUrl(id),
          },
          forceShort
        )
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
          upsert(id, { title }, true)
        }
      }

      const reelItem = obj.reelItemRenderer as Record<string, unknown> | undefined
      if (reelItem && typeof reelItem.videoId === 'string') {
        upsert(reelItem.videoId, { title: textFrom(reelItem.headline) || 'Untitled Short' }, true)
      }
    })
  }

  ingest(videosHtml, false)
  ingest(shortsHtml, true)

  const videos = Array.from(byId.values())
  if (!videos.length) {
    throw new Error(`No videos parsed for channel ${channelId}`)
  }
  return videos
}
