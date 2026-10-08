import competitors, { type Competitor } from 'data/comparisons'
import GLOSSARY_TERMS, { type GlossaryTerm } from 'data/glossary'
import siteMetadata from 'data/siteMetadata'
import { HERO_DESCRIPTION, HERO_TITLE } from 'constants/hero'
import { HOME_FAQ_ITEMS } from 'constants/home-faq'
import { OPENLIT_DEFINITION, OPENLIT_POSITIONING } from 'constants/openlit-definition'
import {
  OSS_FEATURE_ROWS,
  PRICING_FAQ_ITEMS,
  PRICING_PLANS,
  PRICING_SEO,
  type PlanValue,
} from 'constants/pricing'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'
import { PILLAR_FAQ } from 'constants/pillar-faq'
import { overviewPlainText } from 'constants/home-overview'
import { WHEN_TO_USE_SECTION } from 'lib/agent/instructions'
import { CONTACT_MARKDOWN, PRIVACY_MARKDOWN, SANDBOX_MARKDOWN } from 'lib/agent/trust-copy'

const SITE = siteMetadata.siteUrl.replace(/\/$/, '')
const DOCS_LLMS = 'https://docs.openlit.io/llms.txt'

export type LlmPage = {
  /** Public markdown URL path, e.g. `/pricing.md` */
  mdPath: string
  /** Human HTML URL path, e.g. `/pricing` */
  htmlPath: string
  title: string
  summary: string
  body: () => string
}

function formatPlanValue(value: PlanValue) {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return String(value)
}

function formatCompareValue(value: boolean | string) {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return String(value)
}

function faqMarkdown(items: { question: string; answer: string }[]) {
  return items.map((item) => `### ${item.question}\n\n${item.answer}`).join('\n\n')
}

export function homeMarkdown() {
  return `# ${HERO_TITLE}

> ${HERO_DESCRIPTION}

- Site: ${SITE}
- Docs: https://docs.openlit.io/latest/openlit/quickstart-ai-observability
- GitHub: ${siteMetadata.siteRepo}
- License: Apache 2.0
- Markdown: ${SITE}/index.md

## What OpenLIT is

${OPENLIT_DEFINITION}

${OPENLIT_POSITIONING}

## Instrumentation paths

1. **Native SDKs** (Python, JavaScript, Go): \`pip install openlit\` / \`npm install openlit\` / \`go get github.com/openlit/openlit/sdk/go\`, then \`openlit.init()\`.
2. **Official CLI** (coding agents): \`brew install openlit/openlit/openlit\`. Formula: https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb. Docs: https://docs.openlit.io/latest/cli/installation.
3. **eBPF controller** (enterprise): zero-code instrumentation for Kubernetes, Docker, and Linux.
4. **GPU collector**: OpenTelemetry GPU metrics for NVIDIA, AMD, and Intel.
5. **Any OTel source**: point OTel SDKs, OBI, OpenLLMetry, or other OTLP exporters at OpenLIT.

OpenLIT has ${SUPPORTED_INTEGRATIONS.length}+ integrations across LLMs, agent frameworks, vector databases, and GPUs.

## FAQ

${faqMarkdown(HOME_FAQ_ITEMS.filter((item) => !item.excludeFromSchema))}

## Start here

${overviewPlainText()}

## Related

- Agent harness engineering: ${SITE}/agent-harness-engineering.md
- Glossary: ${SITE}/glossary.md
- Pricing: ${SITE}/pricing.md
- About: ${SITE}/about-us.md
- Compare: ${SITE}/compare.md
- Product docs (llms.txt): ${DOCS_LLMS}
`
}

export function pricingMarkdown() {
  const oss = PRICING_PLANS.oss
  const cloud = PRICING_PLANS.cloud

  const ossFeatures = OSS_FEATURE_ROWS.map((category) => {
    const rows = category.features
      .map((feature) => `- ${feature.name}: ${formatPlanValue(feature.included)}`)
      .join('\n')
    return `### ${category.category}\n\n${category.blurb ? `${category.blurb}\n\n` : ''}${rows}`
  }).join('\n\n')

  return `# ${PRICING_SEO.title}

> ${PRICING_SEO.description}

- HTML: ${SITE}/pricing
- Markdown: ${SITE}/pricing.md

## Plans

### ${oss.name} (${oss.badge})

${oss.summary}

- Price: ${oss.priceLabel}. ${oss.priceHint}
- CTA: [${oss.ctaLabel}](${oss.ctaHref})
- Docs: [${oss.secondaryLabel}](${oss.secondaryHref})

Highlights:

${oss.highlights.map((item) => `- ${item}`).join('\n')}

### ${cloud.name} (${cloud.badge})

${cloud.summary}

- Price: ${cloud.priceLabel}. ${cloud.priceHint}
- CTA: [${cloud.ctaLabel}](${cloud.ctaHref})

Highlights:

${cloud.highlights.map((item) => `- ${item}`).join('\n')}

## OSS features included

${ossFeatures}

## FAQ

${faqMarkdown(PRICING_FAQ_ITEMS)}
`
}

export function aboutMarkdown() {
  return `# About OpenLIT

> ${siteMetadata.description}

- HTML: ${SITE}/about-us
- Markdown: ${SITE}/about-us.md
- GitHub: ${siteMetadata.siteRepo}
- Contact: ${siteMetadata.email}

## Story

We are excited about the potential of LLMs and generative AI, and the impact they will have on how software gets built. Doing our part to accelerate that shift is our mission.

OpenLIT started from the pain of shipping LLM apps without clear traces, cost, quality, or agent visibility. The answer was an OpenTelemetry-native agent harness engineering platform you can self-host free under Apache 2.0: agent observability, evals, Prompt Hub, Vault, OpenGround, coding agent monitoring, and GPU metrics in one place.

Today OpenLIT is used by developers worldwide. The project is open, community-driven, and built in public on GitHub.

## Join us

- Contribute: ${siteMetadata.siteRepo}/blob/main/CONTRIBUTING.md
- Docs: https://docs.openlit.io/latest/overview
- GitHub: ${siteMetadata.siteRepo}
- Email: ${siteMetadata.email}

Live contributor avatars and public GitHub metrics are shown on the HTML About page.
`
}

export function videosMarkdown() {
  return `# OpenLIT Videos

> Demos, talks, and deep dives from the OpenLIT YouTube channel on agent observability, OpenTelemetry tracing, evals, and prompt management.

- HTML: ${SITE}/videos
- Markdown: ${SITE}/videos.md
- YouTube: ${siteMetadata.youtube}
- Shorts: ${SITE}/shorts

The videos list updates automatically from the OpenLIT YouTube channel (RSS by default; optional YouTube Data API when \`YOUTUBE_API_KEY\` is set). Each video has an indexable watch page at \`/videos/{id}\` with VideoObject structured data. Playback uses the official YouTube IFrame embed so views count on YouTube.

## Related

- Shorts: ${SITE}/shorts.md
- About: ${SITE}/about-us.md
- Blog: ${SITE}/blogs
`
}

export function shortsMarkdown() {
  return `# OpenLIT Shorts

> Vertical YouTube Shorts from OpenLIT — quick tips on tracing AI agents, OpenTelemetry, evals, and prompt management.

- HTML: ${SITE}/shorts
- Markdown: ${SITE}/shorts.md
- YouTube: ${siteMetadata.youtube}
- Videos: ${SITE}/videos

The Shorts experience mirrors YouTube Shorts (full-height snap scrolling, mute/unmute, share). Each Short has an indexable page at \`/shorts/{id}\`. Without a YouTube API key, Shorts are detected via \`#shorts\` in the title/description and by checking whether \`/shorts/{id}\` stays on the Shorts URL.

## Related

- Videos: ${SITE}/videos.md
- About: ${SITE}/about-us.md
`
}

export function compareIndexMarkdown() {
  const links = competitors
    .map((c) => `- [${c.tagline}](${SITE}/compare/${c.slug}.md): ${c.description}`)
    .join('\n')

  return `# OpenLIT vs Alternatives: Agent Observability & Evals Tools Compared

> Compare OpenLIT with Langfuse, LangSmith, Arize Phoenix, Braintrust, Opik, Helicone, Datadog, OpenLLMetry and more for agent observability, evals and guardrails.

- HTML: ${SITE}/compare
- Markdown: ${SITE}/compare.md

## Comparisons

${links}
`
}

export function comparePageMarkdown(competitor: Competitor) {
  const tables = competitor.features
    .map((category) => {
      const header = `| Feature | OpenLIT | ${competitor.name} |\n| --- | --- | --- |`
      const rows = category.features
        .map(
          (feature) =>
            `| ${feature.name} | ${formatCompareValue(feature.openlit)} | ${formatCompareValue(feature.competitor)} |`
        )
        .join('\n')
      return `### ${category.category}\n\n${header}\n${rows}`
    })
    .join('\n\n')

  return `# OpenLIT vs ${competitor.name} (2026): Open-Source ${competitor.name} Alternative

> ${competitor.heroSubheadline}

- HTML: ${SITE}/compare/${competitor.slug}
- Markdown: ${SITE}/compare/${competitor.slug}.md

${competitor.description}

## Feature comparison

${tables}

## When to choose OpenLIT

${competitor.summary.chooseOpenlit.map((item) => `- ${item}`).join('\n')}

## When to choose ${competitor.name}

${competitor.summary.chooseCompetitor.map((item) => `- ${item}`).join('\n')}

## Related

- All comparisons: ${SITE}/compare.md
- Pricing: ${SITE}/pricing.md
- Docs: https://docs.openlit.io/latest/openlit/quickstart-ai-observability
`
}

export function pillarMarkdown() {
  return `# What is agent harness engineering?

> Agent harness engineering is the discipline of designing, measuring and improving everything around the model in an AI agent. Definition, layers, and tools.

- HTML: ${SITE}/agent-harness-engineering
- Markdown: ${SITE}/agent-harness-engineering.md

${OPENLIT_POSITIONING}

## What is agent harness engineering?

An AI agent is a model plus a harness. The harness is everything except the model: tools, context, prompts, memory, hooks, guardrails, and feedback loops. Harness engineering treats every repeated agent failure as a harness defect to observe, classify, fix, and verify.

## The harness engineering loop

Run → observe → evaluate → fix the harness → verify → repeat.

## FAQ

${faqMarkdown(PILLAR_FAQ)}

## Related

- Glossary: ${SITE}/glossary.md
- Compare: ${SITE}/compare.md
- Home: ${SITE}/index.md
`
}

export function glossaryIndexMarkdown() {
  const links = GLOSSARY_TERMS.map(
    (term) => `- [${term.name}](${SITE}/glossary/${term.slug}.md): ${term.definition}`
  ).join('\n')

  return `# Agent Harness Glossary

> Definitions for agent harness, harness engineering, agent observability, agent evals, guardrails, and trajectory evaluation.

- HTML: ${SITE}/glossary
- Markdown: ${SITE}/glossary.md

## Terms

${links}

## Related

- Pillar: ${SITE}/agent-harness-engineering.md
`
}

export function glossaryTermMarkdown(term: GlossaryTerm) {
  const related = (term.relatedSlugs || [])
    .map((slug) => GLOSSARY_TERMS.find((entry) => entry.slug === slug))
    .filter(Boolean)
    .map((entry) => `- [${entry!.name}](${SITE}/glossary/${entry!.slug}.md)`)
    .join('\n')

  return `# What is ${term.name.toLowerCase()}?

> ${term.definition}

- HTML: ${SITE}/glossary/${term.slug}
- Markdown: ${SITE}/glossary/${term.slug}.md

${term.body.map((paragraph) => paragraph).join('\n\n')}

${term.faq ? `## FAQ\n\n${faqMarkdown(term.faq)}\n` : ''}
## Related

${related || `- Glossary index: ${SITE}/glossary.md`}
- Pillar: ${SITE}/agent-harness-engineering.md
`
}

export function contactMarkdown() {
  return CONTACT_MARKDOWN
}

export function privacyMarkdown() {
  return PRIVACY_MARKDOWN
}

export function sandboxMarkdown() {
  return SANDBOX_MARKDOWN
}

export const LLM_PAGES: LlmPage[] = [
  {
    mdPath: '/index.md',
    htmlPath: '/',
    title: HERO_TITLE,
    summary: HERO_DESCRIPTION,
    body: homeMarkdown,
  },
  {
    mdPath: '/pricing.md',
    htmlPath: '/pricing',
    title: PRICING_SEO.title,
    summary: PRICING_SEO.description,
    body: pricingMarkdown,
  },
  {
    mdPath: '/about-us.md',
    htmlPath: '/about-us',
    title: 'About OpenLIT',
    summary: HERO_DESCRIPTION,
    body: aboutMarkdown,
  },
  {
    mdPath: '/contact.md',
    htmlPath: '/contact',
    title: 'Contact OpenLIT',
    summary:
      'Email contact@openlit.io. Headquarters in New Delhi, India. Security, product, and press. Self-host without a sales call.',
    body: contactMarkdown,
  },
  {
    mdPath: '/privacy.md',
    htmlPath: '/privacy',
    title: 'Privacy Policy',
    summary:
      'How OpenLIT handles information on openlit.io. Self-hosted OpenLIT does not send your traces to us.',
    body: privacyMarkdown,
  },
  {
    mdPath: '/sandbox.md',
    htmlPath: '/sandbox',
    title: 'OpenLIT local sandbox',
    summary:
      'Free Docker Compose sandbox. Create your own API key in the local UI. No credit card and no sales form.',
    body: sandboxMarkdown,
  },
  {
    mdPath: '/videos.md',
    htmlPath: '/videos',
    title: 'OpenLIT Videos',
    summary:
      'Demos, talks, and deep dives from the OpenLIT YouTube channel on agent observability and OpenTelemetry.',
    body: videosMarkdown,
  },
  {
    mdPath: '/shorts.md',
    htmlPath: '/shorts',
    title: 'OpenLIT Shorts',
    summary:
      'Vertical YouTube Shorts from OpenLIT with quick tips on tracing AI agents, evals, and prompts.',
    body: shortsMarkdown,
  },
  {
    mdPath: '/compare.md',
    htmlPath: '/compare',
    title: 'OpenLIT vs Alternatives: Agent Observability & Evals Tools Compared',
    summary:
      'Compare OpenLIT with Langfuse, LangSmith, Arize Phoenix, Braintrust, Opik, Helicone, Datadog and OpenLLMetry for agent observability, evals and guardrails.',
    body: compareIndexMarkdown,
  },
  {
    mdPath: '/agent-harness-engineering.md',
    htmlPath: '/agent-harness-engineering',
    title: 'What Is Agent Harness Engineering?',
    summary:
      'Agent harness engineering is the discipline of designing, measuring and improving everything around the model in an AI agent.',
    body: pillarMarkdown,
  },
  {
    mdPath: '/glossary.md',
    htmlPath: '/glossary',
    title: 'Agent Harness Glossary',
    summary:
      'Definitions for agent harness, harness engineering, agent observability, agent evals, guardrails, and trajectory evaluation.',
    body: glossaryIndexMarkdown,
  },
  ...competitors.map((competitor) => ({
    mdPath: `/compare/${competitor.slug}.md`,
    htmlPath: `/compare/${competitor.slug}`,
    title: `OpenLIT vs ${competitor.name} (2026): Open-Source ${competitor.name} Alternative`,
    summary: competitor.description,
    body: () => comparePageMarkdown(competitor),
  })),
  ...GLOSSARY_TERMS.map((term) => ({
    mdPath: `/glossary/${term.slug}.md`,
    htmlPath: `/glossary/${term.slug}`,
    title: term.title,
    summary: term.description,
    body: () => glossaryTermMarkdown(term),
  })),
]

const MARKDOWN_ALIASES: Record<string, string> = {
  '/about': '/about-us.md',
  '/about-us': '/about-us.md',
}

export function markdownForPathname(pathname: string): string | null {
  let path = pathname.split('?')[0] || '/'
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  if (path.endsWith('.md')) {
    path = path === '/index.md' ? '/' : path.slice(0, -3)
  }
  const mdPath = MARKDOWN_ALIASES[path] || (path === '/' ? '/index.md' : `${path}.md`)
  const page = LLM_PAGES.find((entry) => entry.mdPath === mdPath || entry.htmlPath === path)
  return page ? page.body() : null
}

export function getMarkdownBySlug(slug: string[] | undefined): string | null {
  const path = !slug || slug.length === 0 ? '/' : `/${slug.join('/')}`
  return markdownForPathname(path)
}

const FEATURED_BLOGS = [
  {
    title: 'Best Langfuse alternatives (open source, 2026)',
    path: '/blogs/langfuse-alternatives',
    summary:
      'Honest roundup of open-source Langfuse alternatives: OpenLIT, Phoenix, Opik, Helicone, and OpenLLMetry, with license, self-host, and OpenTelemetry stance.',
  },
  {
    title: 'Best open-source tools for LLM evaluation and prompt management (2026)',
    path: '/blogs/open-source-llm-evaluation-prompt-management',
    summary:
      'Roundup of open-source LLM evaluation and prompt management tools, including OpenLIT Prompt Hub, Langfuse, Phoenix, Opik, Braintrust, and Promptfoo.',
  },
]

export function buildLlmsTxt() {
  const marketing = LLM_PAGES.map(
    (page) => `- [${page.title}](${SITE}${page.mdPath}): ${page.summary}`
  ).join('\n')

  const blogs = FEATURED_BLOGS.map(
    (post) => `- [${post.title}](${SITE}${post.path}): ${post.summary}`
  ).join('\n')

  return `# OpenLIT

> ${siteMetadata.description}

This file helps agents find clean Markdown versions of key marketing pages and high-intent blog posts. Product documentation has its own index at ${DOCS_LLMS}.

${WHEN_TO_USE_SECTION}
## What OpenLIT is

${OPENLIT_DEFINITION}

${OPENLIT_POSITIONING}

## Key concepts

- **Agent harness**: everything in an AI agent except the model (tools, context, prompts, memory, hooks, guardrails, feedback loops). See ${SITE}/glossary/agent-harness.md
- **Agent harness engineering**: designing, measuring, and improving that harness so agents are reliable in production. See ${SITE}/agent-harness-engineering.md
- **OpenLIT's role**: open-source platform to trace, evaluate, guard, and improve any harness on OpenTelemetry—not a runtime harness itself.

## Marketing site (Markdown)

${marketing}

## Buyer guides (HTML)

${blogs}

## HTML pages

- Home: ${SITE}/
- Agent harness engineering: ${SITE}/agent-harness-engineering
- Glossary: ${SITE}/glossary
- Pricing: ${SITE}/pricing
- About: ${SITE}/about-us
- Contact: ${SITE}/contact
- Privacy: ${SITE}/privacy
- Sandbox: ${SITE}/sandbox
- Compare: ${SITE}/compare
- Blog: ${SITE}/blogs
- Videos: ${SITE}/videos
- Shorts: ${SITE}/shorts

## Full content dump

- ${SITE}/llms-full.txt

## Product documentation

- Docs llms.txt: ${DOCS_LLMS}
- Docs overview: https://docs.openlit.io/latest/overview
- Quickstart: https://docs.openlit.io/latest/openlit/quickstart-ai-observability
- Evaluations: https://docs.openlit.io/latest/openlit/evaluations/overview
- Prompt Hub: https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub/overview

## Machine-readable

- OpenAPI: ${SITE}/openapi.json
- OAuth metadata: ${SITE}/.well-known/oauth-authorization-server
- Protected resource metadata: ${SITE}/.well-known/oauth-protected-resource
- CLI formula: https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb

## Project

- GitHub: ${siteMetadata.siteRepo}
- License: Apache 2.0
- Contact: ${siteMetadata.email}
`
}

export function buildLlmsFullTxt() {
  return LLM_PAGES.map((page) => page.body().trim()).join('\n\n---\n\n') + '\n'
}
