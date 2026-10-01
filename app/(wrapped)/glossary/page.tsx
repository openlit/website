import { genPageMetadata } from 'app/seo'
import { GlossaryIndexContent } from '@/components/glossary/glossary-content'
import {
  createDefinedTermSetSchema,
  createJsonLdGraph,
  createWebPageSchema,
} from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import GLOSSARY_TERMS from 'data/glossary'
import { BookMarked } from 'lucide-react'

const TITLE = 'Agent Harness Glossary'
const DESCRIPTION =
  'Definitions for agent harness, harness engineering, agent observability, agent evals, guardrails, and trajectory evaluation—the vocabulary of agent harness engineering.'
const URL = 'https://openlit.io/glossary'

export const metadata = genPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'agent harness glossary',
    'what is an agent harness',
    'harness engineering',
    'agent observability',
    'agent evals',
    'trajectory evaluation',
  ],
  canonicalUrl: URL,
  markdownUrl: `${URL}.md`,
})

const pageSchema = createWebPageSchema(TITLE, URL, DESCRIPTION, [
  { name: 'Home', url: 'https://openlit.io' },
  { name: 'Glossary', url: URL },
])

const termSetSchema = createDefinedTermSetSchema({
  name: 'OpenLIT Agent Harness Glossary',
  url: URL,
  description: DESCRIPTION,
  terms: GLOSSARY_TERMS,
})

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, termSetSchema])} />
      <FeaturePageHeader
        eyebrow="Concepts"
        title="Glossary"
        icon={<BookMarked className="h-4 w-4" />}
        tone="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
      />
      <GlossaryIndexContent />
    </>
  )
}

export const runtime = 'edge'
