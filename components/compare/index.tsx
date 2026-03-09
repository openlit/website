import { ArrowRight, Check } from 'lucide-react'
import { BadgeWithGradient } from '../ui/badge'
import Link from 'next/link'
import ReadyToGetStarted from '../common/ready-to-get-started'
import competitors from '@/data/comparisons'

const openlitStrengths = [
  'OpenTelemetry-native — vendor-neutral, portable telemetry data',
  'GPU monitoring for NVIDIA GPUs out of the box',
  'Self-hostable with Apache 2.0 license — free forever',
  'Vector DB monitoring alongside LLM tracing',
  '60+ integrations across LLMs, frameworks, Vector DBs, and GPUs',
  'Prompt Hub, Vault, and Fleet Hub included',
]

export default function CompareIndex() {
  return (
    <div className="container py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <BadgeWithGradient className="mb-4">Compare</BadgeWithGradient>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          OpenLIT vs the <span className="text-brandPrimary">Alternatives</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg opacity-70">
          See how OpenLIT compares to other LLM observability and monitoring tools — feature by
          feature, with honest analysis.
        </p>
      </div>

      {/* Why OpenLIT */}
      <div className="mb-16 rounded-2xl border border-brandPrimary/20 bg-brandPrimary/5 px-8 py-10">
        <h2 className="mb-6 text-xl font-bold">Why teams choose OpenLIT</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {openlitStrengths.map((s) => (
            <li key={s} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandPrimary" />
              <span className="text-sm opacity-80">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Comparison Cards */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Detailed Comparisons</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {competitors.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-white/10 p-6 transition-all hover:border-brandPrimary/40 hover:bg-brandPrimary/5"
            >
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-bold group-hover:text-brandPrimary">
                  OpenLIT vs {c.name}
                </h3>
                <p className="text-sm opacity-60">{c.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-brandPrimary">
                See full comparison <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ReadyToGetStarted />
    </div>
  )
}
