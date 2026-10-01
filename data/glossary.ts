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
    relatedSlugs: ['agent-harness', 'agent-evals', 'trajectory-evaluation'],
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
    name: 'Guardrails',
    title: 'What Are LLM Guardrails? Prompt Injection and Topic Controls',
    description:
      'LLM guardrails are runtime checks that block or flag unsafe inputs and outputs: prompt injection, sensitive topics, and topic restriction for AI agents.',
    definition:
      'LLM guardrails are runtime controls that detect or block unsafe prompts and responses—such as prompt injection, sensitive topics, and topic restriction—before they reach users or tools.',
    body: [
      'Guardrails sit in the governance layer of the harness. They fail closed for safety-critical paths and should be traced so you can see when and why a request was blocked.',
      'OpenLIT includes open-source guardrails for prompt injection and related checks, correlated with OpenTelemetry traces so blocked calls show up next to the agent step that triggered them.',
    ],
    relatedSlugs: ['agent-harness', 'agent-evals', 'harness-engineering'],
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
]

export function getGlossaryTerm(slug: string) {
  return GLOSSARY_TERMS.find((term) => term.slug === slug)
}

export default GLOSSARY_TERMS
