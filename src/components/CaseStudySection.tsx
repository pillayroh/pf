import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileSearch } from 'lucide-react'
import {
  caseFilters,
  caseStudies,
  type CaseFilterId,
  type CaseStudy,
} from '../data/content'
import { CaseStudyCard } from './CaseStudyCard'
import { ComingSoonModal } from './ComingSoonModal'
import { FilterTabs } from './FilterTabs'
import { ProductPrinciplesPanel } from './ProductPrinciplesPanel'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function CaseStudySection() {
  const [active, setActive] = useState<CaseFilterId>('all')
  const [selected, setSelected] = useState<CaseStudy | null>(null)

  const counts = useMemo(() => {
    const c = {} as Record<CaseFilterId, number>
    caseFilters.forEach((f) => {
      c[f.id] =
        f.id === 'all'
          ? caseStudies.length
          : caseStudies.filter((s) => s.category === f.id).length
    })
    return c
  }, [])

  const visible = useMemo(
    () =>
      active === 'all'
        ? caseStudies
        : caseStudies.filter((s) => s.category === active),
    [active],
  )

  return (
    <section id="case-studies" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          label="02 / PRODUCT THINKING"
          heading="Notes from building, observing, and improving products."
          supporting="This is where I break down product decisions, customer problems, AI workflows, experiments, and the lessons that shape how I build."
        />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: filter + cards */}
          <div>
            <Reveal>
              <FilterTabs active={active} onChange={setActive} counts={counts} />
            </Reveal>

            <motion.div layout className="mt-6 flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {visible.map((study, i) => (
                  <CaseStudyCard
                    key={study.id}
                    study={study}
                    featured={i === 0}
                    onOpen={setSelected}
                  />
                ))}
              </AnimatePresence>

              {visible.length === 0 && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface/40 px-6 py-14 text-center"
                >
                  <FileSearch className="h-8 w-8 text-faint" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium text-ink">
                    Nothing here yet in this category.
                  </p>
                  <p className="mt-1 max-w-xs text-sm text-muted">
                    New writing is in progress. Try another filter or check back
                    soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActive('all')}
                    className="mt-4 rounded-lg border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-primary/50"
                  >
                    View all
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right: sticky principles */}
          <ProductPrinciplesPanel />
        </div>
      </div>

      <ComingSoonModal study={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
