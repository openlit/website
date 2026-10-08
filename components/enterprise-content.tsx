import Link from 'next/link'
import { ArrowRight, BookOpen, Check, Mail } from 'lucide-react'
import ReadyToGetStarted from './common/ready-to-get-started'
import {
  ENTERPRISE_CONTACT_HREF,
  ENTERPRISE_FAQ_ITEMS,
  ENTERPRISE_FEATURES,
  type EnterpriseFeature,
} from 'constants/enterprise'
import { MarkedWord } from '@/components/common/marker-underline'

function FeatureCard({ feature }: { feature: EnterpriseFeature }) {
  return (
    <div
      id={feature.id}
      className="flex h-full scroll-mt-24 flex-col rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-950"
    >
      <h3 className="text-lg font-semibold text-stone-950 dark:text-stone-50">{feature.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
        {feature.summary}
      </p>
      <ul className="mt-5 space-y-2.5 border-t border-stone-200 pt-5 dark:border-stone-800">
        {feature.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-300"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandPrimary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {feature.docsHref ? (
        <a
          href={feature.docsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-brandPrimary hover:underline"
        >
          Read the docs
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </div>
  )
}

export default function EnterpriseContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-stone-200 dark:border-stone-800">
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
              OpenLIT <MarkedWord>Enterprise</MarkedWord> Edition
            </h1>
            <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              Everything in open source OpenLIT, plus the access control, audit, alerting, and
              instrumentation features teams need to run AI agents in production. Self-hosted on
              your own infrastructure and unlocked with a signed license.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={ENTERPRISE_CONTACT_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brandPrimary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                <Mail className="h-4 w-4" />
                Contact us
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-brandPrimary/40 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
              >
                Compare plans
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            Enterprise Edition features
          </h2>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Available on top of every OpenLIT OSS feature: tracing, evaluations, guardrails, Prompt
            Hub, Vault, OpenGround, and dashboards.
          </p>
        </div>

        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENTERPRISE_FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="mb-14 grid gap-4 rounded-xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900/40 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <h2 className="text-lg font-semibold text-stone-950 dark:text-stone-50">
              Starting with OSS?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Enterprise Edition runs the same platform as OpenLIT OSS. Built-in roles, API keys,
              and your existing telemetry keep working when you add a license.
            </p>
          </div>
          <a
            href="https://docs.openlit.io/latest/openlit/quickstart-ai-observability"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:border-brandPrimary/40 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
          >
            <BookOpen className="h-4 w-4" />
            OSS quickstart
          </a>
        </div>

        <div className="mx-auto mb-14 max-w-3xl">
          <h2 className="mb-6 text-xl font-semibold text-stone-950 dark:text-stone-50">
            OpenLIT Enterprise Edition FAQ
          </h2>
          <div className="space-y-3">
            {ENTERPRISE_FAQ_ITEMS.map((item) => (
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

        <ReadyToGetStarted />
      </div>
    </>
  )
}
