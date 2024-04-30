// import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import Previews from '@/components/home/previews'
import Features from '@/components/home/features'
// import LatestBlogs from '@/components/home/latest-blogs'
import Supports from '@/components/home/supports'

// const MAX_DISPLAY = 5

export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs)
  // const posts = allCoreContent(sortedPosts)
  return (
    <>
      <Hero />
      <Supports />
      <Previews />
      <Features />
      <About />
      {/* <LatestBlogs posts={posts.slice(0, MAX_DISPLAY)} /> */}
    </>
  )
}
