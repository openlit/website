import { PRICING_PLANS } from '../../constants/pricing'
import { OPENAPI_HINT, apiError } from './json-error'

export type PublicIntegration = {
  name: string
  type: string
  link: string
}

export type ApiResult = {
  status: number
  body: unknown
  headers?: Record<string, string>
}

const DOCS_ORIGIN = 'https://docs.openlit.io/'

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

function methodNotAllowed(allow: string): ApiResult {
  return {
    status: 405,
    headers: { Allow: allow },
    body: apiError('method_not_allowed', `This operation only allows ${allow}.`, OPENAPI_HINT),
  }
}

function notFound(pathname: string): ApiResult {
  return {
    status: 404,
    body: apiError(
      'not_found',
      `No API operation matches ${pathname}.`,
      'Check the path and method against https://openlit.io/openapi.json. Product routes such as Vault and Prompt Hub run on your self-hosted OpenLIT, not on openlit.io.'
    ),
  }
}

export function handlePublicApi(input: {
  method: string
  pathname: string
  searchParams: URLSearchParams
  integrations: PublicIntegration[]
}): ApiResult {
  const method = input.method.toUpperCase()
  const pathname = normalizePath(input.pathname)

  if (method === 'HEAD') {
    const result = handlePublicApi({ ...input, method: 'GET' })
    return result
  }

  const routes: Record<string, (method: string) => ApiResult> = {
    '/api/v1/pricing': (verb) => {
      if (verb !== 'GET') return methodNotAllowed('GET')
      return { status: 200, body: pricingBody() }
    },
    '/api/v1/onboarding': (verb) => {
      if (verb !== 'GET') return methodNotAllowed('GET')
      return { status: 200, body: onboardingBody() }
    },
    '/api/v1/cli': (verb) => {
      if (verb !== 'GET') return methodNotAllowed('GET')
      return { status: 200, body: cliBody() }
    },
    '/api/v1/health': (verb) => {
      if (verb !== 'GET') return methodNotAllowed('GET')
      return { status: 200, body: { status: 'ok', service: 'openlit-website' } }
    },
    '/api/v1/integrations': (verb) => {
      if (verb !== 'GET') return methodNotAllowed('GET')
      return integrationsBody(input.searchParams, input.integrations)
    },
  }

  const handler = routes[pathname]
  if (!handler) return notFound(pathname)
  return handler(method)
}

function pricingBody() {
  return {
    oss: {
      name: PRICING_PLANS.oss.name,
      price: '0',
      currency: 'USD',
      license: 'Apache-2.0',
      self_serve: true,
      summary: PRICING_PLANS.oss.summary,
      url: 'https://openlit.io/pricing',
    },
    cloud: {
      name: PRICING_PLANS.cloud.name,
      availability: 'coming_soon',
      self_serve: false,
      summary: PRICING_PLANS.cloud.summary,
      url: 'https://openlit.io/pricing',
    },
  }
}

function onboardingBody() {
  return {
    free_tier: {
      available: true,
      price: '0',
      currency: 'USD',
      url: 'https://openlit.io/pricing',
    },
    api_keys: {
      self_serve: true,
      method:
        'Self-host OpenLIT, open Settings → API Keys, and create a key. No sales request. Enterprise keys can be limited to ingest, telemetry, prompts, vault, rule_engine, evaluation, chat, controller, and db_config.',
      docs: 'https://docs.openlit.io/latest/openlit/developer-resources/api-reference/introduction',
    },
    sandbox: {
      available: true,
      url: 'https://openlit.io/sandbox',
      type: 'local-docker',
      quickstart: 'https://docs.openlit.io/latest/openlit/installation',
    },
  }
}

function cliBody() {
  return {
    name: 'openlit',
    homebrew: {
      tap: 'openlit/openlit',
      formula: 'openlit',
      install: 'brew install openlit/openlit/openlit',
      formula_url: 'https://github.com/openlit/homebrew-openlit/blob/main/Formula/openlit.rb',
    },
    docs: 'https://docs.openlit.io/latest/cli/installation',
    go_install: 'go install github.com/openlit/openlit/cli/cmd/openlit@latest',
  }
}

function integrationsBody(
  searchParams: URLSearchParams,
  integrations: PublicIntegration[]
): ApiResult {
  const type = searchParams.get('type')
  const types = [...new Set(integrations.map((item) => item.type))].sort()
  if (type && !types.includes(type)) {
    return {
      status: 400,
      body: apiError(
        'invalid_parameter',
        `Unknown integration type "${type}".`,
        `Use one of: ${types.join(', ')}. ${OPENAPI_HINT}`
      ),
    }
  }

  const selected = type ? integrations.filter((item) => item.type === type) : integrations
  return {
    status: 200,
    body: {
      integrations: selected.map((item) => ({
        name: item.name,
        type: item.type,
        docs_url: item.link.startsWith('http') ? item.link : `${DOCS_ORIGIN}${item.link}`,
      })),
    },
  }
}
