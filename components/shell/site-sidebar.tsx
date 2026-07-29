'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  BookText,
  ChevronsUpDown,
  Github,
  Home,
  Info,
  Moon,
  Newspaper,
  Search,
  Sun,
  Tag,
} from 'lucide-react'
import { cn } from 'lib/utils'
import { useSidebarLayout } from './sidebar-layout-context'
import { useSiteSearch } from './site-search'
import { useTheme } from '@/components/theme-toggle'
import Otter from '@/components/icons/otter'
import siteMetadata from '@/data/siteMetadata'

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
] as const

function CollapsedLabel({ label, show }: { label: string; show: boolean }) {
  if (!show) return null
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md border border-stone-200 bg-white px-2 py-1 text-xs font-medium text-stone-900 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
    >
      {label}
    </span>
  )
}

function SidebarAccount() {
  const { isExpanded } = useSidebarLayout()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  return (
    <div
      ref={rootRef}
      className="relative mt-auto border-t border-stone-200 p-2 dark:border-stone-800"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={!isExpanded ? 'Otter' : undefined}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'group relative flex w-full items-center gap-2 overflow-visible rounded-md border border-transparent px-2 py-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-900 dark:hover:text-white',
          !isExpanded && 'justify-center px-2'
        )}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-200">
          <Otter className="size-3.5" />
        </span>
        {isExpanded ? (
          <>
            <span className="grid min-w-0 flex-1 text-left text-[13px] leading-tight">
              <span className="truncate font-medium text-stone-900 dark:text-stone-50">Otter</span>
              <span className="truncate text-xs text-stone-500 dark:text-stone-400">
                {siteMetadata.email}
              </span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0" />
          </>
        ) : (
          <CollapsedLabel label="Otter" show />
        )}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute bottom-[calc(100%-0.25rem)] left-2 z-50 w-[calc(100%-1rem)] min-w-48 rounded-lg border border-stone-200 bg-white p-1 shadow-lg dark:border-stone-700 dark:bg-stone-950"
        >
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
            onClick={() => {
              toggleTheme()
              setOpen(false)
            }}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <a
            role="menuitem"
            href={siteMetadata.siteRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-900"
            onClick={() => setOpen(false)}
          >
            <Github className="size-4" />
            GitHub
          </a>
        </div>
      ) : null}
    </div>
  )
}

function NavItemShell({
  className,
  children,
  label,
  showLabel,
}: {
  className: string
  children: ReactNode
  label: string
  showLabel: boolean
}) {
  return (
    <span className={cn('group relative block', showLabel && 'overflow-visible')}>
      <span className={className}>{children}</span>
      <CollapsedLabel label={label} show={showLabel} />
    </span>
  )
}

export default function SiteSidebar() {
  const pathname = usePathname() || '/'
  const { isExpanded } = useSidebarLayout()
  const { openSearch } = useSiteSearch()
  const showCollapsedLabels = !isExpanded

  return (
    <aside className="flex h-full flex-col overflow-visible bg-white dark:bg-stone-950">
      <div className="flex flex-col gap-1 overflow-visible p-2">
        <button
          type="button"
          aria-label="Search"
          className={cn(
            'group relative flex h-9 w-full items-center gap-2 rounded-lg border border-stone-200 bg-white px-2.5 text-black transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900',
            showCollapsedLabels && 'justify-center px-2'
          )}
          onClick={openSearch}
        >
          <Search className={ICON_CLASSES} />
          {isExpanded ? (
            <>
              <span className="flex-1 text-left text-[13px] font-medium">Search</span>
              <kbd className="rounded border border-stone-200 px-1 text-[10px] text-black/50 dark:border-stone-700 dark:text-white/50">
                ⌘K
              </kbd>
            </>
          ) : (
            <CollapsedLabel label="Search" show />
          )}
        </button>
      </div>

      <nav
        aria-label="Primary"
        className={cn(
          'flex flex-1 flex-col gap-0.5 px-2 pb-2',
          isExpanded ? 'overflow-y-auto' : 'overflow-visible'
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = item.match(pathname)
          const className = cn(
            'flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-colors',
            showCollapsedLabels && 'justify-center px-2',
            active
              ? 'bg-stone-100 text-black dark:bg-stone-900 dark:text-white'
              : 'text-black hover:bg-stone-100 dark:text-white dark:hover:bg-stone-900'
          )
          const Icon = item.icon
          const content = (
            <>
              <Icon className={ICON_CLASSES} />
              <span className={cn('min-w-0 truncate', showCollapsedLabels && 'sr-only')}>
                {item.label}
              </span>
            </>
          )

          if ('external' in item && item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={cn('group relative', className)}
              >
                {content}
                <CollapsedLabel label={item.label} show={showCollapsedLabels} />
              </a>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className={cn('group relative', className)}
            >
              {content}
              <CollapsedLabel label={item.label} show={showCollapsedLabels} />
            </Link>
          )
        })}
      </nav>

      <SidebarAccount />
    </aside>
  )
}
