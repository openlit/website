'use client'

import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { BadgeWithGradient } from '../ui/badge'
import { Button } from '../ui/button'
import Link from 'next/link'

const ITEMS = [
  {
    id: 'tracing',
    label: 'Tracing',
    title: 'Distributed Tracing',
    video:
      'https://mintcdn.com/openlit/oP6rqLGiwYvXWG_M/images/trace-details.mp4?fit=max&auto=format&n=oP6rqLGiwYvXWG_M&q=85&s=80a9b4bf54862dd386284f175c71f714',
    description:
      'Monitor and trace your LLM applications in real-time. Visualize request flows, identify bottlenecks, and understand the complete lifecycle of every AI interaction with OpenTelemetry-powered distributed tracing.',
    docs: 'https://docs.openlit.io/latest/openlit/observability/traces',
  },
  {
    id: 'evaluation',
    label: 'Evaluation',
    title: 'AI Model Evaluation',
    video:
      'https://mintcdn.com/openlit/o7M0DoQ9lLUZaVc9/images/evaluations.mp4?fit=max&auto=format&n=o7M0DoQ9lLUZaVc9&q=85&s=6f462a2b9cec7e8a9279b06312bcfe06',
    description:
      'Run online/offline evals via UI (experiment with prompts/models) and via SDKs (experiment with end-to-end application).',
    docs: 'https://docs.openlit.io/latest/sdk/features/evaluations',
  },
  {
    id: 'prompt-hub',
    label: 'Prompt Hub',
    title: 'Prompt Management',
    video:
      'https://mintcdn.com/openlit/oP6rqLGiwYvXWG_M/images/prompts.mp4?fit=max&auto=format&n=oP6rqLGiwYvXWG_M&q=85&s=3eb876d9679d3c80e827735a05f96dfd',
    description:
      'Centrally manage, version, and deploy prompts across your applications. Experiment with different prompt variations, track performance, and iterate faster with version control for your prompts.',
    docs: 'https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub',
  },
  {
    id: 'experiments',
    label: 'Experiments',
    title: 'Experiment with your prompts and models',
    video:
      'https://mintcdn.com/openlit/o7M0DoQ9lLUZaVc9/images/experiments.mp4?fit=max&auto=format&n=o7M0DoQ9lLUZaVc9&q=85&s=fd7122162ea81d79b550ae574eadd4f2',
    description:
      'Experiment with your prompts and models to find the best performing ones. OpenGround is a playground for you to experiment with your prompts and models.',
    docs: 'https://docs.openlit.io/latest/openlit/prompts-experiments/openground',
  },
  {
    id: 'dashboard',
    label: 'Dashboards',
    title: 'Real-time Monitoring',
    video:
      'https://mintcdn.com/openlit/o7M0DoQ9lLUZaVc9/images/dashboards.mp4?fit=max&auto=format&n=o7M0DoQ9lLUZaVc9&q=85&s=a4e0228fbad16b685ad2981499fe9167',
    description:
      'Get a unified view of all your LLM applications across different environments. Write custom SQL queries to analyze your AI telemetry data, create and resize custom widgets with flexible configurations and layouts and visualize telemetry from any OpenTelemetry-instrumented tool.',
    docs: 'https://docs.openlit.io/latest/openlit/dashboards/overview',
  },
  {
    id: 'fleet-hub',
    label: 'Fleet Hub',
    title: 'Multi-Deployment Management',
    video:
      'https://mintcdn.com/openlit/MR2TPKwNmIaOL-d_/images/fleet-hub.mp4?fit=max&auto=format&n=MR2TPKwNmIaOL-d_&q=85&s=222e11936668754c23180636490fcfd3',
    description:
      'Get a unified view of all your LLM applications across different environments. Monitor multiple deployments, compare performance metrics, and manage your entire AI fleet from a single dashboard.',
    docs: 'https://docs.openlit.io/latest/openlit/observability/fleet-hub',
  },
]

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState(ITEMS[0].id)
  return (
    <section className="mx-auto max-w-6xl p-8 py-20">
      <div className="mb-12 text-center">
        <BadgeWithGradient variant="outline">Features</BadgeWithGradient>
        <h1 className="mb-4 bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
          Powerful Features for Modern Teams
        </h1>
        <p className="text-muted-foreground text-xl">
          Everything you need to build, ship, and scale your AI applications
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap justify-center gap-2 border-b border-stone-200 shadow-sm dark:border-stone-800">
        {ITEMS.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === item.id
                  ? 'border-b-2 border-brandPrimary text-brandPrimary'
                  : 'text-muted-foreground hover:text-brandPrimary'
              }`}
              aria-selected={activeTab === item.id}
              role="tab"
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div>
        {ITEMS.map((item) => {
          const isActive = activeTab === item.id
          return (
            <section key={item.id} className="flex w-full flex-col">
              <div
                id={`feature-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                role="tabpanel"
                aria-labelledby={item.id}
                aria-hidden={!isActive}
              >
                <video src={item.video} autoPlay muted loop className="mb-6 w-full rounded-lg" />

                <div className="border-border grid grid-cols-1 gap-6 border-t border-solid px-6 pb-6 pt-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-8">
                    <h3 className="mb-4 bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-2xl font-bold leading-relaxed text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-center lg:col-span-4 lg:justify-end">
                    <Link href={item.docs} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full lg:w-auto">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Documentation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* SEO Content Section - Always visible to crawlers */}
      <div className="sr-only">
        <h2>All Features</h2>
        {ITEMS.map((item) => (
          <section key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.docs}>Documentation</a>
          </section>
        ))}
      </div>
    </section>
  )
}
