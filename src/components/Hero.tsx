import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { hero, rolesSeeking } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { EASE_OUT } from '../lib/motion'

export function Hero() {
  const prefersReduced = usePrefersReducedMotion()

  const fade = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE_OUT },
        }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-16 pt-24 text-center sm:px-8"
    >
      {/* soft centered glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[130px]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,66,75,0.18), transparent)',
        }}
      />

      <div className="flex max-w-2xl flex-col items-center">
        <motion.span
          {...fade(0)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-primary-soft"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          {...fade(0.14)}
          className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          {hero.name}
        </motion.h1>

        <motion.p
          {...fade(0.2)}
          className="mt-4 max-w-xl text-balance font-serif text-base italic leading-relaxed text-muted sm:text-lg"
        >
          {hero.description}
        </motion.p>

        <motion.div {...fade(0.28)} className="mt-8 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/[0.07] px-3 py-1 text-xs font-medium text-success">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Actively interviewing for full-time roles
          </span>

          <ul className="mt-4 flex max-w-lg flex-wrap justify-center gap-2">
            {rolesSeeking.map((role) => (
              <li
                key={role}
                className="rounded-lg border border-line bg-surface/50 px-2.5 py-1 text-sm text-ink/90 transition-colors hover:border-primary/40"
              >
                {role}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
