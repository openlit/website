'use client'

import { useContext, type ReactNode } from 'react'
import { GithubContext } from 'contexts/github'
import siteMetadata from '@/data/siteMetadata'

function formatStars(count: number | undefined) {
  if (count == null || count === 0) return '…'
  return `${count.toLocaleString('en-US')}+`
}

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

function Corner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-2.5 w-2.5 border-stone-300 dark:border-stone-600 ${className}`}
    />
  )
}

function OpenCell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative bg-white p-6 dark:bg-stone-950 sm:p-8">
      <Corner className="left-0 top-0 border-l border-t" />
      <Corner className="right-0 top-0 border-r border-t" />
      <Corner className="bottom-0 left-0 border-b border-l" />
      <Corner className="bottom-0 right-0 border-b border-r" />
      <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function DeployPill({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 shadow-sm transition hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
    >
      {label}
    </a>
  )
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-stone-600 underline decoration-stone-300 underline-offset-4 transition hover:text-brandPrimary hover:decoration-brandPrimary/50 dark:text-stone-300 dark:decoration-stone-600"
    >
      {children}
    </a>
  )
}

export default function OpenPlatform() {
  const { info, sdk_downloads } = useContext(GithubContext)

  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.12em] inset-y-[0.12em] -z-10 rounded-sm bg-[#F36C06]/20"
              />
              Open platform.
            </span>{' '}
            Open source.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg">
            Built on OpenTelemetry so your traces stay portable. Self-host under Apache 2.0, keep
            full ownership of your data, and never get locked into a proprietary format.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
          <div className="grid gap-px bg-stone-200 dark:bg-stone-800 md:grid-cols-2">
            <OpenCell title="Self-host at scale">
              <div className="flex flex-wrap gap-2">
                <DeployPill
                  label="Docker Compose"
                  href="https://docs.openlit.io/latest/openlit/installation"
                />
                <DeployPill
                  label="Kubernetes (Helm)"
                  href="https://docs.openlit.io/latest/openlit/installation"
                />
                <DeployPill
                  label="GPU collector"
                  href="https://docs.openlit.io/latest/gpu-collector/overview"
                />
                <DeployPill
                  label="OTLP ingest"
                  href="https://docs.openlit.io/latest/sdk/destinations/openlit"
                />
              </div>
            </OpenCell>

            <OpenCell title="Apache 2.0 license">
              <ul className="space-y-3">
                <li>
                  <TextLink href="https://github.com/openlit/openlit/blob/main/LICENSE">
                    Core platform Apache 2.0 licensed
                  </TextLink>
                </li>
                <li>
                  <TextLink href="https://docs.openlit.io/latest/overview">
                    Unlimited self-hosted usage
                  </TextLink>
                </li>
                <li>
                  <TextLink href="https://github.com/openlit/openlit/blob/main/CONTRIBUTING.md">
                    Fork, modify, contribute
                  </TextLink>
                </li>
              </ul>
            </OpenCell>

            <OpenCell title="APIs and data you own">
              <ul className="space-y-3">
                <li>
                  <TextLink href="https://docs.openlit.io/latest/sdk/overview">
                    OpenTelemetry-native traces and metrics
                  </TextLink>
                </li>
                <li>
                  <TextLink href="https://docs.openlit.io/latest/sdk/destinations/overview">
                    Export to Grafana, Datadog, and any OTLP backend
                  </TextLink>
                </li>
                <li>
                  <TextLink href="https://docs.openlit.io/latest/sdk/destinations/openlit">
                    Bring your own OTel instrumentation
                  </TextLink>
                </li>
              </ul>
            </OpenCell>

            <OpenCell title="Active OSS community">
              <ul className="space-y-3">
                <li>
                  <TextLink href={siteMetadata.siteRepo}>
                    {formatStars(info?.stargazers_count)} GitHub stars
                  </TextLink>
                </li>
                <li>
                  <TextLink href={siteMetadata.siteRepo}>
                    {formatDownloads(sdk_downloads)} SDK downloads
                  </TextLink>
                </li>
                <li>
                  <TextLink href={`${siteMetadata.siteRepo}/blob/main/CONTRIBUTING.md`}>
                    Contribute on GitHub
                  </TextLink>
                </li>
              </ul>
            </OpenCell>
          </div>
        </div>
      </div>
    </section>
  )
}
