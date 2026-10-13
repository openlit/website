'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  BookText,
  Building2,
  Clapperboard,
  Cpu,
  FlaskConical,
  GitCompare,
  Github,
  Home,
  KeyRound,
  Newspaper,
  Search,
  ShieldCheck,
  Tag,
  Workflow,
  FileText,
  type LucideIcon,
} from 'lucide-react'
import { OPENLIT_DEFINITION } from 'constants/openlit-definition'
import { useSiteSearch } from '@/components/shell/site-search'
import { MarkedWord } from '@/components/common/marker-underline'

type QuickLink = {
  label: string
  description: string
  href: string
  icon: LucideIcon
}

const SITE_LINKS: QuickLink[] = [
  { label: 'Home', description: 'What OpenLIT is and how it works', href: '/', icon: Home },
  { label: 'Pricing', description: 'Free OSS, Enterprise, and Cloud', href: '/pricing', icon: Tag },
  {
    label: 'Enterprise',
    description: 'RBAC, audit logs, alerts, and more',
    href: '/enterprise',
    icon: Building2,
  },
  {
    label: 'Compare',
    description: 'OpenLIT vs Langfuse, LangSmith, and others',
    href: '/compare',
    icon: GitCompare,
  },
  {
    label: 'Agent harness engineering',
    description: 'Definition, layers, and tools',
    href: '/agent-harness-engineering',
    icon: BookOpen,
  },
  { label: 'Glossary', description: 'Key terms, explained', href: '/glossary', icon: BookText },
  { label: 'Blog', description: 'Guides and deep dives', href: '/blogs', icon: Newspaper },
  {
    label: 'Videos',
    description: 'Demos, talks, and Shorts',
    href: '/videos',
    icon: Clapperboard,
  },
]

const PRODUCT_LINKS: QuickLink[] = [
  {
    label: 'Agent observability',
    description: 'OpenTelemetry traces for LLM calls, tools, MCP, and agent steps',
    href: 'https://docs.openlit.io/latest/openlit/quickstart-ai-observability',
    icon: Workflow,
  },
  {
    label: 'Evaluations',
    description: 'LLM-as-a-judge, programmatic, and human feedback evals',
    href: 'https://docs.openlit.io/latest/openlit/quickstart-evals',
    icon: FlaskConical,
  },
  {
    label: 'Guardrails',
    description: 'Prompt injection, sensitive topic, and topic restriction checks',
    href: 'https://docs.openlit.io/latest/openlit/quickstart-guard',
    icon: ShieldCheck,
  },
  {
    label: 'Prompt Hub',
    description: 'Versioned prompts with variables, fetched at runtime',
    href: 'https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub',
    icon: FileText,
  },
  {
    label: 'Vault',
    description: 'Encrypted storage for LLM API keys and secrets',
    href: 'https://docs.openlit.io/latest/openlit/developer-resources/vault',
    icon: KeyRound,
  },
  {
    label: 'GPU monitoring',
    description: 'NVIDIA, AMD, and Intel GPU metrics on OpenTelemetry',
    href: 'https://docs.openlit.io/latest/openlit/quickstart-gpu',
    icon: Cpu,
  },
]

function LinkCard({ link }: { link: QuickLink }) {
  const external = link.href.startsWith('http')
  const Icon = link.icon
  const className =
    'group flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:border-brandPrimary/40 dark:border-stone-800 dark:bg-stone-950'
  const content = (
    <>
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-stone-700 group-hover:text-brandPrimary dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-stone-950 dark:text-stone-50">
          {link.label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          {link.description}
        </span>
      </span>
    </>
  )

  return external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  )
}

export default function NotFoundContent() {
  const pathname = usePathname()
  const { openSearch } = useSiteSearch()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brandPrimary">
          404 · Page not found
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          This page <MarkedWord>doesn&apos;t exist</MarkedWord>
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          We couldn&apos;t find{' '}
          {pathname ? (
            <code className="break-all rounded bg-stone-100 px-1.5 py-0.5 font-mono text-sm text-stone-800 dark:bg-stone-900 dark:text-stone-200">
              {pathname}
            </code>
          ) : (
            'that page'
          )}
          . It may have moved or been renamed. Search the site, or pick up from one of the pages
          below.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openSearch}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brandPrimary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            <Search className="h-4 w-4" />
            Search the site
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-brandPrimary/40 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
          >
            Back to homepage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">Popular pages</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_LINKS.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
          What you can do with OpenLIT
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {OPENLIT_DEFINITION}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_LINKS.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-950 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">
            Start tracing in two lines
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
            Self-host OpenLIT with Docker, then instrument your app with the SDK.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 font-mono text-xs leading-relaxed text-stone-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
            {'pip install openlit\n\nimport openlit\nopenlit.init()'}
          </pre>
        </div>
        <div className="flex flex-col gap-2 md:w-56">
          <a
            href="https://docs.openlit.io/latest/openlit/quickstart-ai-observability"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brandPrimary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            <BookOpen className="h-4 w-4" />
            Quickstart
          </a>
          <a
            href="https://github.com/openlit/openlit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:border-brandPrimary/40 dark:border-stone-700 dark:text-stone-200"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </section>
    </div>
  )
}
