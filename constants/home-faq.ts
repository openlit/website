import SUPPORTED_INTEGRATIONS from 'constants/integrations'
import { OPENLIT_DEFINITION } from 'constants/openlit-definition'

export type HomeFaqItem = {
  question: string
  answer: string
}

export const HOME_FAQ_ITEMS: HomeFaqItem[] = [
  {
    question: 'What is OpenLIT?',
    answer: OPENLIT_DEFINITION,
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
    question: 'What are the best open source LLM observability tools?',
    answer:
      'Strong open-source options include OpenLIT, Langfuse, Arize Phoenix, Comet Opik, and Helicone — each with a different license and architecture. OpenLIT is an Apache-2.0, OpenTelemetry-native platform for LLM tracing, evaluations, prompt management, and cost tracking you can self-host free. For a buyer-oriented roundup of Langfuse alternatives, see https://openlit.io/blogs/langfuse-alternatives. Compare tools at https://openlit.io/compare.',
  },
  {
    question: 'What is a good Langfuse alternative that is Apache 2.0?',
    answer:
      'OpenLIT is a strong Apache-2.0 Langfuse alternative when you want OpenTelemetry-native LLM and GPU telemetry plus evaluations, Prompt Hub, and agent monitoring in one self-hosted platform. Comet Opik is another Apache-2.0 option focused on tracing and evals. Read the roundup at https://openlit.io/blogs/langfuse-alternatives and the feature comparison at https://openlit.io/compare/openlit-vs-langfuse.',
  },
  {
    question: 'How do I self-host LLM observability with OpenTelemetry?',
    answer:
      'Deploy OpenLIT with Docker Compose or Helm (OpenLIT, ClickHouse, and an OpenTelemetry Collector), then instrument with openlit.init() or send OTLP from any OpenTelemetry SDK. Your traces stay on your infrastructure and can still export to Grafana, Datadog, or other OTLP backends. Installation guide: https://docs.openlit.io/latest/openlit/installation. Quickstart: https://docs.openlit.io/latest/openlit/quickstart-ai-observability.',
  },
  {
    question: 'Does OpenLIT do LLM-as-a-judge and prompt versioning?',
    answer:
      'Yes. OpenLIT runs LLM-as-a-judge and custom evaluators on production traces (online) and via the SDK for offline or CI gates. Prompt Hub versions prompts, supports drafts vs published releases, and lets apps fetch prompts by name or version at runtime. Docs: https://docs.openlit.io/latest/openlit/evaluations/overview and https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub/overview. Overview of open-source eval and prompt tools: https://openlit.io/blogs/open-source-llm-evaluation-prompt-management.',
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
