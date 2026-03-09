export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OpenLIT',
  url: 'https://openlit.io',
  logo: {
    '@type': 'ImageObject',
    url: 'https://openlit.io/static/images/logo.png',
    width: 512,
    height: 512,
  },
  description:
    'OpenLIT is an open-source platform built on OpenTelemetry, providing observability for GenAI and LLM applications.',
  email: 'contact@openlit.io',
  foundingDate: '2023-01-01',
  founders: [
    {
      '@type': 'Person',
      name: 'Aman Agarwal',
    },
  ],
  sameAs: [
    'https://twitter.com/openlit_io',
    'https://github.com/openlit/openlit',
    'https://linkedin.com/company/openlit',
    'https://www.youtube.com/@openlit',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@openlit.io',
    contactType: 'customer support',
  },
}

export const applicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OpenLIT',
  operatingSystem: 'Linux, Windows, macOS',
  applicationCategory: 'DeveloperApplication',
  description:
    'Open-source platform for observability and application performance monitoring (APM) built on OpenTelemetry, optimized for GenAI and LLM applications.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/OnlineOnly',
  },
  url: 'https://openlit.io',
  downloadUrl: 'https://github.com/openlit/openlit/pkgs/container/openlit',
  featureList: [
    'Unified Traces and Metrics',
    'OpenTelemetry Support',
    'LLM Observability',
    'Fleet Hub',
    'Prompt Hub',
    'Vault',
    'OpenGround',
    'Kubernetes Operator',
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
