import { getMarkdownBySlug } from 'lib/llms/pages'
import { textResponse } from 'lib/llms/response'

export const runtime = 'edge'

type Params = {
  params: { slug?: string[] }
}

export function GET(_request: Request, { params }: Params) {
  const markdown = getMarkdownBySlug(params.slug)
  if (!markdown) {
    return new Response('Not Found', { status: 404 })
  }
  return textResponse(markdown, 'text/markdown')
}
