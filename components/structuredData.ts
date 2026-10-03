import { OPENLIT_DEFINITION } from 'constants/openlit-definition'

const SITE = 'https://openlit.io'
const DEFINITION = OPENLIT_DEFINITION
const LOGO = `${SITE}/static/images/logo.png`
const SHARE_IMAGE = `${SITE}/static/images/twitter-card.png`
const GITHUB_REPO = 'https://github.com/openlit/openlit'
const DOCS_INSTALL = 'https://docs.openlit.io/latest/openlit/installation'
const DOCS_OVERVIEW = 'https://docs.openlit.io/latest/overview'

export const SCHEMA_IDS = {
  org: `${SITE}/#organization`,
  founder: `${SITE}/#person-aman-agarwal`,
  software: `${SITE}/#software`,
  source: `${SITE}/#sourcecode`,
  website: `${SITE}/#website`,
  product: `${SITE}/#product`,
  offerOss: `${SITE}/pricing#offer-oss`,
  offerCloud: `${SITE}/pricing#offer-cloud`,
  catalog: `${SITE}/pricing#catalog`,
  serviceOss: `${SITE}/pricing#service-oss`,
  serviceCloud: `${SITE}/pricing#service-cloud`,
}

const KNOWS_ABOUT = [
  'Agent harness',
  'Agent harness engineering',
  'Agent observability',
  'Agent evaluation',
  'OpenTelemetry GenAI semantic conventions',
  'LLM observability',
  'LLM evaluation',
  'Prompt management',
  'LLM guardrails',
  'GPU monitoring',
]

export const founderPersonSchema = {
  '@type': 'Person',
  '@id': SCHEMA_IDS.founder,
  name: 'Aman Agarwal',
  url: 'https://github.com/AmanAgarwal041',
  image: `${SITE}/static/images/aman.jpg`,
  jobTitle: 'Founder',
  worksFor: { '@id': SCHEMA_IDS.org },
  sameAs: [
    'https://github.com/AmanAgarwal041',
    'https://x.com/_typeofnull',
    'https://www.linkedin.com/in/amanagarwal041/',
  ],
  knowsAbout: KNOWS_ABOUT,
}

export const organisationSchema = {
  '@type': 'Organization',
  '@id': SCHEMA_IDS.org,
  name: 'OpenLIT',
  legalName: 'OpenLIT',
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE}/#logo`,
    url: LOGO,
    width: 512,
    height: 512,
  },
  image: SHARE_IMAGE,
  description: DEFINITION,
  email: 'contact@openlit.io',
  // Public GitHub org activity begins early 2024; precise founding month not independently verified.
  foundingDate: '2024',
  founders: { '@id': SCHEMA_IDS.founder },
  employee: { '@id': SCHEMA_IDS.founder },
  sameAs: [
    GITHUB_REPO,
    'https://github.com/openlit',
    'https://x.com/openlit_io',
    'https://www.linkedin.com/company/openlit/',
    'https://www.youtube.com/@openlit',
    'https://discord.com/invite/RbNPvG54',
    'https://pypi.org/project/openlit/',
    'https://www.npmjs.com/package/openlit',
    'https://docs.openlit.io/latest/overview',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@openlit.io',
    contactType: 'customer support',
    url: SITE,
    availableLanguage: 'English',
  },
  knowsAbout: KNOWS_ABOUT,
  keywords: KNOWS_ABOUT.join(', '),
  areaServed: 'Worldwide',
}

const ossOffer = {
  '@type': 'Offer',
  '@id': SCHEMA_IDS.offerOss,
  name: 'OpenLIT OSS',
  category: 'Open source self-hosted software',
  price: '0',
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  url: `${SITE}/pricing`,
  description:
    'Free open-source agent harness engineering platform. Self-host under Apache 2.0 with unlimited usage.',
  seller: { '@id': SCHEMA_IDS.org },
  itemOffered: { '@id': SCHEMA_IDS.software },
}

const cloudOffer = {
  '@type': 'Offer',
  '@id': SCHEMA_IDS.offerCloud,
  name: 'OpenLIT Cloud',
  category: 'Hosted software',
  availability: 'https://schema.org/PreOrder',
  url: `${SITE}/pricing`,
  description: 'Fully hosted OpenLIT coming soon. Feature set and pricing shared at launch.',
  seller: { '@id': SCHEMA_IDS.org },
}

export const applicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': SCHEMA_IDS.software,
  name: 'OpenLIT',
  alternateName: 'Open source Agent Harness Engineering Platform',
  url: SITE,
  image: SHARE_IMAGE,
  screenshot: SHARE_IMAGE,
  operatingSystem: 'Linux, Windows, macOS',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Agent harness engineering platform',
  description: DEFINITION,
  isAccessibleForFree: true,
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  downloadUrl: 'https://github.com/openlit/openlit/pkgs/container/openlit',
  installUrl: DOCS_INSTALL,
  softwareHelp: {
    '@type': 'CreativeWork',
    url: DOCS_OVERVIEW,
    name: 'OpenLIT documentation',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/pricing`,
  },
  author: { '@id': SCHEMA_IDS.org },
  publisher: { '@id': SCHEMA_IDS.org },
  creator: { '@id': SCHEMA_IDS.org },
  isBasedOn: { '@id': SCHEMA_IDS.source },
  sameAs: [
    GITHUB_REPO,
    'https://pypi.org/project/openlit/',
    'https://www.npmjs.com/package/openlit',
  ],
  featureList: [
    'Agent harness engineering',
    'OpenTelemetry-native LLM tracing',
    'Agent observability',
    'Agent evals and LLM-as-a-judge',
    'Guardrails',
    'Coding agent observability (Claude Code, Codex, Cursor)',
    'MCP observability',
    'Prompt Hub prompt management',
    'API key management (Vault)',
    'Model comparison (OpenGround)',
    'GPU monitoring',
    'Cost tracking',
  ],
  keywords: KNOWS_ABOUT.join(', '),
}

export const sourceCodeSchema = {
  '@type': 'SoftwareSourceCode',
  '@id': SCHEMA_IDS.source,
  name: 'OpenLIT',
  description: DEFINITION,
  url: GITHUB_REPO,
  codeRepository: GITHUB_REPO,
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  programmingLanguage: [
    { '@type': 'ComputerLanguage', name: 'Python' },
    { '@type': 'ComputerLanguage', name: 'TypeScript' },
    { '@type': 'ComputerLanguage', name: 'Go' },
  ],
  runtimePlatform: 'Linux, Windows, macOS',
  creator: { '@id': SCHEMA_IDS.org },
  copyrightHolder: { '@id': SCHEMA_IDS.org },
  isPartOf: { '@id': SCHEMA_IDS.software },
  sameAs: [GITHUB_REPO],
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SCHEMA_IDS.website,
  name: 'OpenLIT',
  url: SITE,
  description: DEFINITION,
  inLanguage: 'en-US',
  publisher: { '@id': SCHEMA_IDS.org },
  about: { '@id': SCHEMA_IDS.software },
}

export const productSchema = {
  '@type': 'Product',
  '@id': SCHEMA_IDS.product,
  name: 'OpenLIT',
  description: DEFINITION,
  image: [SHARE_IMAGE, LOGO],
  brand: { '@id': SCHEMA_IDS.org },
  manufacturer: { '@id': SCHEMA_IDS.org },
  category: 'DeveloperApplication',
  url: SITE,
  sku: 'openlit-oss',
  offers: ossOffer,
}

export function createJsonLdGraph(entities: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': entities.filter(Boolean).map((entity) => {
      if (!entity || typeof entity !== 'object') return entity
      const { '@context': _context, ...rest } = entity as Record<string, unknown> & {
        '@context'?: unknown
      }
      return rest
    }),
  }
}

export const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  ...applicationSchema,
}

export const siteGraph = createJsonLdGraph([
  organisationSchema,
  founderPersonSchema,
  sourceCodeSchema,
  websiteSchema,
])

function breadcrumbList(url: string, breadcrumbItems?: { name: string; url: string }[]) {
  if (!breadcrumbItems || breadcrumbItems.length === 0) return undefined
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function createWebPageSchema(
  name: string,
  url: string,
  description: string,
  breadcrumbItems?: { name: string; url: string }[],
  extra: {
    pageType?: string
    about?: Record<string, unknown>
    fields?: Record<string, unknown>
  } = {}
) {
  const schema: Record<string, unknown> = {
    '@type': extra.pageType || 'WebPage',
    '@id': `${url}#webpage`,
    name,
    url,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': SCHEMA_IDS.website },
    about: extra.about || { '@id': SCHEMA_IDS.software },
    publisher: { '@id': SCHEMA_IDS.org },
    ...extra.fields,
  }
  const crumbs = breadcrumbList(url, breadcrumbItems)
  if (crumbs) schema.breadcrumb = crumbs
  return schema
}

export function createItemListSchema({
  name,
  url,
  description,
  items,
}: {
  name: string
  url: string
  description: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    name,
    url,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: {
        '@type': 'WebPage',
        '@id': entry.url,
        name: entry.name,
        url: entry.url,
        description: entry.description,
      },
    })),
  }
}

export function createComparisonPageSchema({
  name,
  url,
  description,
  competitorName,
  breadcrumbs,
}: {
  name: string
  url: string
  description: string
  competitorName: string
  breadcrumbs?: { name: string; url: string }[]
}) {
  return createWebPageSchema(name, url, description, breadcrumbs, {
    fields: {
      about: { '@id': SCHEMA_IDS.software },
      mentions: {
        '@type': 'SoftwareApplication',
        name: competitorName,
        applicationCategory: 'DeveloperApplication',
      },
      keywords: `OpenLIT vs ${competitorName}, ${competitorName} alternative open source, agent observability, agent evals, LLM observability comparison`,
    },
  })
}

export function createDefinedTermSchema({
  name,
  description,
  url,
  inDefinedTermSet,
}: {
  name: string
  description: string
  url: string
  inDefinedTermSet?: { '@type': string; name: string; url: string }
}) {
  return {
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name,
    description,
    url,
    inDefinedTermSet: inDefinedTermSet || {
      '@type': 'DefinedTermSet',
      name: 'OpenLIT Agent Harness Glossary',
      url: `${SITE}/glossary`,
    },
  }
}

export function createDefinedTermSetSchema({
  name,
  url,
  description,
  terms,
}: {
  name: string
  url: string
  description: string
  terms: { slug: string; name: string; definition: string }[]
}) {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${url}#termset`,
    name,
    url,
    description,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE}/glossary/${term.slug}#term`,
      name: term.name,
      description: term.definition,
      url: `${SITE}/glossary/${term.slug}`,
    })),
  }
}

export function createTechArticleSchema({
  name,
  url,
  description,
  datePublished,
  dateModified,
  breadcrumbs,
}: {
  name: string
  url: string
  description: string
  datePublished: string
  dateModified?: string
  breadcrumbs?: { name: string; url: string }[]
}) {
  return createWebPageSchema(name, url, description, breadcrumbs, {
    pageType: 'TechArticle',
    about: {
      '@type': 'DefinedTerm',
      name: 'Agent harness engineering',
      url: `${SITE}/glossary/harness-engineering`,
    },
    fields: {
      author: { '@id': SCHEMA_IDS.founder },
      datePublished,
      dateModified: dateModified || datePublished,
      headline: name,
    },
  })
}

export function createPricingGraph({
  webpage,
  faq,
}: {
  webpage: Record<string, unknown>
  faq: Record<string, unknown>
}) {
  return createJsonLdGraph([
    webpage,
    {
      ...productSchema,
      url: `${SITE}/pricing`,
    },
    ossOffer,
    cloudOffer,
    {
      '@type': 'OfferCatalog',
      '@id': SCHEMA_IDS.catalog,
      name: 'OpenLIT pricing',
      url: `${SITE}/pricing`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: ossOffer.name,
          item: ossOffer,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: cloudOffer.name,
          item: cloudOffer,
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': SCHEMA_IDS.serviceOss,
      name: 'OpenLIT self-hosted OSS',
      serviceType: 'Self-hosted agent harness engineering',
      description:
        'Self-host OpenLIT under Apache 2.0 with unlimited usage. Deploy with Docker Compose or Helm.',
      provider: { '@id': SCHEMA_IDS.org },
      audience: {
        '@type': 'Audience',
        audienceType: 'Developers and AI engineering teams',
      },
      areaServed: 'Worldwide',
      offers: { '@id': SCHEMA_IDS.offerOss },
      termsOfService: `${SITE}/terms`,
    },
    {
      '@type': 'Service',
      '@id': SCHEMA_IDS.serviceCloud,
      name: 'OpenLIT Cloud',
      serviceType: 'Hosted agent harness engineering',
      description: 'Fully hosted OpenLIT for teams that want managed operations. Coming soon.',
      provider: { '@id': SCHEMA_IDS.org },
      audience: {
        '@type': 'Audience',
        audienceType: 'Teams that prefer managed infrastructure',
      },
      areaServed: 'Worldwide',
      offers: { '@id': SCHEMA_IDS.offerCloud },
    },
    faq,
  ])
}

export function personIdForAuthor(slug: string | undefined, name: string | undefined) {
  if (slug === 'Aman' || name === 'Aman Agarwal') return SCHEMA_IDS.founder
  const key = String(slug || name || 'author')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${SITE}/#person-${key}`
}

export function createVideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  embedUrl,
  contentUrl,
  watchPageUrl,
}: {
  name: string
  description: string
  thumbnailUrl: string | string[]
  uploadDate?: string
  duration?: string
  embedUrl: string
  contentUrl: string
  watchPageUrl: string
}) {
  const schema: Record<string, unknown> = {
    '@type': 'VideoObject',
    '@id': `${watchPageUrl}#video`,
    name,
    description: description || name,
    thumbnailUrl: Array.isArray(thumbnailUrl) ? thumbnailUrl : [thumbnailUrl],
    embedUrl,
    contentUrl,
    url: watchPageUrl,
    publisher: { '@id': SCHEMA_IDS.org },
  }
  if (uploadDate) schema.uploadDate = uploadDate
  if (duration) schema.duration = duration
  return schema
}

export function createAuthorPersonSchema(author: {
  slug?: string
  name: string
  occupation?: string
  company?: string
  avatar?: string
  github?: string
  twitter?: string
  linkedin?: string
}) {
  const sameAs = [author.github, author.twitter, author.linkedin].filter(Boolean)
  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': personIdForAuthor(author.slug, author.name),
    name: author.name,
  }
  if (author.occupation) person.jobTitle = author.occupation
  if (author.company) {
    person.worksFor =
      author.company === 'OpenLIT'
        ? { '@id': SCHEMA_IDS.org }
        : { '@type': 'Organization', name: author.company }
  }
  if (author.avatar) {
    person.image = author.avatar.startsWith('http') ? author.avatar : `${SITE}${author.avatar}`
  }
  if (sameAs.length) person.sameAs = sameAs
  return person
}
