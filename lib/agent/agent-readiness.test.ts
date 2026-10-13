import assert from 'node:assert/strict'
import test from 'node:test'
import { prefersMarkdown } from './accept.ts'
import { WHEN_TO_USE_SECTION } from './instructions.ts'
import { apiError } from './json-error.ts'
import { markdownNotFoundBody } from './not-found-markdown.ts'
import { decideNegotiation, isHtmlOnlyPath, isMachinePath } from './negotiate.ts'
import { buildOpenApiDocument } from './openapi-document.ts'
import { ORGANIZATION_ADDRESS, ORGANIZATION_CONTACT } from './organization.ts'
import { authorizationServerMetadata, protectedResourceMetadata } from './oauth-metadata.ts'
import { authorizeResult, tokenResult } from './oauth-handlers.ts'
import { handlePublicApi } from './public-api.ts'
import { scopeNames } from './scopes.ts'
import { CONTACT_MARKDOWN, PRIVACY_MARKDOWN, SANDBOX_MARKDOWN, plainLength } from './trust-copy.ts'
import { HOME_OVERVIEW, overviewPlainText } from '../../constants/home-overview.ts'

const integrations = [
  { name: 'Openai', type: 'LLM', link: 'latest/sdk/integrations/openai' },
  { name: 'Pinecone', type: 'VectorDB', link: 'latest/sdk/integrations/pinecone' },
]

test('markdown is preferred only when it outranks HTML', () => {
  assert.equal(prefersMarkdown('text/markdown'), true)
  assert.equal(prefersMarkdown('text/markdown, text/html;q=0.9'), true)
  assert.equal(prefersMarkdown('text/html'), false)
  assert.equal(
    prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
    false
  )
  assert.equal(prefersMarkdown('*/*'), false)
  assert.equal(prefersMarkdown('text/html;q=0.9, text/markdown;q=0.1'), false)
  assert.equal(prefersMarkdown(null), false)
})

test('markdown 404 explains the miss and links an index', () => {
  const body = markdownNotFoundBody('/__ora-404-probe-azdw5gp8')
  assert.ok(body.length >= 20)
  assert.match(body, /__ora-404-probe-azdw5gp8/)
  assert.match(body, /https:\/\/openlit\.io\/llms\.txt/)
  assert.match(body, /https:\/\/openlit\.io\/sitemap\.xml/)
  assert.match(body, /https:\/\/docs\.openlit\.io/)
})

test('homepage markdown negotiation leaves HTML and machine routes alone', () => {
  assert.equal(
    decideNegotiation({ pathname: '/', wantsMarkdown: true, hasMarkdown: true }),
    'markdown'
  )
  assert.equal(
    decideNegotiation({ pathname: '/', wantsMarkdown: false, hasMarkdown: true }),
    'next'
  )
  assert.equal(
    decideNegotiation({
      pathname: '/__ora-404-probe-azdw5gp8',
      wantsMarkdown: true,
      hasMarkdown: false,
    }),
    'not-found'
  )
  assert.equal(
    decideNegotiation({
      pathname: '/blogs/langfuse-alternatives',
      wantsMarkdown: true,
      hasMarkdown: false,
    }),
    'next'
  )
  assert.equal(isHtmlOnlyPath('/terms'), true)
  assert.equal(isMachinePath('/api/v1/pricing'), true)
  assert.equal(isMachinePath('/.well-known/oauth-authorization-server'), true)
  assert.equal(
    decideNegotiation({ pathname: '/openapi.json', wantsMarkdown: true, hasMarkdown: false }),
    'next'
  )
})

test('API errors are structured JSON with a resolution hint', () => {
  const missing = handlePublicApi({
    method: 'GET',
    pathname: '/api/does-not-exist',
    searchParams: new URLSearchParams(),
    integrations,
  })
  assert.equal(missing.status, 404)
  const body = missing.body as ReturnType<typeof apiError>
  assert.equal(body.error.code, 'not_found')
  assert.ok(body.error.message.length >= 20)
  assert.match(body.error.hint, /openapi\.json/)

  const wrongMethod = handlePublicApi({
    method: 'POST',
    pathname: '/api/v1/pricing',
    searchParams: new URLSearchParams(),
    integrations,
  })
  assert.equal(wrongMethod.status, 405)
  assert.equal((wrongMethod.body as ReturnType<typeof apiError>).error.code, 'method_not_allowed')
  assert.equal(wrongMethod.headers?.Allow, 'GET')

  const badType = handlePublicApi({
    method: 'GET',
    pathname: '/api/v1/integrations',
    searchParams: new URLSearchParams({ type: 'nope' }),
    integrations,
  })
  assert.equal(badType.status, 400)
  assert.equal((badType.body as ReturnType<typeof apiError>).error.code, 'invalid_parameter')
})

test('public catalog operations match the OpenAPI document', () => {
  const spec = buildOpenApiDocument()
  const ids = new Set<string>()
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(item as Record<string, unknown>)) {
      if (method !== 'get' && method !== 'post' && method !== 'put' && method !== 'delete') continue
      const op = operation as {
        operationId: string
        description: string
        summary: string
        parameters: { name: string; schema: { type: string }; description: string }[]
        responses: Record<string, { content?: { 'application/json'?: { schema: unknown } } }>
      }
      assert.ok(op.operationId)
      assert.equal(ids.has(op.operationId), false)
      ids.add(op.operationId)
      assert.ok(op.description.length >= 20)
      assert.ok(op.summary.length > 0)
      for (const parameter of op.parameters) {
        assert.equal(typeof parameter.schema.type, 'string')
        assert.ok(parameter.description.length > 0)
      }
      assert.ok(op.responses['200'].content?.['application/json']?.schema)
      const live = handlePublicApi({
        method: method.toUpperCase(),
        pathname: path,
        searchParams: new URLSearchParams(),
        integrations,
      })
      assert.equal(live.status, 200, path)
    }
  }

  const scopes = spec.components.securitySchemes.oauth2.flows.clientCredentials.scopes
  for (const name of scopeNames()) {
    assert.equal(typeof scopes[name], 'string')
    assert.ok(scopes[name].length > 0)
  }
})

test('OAuth metadata publishes scopes and the required endpoints', () => {
  const metadata = authorizationServerMetadata()
  assert.equal(metadata.issuer, 'https://openlit.io')
  assert.match(metadata.authorization_endpoint, /\/oauth\/authorize$/)
  assert.match(metadata.token_endpoint, /\/oauth\/token$/)
  assert.ok(metadata.response_types_supported.includes('code'))
  assert.deepEqual(metadata.scopes_supported, scopeNames())

  const resource = protectedResourceMetadata()
  assert.equal(resource.resource, 'https://openlit.io')
  assert.deepEqual(resource.authorization_servers, ['https://openlit.io'])
  assert.deepEqual(resource.scopes_supported, scopeNames())
  assert.ok(resource.bearer_methods_supported.includes('header'))

  const incomplete = authorizeResult(new URL('https://openlit.io/oauth/authorize'))
  assert.equal(incomplete.status, 400)
  assert.equal(incomplete.body.error, 'invalid_request')
  assert.match(incomplete.body.hint, /API key/)

  const token = tokenResult(new URLSearchParams())
  assert.equal(token.status, 400)
  assert.equal(token.body.error, 'invalid_request')
})

test('llms.txt instructions name jobs and how to call OpenLIT', () => {
  assert.match(WHEN_TO_USE_SECTION, /## When to use this/)
  assert.match(WHEN_TO_USE_SECTION, /openlit\.init/)
  assert.match(WHEN_TO_USE_SECTION, /brew install openlit\/openlit\/openlit/)
  assert.match(WHEN_TO_USE_SECTION, /openapi\.json/)
  assert.match(WHEN_TO_USE_SECTION, /Do not use OpenLIT/)
})

test('organization schema includes a postal address and a contact point', () => {
  assert.equal(ORGANIZATION_ADDRESS['@type'], 'PostalAddress')
  assert.equal(ORGANIZATION_ADDRESS.addressLocality, 'New Delhi')
  assert.equal(ORGANIZATION_ADDRESS.addressCountry, 'IN')
  assert.equal(ORGANIZATION_CONTACT['@type'], 'ContactPoint')
  assert.equal(ORGANIZATION_CONTACT.email, 'contact@openlit.io')
  assert.equal(ORGANIZATION_CONTACT.contactType, 'customer support')
})

test('trust pages and the homepage overview are long enough for agents', () => {
  assert.ok(plainLength(CONTACT_MARKDOWN) >= 500)
  assert.ok(plainLength(PRIVACY_MARKDOWN) >= 500)
  assert.ok(plainLength(SANDBOX_MARKDOWN) >= 500)
  assert.match(CONTACT_MARKDOWN, /contact@openlit\.io/)
  assert.match(SANDBOX_MARKDOWN, /docker compose up -d/)
  assert.match(SANDBOX_MARKDOWN, /Settings → API Keys/)
  const overview = overviewPlainText()
  assert.ok(overview.length >= 3000, `overview length ${overview.length}`)
  assert.equal(HOME_OVERVIEW.sections[0].title.length > 0, true)
})

test('onboarding and CLI payloads are self-serve', () => {
  const onboarding = handlePublicApi({
    method: 'GET',
    pathname: '/api/v1/onboarding',
    searchParams: new URLSearchParams(),
    integrations,
  }).body as {
    free_tier: { available: boolean; price: string }
    api_keys: { self_serve: boolean }
    sandbox: { available: boolean; url: string }
  }
  assert.equal(onboarding.free_tier.available, true)
  assert.equal(onboarding.free_tier.price, '0')
  assert.equal(onboarding.api_keys.self_serve, true)
  assert.equal(onboarding.sandbox.available, true)
  assert.match(onboarding.sandbox.url, /\/sandbox$/)

  const cli = handlePublicApi({
    method: 'GET',
    pathname: '/api/v1/cli',
    searchParams: new URLSearchParams(),
    integrations,
  }).body as { homebrew: { install: string; formula_url: string } }
  assert.match(cli.homebrew.install, /^brew install /)
  assert.match(cli.homebrew.formula_url, /homebrew-openlit/)
})
