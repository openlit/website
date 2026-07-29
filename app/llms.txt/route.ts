import { buildLlmsTxt } from 'lib/llms/pages'
import { textResponse } from 'lib/llms/response'

export const runtime = 'edge'

export function GET() {
  return textResponse(buildLlmsTxt(), 'text/plain')
}
