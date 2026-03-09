import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from 'data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const compareRoutes = [
    'openlit-vs-langfuse',
    'openlit-vs-helicone',
    'openlit-vs-langsmith',
    'openlit-vs-datadog',
  ].map((slug) => ({
    url: `${siteUrl}/compare/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const routes = ['', 'blogs', 'about-us', 'pricing', 'compare', 'privacy-policy', 'terms'].map(
    (route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )

  return [...routes, ...compareRoutes, ...blogRoutes]
}

export const runtime = 'edge'
