import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge, BadgeWithGradient } from '../ui/badge'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Copy, ExternalLink, Container, Zap, Shield, Settings } from 'lucide-react'
import { CodeBlock } from 'components/ui/code-block'
import SUPPORTED_INTEGRATIONS from 'constants/integrations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const IntegrationsGrid = () => {
  // Sample integration data - replace with your actual data

  const itemsPerPage = 8 // 2x3 grid
  const totalPages = Math.ceil(SUPPORTED_INTEGRATIONS.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 3000) // Change page every 3 seconds

    return () => clearInterval(interval)
  }, [isPlaying, totalPages])

  const handleDotClick = (pageIndex) => {
    setCurrentPage(pageIndex)
    setIsPlaying(false) // Pause auto-play when user interacts
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsPlaying(true), 5000)
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Grid Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                {SUPPORTED_INTEGRATIONS.slice(
                  pageIndex * itemsPerPage,
                  (pageIndex + 1) * itemsPerPage
                ).map((integration, index) => (
                  <Link
                    href={`https://docs.openlit.io/${integration.link}`}
                    key={index}
                    className="flex items-center space-x-3 rounded-lg border border-stone-200 bg-stone-100 p-3 hover:bg-stone-200 dark:border-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-2xl">
                      <Image src={integration.icon} alt={integration.name} width={24} height={24} />
                    </span>
                    <section className="flex flex-1 flex-col items-start justify-center">
                      <span className="font-medium">{integration.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {integration.type}
                      </Badge>
                    </section>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="mt-6 flex items-center justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition-all duration-200 ${
              currentPage === index ? 'scale-125 bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const codeExamples = {
  python: {
    code: `# Install OpenLit
pip install openlit

# Initialize in your application
import openlit
openlit.init()`,
    fileName: 'main.py',
    language: 'python',
    label: 'Python',
    docs: 'https://docs.openlit.io/latest/openlit/quickstart-ai-observability#manual-instrumentation',
  },

  typescript: {
    code: `// Install OpenLit
npm install openlit

// Initialize in your application
import openlit from 'openlit';
openlit.init();`,
    fileName: 'index.js',
    language: 'typescript',
    label: 'Typescript',
    docs: 'https://docs.openlit.io/latest/openlit/quickstart-ai-observability#typescript-2',
  },
}

const integrations = [
  { name: 'OpenAI', logo: '🤖', status: 'Supported' },
  { name: 'Anthropic', logo: '🧠', status: 'Supported' },
  { name: 'Cohere', logo: '🔮', status: 'Supported' },
  { name: 'Hugging Face', logo: '🤗', status: 'Supported' },
  { name: 'LangChain', logo: '🦜', status: 'Supported' },
  { name: 'LlamaIndex', logo: '🦙', status: 'Supported' },
  { name: 'Mistral AI', logo: '🌪️', status: 'Supported' },
  { name: 'Ollama', logo: '🌋', status: 'Supported' },
]

export function Integration() {
  return (
    <section className="max-w-8xl relative h-full w-full overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4 text-center">
          <BadgeWithGradient variant="outline" className="px-3 py-1">
            Integration
          </BadgeWithGradient>
          <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
            Get started in minutes
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Add comprehensive observability to your LLM applications with just a few lines of code.
            No code changes required for existing applications.
          </p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-12">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Quick Setup</span>
                </CardTitle>
                <CardDescription>
                  Get OpenLit running in your environment in less than a minute
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="python" className="w-full">
                  <TabsList className="grid w-auto grid-cols-2">
                    {Object.entries(codeExamples).map(([key, value]) => (
                      <TabsTrigger key={key} value={key} className="capitalize">
                        {value.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(codeExamples).map(([key, value]) => (
                    <TabsContent key={key} value={key} className="space-y-4">
                      <div className="relative">
                        <CodeBlock
                          language={value.language}
                          filename={value.fileName}
                          highlightLines={[]}
                          code={value.code}
                        />
                        {/* <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
												<code>{code}</code>
											</pre> */}
                        <Button variant="ghost" size="sm" className="absolute right-2 top-2">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={value.docs} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="flex items-center space-x-2">
                            <ExternalLink className="h-4 w-4" />
                            <span>View Full Documentation</span>
                          </Button>
                        </Link>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Container className="h-5 w-5 text-brandPrimary" />
                  <span>Zero-Code Kubernetes Observability</span>
                </CardTitle>
                <CardDescription>
                  Automatically inject AI observability into your Kubernetes workloads without
                  touching your code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-lg bg-gradient-to-br from-primary-400 via-orange-500 to-red-500 p-2">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Automatic Instrumentation</div>
                      <div className="text-muted-foreground text-sm">
                        Deploy the OpenLIT Operator and it automatically instruments your AI
                        applications - no code changes, no rebuilds
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="rounded-lg bg-gradient-to-br from-primary-400 via-orange-500 to-red-500 p-2">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">OpenTelemetry Native</div>
                      <div className="text-muted-foreground text-sm">
                        Built entirely on OpenTelemetry standards for seamless integration with your
                        existing observability stack
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="rounded-lg bg-gradient-to-br from-primary-400 via-orange-500 to-red-500 p-2">
                      <Settings className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Simple Configuration</div>
                      <div className="text-muted-foreground text-sm">
                        Just create an AutoInstrumentation CR and select your workloads - that's it!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg border border-stone-200 p-4 dark:border-stone-800">
                  <div className="mb-2 text-sm font-medium">Perfect for:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">LLM Applications</Badge>
                    <Badge variant="secondary">AI Agents</Badge>
                    <Badge variant="secondary">Vector Databases</Badge>
                    <Badge variant="secondary">AI Frameworks</Badge>
                  </div>
                </div>

                <Link
                  href="https://docs.openlit.io/latest/operator/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4 w-full">
                    <Container className="mr-2 h-4 w-4" />
                    Learn About Kubernetes Operator
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-12">
            <Card>
              <CardHeader>
                <CardTitle>Supported Integrations</CardTitle>
                <CardDescription>
                  Works with all major LLM providers and frameworks out of the box
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IntegrationsGrid />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose OpenLit?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium">Open Source & Free</div>
                    <div className="text-muted-foreground text-sm">
                      Always free, self-hosted, no vendor lock-in
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium">Privacy First</div>
                    <div className="text-muted-foreground text-sm">
                      Your data never leaves your infrastructure
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-purple-500"></div>
                  <div>
                    <div className="font-medium">Production Ready</div>
                    <div className="text-muted-foreground text-sm">
                      Built for scale with minimal performance overhead
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
