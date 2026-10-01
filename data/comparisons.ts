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
      'OpenLIT vs Langfuse: OpenLIT is an Apache-2.0, OpenTelemetry-native Langfuse alternative with GPU monitoring, guardrails and Vault. Features and when to pick each.',
    heroHeadline: 'OpenLIT vs Langfuse: an Apache-2.0, OpenTelemetry-native Langfuse alternative',
    heroSubheadline:
      'Both are open-source agent observability and evals tools. OpenLIT is built natively on OpenTelemetry with GPU monitoring, guardrails, and Vault. Here is a detailed comparison.',
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
      'OpenLIT vs Helicone: an open-source Helicone alternative for agent observability and evals. SDK-based, OpenTelemetry-native, self-hostable with no proxy required.',
    heroHeadline: 'OpenLIT vs Helicone: an open-source Helicone alternative',
    heroSubheadline:
      'Helicone routes traffic through a proxy to capture telemetry. OpenLIT instruments your existing SDK calls directly: no proxy, no added latency, fully OpenTelemetry-native.',
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
      'Self-hosted, Apache-2.0 LangSmith alternative. Compare tracing, agent evals, prompt management, OpenTelemetry support, pricing and lock-in.',
    heroHeadline: 'OpenLIT vs LangSmith: an open-source LangSmith alternative',
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
      'OpenLIT vs Datadog: an open-source Datadog LLM Observability alternative for agent observability, evals and guardrails. Self-host free under Apache 2.0.',
    heroHeadline: 'OpenLIT vs Datadog: an open-source Datadog LLM Observability alternative',
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
  {
    slug: 'openlit-vs-arize-phoenix',
    name: 'Arize Phoenix',
    tagline: 'OpenLIT vs Arize Phoenix',
    description:
      'OpenLIT vs Arize Phoenix: an Apache-2.0 Phoenix alternative with self-hosted traces, agent evals, Prompt Hub, guardrails and GPU monitoring.',
    heroHeadline: 'OpenLIT vs Arize Phoenix: an open-source Phoenix alternative',
    heroSubheadline:
      'Both are open-source options for LLM tracing and evaluation. OpenLIT is Apache 2.0 and OpenTelemetry-native with Prompt Hub, agent monitoring, Vault, and GPU telemetry in one self-hosted platform. Phoenix centres on OpenInference tracing and eval workflows under Elastic License 2.0.',
    openSourceUrl: 'https://github.com/Arize-ai/phoenix',
    features: [
      {
        category: 'Core Architecture',
        features: [
          {
            name: 'OpenTelemetry-native',
            openlit: true,
            competitor: 'OpenInference / OTel-friendly tracing',
          },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: 'Elastic License 2.0' },
          { name: 'Self-hostable', openlit: true, competitor: true },
          { name: 'Cloud-managed option', openlit: 'Coming soon', competitor: true },
          {
            name: 'Vendor-neutral OTLP export',
            openlit: true,
            competitor: 'Via OTel / export paths',
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
          {
            name: 'Broad LLM / framework auto-instrumentation',
            openlit: true,
            competitor: true,
          },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          { name: 'GPU monitoring (NVIDIA + AMD)', openlit: true, competitor: false },
          { name: 'Vector DB tracing', openlit: true, competitor: true },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          {
            name: 'Prompt Hub (versioning)',
            openlit: true,
            competitor: 'Eval / playground oriented',
          },
          { name: 'Evaluations (LLM-as-a-judge)', openlit: true, competitor: true },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
          { name: 'AI agent monitoring UI', openlit: true, competitor: 'Via traces' },
        ],
      },
      {
        category: 'Observability Backends',
        features: [
          { name: 'Grafana / Prometheus export', openlit: true, competitor: 'Via export / OTel' },
          { name: 'Any OTLP-compatible backend', openlit: true, competitor: 'Via OTel paths' },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You need Apache 2.0 rather than Elastic License 2.0 for compliance or redistribution',
        'You want Prompt Hub, Vault, agent monitoring, and GPU metrics in the same self-hosted product as traces',
        'You want fully OpenTelemetry-native spans you can forward to any OTLP backend',
        'You prefer one AI engineering platform instead of stitching eval UI + separate ops tooling',
      ],
      chooseCompetitor: [
        'You prefer Phoenix’s tracing and evaluation UX and are comfortable with Elastic License 2.0',
        'Your workflows centre on OpenInference and Phoenix notebooks / eval experiments',
        'You already use Arize’s broader ML observability ecosystem',
      ],
    },
  },
  {
    slug: 'openlit-vs-comet-opik',
    name: 'Comet Opik',
    tagline: 'OpenLIT vs Comet Opik',
    description:
      'OpenLIT vs Comet Opik: compare two Apache-2.0 agent observability platforms. OpenLIT adds OTel-native GPU telemetry, Prompt Hub, Vault and guardrails.',
    heroHeadline: 'OpenLIT vs Comet Opik: an open-source Opik alternative',
    heroSubheadline:
      'Opik is an Apache-2.0 open-source project for LLM tracing and evaluation with Comet ecosystem ties. OpenLIT is also Apache 2.0 and self-hostable, with OpenTelemetry-native instrumentation, Prompt Hub, agent monitoring, Vault, and GPU collectors in one platform.',
    openSourceUrl: 'https://github.com/comet-ml/opik',
    features: [
      {
        category: 'Core Architecture',
        features: [
          { name: 'OpenTelemetry-native', openlit: true, competitor: 'OTel-compatible options' },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: 'Apache 2.0' },
          { name: 'Self-hostable', openlit: true, competitor: true },
          { name: 'Cloud-managed option', openlit: 'Coming soon', competitor: true },
          {
            name: 'Vendor-neutral OTLP export',
            openlit: true,
            competitor: 'Partial / via integrations',
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
          {
            name: 'Broad LLM / framework auto-instrumentation',
            openlit: true,
            competitor: true,
          },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          { name: 'GPU monitoring (NVIDIA + AMD)', openlit: true, competitor: false },
          { name: 'Vector DB tracing', openlit: true, competitor: 'Limited / via traces' },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: true },
          { name: 'Evaluations (LLM-as-a-judge)', openlit: true, competitor: true },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
          { name: 'AI agent monitoring UI', openlit: true, competitor: 'Via traces / experiments' },
        ],
      },
      {
        category: 'Observability Backends',
        features: [
          { name: 'Grafana / Prometheus export', openlit: true, competitor: false },
          { name: 'Any OTLP-compatible backend', openlit: true, competitor: 'Limited' },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You want OpenTelemetry-native telemetry you can also send to Grafana, Datadog, or any OTLP backend',
        'You need GPU monitoring alongside LLM traces for self-hosted inference',
        'You want Vault, Fleet Hub, and agent monitoring included with evals and Prompt Hub',
        'You prefer a platform built around OTel conventions end to end',
      ],
      chooseCompetitor: [
        'You are already invested in the Comet ML ecosystem and want Opik’s eval workflows',
        'Your primary need is tracing + evaluation without GPU or Vault features',
        'You prefer Opik’s experiment-centric UX over an OTel-first platform model',
      ],
    },
  },
  {
    slug: 'openlit-vs-braintrust',
    name: 'Braintrust',
    tagline: 'OpenLIT vs Braintrust',
    description:
      'OpenLIT vs Braintrust: an open-source Braintrust alternative for agent evals and observability. Apache 2.0, self-host free, OpenTelemetry-native.',
    heroHeadline: 'OpenLIT vs Braintrust: an open-source Braintrust alternative',
    heroSubheadline:
      'Braintrust is widely used for prompt management, datasets, and evaluation experiments as a managed product. OpenLIT is an open-source Apache-2.0 platform you self-host for LLM observability, LLM-as-a-judge, Prompt Hub, and cost tracking on OpenTelemetry.',
    features: [
      {
        category: 'Core Architecture',
        features: [
          { name: 'OpenTelemetry-native', openlit: true, competitor: false },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: 'Commercial / cloud-first' },
          { name: 'Self-hostable', openlit: true, competitor: 'Limited / commercial' },
          { name: 'Free self-hosted tier', openlit: true, competitor: false },
          { name: 'Vendor-neutral data export', openlit: true, competitor: false },
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
            name: 'Broad LLM / framework auto-instrumentation',
            openlit: true,
            competitor: 'Via SDK / integrations',
          },
        ],
      },
      {
        category: 'Infrastructure Monitoring',
        features: [
          { name: 'GPU monitoring (NVIDIA + AMD)', openlit: true, competitor: false },
          { name: 'Vector DB tracing', openlit: true, competitor: false },
          { name: 'Multi-environment tagging', openlit: true, competitor: true },
        ],
      },
      {
        category: 'Developer Tools',
        features: [
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: true },
          { name: 'Evaluations (LLM-as-a-judge)', openlit: true, competitor: true },
          { name: 'Dataset / experiment UX', openlit: 'Via evals + traces', competitor: true },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'Fleet Hub (multi-deployment)', openlit: true, competitor: false },
        ],
      },
      {
        category: 'Pricing & data',
        features: [
          {
            name: 'Free self-hosted',
            openlit: true,
            competitor: false,
          },
          {
            name: 'Data residency on your infra',
            openlit: 'Full (self-hosted)',
            competitor: 'Cloud by default',
          },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You need an Apache-2.0, self-hosted stack for compliance or cost control',
        'You want OpenTelemetry-native tracing plus evals and Prompt Hub in one product',
        'You need GPU monitoring, Vault, or agent monitoring alongside evaluation',
        'You want unlimited self-hosted usage without per-trace SaaS pricing',
      ],
      chooseCompetitor: [
        'You want a managed cloud product optimised for eval experiments and datasets',
        'Self-hosting and open-source licensing are not requirements',
        'You prefer Braintrust’s experiment and scoring UX as your primary workflow',
      ],
    },
  },
  {
    slug: 'openlit-vs-openllmetry',
    name: 'OpenLLMetry',
    tagline: 'OpenLIT vs OpenLLMetry',
    description:
      'OpenLIT vs OpenLLMetry: OpenLLMetry is an OTel instrumentation library; OpenLIT is a full self-hosted agent harness platform with tracing, evals and guardrails.',
    heroHeadline: 'OpenLIT vs OpenLLMetry: an open-source OpenLLMetry alternative platform',
    heroSubheadline:
      'OpenLLMetry (by Traceloop) is an instrumentation library that emits OpenTelemetry spans for LLM apps. OpenLIT is a full self-hosted platform (UI, evaluations, Prompt Hub, agents, Vault, GPU) with its own SDKs that also ingest and export OTLP.',
    openSourceUrl: 'https://github.com/Traceloop/openllmetry',
    features: [
      {
        category: 'What it is',
        features: [
          {
            name: 'Category',
            openlit: 'Full AI engineering platform + SDK',
            competitor: 'Instrumentation library (OTLP exporter)',
          },
          { name: 'OpenTelemetry-native', openlit: true, competitor: true },
          { name: 'Open Source', openlit: 'Apache 2.0', competitor: 'Apache 2.0 (SDK)' },
          {
            name: 'Self-hosted product UI',
            openlit: true,
            competitor: false,
          },
          {
            name: 'Requires a separate backend',
            openlit: 'Optional (ships with platform stack)',
            competitor: true,
          },
        ],
      },
      {
        category: 'LLM Monitoring',
        features: [
          { name: 'Auto-instrument LLM calls', openlit: true, competitor: true },
          { name: 'Token / cost attributes on spans', openlit: true, competitor: true },
          { name: 'Built-in traces UI', openlit: true, competitor: false },
          { name: 'Built-in dashboards', openlit: true, competitor: false },
        ],
      },
      {
        category: 'Platform features',
        features: [
          { name: 'Evaluations (LLM-as-a-judge)', openlit: true, competitor: false },
          { name: 'Prompt Hub (versioning)', openlit: true, competitor: false },
          { name: 'Secrets Vault', openlit: true, competitor: false },
          { name: 'AI agent monitoring UI', openlit: true, competitor: false },
          { name: 'GPU collector', openlit: true, competitor: false },
        ],
      },
      {
        category: 'Interoperability',
        features: [
          {
            name: 'Can send OTLP to OpenLIT',
            openlit: 'N/A (is the platform)',
            competitor: true,
          },
          {
            name: 'Works with Grafana / any OTLP backend',
            openlit: true,
            competitor: true,
          },
        ],
      },
    ],
    summary: {
      chooseOpenlit: [
        'You want a self-hosted UI for traces, evals, prompts, agents, and costs, not only an SDK',
        'You need Prompt Hub, LLM-as-a-judge, Vault, or GPU monitoring out of the box',
        'You prefer one Apache-2.0 platform that includes instrumentation and the backend',
        'You want to accept OTLP from OpenLLMetry or other OTel sources into OpenLIT',
      ],
      chooseCompetitor: [
        'You only need an instrumentation library and already have an OTLP backend',
        'You are standardising on Traceloop/OpenLLMetry instrumentation across services',
        'You do not need a prompt, eval, or agent product UI',
      ],
    },
  },
]

export default competitors

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug)
}
