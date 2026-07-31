'use client'

import { useState } from 'react'
import { HOME_FAQ_ITEMS, type HomeFaqItem } from 'constants/home-faq'
import { MarkedWord } from '@/components/common/marker-underline'

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: HomeFaqItem
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium text-stone-900 dark:text-stone-50">
          {item.question}
        </span>
        <span
          aria-hidden
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none text-stone-400"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div className="pb-5 pr-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:pr-10 md:text-base">
          {item.answer}
        </div>
      ) : null}
    </div>
  )
}

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            <MarkedWord>FAQ</MarkedWord>
          </h2>
        </div>
        <div className="border-t border-stone-200 dark:border-stone-800">
          {HOME_FAQ_ITEMS.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
