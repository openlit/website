import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'
import competitors from 'data/comparisons'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const compareRoutes = competitors.map((c) => ({
    url: `${siteUrl}/compare/${c.slug}`,
    lastModified: '2025-03-14',
  }))

  const routes = [
    { route: '', lastModified: '2025-03-14' },
    { route: 'blogs', lastModified: '2025-03-14' },
    { route: 'about-us', lastModified: '2025-03-14' },
    { route: 'pricing', lastModified: '2025-03-14' },
    { route: 'compare', lastModified: '2025-03-14' },
    { route: 'privacy-policy', lastModified: '2025-03-09' },
    { route: 'terms', lastModified: '2025-03-09' },
  ].map(({ route, lastModified }) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified,
  }))

  return [...routes, ...compareRoutes, ...blogRoutes]
}

export const runtime = 'edge'
