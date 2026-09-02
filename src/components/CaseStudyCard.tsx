import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Lightbulb } from 'lucide-react'
import type { CaseStatus, CaseStudy } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'
import { CaseMotif } from './CaseMotif'

interface Props {
  study: CaseStudy
  /** feature the first card with a larger layout */
  featured?: boolean
  onOpen: (study: CaseStudy) => void
}

const statusStyles: Record<CaseStatus, string> = {
  'Coming Soon': 'border-warm/40 text-warm',
  Drafting: 'border-secondary/40 text-secondary',
  Published: 'border-success/40 text-success',
}

export function CaseStudyCard({ study, featured, onOpen }: Props) {
  const { play } = useSound()
  const reduced = usePrefersReducedMotion()

  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-primary/40 ${
        featured ? 'sm:p-6' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => {
          play('soft')
          onOpen(study)
        }}
        className="absolute inset-0 z-10"
        aria-label={`Open ${study.title}`}
      />

      <div className="flex items-start gap-4">
        <CaseMotif motif={study.motif} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-soft">
              {study.type}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${statusStyles[study.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {study.status}
            </span>
          </div>
          <h3
            className={`mt-2 font-semibold text-ink ${featured ? 'text-xl' : 'text-lg'}`}
          >
            {study.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {study.description}
      </p>

      {study.keyLearning && featured && (
        <div className="mt-4 rounded-xl border border-line bg-base/50 p-3">
          <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-success">
            <Lightbulb className="h-3 w-3" aria-hidden="true" />
            Key learning
          </div>
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

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-faint">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {study.readingTime}
        </span>
        <span className="relative z-20 inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-primary-soft">
          Read
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  )
}
