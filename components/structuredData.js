export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OpenLIT',
  url: 'https://openlit.io',
  logo: 'https://openlit.io/static/images/logo.png',
  description:
    'OpenLIT is an open-source platform built on OpenTelemetry, providing observability for GenAI and LLM applications.',
  sameAs: [
    'https://x.com/openlit_io',
    'https://github.com/openlit/openlit',
    'https://linkedin.com/company/openlit',
  ],
  foundingDate: '2023',
  founders: [
    {
      '@type': 'Person',
      name: 'Aman Agarwal',
    },
  ],
}

export const applicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OpenLIT',
  operatingSystem: 'Linux, Windows, macOS',
  applicationCategory: 'Observability Platform',
  description:
    'Open-source platform for observability and application performance monitoring (APM) built on OpenTelemetry, optimized for GenAI and LLM applications.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    category: 'Free Software',
  },
  url: 'https://openlit.io',
  downloadUrl: 'https://github.com/openlit/openlit/pkgs/container/openlit',
  featureList: [
    'Unified Traces and Metrics',
    'OpenTelemetry Support',
    'LLM Observability',
    'Developer-Friendly Interface',
  ],
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is OpenLIT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenLIT is an open-source platform that provides observability and application performance monitoring for GenAI and LLM applications using OpenTelemetry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OpenLIT free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, OpenLIT is open-source and free to use for developers and organizations.',
      },
    },
  ],
}

export const webpageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'OpenLIT - OpenTelemetry-Native Observability Platform',
  url: 'https://openlit.io',
  description:
    'OpenLIT is an open-source platform for observability and APM. Built on OpenTelemetry, it provides seamless monitoring for GenAI and LLM applications.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://openlit.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Docs',
        item: 'https://docs.openlit.io/latest/introduction',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Blogs',
        item: 'https://openlit.io/blogs',
      },
    ],
  },
}
