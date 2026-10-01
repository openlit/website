import Link from 'next/link'
import { MarkedWord } from '@/components/common/marker-underline'
import ReadyToGetStarted from '@/components/common/ready-to-get-started'
import { OPENLIT_POSITIONING } from 'constants/openlit-definition'
import { PILLAR_FAQ } from 'constants/pillar-faq'

export default function AgentHarnessEngineeringContent() {
  return (
    <div className="container py-10 md:py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandPrimary">
          Concepts
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl md:leading-tight">
          What is agent <MarkedWord>harness engineering</MarkedWord>?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-800 dark:text-stone-100">
          Agent harness engineering is the discipline of designing, measuring, and improving
          everything around the model in an AI agent so the agent is reliable in production.
        </p>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          {OPENLIT_POSITIONING}
        </p>
      </div>

      <article className="max-w-3xl space-y-10 text-base leading-relaxed text-stone-600 dark:text-stone-300">
        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            What is agent harness engineering?
          </h2>
          <p className="mt-3">
            An AI agent is a{' '}
            <strong className="font-semibold text-stone-900 dark:text-stone-50">
              model plus a harness
            </strong>
            . The harness is everything except the model: tools, context, prompts, memory, hooks,
            guardrails, and feedback loops. That framing is now shared across sources such as{' '}
            <a
              href="https://blog.langchain.com/the-anatomy-of-an-agent-harness/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brandPrimary underline"
            >
              LangChain&apos;s Anatomy of an Agent Harness
            </a>
            ,{' '}
            <a
              href="https://addyosmani.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brandPrimary underline"
            >
              Addy Osmani
            </a>
            ,{' '}
            <a
              href="https://www.deepset.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brandPrimary underline"
            >
              deepset
            </a>
            , and Databricks&apos; writing on AI agent harnesses. Harness engineering treats every
            repeated agent failure as a harness defect to observe, classify, fix, and verify.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            Agent harness vs model vs agent framework vs MCP
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left dark:border-stone-800">
                  <th className="py-2 pr-4 font-semibold text-stone-900 dark:text-stone-50">
                    Concept
                  </th>
                  <th className="py-2 font-semibold text-stone-900 dark:text-stone-50">Role</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Model', 'Generates tokens; does not own tools, memory, or permissions.'],
                  [
                    'Agent harness',
                    'Everything around the model that makes an agent work in production.',
                  ],
                  [
                    'Agent framework',
                    'Library used to build a harness (LangGraph, CrewAI, Agents SDK).',
                  ],
                  [
                    'MCP',
                    'Protocol for exposing tools/context to agents; part of the tool interface layer.',
                  ],
                  [
                    'OpenLIT',
                    'Engineering platform to observe, evaluate, guard, and improve any harness.',
                  ],
                ].map(([name, role]) => (
                  <tr key={name} className="border-b border-stone-100 dark:border-stone-900">
                    <td className="py-3 pr-4 font-medium text-stone-900 dark:text-stone-50">
                      {name}
                    </td>
                    <td className="py-3">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            The layers of an agent harness
          </h2>
          <p className="mt-3">
            Surveys of harness engineering often group capabilities into layers such as execution,
            tools, context, lifecycle, observability, verification, and governance (sometimes
            abbreviated ETCLOVG). OpenLIT maps primarily to observability, verification, and
            governance, with prompt, context, and rule tooling in the context and guides layer:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-stone-900 dark:text-stone-50">Observability</strong> — agent
              traces for LLM calls, tool calls, MCP, retrieval, and cost
            </li>
            <li>
              <strong className="text-stone-900 dark:text-stone-50">Verification</strong> — agent
              evals, LLM-as-a-judge, trajectory scoring, CI gates
            </li>
            <li>
              <strong className="text-stone-900 dark:text-stone-50">Governance</strong> —
              guardrails, Vault secrets, trace governance
            </li>
            <li>
              <strong className="text-stone-900 dark:text-stone-50">Context / guides</strong> —
              Prompt Hub, Context, Rule Engine
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            The harness engineering loop
          </h2>
          <p className="mt-3">
            Run the agent on real tasks → observe failures in traces → evaluate quality and safety →
            fix the harness (prompts, tools, rules, guardrails) → verify with regression evals →
            repeat. That ratchet is what turns one-off demos into production systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            Guides vs sensors
          </h2>
          <p className="mt-3">
            Guides are feedforward: AGENTS.md, skills, conventions, and prompts that steer behavior
            before a run. Sensors are feedback: tracing, evals, linters, and CI gates that detect
            failures after a run. OpenLIT focuses on the sensor and verification side while linking
            back to prompt and rule changes so you can close the loop.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            Coding agents and decision harnesses
          </h2>
          <p className="mt-3">
            Coding agent harnesses (Claude Code, Codex, Cursor, Windsurf) need per-session cost,
            tool-call visibility, and outcome tracking without forcing an SDK into the editor.
            Decision harnesses (for example typed choice models with thresholds and escalation) need
            decision receipts: options offered, choice, confidence, fallback, tokens, cost, latency,
            and model version. Both are harnesses OpenLIT can observe through OpenTelemetry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
            Tools for agent harness engineering
          </h2>
          <p className="mt-3">
            Runtimes and frameworks (deepagents, Claude Code, LangGraph) build the harness.
            Observability and evals platforms (OpenLIT, Langfuse, LangSmith, Phoenix, and others)
            measure and improve it. Guardrail libraries add governance. OpenLIT&apos;s claim is the
            open-source engineering platform for any harness—not a replacement for your runtime. See
            the{' '}
            <Link href="/compare" className="font-medium text-brandPrimary underline">
              comparison hub
            </Link>{' '}
            for feature-by-feature detail.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">FAQ</h2>
          <div className="mt-4 divide-y divide-stone-200 border-t border-stone-200 dark:divide-stone-800 dark:border-stone-800">
            {PILLAR_FAQ.map((item) => (
              <div key={item.question} className="py-4">
                <h3 className="text-base font-medium text-stone-900 dark:text-stone-50">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">Keep reading</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <Link href="/glossary/agent-harness" className="text-brandPrimary underline">
                What is an agent harness?
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="text-brandPrimary underline">
                Full glossary
              </Link>
            </li>
            <li>
              <Link href="/compare" className="text-brandPrimary underline">
                OpenLIT vs alternatives
              </Link>
            </li>
            <li>
              <a
                href="https://docs.openlit.io/latest/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brandPrimary underline"
              >
                OpenLIT docs
              </a>
            </li>
          </ul>
        </section>
      </article>

      <div className="mt-16">
        <ReadyToGetStarted />
      </div>
    </div>
  )
}
