import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'
import competitors from 'data/comparisons'
import { LLM_PAGES } from 'lib/llms/pages'

const SITE = siteMetadata.siteUrl.replace(/\/$/, '')

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
    lastModified: toDate(lastModified) || toDate(new Date()) || undefined,
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
  const updated = toDate(new Date()) || latestPostDate || '2026-09-21'

  const routes: MetadataRoute.Sitemap = [
    entry({
      path: '',
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 1,
    }),
    entry({
      path: 'pricing',
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    entry({
      path: 'compare',
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    entry({
      path: 'blogs',
      lastModified: latestPostDate || updated,
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    entry({
      path: 'about-us',
      lastModified: updated,
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    entry({
      path: 'privacy-policy',
      lastModified: updated,
      changeFrequency: 'yearly',
      priority: 0.3,
    }),
    entry({
      path: 'terms',
      lastModified: updated,
      changeFrequency: 'yearly',
      priority: 0.3,
    }),
    entry({
      path: 'llms.txt',
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 0.5,
    }),
    entry({
      path: 'llms-full.txt',
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 0.5,
    }),
  ]

  const compareRoutes = competitors.map((competitor) =>
    entry({
      path: `compare/${competitor.slug}`,
      lastModified: updated,
      changeFrequency: 'monthly',
      priority: 0.8,
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

  const markdownRoutes = LLM_PAGES.map((page) =>
    entry({
      path: page.mdPath.replace(/^\//, ''),
      lastModified: updated,
      changeFrequency: 'weekly',
      priority: 0.4,
    })
  )

  return [...routes, ...compareRoutes, ...blogRoutes, ...markdownRoutes]
}

// Must stay static (no edge). Contentlayer in an edge sitemap breaks the
// Vercel/Cloudflare edge bundler: "Can't build edge function /sitemap.xml".
