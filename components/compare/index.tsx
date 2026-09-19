import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import ReadyToGetStarted from '../common/ready-to-get-started'
import competitors from '@/data/comparisons'
import { MarkedWord } from '@/components/common/marker-underline'
import { OPENLIT_DEFINITION } from 'constants/openlit-definition'

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
    <div className="container py-10 md:py-12">
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          <MarkedWord>Compare</MarkedWord>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          {OPENLIT_DEFINITION}
        </p>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          See how OpenLIT compares with other AI engineering and LLM observability tools.
        </p>
      </div>

      {/* Why OpenLIT */}
      <div className="mb-16 rounded-2xl border border-brandPrimary/20 bg-brandPrimary/5 px-8 py-10">
        <h3 className="mb-6 text-xl font-bold">Why teams choose OpenLIT</h3>
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
        <h3 className="mb-6 text-2xl font-bold">Detailed Comparisons</h3>
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
