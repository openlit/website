export type AcceptRange = {
  type: string
  q: number
}

/** Parse an Accept header into media ranges with quality values (RFC 9110). */
export function parseAccept(header: string | null | undefined): AcceptRange[] {
  if (!header) return []
  return header
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [typePart, ...params] = part.split(';').map((piece) => piece.trim())
      let q = 1
      for (const param of params) {
        const [key, value] = param.split('=').map((piece) => piece.trim())
        if (key?.toLowerCase() === 'q') {
          const parsed = Number(value)
          q = Number.isFinite(parsed) ? parsed : 0
        }
      }
      return { type: (typePart || '').toLowerCase(), q }
    })
    .filter((range) => range.type.length > 0)
}

/**
 * True when the client explicitly prefers Markdown over HTML.
 * `Accept: text/markdown` matches. Browser Accept lists and `* / *` do not.
 */
export function prefersMarkdown(header: string | null | undefined): boolean {
  const ranges = parseAccept(header)
  const markdown = ranges.find((range) => range.type === 'text/markdown')
  if (!markdown || markdown.q <= 0) return false

  const html = ranges.find(
    (range) => range.type === 'text/html' || range.type === 'application/xhtml+xml'
  )
  if (html && html.q > markdown.q) return false
  return true
}
