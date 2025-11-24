'use client'
import siteMetadata from 'data/siteMetadata'
import { Button as MovingBorder } from '../ui/moving-borders'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { motion } from 'motion/react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4">
      <section className="relative mb-10 flex min-h-screen w-full flex-col items-center justify-center">
        <div className="flex justify-center">
          <a
            href={siteMetadata.siteRepo}
            target="_blank"
            className={`z-20 m-auto flex w-max cursor-pointer items-center rounded-3xl border-[1px] border-stone-200 bg-stone-100/50 p-0.5 dark:border-stone-700 dark:bg-stone-900/70 lg:m-0`}
          >
            <MovingBorder
              className="border-brandPrimary bg-gradient-to-br from-brandPrimary to-violet-900 text-white dark:border-brandPrimary"
              containerClassName="h-18 w-32 h-auto"
            >
              Open source
            </MovingBorder>

            <StarFilledIcon className="mx-2 h-4 w-4 text-brandPrimary" />
            <span className="mr-3 text-xs text-stone-950 dark:text-stone-100">
              Star us on github
            </span>
          </a>
        </div>
        <h1 className="relative z-10 mx-auto mt-6 max-w-6xl text-center text-2xl font-semibold md:text-4xl lg:text-8xl">
          {/* <FlipWords words={words} /> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                Open Source Platform for
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                AI Engineering
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed lg:text-2xl">
              Monitor, debug, and improve your LLM applications with comprehensive observability,
              tracing, and evaluation tools. Built for production workloads.
            </p>
          </motion.div>
        </h1>
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://docs.openlit.io/latest/introduction"
            target="_blank"
            className={`group relative flex items-center gap-4 rounded-full border border-primary-300 bg-gradient-to-br from-primary-300 to-primary-400 px-8 py-2 text-sm text-primary-800 transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1]`}
          >
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r  from-transparent via-primary-800 to-transparent shadow-2xl" />
            <b className="relative z-20">Documentation</b>

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
          <Dialog>
            <DialogTrigger>
              <a
                target="_blank"
                className={`group relative flex items-center gap-4 rounded-full border border-primary-300 bg-white px-8 py-2 text-sm text-primary-800 transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1] dark:bg-black`}
              >
                <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r  from-transparent via-primary-800 to-transparent shadow-2xl" />
                <b className="relative z-20">View Demo</b>
              </a>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="flex h-auto w-auto items-center justify-center bg-white dark:bg-black [&]:max-w-full [&]:sm:max-w-full"
            >
              {/* eslint-disable jsx-a11y/media-has-caption */}
              <video controls className="m-auto">
                <source src="https://openlit.io/static/images/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* eslint-enable jsx-a11y/media-has-caption */}
            </DialogContent>
          </Dialog>
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
      </section>
    </div>
  )
}
