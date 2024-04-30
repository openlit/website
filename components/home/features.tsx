import { HoverEffect } from '../ui/card-hover-effect'

export default function Features() {
  return (
    <section id="features" className="container pb-8">
      <div className="bg-muted/50 rounded-lg py-12">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          <span className="bg-brandPrimary bg-clip-text text-transparent">Product </span>
          Features
        </h2>
        <div className="mx-auto max-w-5xl px-8">
          <HoverEffect items={projects} />
        </div>
      </div>
    </section>
  )
}
export const projects = [
  {
    title: 'OpenTelemetry native',
    description:
      "Seamless integration: OpenLIT's native support makes adding it to your projects feel effortless and intuitive.",
  },
  {
    title: 'Granular Usage Insights',
    description:
      'Fine-tune LLM performance and costs to achieve maximum efficiency and scalability.',
  },
  {
    title: 'Real-Time Data Streaming',
    description:
      'Streams data to let you visualise your data and make quick decisions and modifications.',
  },
  {
    title: 'Zero Added Latency',
    description:
      'Ensures that data is processed quickly without affecting the performance of your application.',
  },
  {
    title: 'Visualize and analyze',
    description:
      'OpenLIT UI helps you to explore LLM costs, token consumption, performance indicators, and user interactions in a straightforward interface.',
  },
  {
    title: 'Observability Platforms',
    description:
      'Connect to popular observability systems with ease, including Datadog and Grafana Cloud, to export data automatically.',
  },
]
