'use client'

import React, { useEffect, useState } from 'react'
import { cn } from 'lib/utils'
import Image from 'next/image'

const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  className,
}: {
  items: {
    imageLight: string
    imageDark: string
    title: string
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  })
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards')
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse')
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s')
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s')
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s')
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn('scroller relative z-20  max-w-full overflow-hidden', className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex w-max min-w-full shrink-0 flex-nowrap gap-48 py-4',
          start && 'animate-scroll '
        )}
      >
        {items.map((item, idx) => (
          <li className="relative flex flex-shrink-0 items-center" key={item.title}>
            <Image
              src={item.imageLight}
              width={100}
              height={20}
              alt={item.title}
              className="dark:hidden"
            />
            <Image
              src={item.imageDark}
              width={100}
              height={20}
              alt={item.title}
              className="hidden dark:block"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Supports() {
  return (
    <section id="latest-blogs" className="container px-0 pb-16">
      <div className="bg-muted/50 rounded-lg">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
          <InfiniteMovingCards items={integrations} direction="right" speed="slow" />
          <InfiniteMovingCards items={platforms} direction="left" speed="slow" />
        </div>
      </div>
    </section>
  )
}

const integrations = [
  {
    imageLight: '/static/images/brands/openai.png',
    imageDark: '/static/images/brands/openai-white.png',
    title: 'OpenAI',
  },
  {
    imageLight: '/static/images/brands/anthropic.png',
    imageDark: '/static/images/brands/anthropic-white.png',
    title: 'Anthropic',
  },
  {
    imageLight: '/static/images/brands/azure.png',
    imageDark: '/static/images/brands/azure-white.png',
    title: 'Microsoft Azure',
  },
  {
    imageLight: '/static/images/brands/cohere.png',
    imageDark: '/static/images/brands/cohere-white.png',
    title: 'Cohere',
  },
  {
    imageLight: '/static/images/brands/hugging-face.png',
    imageDark: '/static/images/brands/hugging-face-white.png',
    title: 'Hugging Face',
  },
  {
    imageLight: '/static/images/brands/mistral.png',
    imageDark: '/static/images/brands/mistral-white.png',
    title: 'Mistral',
  },
  {
    imageLight: '/static/images/brands/pinecone.png',
    imageDark: '/static/images/brands/pinecone-white.png',
    title: 'Pinecone',
  },
  {
    imageLight: '/static/images/brands/langchain.png',
    imageDark: '/static/images/brands/langchain-white.png',
    title: 'Langchain',
  },
  {
    imageLight: '/static/images/brands/litellm.png',
    imageDark: '/static/images/brands/litellm-white.png',
    title: 'LiteLLM',
  },
  {
    imageLight: '/static/images/brands/chroma.png',
    imageDark: '/static/images/brands/chroma-white.png',
    title: 'Chroma',
  },
]

const platforms = [
  {
    imageLight: '/static/images/brands/otel.png',
    imageDark: '/static/images/brands/otel-white.png',
    title: 'Open Telemetry',
  },
  {
    imageLight: '/static/images/brands/grafana.png',
    imageDark: '/static/images/brands/grafana-white.png',
    title: 'Grafana',
  },
  {
    imageLight: '/static/images/brands/datadog.png',
    imageDark: '/static/images/brands/datadog-white.png',
    title: 'Datadog',
  },
  {
    imageLight: '/static/images/brands/newrelic.png',
    imageDark: '/static/images/brands/newrelic-white.png',
    title: 'New Relic',
  },
  {
    imageLight: '/static/images/brands/signoz.png',
    imageDark: '/static/images/brands/signoz-white.png',
    title: 'Signoz',
  },
  {
    imageLight: '/static/images/brands/dynatrace.png',
    imageDark: '/static/images/brands/dynatrace-white.png',
    title: 'Dynatrace',
  },
  {
    imageLight: '/static/images/brands/highlight.png',
    imageDark: '/static/images/brands/highlight-white.png',
    title: 'Highlight',
  },
  {
    imageLight: '/static/images/brands/openobserve.png',
    imageDark: '/static/images/brands/openobserve-white.png',
    title: 'Openobserve',
  },
  {
    imageLight: '/static/images/brands/jaeger.png',
    imageDark: '/static/images/brands/jaeger-white.png',
    title: 'Jaeger',
  },
]
