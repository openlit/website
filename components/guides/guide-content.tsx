import Link from 'next/link'
import type { BestGuide } from 'data/best-guides'
import { BEST_GUIDES, getBestGuide } from 'data/best-guides'
import ReadyToGetStarted from '@/components/common/ready-to-get-started'

const PAGE_SHELL = 'mx-auto w-full max-w-4xl px-4 py-10 md:px-6 md:py-14'
const H2 = 'text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50'
const BODY = 'text-base leading-relaxed text-stone-600 dark:text-stone-300'

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function toolAnchor(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function GuidesIndexContent() {
  return (
    <div className={PAGE_SHELL}>
      <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
        LLM and agent observability buyer&apos;s guides
      </h1>
      <p className={`mt-3 ${BODY}`}>
        Side-by-side roundups of LLM observability and AI agent observability platforms, compared on
        license, self-hosting, OpenTelemetry support, evals, and cost tracking.
      </p>
      <ul className="mt-10 divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
        {BEST_GUIDES.map((guide) => (
          <li key={guide.slug} className="py-5">
            <Link href={`/guides/${guide.slug}`} className="group block">
              <h2 className="text-lg font-semibold text-stone-950 group-hover:text-brandPrimary dark:text-stone-50">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {guide.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mt-12 text-lg font-semibold text-stone-950 dark:text-stone-50">
        How-to guides
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-300">
        <li>
          <Link
            href="/blogs/monitor-claude-code-usage-and-cost"
            className="font-medium hover:text-brandPrimary"
          >
            How to monitor Claude Code usage and cost with OpenTelemetry
          </Link>{' '}
          (Codex, Cursor, and OpenCode too)
        </li>
        <li>
          <Link
            href="/glossary/opentelemetry-genai-semantic-conventions"
            className="font-medium hover:text-brandPrimary"
          >
            OpenTelemetry GenAI semantic conventions explained
          </Link>
        </li>
      </ul>
    </div>
  )
}

export function GuideContent({ guide }: { guide: BestGuide }) {
  const related = guide.relatedSlugs
    .map((slug) => getBestGuide(slug))
    .filter(Boolean) as BestGuide[]

  return (
    <div className={PAGE_SHELL}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandPrimary">
        Buyer&apos;s guide
      </p>
      <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
        Last updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time> · By the
        OpenLIT team
      </p>

      <section
        aria-label="Short answer"
        className="mt-8 rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Short answer
        </h2>
        <p className="mt-2 text-base leading-relaxed text-stone-900 dark:text-stone-100">
          {guide.shortAnswer}
        </p>
      </section>

      <div className="mt-8 space-y-4">
        {guide.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={BODY}>
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-12">
        <h2 className={H2}>The list at a glance</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-stone-700 dark:text-stone-200">
          {guide.tools.map((tool) => (
            <li key={tool.name}>
              <a href={`#${toolAnchor(tool.name)}`} className="font-medium hover:text-brandPrimary">
                {tool.name}
              </a>
              : {tool.bestFor}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className={H2}>Comparison table</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Tool</th>
                <th className="px-4 py-3 font-semibold">License</th>
                <th className="px-4 py-3 font-semibold">Self-host</th>
                <th className="px-4 py-3 font-semibold">OpenTelemetry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-600 dark:divide-stone-800 dark:text-stone-300">
              {guide.tools.map((tool) => (
                <tr key={tool.name}>
                  <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-50">
                    {tool.name}
                  </td>
                  <td className="px-4 py-3">{tool.license}</td>
                  <td className="px-4 py-3">{tool.selfHost}</td>
                  <td className="px-4 py-3">{tool.otel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 space-y-10">
        {guide.tools.map((tool, index) => (
          <article key={tool.name} id={toolAnchor(tool.name)} className="scroll-mt-24">
            <h2 className={H2}>
              {index + 1}. {tool.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-brandPrimary">Best for: {tool.bestFor}</p>
            <p className={`mt-3 ${BODY}`}>{tool.summary}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                  Strengths
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600 dark:text-stone-300">
                  {tool.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                  Limitations
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600 dark:text-stone-300">
                  {tool.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">
              License: {tool.license} · Self-host: {tool.selfHost} ·{' '}
              <a href={tool.url} rel="noopener" className="underline hover:text-brandPrimary">
                Website
              </a>
              {tool.compareSlug ? (
                <>
                  {' '}
                  ·{' '}
                  <Link
                    href={`/compare/${tool.compareSlug}`}
                    className="underline hover:text-brandPrimary"
                  >
                    OpenLIT vs {tool.name}
                  </Link>
                </>
              ) : null}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className={H2}>How to choose</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-200">
              <tr>
                <th className="px-4 py-3 font-semibold">If you need</th>
                <th className="px-4 py-3 font-semibold">Pick</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-600 dark:divide-stone-800 dark:text-stone-300">
              {guide.howToChoose.map((row) => (
                <tr key={row.need}>
                  <td className="px-4 py-3">{row.need}</td>
                  <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-50">
                    {row.pick}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className={H2}>Evaluation criteria</h2>
        <dl className="mt-4 space-y-4">
          {guide.criteria.map((item) => (
            <div key={item.name}>
              <dt className="font-medium text-stone-900 dark:text-stone-50">{item.name}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">
          Methodology: we compared public documentation, licenses, and repositories for each tool as
          of {formatDate(guide.updated)}. OpenLIT is our product. Pricing changes often, so we do
          not list prices; check each vendor&apos;s site. Spot an error? Email contact@openlit.io.
        </p>
      </section>

      <section className="mt-12">
        <h2 className={H2}>FAQ</h2>
        <div className="mt-4 divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
          {guide.faq.map((item) => (
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

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-stone-950 dark:text-stone-50">
          Related guides
        </h2>
        <div className="flex flex-wrap gap-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/guides/${item.slug}`}
              className="rounded-lg border border-stone-200 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-800"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/compare"
            className="rounded-lg border border-stone-200 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-800"
          >
            All comparisons
          </Link>
          <Link
            href="/glossary/agent-observability"
            className="rounded-lg border border-stone-200 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-800"
          >
            What is agent observability?
          </Link>
        </div>
      </section>

      <div className="mt-16">
        <ReadyToGetStarted className="px-0" />
      </div>
    </div>
  )
}
