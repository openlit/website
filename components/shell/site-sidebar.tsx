'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookText,
  GitCompare,
  Home,
  Info,
  LayoutDashboard,
  Newspaper,
  Search,
  Tag,
} from 'lucide-react'
import { cn } from 'lib/utils'
import { useSidebarLayout } from './sidebar-layout-context'
import { useSiteSearch } from './site-search'
import ThemeToggle from '@/components/theme-toggle'
import Otter from '@/components/icons/otter'

const ICON_CLASSES = 'size-4 shrink-0'

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home, match: (path: string) => path === '/' },
  {
    label: 'Pricing',
    href: '/pricing',
    icon: Tag,
    match: (path: string) => path.startsWith('/pricing'),
  },
  {
    label: 'Compare',
    href: '/compare',
    icon: GitCompare,
    match: (path: string) => path.startsWith('/compare'),
  },
  {
    label: 'Blogs',
    href: '/blogs',
    icon: Newspaper,
    match: (path: string) => path.startsWith('/blogs'),
  },
  {
    label: 'About',
    href: '/about-us',
    icon: Info,
    match: (path: string) => path.startsWith('/about-us'),
  },
  {
    label: 'Docs',
    href: 'https://docs.openlit.io/latest/overview',
    icon: BookText,
    external: true,
    match: () => false,
  },
  {
    label: 'Dashboards',
    href: 'https://docs.openlit.io/latest/openlit/dashboards/overview',
    icon: LayoutDashboard,
    external: true,
    match: () => false,
  },
] as const

export default function SiteSidebar() {
  const pathname = usePathname() || '/'
  const { isExpanded } = useSidebarLayout()
  const { openSearch } = useSiteSearch()

  return (
    <aside className="flex h-full flex-col bg-white dark:bg-stone-950">
      <div className="flex flex-col gap-1 p-2">
        <button
          type="button"
          aria-label="Search website"
          className={cn(
            'flex h-9 items-center gap-2 rounded-lg border border-stone-200 bg-white px-2.5 text-black transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900',
            !isExpanded && 'justify-center px-2'
          )}
          onClick={openSearch}
        >
          <Search className={ICON_CLASSES} />
          {isExpanded && (
            <>
              <span className="flex-1 text-left text-[13px] font-medium">Search</span>
              <kbd className="rounded border border-stone-200 px-1 text-[10px] text-black/50 dark:border-stone-700 dark:text-white/50">
                ⌘K
              </kbd>
            </>
          )}
        </button>
      </div>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 pb-2">
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname)
          const className = cn(
            'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors',
            !isExpanded && 'justify-center px-2',
            active
              ? 'bg-stone-100 text-black dark:bg-stone-900 dark:text-white'
              : 'text-black hover:bg-stone-100 dark:text-white dark:hover:bg-stone-900'
          )
          const Icon = item.icon
          const content = (
            <>
              <Icon className={ICON_CLASSES} />
              <span className={cn('min-w-0 truncate', !isExpanded && 'sr-only')}>{item.label}</span>
            </>
          )

          if ('external' in item && item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                title={!isExpanded ? item.label : undefined}
              >
                {content}
              </a>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={className}
              title={!isExpanded ? item.label : undefined}
            >
              {content}
            </Link>
          )
        })}
      </nav>

      <div
        className={cn(
          'mt-auto flex items-center border-t border-stone-200 p-2 dark:border-stone-800',
          isExpanded ? 'justify-between' : 'justify-center'
        )}
      >
        <div
          className="flex size-9 items-center justify-center rounded-full bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-200"
          title="Otter"
          aria-label="Otter"
        >
          <Otter className="size-5" />
        </div>
        {isExpanded && (
          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        )}
      </div>
    </aside>
  )
}
