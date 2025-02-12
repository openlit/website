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

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-stone-950">
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
                <nav className="mt-4 flex flex-col items-center justify-center gap-8">
                  {headerNavLinks
                    .filter((link) => link.href !== '/')
                    .map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className={buttonVariants({ variant: 'ghost' })}
                      >
                        <b>{link.title}</b>
                      </Link>
                    ))}
                  {/* <Link
                    href={siteMetadata.feedbackLink}
                    className={buttonVariants({ variant: 'ghost' })}
                  >
                    Feedback
                  </Link> */}
                  <a
                    href={siteMetadata.slack}
                    target="_blank"
                    className={`w-[150px] border ${buttonVariants({
                      variant: 'secondary',
                    })}`}
                  >
                    <span className="mr-2">Join us on </span>
                    <Slack className="h-6 w-6" />
                  </a>
                  <GithubStar />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* desktop */}
          <nav className="hidden grow justify-end gap-2 md:flex">
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
            {/* <Link href={siteMetadata.feedbackLink} className={buttonVariants({ variant: 'ghost' })}>
              Feedback
            </Link> */}
          </nav>
          <div className="hidden gap-2 md:flex">
            <a
              href={siteMetadata.slack}
              target="_blank"
              className={`${buttonVariants({ variant: 'ghost' })}`}
            >
              <span className="mr-2">Join us on </span>
              <Slack className="h-6 w-6" />
            </a>

            {/* <a
              href="https://www.producthunt.com/posts/openlit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-openlit"
              target="_blank"
              className={`mr-2 hidden !p-0 dark:block ${buttonVariants({ variant: 'ghost' })}`}
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=460690&theme=dark"
                alt="Openlit - One&#0032;click&#0032;observability&#0032;&#0038;&#0032;evals&#0032;for&#0032;LLMs&#0032;&#0038;&#0032;GPUs | Product Hunt"
                width="250"
                height="54"
                className="h-full w-full"
              />
            </a> */}
            <GithubStar />
            {/* <a
              href="https://github.com/openlit/openlit"
              target="_blank"
              className={``}
            >

            </a> */}
            <ThemeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
