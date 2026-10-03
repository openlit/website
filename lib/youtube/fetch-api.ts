import type { YoutubeVideo } from './types'
import {
  getYoutubeApiKey,
  getYoutubeChannelId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeWatchUrl,
  YOUTUBE_REVALIDATE_SECONDS,
} from './config'
import { looksLikeShort } from './parse-rss'
import { parseIsoDurationSeconds } from './duration'

export { parseIsoDurationSeconds } from './duration'

type ApiSnippet = {
  title?: string
  description?: string
  publishedAt?: string
  thumbnails?: {
    maxres?: { url?: string }
    standard?: { url?: string }
    high?: { url?: string }
    medium?: { url?: string }
    default?: { url?: string }
  }
  resourceId?: { videoId?: string }
}

type PlaylistItem = {
  snippet?: ApiSnippet
  contentDetails?: { videoId?: string }
}

type VideoResource = {
  id?: string
  snippet?: ApiSnippet
  contentDetails?: { duration?: string }
}

function pickThumbnail(snippet: ApiSnippet | undefined, id: string) {
  const thumbs = snippet?.thumbnails
  return (
    thumbs?.maxres?.url ||
    thumbs?.standard?.url ||
    thumbs?.high?.url ||
    thumbs?.medium?.url ||
    thumbs?.default?.url ||
    youtubeThumbnailUrl(id)
  )
}

function isShortFromApi(title: string, description: string, duration?: string) {
  if (looksLikeShort(title, description)) return true
  const seconds = parseIsoDurationSeconds(duration)
  // YouTube Shorts are typically ≤ 60s (prefer ≤ 60 without reliable vertical metadata)
  return typeof seconds === 'number' && seconds > 0 && seconds <= 60
}

async function youtubeApiGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const key = getYoutubeApiKey()
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  url.searchParams.set('key', key)

  const response = await fetch(url.toString(), {
    next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`YouTube API ${path} failed (${response.status}): ${text.slice(0, 200)}`)
  }

  return response.json() as Promise<T>
}

/**
 * Fetch channel uploads via YouTube Data API v3.
 * Requires YOUTUBE_API_KEY. Separates Shorts using duration + #shorts signals.
 */
export async function fetchYoutubeViaApi(): Promise<YoutubeVideo[]> {
  const apiKey = getYoutubeApiKey()
  if (!apiKey) return []

  const channelId = getYoutubeChannelId()
  const channel = await youtubeApiGet<{
    items?: { contentDetails?: { relatedPlaylists?: { uploads?: string } } }[]
  }>('channels', {
    part: 'contentDetails',
    id: channelId,
  })

  const uploadsPlaylistId = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsPlaylistId) {
    throw new Error('Could not resolve uploads playlist for channel')
  }

  const playlistItems: PlaylistItem[] = []
  let pageToken = ''

  do {
    const page = await youtubeApiGet<{
      items?: PlaylistItem[]
      nextPageToken?: string
    }>('playlistItems', {
      part: 'snippet,contentDetails',
      playlistId: uploadsPlaylistId,
      maxResults: '50',
      ...(pageToken ? { pageToken } : {}),
    })
    playlistItems.push(...(page.items || []))
    pageToken = page.nextPageToken || ''
  } while (pageToken && playlistItems.length < 100)

  const ids = playlistItems
    .map((item) => item.contentDetails?.videoId || item.snippet?.resourceId?.videoId || '')
    .filter(Boolean)

  const details = new Map<string, VideoResource>()
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50)
    const page = await youtubeApiGet<{ items?: VideoResource[] }>('videos', {
      part: 'snippet,contentDetails',
      id: chunk.join(','),
    })
    ;(page.items || []).forEach((item) => {
      if (item.id) details.set(item.id, item)
    })
  }

  return ids.map((id) => {
    const detail = details.get(id)
    const snippet =
      detail?.snippet ||
      playlistItems.find((p) => p.contentDetails?.videoId === id)?.snippet
    const title = snippet?.title || 'Untitled video'
    const description = snippet?.description || ''
    const duration = detail?.contentDetails?.duration

    return {
      id,
      title,
      description,
      publishedAt: snippet?.publishedAt || '',
      thumbnailUrl: pickThumbnail(snippet, id),
      url: youtubeWatchUrl(id),
      embedUrl: youtubeEmbedUrl(id),
      duration,
      isShort: isShortFromApi(title, description, duration),
    } satisfies YoutubeVideo
  })
}
