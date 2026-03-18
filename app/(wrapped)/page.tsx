import Hero from '@/components/home/hero'
import Sponsored from '@/components/home/sponsored'
// import { TrustedBy } from '@/components/home/trusted-by'
import ProductDetails from '@/components/home/product-details'
import { Integration } from '@/components/home/integration'
import { Community } from '@/components/home/community'
import ReadyToGetStarted from '@/components/common/ready-to-get-started'
import { genPageMetadata } from 'app/seo'
import { createWebPageSchema } from '@/components/structuredData'

export const metadata = genPageMetadata({
  title: 'Open Source Platform for AI Engineering',
  description:
    'OpenLIT is an open-source LLM observability platform built on OpenTelemetry. Monitor, trace, and evaluate AI apps with one line of code. Free to self-host.',
  canonicalUrl: 'https://openlit.io',
})

const homepageSchema = createWebPageSchema(
  'OpenLIT - Open Source Platform for AI Engineering',
  'https://openlit.io',
  'OpenLIT is an open-source LLM observability platform built on OpenTelemetry. Monitor, trace, and evaluate AI apps with one line of code.',
  [{ name: 'Home', url: 'https://openlit.io' }]
)

export default function Page() {
  return (
    <main className="mb-auto overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-between">
        <Hero />
        <Sponsored />
        {/* <TrustedBy /> */}
        <ProductDetails />
        <Integration />
        <Community />
        <ReadyToGetStarted className="px-4" />
      </div>
    </main>
  )
}

export const runtime = 'edge'
