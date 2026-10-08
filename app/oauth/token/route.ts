import { tokenResult } from 'lib/agent/oauth-handlers'
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

async function readParams(request: Request) {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
    if (!body || typeof body !== 'object') {
      return {
        error: apiError(
          'invalid_request',
          'The token request body could not be parsed as JSON.',
          'Send grant_type as application/x-www-form-urlencoded or as a JSON object. Metadata: https://openlit.io/.well-known/oauth-authorization-server'
        ),
      }
    }
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') params.set(key, value)
    }
    return { params }
  }

  const text = await request.text()
  return { params: new URLSearchParams(text) }
}

export async function POST(request: Request) {
  const parsed = await readParams(request)
  if ('error' in parsed && parsed.error) return json(400, parsed.error)
  const result = tokenResult(parsed.params)
  return json(result.status, result.body)
}

export function GET() {
  return json(
    405,
    apiError(
      'method_not_allowed',
      'The token endpoint accepts POST.',
      'POST grant_type to https://openlit.io/oauth/token. Metadata: https://openlit.io/.well-known/oauth-authorization-server'
    ),
    { Allow: 'POST' }
  )
}
