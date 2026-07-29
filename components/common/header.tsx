'use client'
import siteMetadata from 'data/siteMetadata'
import { buttonVariants } from '../ui/button'
import ThemeToggle from '../theme-toggle'
import { Slack } from '../social-icons/icons'
import GithubStar from '../social-icons/github-star'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar'
import { useState } from 'react'

export default function Header() {
  const navItems = [
    {
      name: 'Pricing',
      link: '/pricing',
    },
    {
      name: 'Compare',
      link: '/compare',
    },
    {
      name: 'Blogs',
      link: '/blogs',
    },
    {
      name: 'Docs',
      link: 'https://docs.openlit.io/latest/overview',
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/90">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="z-20 flex items-center gap-2">
            <a
              href={siteMetadata.slack}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden xl:inline-flex ${buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}`}
            >
              <span className="mr-2">Join us on </span>
              <Slack className="h-5 w-5" />
            </a>
            <GithubStar />
            <ThemeToggle />
            <a
              href="https://docs.openlit.io/latest/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: 'sm' })}
            >
              Get Started
            </a>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="items-center"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative block px-4 py-3 text-stone-700 dark:text-stone-200"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col items-center gap-4">
              <a
                href={siteMetadata.slack}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-[150px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                <span className="mr-2">Join us on </span>
                <Slack className="h-6 w-6" />
              </a>
              <GithubStar />
              <ThemeToggle showLabel />
              <a
                href="https://docs.openlit.io/latest/quickstart"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants()}
              >
                Get Started
              </a>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  )
}
