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
    const displayImage =
      images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
    const authorDetails = authors?.length
      ? coreContent(allAuthors.find((p) => p.slug === authors[0]) as Authors)
      : undefined
    return (
      <Link
        href={`/${path}`}
        key={path}
        data-slot="card"
        className="text-card-foreground group order-last flex flex-col gap-6 rounded-xl border-0 bg-transparent py-6 shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
      >
        <section className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
          <section className="sm:col-span-5">
            {/* Tags */}
            {tags && tags.length > 0 && (
              <section className="text-muted-foreground mb-4 flex flex-wrap gap-3 text-xs uppercase tracking-wider md:mb-6 md:gap-5 lg:gap-6">
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
            <span className="text-muted-foreground mt-4 md:mt-5">{summary}</span>

            {/* Author and Date */}
            <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
              <span className="text-muted-foreground">{authorDetails?.name ?? 'Openlit'}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{formatDate(date, siteMetadata.locale)}</span>
            </div>
          </section>

          {/* Featured Image */}
          <section className="order-first sm:order-last sm:col-span-5">
            <Link href={`/${path}`} className="block">
              <section className="border-border aspect-video overflow-clip rounded-lg border">
                <Image
                  src={displayImage}
                  alt={title}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                />
              </section>
            </Link>
          </section>
        </section>
      </Link>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pt-20 md:px-8 lg:px-12">
      <div className="grid gap-y-10">
        <FirstPost />
      </div>
      <div className="grid grid-cols-2 gap-10">
        {displayPosts.slice(1).map((post) => {
          const { path, date, title, summary, tags, authors, images } = post
          const displayImage =
            images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

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
                <span className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={displayImage}
                    alt={title}
                    width={800}
                    height={450}
                    className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                  />
                </span>
                {/* Tags */}
                {tags && tags.length > 0 && (
                  <section className="text-muted-foreground mb-4 flex flex-wrap gap-3 text-xs uppercase tracking-wider md:mb-6 md:gap-5 lg:gap-6">
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
                <span className="text-muted-foreground mt-4 md:mt-5">{summary}</span>

                {/* Author and Date */}
                <section className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                  <span className="text-muted-foreground">{authorDetails?.name ?? 'Openlit'}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
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
