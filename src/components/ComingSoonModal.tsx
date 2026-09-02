import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Clock, Mail, X } from 'lucide-react'
import type { CaseStudy } from '../data/content'
import { profile } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'

interface Props {
  study: CaseStudy | null
  onClose: () => void
}

export function ComingSoonModal({ study, onClose }: Props) {
  const reduced = usePrefersReducedMotion()
  const { play } = useSound()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const open = Boolean(study)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {study && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cs-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className="relative w-full max-w-lg overflow-hidden rounded-t-2xl border border-line bg-surface-2 p-6 outline-none sm:rounded-2xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(245,180,92,0.25), transparent)' }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-soft">
                  {study.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-warm/40 px-2 py-0.5 text-[10px] text-warm">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  {study.status}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <h3 id="cs-modal-title" className="mt-3 text-xl font-semibold text-ink">
              {study.title}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-muted">
              <p className="text-ink">This case study is currently being written.</p>
              <p>
                I&apos;m documenting the customer problem, product decisions,
                tradeoffs, and measurable outcomes - not just the final result.
              </p>
            </div>

            {study.keyLearning && (
              <div className="mt-4 rounded-xl border border-line bg-base/50 p-3">
                <p className="text-sm italic text-ink/90">
                  &ldquo;{study.keyLearning}&rdquo;
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {study.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-base/40 px-2 py-0.5 text-[11px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  `Let's discuss: ${study.title}`,
                )}`}
                onClick={() => play('confirm')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Want to discuss this work? Let&apos;s connect.
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => play('tick')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm text-ink transition-colors hover:border-primary/50"
              >
                LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-faint">
              <Clock className="h-3 w-3" aria-hidden="true" />
              Planned {study.readingTime}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
