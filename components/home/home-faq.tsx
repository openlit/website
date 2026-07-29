'use client'

import { useState, type ReactNode } from 'react'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'

type FaqItem = {
  question: string
  answer: ReactNode
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is OpenLIT?',
    answer: (
      <>
        OpenLIT is an open-source AI engineering platform for{' '}
        <a
          href="https://docs.openlit.io/latest/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-stone-300 underline-offset-4 hover:text-brandPrimary"
        >
          observability
        </a>
        , evaluations, prompt management, Vault secrets, and cost tracking. It is built on
        OpenTelemetry so you can self-host and keep your data portable.
      </>
    ),
  },
  {
    question: 'What does OpenLIT help me with?',
    answer:
      'Trace LLM and agent calls, run LLM-as-a-judge evaluations on production traffic, version prompts in Prompt Hub, compare models in OpenGround, monitor coding agents, collect GPU metrics, and ask Otter natural-language questions about your telemetry.',
  },
  {
    question: 'Can I use just tracing without the other features?',
    answer:
      'Yes. Start with OpenTelemetry tracing and dashboards alone. Add evaluations, Prompt Hub, Vault, OpenGround, or Otter when you need them. Every piece works on the same ClickHouse-backed data.',
  },
  {
    question: 'What deployment options exist?',
    answer: (
      <>
        Self-host with{' '}
        <a
          href="https://docs.openlit.io/latest/openlit/installation"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-stone-300 underline-offset-4 hover:text-brandPrimary"
        >
          Docker Compose or Kubernetes (Helm)
        </a>
        . The stack is OpenLIT, ClickHouse, and an OpenTelemetry Collector. A managed Cloud option is
        on the roadmap.
      </>
    ),
  },
  {
    question: 'Is self-hosting actually free?',
    answer:
      'Yes. OpenLIT is Apache 2.0 licensed. Self-host with no license key, no feature gates, and no per-trace fees. You only pay for the infrastructure you run.',
  },
  {
    question: 'What languages and frameworks are supported?',
    answer: (
      <>
        Native SDKs for Python, JavaScript, and Go, plus {SUPPORTED_INTEGRATIONS.length}+
        integrations across LLMs, agent frameworks, vector databases, and GPUs. You can also send
        OTLP from OTel SDKs, OBI, OpenLLMetry, or any OTLP exporter.
      </>
    ),
  },
  {
    question: "What's the latency impact?",
    answer:
      'OpenLIT instruments in-process and exports asynchronously over OpenTelemetry. There is no mandatory proxy in front of your LLM calls, so you avoid proxy hop latency.',
  },
  {
    question: 'Is OpenLIT secure?',
    answer:
      'Self-host so traces, prompts, and secrets stay in your environment. Vault encrypts secrets with AES-256-GCM, and OpenLIT supports secret and PII redaction. OpenLIT does not claim SOC 2 or HIPAA certification. Choose self-hosting when you need data residency control.',
  },
  {
    question: 'How do I get started?',
    answer: (
      <>
        Run{' '}
        <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-stone-900">
          docker compose up -d
        </code>{' '}
        for the platform, then{' '}
        <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-stone-900">
          pip install openlit
        </code>{' '}
        and call{' '}
        <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-stone-900">
          openlit.init()
        </code>
        , or point any OTLP exporter at your OpenLIT endpoint. See the{' '}
        <a
          href="https://docs.openlit.io/latest/overview"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-stone-300 underline-offset-4 hover:text-brandPrimary"
        >
          docs
        </a>
        .
      </>
    ),
  },
  {
    question: 'How does pricing work?',
    answer: (
      <>
        Self-hosted OpenLIT is free forever under Apache 2.0. Enterprise options such as the eBPF
        controller are available for teams that need zero-code coverage across any language. A
        managed Cloud tier is coming soon.{' '}
        <a
          href="/pricing"
          className="underline decoration-stone-300 underline-offset-4 hover:text-brandPrimary"
        >
          See pricing
        </a>
        .
      </>
    ),
  },
]

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium text-stone-900 dark:text-stone-50">
          {item.question}
        </span>
        <span
          aria-hidden
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none text-stone-400"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div className="pb-5 pr-10 text-sm leading-relaxed text-stone-600 dark:text-stone-300 md:text-base">
          {item.answer}
        </div>
      ) : null}
    </div>
  )
}

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            Questions &amp; Answers
          </h2>
        </div>
        <div className="border-t border-stone-200 dark:border-stone-800">
          {FAQ_ITEMS.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
