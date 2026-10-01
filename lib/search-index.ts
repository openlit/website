import competitors from 'data/comparisons'
import GLOSSARY_TERMS from 'data/glossary'
import { HERO_TITLE } from 'constants/hero'

export type SearchItem = {
  id: string
  title: string
  description?: string
  href: string
  category: 'Page' | 'Blog' | 'Compare' | 'Docs'
  keywords?: string
  external?: boolean
}

export const STATIC_SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'page-home',
    title: 'Home',
    description: HERO_TITLE,
    href: '/',
    category: 'Page',
    keywords: 'openlit landing hero agent harness engineering',
  },
  {
    id: 'page-pricing',
    title: 'Pricing',
    description: 'OpenLIT pricing and plans',
    href: '/pricing',
    category: 'Page',
    keywords: 'plans cost free self-host',
  },
  {
    id: 'page-compare',
    title: 'Compare',
    description: 'Compare OpenLIT with other agent observability and evals tools',
    href: '/compare',
    category: 'Page',
    keywords: 'vs competitors alternatives agent observability',
  },
  {
    id: 'page-harness',
    title: 'What is agent harness engineering?',
    description: 'Definition, layers, and tools for agent harness engineering',
    href: '/agent-harness-engineering',
    category: 'Page',
    keywords: 'agent harness harness engineering pillar',
  },
  {
    id: 'page-glossary',
    title: 'Agent harness glossary',
    description: 'Definitions for harness, observability, evals, and guardrails',
    href: '/glossary',
    category: 'Page',
    keywords: 'glossary definitions agent harness',
  },
  {
    id: 'page-blogs',
    title: 'Blogs',
    description: 'Guides on agent harness engineering and observability',
    href: '/blogs',
    category: 'Page',
    keywords: 'posts articles news',
  },
  {
    id: 'page-about',
    title: 'About Us',
    description: 'Learn about the OpenLIT team and mission',
    href: '/about-us',
    category: 'Page',
    keywords: 'company team',
  },
  {
    id: 'page-privacy',
    title: 'Privacy Policy',
    href: '/privacy-policy',
    category: 'Page',
  },
  {
    id: 'page-terms',
    title: 'Terms of Service',
    href: '/terms',
    category: 'Page',
  },
  {
    id: 'docs-overview',
    title: 'Documentation',
    description: 'OpenLIT docs overview',
    href: 'https://docs.openlit.io/latest/overview',
    category: 'Docs',
    external: true,
    keywords: 'docs guide sdk',
  },
  {
    id: 'docs-quickstart',
    title: 'Quickstart',
    description: 'Get started with OpenLIT',
    href: 'https://docs.openlit.io/latest/openlit/quickstart-ai-observability',
    category: 'Docs',
    external: true,
    keywords: 'install setup',
  },
  {
    id: 'docs-dashboards',
    title: 'Dashboards',
    description: 'LLM dashboards documentation',
    href: 'https://docs.openlit.io/latest/openlit/dashboards/overview',
    category: 'Docs',
    external: true,
  },
  ...competitors.map((competitor) => ({
    id: `compare-${competitor.slug}`,
    title: `OpenLIT vs ${competitor.name}`,
    description: competitor.description,
    href: `/compare/${competitor.slug}`,
    category: 'Compare' as const,
    keywords: `${competitor.name} vs openlit alternative comparison`,
  })),
  ...GLOSSARY_TERMS.map((term) => ({
    id: `glossary-${term.slug}`,
    title: term.name,
    description: term.definition,
    href: `/glossary/${term.slug}`,
    category: 'Page' as const,
    keywords: `glossary ${term.name} definition`,
  })),
]

export function matchesSearch(item: SearchItem, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [item.title, item.description, item.keywords, item.category, item.href]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return q.split(/\s+/).every((token) => haystack.includes(token))
}
