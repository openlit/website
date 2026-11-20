/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent, coreContent } from 'pliny/utils/contentlayer'
import { Authors, allAuthors, type Blog } from 'contentlayer/generated'
import Link from '@/components/common/link'
import siteMetadata from 'data/siteMetadata'
import { cn } from 'lib/utils'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

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

  const FirstPost = () => {
    const { path, date, title, summary, tags, authors, images } = displayPosts[0]
    const displayImage = images && images.length > 0 ? images[0] : '/static/images/twitter-card.png'
    const authorDetails = authors?.length
      ? coreContent(allAuthors.find((p) => p.slug === authors[0]) as Authors)
      : undefined
    return (
      <Link
        href={`/${path}`}
        data-slot="card"
        className="group grid items-center gap-6 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 transition-colors hover:border-primary-600/50 dark:border-gray-800 dark:bg-white/[0.03] sm:p-5 md:grid-cols-12 md:gap-10 md:p-6"
      >
        {/* Featured image */}
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 md:col-span-7">
          <Image
            src={displayImage}
            alt={title}
            width={1200}
            height={630}
            priority
            className="aspect-[40/21] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-col md:col-span-5">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
            <span className="rounded-full bg-primary-600/10 px-2.5 py-1 font-semibold text-primary-600 dark:text-primary-400">
              Latest
            </span>
            {tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-gray-600 dark:text-gray-400">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-2xl font-semibold leading-tight text-transparent group-hover:underline lg:text-3xl">
            {title}
          </h3>

          <p className="mt-4 line-clamp-4 text-gray-600 dark:text-gray-400">{summary}</p>

          <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span>{authorDetails?.name ?? 'Openlit'}</span>
            <span>•</span>
            <span>{formatDate(date, siteMetadata.locale)}</span>
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-10 sm:gap-14 sm:px-6 sm:pt-20 md:px-8 lg:px-12">
      {displayPosts.length > 0 && <FirstPost />}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {displayPosts.slice(1).map((post) => {
          const { path, date, title, summary, tags, authors, images } = post
          const displayImage =
            images && images.length > 0 ? images[0] : '/static/images/twitter-card.png'

          const authorDetails = authors?.length
            ? coreContent(allAuthors.find((p) => p.slug === authors[0]) as Authors)
            : undefined

          return (
            <Link
              href={`/${path}`}
              key={path}
              data-slot="card"
              className="text-card-foreground group order-last flex flex-col gap-6 rounded-xl border-0 bg-transparent py-6 shadow-none sm:order-first"
            >
              <section className="flex flex-col">
                <span className="relative mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                  <Image
                    src={displayImage}
                    alt={title}
                    width={1200}
                    height={630}
                    className="aspect-[40/21] h-auto w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                  />
                </span>
                {/* Tags */}
                {tags && tags.length > 0 && (
                  <section className="mb-4 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 md:mb-6 md:gap-5 lg:gap-6">
                    {tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </section>
                )}

                {/* Title */}
                <h3 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-xl font-semibold text-transparent group-hover:underline md:text-2xl lg:text-3xl">
                  {title}
                </h3>

                {/* Summary */}
                <p className="mt-4 line-clamp-3 text-gray-600 dark:text-gray-400 md:mt-5">
                  {summary}
                </p>

                {/* Author and Date */}
                <section className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                  <span className="text-gray-600 dark:text-gray-400">
                    {authorDetails?.name ?? 'Openlit'}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatDate(date, siteMetadata.locale)}
                  </span>
                </section>
              </section>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
