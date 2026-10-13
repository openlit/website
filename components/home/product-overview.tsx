import type { InlinePart } from 'constants/home-overview'
import { HOME_OVERVIEW } from 'constants/home-overview'

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

export default function ProductOverview() {
  return (
    <section className="w-full border-t border-stone-200 bg-white px-4 py-16 dark:border-stone-800 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
          {HOME_OVERVIEW.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg">
          {HOME_OVERVIEW.intro}
        </p>
        {HOME_OVERVIEW.sections.map((section) => (
          <div key={section.title} className="mt-10">
            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph
                  .map((part) => (typeof part === 'string' ? part : part.href))
                  .join('')}
                className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300"
              >
                {paragraph.map((part, index) => (
                  <Part key={index} part={part} />
                ))}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
