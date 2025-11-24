'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BadgeWithGradient } from './ui/badge'
import { Button } from './ui/button'
import {
  Github,
  Slack,
  Target,
  Zap,
  Shield,
  Users,
  Code,
  BookOpen,
  MessageCircle,
  Heart,
  ExternalLink,
  Telescope,
  Database,
  Container,
  GitFork,
  Star,
  DownloadIcon,
  BugIcon,
  Mail,
  Activity,
  Layers,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import { useContext } from 'react'
import { GithubContext } from 'contexts/github'
import ReadyToGetStarted from './common/ready-to-get-started'
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

export default function AboutUsContent() {
  const { info, sdk_downloads } = useContext(GithubContext)

  const stats = [
    { label: 'GitHub Stars', value: info?.stargazers_count || '-', icon: Star },
    { label: 'SDK Downloads', value: formatNumber(sdk_downloads), icon: DownloadIcon },
    { label: 'Forks', value: info?.forks_count || '-', icon: GitFork },
    { label: 'Open Issues', value: info?.open_issues_count, icon: BugIcon },
  ]

  const features = [
    {
      icon: Activity,
      title: 'Observability & Real-time Monitoring',
      description:
        'Distributed tracing powered by OpenTelemetry with real-time insights. Track token usage, monitor response times, and debug AI applications in production.',
    },
    {
      icon: Layers,
      title: 'Fleet Hub',
      description:
        'Centralized management and monitoring of multiple AI deployments. Get a unified view of all your LLM applications across environments.',
    },
    {
      icon: BookOpen,
      title: 'Prompt Hub',
      description:
        'Manage and version prompts for consistent and easy access across applications. Experiment and iterate faster.',
    },
    {
      icon: Shield,
      title: 'Vault',
      description:
        'Securely handle your API keys and secrets centrally, avoiding insecure hardcoding practices.',
    },
    {
      icon: Database,
      title: 'OpenGround',
      description:
        'Explore, test, and compare various LLMs side by side. Find the best model for your use case.',
    },
    {
      icon: Container,
      title: 'Kubernetes Operator',
      description:
        'Zero-code AI observability for Kubernetes workloads. Automatic instrumentation without touching your code.',
    },
  ]

  const contributions = [
    {
      icon: Code,
      title: 'Contribute Code',
      description:
        'Help improve OpenLIT with bug fixes, new features, and integrations. Check our GitHub issues for good first issues.',
    },
    {
      icon: BugIcon,
      title: 'Report Issues',
      description:
        'Found a bug? Have a feature request? Open an issue on GitHub and help us make OpenLIT better.',
    },
    {
      icon: BookOpen,
      title: 'Write Documentation',
      description:
        'Improve our docs, write tutorials, or create examples. Help others get started with OpenLIT.',
    },
    {
      icon: MessageCircle,
      title: 'Join the Community',
      description:
        'Connect with other users, share your experience, and help answer questions on Slack and Discord.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="space-y-6 text-center">
            <BadgeWithGradient variant="outline" className="px-3 py-1">
              About OpenLIT
            </BadgeWithGradient>
            <h1 className="text-5xl font-bold tracking-tight">
              Building the Future of{' '}
              <span className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                AI Observability
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              OpenLIT is an open-source AI engineering platform that helps teams build, evaluate,
              and observe AI applications across the entire lifecycle from development to
              production.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="bg-background inline-flex items-center space-x-2 rounded-full border border-stone-200 px-4 py-2 dark:border-stone-800">
                <Target className="h-4 w-4 text-brandPrimary" />
                <span className="text-sm font-medium">Our Mission</span>
              </div>
              <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
                OpenTelemetry-native LLM Application Observability
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                OpenLIT is designed to make the integration of observability into GenAI projects as
                easy as pie – literally, with just{' '}
                <span className="text-foreground font-semibold">a single line of code</span>.
                Whether you're working with popular LLM libraries such as OpenAI and HuggingFace or
                leveraging vector databases like ChromaDB, OpenLIT ensures your applications are
                monitored seamlessly.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We proudly follow the{' '}
                <Link
                  href="https://github.com/open-telemetry/semantic-conventions/tree/main/docs/gen-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brandPrimary hover:underline"
                >
                  Semantic Conventions
                </Link>{' '}
                of the OpenTelemetry community, consistently updating to align with the latest
                standards in observability.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={siteMetadata.siteRepo} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </Link>
                <Link href="https://docs.openlit.io" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Documentation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-xl border-2 border-stone-200 shadow-2xl dark:border-stone-800">
                <Image
                  src="/static/images/dashboard-white.png"
                  alt="OpenLIT Dashboard"
                  width={800}
                  height={450}
                  className="h-full w-full object-cover dark:hidden"
                />
                <Image
                  src="/static/images/dashboard-black.png"
                  alt="OpenLIT Dashboard"
                  width={800}
                  height={450}
                  className="hidden h-full w-full object-cover dark:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-3xl text-transparent">
                Growing Open Source Community
              </CardTitle>
              <CardDescription className="text-base">
                Join thousands of developers building better LLM applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-lg border border-stone-200 p-6 text-center dark:border-stone-800"
                  >
                    <stat.icon className="mx-auto mb-3 h-8 w-8 text-brandPrimary" />
                    <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
              What Makes OpenLIT Special
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              A comprehensive platform with everything you need to build, monitor, and optimize your
              AI applications
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 via-orange-500 to-red-500">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What is LIT Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <Card className="">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-white p-3 dark:bg-stone-950">
                  <Zap className="h-8 w-8 text-brandPrimary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-3 bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-2xl font-bold text-transparent">
                    What is LIT?
                  </h3>
                  <p className="text-lg leading-relaxed">
                    LIT stands for{' '}
                    <span className="font-semibold">Learning Interpretability Tool</span>. It refers
                    to a visual, interactive model-understanding and data visualization tool, a term
                    introduced by{' '}
                    <Link
                      href="https://developers.google.com/machine-learning/glossary#learning-interpretability-tool-lit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brandPrimary hover:underline"
                    >
                      Google
                    </Link>
                    . OpenLIT builds on this concept to provide comprehensive observability for
                    modern AI applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
              Our Core Values
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Open Source & Free</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Always free, self-hosted, and no vendor lock-in. Your data stays in your
                  infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your sensitive AI data never leaves your infrastructure. Complete control and
                  compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built by developers, for developers. Every feature is shaped by community
                  feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contributing Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="mb-12 space-y-4 text-center">
            <BadgeWithGradient variant="outline">Get Involved</BadgeWithGradient>
            <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
              Ways to Contribute
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Whether it's big or small, we love contributions 💚. Here are a few ways to get
              involved:
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {contributions.map((contribution, index) => (
              <Card key={index} className="transition-colors hover:border-brandPrimary">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-gradient-to-br from-primary-400 via-orange-500 to-red-500 p-3">
                      <contribution.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold">{contribution.title}</h3>
                      <p className="text-muted-foreground">{contribution.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="container mx-auto max-w-6xl px-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-3xl text-transparent">
                Join Our Community
              </CardTitle>
              <CardDescription className="text-base">
                Connect with the OpenLIT community and maintainers for support, discussions, and
                updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Link href={siteMetadata.siteRepo} target="_blank" rel="noopener noreferrer">
                  <Card className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center space-x-4 p-6">
                      <Github className="h-8 w-8 text-brandPrimary" />
                      <div>
                        <div className="font-semibold">GitHub</div>
                        <div className="text-muted-foreground text-sm">
                          Star, fork, and contribute
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href={siteMetadata.slack} target="_blank" rel="noopener noreferrer">
                  <Card className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center space-x-4 p-6">
                      <Slack className="h-8 w-8 text-brandPrimary" />
                      <div>
                        <div className="font-semibold">Slack</div>
                        <div className="text-muted-foreground text-sm">Join live discussions</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <a href={`mailto:${siteMetadata.email}`}>
                  <Card className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center space-x-4 p-6">
                      <Mail className="h-8 w-8 text-brandPrimary" />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-muted-foreground text-sm">Contact us directly</div>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <Link href={siteMetadata.twitter || '#'} target="_blank" rel="noopener noreferrer">
                  <Card className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center space-x-4 p-6">
                      <ExternalLink className="h-8 w-8 text-brandPrimary" />
                      <div>
                        <div className="font-semibold">X (Twitter)</div>
                        <div className="text-muted-foreground text-sm">Follow for updates</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              <div className="border-t border-stone-200 pt-6 dark:border-stone-800">
                <div className="space-y-4 text-center">
                  <h3 className="text-xl font-semibold">Support OpenLIT</h3>
                  <p className="text-muted-foreground mx-auto max-w-2xl">
                    Help us build the future of open-source AI observability. Your support enables
                    us to ship faster, add more integrations, and provide better support.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {supportOptions.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="flex items-center gap-3">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <ReadyToGetStarted />
    </div>
  )
}
