import Hero from '@/components/home/hero'
import { TrustedBy } from '@/components/home/trusted-by'
import PlatformFeatures from '@/components/home/platform-features'
import WorksWithStack from '@/components/home/works-with-stack'
import OpenPlatform from '@/components/home/open-platform'
import WhyOpenlit from '@/components/home/why-openlit'
import HomeFaq from '@/components/home/home-faq'
import { genPageMetadata } from 'app/seo'
import { createWebPageSchema } from '@/components/structuredData'
import { HERO_DESCRIPTION, HERO_KEYWORDS, HERO_TITLE } from 'constants/hero'
import { createFaqPageSchema, HOME_FAQ_ITEMS } from 'constants/home-faq'

export const metadata = genPageMetadata({
  title: HERO_TITLE,
  description: HERO_DESCRIPTION,
  keywords: HERO_KEYWORDS,
  canonicalUrl: 'https://openlit.io',
})

const homepageSchema = createWebPageSchema(
  `OpenLIT - ${HERO_TITLE}`,
  'https://openlit.io',
  HERO_DESCRIPTION,
  [{ name: 'Home', url: 'https://openlit.io' }]
)

const faqSchema = createFaqPageSchema(HOME_FAQ_ITEMS)

export default function Page() {
  return (
    <main className="mb-auto overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-between">
        <Hero />
        <TrustedBy />
        <PlatformFeatures />
        <WorksWithStack />
        <OpenPlatform />
        <WhyOpenlit />
        <HomeFaq />
      </div>
    </main>
  )
}

export const runtime = 'edge'
