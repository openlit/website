import { genPageMetadata } from 'app/seo'
import AboutUsContent from 'components/about-us-content'

export const metadata = genPageMetadata({ title: 'About Us' })

export default function AboutUsPage() {
  return <AboutUsContent />
}

export const runtime = 'edge'
