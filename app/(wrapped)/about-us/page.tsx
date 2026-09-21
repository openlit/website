import { genPageMetadata } from 'app/seo'
import AboutUsContent from 'components/about-us-content'
import { createJsonLdGraph, createWebPageSchema, SCHEMA_IDS } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { Info } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'About OpenLIT',
  description:
    'OpenLIT is an open-source Agent Harness Engineering platform. Meet contributors from GitHub and see how we help teams instrument, evaluate, and improve production AI systems.',
  keywords: [
    'About OpenLIT',
    'OpenLIT team',
    'Agent Harness Engineering',
    'open source AI engineering platform',
    'OpenLIT contributors',
    'OpenTelemetry AI platform',
  ],
  canonicalUrl: 'https://openlit.io/about-us',
  markdownUrl: 'https://openlit.io/about-us.md',
})

const pageSchema = createWebPageSchema(
  'About OpenLIT',
  'https://openlit.io/about-us',
  'OpenLIT is an open-source Agent Harness Engineering platform built on OpenTelemetry.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'About', url: 'https://openlit.io/about-us' },
  ],
  {
    pageType: 'AboutPage',
    fields: {
      mainEntity: [{ '@id': SCHEMA_IDS.org }, { '@id': SCHEMA_IDS.founder }],
    },
  }
)

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema])} />
      <FeaturePageHeader
        eyebrow="Company"
        title="About"
        icon={<Info className="h-4 w-4" />}
        tone="border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
      />
      <AboutUsContent />
    </>
  )
}

export const runtime = 'edge'
