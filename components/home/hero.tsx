import siteMetadata from '@/data/siteMetadata'
import { Button as MovingBorder } from '../ui/moving-borders'
import { buttonVariants } from '../ui/button'
import { HeroCards } from './hero-cards'
import { GitHubLogoIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { BackgroundBeams } from '../ui/background-beams'

export default function Hero() {
  return (
    <section className="container relative z-20 grid place-items-center gap-10 pb-4 pt-20 lg:grid-cols-2">
      <BackgroundBeams className="-z-10" />
      <div className="space-y-6 text-center lg:text-start">
        <a
          href={siteMetadata.siteRepo}
          target="_blank"
          className={`z-20 m-auto flex w-max cursor-pointer items-center rounded-3xl border-[1px] border-stone-200 p-0.5 dark:border-stone-700 lg:m-0`}
        >
          <MovingBorder
            className="border-brandPrimary bg-gradient-to-br from-brandPrimary to-violet-900 text-white dark:border-brandPrimary"
            containerClassName="h-18 w-32 h-auto"
          >
            Open source
          </MovingBorder>

          <StarFilledIcon className="mx-2 h-4 w-4 text-brandPrimary" />
          <span className="mr-3 text-xs text-stone-950 dark:text-stone-100">Star us on github</span>
        </a>
        <main className="text-5xl font-bold md:text-6xl">
          <h1 className="inline">
            <span className="relative z-20 inline  bg-gradient-to-br from-brandPrimary to-violet-900 bg-clip-text text-transparent">
              {siteMetadata.headerTitle}
            </span>
          </h1>
        </main>

        <p className="text-muted-foreground relative z-20 mx-auto text-xl md:w-10/12 lg:mx-0">
          OpenTelemetry-native{' '}
          <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent">
            GenAI
          </span>{' '}
          {' & '}
          <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent">
            LLM
          </span>{' '}
          Application Observability tool
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <a
            href="https://docs.openlit.io/latest/introduction"
            target="_blank"
            className={`relative z-20 w-full md:w-1/3 ${buttonVariants({
              variant: 'default',
            })}`}
          >
            Documentation
          </a>
          <a
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`relative z-20 w-full md:w-1/3 ${buttonVariants({
              variant: 'outline',
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <HeroCards />

      {/* Shadow effect */}
      <div className="relative z-10 shadow"></div>
    </section>
  )
}
