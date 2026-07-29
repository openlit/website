import { GithubProvider } from 'contexts/github'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

import Footer from '@/components/common/footer'
import SiteShell from '@/components/shell/site-shell'
import type { SearchItem } from 'lib/search-index'

export default function Layout({ children }: { children: React.ReactNode }) {
  const blogItems: SearchItem[] = allCoreContent(sortPosts(allBlogs))
    .filter((post) => !('draft' in post && post.draft))
    .map((post) => ({
      id: `blog-${post.slug}`,
      title: post.title,
      description: post.summary,
      href: `/blogs/${post.slug}`,
      category: 'Blog' as const,
      keywords: Array.isArray(post.tags) ? post.tags.join(' ') : undefined,
    }))

  return (
    <GithubProvider>
      <SiteShell blogItems={blogItems}>
        <div className="relative min-h-full bg-white text-black dark:bg-stone-950 dark:text-white">
          {children}
          <Footer />
        </div>
      </SiteShell>
    </GithubProvider>
  )
}
