import Link from 'next/link'
import { Clapperboard, ExternalLink } from 'lucide-react'
import VideoCard from './video-card'
import { Button } from '@/components/ui/button'
import type { YoutubeVideo } from 'lib/youtube/types'
import { getYoutubeChannelUrl } from 'lib/youtube/config'
import { parseIsoDurationSeconds } from 'lib/youtube/duration'

function formatDuration(iso?: string) {
  const seconds = parseIsoDurationSeconds(iso)
  if (typeof seconds !== 'number') return undefined
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

type VideosListProps = {
  videos: YoutubeVideo[]
  error?: string
  source?: string
}

export default function VideosList({ videos, error, source }: VideosListProps) {
  const channelUrl = getYoutubeChannelUrl()

  if (!videos.length) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center md:px-6">
        <Clapperboard className="mx-auto size-10 text-stone-400" aria-hidden />
        <h2 className="mt-4 text-xl font-semibold text-stone-950 dark:text-stone-50">
          Videos temporarily unavailable
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          {error
            ? 'We could not reach the OpenLIT YouTube feed right now. Try again later, or watch on YouTube.'
            : 'No long-form videos are listed yet. Check back soon, or visit the channel on YouTube.'}
        </p>
        <Button asChild className="mt-6" variant="default">
          <a href={channelUrl} target="_blank" rel="noopener noreferrer">
            Open YouTube channel
            <ExternalLink className="ml-2 size-4" aria-hidden />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
            Videos
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Talks, demos, and deep dives from the OpenLIT YouTube channel. New uploads appear here
            automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/shorts">Shorts</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={channelUrl} target="_blank" rel="noopener noreferrer">
              YouTube
              <ExternalLink className="ml-1.5 size-3.5" aria-hidden />
            </a>
          </Button>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
          {error}
        </p>
      ) : null}

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.id}>
            <VideoCard
              id={video.id}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              publishedAt={video.publishedAt}
              href={`/videos/${video.id}`}
              durationLabel={formatDuration(video.duration)}
            />
          </li>
        ))}
      </ul>

      {source ? (
        <p className="mt-10 text-center text-xs text-stone-400 dark:text-stone-600">
          Source:{' '}
          {source === 'api'
            ? 'YouTube Data API'
            : source === 'rss'
              ? 'YouTube RSS'
              : 'YouTube channel'}
        </p>
      ) : null}
    </div>
  )
}
