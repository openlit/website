import { handlePublicApi } from 'lib/agent/public-api'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'

export const runtime = 'edge'

function jsonResponse(status: number, body: unknown, extra?: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': status >= 400 ? 'no-store' : 'public, max-age=300',
      ...(status >= 400 ? { 'X-Robots-Tag': 'noindex' } : {}),
      ...extra,
    },
  })
}

async function dispatch(request: Request) {
  const url = new URL(request.url)
  const result = handlePublicApi({
    method: request.method,
    pathname: url.pathname,
    searchParams: url.searchParams,
    integrations: SUPPORTED_INTEGRATIONS.map((item) => ({
      name: item.name,
      type: item.type,
      link: item.link,
    })),
  })
  return jsonResponse(result.status, result.body, result.headers)
}

export const GET = dispatch
export const POST = dispatch
export const PUT = dispatch
export const PATCH = dispatch
export const DELETE = dispatch
export const HEAD = dispatch
export const OPTIONS = dispatch
