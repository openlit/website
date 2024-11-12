'use client'

import React from 'react'
import { InfiniteMovingCards } from '../ui/infinite-moving-cards'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'

export default function LatestBlogs({ posts }: { posts: CoreContent<Blog>[] }) {
  if (!posts?.length) return null
  const items = posts.map((post) => {
    const { title, summary, authors, date } = post
    return {
      quote: summary || '',
      name: authors?.join(' , ') || '',
      title,
      date,
    }
  })

  return (
    <section id="latest-blogs" className="container px-0 pb-16">
      <div className="bg-muted/50 rounded-lg">
        <h2 className="font-cal mt-2 text-3xl text-gray-900 dark:text-gray-100 sm:text-4xl text-center">
          Latest Blogs
        </h2>
        <div className="dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased dark:bg-black">
          <InfiniteMovingCards items={items} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote:
      'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.',
    name: 'Charles Dickens',
    title: 'A Tale of Two Cities',
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: 'William Shakespeare',
    title: 'Hamlet',
  },
  {
    quote: 'All that we see or seem is but a dream within a dream.',
    name: 'Edgar Allan Poe',
    title: 'A Dream Within a Dream',
  },
  {
    quote:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    name: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    quote:
      'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    name: 'Herman Melville',
    title: 'Moby-Dick',
  },
]
