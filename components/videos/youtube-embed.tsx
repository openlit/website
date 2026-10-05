import { cn } from 'lib/utils'
import { youtubeEmbedUrl } from 'lib/youtube/config'

type YoutubeEmbedProps = {
  videoId: string
  title: string
  className?: string
  /** Prefer true on dedicated watch pages so crawlers see a player in HTML. */
  autoplay?: boolean
  mute?: boolean
}

/**
 * Server-renderable YouTube iframe. Used on dedicated watch pages so Googlebot
 * sees a real player element without requiring a click or client JS.
 */
export default function YoutubeEmbed({
  videoId,
  title,
  className,
  autoplay = false,
  mute = false,
}: YoutubeEmbedProps) {
  const src = youtubeEmbedUrl(videoId, { autoplay, mute })

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden rounded-lg bg-black', className)}
    >
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
