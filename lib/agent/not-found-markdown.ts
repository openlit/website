const DOCS = 'https://docs.openlit.io/latest/overview'
const LLMS = 'https://openlit.io/llms.txt'
const SITEMAP = 'https://openlit.io/sitemap.xml'

export function markdownNotFoundBody(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `# Not found

No OpenLIT page exists at \`${path}\`.

The path is missing or was renamed. Use one of these indexes to find the right page:

- [llms.txt](${LLMS}) for agent instructions and Markdown page links
- [Sitemap](${SITEMAP}) for every public HTML URL
- [Documentation](${DOCS}) for the product API, CLI, and self-hosting guide

If you were calling the HTTP API, errors are JSON and the contract is at https://openlit.io/openapi.json.
`
}

export const MARKDOWN_NOT_FOUND_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
  'Cache-Control': 'public, max-age=300',
  'X-Robots-Tag': 'noindex',
} as const
