'use client'

import siteMetadata from 'data/siteMetadata'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { HERO_DESCRIPTION } from 'constants/hero'
import { HarnessCanvas, useHarnessSelection } from './harness-canvas'

function MarkerUnderline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-[-2%] bottom-[-0.08em] h-[0.28em] w-[104%] overflow-visible"
      viewBox="0 0 200 18"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2.2 11.4
           C 18 8.2, 34 13.8, 52 10.6
           C 68 8.1, 84 13.2, 102 10.1
           C 122 6.8, 142 12.6, 162 9.4
           C 176 7.6, 188 10.8, 197.5 8.9
           L 198.2 13.6
           C 186 15.8, 172 12.4, 158 14.2
           C 138 16.6, 118 11.8, 98 14.4
           C 80 16.6, 62 12.2, 44 14.8
           C 28 16.8, 14 13.6, 1.8 15.1
           Z"
        fill="#F36C06"
        opacity="0.92"
      />
    </svg>
  )
}

export default function Hero() {
  const { activeLabel, toggle, setActiveLabel } = useHarnessSelection(null)

  return (
    <div className="relative w-full bg-white dark:bg-stone-950">
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 pt-10 md:pt-14">
        <a
          href={siteMetadata.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="z-20 mb-8 inline-flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-1.5 text-xs text-black transition hover:border-brandPrimary/40 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
        >
          <span className="rounded bg-brandPrimary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Open source
          </span>
          <StarFilledIcon className="h-3.5 w-3.5 text-black dark:text-white" />
          <span>Star us on GitHub</span>
        </a>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl lg:text-6xl">
            Open source{' '}
            <span className="relative inline-block whitespace-nowrap">
              Harness
              <MarkerUnderline />
            </span>{' '}
            Engineering Platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black dark:text-white md:text-lg">
            {HERO_DESCRIPTION}
          </p>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.openlit.io/latest/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-brandPrimary px-6 text-sm font-medium text-white transition hover:bg-primary-700"
          >
            Documentation
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3 w-3"
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
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex h-10 items-center rounded-md border border-stone-200 bg-white px-6 text-sm font-medium text-black transition hover:border-brandPrimary/40 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
              >
                View Demo
              </button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="flex h-auto w-auto items-center justify-center bg-white dark:bg-stone-950 [&]:max-w-full [&]:sm:max-w-full"
            >
              <video controls className="m-auto">
                <source src="https://openlit.io/static/images/demo.mp4" type="video/mp4" />
                <track kind="captions" label="English" default />
                Your browser does not support the video tag.
              </video>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative z-10 mt-10 w-full max-w-5xl">
          <HarnessCanvas
            activeLabel={activeLabel}
            onToggle={toggle}
            onDismiss={() => setActiveLabel(null)}
          />
        </div>
      </section>
    </div>
  )
}
