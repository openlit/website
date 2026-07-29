'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export type HarnessStage = {
  label: string
  phase: 'develop' | 'produce'
  items: string[]
  video?: string
  icon?: string
}

export const HARNESS_STAGES: HarnessStage[] = [
  {
    label: 'Instrument',
    phase: 'develop',
    items: ['No-code instrumentation', 'GPU Collector', 'OTel Native SDKs'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/observe-overview.mp4',
    icon: '/static/images/integrations/opentelemetry.svg',
  },
  {
    label: 'Develop',
    phase: 'develop',
    items: ['Prompt Hub', 'Openground'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/prompts-overview.mp4',
  },
  {
    label: 'Manage',
    phase: 'develop',
    items: ['Vault', 'API Keys'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/secrets-overview.mp4',
  },
  {
    label: 'Observe',
    phase: 'produce',
    items: ['Coding Agents', 'Cost', 'Tools'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/observe-overview.mp4',
  },
  {
    label: 'Improve',
    phase: 'produce',
    items: ['Evals', 'Guardrails', 'Otter'],
    video: 'https://mintlify.s3.us-west-1.amazonaws.com/openlit/images/evaluations-overview.mp4',
  },
]

function Card({
  label,
  icon,
  active = false,
  dimmed = false,
  onClick,
  className = '',
}: {
  label: string
  icon?: string
  active?: boolean
  dimmed?: boolean
  onClick?: () => void
  className?: string
}) {
  const classes = [
    'flex flex-col justify-between border bg-white p-2.5 text-left transition dark:bg-stone-950 sm:p-3',
    active
      ? 'border-[#F36C06] shadow-[3px_3px_0_0_rgba(243,108,6,0.28)]'
      : 'border-stone-300 shadow-[3px_3px_0_0_rgba(243,108,6,0.18)] dark:border-stone-600',
    dimmed ? 'opacity-40' : 'opacity-100',
    onClick ? 'cursor-pointer hover:border-[#F36C06]/70' : '',
    className,
  ].join(' ')

  const body = (
    <>
      <div className="flex items-start justify-between gap-1.5">
        <span className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-wide text-stone-800 dark:text-stone-100 sm:text-[10px]">
          {label}
        </span>
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt=""
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
          />
        ) : null}
      </div>
      <span className="mt-2 h-1 w-5 rounded-full bg-[#F36C06]/75 sm:w-6" />
    </>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={active}>
        {body}
      </button>
    )
  }

  return <div className={classes}>{body}</div>
}

function ZoneVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const video = ref.current
    const slot = slotRef.current
    if (!video || !slot) return

    const fit = () => {
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return

      const sw = slot.clientWidth
      const sh = slot.clientHeight
      if (!sw || !sh) return

      const scale = Math.min(sw / vw, sh / vh)
      setBox({
        width: Math.round(vw * scale),
        height: Math.round(vh * scale),
      })
    }

    const onMeta = () => {
      fit()
      video.currentTime = 0
      void video.play().catch(() => {})
    }

    video.addEventListener('loadedmetadata', onMeta)
    if (video.readyState >= 1) onMeta()

    const ro = new ResizeObserver(fit)
    ro.observe(slot)

    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      ro.disconnect()
    }
  }, [src])

  return (
    <div ref={slotRef} className="flex h-full min-h-0 w-full items-center justify-center">
      <div
        className="overflow-hidden rounded-sm border border-stone-200 bg-white dark:border-stone-600 dark:bg-stone-900"
        style={
          box
            ? { width: box.width, height: box.height }
            : { width: 'min(100%, 640px)', aspectRatio: '16 / 9' }
        }
      >
        <video
          ref={ref}
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="block h-full w-full"
          aria-label={`${label} overview`}
        />
      </div>
    </div>
  )
}

export function BrowserChrome({
  children,
  url = 'app.openlit.io',
}: {
  children: ReactNode
  url?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_20px_50px_-24px_rgba(28,25,23,0.35)] dark:border-stone-800 dark:bg-stone-950 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)]">
      <div className="flex items-center gap-2 border-b border-stone-200 px-3 py-2 dark:border-stone-800">
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
        <span className="ml-2 truncate text-xs text-black/60 dark:text-white/60">{url}</span>
      </div>
      {children}
    </div>
  )
}

function MobileHarness({
  activeLabel,
  onToggle,
}: {
  activeLabel: string | null
  onToggle: (label: string) => void
}) {
  const activeStage = HARNESS_STAGES.find((s) => s.label === activeLabel) ?? null

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950 sm:p-4 lg:hidden">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-stone-500">
        <span>Development</span>
        <span>Production</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {HARNESS_STAGES.map((stage) => {
          const isActive = activeLabel === stage.label
          return (
            <Card
              key={stage.label}
              label={stage.label}
              icon={stage.icon}
              active={isActive}
              dimmed={Boolean(activeLabel && !isActive)}
              onClick={() => onToggle(stage.label)}
              className="min-h-[3.5rem]"
            />
          )
        })}
      </div>

      <div className="min-h-[12rem] overflow-hidden rounded-sm border border-dashed border-stone-300/70 dark:border-stone-600/60">
        {activeStage?.video ? (
          <div className="flex h-full min-h-[12rem] flex-col gap-3 p-2 sm:p-3">
            <div className="min-h-[10rem] flex-1">
              <ZoneVideo src={activeStage.video} label={activeStage.label} />
            </div>
            {activeStage.items.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {activeStage.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-stone-300 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-stone-700 dark:border-stone-600 dark:bg-stone-950 dark:text-stone-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex min-h-[12rem] items-center justify-center px-4">
            <p className="text-center text-xs text-stone-400">Select a stage to preview</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DesktopHarness({
  activeLabel,
  onToggle,
  onDismiss,
}: {
  activeLabel: string | null
  onToggle: (label: string) => void
  onDismiss?: () => void
}) {
  const activeStage = HARNESS_STAGES.find((s) => s.label === activeLabel) ?? null

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- non-interactive dismiss surface
    <div
      role="presentation"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('[data-harness-keep]')) return
        onDismiss?.()
      }}
      className="relative hidden aspect-[16/9] min-h-[26rem] overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950 lg:block"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(168,162,158,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,162,158,0.12) 1px, transparent 1px)',
        backgroundSize: '64px 40px',
      }}
    >
      <div className="pointer-events-none absolute inset-x-3 top-[10%] z-0 grid h-[28%] grid-cols-5 gap-1.5 sm:inset-x-4 sm:gap-2">
        <div className="col-span-3 rounded-sm border border-dashed border-stone-200 bg-white/70 dark:border-stone-600/60 dark:bg-stone-950/25" />
        <div className="col-span-2 rounded-sm border border-dashed border-stone-200 bg-white/70 dark:border-stone-600/60 dark:bg-stone-950/25" />
      </div>
      <div className="pointer-events-none absolute inset-x-3 top-[34%] z-20 grid grid-cols-5 gap-1.5 font-mono text-[8px] uppercase tracking-wider text-stone-500 sm:inset-x-4 sm:gap-2 sm:text-[10px]">
        <div className="col-span-3 text-center">Development</div>
        <div className="col-span-2 text-center">Production</div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[20%] h-8 -translate-y-1/2 bg-[#F36C06]/30 sm:h-10"
      />

      <div
        data-harness-keep
        className="absolute inset-x-3 top-[12%] z-10 grid grid-cols-5 gap-1.5 sm:inset-x-4 sm:gap-2"
      >
        {HARNESS_STAGES.map((stage) => {
          const isActive = activeLabel === stage.label
          return (
            <Card
              key={stage.label}
              label={stage.label}
              icon={stage.icon}
              active={isActive}
              dimmed={Boolean(activeLabel && !isActive)}
              onClick={() => onToggle(stage.label)}
              className="h-[3.75rem] sm:h-[4.5rem]"
            />
          )
        })}
      </div>

      <div className="absolute inset-x-3 bottom-[6%] top-[42%] z-10 sm:inset-x-4">
        {activeStage && activeStage.video ? (
          <div data-harness-keep className="flex h-full min-h-0 gap-2 sm:gap-3">
            <div className="min-h-0 min-w-0 flex-1">
              <ZoneVideo src={activeStage.video} label={activeStage.label} />
            </div>
            {activeStage.items.length > 0 ? (
              <div className="flex w-[5rem] shrink-0 flex-col gap-1.5 sm:w-[6.5rem] lg:w-[7.5rem]">
                {activeStage.items.map((item) => (
                  <Card key={item} label={item} className="min-h-0 flex-1 p-1.5 sm:p-2" />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-sm border border-dashed border-stone-300/70 dark:border-stone-600/60">
            <p className="pointer-events-none text-xs text-stone-400">Select a stage to preview</p>
          </div>
        )}
      </div>
    </div>
  )
}

/** Interactive harness: stacked below lg, canvas on laptop+. */
export function HarnessCanvas({
  activeLabel,
  onToggle,
  onDismiss,
}: {
  activeLabel: string | null
  onToggle: (label: string) => void
  onDismiss?: () => void
}) {
  return (
    <>
      <MobileHarness activeLabel={activeLabel} onToggle={onToggle} />
      <DesktopHarness activeLabel={activeLabel} onToggle={onToggle} onDismiss={onDismiss} />
    </>
  )
}

export function useHarnessSelection(defaultLabel: string | null = null) {
  const [activeLabel, setActiveLabel] = useState<string | null>(defaultLabel)
  const activeStage = HARNESS_STAGES.find((s) => s.label === activeLabel) ?? null
  const toggle = (label: string) => {
    setActiveLabel((current) => (current === label ? null : label))
  }
  return { activeLabel, activeStage, toggle, setActiveLabel }
}
