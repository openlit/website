import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ProductDemo from '@/components/product-demo/product-demo'
import { EXPLORE_PATH } from 'constants/product-demo'

export default function ProductExplorer({
  heading = true,
  fullPageLink = true,
  embedded = false,
}: {
  heading?: boolean
  fullPageLink?: boolean
  embedded?: boolean
}) {
  if (!heading) {
    return (
      <div className="h-[min(920px,calc(100vh-6.5rem))] min-h-[36rem]">
        <ProductDemo />
      </div>
    )
  }

  const intro = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
          Product tour
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300 md:text-base">
          The OpenLIT Enterprise UI, filled with sample data from Northwind. Use the sidebar, Apps,
          and Settings the same way you would in the product. Nothing you change is saved.
        </p>
      </div>
      {fullPageLink ? (
        <Link
          href={EXPLORE_PATH}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brandPrimary hover:underline"
        >
          Open full page
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  )

  const demo = (
    <div className="mt-6 h-[min(760px,calc(100vh-6rem))] min-h-[34rem]">
      <ProductDemo />
    </div>
  )

  if (embedded) {
    return (
      <div id="explore" className="w-full scroll-mt-24">
        {intro}
        {demo}
      </div>
    )
  }

  return (
    <section
      id="explore"
      className="w-full scroll-mt-24 border-t border-stone-200 bg-stone-50 px-4 py-14 dark:border-stone-800 dark:bg-stone-900/40 md:py-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        {intro}
        {demo}
      </div>
    </section>
  )
}
