'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { STATIC_PREVIEWS, type DemoTab } from './mock-data'

export default function DemoBrowser({ tab }: { tab: DemoTab }) {
  const preview = STATIC_PREVIEWS[tab]
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || preview.type !== 'video') return
    video.currentTime = 0
    void video.play().catch(() => {
      // Autoplay can be blocked; muted + playsInline should usually succeed.
    })
  }, [preview])

  return (
    <div className="mx-auto mt-6 w-full max-w-[44rem]">
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_20px_50px_-24px_rgba(28,25,23,0.35)] dark:border-stone-800 dark:bg-stone-950 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-2 border-b border-stone-200 px-3 py-2 dark:border-stone-800">
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
          <span className="ml-2 truncate text-xs text-black/60 dark:text-white/60">
            app.openlit.io
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-stone-100 dark:bg-stone-900">
          {preview.type === 'video' ? (
            <video
              ref={videoRef}
              key={preview.src}
              src={preview.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover object-top"
              aria-label={preview.alt}
            />
          ) : (
            <Image
              key={preview.src}
              src={preview.src}
              alt={preview.alt}
              fill
              sizes="(max-width: 768px) 100vw, 44rem"
              className="object-cover object-top"
            />
          )}
        </div>
      </div>
    </div>
  )
}
