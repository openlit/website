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
          className="h-7 w-auto opacity-50 transition-opacity duration-300 group-hover:opacity-100 sm:h-9"
        />
        {isIcon && entry.name && (
          <span className="text-sm font-semibold opacity-50 transition-opacity duration-300 group-hover:opacity-100 sm:text-base">
            {entry.name}
          </span>
        )}
      </div>
    )
  }

  return (
    <span className="shrink-0 text-sm font-semibold opacity-60 transition-opacity duration-300 hover:opacity-80 sm:text-base">
      {entry.name}
    </span>
  )
}

export function TrustedBy() {
  // Duplicate the list so the marquee loops seamlessly
  const track = [...logos, ...logos]

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="container mb-6 text-center sm:mb-8">
        <p className="text-xs font-medium uppercase tracking-widest opacity-60 sm:text-sm">
          Trusted &amp; used by developers and engineers at
        </p>
      </div>

      {/* Fade edges */}
      <div
        className="marquee-track group relative overflow-hidden bg-white py-2 opacity-70"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-10 px-6 sm:gap-16 sm:px-8">
          {track.map((entry, i) => (
            <LogoItem key={`${entry.name}-${i}`} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
