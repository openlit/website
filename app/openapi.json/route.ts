import { buildOpenApiDocument } from 'lib/agent/openapi-document'

export const runtime = 'edge'

export function GET() {
  return Response.json(buildOpenApiDocument(), {
    headers: {
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'all',
    },
  })
}
