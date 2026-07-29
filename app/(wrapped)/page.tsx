import Hero from '@/components/home/hero'
import { TrustedBy } from '@/components/home/trusted-by'
import PlatformFeatures from '@/components/home/platform-features'
import WorksWithStack from '@/components/home/works-with-stack'
import OpenPlatform from '@/components/home/open-platform'
import WhyOpenlit from '@/components/home/why-openlit'
import HomeFaq from '@/components/home/home-faq'
import { genPageMetadata } from 'app/seo'
import { createWebPageSchema } from '@/components/structuredData'
import { HERO_DESCRIPTION, HERO_TITLE } from 'constants/hero'

export const metadata = genPageMetadata({
  title: HERO_TITLE,
  description: HERO_DESCRIPTION,
  canonicalUrl: 'https://openlit.io',
})

const homepageSchema = createWebPageSchema(
  `OpenLIT - ${HERO_TITLE}`,
  'https://openlit.io',
  HERO_DESCRIPTION,
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
