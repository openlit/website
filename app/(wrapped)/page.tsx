'use client'
import Hero from '@/components/home/hero'
import Sponsored from '@/components/home/sponsored'
import ProductDetails from '@/components/home/product-details'
import { Integration } from '@/components/home/integration'
import { Community } from '@/components/home/community'
import ReadyToGetStarted from '@/components/common/ready-to-get-started'

export default function Page() {
  return (
    <main className="mb-auto overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-between">
        <Hero />
        <Sponsored />
        <ProductDetails />
        <Integration />
        <Community />
        <ReadyToGetStarted className="px-4" />
      </div>
    </main>
  )
}

export const runtime = 'edge'
