'use client'
import { cn } from 'lib/utils'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'

import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
}

interface NavItemsProps {
  items: {
    name: string
    link: string
  }[]
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const Navbar = ({ children, className }: NavbarProps) => {
  return <div className={cn('sticky inset-x-0 top-0 z-40 w-full', className)}>{children}</div>
}

export const NavBody = ({ children, className }: NavBodyProps) => {
  return (
    <div
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-6xl flex-row items-center justify-between self-start px-4 py-2.5 lg:flex',
        className
      )}
    >
      {children}
    </div>
  )
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  return (
    <div
      className={cn(
        'inset-0 hidden flex-1 flex-row items-center justify-center gap-1 text-sm font-medium text-stone-600 lg:flex',
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onClick={onItemClick}
          className="rounded-md px-3 py-1.5 text-stone-600 transition hover:bg-stone-100 hover:text-brandPrimary dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-orange-300"
          key={`link-${idx}`}
          href={item.link}
          target={item.link.startsWith('https') ? '_blank' : undefined}
          rel={item.link.startsWith('https') ? 'noopener noreferrer' : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <div
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-2 py-2 lg:hidden',
        className
      )}
    >
      {children}
    </div>
  )
}

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  )
}

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute inset-x-0 top-14 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-ui border border-stone-200 bg-white px-4 py-8 shadow-sm dark:border-stone-800 dark:bg-stone-950',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className="flex items-center justify-center rounded-md p-2 hover:bg-stone-100 dark:hover:bg-stone-800"
    >
      {isOpen ? (
        <IconX className="text-stone-900 dark:text-stone-50" />
      ) : (
        <IconMenu2 className="text-stone-900 dark:text-stone-50" />
      )}
    </button>
  )
}

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="z-20 flex items-center gap-1.5 text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50"
    >
      <Image
        className="size-8 flex-shrink-0"
        src="/static/images/logo.png"
        alt="OpenLIT logo"
        priority
        width={32}
        height={32}
      />
      {siteMetadata.headerTitle}
    </Link>
  )
}

export const NavbarButton = ({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  ...props
}: {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
} & (React.ComponentPropsWithoutRef<'a'> | React.ComponentPropsWithoutRef<'button'>)) => {
  const baseStyles =
    'px-4 py-2 rounded-md text-sm font-medium relative cursor-pointer transition duration-200 inline-block text-center'

  const variantStyles = {
    primary: 'bg-brandPrimary text-white hover:bg-primary-700',
    secondary:
      'bg-white text-stone-800 border border-stone-200 hover:border-brandPrimary/40 hover:text-brandPrimary dark:bg-stone-900 dark:text-stone-100 dark:border-stone-700',
    dark: 'bg-stone-900 text-white',
    gradient: 'bg-brandPrimary text-white',
  }

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
