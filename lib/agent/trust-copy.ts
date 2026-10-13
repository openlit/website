export const CONTACT_MARKDOWN = `# Contact OpenLIT

> Email contact@openlit.io. Headquarters: New Delhi, Delhi, India. No phone line is published.

- HTML: https://openlit.io/contact
- Email: contact@openlit.io
- Security: https://github.com/openlit/openlit/blob/main/SECURITY.md
- Docs: https://docs.openlit.io/latest/overview

OpenLIT is an open-source agent harness engineering platform built in public. The company is headquartered in New Delhi, India. For product questions, documentation gaps, partnership notes, or press, email contact@openlit.io. That inbox is monitored by the people who maintain the project. You do not need to book a sales call to try the software.

## What to include

Tell us what you are trying to do with agents, which SDK or coding agent you use, and whether you are self-hosting. If something is broken, include the OpenLIT version, the deployment method (Docker Compose or Helm), and a short trace or log excerpt with secrets removed.

## Security

Report vulnerabilities through the process in the GitHub security policy rather than a public issue. Please avoid posting live API keys, Vault secrets, or customer prompts in email.

## Self-serve instead of email

You can start without contacting us. The OSS edition is free under Apache 2.0. The local sandbox is documented at https://openlit.io/sandbox. API keys are created in your own OpenLIT UI under Settings → API Keys. Pricing is at https://openlit.io/pricing. The CLI install is at https://docs.openlit.io/latest/cli/installation.

## Other channels

- GitHub: https://github.com/openlit/openlit
- Discord: https://discord.com/invite/RbNPvG54
- LinkedIn: https://www.linkedin.com/company/openlit/
`

export const PRIVACY_MARKDOWN = `# Privacy Policy

> How OpenLIT handles information on openlit.io. Self-hosted OpenLIT does not send your traces to us.

- HTML: https://openlit.io/privacy
- Canonical policy: https://openlit.io/privacy-policy
- Contact: contact@openlit.io
- Last updated: March 9, 2025

OpenLIT operates the website https://openlit.io. This policy explains what the website collects and what the open-source software does not collect.

The website uses Google Analytics (GA4) for aggregated usage data such as pages visited, time on site, and region. That data is not used to identify a named person. If you email contact@openlit.io, we keep the address and the message so we can reply. A functional \`theme\` cookie remembers light or dark mode. Analytics cookies come from Google Analytics and can be blocked in the browser.

Self-hosted OpenLIT runs on your infrastructure. We do not receive, store, or inspect the prompts, traces, evaluations, or Vault secrets processed by your installation. Those stay in the ClickHouse database you operate.

We use website data to understand which pages help visitors, to answer email, and to keep the site reliable. Google Analytics retention follows Google's default window. Email is kept while we need it to finish the conversation.

To access, correct, or delete personal data related to the website, email contact@openlit.io. The full HTML policy, including third-party services and changes to this notice, is at https://openlit.io/privacy-policy.
`

export const SANDBOX_MARKDOWN = `# OpenLIT local sandbox

> Free Docker Compose sandbox for OpenLIT. Create your own API key in the local UI. No credit card and no sales form.

- HTML: https://openlit.io/sandbox
- Install docs: https://docs.openlit.io/latest/openlit/installation
- Repository: https://github.com/openlit/openlit
- CLI: https://docs.openlit.io/latest/cli/installation

The sandbox is the self-hosted OpenLIT stack running on your machine. It is the test environment agents and developers can start immediately. OpenLIT Cloud is not generally available, so there is no shared hosted tenant to sign into on openlit.io.

## Start it

Clone the repository and start Compose from the repository root:

\`\`\`shell
git clone https://github.com/openlit/openlit.git
cd openlit
docker compose up -d
\`\`\`

The OpenLIT container serves the UI on port 3000 and the built-in OTLP receiver on 4317 (gRPC) and 4318 (HTTP). ClickHouse is included for traces, metrics, and logs. You need Docker and Docker Compose. On Kubernetes, the same stack is installed with \`helm install openlit openlit/openlit\` after adding the Helm repo at https://openlit.github.io/helm/.

## API keys

Open http://localhost:3000, then go to Settings → API Keys → Create API Key. Name the key and store it. Send it as \`Authorization: Bearer\`. Community edition keys can call the API-key endpoints. The scope names an agent should request are \`ingest\`, \`telemetry\`, \`prompts\`, \`vault\`, \`rule_engine\`, \`evaluation\`, \`chat\`, \`controller\`, and \`db_config\`, published at https://openlit.io/openapi.json.

## Instrument

Point an SDK at the sandbox with \`openlit.init()\`, or point the CLI at the receiver:

\`\`\`shell
brew install openlit/openlit/openlit
openlit configure --endpoint http://127.0.0.1:4318
\`\`\`

The Homebrew formula is https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb.

This sandbox is free under Apache 2.0. Usage limits are whatever your machine can store. Prompts and traces stay on your computer.
`

export function plainLength(markdown: string) {
  return markdown.replace(/\s+/g, ' ').trim().length
}
