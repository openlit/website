'use client'

import Image from 'next/image'
import { Tabs } from '../ui/tabs'

export default function Previews() {
  const tabs = [
    {
      title: 'Dashboard',
      value: 'dashboard',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brandPrimary to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p className="text-center">Dashboard Page</p>
          <PreviewImage type="dashboard" />
        </div>
      ),
    },
    {
      title: 'Request',
      value: 'request',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brandPrimary to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p className="text-center">Request Page</p>
          <PreviewImage type="request" />
        </div>
      ),
    },
    {
      title: 'Database Config',
      value: 'db-config',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brandPrimary to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p className="text-center">Database Config Page</p>
          <PreviewImage type="db-config" />
        </div>
      ),
    },
    {
      title: 'Getting Started',
      value: 'getting-started',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brandPrimary to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p className="text-center">Getting Started Page</p>
          <PreviewImage type="getting-started" />
        </div>
      ),
    },
  ]

  return (
    <section id="previews" className="container pb-20">
      <div className="bg-muted/50 rounded-lg">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          <span className="bg-brandPrimary bg-clip-text text-transparent">Product </span>
          Previews
        </h2>
        <div className="b relative mx-auto flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] md:h-[40rem]">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </section>
  )
}

const PreviewImage = ({
  type,
}: {
  type: 'dashboard' | 'request' | 'db-config' | 'getting-started'
}) => {
  return (
    <Image
      src={`/static/images/previews/${type}.png`}
      alt={type}
      width="1000"
      height="1000"
      className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top md:h-[90%]"
    />
  )
}
