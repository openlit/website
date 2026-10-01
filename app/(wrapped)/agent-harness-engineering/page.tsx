import { genPageMetadata } from 'app/seo'
import AgentHarnessEngineeringContent from '@/components/agent-harness-engineering/pillar-content'
import { createJsonLdGraph, createTechArticleSchema } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { createFaqPageSchema } from 'constants/home-faq'
import { PILLAR_FAQ } from 'constants/pillar-faq'
import { BookOpen } from 'lucide-react'

const TITLE = 'What Is Agent Harness Engineering? Definition, Layers & Tools'
const DESCRIPTION =
  'Agent harness engineering is the discipline of designing, measuring and improving everything around the model in an AI agent. Definition, layers, and tools.'
const URL = 'https://openlit.io/agent-harness-engineering'
const PUBLISHED = '2026-10-01'

export const metadata = genPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'agent harness engineering',
    'what is agent harness engineering',
    'harness engineering',
    'agent harness',
    'agent observability',
    'agent evals',
    'OpenLIT',
  ],
  canonicalUrl: URL,
  markdownUrl: `${URL}.md`,
})

const pageSchema = createTechArticleSchema({
  name: TITLE,
  url: URL,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  breadcrumbs: [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Agent harness engineering', url: URL },
  ],
})

const faqSchema = createFaqPageSchema(PILLAR_FAQ, URL)

export default function AgentHarnessEngineeringPage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema, faqSchema])} />
      <FeaturePageHeader
        eyebrow="Concepts"
        title="Agent harness engineering"
        icon={<BookOpen className="h-4 w-4" />}
        tone="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300"
      />
      <AgentHarnessEngineeringContent />
    </>
  )
}

export const runtime = 'edge'
