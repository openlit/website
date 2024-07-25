'use client'
import React from 'react'
import Image from 'next/image'

export default function HowItWorks() {
  return (
    <>
      <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black dark:text-white md:text-5xl md:leading-tight">
        Supports multiple integrations
      </h2>
      <div className="relative mt-20 rounded-[32px] border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="rounded-[24px] border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-black">
          <Image
            alt="header"
            loading="lazy"
            width="1920"
            height="1080"
            decoding="async"
            data-nimg="1"
            className="w-full rounded-[20px] dark:hidden"
            src="/static/images/integration-white.png"
          />
          <Image
            alt="header"
            loading="lazy"
            width="1920"
            height="1080"
            decoding="async"
            data-nimg="1"
            className="hidden w-full rounded-[20px] dark:block"
            src="/static/images/integration-black.png"
          />
        </div>
      </div>
    </>
  )
}
