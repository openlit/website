import { Metadata } from 'next'
import siteMetadata from 'data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  canonicalUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  canonicalUrl,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    alternates: {
      canonical: canonicalUrl || siteMetadata.siteUrl,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: canonicalUrl || siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
