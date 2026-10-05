'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, ExternalLink, Link2, Share2, Volume2, VolumeX } from 'lucide-react'
import { cn } from 'lib/utils'
import type { YoutubeVideo } from 'lib/youtube/types'
import { youtubeEmbedUrl, youtubeShortsUrl } from 'lib/youtube/config'
import siteMetadata from 'data/siteMetadata'

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string
          width?: string | number
          height?: string | number
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YtPlayer }) => void
            onStateChange?: (event: { data: number; target: YtPlayer }) => void
          }
        }
      ) => YtPlayer
      PlayerState: {
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

type YtPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  destroy: () => void
  getPlayerState: () => number
}

let iframeApiPromise: Promise<void> | null = null

function loadYoutubeIframeApi() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.YT?.Player) return Promise.resolve()
  if (iframeApiPromise) return iframeApiPromise

  iframeApiPromise = new Promise<void>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve()
    }
    if (!document.querySelector('script[data-openlit-yt-api]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.dataset.openlitYtApi = 'true'
      document.body.appendChild(script)
    }
  })

  return iframeApiPromise
}

type ShortsFeedProps = {
  shorts: YoutubeVideo[]
  initialId?: string
  channelUrl?: string
}

export default function ShortsFeed({
  shorts,
  initialId,
  channelUrl = siteMetadata.youtube,
}: ShortsFeedProps) {
  const startIndex = useMemo(() => {
    if (!initialId) return 0
    const idx = shorts.findIndex((item) => item.id === initialId)
    return idx >= 0 ? idx : 0
  }, [initialId, shorts])

  const scrollerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const hostRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const playersRef = useRef<Map<string, YtPlayer>>(new Map())
  const creatingRef = useRef<Set<string>>(new Set())
  const [activeIndex, setActiveIndex] = useState(startIndex)
  const [readyIds, setReadyIds] = useState<Set<string>>(() => new Set())
  const [muted, setMuted] = useState(true)
  const [shareStatus, setShareStatus] = useState<string | null>(null)
  const mutedRef = useRef(muted)
  const activeIdRef = useRef(shorts[startIndex]?.id)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    void loadYoutubeIframeApi()
  }, [])

  useEffect(() => {
    slideRefs.current[startIndex]?.scrollIntoView({ block: 'start' })
  }, [startIndex])

  const pauseAllExcept = useCallback((keepId?: string) => {
    playersRef.current.forEach((player, id) => {
      if (id === keepId) return
      try {
        player.pauseVideo()
      } catch {
        // ignore
      }
    })
  }, [])

  const ensurePlayer = useCallback(async (videoId: string) => {
    if (playersRef.current.has(videoId)) return playersRef.current.get(videoId) || null
    if (creatingRef.current.has(videoId)) return null

    const wrapper = hostRefs.current.get(videoId)
    if (!wrapper) return null

    await loadYoutubeIframeApi()
    if (!window.YT?.Player) return null

    creatingRef.current.add(videoId)
    wrapper.innerHTML = ''
    const mount = document.createElement('div')
    mount.className = 'h-full w-full'
    wrapper.appendChild(mount)

    return new Promise<YtPlayer | null>((resolve) => {
      try {
        const player = new window.YT!.Player(mount, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            fs: 1,
            loop: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              playersRef.current.set(videoId, event.target)
              creatingRef.current.delete(videoId)
              setReadyIds((prev) => new Set(prev).add(videoId))
              if (mutedRef.current) event.target.mute()
              else event.target.unMute()
              if (activeIdRef.current === videoId) {
                event.target.playVideo()
              } else {
                event.target.pauseVideo()
              }
              resolve(event.target)
            },
            onStateChange: (event) => {
              if (event.data === window.YT?.PlayerState.ENDED) {
                try {
                  event.target.pauseVideo()
                } catch {
                  // ignore
                }
              }
            },
          },
        })
        if (player) playersRef.current.set(videoId, player)
      } catch {
        creatingRef.current.delete(videoId)
        resolve(null)
      }
    })
  }, [])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root || !shorts.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.65)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const index = Number((visible.target as HTMLElement).dataset.index)
        if (Number.isNaN(index)) return

        const video = shorts[index]
        if (!video) return

        setActiveIndex(index)
        activeIdRef.current = video.id
        pauseAllExcept(video.id)

        void ensurePlayer(video.id).then((player) => {
          if (!player || activeIdRef.current !== video.id) return
          pauseAllExcept(video.id)
          try {
            if (mutedRef.current) player.mute()
            else player.unMute()
            player.playVideo()
          } catch {
            // ignore
          }
        })

        const nextPath = `/shorts/${video.id}`
        if (window.location.pathname !== nextPath) {
          window.history.replaceState(null, '', nextPath)
        }
      },
      { root, threshold: [0.65, 0.75, 0.9] }
    )

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide)
    })

    return () => observer.disconnect()
  }, [shorts, ensurePlayer, pauseAllExcept])

  useEffect(() => {
    const players = playersRef.current
    return () => {
      players.forEach((player) => {
        try {
          player.destroy()
        } catch {
          // ignore
        }
      })
      players.clear()
    }
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(shorts.length - 1, index))
      slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [shorts.length]
  )

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      const active = shorts[activeIndex]
      const player = active ? playersRef.current.get(active.id) : undefined
      try {
        if (player) {
          if (next) player.mute()
          else player.unMute()
        }
      } catch {
        // ignore
      }
      return next
    })
  }, [activeIndex, shorts])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return
      }
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === 'j') {
        event.preventDefault()
        scrollToIndex(activeIndex + 1)
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp' || event.key === 'k') {
        event.preventDefault()
        scrollToIndex(activeIndex - 1)
      } else if (event.key === 'm' || event.key === 'M') {
        event.preventDefault()
        toggleMute()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, scrollToIndex, toggleMute])

  const shareCurrent = useCallback(async () => {
    const video = shorts[activeIndex]
    if (!video) return
    const url = `${window.location.origin}/shorts/${video.id}`

    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, text: video.description, url })
        setShareStatus('Shared')
      } else {
        await navigator.clipboard.writeText(url)
        setShareStatus('Link copied')
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url)
        setShareStatus('Link copied')
      } catch {
        setShareStatus('Could not share')
      }
    }
    window.setTimeout(() => setShareStatus(null), 2000)
  }, [activeIndex, shorts])

  if (!shorts.length) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 text-center">
        <p className="text-lg font-semibold text-stone-950 dark:text-stone-50">No Shorts yet</p>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          We could not load Shorts from the OpenLIT channel. Watch them on YouTube instead.
        </p>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brandPrimary hover:underline"
        >
          Open YouTube channel
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    )
  }

  return (
    <div className="relative flex h-[calc(100dvh-3.25rem)] min-h-[28rem] w-full flex-col bg-white text-stone-950 dark:bg-stone-950 dark:text-stone-50 md:h-[calc(100dvh-3.5rem)]">
      <div
        ref={scrollerRef}
        role="feed"
        aria-label="OpenLIT YouTube Shorts"
        className="h-full snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth"
      >
        {shorts.map((video, index) => {
          const isActive = index === activeIndex
          const isReady = readyIds.has(video.id)

          return (
            <article
              key={video.id}
              ref={(el) => {
                slideRefs.current[index] = el
              }}
              data-index={index}
              aria-posinset={index + 1}
              aria-setsize={shorts.length}
              aria-label={video.title}
              className="relative flex h-full w-full snap-start snap-always flex-col"
            >
              <div className="relative mx-auto flex h-full w-full max-w-lg flex-1 items-center justify-center overflow-hidden bg-stone-100 dark:bg-stone-950 md:max-w-md lg:max-w-lg">
                {!isReady ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={video.thumbnailUrl}
                    alt=""
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity',
                      isActive ? 'opacity-70' : 'opacity-90'
                    )}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                ) : null}

                {/*
                  Keep the crawler-visible embed OUTSIDE the YT IFrame API host.
                  ensurePlayer() clears hostRefs with innerHTML='', which would
                  detach a React-managed iframe and crash on the next render
                  (removeChild / NotFoundError) when isReady flips.
                */}
                {index === startIndex && !isReady ? (
                  <iframe
                    src={youtubeEmbedUrl(video.id, { autoplay: false, mute: true })}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : null}

                <div
                  ref={(el) => {
                    if (el) hostRefs.current.set(video.id, el)
                    else hostRefs.current.delete(video.id)
                  }}
                  className="absolute inset-0 h-full w-full [&>div]:h-full [&>div]:w-full [&>iframe]:h-full [&>iframe]:w-full"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-6 pt-24 text-white">
                  <div className="pointer-events-auto max-w-[85%]">
                    <h2 className="text-base font-semibold leading-snug sm:text-lg">
                      {video.title}
                    </h2>
                    {video.description ? (
                      <p className="mt-1 line-clamp-3 text-sm text-white/80">{video.description}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href="/videos"
                        className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur hover:bg-white/20"
                      >
                        All videos
                      </Link>
                      <a
                        href={youtubeShortsUrl(video.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur hover:bg-white/20"
                      >
                        YouTube
                        <ExternalLink className="size-3" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-28 right-3 z-20 flex flex-col items-center gap-3 sm:bottom-32">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                    aria-pressed={!muted}
                  >
                    {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                  </button>
                  <button
                    type="button"
                    onClick={shareCurrent}
                    className="flex size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary"
                    aria-label="Share this Short"
                  >
                    <Share2 className="size-5" />
                  </button>
                  <a
                    href={youtubeShortsUrl(video.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary"
                    aria-label="Open on YouTube"
                  >
                    <Link2 className="size-5" />
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="pointer-events-none absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        <button
          type="button"
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-950 shadow-sm backdrop-blur transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary disabled:opacity-40 dark:border-white/20 dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex <= 0}
          aria-label="Previous Short"
        >
          <ChevronUp className="size-5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-stone-200 bg-white/90 text-stone-950 shadow-sm backdrop-blur transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary disabled:opacity-40 dark:border-white/20 dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex >= shorts.length - 1}
          aria-label="Next Short"
        >
          <ChevronDown className="size-5" />
        </button>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 z-30 rounded-md border border-stone-200 bg-white/90 px-2 py-1 text-xs text-stone-700 shadow-sm backdrop-blur dark:border-transparent dark:bg-black/50 dark:text-white/80">
        {activeIndex + 1} / {shorts.length}
        {shareStatus ? (
          <span className="ml-2 text-brandPrimary dark:text-orange-300">{shareStatus}</span>
        ) : null}
      </div>

      <p className="sr-only">
        Use arrow keys, mouse wheel, or swipe to move between Shorts. Press M to mute or unmute.
        Playback uses the official YouTube IFrame Player so views count on YouTube.
      </p>
    </div>
  )
}
