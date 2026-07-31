import ListLayout from '@/layouts/post-list'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { createWebPageSchema } from '@/components/structuredData'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { Newspaper } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'Blog',
  description:
    'In-depth articles, tutorials, and best practices for AI observability, LLM monitoring, OpenTelemetry instrumentation, and building production-grade AI applications.',
  canonicalUrl: 'https://openlit.io/blogs',
})

const pageSchema = createWebPageSchema(
  'Blog — OpenLIT',
  'https://openlit.io/blogs',
  'In-depth articles, tutorials, and best practices for AI observability and LLM monitoring.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Blog', url: 'https://openlit.io/blogs' },
  ]
)

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const initialDisplayPosts = posts

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <FeaturePageHeader
        eyebrow="Resources"
        title="Blogs"
        icon={<Newspaper className="h-4 w-4" />}
        tone="border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300"
      />
      <div className="mx-auto max-w-6xl">
        <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} title="Blogs" />
      </div>
    </div>
  )
}

export const runtime = 'edge'
