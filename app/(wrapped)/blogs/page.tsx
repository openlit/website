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
  'Guides on agent harness engineering: agent observability, OpenTelemetry tracing, agent evals, guardrails, prompt management and open-source alternatives.'

export const metadata = genPageMetadata({
  title: 'OpenLIT Blog: Agent Harness Engineering & Observability',
  description: BLOG_DESCRIPTION,
  keywords: [
    'agent harness engineering',
    'agent observability blog',
    'Langfuse alternatives',
    'open source agent evals',
    'prompt management',
    'OpenTelemetry LLM tracing',
  ],
  canonicalUrl: 'https://openlit.io/blogs',
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs.filter((post) => !post.draft)))
  const published = posts.filter((post) => !post.draft)

  const pageSchema = createWebPageSchema(
    'OpenLIT Blog: Agent Harness Engineering & Observability',
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
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          OpenLIT Blog
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
          {BLOG_DESCRIPTION}
        </p>
      </div>
      <div className="mx-auto max-w-6xl">
        <ListLayout posts={posts} initialDisplayPosts={posts} title="Blogs" />
      </div>
    </div>
  )
}

export const runtime = 'edge'
