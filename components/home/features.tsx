import { cn } from 'lib/utils'
import {
  BarChart2Icon,
  Layers2Icon,
  LockKeyholeOpen,
  FileClockIcon,
  SquareTerminalIcon,
  ActivityIcon,
  HourglassIcon,
  RadicalIcon,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: 'Easy to integrate',
      description: 'Just add `openlit.init()` to start collecting data from your llm application.',
      icon: <SquareTerminalIcon />,
    },
    {
      title: 'Open source project',
      description:
        'Open source LLM & GenAI Observability tool, easy to start, just run `docker-compose up -d`',
      icon: <LockKeyholeOpen />,
    },
    {
      title: 'OpenTelemetry native',
      description:
        "Seamless integration: OpenLIT's native support makes adding it to your projects feel effortless and intuitive.",
      icon: <FileClockIcon />,
    },
    {
      title: 'Granular Usage Insights',
      description:
        'Analyze LLM, Vectordb & GPU performance and costs to achieve maximum efficiency and scalability.',
      icon: <ActivityIcon />,
    },
    {
      title: 'Real-Time Data Streaming',
      description:
        'Streams data to let you visualise your data and make quick decisions and modifications.',
      icon: <HourglassIcon />,
    },
    {
      title: 'Low Latency',
      description:
        'Ensures that data is processed quickly without affecting the performance of your application.',
      icon: <RadicalIcon />,
    },
    {
      title: 'Visualize and analyze',
      description:
        'OpenLIT UI helps you to explore LLM costs, token consumption, performance indicators, and user interactions in a straightforward interface.',
      icon: <BarChart2Icon />,
    },
    {
      title: 'Observability Platforms',
      description:
        'Connect to popular observability systems with ease, including Datadog and Grafana Cloud, to export data automatically.',
      icon: <Layers2Icon />,
    },
  ]
  return (
    <div className="relative z-10 mx-auto grid  max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string
  description: string
  icon?: React.ReactNode
  index: number
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex  flex-col py-10 dark:border-neutral-800 lg:border-r',
        (index === 0 || index === 4) && 'dark:border-neutral-800 lg:border-l',
        index < 4 && 'dark:border-neutral-800 lg:border-b'
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">{icon}</div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-brandPrimary dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  )
}
