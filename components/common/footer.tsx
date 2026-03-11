import siteMetadata from 'data/siteMetadata'

import Image from 'next/image'
import { Github, Linkedin, Mail, Slack, Twitter, Youtube } from '../social-icons/icons'

const Item = ({ link, text, target }: { link?: string; text?: string; target?: string }) =>
  link &&
  text && (
    <a className="opacity-60 hover:text-brandPrimary hover:opacity-100" href={link} target={target}>
      {text}
    </a>
  )

const linkGroups = [
  {
    heading: 'Documentation',
    links: [
      { text: 'Introduction', link: 'https://docs.openlit.io/latest/overview' },
      { text: 'SDK Overview', link: 'https://docs.openlit.io/latest/sdk/overview' },
      { text: 'Kubernetes Operator', link: 'https://docs.openlit.io/latest/operator/overview' },
      { text: 'Integrations', link: 'https://docs.openlit.io/latest/sdk/integrations/overview' },
      { text: 'Destinations', link: 'https://docs.openlit.io/latest/sdk/destinations/overview' },
    ],
  },
  {
    heading: 'Features',
    links: [
      { text: 'GPU Monitoring', link: 'https://docs.openlit.io/latest/sdk/features/gpu' },
      { text: 'Evaluations', link: 'https://docs.openlit.io/latest/sdk/features/evaluations' },
      {
        text: 'Fleet Hub',
        link: 'https://docs.openlit.io/latest/openlit/observability/fleet-hub',
      },
      {
        text: 'Prompt Hub',
        link: 'https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub',
      },
      {
        text: 'Vault',
        link: 'https://docs.openlit.io/latest/openlit/developer-resources/vault',
      },
    ],
  },
  {
    heading: 'Company',
    links: [
      { text: 'About Us', link: '/about-us' },
      { text: 'Blog', link: '/blogs' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'Support Us', link: 'https://opencollective.com/openlit' },
    ],
  },
  {
    heading: 'Comparisons',
    links: [
      { text: 'vs Langfuse', link: '/compare/openlit-vs-langfuse' },
      { text: 'vs Helicone', link: '/compare/openlit-vs-helicone' },
      { text: 'vs LangSmith', link: '/compare/openlit-vs-langsmith' },
      { text: 'vs Datadog', link: '/compare/openlit-vs-datadog' },
      { text: 'All Comparisons', link: '/compare' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { text: 'Privacy Policy', link: '/privacy-policy' },
      { text: 'Terms of Service', link: '/terms' },
      {
        text: 'Security',
        link: 'https://github.com/openlit/openlit/blob/main/SECURITY.md',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/openlit/openlit/blob/main/CONTRIBUTING.md',
      },
      { text: 'License', link: 'https://github.com/openlit/openlit/blob/main/LICENSE' },
    ],
  },
]

const socialLinks = [
  { href: siteMetadata.github, icon: Github, label: 'GitHub' },
  { href: siteMetadata.twitter, icon: Twitter, label: 'Twitter' },
  { href: `mailto:${siteMetadata.email}`, icon: Mail, label: 'Email' },
  { href: siteMetadata.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteMetadata.youtube, icon: Youtube, label: 'YouTube' },
  { href: siteMetadata.slack, icon: Slack, label: 'Slack' },
]

export default function Footer() {
  return (
    <footer id="footer">
      <section className="container py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:w-56 lg:shrink-0">
            <a href="/" className="flex items-center gap-2 text-xl font-bold">
              <Image
                className="size-10 shrink-0 p-1 transition duration-75"
                src="/static/images/logo.png"
                alt="OpenLIT logo"
                priority
                width={40}
                height={40}
              />
              {siteMetadata.headerTitle}
            </a>
            <p className="text-sm leading-relaxed opacity-60">
              Open-source LLM observability and AI engineering platform built on OpenTelemetry.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex w-5 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon color="currentColor" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {linkGroups.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-40">
                  {group.heading}
                </h3>
                {group.links.map((item) => (
                  <Item key={item.text} link={item.link} text={item.text} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container border-t border-white/10 py-6 text-center">
        <p className="text-sm opacity-50">
          &copy; {new Date().getFullYear()} AI Engineering Platform by{' '}
          <a
            target="_blank"
            href={siteMetadata.github}
            className="text-brandPrimary opacity-100 transition-all hover:underline"
          >
            OpenLIT
          </a>
        </p>
      </section>
    </footer>
  )
}
