import { Metadata } from 'next'
import siteMetadata from 'data/siteMetadata'

/** Default share card: public/static/images/og-image.png is 1200 × 630. */
export function shareImages(alt: string, image?: string) {
  if (image) return [{ url: image, alt }]
  const url = new URL(siteMetadata.socialBanner, siteMetadata.siteUrl).toString()
  return [{ url, width: 1200, height: 630, alt }]
}

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
  keywords,
  markdownUrl,
  ...rest
}: PageSEOProps): Metadata {
  const desc = description || siteMetadata.description
  const shareTitle = `${title} | ${siteMetadata.title}`
  return {
    title,
    description: desc,
    keywords,
    alternates: {
      canonical: canonicalUrl || siteMetadata.siteUrl,
      ...(markdownUrl
        ? {
            types: {
              'text/markdown': markdownUrl,
            },
          }
        : {}),
    },
    openGraph: {
      title: shareTitle,
      description: desc,
      url: canonicalUrl || siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      images: shareImages(shareTitle, image),
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: shareTitle,
      description: desc,
      card: 'summary_large_image',
      images: shareImages(shareTitle, image),
    },
    ...rest,
  }
}
