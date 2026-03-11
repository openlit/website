import { BadgeWithGradient } from 'components/ui/badge'

const testimonials = [
  {
    quote:
      'OpenLIT might be easier to integrate with any language that supports OTel for HTTP clients, making it a great choice for polyglot environments.',
    name: 'Community Member',
    role: 'Hacker News',
    initials: 'HN',
    color: 'from-purple-500 to-violet-400',
    source: 'Hacker News',
    sourceUrl: 'https://news.ycombinator.com/item?id=40167461',
  },
]

function QuoteIcon() {
  return (
    <svg
      className="mb-4 h-8 w-8 text-brandPrimary/40"
      fill="currentColor"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4 text-center">
          <BadgeWithGradient variant="outline">Community</BadgeWithGradient>
          <h2 className="bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent">
            What engineers are saying
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Developers and teams across the industry rely on OpenLIT for LLM observability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background flex flex-col rounded-xl border border-stone-200 p-6 dark:border-stone-800"
            >
              <QuoteIcon />
              <p className="text-muted-foreground mb-6 flex-1 text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-xs transition-colors hover:text-brandPrimary"
                >
                  {t.source} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
