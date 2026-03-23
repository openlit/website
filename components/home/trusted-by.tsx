// Each entry is either an image logo or a text-only fallback.
// All logos are rendered grayscale at reduced opacity and reveal colour on hover.

import Image from 'next/image'

type LogoEntry =
  | { kind: 'img'; name: string; src: string; width: number; height: number }
  | { kind: 'text'; name: string }

const logos: LogoEntry[] = [
  {
    kind: 'img',
    name: 'Grafana',
    src: '/static/images/trusted-by/grafana.svg',
    width: 120,
    height: 32,
  },
  {
    kind: 'img',
    name: 'Microsoft',
    src: '/static/images/trusted-by/microsoft.svg',
    width: 120,
    height: 32,
  },
  {
    kind: 'img',
    name: 'AWS',
    src: '/static/images/trusted-by/aws.svg',
    width: 120,
    height: 40,
  },
  {
    kind: 'img',
    name: 'Docker',
    src: '/static/images/trusted-by/docker.svg',
    width: 120,
    height: 40,
  },
  {
    kind: 'img',
    name: 'Splunk',
    src: '/static/images/trusted-by/splunk.svg',
    width: 120,
    height: 32,
  },
  {
    kind: 'img',
    name: 'Elastic',
    src: '/static/images/trusted-by/elastic.svg',
    width: 40,
    height: 40,
  },
  {
    kind: 'img',
    name: 'GPT4All',
    src: '/static/images/integrations/gpt4all.svg',
    width: 40,
    height: 40,
  },
  {
    kind: 'img',
    name: 'Dash0',
    src: '/static/images/trusted-by/dash0.svg',
    width: 40,
    height: 40,
  },
  {
    kind: 'img',
    name: 'Judgment',
    src: '/static/images/trusted-by/judgment.webp',
    width: 40,
    height: 40,
  },
  {
    kind: 'img',
    name: 'Egg AI',
    src: '/static/images/trusted-by/egg-ai.svg',
    width: 40,
    height: 40,
  },
]

const LOGO_HEIGHT = 28

function LogoItem({ entry }: { entry: LogoEntry }) {
  if (entry.kind === 'img') {
    // Square images (icons) get the company name label alongside them
    const isIcon = entry.width === entry.height
    return (
      <div className="group flex shrink-0 items-center gap-2 grayscale transition-all duration-300 hover:grayscale-0">
        <Image
          src={entry.src}
          alt={entry.name}
          width={entry.width}
          height={entry.height}
          className="opacity-50 transition-opacity duration-300 group-hover:opacity-100"
          style={{ height: LOGO_HEIGHT, width: 'auto' }}
        />
        {isIcon && entry.name && (
          <span className="text-base font-semibold opacity-50 transition-opacity duration-300 group-hover:opacity-100">
            {entry.name}
          </span>
        )}
      </div>
    )
  }

  return (
    <span className="shrink-0 text-base font-semibold opacity-60 transition-opacity duration-300 hover:opacity-80">
      {entry.name}
    </span>
  )
}

export function TrustedBy() {
  // Duplicate the list so the marquee loops seamlessly
  const track = [...logos, ...logos]

  return (
    <section className="w-full py-12">
      <div className="container mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest opacity-60">
          Trusted &amp; used by developers and engineers at
        </p>
      </div>

      {/* Fade edges */}
      <div
        className="marquee-track relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-16 px-8">
          {track.map((entry, i) => (
            <LogoItem key={`${entry.name}-${i}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
