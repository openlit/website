import ListLayout from '@/layouts/post-list'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const initialDisplayPosts = posts

  return <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} title="Blogs" />
}

export const runtime = 'edge'
