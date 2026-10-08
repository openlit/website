import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prefersMarkdown } from './lib/agent/accept'
import { MARKDOWN_NOT_FOUND_HEADERS, markdownNotFoundBody } from './lib/agent/not-found-markdown'
import { decideNegotiation, normalizePathname } from './lib/agent/negotiate'
import { markdownForPathname } from './lib/llms/pages'

export function middleware(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname)
  const wantsMarkdown = prefersMarkdown(request.headers.get('accept'))
  const markdown = wantsMarkdown ? markdownForPathname(pathname) : null
  const decision = decideNegotiation({
    pathname,
    wantsMarkdown,
    hasMarkdown: Boolean(markdown),
  })

  if (decision === 'next' || !markdown) {
    if (decision === 'not-found') {
      return new NextResponse(markdownNotFoundBody(pathname), {
        status: 404,
        headers: MARKDOWN_NOT_FOUND_HEADERS,
      })
    }
    return NextResponse.next()
  }

  const canonical =
    pathname === '/' ? 'https://openlit.io/' : `https://openlit.io${pathname.replace(/\.md$/, '')}`

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'all',
      'X-Llms-Txt': 'https://openlit.io/llms.txt',
      Link: `<${canonical}>; rel="canonical", <https://openlit.io/llms.txt>; rel="llms-txt", <https://openlit.io/llms-full.txt>; rel="llms-full-txt"`,
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
