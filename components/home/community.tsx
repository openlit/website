import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card'
import { BadgeWithGradient } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import {
  Github,
  MessageCircle,
  Star,
  GitFork,
  ExternalLink,
  BugIcon,
  DownloadIcon,
  Heart,
} from 'lucide-react'
import { useContext } from 'react'
import { GithubContext } from 'contexts/github'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { supportOptions } from 'constants/support'

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export function Community() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  const { info, sdk_downloads } = useContext(GithubContext)

  const stats = [
    { label: 'GitHub Stars', value: info?.stargazers_count || '-', icon: Star },
    { label: 'Sdk Downloads', value: formatNumber(sdk_downloads), icon: DownloadIcon },
    { label: 'Forks', value: info?.forks_count || '-', icon: GitFork },
    { label: 'Open Issues', value: info?.open_issues_count, icon: BugIcon },
  ]
  return (
    <section id="community" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4 text-center">
          <BadgeWithGradient variant="outline">Community</BadgeWithGradient>
          <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
            Join our growing community
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            OpenLit is built by developers, for developers. Join thousands of engineers building
            better LLM applications with open-source observability.
          </p>
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Github className="h-5 w-5" />
                  <span>Open Source Project</span>
                </CardTitle>
                <CardDescription>Contribute to the future of LLM observability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-background rounded-lg border border-stone-200 p-4 text-center dark:border-stone-800"
                    >
                      <stat.icon className="text-primary mx-auto mb-2 h-6 w-6" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-muted-foreground text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href={siteMetadata.siteRepo}>
                    <Button className="flex items-center space-x-2">
                      <Github className="h-4 w-4" />
                      <span>View on GitHub</span>
                    </Button>
                  </Link>
                  <Link href={siteMetadata.slack}>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>Join Slack</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Us</CardTitle>
                <CardDescription>
                  Help us build the future of open-source LLM observability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {supportOptions.map((option, index) => (
                    <div
                      key={index}
                      className="bg-background flex flex-col rounded-lg border border-stone-200 p-6 transition-colors dark:border-stone-800"
                    >
                      <div className="mb-4 flex grow items-start space-x-4">
                        <div className="rounded-lg bg-gradient-to-br from-primary-400 via-orange-500 to-red-500 p-3">
                          <option.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{option.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-4 text-sm">{option.description}</p>
                          <ul className="mb-4 space-y-2">
                            {option.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-brandPrimary"></div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Link href={option.url} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full" variant={index === 0 ? 'outline' : 'default'}>
                          <Heart className="mr-2 h-4 w-4" />
                          {option.title}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Get Involved</CardTitle>
                <CardDescription>Ways to contribute to OpenLit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-brandPrimary"></div>
                    <div>
                      <div className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text font-medium text-transparent">
                        Contribute Code
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Help improve OpenLit with bug fixes and new features
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-brandPrimary"></div>
                    <div>
                      <div className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text font-medium text-transparent">
                        Report Issues
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Help us improve by reporting bugs and suggesting features
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-brandPrimary"></div>
                    <div>
                      <div className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text font-medium text-transparent">
                        Write Documentation
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Help others get started with better docs and guides
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-brandPrimary"></div>
                    <div>
                      <div className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text font-medium text-transparent">
                        Share Your Story
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Tell us how OpenLit helps your team
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest from the Blog</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.title}
                      className="border-b border-stone-200 pb-3 dark:border-stone-800"
                      href={post.path}
                    >
                      <div className="text-sm font-medium">{post.title}</div>
                      <div className="text-muted-foreground text-xs">
                        {formatDate(post.date, siteMetadata.locale)}
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href={'/blogs'}>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View All Posts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
