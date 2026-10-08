'use client'

import { Check, Github, ArrowRight, Cloud, Building2, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import ReadyToGetStarted from './common/ready-to-get-started'
import {
  OSS_FEATURE_ROWS,
  PRICING_FAQ_ITEMS,
  PRICING_PLANS,
  type PlanValue,
} from 'constants/pricing'
import { cn } from 'lib/utils'
import { MarkedWord } from '@/components/common/marker-underline'

function PlanValueCell({ value }: { value: PlanValue }) {
  if (value === true) {
    return <Check className="mx-auto h-4 w-4 text-brandPrimary" aria-label="Included" />
  }
  return <span className="text-xs font-medium text-stone-600 dark:text-stone-300">{value}</span>
}

const PLAN_ICONS: Record<string, LucideIcon> = {
  OSS: Github,
  Enterprise: Building2,
  Cloud: Cloud,
}

const PLAN_ICON_TONES: Record<string, string> = {
  OSS: 'border-orange-200 bg-gradient-to-b from-orange-50 to-orange-100 text-orange-700 dark:border-orange-900/70 dark:from-orange-950/60 dark:to-orange-950/20 dark:text-orange-300',
  Enterprise:
    'border-stone-800 bg-gradient-to-b from-stone-800 to-stone-950 text-white dark:border-stone-300 dark:from-white dark:to-stone-200 dark:text-stone-950',
  Cloud:
    'border-sky-200 bg-gradient-to-b from-sky-50 to-sky-100 text-sky-700 dark:border-sky-900/70 dark:from-sky-950/60 dark:to-sky-950/20 dark:text-sky-300',
}

function PlanCard({
  plan,
  featured = false,
}: {
  plan: (typeof PRICING_PLANS)[keyof typeof PRICING_PLANS]
  featured?: boolean
}) {
  const Icon = PLAN_ICONS[plan.name]

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
        <span
          className={cn(
            'inline-flex size-11 items-center justify-center rounded-lg border shadow-sm',
            PLAN_ICON_TONES[plan.name]
          )}
        >
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        {plan.badge ? (
          <span className="shrink-0 rounded-md border border-stone-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone-500 dark:border-stone-700 dark:text-stone-400">
            {plan.badge}
          </span>
        ) : null}
      </div>
      <h2 className="mt-4 text-lg font-semibold text-stone-950 dark:text-stone-50">{plan.name}</h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{plan.summary}</p>

      <div className="mt-6">
        <p className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50">
          {plan.priceLabel}
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{plan.priceHint}</p>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <a
          href={plan.ctaHref}
          target={plan.ctaHref.startsWith('http') ? '_blank' : undefined}
          rel={plan.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition',
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
          className="inline-flex w-full items-center justify-center rounded-md border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:border-brandPrimary/40 dark:border-stone-700 dark:text-stone-200"
        >
          {plan.secondaryLabel}
        </a>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-stone-200 pt-6 dark:border-stone-800">
        {plan.highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-300"
          >
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
        <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          <MarkedWord>Plans</MarkedWord>
        </h1>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          Self-host OpenLIT free under Apache 2.0 for unlimited LLM tracing, evaluations, prompt
          management, and agent monitoring.{' '}
          <Link href="/enterprise" className="font-medium text-brandPrimary hover:underline">
            Enterprise Edition
          </Link>{' '}
          adds access control, audit logs, and alerting for production teams. OpenLIT Cloud is
          coming soon for teams that want a fully hosted option.
        </p>
      </div>

      <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlanCard plan={PRICING_PLANS.oss} featured />
        <PlanCard plan={PRICING_PLANS.enterprise} />
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

      {/* Mobile: stacked list (main shell uses overflow-x-hidden, so wide tables get clipped). */}
      <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 md:hidden">
        {OSS_FEATURE_ROWS.map((section) => (
          <MobileSection key={section.category} section={section} />
        ))}
      </div>

      {/* Desktop / tablet landscape: full table */}
      <div className="hidden min-w-0 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 md:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/60">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
                Feature
              </th>
              <th className="w-40 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-brandPrimary">
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

function MobileSection({ section }: { section: (typeof OSS_FEATURE_ROWS)[number] }) {
  return (
    <div className="border-b border-stone-200 last:border-b-0 dark:border-stone-800">
      <div className="bg-stone-50 px-4 py-3 dark:bg-stone-900/40">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          {section.category}
        </p>
        {section.blurb ? (
          <p className="mt-1 text-xs leading-relaxed text-stone-400 dark:text-stone-500">
            {section.blurb}
          </p>
        ) : null}
      </div>
      <ul>
        {section.features.map((feature) => (
          <li
            key={feature.name}
            className="flex items-start gap-3 border-t border-stone-100 px-4 py-3 dark:border-stone-800/80"
          >
            <span className="mt-0.5 shrink-0">
              {feature.included === true ? (
                <Check className="h-4 w-4 text-brandPrimary" aria-label="Included" />
              ) : (
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
                  {feature.included}
                </span>
              )}
            </span>
            <span className="min-w-0 flex-1 text-sm leading-snug text-stone-700 dark:text-stone-300">
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SectionRows({ section }: { section: (typeof OSS_FEATURE_ROWS)[number] }) {
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
