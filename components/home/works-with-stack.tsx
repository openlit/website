'use client'

import Image from 'next/image'
import { Check, Copy } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'

type Logo = {
  name: string
  icon?: string
  href: string
}

type SdkOption = {
  label: string
  install: string
}

type NamedOption = {
  label: string
}

type GpuOption = {
  label: string
  display: string
  copy: string
}

const SDK_OPTIONS: SdkOption[] = [
  {
    label: 'Python',
    install: 'pip install openlit',
  },
  {
    label: 'JavaScript',
    install: 'npm install openlit',
  },
  {
    label: 'Go',
    install: 'go get github.com/openlit/openlit/sdk/go',
  },
]

const GPU_OPTIONS: GpuOption[] = [
  {
    label: 'NVIDIA',
    display: 'docker run ... otel-gpu-collector',
    copy: "docker run -d --name otel-gpu-collector --gpus all --pid=host -e OTEL_SERVICE_NAME=my-app -e OTEL_RESOURCE_ATTRIBUTES='deployment.environment=production' -e OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 ghcr.io/openlit/otel-gpu-collector:latest",
  },
  {
    label: 'AMD',
    display: 'docker run ... otel-gpu-collector',
    copy: "docker run -d --name otel-gpu-collector --device /dev/kfd:/dev/kfd --device /dev/dri:/dev/dri --pid=host -e OTEL_SERVICE_NAME=my-app -e OTEL_RESOURCE_ATTRIBUTES='deployment.environment=production' -e OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 ghcr.io/openlit/otel-gpu-collector:latest",
  },
  {
    label: 'Intel',
    display: 'docker run ... otel-gpu-collector',
    copy: "docker run -d --name otel-gpu-collector --device /dev/dri:/dev/dri --pid=host -e OTEL_SERVICE_NAME=my-app -e OTEL_RESOURCE_ATTRIBUTES='deployment.environment=production' -e OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 ghcr.io/openlit/otel-gpu-collector:latest",
  },
]

const CONTROLLER_DISPLAY = 'helm install ... openlit-controller'
const CONTROLLER_COPY =
  'helm repo add openlit https://openlit.github.io/helm/ && helm repo update && helm install openlit openlit/openlit --set openlit-controller.enabled=true'

const OTEL_SNIPPET = 'OTEL_EXPORTER_OTLP_ENDPOINT=https://your-openlit-url:4318'

const OTEL_OPTIONS: NamedOption[] = [
  { label: 'OTel SDKs' },
  { label: 'OBI' },
  { label: 'OpenLLMetry' },
]

const INTEGRATION_PILLS: Logo[] = SUPPORTED_INTEGRATIONS.filter((item) => item.type !== 'gpus').map(
  (item) => ({
    name: item.name,
    icon: item.icon,
    href: `https://docs.openlit.io/${item.link}`,
  })
)

function OptionTabs({
  options,
  active,
  onChange,
}: {
  options: { label: string }[]
  active: string
  onChange: (label: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5" role="tablist">
      {options.map((option) => {
        const isActive = option.label === active
        return (
          <button
            key={option.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.label)}
            className={
              isActive
                ? 'rounded-md border border-brandPrimary/40 bg-brandPrimary/10 px-2.5 py-1 text-xs font-semibold text-brandPrimary'
                : 'rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600 transition hover:border-stone-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300'
            }
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function PathShell({
  id,
  badge,
  badgeTone = 'neutral',
  title,
  body,
  children,
}: {
  id: string
  badge: string
  badgeTone?: 'neutral' | 'enterprise'
  title: string
  body: string
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col bg-white p-5 dark:bg-stone-950 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-stone-400">{id}</span>
        <span
          className={
            badgeTone === 'enterprise'
              ? 'rounded bg-brandPrimary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brandPrimary'
              : 'rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-500 dark:bg-stone-900 dark:text-stone-400'
          }
        >
          {badge}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-stone-900 dark:text-stone-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{body}</p>
      <div className="mt-auto flex flex-col gap-4 pt-5">{children}</div>
    </div>
  )
}

function CopyableCommand({
  display,
  copyText,
}: {
  display: string
  copyText?: string
}) {
  const [copied, setCopied] = useState(false)
  const value = copyText ?? display

  useEffect(() => {
    setCopied(false)
  }, [value])

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900">
      <code
        className="min-w-0 flex-1 truncate px-2.5 py-2 font-mono text-[11px] text-stone-700 dark:text-stone-200"
        title={value}
      >
        {display}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy command'}
        className="mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded text-stone-500 transition hover:bg-stone-200/70 hover:text-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-100"
      >
        {copied ? <Check className="size-3.5 text-brandPrimary" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}

function NativeSdkPath() {
  const [active, setActive] = useState(SDK_OPTIONS[0].label)
  const selected = SDK_OPTIONS.find((o) => o.label === active) ?? SDK_OPTIONS[0]

  return (
    <PathShell
      id="01"
      badge="Open source"
      title="Native SDKs"
      body="Drop in openlit.init() for OpenTelemetry LLM tracing at the app level."
    >
      <OptionTabs options={SDK_OPTIONS} active={active} onChange={setActive} />
      <CopyableCommand display={selected.install} />
    </PathShell>
  )
}

function EbpfPath() {
  return (
    <PathShell
      id="02"
      badge="Enterprise"
      badgeTone="enterprise"
      title="eBPF controller"
      body="Zero-code instrumentation for any language. No SDK, no app changes."
    >
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {['Any language', 'Kubernetes', 'Linux', 'Docker'].map((label) => (
          <span key={label} className="text-xs font-medium text-stone-500">
            {label}
          </span>
        ))}
      </div>
      <CopyableCommand display={CONTROLLER_DISPLAY} copyText={CONTROLLER_COPY} />
    </PathShell>
  )
}

function GpuCollectorPath() {
  const [active, setActive] = useState(GPU_OPTIONS[0].label)
  const selected = GPU_OPTIONS.find((o) => o.label === active) ?? GPU_OPTIONS[0]

  return (
    <PathShell
      id="03"
      badge="Open source"
      title="GPU collector"
      body="GPU monitoring for LLM inference: utilization, memory, temperature, and power via OpenTelemetry."
    >
      <OptionTabs options={GPU_OPTIONS} active={active} onChange={setActive} />
      <CopyableCommand display={selected.display} copyText={selected.copy} />
    </PathShell>
  )
}

function AnyOtelPath() {
  const [active, setActive] = useState(OTEL_OPTIONS[0].label)

  return (
    <PathShell
      id="04"
      badge="Open source"
      title="Any OTel source"
      body="Already instrumented? Point OTel SDKs, OBI, OpenLLMetry, or any OTLP exporter at OpenLIT."
    >
      <OptionTabs options={OTEL_OPTIONS} active={active} onChange={setActive} />
      <CopyableCommand display={OTEL_SNIPPET} />
    </PathShell>
  )
}

function IntegrationPill({ item }: { item: Logo }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-stone-200 bg-white px-2.5 py-1.5 shadow-sm transition hover:border-brandPrimary/40 dark:border-stone-700 dark:bg-stone-950"
    >
      {item.icon ? (
        <Image src={item.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
      ) : (
        <span className="flex h-4 w-4 items-center justify-center rounded bg-stone-100 text-[8px] font-bold text-stone-500">
          {item.name.slice(0, 1)}
        </span>
      )}
      <span className="whitespace-nowrap text-sm text-stone-800 dark:text-stone-100">
        {item.name}
      </span>
    </a>
  )
}

function IntegrationsMarquee() {
  const chunkSize = Math.ceil(INTEGRATION_PILLS.length / 4)
  const rows = [0, 1, 2, 3].map((index) =>
    INTEGRATION_PILLS.slice(index * chunkSize, (index + 1) * chunkSize)
  )

  return (
    <div className="marquee-track relative overflow-hidden rounded-xl border border-stone-200 bg-white py-4 dark:border-stone-800 dark:bg-stone-950">
      <div className="space-y-3">
        {rows.map((row, rowIndex) => {
          const track = [...row, ...row]
          return (
            <div
              key={rowIndex}
              className="animate-marquee flex w-max items-center gap-2 px-4"
              style={{
                animationDirection: rowIndex % 2 === 1 ? 'reverse' : 'normal',
                animationDuration: `${55 + rowIndex * 8}s`,
              }}
            >
              {track.map((item, i) => (
                <IntegrationPill key={`${rowIndex}-${item.name}-${i}`} item={item} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function WorksWithStack() {
  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandPrimary">
              Instrument once
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
              Your way in. Every stack covered.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg lg:justify-self-end">
            Use OpenLIT SDKs, the enterprise eBPF controller, the GPU collector, or send OTLP from
            OTel SDKs, OBI, OpenLLMetry, and other OpenTelemetry instrumentations.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 dark:border-stone-800 dark:bg-stone-800 md:grid-cols-2 xl:grid-cols-4">
          <NativeSdkPath />
          <EbpfPath />
          <GpuCollectorPath />
          <AnyOtelPath />
        </div>

        <div className="mt-14">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                {SUPPORTED_INTEGRATIONS.length}+ integrations
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                LLMs, agent frameworks, vector DBs, and more.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a
                href="https://docs.openlit.io/latest/sdk/integrations/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-800 transition hover:text-brandPrimary dark:text-stone-100"
              >
                See all integrations
              </a>
              <a
                href="https://github.com/openlit/openlit/issues/new?title=Integration%20request"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 transition hover:text-brandPrimary dark:text-stone-400"
              >
                Request one
              </a>
            </div>
          </div>

          <IntegrationsMarquee />
        </div>
      </div>
    </section>
  )
}
