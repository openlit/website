'use client'

import { Check, X, Github, ArrowRight, Server, Cloud, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { BadgeWithGradient } from './ui/badge'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import ReadyToGetStarted from './common/ready-to-get-started'

const selfHostedFeatures = [
  'Full LLM observability (60+ integrations)',
  'OpenTelemetry-native traces & metrics',
  'Token usage & cost tracking',
  'GPU monitoring (NVIDIA + AMD)',
  'Vector DB monitoring',
  'Prompt Hub with versioning',
  'Secrets Vault',
  'Fleet Hub (multi-deployment)',
  'LLM Evaluations',
  'Custom model pricing',
  'Manage organisations',
  'Export to Grafana, Datadog, and any OTLP backend',
  'Community support (GitHub, Discord)',
]

const cloudFeatures = [
  'Everything in Self-Hosted (60+ integrations)',
  'Managed infrastructure — no ops overhead',
  'Automatic upgrades',
  'Dedicated support',
  'SLA guarantees',
  'SSO / SAML',
  'Audit logs',
  'Priority feature requests',
]

const supportTiers = [
  {
    name: 'Token Supporter',
    price: '$10',
    period: '/month',
    description: 'Show your appreciation and help keep OpenLIT maintained.',
    href: 'https://opencollective.com/openlit',
    features: [
      'Community supporter badge',
      'Priority GitHub issue triage',
      'Access to sponsor channel on Discord',
    ],
  },
  {
    name: 'Context Window Hero',
    price: '$50',
    period: '/month',
    description: 'Directly fund new features and integrations.',
    href: 'https://opencollective.com/openlit',
    features: [
      'Everything in Token Supporter',
      'Your logo in README sponsors section',
      'Direct input on roadmap priorities',
      'Monthly call with core team',
    ],
  },
]

function FeatureRow({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandPrimary" />
      <span className="text-sm opacity-80">{text}</span>
    </li>
  )
}

export default function PricingContent() {
  return (
    <div className="container py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <BadgeWithGradient className="mb-4">Pricing</BadgeWithGradient>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          100% Open Source. <span className="text-brandPrimary">Forever Free.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg opacity-70">
          OpenLIT is Apache 2.0 licensed. Self-host everything with zero licensing fees. A managed
          cloud option is coming soon for teams who prefer zero-ops.
        </p>
      </div>

      {/* Main Tiers */}
      <div className="mb-20 grid gap-6 md:grid-cols-2">
        {/* Self-Hosted */}
        <Card className="relative overflow-hidden border-brandPrimary/40 bg-gradient-to-br from-brandPrimary/5 to-transparent">
          <div className="absolute right-4 top-4">
            <span className="rounded-full bg-brandPrimary px-3 py-1 text-xs font-semibold text-white">
              Available Now
            </span>
          </div>
          <CardHeader className="pb-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brandPrimary/20">
                <Server className="h-5 w-5 text-brandPrimary" />
              </div>
              <div>
                <CardTitle className="text-xl">Self-Hosted</CardTitle>
                <CardDescription>Run on your own infrastructure</CardDescription>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold">$0</span>
              <span className="opacity-60">/ forever</span>
            </div>
            <p className="text-sm opacity-60">Apache 2.0 — no license key, no usage limits</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row">
              <a
                href="https://docs.openlit.io/latest/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brandPrimary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={siteMetadata.siteRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-brandPrimary/60"
              >
                <Github className="h-4 w-4" /> View on GitHub
              </a>
            </div>
            <ul className="space-y-3">
              {selfHostedFeatures.map((f) => (
                <FeatureRow key={f} text={f} />
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cloud */}
        <Card className="relative overflow-hidden border-white/10">
          <div className="absolute right-4 top-4">
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold opacity-60">
              Coming Soon
            </span>
          </div>
          <CardHeader className="pb-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Cloud className="h-5 w-5 opacity-70" />
              </div>
              <div>
                <CardTitle className="text-xl">Cloud</CardTitle>
                <CardDescription>Fully managed by the OpenLIT team</CardDescription>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold opacity-50">—</span>
            </div>
            <p className="text-sm opacity-60">Join the waitlist to be notified at launch</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <a
                href="mailto:waitlist@openlit.io?subject=OpenLIT Cloud Waitlist"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold opacity-70 transition-opacity hover:opacity-100"
              >
                Join Waitlist
              </a>
            </div>
            <ul className="space-y-3">
              {cloudFeatures.map((f) => (
                <FeatureRow key={f} text={f} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Community Support */}
      <div className="mb-20">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">
            <Heart className="mr-2 inline-block h-6 w-6 text-brandPrimary" />
            Support the Project
          </h2>
          <p className="opacity-60">
            OpenLIT is free forever. If it saves you time or money, consider sponsoring development
            via OpenCollective.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {supportTiers.map((tier) => (
            <Card key={tier.name} className="border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-brandPrimary">{tier.price}</span>
                  <span className="opacity-60">{tier.period}</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={tier.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 flex w-full items-center justify-center rounded-lg border border-brandPrimary/40 px-4 py-2 text-sm font-semibold text-brandPrimary transition-colors hover:bg-brandPrimary/10"
                >
                  Sponsor on OpenCollective
                </a>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <FeatureRow key={f} text={f} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Comparison vs Competitors */}
      <div className="mb-20">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">How OpenLIT Compares</h2>
          <p className="opacity-60">
            See how OpenLIT stacks up against other LLM observability tools.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { slug: 'openlit-vs-langfuse', name: 'Langfuse' },
            { slug: 'openlit-vs-helicone', name: 'Helicone' },
            { slug: 'openlit-vs-langsmith', name: 'LangSmith' },
            { slug: 'openlit-vs-datadog', name: 'Datadog LLM Obs.' },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-sm font-medium transition-colors hover:border-brandPrimary/40 hover:text-brandPrimary"
            >
              OpenLIT vs {c.name}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mb-20 max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: 'Is OpenLIT really free?',
              a: 'Yes. OpenLIT is Apache 2.0 licensed and free to self-host with no usage limits, no feature gates, and no license key required.',
            },
            {
              q: 'What do I need to self-host?',
              a: 'Docker and Docker Compose. Run `docker compose up -d` in the OpenLIT repo and you have the full stack running in under two minutes — UI, ClickHouse storage, and OpenTelemetry Collector included.',
            },
            {
              q: 'Can I send data to my existing Grafana or Datadog instance?',
              a: 'Yes. OpenLIT is OpenTelemetry-native. Configure the OTLP endpoint to point at any OTLP-compatible backend: Grafana, Datadog, New Relic, SigNoz, Jaeger, and more.',
            },
            {
              q: 'Does OpenLIT support GPU monitoring?',
              a: 'Yes. Enable GPU metrics with `openlit.init(collect_gpu_stats=True)`. OpenLIT collects utilization, VRAM usage, temperature, and power draw from NVIDIA and AMD GPUs.',
            },
            {
              q: 'When will the Cloud tier be available?',
              a: 'The OpenLIT Cloud managed service is in development. Join the waitlist by emailing contact@openlit.io and you will be notified at launch.',
            },
          ].map((item) => (
            <div key={item.q} className="rounded-lg border border-white/10 px-5 py-4">
              <h3 className="mb-2 font-semibold">{item.q}</h3>
              <p className="text-sm opacity-70">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ReadyToGetStarted />
    </div>
  )
}
