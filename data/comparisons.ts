export interface ComparisonFeature {
  category: string
  features: {
    name: string
    openlit: boolean | string
    competitor: boolean | string
  }[]
}

export interface Competitor {
  slug: string
  name: string
  tagline: string
  description: string
  heroHeadline: string
  heroSubheadline: string
  openSourceUrl?: string
  features: ComparisonFeature[]
  summary: {
    chooseOpenlit: string[]
    chooseCompetitor: string[]
  }
}

const competitors: Competitor[] = [
  {
    slug: 'openlit-vs-langfuse',
    name: 'Langfuse',
    tagline: 'OpenLIT vs Langfuse',
    description:
      'Compare OpenLIT and Langfuse for LLM observability. See how OpenTelemetry-native monitoring, GPU tracking, and self-hosted deployment stack up.',
    heroHeadline: 'OpenLIT vs Langfuse',
    heroSubheadline:
      'Both are open-source LLM observability tools. OpenLIT is built natively on OpenTelemetry standards with GPU monitoring and broader infrastructure coverage. Here is a detailed comparison.',
    openSourceUrl: 'https://github.com/langfuse/langfuse',
    features: [
      {
        category: 'Core Architecture',
        features: [
          {
            name: 'OpenTelemetry-native',
            openlit: true,
            competitor: 'OTel ingestion added in v3; primary SDK is proprietary',
          },
          {
            name: 'Open Source',
            openlit: 'Apache 2.0',
            competitor: 'MIT (core) + EE (enterprise)',
          },
          { name: 'Self-hostable', openlit: true, competitor: true },
          { name: 'Cloud-managed option', openlit: 'Coming soon', competitor: true },
          {
            name: 'Vendor-neutral data export',
            openlit: true,
            competitor: 'Via OTel export (v3+)',
          },
        ],
      },
      {
        category: 'LLM Monitoring',
        features: [
          { name: 'Token usage tracking', openlit: true, competitor: true },
          { name: 'Cost per request', openlit: true, competitor: true },
          { name: 'Latency / p95 metrics', openlit: true, competitor: true },
          { name: 'Prompt & response logging', openlit: true, competitor: true },
          { name: 'Streaming support', openlit: true, competitor: true },
          {
            name: '60+ integrations (LLMs, frameworks, VectorDBs, GPUs)',
            openlit: true,
            competitor: 'Relies on OTel SDKs or manual instrumentation',
          },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          { name: 'GPU monitoring (NVIDIA + AMD)', openlit: true, competitor: false },
          { name: 'Vector DB tracing', openlit: true, competitor: false },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
          { name: 'Organisation management', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: true },
          { name: 'Evaluations', openlit: true, competitor: true },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
          { name: 'Custom model pricing', openlit: true, competitor: false },
        ],
      },
      {
        category: 'Observability Backends',
        features: [
          { name: 'Grafana / Prometheus export', openlit: true, competitor: 'Via OTel (v3+)' },
          { name: 'Datadog export', openlit: true, competitor: false },
          { name: 'Any OTLP-compatible backend', openlit: true, competitor: 'Via OTel (v3+)' },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You need GPU monitoring for self-hosted LLMs (Ollama, vLLM) on NVIDIA or AMD hardware',
        'You want a fully OTel-native stack where every span is a standard OpenTelemetry span',
        'You need Vector DB observability alongside LLM monitoring',
        'You want Vault, Fleet Hub, and 60+ auto-instrumented integrations in one platform',
        'You are already using OpenTelemetry and want data to flow to any OTLP backend',
      ],
      chooseCompetitor: [
        'You want a mature cloud SaaS with a larger community and dedicated support tiers',
        'Your primary workflow centres on human annotation, labelling, and feedback loops',
        'You need a polished evaluation and dataset management UI with fine-grained scoring',
      ],
    },
  },
  {
    slug: 'openlit-vs-helicone',
    name: 'Helicone',
    tagline: 'OpenLIT vs Helicone',
    description:
      'Compare OpenLIT and Helicone for LLM observability. OpenLIT is SDK-based with no proxy latency, OpenTelemetry-native, and fully self-hostable.',
    heroHeadline: 'OpenLIT vs Helicone',
    heroSubheadline:
      'Helicone routes traffic through a proxy to capture telemetry. OpenLIT instruments your existing SDK calls directly — no proxy, no added latency, fully OpenTelemetry-native.',
    openSourceUrl: 'https://github.com/Helicone/helicone',
    features: [
      {
        category: 'Core Architecture',
        features: [
          { name: 'OpenTelemetry-native', openlit: true, competitor: false },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: 'Apache 2.0' },
          { name: 'Self-hostable', openlit: true, competitor: true },
          { name: 'Proxy-free (no added latency)', openlit: true, competitor: false },
          { name: 'SDK-based instrumentation', openlit: true, competitor: false },
          { name: 'Vendor-neutral data format', openlit: true, competitor: false },
        ],
      },
      {
        category: 'LLM Monitoring',
        features: [
          { name: 'Token usage tracking', openlit: true, competitor: true },
          { name: 'Cost per request', openlit: true, competitor: true },
          { name: 'Latency / p95 metrics', openlit: true, competitor: true },
          { name: 'Prompt & response logging', openlit: true, competitor: true },
          {
            name: '60+ integrations (LLMs, frameworks, VectorDBs, GPUs)',
            openlit: true,
            competitor: 'OpenAI-compatible endpoints only',
          },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          { name: 'GPU monitoring (NVIDIA + AMD)', openlit: true, competitor: false },
          { name: 'Vector DB tracing', openlit: true, competitor: false },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
          { name: 'Organisation management', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: true },
          { name: 'Evaluations', openlit: true, competitor: 'Basic' },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
          { name: 'Custom model pricing', openlit: true, competitor: false },
          { name: 'Request caching', openlit: false, competitor: true },
          { name: 'Rate limiting & key management', openlit: false, competitor: true },
        ],
      },
      {
        category: 'Observability Backends',
        features: [
          { name: 'Grafana / Prometheus export', openlit: true, competitor: false },
          { name: 'Datadog export', openlit: true, competitor: false },
          { name: 'Any OTLP-compatible backend', openlit: true, competitor: false },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You cannot tolerate proxy-introduced latency on every LLM call',
        'You need GPU monitoring for self-hosted models (NVIDIA or AMD)',
        'You use non-OpenAI-compatible APIs (Anthropic native SDK, Bedrock, Vertex AI, etc.)',
        'You want to forward telemetry to Grafana, Datadog, or any OTLP backend',
        'You need Vector DB observability alongside LLM request tracing',
      ],
      chooseCompetitor: [
        'You want built-in request caching to reduce API costs',
        'You need proxy-layer rate limiting and API key management',
        'You prefer a cloud-first setup with minimal local infrastructure',
      ],
    },
  },
  {
    slug: 'openlit-vs-langsmith',
    name: 'LangSmith',
    tagline: 'OpenLIT vs LangSmith',
    description:
      'Compare OpenLIT and LangSmith for LLM monitoring. OpenLIT is open-source, self-hostable, and framework-agnostic. LangSmith is a proprietary cloud platform optimised for LangChain.',
    heroHeadline: 'OpenLIT vs LangSmith',
    heroSubheadline:
      "LangSmith is LangChain's proprietary observability platform. OpenLIT is framework-agnostic, fully open-source (Apache 2.0), and works with any LLM provider or orchestration framework.",
    features: [
      {
        category: 'Core Architecture',
        features: [
          { name: 'OpenTelemetry-native', openlit: true, competitor: false },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: false },
          {
            name: 'Self-hostable',
            openlit: true,
            competitor: 'Enterprise plan only',
          },
          {
            name: 'Framework-agnostic',
            openlit: true,
            competitor: 'Best with LangChain; supports others via SDK',
          },
          { name: 'Free self-hosted tier', openlit: true, competitor: false },
        ],
      },
      {
        category: 'LLM Monitoring',
        features: [
          { name: 'Token usage tracking', openlit: true, competitor: true },
          { name: 'Cost per request', openlit: true, competitor: true },
          { name: 'Latency / p95 metrics', openlit: true, competitor: true },
          { name: 'Prompt & response logging', openlit: true, competitor: true },
          {
            name: '60+ integrations (LLMs, frameworks, VectorDBs, GPUs)',
            openlit: true,
            competitor: 'Primarily via LangChain wrappers',
          },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          { name: 'GPU monitoring (NVIDIA + AMD)', openlit: true, competitor: false },
          { name: 'Vector DB tracing', openlit: true, competitor: false },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
          { name: 'Organisation management', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: true },
          { name: 'Evaluations', openlit: true, competitor: true },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
          { name: 'Custom model pricing', openlit: true, competitor: false },
          { name: 'Prompt playground', openlit: false, competitor: true },
          { name: 'Dataset management for evals', openlit: false, competitor: true },
        ],
      },
      {
        category: 'Pricing',
        features: [
          {
            name: 'Free tier',
            openlit: 'Unlimited traces (self-hosted)',
            competitor: '5,000 traces/month',
          },
          { name: 'No credit card to start', openlit: true, competitor: false },
          { name: 'Self-hosted free tier', openlit: true, competitor: false },
          { name: 'Data ownership', openlit: 'Full (self-hosted)', competitor: 'LangChain cloud' },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You are not using LangChain and want framework-agnostic, auto-instrumented observability',
        'You need to self-host for data privacy, compliance, or cost control without an Enterprise plan',
        'You need GPU monitoring for locally-hosted models on NVIDIA or AMD hardware',
        'You want unlimited traces on self-hosted infrastructure at zero licensing cost',
        'You require OpenTelemetry compatibility to route data to Grafana, Datadog, or other backends',
      ],
      chooseCompetitor: [
        'Your stack is deeply integrated with LangChain and you want first-class toolchain support',
        "You need LangSmith's prompt playground and dataset management for systematic eval workflows",
        'You are comfortable with cloud-only and want a managed service without any ops overhead',
      ],
    },
  },
  {
    slug: 'openlit-vs-datadog',
    name: 'Datadog LLM Observability',
    tagline: 'OpenLIT vs Datadog LLM Observability',
    description:
      'Compare OpenLIT and Datadog for LLM observability. OpenLIT is purpose-built, open-source, and free to self-host. Datadog is a general-purpose platform with LLM monitoring as a paid add-on.',
    heroHeadline: 'OpenLIT vs Datadog LLM Observability',
    heroSubheadline:
      'Datadog is a powerful general-purpose observability platform, but LLM monitoring is a paid add-on requiring existing Datadog infrastructure. OpenLIT is purpose-built for AI engineering, open-source, and free to self-host.',
    features: [
      {
        category: 'Core Architecture',
        features: [
          {
            name: 'OpenTelemetry-native',
            openlit: true,
            competitor: 'OTel ingestion supported; primary agent is proprietary',
          },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: false },
          { name: 'Self-hostable', openlit: true, competitor: false },
          { name: 'Purpose-built for LLM / AI engineering', openlit: true, competitor: false },
          { name: 'Free self-hosted tier', openlit: true, competitor: false },
        ],
      },
      {
        category: 'LLM Monitoring',
        features: [
          { name: 'Token usage tracking', openlit: true, competitor: true },
          { name: 'Cost per request', openlit: true, competitor: true },
          { name: 'Latency / p95 metrics', openlit: true, competitor: true },
          { name: 'Prompt & response logging', openlit: true, competitor: true },
          {
            name: '60+ integrations (LLMs, frameworks, VectorDBs, GPUs)',
            openlit: true,
            competitor: 'Limited LLM providers supported natively',
          },
          { name: 'Custom model pricing', openlit: true, competitor: false },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          {
            name: 'GPU monitoring (NVIDIA + AMD)',
            openlit: true,
            competitor: 'General GPU metrics only, not LLM-context-aware',
          },
          { name: 'Vector DB tracing', openlit: true, competitor: false },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
          { name: 'Organisation management', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: false },
          { name: 'Evaluations', openlit: true, competitor: 'Basic (LLM-as-judge)' },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
          {
            name: 'Out-of-box LLM dashboards',
            openlit: true,
            competitor: 'Requires setup / add-on',
          },
          {
            name: 'Unified infra + APM + LLM observability',
            openlit: false,
            competitor: true,
          },
        ],
      },
      {
        category: 'Pricing',
        features: [
          { name: 'Free self-hosted', openlit: true, competitor: false },
          { name: 'No per-host agent fees', openlit: true, competitor: false },
          { name: 'No usage-based billing (self-hosted)', openlit: true, competitor: false },
          {
            name: 'LLM Observability cost',
            openlit: '$0 (self-hosted)',
            competitor: 'Usage-based paid add-on on top of Datadog subscription',
          },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You want purpose-built LLM observability without the overhead of a general APM platform',
        'You need to self-host for data privacy, compliance, or to avoid cloud vendor costs',
        'You want Prompt Hub, Vault, and Fleet Hub included as part of your AI engineering platform',
        'You prefer open standards (Apache 2.0, OpenTelemetry) over proprietary agents and lock-in',
        'You want GPU monitoring that is context-aware of LLM inference, not just system-level GPU metrics',
      ],
      chooseCompetitor: [
        'You are already invested in Datadog and want a single pane of glass across all infrastructure',
        'You need enterprise-grade SLAs, SOC 2, HIPAA compliance, and dedicated support contracts',
        'You want unified alerting across LLM, APM, infrastructure, and logs in one existing platform',
      ],
    },
  },
]

export default competitors

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug)
}
