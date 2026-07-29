import type { ReactNode } from 'react'
import { cn } from 'lib/utils'

export function MarkerUnderline({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-x-[-2%] bottom-[-0.08em] h-[0.28em] w-[104%] overflow-visible',
        className
      )}
      viewBox="0 0 200 18"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2.2 11.4
           C 18 8.2, 34 13.8, 52 10.6
           C 68 8.1, 84 13.2, 102 10.1
           C 122 6.8, 142 12.6, 162 9.4
           C 176 7.6, 188 10.8, 197.5 8.9
           L 198.2 13.6
           C 186 15.8, 172 12.4, 158 14.2
           C 138 16.6, 118 11.8, 98 14.4
           C 80 16.6, 62 12.2, 44 14.8
           C 28 16.8, 14 13.6, 1.8 15.1
           Z"
        fill="#F36C06"
        opacity="0.92"
      />
    </svg>
  )
}

/** Wraps a word/phrase with the hero-style orange brush underline. */
export function MarkedWord({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn('relative inline-block whitespace-nowrap', className)}>
      {children}
      <MarkerUnderline />
    </span>
  )
}
