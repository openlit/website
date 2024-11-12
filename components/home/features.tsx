'use client'

import clsx from 'clsx'
import {
  BarChart2Icon,
  EyeIcon,
  LineChart,
  type LucideIcon,
  MousePointer2Icon,
  Orbit,
  ShieldHalfIcon,
  Sparkles,
  SparklesIcon,
  TagIcon,
  BlocksIcon,
  ListStartIcon,
} from 'lucide-react'
import Image from 'next/image'

export function FeaturesPrivacy() {
  return (
    <div className="py-12" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-cal text-base leading-7 text-brandPrimary">Privacy first</h2>
          <p className="font-cal mt-2 text-3xl text-gray-900 dark:text-gray-50 sm:text-4xl">
            See exactly what our code does. Or host it yourself.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          OpenLIT allows you to simplify your AI development workflow, especially for Generative AI and LLMs. It streamlines essential tasks like experimenting with LLMs, organizing and versioning prompts, and securely handling API keys.
          </p>
        </div>
      </div>
    </div>
  )
}

export function FeaturesWithImage(props: {
  imageSide: 'left' | 'right'
  title: string
  subtitle: string
  description: string
  image: string
  imageDark: string
  features: {
    name: string
    description: string
    icon: LucideIcon
  }[]
}) {
  return (
    <div className="overflow-hidden py-12" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div
            className={clsx(
              'lg:pt-4',
              props.imageSide === 'left' ? 'lg:ml-auto lg:pl-4' : 'lg:mr-auto lg:pr-4'
            )}
          >
            <div className="lg:max-w-lg">
              <h2 className="font-cal text-base leading-7 text-brandPrimary">{props.title}</h2>
              <p className="font-cal mt-2 text-3xl text-gray-900 dark:text-gray-100 sm:text-4xl">
                {props.subtitle}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                {props.description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-400 lg:max-w-none">
                {props.features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-brandPrimary"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            className={clsx(
              'flex items-start',
              props.imageSide === 'left'
                ? 'justify-end lg:order-first'
                : 'justify-start lg:order-last'
            )}
          >
            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:bg-gray-100/10 lg:rounded-2xl lg:p-4">
              <Image
                src={props.image}
                alt={props.title}
                className="w-[48rem] max-w-none rounded-xl shadow-2xl ring-1 ring-gray-400/10 dark:hidden sm:w-[57rem]"
                width={2400}
                height={1800}
                loading="lazy"
                decoding="async"
              />
              <Image
                src={props.imageDark}
                alt={props.title}
                className="hidden w-[48rem] max-w-none rounded-xl shadow-2xl ring-1 ring-gray-400/10 dark:block sm:w-[57rem]"
                width={2400}
                height={1800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const featuresTraces = [
  {
    name: 'Detailed Span Tracking',
    description: 'Monitor each span for response time and efficiency.',
    icon: Sparkles,
  },
  {
    name: 'Supporting OpenTelemetry',
    description:
      'Automatically track your AI apps with OpenTelemetry to gain insights into performance and behavior​',
    icon: Orbit,
  },
  {
    name: 'Cost tracking',
    description: 'Tracks your cost for making it easier for you to take revenue decisions.',
    icon: LineChart,
  },
]

const featuresPlayground = [
  {
    name: 'Side-by-Side Comparison',
    description:
      'Simultaneously evaluate multiple LLMs to understand how they perform in real-time across various scenarios.',
    icon: ShieldHalfIcon,
  },
  {
    name: 'Cost Analysis',
    description:
      'Evaluate the cost implications of using different LLMs, helping you balance budget constraints with performance needs.',
    icon: SparklesIcon,
  },
  {
    name: 'Comprehensive Reporting',
    description:
      'Generate detailed reports that compile and visualize comparison data, supporting informed decision-making.',
    icon: TagIcon,
  },
]

const featuresPrompt = [
  {
    name: 'Prompt Management',
    description: 'Create, edit, and track different versions of your prompts.',
    icon: Sparkles,
  },
  {
    name: 'Versioning',
    description:
      'Supports major, minor, and patch updates for clear version management. You can even create a draft state.',
    icon: Orbit,
  },
  {
    name: 'Variable Substitution',
    description:
      'Customize prompts using specific variables using {{variableName}} convention to update on runtime.',
    icon: LineChart,
  },
]

const featuresVault = [
  {
    name: 'Secrets Management',
    description:
      'Seamlessly create, edit, and monitor the secrets associated with your applications.',
    icon: Sparkles,
  },
  {
    name: 'Secure Access',
    description:
      'Retrieve secrets based on keys or tags, and safely integrate them into your Node.js or Python environments.',
    icon: Orbit,
  },
  {
    name: 'Environment Integration',
    description:
      'Set secrets directly as environment variables for ease of use in applications using our SDKs.',
    icon: LineChart,
  },
]

const featuresException = [
  {
    name: 'Automatic Exception Monitoring',
    description:
      'With our SDKs for Python and TypeScript, monitor exceptions seamlessly without altering your application code base significantly.',
    icon: MousePointer2Icon,
  },
  {
    name: 'Detailed Stacktraces',
    description:
      'Access comprehensive stacktrace information for all caught exceptions, providing insight into where things went wrong.',
    icon: EyeIcon,
  },
  {
    name: 'Integration with Traces',
    description:
      'Leverage OpenTelemetry-powered trace data to capture exceptions within request flows.',
    icon: BarChart2Icon,
  },
]

export default function FeaturesHome() {
  return (
    <div className="flex w-full flex-col">
      <FeaturesPrivacy />
      <FeaturesWithImage
        imageSide="left"
        title={'Visualize your Traces'}
        subtitle={'Application and Request Tracing'}
        description="Provides end-to-end tracing of requests across different providers to improve performance visibility."
        image="/static/images/previews/request.png"
        imageDark="/static/images/previews/request-dark.png"
        features={featuresTraces}
      />
      <FeaturesWithImage
        imageSide="right"
        title="Exceptions Monitoring"
        subtitle={'Track Application Errors'}
        description={'Monitors and logs application errors to help detect and troubleshoot issues.'}
        image="/static/images/previews/exception.png"
        imageDark="/static/images/previews/exception-dark.png"
        features={featuresException}
      />
      <FeaturesWithImage
        imageSide="left"
        title="Explore Openground"
        subtitle={'Openlit PlayGround'}
        description={
          'Test and compare different LLMs side-by-side based on performance, cost, and other key metrics'
        }
        image="/static/images/previews/openground.png"
        imageDark="/static/images/previews/openground-dark.png"
        features={featuresPlayground}
      />
      <FeaturesWithImage
        imageSide="right"
        title="Manage your prompts"
        subtitle="Centralized Prompt Repository"
        description="Allows for organized storage, versioning, and usage of prompts with dynamic variables across different applications."
        image="/static/images/previews/prompt.png"
        imageDark="/static/images/previews/prompt-dark.png"
        features={featuresPrompt}
      />
      <FeaturesWithImage
        imageSide="left"
        title="Secure Secrets Management"
        subtitle="Vault Hub"
        description="Vault offers a secure way to store and manage sensitive application secrets."
        image="/static/images/previews/vault.png"
        imageDark="/static/images/previews/vault-dark.png"
        features={featuresVault}
      />
    </div>
  )
}

const featuresNewSenders = [
  {
    name: 'Quickly Identify New Senders',
    description:
      'Conveniently lists all new individuals or entities that recently emailed you, helping you spot important contacts.',
    icon: EyeIcon,
  },
  {
    name: 'Effortless Blocking',
    description:
      'Easily block any unwanted sender with a single click, keeping your inbox clean and relevant.',
    icon: ShieldHalfIcon,
  },
  {
    name: 'Stay Organized and Secure',
    description:
      'Enhance your email security by managing unfamiliar senders, reducing the risk of spam and phishing attacks.',
    icon: BlocksIcon,
  },
  {
    name: 'Personalize Your Email Experience',
    description:
      'Discover and prioritize important emails, ensuring you never miss out on significant introductions or opportunities.',
    icon: ListStartIcon,
  },
]

export function FeaturesNewSenders() {
  return (
    <FeaturesWithImage
      imageSide="left"
      title="New Sender List"
      subtitle="Manage new senders in your inbox"
      description="View a comprehensive list of recent new senders, making it easier to spot important contacts and opportunities, while also offering the ability to block unwanted communication effortlessly."
      image="/images/newsletters.png"
      features={featuresNewSenders}
    />
  )
}
