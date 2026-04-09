// Each entry is either an image logo or a text-only fallback.
// All logos are rendered grayscale at reduced opacity and reveal colour on hover.

import Image from 'next/image'

type LogoEntry =
  | { kind: 'img'; name: string; src: string; width: number; height: number }
  | { kind: 'text'; name: string }

const logos: LogoEntry[] = Array.from({ length: 26 }, (_, index) => ({
  kind: 'img',
  src: `/static/images/trusted-by/${index + 1}.png`,
  width: 3000,
  height: 500,
  name: `Logo ${index + 1}`,
}))

const LOGO_HEIGHT = 40

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
        className="marquee-track group relative overflow-hidden bg-white py-2 opacity-70"
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
