import siteMetadata from 'data/siteMetadata'

import Image from 'next/image'
import { Github, Linkedin, Mail, Slack, Twitter, Youtube } from '../social-icons/icons'

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
        <div className="col-span-full flex flex-col gap-4 xl:col-span-2">
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
          <div className="flex gap-4">
            <a
              href={siteMetadata.github}
              className="flex w-6 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
            <a
              href={siteMetadata.twitter}
              className="flex w-6 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a>
            <a
              href={`mailto:${siteMetadata.email}`}
              className="flex w-6 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail />
            </a>
            <a
              href={siteMetadata.linkedin}
              className="flex w-6 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </a>
            <a
              href={siteMetadata.youtube}
              className="flex w-6 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube />
            </a>
            <a
              href={siteMetadata.slack}
              className="flex w-6 shrink-0 items-center justify-center fill-current opacity-60 hover:text-brandPrimary hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Slack color="currentColor" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Documentation</h3>
          <Item link={'https://docs.openlit.io/latest/overview'} text="Introduction" />
          <Item link={'https://docs.openlit.io/latest/sdk/overview'} text="Sdk Overview" />
          <Item
            link={'https://docs.openlit.io/latest/operator/overview'}
            text="Kubernetes Operator"
          />
          <Item
            link={'https://docs.openlit.io/latest/sdk/integrations/overview'}
            text="Integrations"
          />
          <Item
            link={'https://docs.openlit.io/latest/sdk/destinations/overview'}
            text="Destinations"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Features</h3>
          <Item link={'https://docs.openlit.io/latest/sdk/features/gpu'} text="GPU Monitoring" />
          <Item
            link={'https://docs.openlit.io/latest/sdk/features/evaluations'}
            text="Evaluations"
          />
          <Item
            link={'https://docs.openlit.io/latest/openlit/observability/fleet-hub'}
            text="Fleet Hub"
          />
          <Item
            link={'https://docs.openlit.io/latest/openlit/prompts-experiments/prompt-hub'}
            text="Prompt Hub"
          />
          <Item
            link={'https://docs.openlit.io/latest/openlit/developer-resources/vault'}
            text="Vault Hub"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">About</h3>
          <Item link={'/about-us'} text="About us" />
          <Item link={'/blogs'} text="Blogs" />
          <Item link={'https://opencollective.com/openlit'} text="Support Us" />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Legal</h3>
          <Item link={'https://github.com/openlit/openlit/blob/main/SECURITY.md'} text="Security" />
          <Item
            link={'https://github.com/openlit/openlit/blob/main/CONTRIBUTING.md'}
            text="Contributing"
          />
          <Item link={'https://github.com/openlit/openlit/blob/main/README.md'} text="Readme" />
          <Item link={'https://github.com/openlit/openlit/blob/main/LICENSE'} text="License" />
          <Item
            link={'https://github.com/openlit/openlit/blob/main/CODE_OF_CONDUCT.md'}
            text="Code of Conduct"
          />
        </div>
      </section>

      <section className="container pb-8 text-center">
        <h3>
          &copy; {new Date().getFullYear()} AI Engineering Platform by{' '}
          <a
            target="_blank"
            href={siteMetadata.github}
            className="border-brandPrimary text-brandPrimary transition-all hover:border-b-2"
          >
            OpenLIT
          </a>
        </h3>
      </section>
    </footer>
  )
}
