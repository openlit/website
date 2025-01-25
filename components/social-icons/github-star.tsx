'use client'
import siteMetadata from '@/data/siteMetadata'
import { useEffect, useRef } from 'react'

export default function GithubStar() {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    import('github-buttons').then(({ render }) => {
      render(ref.current as HTMLAnchorElement, function (el) {
        try {
          el.className = 'flex'
          if (ref.current) {
            ref.current.replaceChild(el, ref.current.firstChild!)
          }
        } catch (_) {
          console.log(_)
        }
      })
    })
  }, [])
  return (
    <a
      href={siteMetadata.siteRepo}
      data-color-scheme="no-preference: dark; light: light; dark: dark;"
      data-size="large"
      data-show-count="true"
      aria-label="Star openlit/openlit on GitHub"
      ref={ref}
      className="flex self-center"
    >
      <span className="hidden">Star</span>
    </a>
  )
}
