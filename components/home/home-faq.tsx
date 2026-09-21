'use client'

import { useState, type ReactNode } from 'react'
import { HOME_FAQ_ITEMS, type HomeFaqItem } from 'constants/home-faq'
import { MarkedWord } from '@/components/common/marker-underline'

const URL_PATTERN = /(https?:\/\/[^\s]+)/g

function linkifyAnswer(answer: string): ReactNode[] {
  return answer.split(URL_PATTERN).map((part, index) => {
    if (!/^https?:\/\//.test(part)) {
      return <span key={index}>{part}</span>
    }
    const href = part.replace(/[.,);]+$/, '')
    const trailing = part.slice(href.length)
    return (
      <span key={index}>
        <a
          href={href}
          className="font-medium text-brandPrimary underline decoration-brandPrimary/30 underline-offset-4 hover:decoration-brandPrimary"
          target={href.startsWith('https://openlit.io') ? undefined : '_blank'}
          rel={href.startsWith('https://openlit.io') ? undefined : 'noopener noreferrer'}
        >
          {href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </a>
        {trailing}
      </span>
    )
  })
}

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
          {linkifyAnswer(item.answer)}
        </div>
      ) : null}
    </div>
  )
}

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            <MarkedWord>FAQ</MarkedWord>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg">
            Common questions about OpenLIT, LLM tracing, evaluations, prompt management, and
            self-hosting.
          </p>
        </div>

        <div className="mt-12 border-t border-stone-200 dark:border-stone-800">
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
