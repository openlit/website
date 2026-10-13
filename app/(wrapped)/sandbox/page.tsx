import { genPageMetadata } from 'app/seo'
import { createJsonLdGraph, createWebPageSchema } from '@/components/structuredData'
import JsonLd from '@/components/json-ld'

export const metadata = genPageMetadata({
  title: 'OpenLIT Local Sandbox',
  description:
    'Run the free OpenLIT sandbox with Docker Compose. Create your own API key in the local UI. No credit card and no sales form.',
  canonicalUrl: 'https://openlit.io/sandbox',
  markdownUrl: 'https://openlit.io/sandbox.md',
})

const pageSchema = createWebPageSchema(
  'OpenLIT local sandbox',
  'https://openlit.io/sandbox',
  'Free Docker Compose sandbox for OpenLIT with self-serve API keys.',
  [
    { name: 'Home', url: 'https://openlit.io' },
    { name: 'Sandbox', url: 'https://openlit.io/sandbox' },
  ]
)

export const runtime = 'edge'

export default function SandboxPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <JsonLd data={createJsonLdGraph([pageSchema])} />
      <article className="max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">Local sandbox</h1>
        <p className="mb-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
          The OpenLIT sandbox is the self-hosted stack running on your machine. It is free under
          Apache 2.0. There is no credit card, no license key, and no sales form. OpenLIT Cloud is
          not generally available, so this is the test environment you can start today.
        </p>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Start Docker Compose</h2>
          <p className="mb-4 leading-relaxed">
            You need Docker and Docker Compose. Clone the public repository and start the stack from
            the repository root. The OpenLIT container serves the UI on port 3000 and the built-in
            OTLP receiver on 4317 (gRPC) and 4318 (HTTP). ClickHouse stores traces, metrics, and
            logs. Prompts and secrets stay on your computer.
          </p>
          <pre className="mb-4 overflow-x-auto rounded-md bg-stone-100 p-4 text-sm dark:bg-stone-900">
            <code>{`git clone https://github.com/openlit/openlit.git
cd openlit
docker compose up -d`}</code>
          </pre>
          <p className="mb-4 leading-relaxed">
            On Kubernetes, add the Helm repository at https://openlit.github.io/helm/ and run{' '}
            <code>helm install openlit openlit/openlit</code>. The full guide is in the{' '}
            <a
              href="https://docs.openlit.io/latest/openlit/installation"
              className="text-primary-500 underline"
            >
              installation documentation
            </a>
            .
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Create an API key yourself</h2>
          <p className="mb-4 leading-relaxed">
            Open http://localhost:3000 after Compose is healthy. Go to Settings, then API Keys, then
            Create API Key. Name the key and store the value. Send it as{' '}
            <code>Authorization: Bearer</code> on requests to that deployment. Community edition
            keys can call the endpoints that accept an API key. The scope names to request are
            ingest, telemetry, prompts, vault, rule_engine, evaluation, chat, controller, and
            db_config. Machines can read that list from{' '}
            <a href="/openapi.json" className="text-primary-500 underline">
              /openapi.json
            </a>
            .
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Install the CLI and send a trace</h2>
          <p className="mb-4 leading-relaxed">
            The official CLI is the Homebrew formula on the openlit/openlit tap. The formula file is
            published at{' '}
            <a
              href="https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb"
              className="text-primary-500 underline"
            >
              github.com/openlit/homebrew-openlit
            </a>
            . Install notes for Linux, Windows, and Go are in the{' '}
            <a
              href="https://docs.openlit.io/latest/cli/installation"
              className="text-primary-500 underline"
            >
              CLI documentation
            </a>
            .
          </p>
          <pre className="mb-4 overflow-x-auto rounded-md bg-stone-100 p-4 text-sm dark:bg-stone-900">
            <code>{`brew install openlit/openlit/openlit
openlit configure --endpoint http://127.0.0.1:4318`}</code>
          </pre>
          <p className="leading-relaxed">
            Python, TypeScript, and Go agents can call <code>openlit.init()</code> against the same
            receiver. When you are done evaluating, the same Apache 2.0 build is what you run in
            production. Pricing for the hosted Cloud plan is not published yet because Cloud has not
            launched. The OSS sandbox remains free.
          </p>
        </section>
      </article>
    </div>
  )
}
