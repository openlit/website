'use client'
import siteMetadata from '@/data/siteMetadata'
import { useEffect, useRef } from 'react'

export default function GithubStar() {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    console.log('kjhkj')
    import(/* webpackMode: "eager" */ 'github-buttons').then(({ render }) => {
      console.log('eh')
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
