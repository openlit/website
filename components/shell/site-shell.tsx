'use client'

import type { ReactNode } from 'react'
import { cn } from 'lib/utils'
import { SidebarLayoutProvider, useSidebarLayout } from './sidebar-layout-context'
import SidebarBrand from './sidebar-brand'
import HeaderContextRow from './header-context-row'
import SiteSidebar from './site-sidebar'
import { SiteSearchProvider } from './site-search'
import type { SearchItem } from 'lib/search-index'

function SiteShellFrame({ children }: { children: ReactNode }) {
  const { sidebarWidthClass } = useSidebarLayout()

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="flex shrink-0 border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
        <div
          className={cn(
            'relative hidden shrink-0 border-r border-stone-200 dark:border-stone-800 md:block',
            sidebarWidthClass
          )}
        >
          <SidebarBrand />
        </div>
        <HeaderContextRow />
      </div>

      <div className="flex min-h-0 flex-1">
        <div
          className={cn(
            'relative z-30 hidden shrink-0 flex-col overflow-visible border-r border-stone-200 dark:border-stone-800 md:flex',
            sidebarWidthClass
          )}
        >
          <SiteSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col bg-white dark:bg-stone-950">
          <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white dark:bg-stone-950">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function SiteShell({
  children,
  blogItems = [],
}: {
  children: ReactNode
  blogItems?: SearchItem[]
}) {
  return (
    <SidebarLayoutProvider>
      <SiteSearchProvider blogItems={blogItems}>
        <SiteShellFrame>{children}</SiteShellFrame>
      </SiteSearchProvider>
    </SidebarLayoutProvider>
  )
}
