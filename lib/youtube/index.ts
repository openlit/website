import type { YoutubeCatalog, YoutubeVideo } from './types'
import {
  getYoutubeApiKey,
  getYoutubeChannelId,
  YOUTUBE_REVALIDATE_SECONDS,
} from './config'
import { parseYoutubeAtomFeed } from './parse-rss'
import { enrichShortFlags } from './shorts-detect'
import { fetchYoutubeViaApi } from './fetch-api'
import { fetchYoutubeViaChannelPages } from './fetch-channel-page'

export type {
  YoutubeCatalog,
  YoutubeVideo,
} from './types'

export {
  DEFAULT_YOUTUBE_CHANNEL_ID,
  getYoutubeChannelId,
  getYoutubeChannelUrl,
  getYoutubeApiKey,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
  youtubeShortsUrl,
  YOUTUBE_REVALIDATE_SECONDS,
  YOUTUBE_CHANNEL_HANDLE,
} from './config'

export { parseIsoDurationSeconds } from './duration'

async function fetchViaRss(channelId: string): Promise<YoutubeVideo[]> {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`
  const response = await fetch(feedUrl, {
    next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    headers: {
      Accept: 'application/atom+xml, application/xml, text/xml, */*',
      'User-Agent': 'Mozilla/5.0 (compatible; OpenLITBot/1.0; +https://openlit.io)',
    },
  })

  if (!response.ok) {
    throw new Error(`YouTube RSS feed returned ${response.status}`)
  }

  const xml = await response.text()
  if (!xml.includes('<entry') && !xml.includes('<feed')) {
    throw new Error('YouTube RSS feed returned unexpected payload')
  }

  const items = parseYoutubeAtomFeed(xml)
  return enrichShortFlags(items)
}

function splitCatalog(items: YoutubeVideo[]): Pick<YoutubeCatalog, 'videos' | 'shorts'> {
  const shorts = items.filter((item) => item.isShort)
  const videos = items.filter((item) => !item.isShort)
  return { videos, shorts }
}

/**
 * Load OpenLIT YouTube videos.
 *
 * Data source priority:
 * 1. YouTube Data API v3 when `YOUTUBE_API_KEY` is set (best Shorts/duration split)
 * 2. Public channel Atom RSS (`feeds/videos.xml?channel_id=...`) — no key
 * 3. Public channel /videos + /shorts page parse — no-key fallback if RSS is blocked
 *
 * Shorts without an API key: `#shorts` in title/description, then `/shorts/{id}` URL check.
 * Fails soft: returns empty lists with an error message for the UI.
 */
export async function getYoutubeCatalog(): Promise<YoutubeCatalog> {
  const fetchedAt = new Date().toISOString()
  const channelId = getYoutubeChannelId()
  const errors: string[] = []

  if (getYoutubeApiKey()) {
    try {
      const items = await fetchYoutubeViaApi()
      return { ...splitCatalog(items), source: 'api', fetchedAt }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'YouTube API failed')
    }
  }

  try {
    const items = await fetchViaRss(channelId)
    return { ...splitCatalog(items), source: 'rss', fetchedAt }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'YouTube RSS failed')
  }

  try {
    const items = await fetchYoutubeViaChannelPages()
    return {
      ...splitCatalog(items),
      source: 'channel-page',
      fetchedAt,
      error: errors.length ? `RSS unavailable (${errors.join('; ')}); used channel page fallback` : undefined,
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Channel page fallback failed')
  }

  return {
    videos: [],
    shorts: [],
    source: 'none',
    fetchedAt,
    error: errors.join(' | ') || 'YouTube catalog unavailable',
  }
}

export async function getLongFormVideos() {
  const catalog = await getYoutubeCatalog()
  return { ...catalog, items: catalog.videos }
}

export async function getShortsVideos() {
  const catalog = await getYoutubeCatalog()
  return { ...catalog, items: catalog.shorts }
}

export async function getVideoById(id: string): Promise<{
  video: YoutubeVideo | null
  catalog: YoutubeCatalog
}> {
  const catalog = await getYoutubeCatalog()
  const video =
    catalog.videos.find((item) => item.id === id) ||
    catalog.shorts.find((item) => item.id === id) ||
    null
  return { video, catalog }
}

/** Format ISO duration or return undefined for schema.org. */
export function durationForSchema(duration?: string) {
  return duration && /^PT/i.test(duration) ? duration : undefined
}
