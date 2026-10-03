/** Parse ISO 8601 duration (e.g. PT1M5S) to seconds. */
export function parseIsoDurationSeconds(duration?: string) {
  if (!duration) return undefined
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i)
  if (!match) return undefined
  const hours = Number(match[1] || 0)
  const minutes = Number(match[2] || 0)
  const seconds = Number(match[3] || 0)
  return hours * 3600 + minutes * 60 + seconds
}
