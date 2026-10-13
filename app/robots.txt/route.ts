import siteMetadata from 'data/siteMetadata'

export const runtime = 'edge'

const SITE = siteMetadata.siteUrl.replace(/\/$/, '')

// Served as a route (not app/robots.ts) so the file can carry comments.
const ROBOTS_TXT = `# Search engines and AI answer engines (keep these open to be cited)
User-agent: Googlebot
User-agent: Bingbot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /
Disallow: /api/
Disallow: /_next/

# AI training crawlers: allowed, so OpenLIT is included in future model knowledge.
# Opting out would not remove OpenLIT from AI answers.
User-agent: Google-Extended
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
Allow: /
Disallow: /api/
Disallow: /_next/

# Everyone else
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: ${SITE}/sitemap.xml
Sitemap: ${SITE}/sitemap-videos.xml
`

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
