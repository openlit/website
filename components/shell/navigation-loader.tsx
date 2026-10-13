'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from 'lib/utils'
import OpenlitLoader from '@/components/common/openlit-loader'

// Wait before showing so instant (prefetched) navigations don't flash the overlay,
// then keep it up long enough to read as one gesture instead of a blink.
const SHOW_DELAY_MS = 150
const MIN_VISIBLE_MS = 400
const MAX_PENDING_MS = 12000

type NavigationLoaderContextValue = {
  /** Call before a programmatic `router.push` to an internal path. */
  start: (href: string) => void
  pending: boolean
}

const NavigationLoaderContext = createContext<NavigationLoaderContextValue | null>(null)

export function useNavigationLoader() {
  const context = useContext(NavigationLoaderContext)
  if (!context) {
    throw new Error('useNavigationLoader must be used within NavigationLoaderProvider')
  }
  return context
}

/** True when `href` is a same-origin page whose pathname differs from the current one. */
function isPageChange(href: string) {
  try {
    const url = new URL(href, window.location.href)
    return url.origin === window.location.origin && url.pathname !== window.location.pathname
  } catch {
    return false
  }
}

function isPlainLeftClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

export function NavigationLoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [pending, setPending] = useState(false)
  const [visible, setVisible] = useState(false)
  const shownAt = useRef(0)
  const renderedPath = useRef(pathname)
  const showTimer = useRef<number>()
  const hideTimer = useRef<number>()
  const maxTimer = useRef<number>()

  const clearTimers = () => {
    window.clearTimeout(showTimer.current)
    window.clearTimeout(hideTimer.current)
    window.clearTimeout(maxTimer.current)
  }

  const finish = useCallback(() => {
    setPending(false)
    window.clearTimeout(showTimer.current)
    window.clearTimeout(maxTimer.current)
    const remaining = shownAt.current ? MIN_VISIBLE_MS - (Date.now() - shownAt.current) : 0
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(
      () => {
        shownAt.current = 0
        setVisible(false)
      },
      Math.max(0, remaining)
    )
  }, [])

  const begin = useCallback(() => {
    clearTimers()
    setPending(true)
    showTimer.current = window.setTimeout(() => {
      shownAt.current = Date.now()
      setVisible(true)
    }, SHOW_DELAY_MS)
    // Never leave the overlay up if a navigation is cancelled or fails.
    maxTimer.current = window.setTimeout(finish, MAX_PENDING_MS)
  }, [finish])

  const start = useCallback(
    (href: string) => {
      if (isPageChange(href)) begin()
    },
    [begin]
  )

  // The new route has rendered.
  useEffect(() => {
    renderedPath.current = pathname
    finish()
  }, [pathname, finish])

  useEffect(() => {
    // Capture phase: next/link calls preventDefault in its own handler, so this has to
    // run first and apply the same checks Link uses to decide on a client navigation.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || !isPlainLeftClick(event)) return
      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor || !anchor.href) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return
      if (isPageChange(anchor.href)) begin()
    }
    // Back/forward: the URL has already changed, so compare against what is rendered.
    const onPopState = () => {
      if (window.location.pathname !== renderedPath.current) begin()
    }

    document.addEventListener('click', onClick, true)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', onPopState)
      clearTimers()
    }
  }, [begin])

  const value = useMemo(() => ({ start, pending }), [start, pending])

  return (
    <NavigationLoaderContext.Provider value={value}>
      {children}
      <NavigationLoaderOverlay visible={visible} />
    </NavigationLoaderContext.Provider>
  )
}

function NavigationLoaderOverlay({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white/85 backdrop-blur-sm transition-opacity duration-200 dark:bg-stone-950/85',
        visible ? 'pointer-events-auto opacity-100' : 'opacity-0'
      )}
    >
      {visible ? <OpenlitLoader size={72} label="Loading page" /> : null}
    </div>
  )
}
