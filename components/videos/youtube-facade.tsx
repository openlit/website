'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { cn } from 'lib/utils'
import { youtubeEmbedUrl } from 'lib/youtube/config'

type YoutubeFacadeProps = {
  videoId: string
  title: string
  thumbnailUrl: string
  className?: string
  /** When true, start muted autoplay after click (still user-initiated). */
  autoplayOnClick?: boolean
}

/**
 * Click-to-load YouTube iframe facade for listing/card surfaces.
 * Dedicated watch pages (/videos/[id], /shorts/[id]) should use YoutubeEmbed
 * (or an equivalent SSR iframe) so crawlers see a player in the HTML.
 */
export default function YoutubeFacade({
  videoId,
  title,
  thumbnailUrl,
  className,
  autoplayOnClick = true,
}: YoutubeFacadeProps) {
  const [active, setActive] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const activate = useCallback(() => {
    setActive(true)
  }, [])

  useEffect(() => {
    if (!active) return
    iframeRef.current?.focus()
  }, [active])

  if (!active) {
    return (
      <button
        type="button"
        onClick={activate}
        className={cn(
          'group relative block aspect-video w-full overflow-hidden rounded-lg bg-stone-900 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brandPrimary/50 dark:ring-offset-stone-950',
          className
        )}
        aria-label={`Play ${title}`}
      >
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          unoptimized
          priority
        />
        <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-brandPrimary text-white shadow-lg transition group-hover:scale-105">
            <Play className="ml-1 size-7 fill-current" aria-hidden />
          </span>
        </span>
      </button>
    )
  }

  const src = youtubeEmbedUrl(videoId, {
    autoplay: autoplayOnClick,
    mute: false,
  })

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden rounded-lg bg-black', className)}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
