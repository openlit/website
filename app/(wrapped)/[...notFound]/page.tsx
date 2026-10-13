import { notFound } from 'next/navigation'

// Catch-all so unknown URLs render (wrapped)/not-found.tsx inside the site shell.
export default function CatchAllNotFound() {
  notFound()
}

export const runtime = 'edge'
