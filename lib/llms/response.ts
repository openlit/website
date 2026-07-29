const CACHE_CONTROL = 'public, max-age=3600, stale-while-revalidate=86400'

export function textResponse(
  body: string,
  contentType: 'text/plain' | 'text/markdown' = 'text/plain'
) {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': `${contentType}; charset=utf-8`,
      'Cache-Control': CACHE_CONTROL,
      'X-Robots-Tag': 'all',
      'X-Llms-Txt': 'https://openlit.io/llms.txt',
      Link: '<https://openlit.io/llms.txt>; rel="llms-txt", <https://openlit.io/llms-full.txt>; rel="llms-full-txt"',
    },
  })
}
