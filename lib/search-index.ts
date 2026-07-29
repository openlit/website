import competitors from 'data/comparisons'
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
    keywords: 'openlit landing hero',
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
    description: 'Compare OpenLIT with other LLM observability tools',
    href: '/compare',
    category: 'Page',
    keywords: 'vs competitors alternatives',
  },
  {
    id: 'page-blogs',
    title: 'Blogs',
    description: 'Guides and articles about LLM observability',
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
    href: 'https://docs.openlit.io/latest/quickstart',
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
    title: competitor.tagline,
    description: competitor.description,
    href: `/compare/${competitor.slug}`,
    category: 'Compare' as const,
    keywords: `${competitor.name} vs openlit comparison`,
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
