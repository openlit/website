import siteMetadata from 'data-2/siteMetadata'
import Image from 'next/image'
export default function About() {
  return (
    <section id="about" className="container py-4">
      <div className="bg-muted/50 rounded-lg py-12">
        <div className="flex flex-col-reverse gap-8 border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-300 dark:bg-neutral-950">
          <iframe
            src="https://cards.producthunt.com/cards/products/586065"
            width="500"
            height="405"
            allowFullScreen
            style={{ border: 'none' }}
            className="w-full border-none"
            frameBorder={0}
            title="producthunt"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
