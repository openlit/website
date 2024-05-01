'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from 'data/headerNavLinks.js'
import Link from '@/components/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { buttonVariants } from '../ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import ThemeToggle from '../theme-toggle'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-stone-950">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4 ">
          <NavigationMenuItem className="flex font-bold">
            <Link href="/" className="ml-2 flex items-center text-xl font-bold">
              <Image
                className="size-10 flex-shrink-0 p-1 transition duration-75"
                src="/static/images/logo.png"
                alt="openlit's Logo"
                priority
                width={24}
                height={24}
              />
              {siteMetadata.headerTitle}
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger className="px-2">
                <HamburgerMenuIcon className="flex h-5 w-5 md:hidden" />
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">{siteMetadata.headerTitle}</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                  {headerNavLinks
                    .filter((link) => link.href !== '/')
                    .map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className={buttonVariants({ variant: 'ghost' })}
                      >
                        {link.title}
                      </Link>
                    ))}
                  <a
                    href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: 'secondary',
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 h-5 w-5" />
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* desktop */}
          <nav className="hidden gap-2 md:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`text-[17px] ${buttonVariants({
                    variant: 'ghost',
                  })}`}
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <div className="hidden gap-2 md:flex">
            <a
              href="https://github.com/openlit/openlit"
              target="_blank"
              className={`border ${buttonVariants({ variant: 'secondary' })}`}
            >
              <GitHubLogoIcon className="mr-2 h-5 w-5" />
              Github
            </a>
            <ThemeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
