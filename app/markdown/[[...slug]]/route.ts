import { MARKDOWN_NOT_FOUND_HEADERS, markdownNotFoundBody } from 'lib/agent/not-found-markdown'
import { getMarkdownBySlug } from 'lib/llms/pages'
import { textResponse } from 'lib/llms/response'

export const runtime = 'edge'

type Params = {
  params: { slug?: string[] }
}

export function GET(_request: Request, { params }: Params) {
  const markdown = getMarkdownBySlug(params.slug)
  if (!markdown) {
    const path = !params.slug || params.slug.length === 0 ? '/' : `/${params.slug.join('/')}`
    return new Response(markdownNotFoundBody(path), {
      status: 404,
      headers: MARKDOWN_NOT_FOUND_HEADERS,
    })
  }

  const slug = params.slug
  const htmlPath = !slug || slug.length === 0 ? '/' : `/${slug.join('/')}`.replace(/\.md$/, '')
  const canonicalUrl =
    htmlPath === '/' ? 'https://openlit.io/' : `https://openlit.io${htmlPath.replace(/\.md$/, '')}`

  return textResponse(markdown, 'text/markdown', { canonicalUrl })
}
