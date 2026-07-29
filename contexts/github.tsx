'use client'

import siteMetadata from '@/data/siteMetadata'
import { usePathname } from 'next/navigation'
import { createContext, useEffect, useRef, useState } from 'react'

export type GithubInformation = {
  name: string
  full_name: string
  html_url: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  subscribers_count: number
}

export type GithubContributor = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

type GithubContextValue = {
  info: GithubInformation | null
  sdk_downloads: number
  contributors: GithubContributor[]
}

export const GithubContext = createContext<GithubContextValue>({
  info: null,
  sdk_downloads: 0,
  contributors: [],
})

const REPO_API = siteMetadata.siteRepo.replace('https://github.com/', 'https://api.github.com/repos/')

function isHumanContributor(contributor: GithubContributor) {
  if (contributor.type !== 'User') return false
  if (contributor.login.endsWith('[bot]')) return false
  if (contributor.login.toLowerCase().includes('dependabot')) return false
  return true
}

async function fetchAllContributors(): Promise<GithubContributor[]> {
  const collected: GithubContributor[] = []
  let page = 1

  while (page <= 10) {
    const response = await fetch(`${REPO_API}/contributors?per_page=100&page=${page}`)
    if (!response.ok) break
    const batch = (await response.json()) as GithubContributor[]
    if (!Array.isArray(batch) || batch.length === 0) break
    collected.push(...batch.filter(isHumanContributor))
    if (batch.length < 100) break
    page += 1
  }

  return collected
}

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const contributorsLoaded = useRef(false)
  const [github, setGithub] = useState<GithubContextValue>({
    info: null,
    sdk_downloads: 0,
    contributors: [],
  })

  useEffect(() => {
    fetch(REPO_API)
      .then((res) => res.json())
      .then((data) => {
        setGithub((e) => ({ ...e, info: data }))
      })
      .catch(() => {})

    const regex = /<text[^>]*>([^<]*)<\/text>(?![\s\S]*<text)/
    Promise.all([
      fetch('https://static.pepy.tech/personalized-badge/openlit?period=total&units=NONE')
        .then((res) => res.text())
        .then((res) => (res || '').match(regex)?.[1])
        .then((res) => parseInt(res || '0', 10))
        .catch(() => 0),
      fetch('https://api.npmjs.org/downloads/point/2015-01-01:2100-01-01/openlit')
        .then((res) => res.json())
        .then((res) => res.downloads as number)
        .catch(() => 0),
    ]).then(([a, b]) => {
      setGithub((e) => ({ ...e, sdk_downloads: a + b }))
    })
  }, [])

  useEffect(() => {
    if (!pathname?.startsWith('/about-us') || contributorsLoaded.current) return
    contributorsLoaded.current = true

    fetchAllContributors()
      .then((contributors) => {
        const sorted = [...contributors].sort((a, b) =>
          a.login.localeCompare(b.login, undefined, { sensitivity: 'base' })
        )
        setGithub((e) => ({ ...e, contributors: sorted }))
      })
      .catch(() => {
        setGithub((e) => ({ ...e, contributors: [] }))
      })
  }, [pathname])

  return <GithubContext.Provider value={github}>{children}</GithubContext.Provider>
}
