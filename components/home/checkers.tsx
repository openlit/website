'use client'
import { cn } from 'lib/utils'
import { motion } from 'motion/react'

export default function Checkers() {
  return (
    <div className="fixed z-[-1] h-full w-full bg-white dark:bg-black">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e4e4e7_0.5px,transparent_0.5px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_0.5px,transparent_0.5px),linear-gradient(to_bottom,#262626_0.5px,transparent_0.5px)]'
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-20 top-20 h-20 w-20 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-500/40 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute right-32 top-40 h-32 w-32 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/30 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-40 left-1/3 h-16 w-16 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/30 blur-xl"
        />
      </div>
    </div>
  )
}
