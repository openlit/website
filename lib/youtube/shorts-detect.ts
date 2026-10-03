import { youtubeShortsUrl, YOUTUBE_REVALIDATE_SECONDS } from './config'

/**
 * Confirm whether a video is served as a YouTube Short by checking that
 * /shorts/{id} stays on the shorts URL (long videos redirect to /watch).
 */
export async function isYoutubeShortByUrl(id: string): Promise<boolean | null> {
  try {
    const response = await fetch(youtubeShortsUrl(id), {
      method: 'HEAD',
      redirect: 'follow',
      next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; OpenLITBot/1.0; +https://openlit.io) AppleWebKit/537.36',
      },
    })
    const finalUrl = response.url || youtubeShortsUrl(id)
    if (!response.ok && response.status !== 405) return null
    return /\/shorts\//i.test(finalUrl)
  } catch {
    try {
      const response = await fetch(youtubeShortsUrl(id), {
        method: 'GET',
        redirect: 'follow',
        next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; OpenLITBot/1.0; +https://openlit.io) AppleWebKit/537.36',
        },
      })
      const finalUrl = response.url || youtubeShortsUrl(id)
      return /\/shorts\//i.test(finalUrl)
    } catch {
      return null
    }
  }
}

/**
 * Enrich RSS items that lack a clear #shorts signal by probing /shorts/{id}.
 * Caps concurrent checks to keep ISR fetches snappy.
 */
export async function enrichShortFlags<
  T extends { id: string; title: string; description: string; isShort: boolean },
>(items: T[], options?: { limit?: number }): Promise<T[]> {
  const limit = options?.limit ?? 24
  const ambiguous = items.filter((item) => !item.isShort).slice(0, limit)

  const results = await Promise.all(
    ambiguous.map(async (item) => {
      const isShort = await isYoutubeShortByUrl(item.id)
      return { id: item.id, isShort }
    })
  )

  const shortIds = new Set(
    results.filter((result) => result.isShort === true).map((result) => result.id)
  )

  return items.map((item) =>
    shortIds.has(item.id) || item.isShort ? { ...item, isShort: true } : item
  )
}
