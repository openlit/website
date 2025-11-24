'use client'
import { GithubProvider } from 'contexts/github'

import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import Checkers from '@/components/home/checkers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GithubProvider>
      <Checkers />
      <Header />
      {children}
      <Footer />
    </GithubProvider>
  )
}
