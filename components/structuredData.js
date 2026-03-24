export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://openlit.io/#organization',
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
    'https://x.com/openlit_io',
    'https://github.com/openlit/openlit',
    'https://linkedin.com/company/openlit',
    'https://www.youtube.com/@openlit',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@openlit.io',
    contactType: 'customer service',
  },
}

export const applicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://openlit.io/#software',
  name: 'OpenLIT',
  operatingSystem: 'Linux, Windows, macOS',
  applicationCategory: 'DeveloperApplication',
  description:
    'Open-source platform for observability and application performance monitoring (APM) built on OpenTelemetry, optimized for GenAI and LLM applications.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  url: 'https://openlit.io',
  downloadUrl: 'https://github.com/openlit/openlit/pkgs/container/openlit',
  codeRepository: 'https://github.com/openlit/openlit',
  license: 'https://github.com/openlit/openlit/blob/main/LICENSE',
  author: { '@id': 'https://openlit.io/#organization' },
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

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://openlit.io/#website',
  name: 'OpenLIT',
  url: 'https://openlit.io',
  publisher: { '@id': 'https://openlit.io/#organization' },
}

export function createWebPageSchema(name, url, description, breadcrumbItems) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    url,
    description,
    isPartOf: { '@id': 'https://openlit.io/#website' },
  }
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }
  }
  return schema
}
