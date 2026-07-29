import { cn } from 'lib/utils'

// Soft product-UI backdrop scoped to the main content pane
export default function Checkers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white dark:bg-stone-950">
      <div
        className={cn(
          'absolute inset-0 opacity-40',
          '[background-size:48px_48px]',
          '[background-image:linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#292524_1px,transparent_1px),linear-gradient(to_bottom,#292524_1px,transparent_1px)]'
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-orange-50/40 dark:from-stone-950 dark:via-stone-950/95 dark:to-orange-950/30" />
      <div
        className="absolute -bottom-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brandPrimary/15 blur-[100px] dark:bg-brandPrimary/25"
        style={{ animation: 'blob-float-1 10s ease-in-out infinite', willChange: 'transform' }}
      />
    </div>
  )
}
