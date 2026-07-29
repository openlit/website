import { cn } from 'lib/utils'

type Feature = {
  title: string
  description: string
  href: string
  visual: 'observe' | 'evals' | 'prompts' | 'openground' | 'agents' | 'vault' | 'cost'
}

const FEATURES: Feature[] = [
  {
    title: 'LLM tracing',
    description:
      'OpenTelemetry LLM tracing for every call, tool, and retrieval. Filter by user, session, cost, latency, or metadata.',
    href: 'https://docs.openlit.io/latest/openlit/observability/telemetry',
    visual: 'observe',
  },
  {
    title: 'LLM evaluation',
    description:
      'LLM evaluation with LLM-as-a-judge, heuristics, or human review on production traffic or experiments.',
    href: 'https://docs.openlit.io/latest/openlit/evaluations/llm-as-a-judge',
    visual: 'evals',
  },
  {
    title: 'Prompt management',
    description:
      'Prompt Hub for prompt management and versioning. Deploy and roll back prompts without shipping app code.',
    href: 'https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub/overview',
    visual: 'prompts',
  },
  {
    title: 'Model comparison',
    description:
      'OpenGround model comparison playground. Test prompts on real inputs and compare LLMs side by side.',
    href: 'https://docs.openlit.io/latest/openlit/prompts-experiments/openground/overview',
    visual: 'openground',
  },
  {
    title: 'AI agent monitoring',
    description:
      'AI agent monitoring for coding agents and tool loops. See tools, cost, and outcomes in one view.',
    href: 'https://docs.openlit.io/latest/openlit/coding-agents/setup-and-configure',
    visual: 'agents',
  },
  {
    title: 'API key management',
    description:
      'Vault for LLM API key management. Store and rotate OpenAI, Anthropic, and other secrets outside app code.',
    href: 'https://docs.openlit.io/latest/openlit/developer-resources/vault/overview',
    visual: 'vault',
  },
  {
    title: 'Cost & latency',
    description:
      'Track spend, latency, and quality for AI workloads so you can improve cost and speed with real data.',
    href: 'https://docs.openlit.io/latest/openlit/costs/overview',
    visual: 'cost',
  },
]

function ObserveVisual() {
  return (
    <div className="space-y-1.5">
      <div className="rounded border border-stone-200/80 bg-stone-950 px-2.5 py-1.5 shadow-sm">
        <p className="font-mono text-[10px] text-stone-100">
          <span className="text-stone-500">$</span> pip install openlit
        </p>
        <p className="mt-0.5 font-mono text-[9px] text-stone-400">import openlit; openlit.init()</p>
      </div>
      {['chat.completion', 'tool.retrieve', 'agent.step', 'response.stream'].map((label, i) => (
        <div
          key={label}
          className="flex items-center gap-2 rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 shadow-sm"
          style={{ transform: `translateX(${i * 4}px)` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brandPrimary/70" />
          <span className="truncate text-[10px] font-medium text-stone-600">{label}</span>
          <span className="ml-auto text-[9px] tabular-nums text-stone-400">
            {(18.2 - i * 3.4).toFixed(2)}s
          </span>
        </div>
      ))}
      <div className="flex gap-1.5 pt-0.5">
        {['$0.012', '1.2k tok', 'ok'].map((chip) => (
          <span
            key={chip}
            className="rounded bg-stone-100 px-1.5 py-0.5 text-[9px] font-medium text-stone-500"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function EvalsVisual() {
  return (
    <div className="space-y-1.5">
      <div className="rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 text-center text-[10px] font-medium text-stone-600 shadow-sm">
        LLM execution
      </div>
      <div className="mx-auto h-3 w-px bg-stone-300" />
      <div className="rounded border border-stone-200/80 bg-white/90 p-2 shadow-sm">
        <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-wide text-stone-500">
          Evaluators
        </p>
        <div className="space-y-1.5">
          {[
            { label: 'Accuracy', value: '87%', width: '87%' },
            { label: 'Relevance', value: '92%', width: '92%' },
            { label: 'Safety', value: 'pass', width: '100%' },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-0.5 flex items-center justify-between text-[9px] text-stone-600">
                <span>{row.label}</span>
                <span className="font-medium">{row.value}</span>
              </div>
              <div className="h-1 rounded-full bg-stone-100">
                <div className="h-1 rounded-full bg-brandPrimary/50" style={{ width: row.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {['Latency · 412ms', 'Cost · $0.004'].map((tag) => (
          <span key={tag} className="rounded bg-stone-100 px-1.5 py-0.5 text-[9px] text-stone-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function PromptsVisual() {
  return (
    <div className="space-y-1.5">
      <div className="rounded border border-brandPrimary/30 bg-white/95 p-2 shadow-sm ring-1 ring-brandPrimary/15">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-stone-500">
            support-agent
          </p>
          <span className="rounded bg-brandPrimary/10 px-1.5 py-0.5 text-[8px] font-medium text-brandPrimary">
            v3 · prod
          </span>
        </div>
        <p className="font-mono text-[9px] leading-relaxed text-stone-600">
          You are a helpful support agent. Answer using the docs context:{' '}
          <span className="text-brandPrimary">{'{{context}}'}</span>
        </p>
        <p className="mt-1 font-mono text-[9px] leading-relaxed text-stone-500">
          Keep answers under 120 words. Cite sources when possible.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 shadow-sm">
          <p className="text-[8px] uppercase tracking-wide text-stone-400">Variables</p>
          <p className="mt-0.5 font-mono text-[9px] text-stone-600">{'{{context}}'}</p>
          <p className="font-mono text-[9px] text-stone-600">{'{{user_name}}'}</p>
        </div>
        <div className="rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 shadow-sm">
          <p className="text-[8px] uppercase tracking-wide text-stone-400">Deploy</p>
          <p className="mt-0.5 text-[9px] font-medium text-stone-600">prod · staging</p>
          <p className="text-[9px] text-stone-400">rollback ready</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {['v1', 'v2', 'v3'].map((v, i) => (
          <div
            key={v}
            className={cn(
              'rounded border border-stone-200/80 bg-white/90 px-2 py-1 text-center shadow-sm',
              i === 2 && 'border-brandPrimary/40'
            )}
          >
            <p className="text-[9px] font-semibold text-stone-700">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OpengroundVisual() {
  return (
    <div className="space-y-1.5">
      <div className="rounded border border-stone-200/80 bg-stone-50 px-2 py-1 text-[9px] text-stone-500">
        Prompt: Summarize this support ticket…
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { model: 'fable', latency: '1.1s', cost: '$0.003' },
          { model: 'Sol', latency: '0.8s', cost: '$0.002' },
        ].map((item) => (
          <div
            key={item.model}
            className="rounded border border-stone-200/80 bg-white/90 p-2 shadow-sm"
          >
            <p className="mb-1.5 text-[10px] font-semibold text-stone-700">{item.model}</p>
            <div className="space-y-1">
              <div className="h-1 rounded bg-stone-200" />
              <div className="h-1 w-4/5 rounded bg-stone-200" />
              <div className="h-1 w-3/5 rounded bg-stone-100" />
            </div>
            <div className="mt-2 flex justify-between text-[8px] text-stone-400">
              <span>{item.latency}</span>
              <span>{item.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgentsVisual() {
  return (
    <div className="space-y-1.5">
      {['planner', 'tool.call', 'writer'].map((step, i) => (
        <div
          key={step}
          className="flex items-center gap-2 rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 shadow-sm"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded bg-stone-100 text-[8px] font-bold text-stone-500">
            {i + 1}
          </span>
          <span className="text-[10px] font-medium text-stone-600">{step}</span>
          <span className="ml-auto h-1.5 w-8 rounded-full bg-brandPrimary/25" />
        </div>
      ))}
      <div className="flex gap-1.5">
        {['$0.18', '3 tools'].map((chip) => (
          <span
            key={chip}
            className="rounded bg-stone-100 px-1.5 py-0.5 text-[9px] font-medium text-stone-500"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function VaultVisual() {
  return (
    <div className="space-y-1.5">
      {['OPENAI_API_KEY', 'ANTHROPIC_KEY', 'DB_URL'].map((key) => (
        <div
          key={key}
          className="flex items-center gap-2 rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 shadow-sm"
        >
          <span className="h-3 w-3 rounded border border-stone-300 bg-stone-50" />
          <span className="truncate font-mono text-[9px] text-stone-600">{key}</span>
          <span className="ml-auto font-mono text-[9px] tracking-widest text-stone-400">••••</span>
        </div>
      ))}
      <div className="flex gap-1.5">
        {['AES-256', 'rotated 2d ago'].map((chip) => (
          <span
            key={chip}
            className="rounded bg-stone-100 px-1.5 py-0.5 text-[9px] font-medium text-stone-500"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function CostVisual() {
  return (
    <div className="space-y-1.5">
      <div className="relative min-h-[5rem] rounded border border-stone-200/80 bg-white/90 p-2 shadow-sm">
        <svg viewBox="0 0 160 64" className="h-16 w-full" aria-hidden>
          <path
            d="M0 48 C20 46, 30 40, 45 36 C60 32, 70 44, 85 28 C100 12, 115 18, 130 22 C145 26, 155 20, 160 16 L160 64 L0 64 Z"
            fill="rgba(243,108,6,0.12)"
          />
          <path
            d="M0 48 C20 46, 30 40, 45 36 C60 32, 70 44, 85 28 C100 12, 115 18, 130 22 C145 26, 155 20, 160 16"
            fill="none"
            stroke="rgba(243,108,6,0.55)"
            strokeWidth="1.5"
          />
        </svg>
        <div className="absolute right-2 top-2 rounded border border-stone-200 bg-white/95 px-1.5 py-1 shadow-sm">
          <p className="text-[9px] font-semibold text-stone-700">218 traces</p>
          <p className="text-[8px] text-stone-400">$12.40</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: 'p95 latency', value: '842ms' },
          { label: 'avg cost', value: '$0.057' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded border border-stone-200/80 bg-white/90 px-2 py-1.5 shadow-sm"
          >
            <p className="text-[8px] uppercase tracking-wide text-stone-400">{stat.label}</p>
            <p className="text-[10px] font-semibold text-stone-700">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureVisual({ kind }: { kind: Feature['visual'] }) {
  switch (kind) {
    case 'observe':
      return <ObserveVisual />
    case 'evals':
      return <EvalsVisual />
    case 'prompts':
      return <PromptsVisual />
    case 'openground':
      return <OpengroundVisual />
    case 'agents':
      return <AgentsVisual />
    case 'vault':
      return <VaultVisual />
    case 'cost':
      return <CostVisual />
  }
}

export default function PlatformFeatures() {
  return (
    <section className="w-full bg-white px-4 py-16 dark:bg-stone-950 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 md:text-4xl">
            All the tools,{' '}
            <span className="relative inline-block">
              <span
                aria-hidden
                className="absolute inset-x-[-0.12em] inset-y-[0.12em] -z-10 rounded-sm bg-[#F36C06]/20"
              />
              one harness platform.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300 md:text-lg">
            AI engineering tools for LLM tracing, prompt management, LLM evaluation, and model
            comparison from prototype to production.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {FEATURES.map((feature, index) => (
            <a
              key={feature.title}
              href={feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group relative flex h-full min-h-[18.5rem] flex-col overflow-hidden rounded-xl border border-stone-200 bg-white p-5 transition hover:border-brandPrimary/40 hover:shadow-[0_8px_24px_-16px_rgba(28,25,23,0.35)] dark:border-stone-800 dark:bg-stone-950 dark:hover:border-orange-400/40',
                index < 3 ? 'lg:col-span-4' : 'lg:col-span-3'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-stone-900 group-hover:text-brandPrimary dark:text-stone-50 dark:group-hover:text-orange-300">
                  {feature.title}
                </h3>
                <span
                  aria-hidden
                  className="mt-0.5 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-brandPrimary dark:text-stone-600"
                >
                  ↗
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {feature.description}
              </p>
              <div className="pointer-events-none mt-auto pt-4 opacity-80">
                <FeatureVisual kind={feature.visual} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
