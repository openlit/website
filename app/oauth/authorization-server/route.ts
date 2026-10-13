import { authorizationServerMetadata } from 'lib/agent/oauth-metadata'

export const runtime = 'edge'

export function GET() {
  return Response.json(authorizationServerMetadata(), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
