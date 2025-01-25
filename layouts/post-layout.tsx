import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/common/link'
import siteMetadata from 'data/siteMetadata'
import { Badge } from '@/components/ui/badge'
import PostFooter from './post-footer'
import PostAuthor from './post-author'
import Bleed from 'pliny/ui/Bleed'
import Image from 'next/image'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, date, title, tags, images, layout } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <article>
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          {layout === 'PostBanner' && (
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
          )}
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-stone-500 dark:text-stone-400">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </dd>
            </div>
          </dl>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
        </div>
      </header>
      <div className="border-t border-stone-200 pb-4 dark:border-stone-800 xl:grid xl:grid-cols-4 xl:gap-x-6">
        <div className="xl:col-span-4 xl:row-span-2 xl:pb-4">
          <div className="prose max-w-none pb-4 pt-10 dark:prose-invert">{children}</div>

          <div className="pb-2 pt-2 text-sm text-stone-700 dark:text-stone-300">
            <Link href={discussUrl(path)} rel="nofollow">
              Discuss on Twitter
            </Link>
            {` • `}
            <Link href={editUrl(filePath)}>
              <strong>View on GitHub</strong>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      <PostAuthor authorDetails={authorDetails} />
      <PostFooter prev={prev} next={next} />
    </article>
  )
}
