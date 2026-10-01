export const PILLAR_FAQ = [
  {
    question: 'What is agent harness engineering?',
    answer:
      'Agent harness engineering is the discipline of designing, measuring, and improving everything around the model in an AI agent—tools, context, prompts, memory, hooks, guardrails, and feedback loops—so the agent is reliable in production.',
  },
  {
    question: 'What is an agent harness vs an agent framework?',
    answer:
      'A framework helps you build the harness. The harness is the running system around the model. OpenLIT is neither: it instruments and improves whatever harness you already use through OpenTelemetry.',
  },
  {
    question: 'Is OpenLIT an agent harness runtime?',
    answer:
      'No. OpenLIT does not run your agent loop. It is the open-source engineering platform for observing, evaluating, guarding, and improving any harness on OpenTelemetry.',
  },
  {
    question: 'How does OpenLIT fit the harness engineering loop?',
    answer:
      'Observe with agent observability and LLM tracing, evaluate with agent evals, guard with runtime guardrails, fix with Prompt Hub, Context, Rule Engine, and Vault, then verify with regression evals in CI.',
  },
]
