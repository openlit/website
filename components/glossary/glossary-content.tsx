import Link from 'next/link'
import type { GlossaryTerm } from 'data/glossary'
import { GLOSSARY_TERMS, getGlossaryTerm } from 'data/glossary'
import { MarkedWord } from '@/components/common/marker-underline'
import ReadyToGetStarted from '@/components/common/ready-to-get-started'

const PAGE_SHELL = 'mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14'

export function GlossaryIndexContent() {
  return (
    <div className={PAGE_SHELL}>
      <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
        Agent harness <MarkedWord>glossary</MarkedWord>
      </h1>
      <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
        Short definitions for agent harness engineering terms: agent harness, harness engineering,
        agent observability, agent evals, guardrails, and trajectory evaluation.
      </p>

      <ul className="mt-10 divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        {GLOSSARY_TERMS.map((term) => (
          <li key={term.slug} className="py-5">
            <Link
              href={`/glossary/${term.slug}`}
              className="group block transition-colors hover:text-brandPrimary"
            >
              <h2 className="text-lg font-semibold text-stone-950 group-hover:text-brandPrimary dark:text-stone-50">
                {term.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {term.definition}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-sm text-stone-600 dark:text-stone-300">
        <Link href="/agent-harness-engineering" className="font-medium text-brandPrimary underline">
          Read the agent harness engineering pillar
        </Link>
      </div>
    </div>
  )
}

export function GlossaryTermContent({ term }: { term: GlossaryTerm }) {
  const related = (term.relatedSlugs || [])
    .map((slug) => getGlossaryTerm(slug))
    .filter(Boolean) as GlossaryTerm[]

  return (
    <div className={PAGE_SHELL}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandPrimary">
        Glossary
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
        What is <MarkedWord>{term.name.toLowerCase()}</MarkedWord>?
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-800 dark:text-stone-100">
        {term.definition}
      </p>

      <article className="mt-8 space-y-4">
        {term.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-base leading-relaxed text-stone-600 dark:text-stone-300"
          >
            {paragraph}
          </p>
        ))}
      </article>

      {term.faq && term.faq.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">FAQ</h2>
          <div className="mt-4 divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
            {term.faq.map((item) => (
              <div key={item.question} className="py-4">
                <h3 className="text-base font-medium text-stone-900 dark:text-stone-50">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-stone-950 dark:text-stone-50">
            Related terms
          </h2>
          <div className="flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/glossary/${item.slug}`}
                className="rounded-lg border border-stone-200 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-800"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/glossary"
              className="rounded-lg border border-stone-200 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-800"
            >
              All glossary terms
            </Link>
            <Link
              href="/agent-harness-engineering"
              className="rounded-lg border border-stone-200 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-800"
            >
              Pillar guide
            </Link>
          </div>
        </section>
      ) : null}

      <div className="mt-16">
        <ReadyToGetStarted className="px-0" />
      </div>
    </div>
  )
}
