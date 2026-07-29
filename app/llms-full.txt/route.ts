import { buildLlmsFullTxt } from 'lib/llms/pages'
import { textResponse } from 'lib/llms/response'

export const runtime = 'edge'

export function GET() {
  return textResponse(buildLlmsFullTxt(), 'text/plain')
}
