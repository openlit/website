import { genPageMetadata } from 'app/seo'
import JsonLd from '@/components/json-ld'
import { createJsonLdGraph, createWebPageSchema } from '@/components/structuredData'
import ProductExplorer from '@/components/home/product-explorer'
import { EXPLORE_SEO, EXPLORE_URL } from 'constants/product-demo'

export const metadata = genPageMetadata({
  title: EXPLORE_SEO.title,
  description: EXPLORE_SEO.description,
  keywords: [...EXPLORE_SEO.keywords],
  canonicalUrl: EXPLORE_URL,
  markdownUrl: `${EXPLORE_URL}.md`,
})

const pageSchema = createWebPageSchema(EXPLORE_SEO.title, EXPLORE_URL, EXPLORE_SEO.description, [
  { name: 'Home', url: 'https://openlit.io' },
  { name: 'Explore', url: EXPLORE_URL },
])

export default function ExplorePage() {
  return (
    <>
      <JsonLd data={createJsonLdGraph([pageSchema])} />
      <ProductExplorer heading={false} fullPageLink={false} />
    </>
  )
}

export const runtime = 'edge'
