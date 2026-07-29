export type PlanValue = boolean | string

export type PricingFeature = {
  name: string
  included: PlanValue
}

export type PricingCategory = {
  category: string
  blurb?: string
  features: PricingFeature[]
}

export type PricingFaqItem = {
  question: string
  answer: string
}

export const PRICING_SEO = {
  title: 'OpenLIT Pricing: Free Open Source Self-Host and Cloud',
  description:
    'OpenLIT pricing is simple. Self-host the open source Harness Engineering platform free under Apache 2.0 with unlimited usage. OpenLIT Cloud is coming soon for fully hosted teams.',
  keywords: [
    'OpenLIT pricing',
    'open source Harness Engineering',
    'open source LLM observability',
    'free self host LLM observability',
    'AI engineering platform pricing',
    'LLM observability open source',
    'Apache 2.0 LLM observability',
    'self hosted AI observability',
    'OpenTelemetry LLM',
    'OpenLIT Cloud',
    'open source AI engineering platform',
  ],
} as const

export const PRICING_FAQ_ITEMS: PricingFaqItem[] = [
  {
    question: 'What is OpenLIT pricing?',
    answer:
      'OpenLIT OSS is free to self-host under Apache 2.0 with no license key and no per-trace fee. OpenLIT Cloud is coming soon as a fully hosted option. Cloud pricing will be shared at launch.',
  },
  {
    question: 'Is OpenLIT free and open source?',
    answer:
      'Yes. OpenLIT is an open source Harness Engineering platform. You can self-host it free forever under Apache 2.0. Deploy with Docker Compose or Kubernetes Helm from GitHub.',
  },
  {
    question: 'Can I self-host OpenLIT for LLM observability?',
    answer:
      'Yes. Self-host OpenLIT on your own infrastructure. The stack includes OpenLIT, ClickHouse, and an OpenTelemetry Collector. Usage on OSS is unlimited because you run it yourself.',
  },
  {
    question: 'Is OpenLIT Apache 2.0 licensed?',
    answer:
      'Yes. OpenLIT is Apache 2.0 licensed. You can inspect the code, self-host, modify, and contribute without a paid license for OSS.',
  },
  {
    question: 'What is OpenLIT Cloud?',
    answer:
      'OpenLIT Cloud is the fully hosted version of OpenLIT for teams that want managed operations instead of running their own stack. Feature and pricing details will be shared at launch. Join the waitlist for updates.',
  },
  {
    question: 'When will OpenLIT Cloud pricing be available?',
    answer:
      'Cloud is in development. Pricing details will be published at launch. Email waitlist@openlit.io to join the waitlist.',
  },
  {
    question: 'Does self-hosted OpenLIT support OpenTelemetry?',
    answer:
      'Yes. OpenLIT is OpenTelemetry-native. Use OpenLIT SDKs or send OTLP to OpenLIT, and export traces to Grafana, Datadog, or any OTLP backend.',
  },
  {
    question: 'What is included in OpenLIT OSS?',
    answer:
      'OSS includes LLM tracing, coding agent observability, Prompt Hub, Vault, OpenGround, evaluations, guardrails, GPU monitoring, Fleet Hub, custom dashboards, OAuth, and community support on GitHub.',
  },
]

export const PRICING_PLANS = {
  oss: {
    name: 'OSS',
    badge: 'Available now',
    summary: 'Self-host the open source Harness Engineering platform on your own infra with Helm or Docker.',
    priceLabel: 'Free',
    priceHint: 'Apache 2.0. Unlimited self-hosted usage.',
    ctaLabel: 'Deploy from GitHub',
    ctaHref: 'https://github.com/openlit/openlit',
    secondaryLabel: 'Documentation',
    secondaryHref: 'https://docs.openlit.io/latest/introduction',
    highlights: [
      'Apache 2.0 licensed OpenLIT platform',
      'Full stack AI infra monitoring for GPUs, LLMs, MCP, vector DBs, and coding agents',
      'Core platform features and APIs for tracing, evaluation, prompts, and more',
      'Deployment docs and Helm chart',
      'OAuth sign-in',
      'Community support on GitHub',
    ],
  },
  cloud: {
    name: 'Cloud',
    badge: 'Coming soon',
    summary: 'Fully hosted OpenLIT for teams that prefer managed operations.',
    priceLabel: 'Coming soon',
    priceHint: 'Join the waitlist for launch updates and pricing.',
    ctaLabel: 'Join waitlist',
    ctaHref: 'mailto:waitlist@openlit.io?subject=OpenLIT%20Cloud%20Waitlist',
    secondaryLabel: 'Contact us',
    secondaryHref: 'mailto:contact@openlit.io',
    highlights: [
      'Fully hosted OpenLIT platform',
      'Managed infrastructure and upgrades',
      'Built for teams that prefer zero ops',
      'Feature set and pricing shared at launch',
    ],
  },
} as const

export const OSS_FEATURE_ROWS: PricingCategory[] = [
  {
    category: 'Zero-code instrumentation',
    blurb: 'eBPF and SDK auto-instrumentation across Kubernetes, Docker, and Linux.',
    features: [
      { name: 'Controller binary and deployment options', included: true },
    ],
  },
  {
    category: 'Coding agent observability',
    blurb: 'Session, cost, and code-impact tracking for coding agents.',
    features: [
      { name: 'Session, cost, token, and repo activity tracking', included: true },
    ],
  },
  {
    category: 'Fleet Hub',
    blurb: 'OpenTelemetry collector monitoring and config via OpAMP.',
    features: [
      { name: 'Single-cluster collector monitoring', included: true },
    ],
  },
  {
    category: 'Prompt Hub',
    blurb: 'Prompt versioning, retrieval, and AI-assisted improvement.',
    features: [
      { name: 'Prompt versioning', included: true },
      { name: 'Dynamic variables and API retrieval', included: true },
      { name: 'Prompt fetching', included: 'Unlimited' },
      { name: 'AI-assisted prompt improvement', included: true },
    ],
  },
  {
    category: 'Vault',
    blurb: 'Encrypted secret storage for LLM API keys.',
    features: [
      { name: 'Key and tag based retrieval', included: true },
      { name: 'API authentication', included: true },
      { name: 'Encrypted storage (AES-256-GCM)', included: true },
    ],
  },
  {
    category: 'OpenGround',
    blurb: 'Side-by-side LLM comparison for latency, tokens, and cost.',
    features: [
      { name: 'BYOK model comparison', included: true },
    ],
  },
  {
    category: 'Custom dashboards',
    blurb: 'ClickHouse-backed dashboards with charts, tables, and filters.',
    features: [
      { name: 'Dashboard creation, widgets, and folders', included: true },
      { name: 'Import and export', included: true },
    ],
  },
  {
    category: 'Evaluations',
    blurb: 'Built-in evaluation types with rule-engine automation.',
    features: [
      { name: 'Built-in evaluation types', included: true },
      { name: 'Programmatic and local or CI execution', included: true },
      { name: 'Custom eval prompts and rule-based selection', included: true },
    ],
  },
  {
    category: 'Guardrails',
    blurb: 'Prompt-injection, jailbreak, and sensitive-topic detection.',
    features: [
      { name: 'Built-in guards in SDK (LLM and regex)', included: true },
    ],
  },
  {
    category: 'GPU monitoring',
    blurb: 'GPU utilization, memory, temperature, and power visibility.',
    features: [
      { name: 'Collector and dashboards', included: true },
    ],
  },
  {
    category: 'Usage and limits',
    features: [
      { name: 'Included usage', included: 'Unlimited (self-hosted)' },
      { name: 'Access to historical data', included: 'Unlimited (self-managed)' },
      { name: 'Users', included: 'Unlimited' },
      { name: 'Projects and environments', included: 'Unlimited' },
    ],
  },
  {
    category: 'Support',
    features: [
      { name: 'Community support (GitHub)', included: true },
    ],
  },
  {
    category: 'Security and compliance',
    features: [
      { name: 'Sign in with Google, Azure AD, GitHub', included: true },
    ],
  },
]
