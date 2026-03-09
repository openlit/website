import { genPageMetadata } from 'app/seo'
import AboutUsContent from 'components/about-us-content'

export const metadata = genPageMetadata({
  title: 'About Us',
  description:
    'Learn about OpenLIT — the open-source AI engineering platform built on OpenTelemetry. Meet the team behind the LLM observability and monitoring tools used by developers worldwide.',
  canonicalUrl: 'https://openlit.io/about-us',
})

export default function AboutUsPage() {
  return <AboutUsContent />
}

export const runtime = 'edge'
