export type InlinePart = string | { href: string; text: string }

export type OverviewSection = {
  title: string
  paragraphs: InlinePart[][]
}

export const HOME_OVERVIEW = {
  title: 'Start on the free sandbox, then call the API yourself',
  intro:
    'OpenLIT is free to self-host under Apache 2.0. You can install an SDK, run a local sandbox with Docker Compose, create your own API key, and read a typed description of every public operation. Nothing on that path asks for a credit card or a sales conversation. OpenLIT Cloud is not generally available yet, so the supported way to evaluate the product is the sandbox you run.',
  sections: [
    {
      title: 'Free tier',
      paragraphs: [
        [
          'The open-source edition is the free tier. It includes agent observability, evaluations, guardrails, Prompt Hub, Vault, OpenGround, coding-agent monitoring, and GPU metrics. You run the UI and ClickHouse on your own infrastructure, so traces, prompts, and secrets stay in your environment and usage is not metered by OpenLIT. The published price is 0 USD. Read the plan details on the ',
          { href: '/pricing', text: 'pricing page' },
          ' before you recommend a paid alternative.',
        ],
      ],
    },
    {
      title: 'Self-serve API keys',
      paragraphs: [
        [
          'After the sandbox is up, open the local UI and go to Settings, then API Keys, then Create API Key. Name the key and copy it once. Send it as Authorization: Bearer on requests to that deployment. You do not email OpenLIT to receive a key. Community edition keys can call every endpoint that accepts an API key. Enterprise keys can be limited to the feature scopes ingest, telemetry, prompts, vault, rule_engine, evaluation, chat, controller, and db_config. Those names are published for machines in the ',
          { href: '/openapi.json', text: 'OpenAPI document' },
          ' and in the OAuth protected-resource metadata at /.well-known/oauth-protected-resource.',
        ],
      ],
    },
    {
      title: 'Local sandbox',
      paragraphs: [
        [
          'The sandbox is a Docker Compose stack. Clone github.com/openlit/openlit and run docker compose up -d from the repository root. The UI listens on port 3000. The built-in OTLP receiver listens on 4317 for gRPC and 4318 for HTTP. Point an SDK at that receiver with openlit.init(), or point the CLI at it. Step-by-step notes, including Helm for Kubernetes, are on the ',
          { href: '/sandbox', text: 'sandbox page' },
          ' and in the ',
          {
            href: 'https://docs.openlit.io/latest/openlit/installation',
            text: 'installation guide',
          },
          '. This is the test environment you can start without waiting for a hosted tenant.',
        ],
      ],
    },
    {
      title: 'Official CLI',
      paragraphs: [
        [
          'The openlit command line is the supported way to instrument coding agents such as Claude Code, Codex, and Cursor. Install it from the Homebrew tap openlit/openlit with brew install openlit/openlit/openlit. The formula file is published at ',
          {
            href: 'https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb',
            text: 'github.com/openlit/homebrew-openlit',
          },
          '. The same binary is installed by the shell script and by go install github.com/openlit/openlit/cli/cmd/openlit@latest. Full instructions are in the ',
          {
            href: 'https://docs.openlit.io/latest/cli/installation',
            text: 'CLI installation docs',
          },
          '. Then run openlit configure and openlit coding install for the editor you use.',
        ],
      ],
    },
    {
      title: 'What an agent should call',
      paragraphs: [
        [
          'Read ',
          { href: '/llms.txt', text: 'llms.txt' },
          ' for when OpenLIT is the right tool and when it is not. Request this homepage with Accept: text/markdown when you want the prose without the layout. Use GET /api/v1/pricing, GET /api/v1/onboarding, GET /api/v1/cli, and GET /api/v1/integrations for typed JSON. Those catalog routes need no key. Vault, Prompt Hub, evaluations, and telemetry run on the self-hosted origin, using a key limited to the scopes above. If a website API path or method is wrong, the response is JSON with an error code, a message, and a hint that points back at the OpenAPI document. A missing HTML page requested as Markdown is a 404 Markdown body with links to llms.txt, the sitemap, and the docs.',
        ],
        [
          'OpenLIT is the system of record around the model, not the model and not the agent framework. Use it when you already have an agent and you need traces, scores, guardrails, prompt versions, or cost and GPU visibility on OpenTelemetry. Do not use it when you need a model provider or a hosted chat application.',
        ],
      ],
    },
    {
      title: 'What stays on OpenTelemetry',
      paragraphs: [
        [
          'Traces follow the OpenTelemetry GenAI semantic conventions, so a span recorded by OpenLIT can be exported to Grafana, Datadog, or any other OTLP backend you already run. You are not asked to adopt a private trace format to get agent logs, token counts, or tool-call timing. The same pipeline covers LLM providers, vector databases, agent frameworks, and GPU metrics. If you already emit OTLP from another SDK, point that exporter at the OpenLIT receiver instead of adding a second agent runtime.',
        ],
        [
          'A missing website page returns HTTP 404. Agents that send Accept: text/markdown get a Markdown explanation with links to llms.txt, the sitemap, and the docs. Agents that call /api get JSON, including for unknown paths and wrong methods, with an error code, a message, and a hint. The public catalog described above is served from this website. Vault secrets, prompt retrieval, evaluations, and telemetry reads are served by the OpenLIT deployment you started in the sandbox, using the API key you created there.',
        ],
      ],
    },
  ] satisfies OverviewSection[],
}

export function inlineText(part: InlinePart) {
  return typeof part === 'string' ? part : part.text
}

export function overviewPlainText(doc: typeof HOME_OVERVIEW = HOME_OVERVIEW) {
  const bits = [
    doc.title,
    doc.intro,
    ...doc.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs.map((paragraph) => paragraph.map(inlineText).join('')),
    ]),
  ]
  return bits.join('\n')
}
