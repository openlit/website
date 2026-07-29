'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import ThemeToggle from '@/components/theme-toggle'
import GithubStar from '@/components/social-icons/github-star'
import { siteTopBarClassName } from './sidebar-layout-context'
import { cn } from 'lib/utils'

const MOBILE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about-us' },
  { label: 'Docs', href: 'https://docs.openlit.io/latest/overview', external: true },
]

function ScopeSeparator() {
  return <span className="text-xs text-black/40 dark:text-white/40">/</span>
}

function ScopeItem({
  label,
  href,
  current = false,
  showChevron = false,
}: {
  label: string
  href?: string
  current?: boolean
  showChevron?: boolean
}) {
  const className = cn(
    'inline-flex max-w-52 items-center gap-1 truncate text-xs font-medium transition',
    current
      ? 'font-semibold text-black dark:text-white'
      : 'text-black hover:opacity-70 dark:text-white'
  )

  const content = (
    <>
      <span className="truncate">{label}</span>
      {showChevron && <ChevronDown className="size-3 shrink-0 opacity-50" />}
    </>
  )

  if (href && !current) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return <span className={className}>{content}</span>
}

function pageLabel(pathname: string) {
  if (pathname === '/') return 'Home'
  if (pathname.startsWith('/pricing')) return 'Pricing'
  if (pathname.startsWith('/compare')) return 'Compare'
  if (pathname.startsWith('/blogs')) return 'Blogs'
  if (pathname.startsWith('/about-us')) return 'About Us'
  if (pathname.startsWith('/privacy-policy')) return 'Privacy Policy'
  if (pathname.startsWith('/terms')) return 'Terms'
  const segment = pathname.split('/').filter(Boolean).pop()
  if (!segment) return 'Home'
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function HeaderContextRow() {
  const pathname = usePathname() || '/'
  const current = pageLabel(pathname)
  const [mobileOpen, setMobileOpen] = useState(false)

  const trail = [
    { label: 'Open Source', href: '/', showChevron: true },
    { label: 'Website', href: '/', showChevron: true },
    { label: current, current: true },
  ]

  return (
    <div className="relative flex min-w-0 flex-1 flex-col">
      <div
        className={siteTopBarClassName(
          'min-w-0 flex-1 items-center gap-x-3 gap-y-0.5 bg-white pl-3 pr-3 dark:bg-stone-950 md:pl-6'
        )}
      >
        <Link href="/" className="mr-1 flex shrink-0 items-center md:hidden">
          <Image
            src="/static/images/logo.png"
            alt="OpenLIT"
            width={28}
            height={28}
            className="size-7 object-contain"
          />
        </Link>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5"
        >
          {trail.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <ScopeSeparator />}
              <ScopeItem
                label={item.label}
                href={item.href}
                current={item.current}
                showChevron={item.showChevron}
              />
            </Fragment>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <GithubStar />
            <ThemeToggle />
          </div>
          <a
            href="https://docs.openlit.io/latest/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}
          >
            Get Started
          </a>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-md border border-stone-200 text-stone-700 md:hidden dark:border-stone-700 dark:text-stone-200"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-11 z-50 border-b border-stone-200 bg-white p-3 shadow-sm md:hidden dark:border-stone-800 dark:bg-stone-950">
          <div className="flex flex-col gap-1">
            {MOBILE_LINKS.map((item) => {
              const className =
                'rounded-lg px-3 py-2 text-sm font-medium text-black hover:bg-stone-100 dark:text-white dark:hover:bg-stone-900'
              if ('external' in item && item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className={className}
                  >
                    {item.label}
                  </a>
                )
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={className}
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href="https://docs.openlit.io/latest/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'sm' }), 'mt-2')}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
