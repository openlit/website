import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'
import competitors from 'data/comparisons'
import GLOSSARY_TERMS from 'data/glossary'

const SITE = siteMetadata.siteUrl.replace(/\/$/, '')
/** Stable content date for evergreen marketing pages (avoid build-time "today"). */
const CONTENT_UPDATED = '2026-10-01'

function toDate(value: string | Date | undefined) {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString().slice(0, 10)
}

function entry({
  path,
  lastModified,
  changeFrequency,
  priority,
}: {
  path: string
  lastModified?: string | Date
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
  priority?: number
}): MetadataRoute.Sitemap[number] {
  return {
    url: path ? `${SITE}/${path.replace(/^\//, '')}` : SITE,
    lastModified: toDate(lastModified) || CONTENT_UPDATED,
    changeFrequency,
    priority,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const published = allBlogs.filter((post) => !post.draft)
  const latestPostDate = published.reduce<string | undefined>((latest, post) => {
    const date = toDate(post.lastmod || post.date)
    if (!date) return latest
    return !latest || date > latest ? date : latest
  }, undefined)

  const routes: MetadataRoute.Sitemap = [
    entry({
      path: '',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    }),
    entry({
      path: 'pricing',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    entry({
      path: 'compare',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    entry({
      path: 'agent-harness-engineering',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    }),
    entry({
      path: 'glossary',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    entry({
      path: 'blogs',
      lastModified: latestPostDate || CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    entry({
      path: 'about-us',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    entry({
      path: 'privacy-policy',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    }),
    entry({
      path: 'terms',
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    }),
  ]

  const compareRoutes = competitors.map((competitor) =>
    entry({
      path: `compare/${competitor.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  )

  const glossaryRoutes = GLOSSARY_TERMS.map((term) =>
    entry({
      path: `glossary/${term.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  )

  const blogRoutes = published.map((post) =>
    entry({
      path: post.path,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  )

  return [...routes, ...compareRoutes, ...glossaryRoutes, ...blogRoutes]
}

// Must stay static (no edge). Contentlayer in an edge sitemap breaks the
// Vercel/Cloudflare edge bundler: "Can't build edge function /sitemap.xml".
