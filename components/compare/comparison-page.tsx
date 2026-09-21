import { Check, X, Minus, ArrowRight, Github } from 'lucide-react'
import { Fragment } from 'react'
import competitors, { type Competitor, type ComparisonFeature } from '@/data/comparisons'
import siteMetadata from '@/data/siteMetadata'
import ReadyToGetStarted from '../common/ready-to-get-started'
import Link from 'next/link'
import { MarkedWord } from '@/components/common/marker-underline'

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-brandPrimary" />
  }
  if (value === false) {
    return <X className="mx-auto h-5 w-5 opacity-30" />
  }
  return <span className="text-xs opacity-70">{value}</span>
}

function ComparisonTable({
  data,
  competitorName,
}: {
  data: ComparisonFeature[]
  competitorName: string
}) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[28rem] border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white pb-3 text-left font-medium opacity-50 dark:bg-stone-950">
              Feature
            </th>
            <th className="pb-3 text-center font-bold text-brandPrimary">OpenLIT</th>
            <th className="pb-3 text-center font-medium opacity-70">{competitorName}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((section) => (
            <Fragment key={section.category}>
              <tr>
                <td
                  colSpan={3}
                  className="border-t border-white/10 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider opacity-50"
                >
                  {section.category}
                </td>
              </tr>
              {section.features.map((f) => (
                <tr
                  key={f.name}
                  className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                >
                  <td className="sticky left-0 z-10 bg-white py-3 pr-4 opacity-80 dark:bg-stone-950">
                    {f.name}
                  </td>
                  <td className="py-3 text-center">
                    <FeatureValue value={f.openlit} />
                  </td>
                  <td className="py-3 text-center">
                    <FeatureValue value={f.competitor} />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ComparisonPage({ competitor }: { competitor: Competitor }) {
  return (
    <div className="container py-10 md:py-12">
      <div className="mb-10 max-w-3xl">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          OpenLIT vs <MarkedWord className="whitespace-nowrap">{competitor.name}</MarkedWord>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          {competitor.heroSubheadline}
        </p>
      </div>

      {/* Quick CTA */}
      <div className="mb-12 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <a
          href="https://docs.openlit.io/latest/openlit/quickstart-ai-observability"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brandPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Get Started with OpenLIT <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={siteMetadata.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-brandPrimary/60"
        >
          <Github className="h-4 w-4" /> View on GitHub
        </a>
      </div>

      {/* Comparison Table */}
      <div className="mb-16 rounded-xl border border-white/10 p-4 sm:p-6 md:p-8">
        <ComparisonTable data={competitor.features} competitorName={competitor.name} />
      </div>

      {/* When to choose */}
      <div className="mb-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-brandPrimary/30 bg-brandPrimary/5 p-6">
          <h2 className="mb-4 font-bold text-brandPrimary">Choose OpenLIT when…</h2>
          <ul className="space-y-3">
            {competitor.summary.chooseOpenlit.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandPrimary" />
                <span className="text-sm opacity-80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 p-6">
          <h2 className="mb-4 font-bold opacity-70">Choose {competitor.name} when…</h2>
          <ul className="space-y-3">
            {competitor.summary.chooseCompetitor.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 opacity-40" />
                <span className="text-sm opacity-60">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Other comparisons */}
      <div className="mb-16">
        <h2 className="mb-4 text-lg font-bold">More Comparisons</h2>
        <div className="flex flex-wrap gap-3">
          {competitors
            .filter((c) => c.slug !== competitor.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary"
              >
                OpenLIT vs {c.name}
              </Link>
            ))}
        </div>
      </div>

      <ReadyToGetStarted />
    </div>
  )
}
