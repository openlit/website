'use client'

import { useContext, type ReactNode } from 'react'
import { GithubContext } from 'contexts/github'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'
import { MarkedWord } from '@/components/common/marker-underline'

function formatDownloads(count: number) {
  if (!count) return '…'
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M+`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K+`
  }
  return `${count.toLocaleString('en-US')}+`
}

function formatStars(count: number | undefined) {
  if (count == null || count === 0) return '…'
  return `${count.toLocaleString('en-US')}+`
}

type WhyRow = {
  title: string
  description: ReactNode
}

export default function WhyOpenlit() {
  const { info, sdk_downloads } = useContext(GithubContext)
  const integrationCount = SUPPORTED_INTEGRATIONS.length

  const rows: WhyRow[] = [
    {
      title: 'The full harness loop',
      description:
        'Instrument, develop, manage, observe, and improve AI systems in one Harness Engineering platform from prototype to production.',
    },
    {
      title: 'Unified platform',
      description:
        'LLM tracing, LLM evaluation, prompt management, Vault, OpenGround, and Otter work alone or together on the same production data.',
    },
    {
      title: 'Open source (Apache 2.0)',
      description: (
        <>
          Inspect the code, self-host for free with no license key, and join a community with{' '}
          {formatStars(info?.stargazers_count)} GitHub stars.
        </>
      ),
    },
    {
      title: 'OpenTelemetry-native',
      description:
        'Standard OpenTelemetry tracing and metrics you can keep in OpenLIT or export to Grafana, Datadog, and any OTLP backend.',
    },
    {
      title: `${integrationCount}+ integrations`,
      description:
        'LLMs, agent frameworks, vector databases, and GPUs, plus ingest from any OTel SDK, OBI, or OpenLLMetry source.',
    },
    {
      title: 'Built for scale',
      description:
        'ClickHouse-backed storage for fast queries across high-volume LLM and agent telemetry.',
    },
    {
      title: 'Proxy-free by design',
      description:
        'Instrument in-process with SDKs or zero-code tooling. No mandatory proxy on every LLM call.',
    },
    {
      title: 'GPU monitoring',
      description:
        'OpenTelemetry GPU collector for NVIDIA, AMD, and Intel utilization, memory, temperature, and power during LLM inference.',
    },
    {
      title: 'Production-proven',
      description: (
        <>
          Trusted by teams worldwide with {formatDownloads(sdk_downloads)} SDK downloads and{' '}
          {formatStars(info?.stargazers_count)} GitHub stars.
        </>
      ),
    },
    {
      title: 'Your data, your infra',
      description:
        'Self-host the UI and ClickHouse so prompts, traces, and secrets stay in your environment.',
    },
  ]

  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            <MarkedWord>Why use OpenLIT?</MarkedWord>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg">
            OpenLIT is an OpenTelemetry-native Harness Engineering platform. Trace, evaluate, and
            improve AI systems with production data, without locking telemetry into a proprietary
            format.
          </p>
        </div>

        <div className="mt-12 border-t border-stone-200 dark:border-stone-800">
          {rows.map((row) => (
            <div
              key={row.title}
              className="grid gap-3 border-b border-stone-200 py-5 dark:border-stone-800 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:gap-10 md:py-6"
            >
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">
                {row.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 md:text-base">
                {row.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
