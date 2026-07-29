'use client'

import { Check, Github, ArrowRight, Server, Cloud } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'
import ReadyToGetStarted from './common/ready-to-get-started'
import {
  OSS_FEATURE_ROWS,
  PRICING_FAQ_ITEMS,
  PRICING_PLANS,
  type PlanValue,
} from 'constants/pricing'
import { cn } from 'lib/utils'

function PlanValueCell({ value }: { value: PlanValue }) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-brandPrimary" aria-label="Included" />
  }
  return <span className="text-xs font-medium text-stone-600 dark:text-stone-300">{value}</span>
}

function PlanCard({
  plan,
  featured = false,
}: {
  plan: (typeof PRICING_PLANS)[keyof typeof PRICING_PLANS]
  featured?: boolean
}) {
  const Icon = plan.name === 'OSS' ? Server : Cloud

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-xl border bg-white p-6 dark:bg-stone-950',
        featured
          ? 'border-brandPrimary/40 shadow-[0_8px_24px_-16px_rgba(243,108,6,0.45)]'
          : 'border-stone-200 dark:border-stone-800'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'inline-flex size-9 items-center justify-center rounded-md border',
              featured
                ? 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/70 dark:bg-orange-950/40 dark:text-orange-300'
                : 'border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200'
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">{plan.name}</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">{plan.summary}</p>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide',
            featured
              ? 'bg-brandPrimary text-white'
              : 'border border-stone-200 text-stone-500 dark:border-stone-700 dark:text-stone-400'
          )}
        >
          {plan.badge}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          {plan.priceLabel}
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{plan.priceHint}</p>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <a
          href={plan.ctaHref}
          target={plan.ctaHref.startsWith('http') ? '_blank' : undefined}
          rel={plan.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={cn(
            'inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition',
            featured
              ? 'bg-brandPrimary text-white hover:bg-primary-700'
              : 'border border-stone-200 text-stone-800 hover:border-brandPrimary/40 dark:border-stone-700 dark:text-stone-100'
          )}
        >
          {plan.name === 'OSS' ? <Github className="h-4 w-4" /> : null}
          {plan.ctaLabel}
          {plan.name !== 'OSS' ? <ArrowRight className="h-4 w-4" /> : null}
        </a>
        <a
          href={plan.secondaryHref}
          target={plan.secondaryHref.startsWith('http') ? '_blank' : undefined}
          rel={plan.secondaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:border-brandPrimary/40 dark:border-stone-700 dark:text-stone-200"
        >
          {plan.secondaryLabel}
        </a>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-stone-200 pt-6 dark:border-stone-800">
        {plan.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandPrimary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PricingContent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-12">
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          Self-host OpenLIT free under Apache 2.0 for unlimited LLM tracing, evaluations, prompt
          management, and agent monitoring. OpenLIT Cloud is coming soon for teams that want a fully
          hosted option.
        </p>
      </div>

      <div className="mb-14 grid gap-4 md:grid-cols-2">
        <PlanCard plan={PRICING_PLANS.oss} featured />
        <PlanCard plan={PRICING_PLANS.cloud} />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
          What is included in free OpenLIT OSS
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Everything below ships today in the open source, self-hosted OpenLIT platform.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/60">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Feature
              </th>
              <th className="w-36 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-brandPrimary">
                Included in OSS
              </th>
            </tr>
          </thead>
          <tbody>
            {OSS_FEATURE_ROWS.map((section) => (
              <SectionRows key={section.category} section={section} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mb-14 mt-14 max-w-3xl">
        <h2 className="mb-6 text-xl font-semibold text-stone-950 dark:text-stone-50">
          OpenLIT pricing FAQ
        </h2>
        <div className="space-y-3">
          {PRICING_FAQ_ITEMS.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-stone-200 px-5 py-4 dark:border-stone-800"
            >
              <h3 className="mb-1.5 text-sm font-semibold text-stone-950 dark:text-stone-50">
                {item.question}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-8 text-center text-xs text-stone-400">
        Questions? Email{' '}
        <a href={`mailto:${siteMetadata.email}`} className="underline hover:text-brandPrimary">
          {siteMetadata.email}
        </a>
      </p>

      <ReadyToGetStarted />
    </div>
  )
}

function SectionRows({
  section,
}: {
  section: (typeof OSS_FEATURE_ROWS)[number]
}) {
  return (
    <>
      <tr className="border-t border-stone-200 bg-stone-50/80 dark:border-stone-800 dark:bg-stone-900/40">
        <td colSpan={2} className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            {section.category}
          </p>
          {section.blurb ? (
            <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">{section.blurb}</p>
          ) : null}
        </td>
      </tr>
      {section.features.map((feature) => (
        <tr
          key={feature.name}
          className="border-t border-stone-100 transition-colors hover:bg-stone-50/70 dark:border-stone-800/80 dark:hover:bg-stone-900/30"
        >
          <td className="px-4 py-3 text-stone-700 dark:text-stone-300">{feature.name}</td>
          <td className="px-4 py-3 text-center">
            <PlanValueCell value={feature.included} />
          </td>
        </tr>
      ))}
    </>
  )
}
