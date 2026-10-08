import { scopeNames } from './scopes'

const SCOPES = scopeNames().join(', ')
const KEY_HINT =
  'Create a least-privilege API key in your self-hosted OpenLIT under Settings → API Keys. The free local sandbox is https://openlit.io/sandbox. Scope names: ' +
  SCOPES +
  '. Machine-readable list: https://openlit.io/openapi.json'

export function authorizeResult(url: URL): { status: number; body: Record<string, string> } {
  const responseType = url.searchParams.get('response_type')
  const clientId = url.searchParams.get('client_id')
  const redirectUri = url.searchParams.get('redirect_uri')

  if (!responseType || !clientId || !redirectUri) {
    return {
      status: 400,
      body: {
        error: 'invalid_request',
        error_description:
          'Authorization requests require response_type, client_id, and redirect_uri.',
        hint: `Read https://openlit.io/.well-known/oauth-authorization-server. ${KEY_HINT}`,
      },
    }
  }

  if (responseType !== 'code') {
    return {
      status: 400,
      body: {
        error: 'unsupported_response_type',
        error_description: 'Only response_type=code is supported.',
        hint: KEY_HINT,
      },
    }
  }

  const requested = url.searchParams.get('scope')
  if (requested) {
    const unknown = requested.split(/\s+/).filter((scope) => scope && !scopeNames().includes(scope))
    if (unknown.length > 0) {
      return {
        status: 400,
        body: {
          error: 'invalid_scope',
          error_description: `Unknown scope: ${unknown.join(', ')}.`,
          hint: `Supported scopes: ${SCOPES}.`,
        },
      }
    }
  }

  return {
    status: 401,
    body: {
      error: 'unauthorized_client',
      error_description:
        'openlit.io publishes OAuth scopes and metadata for agents. It does not sign users in or mint product access tokens. API keys are created inside your OpenLIT deployment.',
      hint: KEY_HINT,
    },
  }
}

export function tokenResult(params: URLSearchParams): {
  status: number
  body: Record<string, string>
} {
  const grant = params.get('grant_type')
  if (!grant) {
    return {
      status: 400,
      body: {
        error: 'invalid_request',
        error_description: 'grant_type is required.',
        hint: 'Use authorization_code or client_credentials. ' + KEY_HINT,
      },
    }
  }

  if (grant !== 'authorization_code' && grant !== 'client_credentials') {
    return {
      status: 400,
      body: {
        error: 'unsupported_grant_type',
        error_description: `grant_type ${grant} is not supported.`,
        hint: 'Supported grant types: authorization_code, client_credentials.',
      },
    }
  }

  return {
    status: 401,
    body: {
      error: 'invalid_client',
      error_description:
        'This website does not mint product access tokens. Create an API key in your OpenLIT deployment and send it as Authorization: Bearer.',
      hint: KEY_HINT,
    },
  }
}
