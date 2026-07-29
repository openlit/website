'use client'

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
import { useRouter } from 'next/navigation'
import { FileText, BookOpen, GitCompare, Search as SearchIcon, Layout } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { STATIC_SEARCH_ITEMS, matchesSearch, type SearchItem } from 'lib/search-index'
import { cn } from 'lib/utils'

type SearchContextValue = {
  openSearch: () => void
  closeSearch: () => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function useSiteSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSiteSearch must be used within SiteSearchProvider')
  }
  return context
}

const CATEGORY_ICON = {
  Page: Layout,
  Blog: FileText,
  Compare: GitCompare,
  Docs: BookOpen,
} as const

function SearchDialog({
  open,
  onOpenChange,
  items,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: SearchItem[]
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const results = useMemo(() => {
    const filtered = items.filter((item) => matchesSearch(item, query))
    return filtered.slice(0, 40)
  }, [items, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const goTo = useCallback(
    (item: SearchItem) => {
      onOpenChange(false)
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
        return
      }
      router.push(item.href)
    },
    [onOpenChange, router]
  )

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          inputRef.current?.focus()
        }}
        className="gap-0 overflow-hidden border-stone-200 bg-white p-0 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 dark:border-stone-800 dark:bg-black sm:max-w-xl"
      >
        <DialogTitle className="sr-only">Search the website</DialogTitle>
        <div className="flex items-center gap-2 border-b border-stone-200 px-3 dark:border-stone-800">
          <SearchIcon className="size-4 shrink-0 text-black dark:text-white" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)))
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((index) => Math.max(index - 1, 0))
              } else if (event.key === 'Enter' && results[activeIndex]) {
                event.preventDefault()
                goTo(results[activeIndex])
              }
            }}
            placeholder="Search pages, blogs, comparisons…"
            className="h-12 w-full bg-transparent text-sm text-black outline-none ring-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:text-white"
          />
          <kbd className="hidden rounded border border-stone-200 px-1.5 py-0.5 text-[10px] text-stone-500 dark:border-stone-700 sm:inline">
            esc
          </kbd>
        </div>

        <div className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-black dark:text-white">
              No results for “{query}”
            </p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {results.map((item, index) => {
                const Icon = CATEGORY_ICON[item.category]
                const active = index === activeIndex
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => goTo(item)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition',
                        active
                          ? 'bg-stone-100 dark:bg-stone-900'
                          : 'hover:bg-stone-50 dark:hover:bg-stone-900/70'
                      )}
                    >
                      <Icon className="mt-0.5 size-4 shrink-0 text-black dark:text-white" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-black dark:text-white">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 line-clamp-1 block text-xs text-black/70 dark:text-white/70">
                            {item.description}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-black/50 dark:text-white/50">
                        {item.category}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SiteSearchProvider({
  children,
  blogItems = [],
}: {
  children: ReactNode
  blogItems?: SearchItem[]
}) {
  const [open, setOpen] = useState(false)
  const items = useMemo(() => [...STATIC_SEARCH_ITEMS, ...blogItems], [blogItems])

  const openSearch = useCallback(() => setOpen(true), [])
  const closeSearch = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value = useMemo(() => ({ openSearch, closeSearch }), [openSearch, closeSearch])

  return (
    <SearchContext.Provider value={value}>
      {children}
      {open ? <SearchDialog open={open} onOpenChange={setOpen} items={items} /> : null}
    </SearchContext.Provider>
  )
}
