// import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
import Hero from '@/components/home/hero'
import About from '@/components/home/about'
// import HowItWorks from '@/components/home/previews'
// import LatestBlogs from '@/components/home/latest-blogs'
import { BackgroundBeams } from '@/components/ui/background-beams'
import Keypoints from '@/components/home/keypoints'
import Features from '@/components/home/features'
import Sponsored from '@/components/home/sponsored'

// const MAX_DISPLAY = 5

export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs)
  // const posts = allCoreContent(sortedPosts)
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-between">
      <BackgroundBeams className="-z-10" />
      <Hero />
      <Sponsored />
      <Features />
      {/* <HowItWorks /> */}
      <Keypoints />
      <About />
      {/* <LatestBlogs posts={posts.slice(0, MAX_DISPLAY)} /> */}
    </div>
  )
}

export const runtime = 'edge'
