import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

import Image from 'next/image'

const Item = ({ link, text, target }: { link?: string; text?: string; target?: string }) =>
  link &&
  text && (
    <a className="opacity-60 hover:text-brandPrimary hover:opacity-100" href={link} target={target}>
      {text}
    </a>
  )

export default function Footer() {
  return (
    <footer id="footer">
      <section className="container grid grid-cols-2 gap-x-12 gap-y-8 pb-20 pt-10 md:grid-cols-4 xl:grid-cols-6">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="flex items-center text-xl font-bold">
            <Image
              className="size-10 flex-shrink-0 p-1 transition duration-75"
              src="/static/images/logo.png"
              alt="openlit's Logo"
              priority
              width={24}
              height={24}
            />
            {siteMetadata.headerTitle}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Follow US</h3>
          <Item link={siteMetadata.github} text="Github" />
          <Item link={siteMetadata.twitter} text="Twitter" />
          <Item link={siteMetadata.email} text="Email" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Product</h3>
          <Item link={'https://github.com/openlit/openlit/blob/main/SECURITY.md'} text="Security" />
          <Item
            link={'https://github.com/openlit/openlit/blob/main/CONTRIBUTING.md'}
            text="Contributing"
          />
          <Item link={'https://github.com/openlit/openlit/blob/main/README.md'} text="Readme" />
          <Item link={siteMetadata.feedbackLink} text="Feedback" target="_blank" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Documentation</h3>
          <Item link={'https://docs.openlit.io/latest/introduction'} text="Introduction" />
          <Item link={'https://docs.openlit.io/latest/installation'} text="Installation" />
          <Item link={'https://docs.openlit.io/latest/configuration'} text="Configuration" />
          <Item
            link={'https://docs.openlit.io/latest/integrations/introduction'}
            text="Integrations"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Community</h3>
          <Item link={siteMetadata.slack} text="Slack" />
          <Item link={siteMetadata.twitter} text="Twitter" />
          <Item link={siteMetadata.github} text="Github" />
          <Item link={siteMetadata.discord} text="Discord" />
        </div>
      </section>

      <section className="container pb-8 text-center">
        <div className="mb-3 flex justify-center space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
        </div>
        <h3>
          &copy; 2023 Observability tool by{' '}
          <a
            target="_blank"
            href={siteMetadata.github}
            className="text-primary border-primary transition-all hover:border-b-2"
          >
            OpenLIT
          </a>
        </h3>
      </section>
    </footer>
  )
}
