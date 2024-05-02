import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'
export default function About() {
  return (
    <section id="about" className="container py-20">
      <div className="bg-muted/50 rounded-lg py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <Image
            src="/static/images/about-rocket.png"
            width={300}
            height={300}
            alt="Rocket"
            className="w-[300px] rounded-lg object-contain"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                <span className="bg-brandPrimary bg-clip-text text-transparent">About </span>
                Company
              </h2>
              <p className="text-muted-foreground mt-4 text-xl">{siteMetadata.about}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
