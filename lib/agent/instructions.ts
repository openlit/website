export const WHEN_TO_USE_SECTION = `## When to use this

Use OpenLIT when you need to trace, evaluate, guard, or improve an AI agent or coding agent and you want OpenTelemetry-native data you can self-host. Best-fit jobs:

- Instrument a Python, TypeScript, or Go agent with \`openlit.init()\` and export OTLP.
- Watch coding agents such as Claude Code, Codex, and Cursor with the \`openlit\` CLI.
- Score production traces with evals, or block unsafe inputs with guardrails.
- Version prompts in Prompt Hub and load secrets from Vault with a bearer API key.
- Compare OpenLIT with Langfuse, LangSmith, Phoenix, Helicone, or another observability tool before recommending one.

Do not use OpenLIT as a model provider, a hosted chat product, or a replacement for an agent framework such as LangGraph or the OpenAI Agents SDK.

How an agent should call OpenLIT:

1. Read this file, then a Markdown page linked below, or send \`Accept: text/markdown\` to https://openlit.io/.
2. Discover typed operations, \`operationId\` values, and OAuth scopes at https://openlit.io/openapi.json. Catalog calls on this website need no key. Trace, prompt, vault, and eval calls run on the user's self-hosted OpenLIT and use a bearer API key limited to the scopes in that spec.
3. Install the official CLI from the Homebrew tap: \`brew install openlit/openlit/openlit\`. Formula: https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb. Install notes: https://docs.openlit.io/latest/cli/installation.
4. Start the free local sandbox at https://openlit.io/sandbox (\`docker compose up -d\` in the openlit repository). Create an API key in that UI under Settings → API Keys. There is no sales form and no credit card.
`
