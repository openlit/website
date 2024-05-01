import Link from '@/components/common/link'

export default function PostFooter({
  prev,
  next,
}: {
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}) {
  return (
    (next || prev) && (
      <div className="mt-2 flex justify-between border-t border-stone-200 py-4 dark:border-stone-800">
        {prev && prev.path && (
          <Link
            href={`/${prev.path}`}
            className="w-1/4 shrink-0 p-2 hover:bg-primary-50 dark:hover:bg-stone-900"
          >
            <h2 className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Previous Article
            </h2>
            <div className="text-brandPrimary hover:text-brandPrimary dark:hover:text-brandPrimary">
              <span>{prev.title}</span>
            </div>
          </Link>
        )}
        <div className="grow" />
        {next && next.path && (
          <Link
            href={`/${next.path}`}
            className="flex w-1/4 shrink-0 flex-col items-end p-2 hover:bg-primary-50 dark:hover:bg-stone-900"
          >
            <h2 className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Next Article
            </h2>
            <div className="text-brandPrimary hover:text-brandPrimary dark:hover:text-brandPrimary">
              <span>{next.title}</span>
            </div>
          </Link>
        )}
      </div>
    )
  )
}
