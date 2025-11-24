import siteMetadata from '@/data/siteMetadata'
import { createContext, useEffect, useState } from 'react'

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

export const GithubContext = createContext<{
  info: GithubInformation | null
  sdk_downloads: number
}>({ info: null, sdk_downloads: 0 })

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [github, setGithub] = useState<{ info: GithubInformation | null; sdk_downloads: number }>({
    info: null,
    sdk_downloads: 0,
  })

  const extractSDKDownloads = () => {
    const regex = /<text[^>]*>([^<]*)<\/text>(?![\s\S]*<text)/
    Promise.all([
      fetch('https://static.pepy.tech/personalized-badge/openlit?period=total&units=NONE')
        .then((res) => res.text())
        .then((res) => (res || '').match(regex)?.[1])
        .then((res) => parseInt(res || '0', 10)),
      fetch('https://api.npmjs.org/downloads/point/2015-01-01:2100-01-01/openlit')
        .then((res) => res.json())
        .then((res) => res.downloads),
    ]).then(([a, b]) => {
      setGithub((e) => ({ ...e, sdk_downloads: a + b }))
    })
  }

  useEffect(() => {
    fetch(siteMetadata.siteRepo.replace('https://github.com/', 'https://api.github.com/repos/'))
      .then((res) => res.json())
      .then((data) => {
        setGithub((e) => ({ ...e, info: data }))
      })
    extractSDKDownloads()
  }, [])

  return <GithubContext.Provider value={github}>{children}</GithubContext.Provider>
}
