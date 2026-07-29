import type { ReactNode } from 'react'

type FeaturePageHeaderProps = {
  eyebrow: string
  title: string
  icon: ReactNode
  tone?: string
  leading?: ReactNode
  actions?: ReactNode
}

/**
 * Product-style page title bar (matches OpenLIT FeaturePageHeader).
 * Compact: icon + uppercase eyebrow + title, optional actions on the right.
 */
export default function FeaturePageHeader({
  eyebrow,
  title,
  icon,
  tone = 'border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200',
  leading,
  actions,
}: FeaturePageHeaderProps) {
  return (
    <section className="border-b border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-stone-950 md:px-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {leading ? <div className="shrink-0">{leading}</div> : null}
            <span
              className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md border p-1.5 ${tone}`}
            >
              {icon}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-stone-500 dark:text-stone-400">
                {eyebrow}
              </p>
              <h1 className="truncate text-sm font-semibold leading-tight text-stone-950 dark:text-stone-50">
                {title}
              </h1>
            </div>
          </div>
        </div>
        {actions ? (
          <div className="flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-2">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  )
}
