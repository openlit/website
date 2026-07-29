import { BookOpen, Zap } from 'lucide-react'
import { cn } from 'lib/utils'

export default function ReadyToGetStarted({ className }: { className?: string }) {
  return (
    <section className={cn('mx-auto mb-12 w-full max-w-6xl px-4 md:px-0', className)}>
      <div className="rounded-ui border border-stone-200 bg-white p-6 text-center dark:border-stone-800 dark:bg-black sm:p-10 md:p-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black dark:text-white">
          Get started
        </p>
        <h3 className="mb-3 text-balance text-xl font-bold tracking-tight text-black dark:text-white sm:text-2xl md:text-3xl">
          Ready to use the OpenLIT UI in production?
        </h3>
        <p className="mx-auto mb-8 max-w-2xl text-base text-black dark:text-white md:text-lg">
          Self-host or connect your stack in minutes. Same harness UI for traces, dashboards,
          prompts, and evaluations.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="https://docs.openlit.io/latest/openlit/quickstart-ai-observability"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-brandPrimary px-8 text-sm font-medium text-white transition hover:bg-primary-700 sm:w-auto"
          >
            <Zap className="mr-2 h-4 w-4" />
            Get Started Free
          </a>
          <a
            href="https://docs.openlit.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-stone-200 bg-white px-8 text-sm font-medium text-stone-800 transition hover:border-brandPrimary/40 hover:text-brandPrimary dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 sm:w-auto"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Read the Docs
          </a>
        </div>
      </div>
    </section>
  )
}
