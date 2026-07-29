import competitors, { type Competitor } from 'data/comparisons'
import siteMetadata from 'data/siteMetadata'
import { HERO_DESCRIPTION, HERO_TITLE } from 'constants/hero'
import { HOME_FAQ_ITEMS } from 'constants/home-faq'
import {
  OSS_FEATURE_ROWS,
  PRICING_FAQ_ITEMS,
  PRICING_PLANS,
  PRICING_SEO,
  type PlanValue,
} from 'constants/pricing'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'

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

OpenLIT is an open source Harness Engineering platform and an open source AI engineering platform. Teams use it to instrument AI apps, manage prompts, run LLM evaluations, monitor agents, store API keys in Vault, and improve quality with production data. It is built on OpenTelemetry and free to self-host under Apache 2.0.

## Instrumentation paths

1. **Native SDKs** (Python, JavaScript, Go): \`pip install openlit\` / \`npm install openlit\` / \`go get github.com/openlit/openlit/sdk/go\`, then \`openlit.init()\`.
2. **eBPF controller** (enterprise): zero-code instrumentation for Kubernetes, Docker, and Linux.
3. **GPU collector**: OpenTelemetry GPU metrics for NVIDIA, AMD, and Intel.
4. **Any OTel source**: point OTel SDKs, OBI, OpenLLMetry, or other OTLP exporters at OpenLIT.

OpenLIT has ${SUPPORTED_INTEGRATIONS.length}+ integrations across LLMs, agent frameworks, vector databases, and GPUs.

## FAQ

${faqMarkdown(HOME_FAQ_ITEMS)}

## Related

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

> OpenLIT is building the open source Harness Engineering platform to help teams instrument, develop, manage, observe, and improve production AI systems faster.

- HTML: ${SITE}/about-us
- Markdown: ${SITE}/about-us.md
- GitHub: ${siteMetadata.siteRepo}
- Contact: ${siteMetadata.email}

## Story

We are excited about the potential of LLMs and generative AI, and the impact they will have on how software gets built. Doing our part to accelerate that shift is our mission.

OpenLIT started from the pain of shipping LLM apps without clear traces, cost, quality, or agent visibility. The answer was an OpenTelemetry-native AI engineering platform you can self-host free under Apache 2.0: LLM tracing, evaluations, Prompt Hub, Vault, OpenGround, coding agent monitoring, and GPU metrics in one place.

Today OpenLIT is used by developers worldwide. The project is open, community-driven, and built in public on GitHub.

## Join us

- Contribute: ${siteMetadata.siteRepo}/blob/main/CONTRIBUTING.md
- Docs: https://docs.openlit.io/latest/overview
- GitHub: ${siteMetadata.siteRepo}
- Email: ${siteMetadata.email}

Live contributor avatars and public GitHub metrics are shown on the HTML About page.
`
}

export function compareIndexMarkdown() {
  const links = competitors
    .map((c) => `- [${c.tagline}](${SITE}/compare/${c.slug}.md): ${c.description}`)
    .join('\n')

  return `# OpenLIT vs Alternatives

> Compare OpenLIT against Langfuse, Helicone, LangSmith, and Datadog. Honest, feature-by-feature comparison of LLM observability and monitoring tools.

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

  return `# ${competitor.heroHeadline}

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
    summary:
      'OpenLIT is building the open source Harness Engineering platform for production AI systems.',
    body: aboutMarkdown,
  },
  {
    mdPath: '/compare.md',
    htmlPath: '/compare',
    title: 'OpenLIT vs Alternatives',
    summary:
      'Compare OpenLIT against Langfuse, Helicone, LangSmith, and Datadog for LLM observability.',
    body: compareIndexMarkdown,
  },
  ...competitors.map((competitor) => ({
    mdPath: `/compare/${competitor.slug}.md`,
    htmlPath: `/compare/${competitor.slug}`,
    title: competitor.tagline,
    summary: competitor.description,
    body: () => comparePageMarkdown(competitor),
  })),
]

export function getMarkdownBySlug(slug: string[] | undefined): string | null {
  const path = !slug || slug.length === 0 ? '/' : `/${slug.join('/')}`
  const mdPath = path === '/' ? '/index.md' : `${path}.md`
  const page = LLM_PAGES.find((entry) => entry.mdPath === mdPath)
  return page ? page.body() : null
}

export function buildLlmsTxt() {
  const marketing = LLM_PAGES.map(
    (page) => `- [${page.title}](${SITE}${page.mdPath}): ${page.summary}`
  ).join('\n')

  return `# OpenLIT

> ${siteMetadata.description}

OpenLIT is an open source Harness Engineering platform. This file helps agents find clean Markdown versions of key marketing pages. Product documentation has its own index at ${DOCS_LLMS}.

## Marketing site (Markdown)

${marketing}

## HTML pages

- Home: ${SITE}/
- Pricing: ${SITE}/pricing
- About: ${SITE}/about-us
- Compare: ${SITE}/compare
- Blog: ${SITE}/blogs

## Full content dump

- ${SITE}/llms-full.txt

## Product documentation

- Docs llms.txt: ${DOCS_LLMS}
- Docs overview: https://docs.openlit.io/latest/overview
- Quickstart: https://docs.openlit.io/latest/openlit/quickstart-ai-observability

## Project

- GitHub: ${siteMetadata.siteRepo}
- License: Apache 2.0
- Contact: ${siteMetadata.email}
`
}

export function buildLlmsFullTxt() {
  return LLM_PAGES.map((page) => page.body().trim()).join('\n\n---\n\n') + '\n'
}
