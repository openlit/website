'use client'
import siteMetadata from 'data/siteMetadata'
import headerNavLinks from 'data/headerNavLinks.js'
import Link from '@/components/common/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { buttonVariants } from '../ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import ThemeToggle from '../theme-toggle'
import Image from 'next/image'
import { Slack } from '../social-icons/icons'
import GithubStar from '../social-icons/github-star'
import { organisationSchema, applicationSchema, webpageSchema, faqSchema } from '../structuredData'

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
      name: 'About us',
      link: '/about-us',
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
    <header className="sticky top-0 z-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="z-20 flex items-center gap-4">
            <a
              href={siteMetadata.slack}
              target="_blank"
              className={`w-[150px] ${buttonVariants({
                variant: 'ghost',
              })}`}
            >
              <span className="mr-2">Join us on </span>
              <Slack className="h-6 w-6" />
            </a>
            <GithubStar />
            <ThemeToggle />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
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
                className="relative"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col items-center gap-4">
              <a
                href={siteMetadata.slack}
                target="_blank"
                className={`w-[150px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                <span className="mr-2">Join us on </span>
                <Slack className="h-6 w-6" />
              </a>
              <GithubStar />
              <ThemeToggle showLabel />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  )
}
