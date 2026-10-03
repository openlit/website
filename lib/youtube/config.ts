import siteMetadata from 'data/siteMetadata'

/** OpenLIT YouTube channel (`@openlit`). */
export const DEFAULT_YOUTUBE_CHANNEL_ID = 'UCu2sVCs3BHaQiyWoWwlJ3rg'

export const YOUTUBE_CHANNEL_HANDLE = '@openlit'

export function getYoutubeChannelId() {
  return (
    process.env.YOUTUBE_CHANNEL_ID?.trim() ||
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID?.trim() ||
    (siteMetadata as { youtubeChannelId?: string }).youtubeChannelId ||
    DEFAULT_YOUTUBE_CHANNEL_ID
  )
}

export function getYoutubeApiKey() {
  return process.env.YOUTUBE_API_KEY?.trim() || ''
}

export function getYoutubeChannelUrl() {
  return siteMetadata.youtube || `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`
}

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`
}

export function youtubeShortsUrl(id: string) {
  return `https://www.youtube.com/shorts/${id}`
}

export function youtubeEmbedUrl(id: string, opts?: { autoplay?: boolean; mute?: boolean }) {
  const params = new URLSearchParams({
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    enablejsapi: '1',
  })
  if (opts?.autoplay) params.set('autoplay', '1')
  if (opts?.mute) params.set('mute', '1')
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

export function youtubeThumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

/** Hourly ISR / fetch revalidation. */
export const YOUTUBE_REVALIDATE_SECONDS = 3600
