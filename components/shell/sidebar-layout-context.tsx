'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { cn } from 'lib/utils'

type SidebarLayoutContextValue = {
  isExpanded: boolean
  toggleSidebar: () => void
  sidebarWidthClass: string
}

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(null)

export function SidebarLayoutProvider({ children }: { children: ReactNode }) {
  // Match product screenshot: icon rail collapsed by default on marketing site
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsExpanded((value) => !value)
  }, [])

  const value = useMemo(
    () => ({
      isExpanded,
      toggleSidebar,
      sidebarWidthClass: isExpanded ? 'w-64' : 'w-16',
    }),
    [isExpanded, toggleSidebar]
  )

  return <SidebarLayoutContext.Provider value={value}>{children}</SidebarLayoutContext.Provider>
}

export function useSidebarLayout() {
  const context = useContext(SidebarLayoutContext)
  if (!context) {
    throw new Error('useSidebarLayout must be used within SidebarLayoutProvider')
  }
  return context
}

export const SITE_TOP_BAR_CLASS = 'flex h-11 shrink-0 items-center'

export function siteTopBarClassName(className?: string) {
  return cn(SITE_TOP_BAR_CLASS, className)
}
