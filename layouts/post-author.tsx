import { Authors } from 'contentlayer/generated'
import Image from 'next/image'
import Link from '@/components/common/link'
import { CoreContent } from 'pliny/utils/contentlayer'

export default function PostAuthor({ authorDetails }: { authorDetails: CoreContent<Authors>[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-8 py-4 xl:space-x-0">
      {authorDetails.map((author) => (
        <li className="flex items-center space-x-2" key={author.name}>
          {author.avatar && (
            <Image
              src={author.avatar}
              width={38}
              height={38}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          )}
          <dl className="whitespace-nowrap text-sm font-medium leading-5">
            <dt className="sr-only">Name</dt>
            <dd className="text-stone-900 dark:text-stone-100">{author.name}</dd>
            <dt className="sr-only">Twitter</dt>
            <dd>
              {author.twitter && (
                <Link
                  href={author.twitter}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {author.twitter
                    .replace('https://twitter.com/', '@')
                    .replace('https://x.com/', '@')}
                </Link>
              )}
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  )
}
