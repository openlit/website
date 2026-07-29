'use client'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { HERO_DESCRIPTION } from 'constants/hero'
import { MarkedWord } from '@/components/common/marker-underline'
import { HarnessCanvas, useHarnessSelection } from './harness-canvas'

export default function Hero() {
  const { activeLabel, toggle, setActiveLabel } = useHarnessSelection(null)

  return (
    <div className="relative w-full bg-white dark:bg-stone-950">
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-10 pt-10 md:pt-14">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white md:text-5xl lg:text-6xl">
            Open source <MarkedWord>Harness</MarkedWord> Engineering Platform
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black dark:text-white md:text-lg">
            {HERO_DESCRIPTION}
          </p>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.openlit.io/latest/openlit/quickstart-ai-observability"
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
              <video controls preload="none" className="m-auto" playsInline>
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
