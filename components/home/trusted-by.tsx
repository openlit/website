import Image from 'next/image'

type LogoEntry = { name: string; src: string }

const logos: LogoEntry[] = Array.from({ length: 26 }, (_, index) => ({
  src: `/static/images/trusted-by/${index + 1}.png`,
  name: `Customer logo ${index + 1}`,
}))

const EDGE_FADE = {
  maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
}

function LogoItem({ entry }: { entry: LogoEntry }) {
  return (
    <div className="flex h-8 shrink-0 items-center rounded-full border-2 border-primary-200 bg-white px-2.5 py-1 opacity-50 transition duration-300 hover:opacity-100 sm:h-9 sm:px-3">
      <Image
        src={entry.src}
        alt={entry.name}
        width={240}
        height={48}
        className="h-4 max-h-5 w-auto object-contain sm:h-5 sm:max-h-6"
      />
    </div>
  )
}

function MarqueeRow({
  entries,
  reverse = false,
  duration,
}: {
  entries: LogoEntry[]
  reverse?: boolean
  duration: string
}) {
  const track = [...entries, ...entries]

  return (
    <div className="marquee-track relative overflow-hidden" style={EDGE_FADE}>
      <div
        className="animate-marquee flex w-max items-center gap-2 px-2 sm:gap-2.5 sm:px-2.5"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: duration,
        }}
      >
        {track.map((entry, i) => (
          <LogoItem key={`${entry.name}-${i}`} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export function TrustedBy() {
  const midpoint = Math.ceil(logos.length / 2)
  const topRow = logos.slice(0, midpoint)
  const bottomRow = logos.slice(midpoint)

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="container mb-6 text-center sm:mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400 sm:text-sm">
          Trusted &amp; used by developers and engineers at
        </p>
      </div>

      <div className="space-y-3 sm:space-y-3.5">
        <MarqueeRow entries={topRow} duration="48s" />
        <MarqueeRow entries={bottomRow} reverse duration="56s" />
      </div>
    </section>
  )
}
