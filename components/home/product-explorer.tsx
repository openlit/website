import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MarkedWord } from '@/components/common/marker-underline'
import ProductDemo from '@/components/product-demo/product-demo'
import { EXPLORE_PATH } from 'constants/product-demo'

export default function ProductExplorer({
  heading = true,
  fullPageLink = true,
}: {
  heading?: boolean
  fullPageLink?: boolean
}) {
  if (!heading) {
    return (
      <div className="h-[min(920px,calc(100vh-6.5rem))] min-h-[36rem]">
        <ProductDemo />
      </div>
    )
  }

  return (
    <section
      id="explore"
      className="w-full scroll-mt-24 border-t border-stone-200 bg-stone-50 px-4 py-14 dark:border-stone-800 dark:bg-stone-900/40 md:py-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        {heading ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Interactive product
              </p>
              <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-stone-950 dark:text-stone-50 md:text-4xl">
                Explore <MarkedWord>Enterprise</MarkedWord>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300 md:text-base">
                The OpenLIT Enterprise UI, filled with sample data from Northwind. Use the sidebar,
                Apps, and Settings the same way you would in the product. Nothing you change is
                saved.
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
        ) : null}
        <div className="mt-6 h-[min(760px,calc(100vh-6rem))] min-h-[34rem]">
          <ProductDemo />
        </div>
      </div>
    </section>
  )
}
