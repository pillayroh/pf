import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'
import { blogPosts, thoughts } from '../data/content'
import { BlogPostCard } from '../components/BlogPostCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function ThoughtsPage() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <section className="relative mx-auto min-h-[70vh] max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[360px] w-[560px] max-w-full -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,66,75,0.18), transparent)',
        }}
      />

      <motion.header
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs tracking-[0.2em] text-primary-soft">
          <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
          {thoughts.eyebrow}
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
          {thoughts.heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {thoughts.supporting}
        </p>
      </motion.header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <BlogPostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}
