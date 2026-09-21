import { MetadataRoute } from 'next'
import siteMetadata from 'data/siteMetadata'

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}

// Static at build time — no edge runtime needed (same as sitemap).
