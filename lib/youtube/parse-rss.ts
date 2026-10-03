import type { YoutubeVideo } from './types'
import { youtubeEmbedUrl, youtubeThumbnailUrl, youtubeWatchUrl } from './config'

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function tagValue(block: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const match = block.match(re)
  return match ? decodeXml(match[1].trim()) : ''
}

function attrValue(block: string, tag: string, attr: string) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]+)"[^>]*>`, 'i')
  const match = block.match(re)
  return match ? decodeXml(match[1]) : ''
}

/** Heuristic for RSS path: #shorts tag, or media title/description cues. */
export function looksLikeShort(title: string, description: string) {
  const haystack = `${title}\n${description}`.toLowerCase()
  return (
    haystack.includes('#shorts') ||
    haystack.includes('#short') ||
    /\bshorts?\b/.test(title.toLowerCase())
  )
}

export function parseYoutubeAtomFeed(xml: string): YoutubeVideo[] {
  const entries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || []

  return entries
    .map((entry) => {
      const id =
        tagValue(entry, 'yt:videoId') ||
        tagValue(entry, 'videoId') ||
        (tagValue(entry, 'id').match(/yt:video:([A-Za-z0-9_-]{11})/) || [])[1] ||
        ''

      if (!id) return null

      const title = tagValue(entry, 'title') || 'Untitled video'
      const description =
        tagValue(entry, 'media:description') || tagValue(entry, 'summary') || ''
      const publishedAt = tagValue(entry, 'published') || tagValue(entry, 'updated') || ''
      const thumbnailUrl =
        attrValue(entry, 'media:thumbnail', 'url') || youtubeThumbnailUrl(id)

      const video: YoutubeVideo = {
        id,
        title,
        description,
        publishedAt,
        thumbnailUrl,
        url: youtubeWatchUrl(id),
        embedUrl: youtubeEmbedUrl(id),
        isShort: looksLikeShort(title, description),
      }
      return video
    })
    .filter((video): video is YoutubeVideo => Boolean(video))
}
