/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent, coreContent } from 'pliny/utils/contentlayer'
import { Authors, allAuthors, type Blog } from 'contentlayer/generated'
import Link from '@/components/common/link'
import siteMetadata from 'data/siteMetadata'
import { cn } from 'lib/utils'
import Image from 'next/image'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <section>
      <div className="pb-6 pt-6">
        <h1 className="text-center text-3xl font-extrabold leading-9 tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14">
          {title}
        </h1>
      </div>
      <div className="flex flex-col sm:space-x-24">
        <div className="w-full items-start pb-12">
          <div className="mx-auto grid grid-cols-1 items-start  gap-2 px-10 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags, authors, images } = post
              const displayImage =
                images && images.length > 0
                  ? images[0]
                  : 'https://picsum.photos/seed/picsum/800/400'
              console.log(displayImage)
              const authorDetails = authors?.length
                ? coreContent(allAuthors.find((p) => p.slug === authors[0]) as Authors)
                : undefined

              return (
                <Link key={path} href={`/${path}`} passHref className="max-w-full">
                  <div className="group/card w-full max-w-xs">
                    <div
                      className={cn(
                        'card backgroundImage relative mx-auto flex h-96 max-w-sm  cursor-pointer flex-col justify-between overflow-hidden rounded-md p-4 shadow-xl',
                        'bg-cover'
                      )}
                      style={{
                        backgroundImage: `url(${displayImage})`,
                      }}
                    >
                      <div className="absolute left-0 top-0 h-full w-full bg-gray-900 opacity-60 transition duration-300 group-hover/card:bg-black"></div>
                      <div className="z-10 flex flex-row items-center space-x-4">
                        {authorDetails?.avatar ? (
                          <Image
                            height="100"
                            width="100"
                            alt="Avatar"
                            src={authorDetails?.avatar}
                            className="h-10 w-10 rounded-full border-2 object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full border-2 bg-gray-50 object-cover" />
                        )}

                        <div className="flex flex-col">
                          <p className="relative z-10 text-base font-normal text-gray-50">
                            {authorDetails?.name ?? 'Openlit'}
                          </p>
                          <p className="text-sm text-gray-400">
                            Published {formatDate(date, siteMetadata.locale)}
                          </p>
                        </div>
                      </div>
                      <div className="text content">
                        <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
                          {title}
                        </h1>
                        <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
                          {summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
