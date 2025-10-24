import siteMetadata from 'data/siteMetadata'
import { Button as MovingBorder } from '../ui/moving-borders'
import { StarFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { FlipWords } from '../ui/flip-words'
import { buttonVariants } from '../ui/button'
import GithubStar from '../social-icons/github-star'

export default function Hero() {
  const words = ['Connect', 'Monitor', 'Explore']
  return (
    <section className="relative mb-10 flex min-h-screen w-full flex-col overflow-hidden pt-20 md:pt-40">
      <div className="flex justify-center">
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
      </div>
      <h1 className="relative z-10 mx-auto mt-6 max-w-6xl text-center text-2xl font-semibold md:text-4xl lg:text-8xl">
        <FlipWords words={words} />
        <strong> LLMs & GenAI with </strong>
        <strong className="text-brandPrimary">OpenLIT</strong>
      </h1>
      <p className="text-muted dark:text-muted-dark relative z-10 mx-auto mt-6 max-w-3xl text-center text-base md:text-xl">
        <strong>Open Source Platform for AI Engineering</strong>
      </p>
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4">
        <GithubStar />
        {/* <a
          href={siteMetadata.siteRepo}
          target="_blank"
          className={`relative z-10 flex items-center justify-center rounded-full border border-transparent bg-neutral-900 px-6 py-2 text-sm font-medium text-white shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] transition duration-200 hover:bg-black/90 md:text-sm`}
        >
          Github Repository
          <GitHubLogoIcon className="ml-2 h-5 w-5" />
        </a> */}
        <a
          href="https://docs.openlit.io/latest/overview"
          target="_blank"
          className={`group relative z-10 flex items-center justify-center space-x-2 rounded-full border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-black transition duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-800 dark:hover:shadow-xl md:text-sm`}
        >
          <b>Documentation</b>

          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="text-muted dark:text-muted-dark h-3 w-3 stroke-[1px] transition-transform duration-200 group-hover:translate-x-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-8 text-2xl">
        <a
          href="https://www.producthunt.com/posts/openlit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-openlit"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=460690&theme=light"
            alt="Openlit - One&#0032;click&#0032;observability&#0032;&#0038;&#0032;evals&#0032;for&#0032;LLMs&#0032;&#0038;&#0032;GPUs | Product Hunt"
            className="h-[54px]"
          />
        </a>
        <a href="https://fazier.com/launches/openlit-2" target="_blank" rel="noopener noreferrer">
          <img
            src="https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=779&badge_type=daily"
            alt="Openlit Fazier"
            className="h-full rounded"
          />
        </a>
      </div>
      <div className="relative mt-40  p-4">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full scale-[1.1] bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black"></div>
        <div className="rounded-[24px] border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-black">
          <Image
            alt="header"
            loading="lazy"
            width="1920"
            height="1080"
            decoding="async"
            data-nimg="1"
            className="w-full  dark:hidden"
            src="/static/images/previews/dashboard.png"
          />
          <Image
            alt="header"
            loading="lazy"
            width="1920"
            height="1080"
            decoding="async"
            data-nimg="1"
            className="hidden w-full  dark:block"
            src="/static/images/previews/dashboard-dark.png"
          />
        </div>
      </div>
    </section>
  )
}
