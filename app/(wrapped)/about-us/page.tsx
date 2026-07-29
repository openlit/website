import { genPageMetadata } from 'app/seo'
import AboutUsContent from 'components/about-us-content'
import { createWebPageSchema } from '@/components/structuredData'
import FeaturePageHeader from '@/components/shell/feature-page-header'
import { Info } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'About OpenLIT',
  description:
    'Learn about OpenLIT, the open source Harness Engineering platform. Meet contributors from GitHub and see how we help teams build production AI systems.',
  keywords: [
    'About OpenLIT',
    'OpenLIT team',
    'Harness Engineering',
    'open source AI engineering platform',
    'OpenLIT contributors',
    'OpenTelemetry AI platform',
  ],
  canonicalUrl: 'https://openlit.io/about-us',
})

const pageSchema = createWebPageSchema(
  'About OpenLIT',
  'https://openlit.io/about-us',
  'Learn about OpenLIT, the open source Harness Engineering platform.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'About', url: 'https://openlit.io/about-us' },
  ]
)

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
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
