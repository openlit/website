import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import YoutubeFacade from './youtube-facade'
import { Button } from '@/components/ui/button'
import type { YoutubeVideo } from 'lib/youtube/types'
import { youtubeWatchUrl } from 'lib/youtube/config'

type VideoWatchProps = {
  video: YoutubeVideo
  related?: YoutubeVideo[]
}

function formatPublished(value?: string) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function VideoWatch({ video, related = [] }: VideoWatchProps) {
  const published = formatPublished(video.publishedAt)

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <YoutubeFacade
        videoId={video.id}
        title={video.title}
        thumbnailUrl={video.thumbnailUrl}
      />

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-3xl">
        {video.title}
      </h1>
      {published ? (
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{published}</p>
      ) : null}
      {video.description ? (
        <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-stone-700 dark:text-stone-300">
          {video.description}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="default" size="sm">
          <a href={youtubeWatchUrl(video.id)} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
            <ExternalLink className="ml-1.5 size-3.5" aria-hidden />
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/videos">All videos</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/shorts">Shorts</Link>
        </Button>
      </div>

      {related.length > 0 ? (
        <section className="mt-14 border-t border-stone-200 pt-10 dark:border-stone-800">
          <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">More videos</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/videos/${item.id}`}
                  className="block rounded-md border border-stone-200 p-3 transition hover:border-brandPrimary/40 dark:border-stone-800"
                >
                  <span className="line-clamp-2 text-sm font-medium text-stone-900 dark:text-stone-100">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
