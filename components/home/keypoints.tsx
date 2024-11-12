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
import { useId } from 'react'

export default function Keypoints() {
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
      title: 'Prompt & Vault Management',
      description:
        'OpenLIT helps you manage your prompts and secrets to ease the development of your application.',
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
    <div className="py-20 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  )
  // return (
  //   <div className="relative z-10 mx-auto grid  max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
  //     {features.map((feature, index) => (
  //       <Feature key={feature.title} {...feature} index={index} />
  //     ))}
  //   </div>
  // )
}

const Feature = (feature: {
  title: string
  description: string
  icon?: React.ReactNode
  index: number
}) => {
  return (
    <div
      key={feature.title}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950"
    >
      <Grid size={20} />
      <p className="relative z-20 text-base font-bold text-neutral-800 dark:text-white">
        {feature.title}
      </p>
      <p className="relative z-20 mt-4 text-base font-normal text-neutral-600 dark:text-neutral-400">
        {feature.description}
      </p>
    </div>
  )
}

const Grid = ({ pattern, size }: { pattern?: number[][]; size?: number }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ]
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  )
}

function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId: any = useId()

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
