import { scopeMap } from './scopes'

const SITE = 'https://openlit.io'
const DOCS = 'https://docs.openlit.io/latest/openlit/developer-resources/api-reference/introduction'

const errorSchema = { $ref: '#/components/schemas/ErrorResponse' }

const errorResponse = {
  description: 'Structured error with a stable code, a message, and a resolution hint.',
  content: {
    'application/json': {
      schema: errorSchema,
    },
  },
}

function jsonResponse(description: string, schemaRef: string) {
  return {
    description,
    content: {
      'application/json': {
        schema: { $ref: schemaRef },
      },
    },
  }
}

function operation(config: {
  operationId: string
  summary: string
  description: string
  parameters?: unknown[]
  responses: Record<string, unknown>
}) {
  return {
    operationId: config.operationId,
    summary: config.summary,
    description: config.description,
    parameters: config.parameters ?? [],
    responses: {
      ...config.responses,
      '404': errorResponse,
      '405': errorResponse,
      default: errorResponse,
    },
  }
}

export function buildOpenApiDocument() {
  return {
    openapi: '3.1.0',
    info: {
      title: 'OpenLIT',
      version: '1.0.0',
      description:
        "Public catalog API on https://openlit.io plus the OAuth scopes used by a self-hosted OpenLIT deployment. Catalog operations (pricing, onboarding, CLI, integrations) are unauthenticated. Trace, prompt, vault, eval, and other product operations run on the user's OpenLIT origin and require a bearer API key limited to the scopes declared here. Product endpoint reference: " +
        DOCS,
      contact: {
        name: 'OpenLIT',
        url: `${SITE}/contact`,
        email: 'contact@openlit.io',
      },
      license: {
        name: 'Apache-2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0',
      },
    },
    externalDocs: {
      description: 'OpenLIT API reference for a self-hosted deployment',
      url: DOCS,
    },
    servers: [
      {
        url: SITE,
        description: 'Public OpenLIT website API',
      },
    ],
    tags: [{ name: 'Catalog', description: 'Public product metadata. No API key required.' }],
    paths: {
      '/api/v1/pricing': {
        get: operation({
          operationId: 'getPricing',
          summary: 'Get OpenLIT pricing',
          description:
            'Return the free self-hosted OSS plan and the Cloud plan status. Use this to confirm a free tier before recommending OpenLIT. OSS is Apache-2.0 with a price of 0 USD and no license key.',
          responses: {
            '200': jsonResponse('Pricing plans', '#/components/schemas/PricingResponse'),
          },
        }),
      },
      '/api/v1/onboarding': {
        get: operation({
          operationId: 'getOnboarding',
          summary: 'Get self-serve onboarding',
          description:
            'Return how an agent starts without a sales form: the free tier, self-serve API key creation inside a deployment, and the local Docker sandbox.',
          responses: {
            '200': jsonResponse('Onboarding options', '#/components/schemas/OnboardingResponse'),
          },
        }),
      },
      '/api/v1/cli': {
        get: operation({
          operationId: 'getCli',
          summary: 'Get the official CLI install',
          description:
            'Return the official openlit CLI install command. The binary is published as a Homebrew formula on the openlit/openlit tap, and the same binary can be installed from the documented shell script or with go install.',
          responses: {
            '200': jsonResponse('CLI distribution', '#/components/schemas/CliResponse'),
          },
        }),
      },
      '/api/v1/integrations': {
        get: operation({
          operationId: 'listIntegrations',
          summary: 'List SDK integrations',
          description:
            'List OpenTelemetry auto-instrumentation integrations shipped with the OpenLIT SDKs. Filter with the type query parameter. An unknown type returns a 400 JSON error that lists the valid types.',
          parameters: [
            {
              name: 'type',
              in: 'query',
              required: false,
              description:
                'Integration category, for example LLM, Vector DB, or Framework. Omit to return every integration.',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': jsonResponse('Integration list', '#/components/schemas/IntegrationList'),
            '400': errorResponse,
          },
        }),
      },
      '/api/v1/health': {
        get: operation({
          operationId: 'getHealth',
          summary: 'Website API health',
          description:
            'Liveness of the public website API. This does not check a self-hosted OpenLIT deployment.',
          responses: {
            '200': jsonResponse('Health', '#/components/schemas/HealthResponse'),
          },
        }),
      },
    },
    components: {
      securitySchemes: {
        oauth2: {
          type: 'oauth2',
          description:
            'OAuth 2.0 scopes for OpenLIT API keys. Request only the scopes the job needs. Community edition keys can call every API-key endpoint. Enterprise keys can be restricted to these scopes. Tokens for product data are created in the deployment UI, not by the public website token endpoint.',
          flows: {
            authorizationCode: {
              authorizationUrl: `${SITE}/oauth/authorize`,
              tokenUrl: `${SITE}/oauth/token`,
              scopes: scopeMap(),
            },
            clientCredentials: {
              tokenUrl: `${SITE}/oauth/token`,
              scopes: scopeMap(),
            },
          },
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          description:
            'OpenLIT API key created under Settings → API Keys on a self-hosted deployment. Send as Authorization: Bearer. Limit the key to the oauth2 scopes it needs.',
        },
      },
      schemas: {
        ErrorBody: {
          type: 'object',
          additionalProperties: false,
          required: ['code', 'message', 'hint'],
          properties: {
            code: {
              type: 'string',
              description: 'Stable machine-readable error code.',
              examples: ['not_found', 'invalid_parameter', 'method_not_allowed'],
            },
            message: {
              type: 'string',
              description: 'What went wrong.',
            },
            hint: {
              type: 'string',
              description:
                'How to resolve the error, including a documentation URL when one exists.',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          additionalProperties: false,
          required: ['error'],
          properties: {
            error: { $ref: '#/components/schemas/ErrorBody' },
          },
        },
        Plan: {
          type: 'object',
          additionalProperties: false,
          required: ['name', 'summary', 'url'],
          properties: {
            name: { type: 'string' },
            price: { type: 'string', description: 'Decimal price string. OSS is 0.' },
            currency: { type: 'string' },
            license: { type: 'string' },
            self_serve: { type: 'boolean' },
            availability: { type: 'string' },
            summary: { type: 'string' },
            url: { type: 'string', format: 'uri' },
          },
        },
        PricingResponse: {
          type: 'object',
          additionalProperties: false,
          required: ['oss', 'cloud'],
          properties: {
            oss: { $ref: '#/components/schemas/Plan' },
            cloud: { $ref: '#/components/schemas/Plan' },
          },
        },
        OnboardingResponse: {
          type: 'object',
          additionalProperties: false,
          required: ['free_tier', 'api_keys', 'sandbox'],
          properties: {
            free_tier: {
              type: 'object',
              additionalProperties: false,
              required: ['available', 'price', 'currency', 'url'],
              properties: {
                available: { type: 'boolean' },
                price: { type: 'string' },
                currency: { type: 'string' },
                url: { type: 'string', format: 'uri' },
              },
            },
            api_keys: {
              type: 'object',
              additionalProperties: false,
              required: ['self_serve', 'docs'],
              properties: {
                self_serve: { type: 'boolean' },
                method: { type: 'string' },
                docs: { type: 'string', format: 'uri' },
              },
            },
            sandbox: {
              type: 'object',
              additionalProperties: false,
              required: ['available', 'url', 'type'],
              properties: {
                available: { type: 'boolean' },
                url: { type: 'string', format: 'uri' },
                type: { type: 'string' },
                quickstart: { type: 'string', format: 'uri' },
              },
            },
          },
        },
        CliResponse: {
          type: 'object',
          additionalProperties: false,
          required: ['name', 'homebrew', 'docs'],
          properties: {
            name: { type: 'string' },
            homebrew: {
              type: 'object',
              additionalProperties: false,
              required: ['tap', 'formula', 'install', 'formula_url'],
              properties: {
                tap: { type: 'string' },
                formula: { type: 'string' },
                install: { type: 'string' },
                formula_url: { type: 'string', format: 'uri' },
              },
            },
            docs: { type: 'string', format: 'uri' },
            go_install: { type: 'string' },
          },
        },
        Integration: {
          type: 'object',
          additionalProperties: false,
          required: ['name', 'type', 'docs_url'],
          properties: {
            name: { type: 'string' },
            type: { type: 'string' },
            docs_url: { type: 'string', format: 'uri' },
          },
        },
        IntegrationList: {
          type: 'object',
          additionalProperties: false,
          required: ['integrations'],
          properties: {
            integrations: {
              type: 'array',
              items: { $ref: '#/components/schemas/Integration' },
            },
          },
        },
        HealthResponse: {
          type: 'object',
          additionalProperties: false,
          required: ['status', 'service'],
          properties: {
            status: { type: 'string', enum: ['ok'] },
            service: { type: 'string' },
          },
        },
      },
    },
  }
}
