function flattenJsonLd(data: unknown): Record<string, unknown>[] {
  if (data == null) return []
  if (Array.isArray(data)) return data.flatMap(flattenJsonLd)
  if (typeof data !== 'object') return []

  const node = data as Record<string, unknown>
  if (Array.isArray(node['@graph'])) {
    return (node['@graph'] as unknown[]).flatMap(flattenJsonLd)
  }
  return [node]
}

function withContext(node: Record<string, unknown>) {
  const { '@context': _context, ...rest } = node
  return { '@context': 'https://schema.org', ...rest }
}

export default function JsonLd({ data }: { data: unknown }) {
  const nodes = flattenJsonLd(data)

  return (
    <>
      {nodes.map((node, index) => {
        const payload = withContext(node)
        const key = typeof payload['@id'] === 'string' ? payload['@id'] : `ld-json-${index}`
        return (
          <script
            key={key}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(payload).replace(/</g, '\\u003c'),
            }}
          />
        )
      })}
    </>
  )
}
