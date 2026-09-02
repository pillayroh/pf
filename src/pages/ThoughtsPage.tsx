import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function ThoughtsPage() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-5 pt-28 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,66,75,0.18), transparent)',
        }}
      />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs tracking-[0.2em] text-primary-soft">
          <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
          MY THOUGHTS
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          Blogs Coming soon
        </h1>
      </motion.div>
    </section>
  )
}
