import ListLayout from '@/layouts/post-list'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { BadgeWithGradient } from '@/components/ui/badge'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const initialDisplayPosts = posts

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden px-4 py-20">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="space-y-6 text-center">
            <BadgeWithGradient variant="outline" className="px-3 py-1">
              Blogs
            </BadgeWithGradient>
            <h1 className="text-5xl font-bold tracking-tight">
              Blogs for{' '}
              <span className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                AI Engineering
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              Explore in-depth articles, tutorials, and best practices for AI observability, LLM
              monitoring, and OpenTelemetry implementation. Stay updated with the latest insights,
              use cases, and tips from the OpenLIT community.
            </p>
          </div>
        </div>
      </section>
      <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} title="Blogs" />
    </div>
  )
}

export const runtime = 'edge'
