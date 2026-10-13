/** Paths that must stay on their own handlers (JSON, metadata, assets). */
const MACHINE_PREFIXES = ['/api', '/.well-known', '/oauth', '/markdown', '/_next']
const MACHINE_EXACT = new Set([
  '/openapi.json',
  '/llms.txt',
  '/llms-full.txt',
  '/sitemap.xml',
  '/sitemap-videos.xml',
  '/robots.txt',
  '/feed.xml',
])

/** HTML pages that do not have a Markdown twin. Unknown paths are Markdown 404s. */
const HTML_PREFIXES = ['/blogs', '/videos', '/shorts', '/static', '/tag']
const HTML_EXACT = new Set(['/terms', '/privacy-policy'])

export function normalizePathname(pathname: string) {
  const withoutQuery = pathname.split('?')[0] || '/'
  if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) return withoutQuery.slice(0, -1)
  return withoutQuery || '/'
}

export function isMachinePath(pathname: string) {
  const path = normalizePathname(pathname)
  if (MACHINE_EXACT.has(path)) return true
  return MACHINE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export function isHtmlOnlyPath(pathname: string) {
  const path = normalizePathname(pathname)
  if (HTML_EXACT.has(path)) return true
  if (HTML_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return true
  if (/\.[a-z0-9]+$/i.test(path) && !path.endsWith('.md')) return true
  return false
}

export type Negotiation = 'next' | 'markdown' | 'not-found'

export function decideNegotiation(input: {
  pathname: string
  wantsMarkdown: boolean
  hasMarkdown: boolean
}): Negotiation {
  const path = normalizePathname(input.pathname)
  if (isMachinePath(path)) return 'next'
  if (!input.wantsMarkdown) return 'next'
  if (input.hasMarkdown) return 'markdown'
  if (isHtmlOnlyPath(path)) return 'next'
  return 'not-found'
}
