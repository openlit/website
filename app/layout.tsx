import 'css/tailwind.css'

import { Inter } from 'next/font/google'
import siteMetadata from 'data/siteMetadata'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { organisationSchema, applicationSchema, websiteSchema } from '@/components/structuredData'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline theme detection to prevent FOUC — defaults to light (product UI) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=document.cookie.match(/theme=([^;]+)/);if(t&&t[1]==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://mintcdn.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#F9F9F9" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F9F9F9" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0C0A09" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.className} bg-stone-50 text-black antialiased dark:bg-stone-950 dark:text-white`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5KRK16SZ87"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5KRK16SZ87');`}
        </Script>
      </body>
    </html>
  )
}
