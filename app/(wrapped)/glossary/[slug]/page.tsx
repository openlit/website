import { notFound } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { GlossaryTermContent } from '@/components/glossary/glossary-content'
import {
  createDefinedTermSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import GLOSSARY_TERMS, { getGlossaryTerm } from 'data/glossary'
import { createFaqPageSchema } from 'constants/home-faq'
import { BookMarked } from 'lucide-react'

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((term) => ({ slug: term.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const term = getGlossaryTerm(params.slug)
  if (!term) return {}

  return genPageMetadata({
    title: term.title,
    description: term.description,
    keywords: [
      term.name,
      `what is ${term.name.toLowerCase()}`,
      'agent harness engineering',
      'OpenLIT glossary',
    ],
    canonicalUrl: `https://openlit.io/glossary/${term.slug}`,
    markdownUrl: `https://openlit.io/glossary/${term.slug}.md`,
  })
}

export default function GlossaryTermPage({ params }: { params: { slug: string } }) {
  const term = getGlossaryTerm(params.slug)
  if (!term) notFound()

  const url = `https://openlit.io/glossary/${term.slug}`
  const pageSchema = createWebPageSchema(term.title, url, term.description, [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Glossary', url: 'https://openlit.io/glossary' },
    { name: term.name, url },
  ])
  const termSchema = createDefinedTermSchema({
    name: term.name,
    description: term.definition,
    url,
  })
  const faqSchema = term.faq ? createFaqPageSchema(term.faq, url) : null

  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, termSchema, faqSchema].filter(Boolean))} />
      <FeaturePageHeader
        eyebrow="Glossary"
        title={term.name}
        icon={<BookMarked className="h-4 w-4" />}
        tone="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
      />
      <GlossaryTermContent term={term} />
    </>
  )
}

export const runtime = 'edge'
