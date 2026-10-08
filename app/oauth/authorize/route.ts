import { authorizeResult } from 'lib/agent/oauth-handlers'
import { apiError } from 'lib/agent/json-error'

export const runtime = 'edge'

function json(status: number, body: unknown, extra?: Record<string, string>) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
      ...extra,
    },
  })
}

export function GET(request: Request) {
  const result = authorizeResult(new URL(request.url))
  return json(result.status, result.body)
}

export function POST() {
  return json(
    405,
    apiError(
      'method_not_allowed',
      'The authorization endpoint accepts GET.',
      'Send response_type, client_id, and redirect_uri as query parameters. Metadata: https://openlit.io/.well-known/oauth-authorization-server'
    ),
    { Allow: 'GET' }
  )
}
