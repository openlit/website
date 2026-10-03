export type YoutubeVideo = {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnailUrl: string
  url: string
  embedUrl: string
  /** ISO 8601 duration when known (API path only). */
  duration?: string
  isShort: boolean
}

export type YoutubeCatalog = {
  videos: YoutubeVideo[]
  shorts: YoutubeVideo[]
  source: 'rss' | 'api' | 'channel-page' | 'none'
  fetchedAt: string
  error?: string
}
