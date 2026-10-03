import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { cn } from 'lib/utils'

type VideoCardProps = {
  id: string
  title: string
  description?: string
  thumbnailUrl: string
  publishedAt?: string
  href: string
  durationLabel?: string
  className?: string
}

function formatPublished(value?: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Thumbnail facade — avoids loading a YouTube iframe until the user opens the watch page.
 */
export default function VideoCard({
  id,
  title,
  description,
  thumbnailUrl,
  publishedAt,
  href,
  durationLabel,
  className,
}: VideoCardProps) {
  const published = formatPublished(publishedAt)

  return (
    <article className={cn('group flex flex-col gap-3', className)}>
      <Link
        href={href}
        className="relative block aspect-video overflow-hidden rounded-lg bg-stone-100 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brandPrimary/50 dark:bg-stone-900 dark:ring-offset-stone-950"
        aria-label={`Watch ${title}`}
      >
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          unoptimized
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition group-hover:scale-105 group-hover:bg-brandPrimary">
            <Play className="ml-0.5 size-5 fill-current" aria-hidden />
          </span>
        </span>
        {durationLabel ? (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
            {durationLabel}
          </span>
        ) : null}
      </Link>
      <div className="min-w-0">
        <h2 className="line-clamp-2 text-base font-semibold leading-snug text-stone-950 dark:text-stone-50">
          <Link href={href} className="hover:text-brandPrimary">
            {title}
          </Link>
        </h2>
        {description ? (
          <p className="mt-1 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{description}</p>
        ) : null}
        {published ? (
          <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-500">{published}</p>
        ) : null}
        <span className="sr-only">Video id {id}</span>
      </div>
    </article>
  )
}
