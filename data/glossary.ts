export type GlossaryTerm = {
  slug: string
  name: string
  title: string
  description: string
  definition: string
  body: string[]
  relatedSlugs?: string[]
  faq?: { question: string; answer: string }[]
}

/**
 * Term as it reads mid-sentence: lowercases a leading ordinary word
 * ("Agent harness" -> "agent harness") but keeps acronyms and brand names
 * ("LLM guardrails", "OpenTelemetry GenAI ...").
 */
export function termInSentence(name: string) {
  const first = name.split(/[\s-]/)[0]
  return first.slice(1) === first.slice(1).toLowerCase()
    ? name.charAt(0).toLowerCase() + name.slice(1)
    : name
}

/** "What is an agent harness?" style question for a term's H1. */
export function termQuestion(name: string) {
  const plural = /[^s]s$/.test(name)
  return `What ${plural ? 'are' : 'is'} ${termInSentence(name)}?`
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'agent-harness',
    name: 'Agent harness',
    title: 'What Is an Agent Harness? Definition and Components',
    description:
      'An agent harness is everything in an AI agent except the model: tools, context, memory, prompts, hooks, guardrails and observability. Definition and examples.',
    definition:
      'An agent harness is everything in an AI agent except the model: the tools, context, prompts, memory, hooks, guardrails, and feedback loops that turn a model into a working agent.',
    body: [
      'An AI agent is a model plus a harness. The model generates tokens; the harness decides which tools to expose, how context is assembled, what permissions apply, and how failures are handled.',
      'Common harnesses include coding agents such as Claude Code, Codex, Cursor, and Windsurf, plus frameworks such as LangGraph, CrewAI, OpenAI Agents SDK, and deepagents. Each is a different way to wrap a model with tools and control flow.',
      'OpenLIT does not replace your harness. It instruments any harness through OpenTelemetry so you can observe, evaluate, and improve it: traces for LLM and tool calls, evals on real trajectories, guardrails at runtime, and prompt or rule changes without redeploying.',
    ],
    relatedSlugs: ['harness-engineering', 'agent-observability', 'agent-evals', 'guardrails'],
    faq: [
      {
        question: 'What is an agent harness?',
        answer:
          'An agent harness is everything in an AI agent except the model: tools, context, prompts, memory, hooks, guardrails, and feedback loops.',
      },
      {
        question: 'Is LangGraph an agent harness?',
        answer:
          'LangGraph is an agent framework you use to build a harness. The running system around the model—tools, state, and control flow—is the harness.',
      },
      {
        question: 'How does OpenLIT relate to an agent harness?',
        answer:
          'OpenLIT observes, evaluates, and improves any harness via OpenTelemetry. It is not a runtime harness itself.',
      },
    ],
  },
  {
    slug: 'harness-engineering',
    name: 'Harness engineering',
    title: 'What Is Harness Engineering? Agent Reliability Discipline',
    description:
      'Harness engineering is designing, measuring, and improving everything around the model in an AI agent so it is reliable in production. Definition and loop.',
    definition:
      'Harness engineering (or agent harness engineering) is the discipline of designing, measuring, and improving everything around the model in an AI agent so the agent is reliable in production.',
    body: [
      'The industry consensus is that reliability lives in the harness, not only in the model. Teams run agents on real tasks, observe failures in traces, classify them, fix prompts, tools, rules, or guardrails, and verify the fix with regression evals.',
      'The core loop is run → observe → evaluate → fix the harness → verify. Every repeated agent failure becomes a harness defect to ratchet closed.',
      'OpenLIT is an open-source agent harness engineering platform for that loop: agent observability and OpenTelemetry tracing, agent evals, guardrails, prompt management, and cost and GPU monitoring.',
    ],
    relatedSlugs: ['agent-harness', 'agent-observability', 'agent-evals', 'guardrails'],
    faq: [
      {
        question: 'What is harness engineering?',
        answer:
          'Harness engineering is designing, measuring, and improving the tools, context, prompts, memory, hooks, guardrails, and feedback loops around a model so agents work reliably in production.',
      },
      {
        question: 'Is OpenLIT a harness runtime?',
        answer:
          'No. OpenLIT does not run your agent loop. It instruments and improves whatever harness you already use through OpenTelemetry.',
      },
    ],
  },
  {
    slug: 'agent-observability',
    name: 'Agent observability',
    title: 'What Is Agent Observability? Traces Beyond LLM Calls',
    description:
      'Agent observability traces every LLM call, tool call, MCP request, retrieval and agent step with cost and latency—broader than LLM-only observability.',
    definition:
      'Agent observability is the practice of tracing and monitoring the full agent harness: LLM calls, tool calls, MCP requests, retrieval, multi-step trajectories, cost, latency, and outcomes.',
    body: [
      'LLM observability usually focuses on individual model calls. Agent observability covers the trajectory: which tools ran, what context was passed, where the agent looped or stalled, and what the user-facing outcome was.',
      'OpenTelemetry GenAI semantic conventions give a portable way to represent those spans. OpenLIT emits standard OTLP traces and metrics so the same data can power OpenLIT dashboards or export to Grafana, Datadog, and other OTLP backends.',
      'Coding agents and MCP servers are part of the same picture: sessions, tool calls, tokens, and cost per user or repo without requiring a proxy.',
    ],
    relatedSlugs: ['llm-observability', 'agent-harness', 'agent-evals', 'trajectory-evaluation'],
    faq: [
      {
        question: 'What is an agent observability platform?',
        answer:
          'An agent observability platform traces every step of an AI agent run (LLM calls, tool calls, MCP requests, retrieval, and sub-agents) with cost, latency, and outcome, and lets you evaluate and debug those runs. OpenLIT is an open-source, OpenTelemetry-native agent observability platform.',
      },
      {
        question: 'What are the best agent observability platforms?',
        answer:
          'Commonly used options include OpenLIT, LangSmith, Langfuse, Arize, Braintrust, Maxim AI, Datadog, Comet Opik, Galileo, and AgentOps. See the comparison at https://openlit.io/guides/best-ai-agent-observability-platforms.',
      },
    ],
  },
  {
    slug: 'llm-observability',
    name: 'LLM observability',
    title: 'What Is LLM Observability? Definition, Metrics and Tools',
    description:
      'LLM observability is tracing and monitoring LLM apps in production: prompts, responses, tokens, cost, latency, errors and quality. Definition, metrics and tools.',
    definition:
      'LLM observability is the practice of tracing, measuring, and evaluating large language model applications in production: prompts and completions, token usage, cost, latency, errors, and output quality.',
    body: [
      'Traditional APM tells you a request was slow or failed. LLM observability adds model-specific signals: which prompt and model produced a response, how many tokens it used, what it cost, and whether the output was accurate, relevant, and safe.',
      'Core metrics are latency (including time to first token), token usage, cost per request, error and rate-limit rates, and quality scores from evaluations such as LLM-as-a-judge. For RAG apps, retrieval quality and vector database latency matter too. For agents, observability extends to tool calls and full trajectories (see agent observability).',
      'OpenTelemetry GenAI semantic conventions standardize how LLM spans and metrics are recorded. OpenLIT is an open-source LLM observability platform that emits those spans natively, stores them in ClickHouse, and can export the same data to Grafana, Datadog, or any OTLP backend.',
    ],
    relatedSlugs: ['agent-observability', 'agent-evals', 'guardrails'],
    faq: [
      {
        question: 'What is an LLM observability platform?',
        answer:
          'An LLM observability platform collects traces and metrics from LLM applications (prompts, responses, tokens, cost, latency, and errors) and adds evaluation, so teams can debug and improve quality in production. OpenLIT is an open-source, OpenTelemetry-native LLM observability platform.',
      },
      {
        question: 'What metrics matter for LLM observability?',
        answer:
          'Latency and time to first token, token usage, cost per request and per user, error and rate-limit rates, and quality scores such as relevance, hallucination, and toxicity.',
      },
      {
        question: 'What are the top LLM observability platforms?',
        answer:
          'OpenLIT, Langfuse, Arize Phoenix, LangSmith, Comet Opik, Braintrust, Helicone, Datadog LLM Observability, MLflow, and OpenLLMetry. See the comparison at https://openlit.io/guides/best-llm-observability-tools.',
      },
      {
        question: 'How do I set up logs and traces for LLM observability?',
        answer:
          'Use OpenTelemetry. Install the OpenLIT SDK (pip install openlit) and call openlit.init(otlp_endpoint="http://127.0.0.1:4318"), or run your app unchanged with openlit-instrument. Each LLM call becomes a trace span with the model, tokens, cost, and latency, prompts and completions are captured with the span, and token and cost metrics are exported too. Send it all over OTLP to a self-hosted OpenLIT instance or to any OpenTelemetry backend.',
      },
      {
        question: 'How do I connect LLM traces to infrastructure metrics and logs?',
        answer:
          'Emit all three as OpenTelemetry signals with shared context. When your logs go through OpenTelemetry, a log written inside a span carries its trace ID, so a backend can jump from an LLM span to the matching log lines. Resource attributes such as service.name and deployment.environment (set by service_name and environment in openlit.init) tie spans to the host, container, and GPU metrics from the same service. OpenLIT can also collect GPU metrics (collect_gpu_stats=True) alongside the traces.',
      },
      {
        question: 'How do I log LLM prompts and responses for governance?',
        answer:
          'Record them on the trace, keep the data in storage you control, and limit what is kept. The OpenLIT SDK captures prompts and responses by default; set capture_message_content=False to drop them, or max_content_length to truncate them. Because OpenLIT is self-hosted, the records stay in your own ClickHouse, where you set retention and access. Add guardrails to flag sensitive content.',
      },
      {
        question: 'Is Helicone or Grafana better for monitoring LLM costs and latency?',
        answer:
          "They do different jobs. Helicone is mainly a proxy (AI gateway) that logs each LLM request and calculates its cost and latency. Grafana is a dashboard tool: it shows LLM costs and latency only if something exports them, for example OpenTelemetry metrics in Prometheus. OpenLIT can be that source: its SDK records cost and latency without a proxy and exports them over OTLP to Grafana, or you can use OpenLIT's own dashboards.",
      },
    ],
  },
  {
    slug: 'opentelemetry-genai-semantic-conventions',
    name: 'OpenTelemetry GenAI semantic conventions',
    title: 'OpenTelemetry GenAI Semantic Conventions Explained (gen_ai.*)',
    description:
      'OpenTelemetry GenAI semantic conventions define standard gen_ai.* span names, attributes, and metrics for LLM calls, agents, tools, and MCP. What they cover and how to use them.',
    definition:
      'OpenTelemetry GenAI semantic conventions are the standard names for telemetry from generative AI systems: span names, gen_ai.* attributes, metrics, and events for LLM inference, embeddings, agents, tool calls, and MCP, so any OpenTelemetry backend can read LLM and agent traces the same way.',
    body: [
      'An LLM inference span is named "{gen_ai.operation.name} {gen_ai.request.model}", for example "chat gpt-4". The span carries gen_ai.provider.name (required, such as openai or aws.bedrock), gen_ai.request.model, and token counts in gen_ai.usage.input_tokens and gen_ai.usage.output_tokens. Agent spans use operations such as create_agent and invoke_agent, and tool calls use execute_tool. The conventions also define spans and metrics for MCP clients and servers.',
      'The conventions are still marked Development, so attribute and metric names can change between releases. In 2026 they moved from the main semantic-conventions repository to a dedicated repository, open-telemetry/semantic-conventions-genai, which uses OpenTelemetry Weaver to generate the docs. Instrumentation should pin a semantic conventions version and expect migrations.',
      'OpenLIT SDKs emit spans and metrics that follow the GenAI semantic conventions for LLM providers, vector databases, and agent frameworks, with a single openlit.init() call. Because the output is standard OTLP, the same traces work in OpenLIT, Grafana, Datadog, or any OpenTelemetry backend without re-instrumenting.',
    ],
    relatedSlugs: ['llm-observability', 'agent-observability', 'agent-harness'],
    faq: [
      {
        question: 'What are OpenTelemetry GenAI semantic conventions?',
        answer:
          'They are the OpenTelemetry standard for naming generative AI telemetry: gen_ai.* span attributes, metrics, and events for LLM calls, embeddings, agents, tool calls, and MCP. They let any OTLP backend understand LLM and agent traces.',
      },
      {
        question: 'Are the GenAI semantic conventions stable?',
        answer:
          'No. They are marked Development, so names can change. They are maintained in the open-telemetry/semantic-conventions-genai repository.',
      },
      {
        question: 'Which tools emit OpenTelemetry GenAI semantic conventions?',
        answer:
          'OpenLIT, OpenLLMetry, and the OpenTelemetry Python contrib instrumentations emit gen_ai.* spans, and backends such as OpenLIT, Grafana, and Datadog can ingest them. OpenLIT is open source under Apache 2.0 and instruments LLMs, vector databases, and agent frameworks with one line of code.',
      },
    ],
  },
  {
    slug: 'agent-evals',
    name: 'Agent evals',
    title: 'What Are Agent Evals? LLM-as-a-Judge and CI Gates',
    description:
      'Agent evals score production traces and offline runs with LLM-as-a-judge, programmatic checks and human review, then gate releases in CI.',
    definition:
      'Agent evals are systematic checks that score agent quality, safety, and cost on real traces or offline datasets—using LLM-as-a-judge, programmatic rules, or human review.',
    body: [
      'Online evals run on production traffic. Offline evals and CI gates catch regressions before release. Both belong in a harness engineering loop: observe failures, score them, fix the harness, verify.',
      'OpenLIT supports LLM-as-a-judge and programmatic evaluators on traces, plus human feedback. Use them to gate releases when accuracy, safety, or cost drifts.',
    ],
    relatedSlugs: ['trajectory-evaluation', 'agent-observability', 'harness-engineering'],
  },
  {
    slug: 'guardrails',
    name: 'LLM guardrails',
    title: 'What Are LLM Guardrails? Prompt Injection, PII, and Topic Controls',
    description:
      'LLM guardrails are runtime checks that block or flag unsafe inputs and outputs: prompt injection, sensitive topics, topic restriction, and PII redaction for AI agents.',
    definition:
      'LLM guardrails are runtime controls that detect or block unsafe prompts and responses, such as prompt injection, jailbreaks, sensitive topics, off-topic requests, and leaked personal data, before they reach users, tools, or logs.',
    body: [
      'Guardrails run on inputs, outputs, or both. Input guardrails catch prompt injection and jailbreak attempts, including instructions hidden in tool outputs or retrieved documents. Output guardrails catch leaked secrets, personal data, or responses outside an approved topic. Each check either blocks the request, rewrites it, or flags it for review.',
      'Detectors are usually rule-based (regular expressions and keyword lists, which are fast and cheap) or model-based (an LLM judge or classifier, which catches paraphrased attacks but adds latency and cost). Production systems often run cheap rules first and escalate to a model only when needed.',
      'Guardrails sit in the governance layer of an agent harness. They should fail closed on safety-critical paths and be traced, so you can see when and why a request was blocked. OpenLIT includes open-source guardrails for prompt injection, sensitive topics, topic restriction, and PII redaction (for example openlit.guard.PromptInjection), with LLM-based or regex-based detection, correlated with OpenTelemetry traces so blocked calls appear next to the agent step that triggered them.',
    ],
    relatedSlugs: ['agent-harness', 'agent-evals', 'llm-as-a-judge'],
    faq: [
      {
        question: 'What are LLM guardrails?',
        answer:
          'LLM guardrails are runtime checks that detect or block unsafe prompts and responses, such as prompt injection, sensitive topics, off-topic requests, and personal data.',
      },
      {
        question: 'What is the difference between guardrails and evals?',
        answer:
          'Guardrails run inline on each request and can block it. Evals score quality after the fact, on production traces or test datasets, to find regressions and gate releases.',
      },
      {
        question: 'Are there open-source LLM guardrails?',
        answer:
          'Yes. OpenLIT (Apache 2.0) includes prompt injection, sensitive topic, topic restriction, and PII redaction guardrails for Python and TypeScript, traced with OpenTelemetry. Guide: https://openlit.io/blogs/protect-prompt-injection.',
      },
    ],
  },
  {
    slug: 'llm-as-a-judge',
    name: 'LLM-as-a-judge',
    title: 'What Is LLM-as-a-Judge? How LLM Evaluation Scoring Works',
    description:
      'LLM-as-a-judge uses a language model to score another model or agent output for hallucination, relevance, toxicity, or custom criteria. How it works, limits, and tools.',
    definition:
      'LLM-as-a-judge is an evaluation method where one language model scores the output of another model or agent against defined criteria, such as hallucination, relevance, bias, toxicity, or a custom rubric, and returns a score, a label, and its reasoning.',
    body: [
      'A judge prompt gives the model the input, the output being graded, optional reference context, and a rubric, then asks for a score or a pass/fail verdict with an explanation. It scales human-style review to thousands of traces, which manual review cannot do.',
      'Judges have known failure modes: they can prefer longer answers, favor outputs from their own model family, and drift when the judge model changes. Pin the judge model and prompt, calibrate against a sample of human labels, and combine judges with programmatic checks (exact match, schema validation, or regex) where the answer is checkable.',
      'Use it online on sampled production traces to catch regressions, and offline on datasets in CI to gate releases. OpenLIT runs LLM-as-a-judge evaluators (hallucination, bias, toxicity, or custom) on traces, with a configurable judge model, scheduled Auto Evaluation, and pass-rate analytics, and the same criteria through the SDK for CI.',
    ],
    relatedSlugs: ['agent-evals', 'trajectory-evaluation', 'llm-observability'],
    faq: [
      {
        question: 'What is LLM-as-a-judge?',
        answer:
          'LLM-as-a-judge uses a language model to grade another model or agent output against a rubric, returning a score or verdict with reasoning.',
      },
      {
        question: 'Is LLM-as-a-judge reliable?',
        answer:
          'It is useful but imperfect. Pin the judge model and prompt, check it against human labels, and pair it with programmatic checks where the correct answer is known.',
      },
      {
        question: 'Which tools support LLM-as-a-judge?',
        answer:
          'OpenLIT, Langfuse, Arize Phoenix, LangSmith, Braintrust, and Comet Opik all support LLM-as-a-judge evaluation. OpenLIT is open source under Apache 2.0 and runs judges on OpenTelemetry traces. Docs: https://docs.openlit.io/latest/openlit/evaluations/llm-as-a-judge.',
      },
    ],
  },
  {
    slug: 'trajectory-evaluation',
    name: 'Trajectory evaluation',
    title: 'What Is Trajectory Evaluation? Tool-Call and Path Scoring',
    description:
      'Trajectory evaluation scores the sequence of agent steps and tool calls—not only the final answer—to catch wrong tools, loops, and brittle paths.',
    definition:
      'Trajectory evaluation (or tool-call evaluation) scores the sequence of steps an agent took—tools chosen, arguments, ordering, and intermediate decisions—not only the final response.',
    body: [
      'Final-answer grading misses many harness bugs: wrong tool selection, unnecessary retries, stuck loops, or skipped retrieval. Trajectory evals inspect the path.',
      'OpenLIT traces give you the raw trajectory (LLM and tool spans). Pair them with LLM-as-a-judge or programmatic checks to score paths and gate CI when trajectories regress.',
    ],
    relatedSlugs: ['agent-evals', 'agent-observability'],
  },
  {
    slug: 'llm-evaluation',
    name: 'LLM evaluation',
    title: 'How to Evaluate LLM Outputs in Production: Methods and Tools',
    description:
      'How to evaluate LLM outputs in production: score sampled traces with LLM-as-a-judge and programmatic checks, add human review, track pass rates, and gate releases in CI.',
    definition:
      'LLM evaluation is scoring the outputs of a language model or agent for quality, safety, and cost. In production that means scoring real traces, not only a test set, so you catch regressions users actually hit.',
    body: [
      'To evaluate LLM outputs in production: (1) trace every call so each output is stored with its prompt, model, and context; (2) sample those traces and score them with LLM-as-a-judge for subjective criteria such as hallucination, relevance, bias, or toxicity; (3) add programmatic checks (exact match, JSON schema validation, regex) wherever the right answer is checkable; (4) send a sample to human review to calibrate the judges; (5) track pass rates over time and alert when they drop.',
      'Online evaluation runs on live traffic and tells you what is happening now. Offline evaluation runs the same criteria on a fixed dataset before a release, so a prompt or model change that lowers the pass rate fails CI instead of reaching users. Use both: offline to block known regressions, online to find new ones.',
      'Pin the judge model and its prompt, and record which prompt version and model produced each output. Without that, a change in pass rate cannot be traced back to the change that caused it.',
      'OpenLIT runs LLM-as-a-judge evaluators (hallucination, bias, toxicity, or custom criteria) on OpenTelemetry traces with a configurable judge model, scheduled Auto Evaluation, and pass-rate analytics, and exposes the same criteria through the SDK for CI. It is open source under Apache 2.0. Docs: https://docs.openlit.io/latest/openlit/evaluations/llm-as-a-judge.',
    ],
    relatedSlugs: ['llm-as-a-judge', 'agent-evals', 'trajectory-evaluation', 'llm-observability'],
    faq: [
      {
        question: 'How do I evaluate LLM outputs in production?',
        answer:
          'Trace every LLM call, score a sample of production traces with LLM-as-a-judge and programmatic checks, calibrate the judges against human labels, and track pass rates over time with alerts on drops. Run the same criteria offline in CI before each release.',
      },
      {
        question: 'What is the difference between online and offline LLM evaluation?',
        answer:
          'Online evaluation scores live production traces to find problems as they happen. Offline evaluation scores a fixed dataset before release and can block a deploy when quality drops.',
      },
      {
        question: 'What metrics should I track when evaluating LLM outputs?',
        answer:
          'Pass rate per criterion (hallucination, relevance, toxicity, or a custom rubric), plus cost, latency, and error rate from the same traces, broken down by prompt version and model.',
      },
      {
        question: 'Which open-source tools evaluate LLM outputs in production?',
        answer:
          'OpenLIT (Apache 2.0) runs LLM-as-a-judge evaluators on OpenTelemetry traces with scheduled Auto Evaluation. Langfuse (MIT core) and Comet Opik (Apache 2.0) also offer open-source evaluation; Arize Phoenix is source-available under Elastic License 2.0. See https://openlit.io/guides/best-open-source-llm-observability-tools.',
      },
    ],
  },
  {
    slug: 'prompt-management',
    name: 'Prompt management',
    title: 'What Is Prompt Management? How to Version Prompts for LLM Apps',
    description:
      'Prompt management keeps LLM prompts out of code, in versioned storage the app fetches at runtime: semantic versions, variables, drafts, rollback, and the prompt version on every trace.',
    definition:
      'Prompt management is storing, versioning, and serving the prompts an LLM app uses from a central place instead of hard-coding them, so prompts can change without a deploy and every change can be traced and rolled back.',
    body: [
      'To version prompts for an LLM app: move each prompt out of the code into a prompt registry; publish every change as a new, permanent version instead of editing in place; fetch the prompt at runtime by name (latest, or a pinned version); fill variables at fetch time; and record the prompt name and version on each trace so you can tell which version produced an answer.',
      'Keeping prompts out of code means non-engineers can change wording without a release. The risk is the same: a bad edit is live on the next call. Plan the way back before you need it. Pinning a version through configuration stops the bad version fastest; publishing the old text as a new version rolls everyone forward to a known good prompt.',
      'Use drafts for work in progress so unfinished edits are never served, and handle a failed fetch explicitly: if the app cannot load its prompt, it should fall back to a safe response rather than run without its instructions.',
      'OpenLIT Prompt Hub is open source (Apache 2.0). Each published version is permanent and numbered as a Major, Minor, or Patch bump; drafts are never served; variables such as {{company}} are filled at fetch time with openlit.get_prompt(); and download counts show which versions apps are fetching. Walkthrough: https://openlit.io/blogs/prompt-versioning-with-prompt-hub. Docs: https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub/overview.',
    ],
    relatedSlugs: ['llm-evaluation', 'llm-observability', 'agent-harness'],
    faq: [
      {
        question: 'How do I manage and version prompts for LLM apps?',
        answer:
          'Store prompts in a prompt registry instead of code, publish each change as a new permanent version, fetch prompts at runtime by name and version, fill variables at fetch time, and record the prompt version on every trace.',
      },
      {
        question: 'How do I roll back a bad prompt version?',
        answer:
          'Pin the app to the last good version through configuration, or publish the old text again as a new version so every unpinned caller picks it up. In OpenLIT Prompt Hub old versions are read-only, so both approaches leave the full history intact.',
      },
      {
        question: 'Is there an open-source prompt management tool?',
        answer:
          'Yes. OpenLIT Prompt Hub is open source under Apache 2.0, with versioned prompts, drafts, variables, and runtime fetching through the OpenLIT SDK. Langfuse also offers open-source prompt management.',
      },
    ],
  },
]

export function getGlossaryTerm(slug: string) {
  return GLOSSARY_TERMS.find((term) => term.slug === slug)
}

export default GLOSSARY_TERMS
