import { Check, X, Minus, ArrowRight, Github } from 'lucide-react'
import { BadgeWithGradient } from '../ui/badge'
import type { Competitor, ComparisonFeature } from '@/data/comparisons'
import siteMetadata from '@/data/siteMetadata'
import ReadyToGetStarted from '../common/ready-to-get-started'
import Link from 'next/link'

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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="pb-3 text-left font-medium opacity-50" style={{ width: '50%' }}>
              Feature
            </th>
            <th className="pb-3 text-center font-bold text-brandPrimary" style={{ width: '25%' }}>
              OpenLIT
            </th>
            <th className="pb-3 text-center font-medium opacity-70" style={{ width: '25%' }}>
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((section) => (
            <>
              <tr key={section.category}>
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
                  <td className="py-3 pr-4 opacity-80">{f.name}</td>
                  <td className="py-3 text-center">
                    <FeatureValue value={f.openlit} />
                  </td>
                  <td className="py-3 text-center">
                    <FeatureValue value={f.competitor} />
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ComparisonPage({ competitor }: { competitor: Competitor }) {
  return (
    <div className="container py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm opacity-50">
        <Link href="/compare" className="hover:opacity-100">
          Compare
        </Link>{' '}
        / <span>{competitor.tagline}</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <BadgeWithGradient className="mb-4">OpenLIT vs {competitor.name}</BadgeWithGradient>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{competitor.heroHeadline}</h1>
        <p className="mx-auto max-w-2xl text-lg opacity-70">{competitor.heroSubheadline}</p>
      </div>

      {/* Quick CTA */}
      <div className="mb-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href="https://docs.openlit.io/latest/introduction"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-brandPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Get Started with OpenLIT <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href={siteMetadata.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-brandPrimary/60"
        >
          <Github className="h-4 w-4" /> View on GitHub
        </a>
        {competitor.openSourceUrl && (
          <a
            href={competitor.openSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-40 hover:opacity-70"
          >
            {competitor.name} on GitHub ↗
          </a>
        )}
      </div>

      {/* Comparison Table */}
      <div className="mb-16 rounded-xl border border-white/10 p-6 md:p-8">
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
          {[
            { slug: 'openlit-vs-langfuse', name: 'Langfuse' },
            { slug: 'openlit-vs-helicone', name: 'Helicone' },
            { slug: 'openlit-vs-langsmith', name: 'LangSmith' },
            { slug: 'openlit-vs-datadog', name: 'Datadog' },
          ]
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
