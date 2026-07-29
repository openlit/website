'use client'

import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, BookOpen, MessageCircle, Star, GitFork, Download } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'
import { GithubContext } from 'contexts/github'
import ReadyToGetStarted from './common/ready-to-get-started'

function formatNumber(num: number | undefined) {
  if (num == null) return '…'
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return num.toLocaleString('en-US')
}

export default function AboutUsContent() {
  const { info, sdk_downloads, contributors } = useContext(GithubContext)

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h2 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
        About us
      </h2>

      <article className="mt-6 space-y-6 text-base leading-relaxed text-stone-700 prose-headings:font-semibold prose-p:text-stone-600 dark:text-stone-300 dark:prose-p:text-stone-300">
        <p className="text-lg text-stone-900 dark:text-stone-50">
          OpenLIT is building the open source{' '}
          <span className="font-semibold">Harness Engineering</span> platform to help teams
          instrument, develop, manage, observe, and improve production AI systems faster.
        </p>

        <p>
          We are excited about the potential of LLMs and generative AI, and the impact they will
          have on how software gets built. Doing our part to accelerate that shift is our mission.
        </p>

        <p>
          OpenLIT started from the pain of shipping LLM apps without clear traces, cost, quality, or
          agent visibility. The answer was an{' '}
          <Link
            href="https://docs.openlit.io/latest/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brandPrimary underline decoration-brandPrimary/30 underline-offset-4 hover:decoration-brandPrimary"
          >
            OpenTelemetry-native
          </Link>{' '}
          AI engineering platform you can self-host free under Apache 2.0: LLM tracing, evaluations,
          Prompt Hub, Vault, OpenGround, coding agent monitoring, and GPU metrics in one place.
        </p>

        <p>
          Today OpenLIT is used by developers worldwide. The project is open, community-driven, and
          built in public on{' '}
          <a
            href={siteMetadata.siteRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brandPrimary underline decoration-brandPrimary/30 underline-offset-4 hover:decoration-brandPrimary"
          >
            GitHub
          </a>
          .
        </p>
      </article>

      <section className="mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
              Contributors
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Everyone who has contributed code to{' '}
              <a
                href={siteMetadata.siteRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-stone-300 underline-offset-4 hover:text-brandPrimary"
              >
                openlit/openlit
              </a>
              , loaded live from GitHub.
            </p>
          </div>
          {contributors.length > 0 ? (
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
              {contributors.length} contributors
            </p>
          ) : null}
        </div>

        {contributors.length === 0 ? (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-full bg-stone-100 dark:bg-stone-900"
              />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {contributors.map((contributor) => (
              <li key={contributor.id}>
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${contributor.login} · ${contributor.contributions} contributions`}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span className="relative block size-12 overflow-hidden rounded-full border border-stone-200 bg-stone-50 transition group-hover:border-brandPrimary/50 dark:border-stone-800 dark:bg-stone-900 sm:size-14">
                    <Image
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="max-w-full truncate text-center text-[11px] text-stone-500 group-hover:text-brandPrimary dark:text-stone-400">
                    {contributor.login}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`${siteMetadata.siteRepo}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5"
                title="Become a contributor"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-dashed border-stone-300 text-lg font-medium text-stone-400 transition group-hover:border-brandPrimary group-hover:text-brandPrimary dark:border-stone-700 sm:size-14">
                  ?
                </span>
                <span className="text-center text-[11px] text-stone-500 group-hover:text-brandPrimary dark:text-stone-400">
                  You?
                </span>
              </a>
            </li>
          </ul>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">Join us</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          OpenLIT grows through contributors, users, and community feedback. Help improve the
          platform, share what you build, or sponsor the project.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Github,
              label: 'Contribute on GitHub',
              href: `${siteMetadata.siteRepo}/blob/main/CONTRIBUTING.md`,
              body: 'Fix bugs, add integrations, improve docs.',
            },
            {
              icon: MessageCircle,
              label: 'Join Slack',
              href: siteMetadata.slack,
              body: 'Ask questions and meet other builders.',
            },
            {
              icon: BookOpen,
              label: 'Read the docs',
              href: 'https://docs.openlit.io/latest/overview',
              body: 'Get started and explore the platform.',
            },
          ].map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-stone-200 bg-white p-4 transition hover:border-brandPrimary/40 dark:border-stone-800 dark:bg-stone-950"
              >
                <Icon className="size-4 text-brandPrimary" />
                <p className="mt-3 text-sm font-semibold text-stone-950 dark:text-stone-50">
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {item.body}
                </p>
              </a>
            )
          })}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">Public metrics</h2>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
          Live signals from the open source project.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: 'GitHub stars',
              value: formatNumber(info?.stargazers_count),
              icon: Star,
              href: siteMetadata.siteRepo,
            },
            {
              label: 'Forks',
              value: formatNumber(info?.forks_count),
              icon: GitFork,
              href: `${siteMetadata.siteRepo}/forks`,
            },
            {
              label: 'Contributors',
              value: contributors.length ? formatNumber(contributors.length) : '…',
              icon: Github,
              href: `${siteMetadata.siteRepo}/graphs/contributors`,
            },
            {
              label: 'SDK downloads',
              value: formatNumber(sdk_downloads),
              icon: Download,
              href: siteMetadata.siteRepo,
            },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <a
                key={stat.label}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-stone-200 bg-white p-4 transition hover:border-brandPrimary/40 dark:border-stone-800 dark:bg-stone-950"
              >
                <Icon className="size-4 text-stone-400" />
                <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 dark:text-stone-50">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{stat.label}</p>
              </a>
            )
          })}
        </div>
      </section>

      <div className="mt-16">
        <ReadyToGetStarted />
      </div>
    </div>
  )
}
