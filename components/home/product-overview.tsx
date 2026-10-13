import type { InlinePart } from 'constants/home-overview'
import { HOME_OVERVIEW } from 'constants/home-overview'
import { MarkedWord } from '@/components/common/marker-underline'

function Part({ part }: { part: InlinePart }) {
  if (typeof part === 'string') return <>{part}</>
  const external = part.href.startsWith('http')
  return (
    <a
      href={part.href}
      className="font-medium text-brandPrimary underline decoration-brandPrimary/30 underline-offset-4 hover:decoration-brandPrimary"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {part.text}
    </a>
  )
}

function Title() {
  const { title, titleHighlight } = HOME_OVERVIEW
  const index = title.indexOf(titleHighlight)
  if (index === -1) return <>{title}</>
  const rest = title.slice(index + titleHighlight.length)
  // Keep punctuation right after the marked words on the same line as them.
  const punctuation = rest.match(/^[,.;:!?]*/)?.[0] ?? ''
  return (
    <>
      {title.slice(0, index)}
      <span className="whitespace-nowrap">
        <MarkedWord>{titleHighlight}</MarkedWord>
        {punctuation}
      </span>
      {rest.slice(punctuation.length)}
    </>
  )
}

export default function ProductOverview() {
  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            <Title />
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg">
            {HOME_OVERVIEW.intro}
          </p>
        </div>

        <div className="mt-12 border-t border-stone-200 dark:border-stone-800">
          {HOME_OVERVIEW.sections.map((section) => (
            <div
              key={section.title}
              className="grid gap-3 border-b border-stone-200 py-5 dark:border-stone-800 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:gap-10 md:py-6"
            >
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph
                      .map((part) => (typeof part === 'string' ? part : part.href))
                      .join('')}
                    className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 md:text-base"
                  >
                    {paragraph.map((part, index) => (
                      <Part key={index} part={part} />
                    ))}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
