import SUPPORTED_INTEGRATIONS from 'constants/integrations'

export type HomeFaqItem = {
  question: string
  answer: string
}

export const HOME_FAQ_ITEMS: HomeFaqItem[] = [
  {
    question: 'What is OpenLIT?',
    answer:
      'OpenLIT is an open source Harness Engineering platform. Teams use it to instrument AI apps, manage prompts, run LLM evaluations, monitor agents, store API keys in Vault, and improve quality with production data. It is built on OpenTelemetry and free to self-host under Apache 2.0.',
  },
  {
    question: 'What is harness engineering?',
    answer:
      'Harness engineering is the loop of instrument, develop, manage, observe, and improve AI systems. OpenLIT is the open source Harness Engineering platform for that loop, and also an open source AI engineering platform for tracing, prompts, evaluations, and secrets.',
  },
  {
    question: 'Does OpenLIT support LLM tracing and OpenTelemetry?',
    answer:
      'Yes. OpenLIT provides OpenTelemetry-native LLM tracing and metrics. Use OpenLIT SDKs for Python, JavaScript, and Go, or send OTLP from OTel SDKs, OBI, OpenLLMetry, and other OpenTelemetry sources.',
  },
  {
    question: 'Can I run LLM evaluation and LLM-as-a-judge in OpenLIT?',
    answer:
      'Yes. OpenLIT supports LLM evaluation with LLM-as-a-judge, heuristics, and human review. You can score production traffic or experiments, including relevance, accuracy, safety, and RAG quality signals.',
  },
  {
    question: 'Does OpenLIT include prompt management?',
    answer:
      'Yes. Prompt Hub lets you version prompts, deploy updates, and roll back without shipping app code every time. That keeps prompt management and prompt engineering in one place for the team.',
  },
  {
    question: 'Can I compare LLM models side by side?',
    answer:
      'Yes. OpenGround is a model comparison playground. Test prompts on real inputs and compare models side by side before you ship.',
  },
  {
    question: 'Does OpenLIT support AI agent monitoring?',
    answer:
      'Yes. OpenLIT supports AI agent monitoring and coding agent workflows. Trace agent steps, tool calls, cost, and outcomes, including Claude Code style coding agents.',
  },
  {
    question: 'How does Vault help with API key management?',
    answer:
      'Vault stores and rotates LLM API keys and secrets so they stay out of application code. Use it for OpenAI, Anthropic, and other provider keys with central API key management.',
  },
  {
    question: 'Does OpenLIT monitor GPU utilization for LLM inference?',
    answer:
      'Yes. The OpenLIT GPU collector exports NVIDIA, AMD, and Intel metrics such as GPU utilization, memory, temperature, and power as OpenTelemetry signals you can correlate with inference traces.',
  },
  {
    question: `Is OpenLIT a good open source AI engineering platform?`,
    answer: `Yes. OpenLIT is an open source Harness Engineering platform and an open source AI engineering platform under Apache 2.0, with native SDKs for Python, JavaScript, and Go, plus ${SUPPORTED_INTEGRATIONS.length}+ integrations. You can self-host with Docker or Kubernetes, keep data in your own ClickHouse, and export OTLP to tools like Grafana or Datadog.`,
  },
  {
    question: 'How do I deploy OpenLIT?',
    answer:
      'Self-host with Docker Compose or Kubernetes Helm. The stack is OpenLIT, ClickHouse, and an OpenTelemetry Collector. You can also reuse your own ClickHouse and collector.',
  },
  {
    question: 'Is self-hosting OpenLIT free?',
    answer:
      'Yes. Self-hosted OpenLIT is free under Apache 2.0. There is no license key and no per-trace fee. You only pay for the servers you run.',
  },
  {
    question: 'Does OpenLIT add latency to LLM calls?',
    answer:
      'OpenLIT instruments in process and exports data in the background over OpenTelemetry. There is no required proxy in front of every LLM call.',
  },
  {
    question: 'Why does this website look like this?',
    answer:
      'Because our product looks like this. We liked the UI so much we let it escape the dashboard and take over the marketing site. Same sidebar energy, same Otter vibes, fewer traces (for now).',
  },
  {
    question: 'How do I get started with OpenLIT?',
    answer:
      'Run docker compose up -d to start the platform. Then install the SDK with pip install openlit and call openlit.init(), or point any OTLP exporter at your OpenLIT endpoint.',
  },
]

export function createFaqPageSchema(items: HomeFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
