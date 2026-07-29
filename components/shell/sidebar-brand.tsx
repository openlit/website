'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { siteTopBarClassName, useSidebarLayout } from './sidebar-layout-context'
import { cn } from 'lib/utils'

export default function SidebarBrand() {
  const { isExpanded, toggleSidebar } = useSidebarLayout()

  return (
    <div className={siteTopBarClassName('relative gap-2 px-3')}>
      <button
        type="button"
        onClick={toggleSidebar}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={isExpanded}
        className="absolute -right-3 top-1/2 z-50 flex size-6 -translate-y-1/2 items-center justify-center rounded-full border border-stone-300 bg-white p-0 text-stone-600 shadow-sm hover:bg-stone-100 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
      >
        {isExpanded ? <ChevronsLeft className="size-3.5" /> : <ChevronsRight className="size-3.5" />}
      </button>
      <Link href="/" className="flex min-w-0 items-center gap-2">
        <Image
          className="size-9 shrink-0 object-contain"
          src="/static/images/logo.png"
          alt="OpenLIT logo"
          priority
          width={36}
          height={36}
        />
        <div
          className={cn(
            'flex min-w-0 flex-1 items-center gap-1.5 transition-opacity',
            !isExpanded && 'pointer-events-none invisible opacity-0'
          )}
        >
          <p className="truncate text-lg font-semibold text-black dark:text-white">OpenLIT</p>
        </div>
      </Link>
    </div>
  )
}
