/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/link'
import siteMetadata from '@/data/siteMetadata'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
          <div className="mx-auto grid grid-cols-1 items-start  gap-10 px-10 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags, authors } = post

              return (
                <Link key={path} href={`/${path}`} passHref className="max-w-full">
                  <Card className="relative h-60 cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-lg">
                    <CardHeader className="gap-2">
                      <CardTitle className=" text-lg font-[800] text-brandPrimary">
                        {title}
                      </CardTitle>

                      <div className="flex items-center gap-3 overflow-auto text-sm font-bold">
                        {tags.map((tag) => (
                          <Badge key={tag} className="shrink-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-[.7rem] font-[700] text-stone-600 dark:text-stone-300">
                        Published {formatDate(date, siteMetadata.locale)}
                      </div>

                      <div className="line-clamp-4 p-0 text-xs font-[600] text-stone-400 dark:text-stone-200">
                        {summary}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-[800]">{authors?.join(' , ')}</div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
