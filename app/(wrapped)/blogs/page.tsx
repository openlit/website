import ListLayout from '@/layouts/post-list'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import {
  createItemListSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { Newspaper } from 'lucide-react'
import siteMetadata from 'data/siteMetadata'

const BLOG_DESCRIPTION =
  'Guides on Agent Harness Engineering: LLM observability, OpenTelemetry tracing, LLM evaluation, prompt management, and open-source Langfuse alternatives.'

export const metadata = genPageMetadata({
  title: 'OpenLIT Blog: LLM Observability and Agent Harness Engineering',
  description: BLOG_DESCRIPTION,
  keywords: [
    'LLM observability blog',
    'Langfuse alternatives',
    'open source LLM evaluation',
    'prompt management',
    'OpenTelemetry LLM tracing',
    'Agent Harness Engineering',
  ],
  canonicalUrl: 'https://openlit.io/blogs',
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs.filter((post) => !post.draft)))
  const published = posts.filter((post) => !post.draft)

  const pageSchema = createWebPageSchema(
    'OpenLIT Blog: LLM Observability and Agent Harness Engineering',
    'https://openlit.io/blogs',
    BLOG_DESCRIPTION,
    [
      { name: 'Home', url: 'https://openlit.io' },
      { name: 'Blog', url: 'https://openlit.io/blogs' },
    ],
    {
      pageType: 'Blog',
    }
  )

  const listSchema = createItemListSchema({
    name: 'OpenLIT blog posts',
    url: 'https://openlit.io/blogs',
    description: BLOG_DESCRIPTION,
    items: published.slice(0, 30).map((post) => ({
      name: post.title,
      url: `${siteMetadata.siteUrl}/${post.path}`,
      description: post.summary,
    })),
  })

  return (
    <div className="w-full">
      <JsonLd data={createJsonLdGraph([pageSchema, listSchema])} />
      <FeaturePageHeader
        eyebrow="Resources"
        title="Blogs"
        icon={<Newspaper className="h-4 w-4" />}
        tone="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300"
      />
      <div className="mx-auto max-w-6xl">
        <ListLayout posts={posts} initialDisplayPosts={posts} title="Blogs" />
      </div>
    </div>
  )
}

export const runtime = 'edge'
