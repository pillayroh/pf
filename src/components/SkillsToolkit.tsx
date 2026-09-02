import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wrench } from 'lucide-react'
import { skillGroups } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'
import { Reveal } from './Reveal'

export function SkillsToolkit() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  const { play } = useSound()
  const reduced = usePrefersReducedMotion()
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0]

  return (
    <section className="py-4">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-base/60 text-primary-soft">
                  <Wrench className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    Product Builder Toolkit
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    grouped by how it supports building
                  </p>
                </div>
              </div>

              {/* group selector */}
              <div
                role="tablist"
                aria-label="Skill groups"
                className="flex flex-wrap gap-2"
              >
                {skillGroups.map((g) => {
                  const isActive = g.id === activeId
                  return (
                    <button
                      key={g.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => {
                        play('tick')
                        setActiveId(g.id)
                      }}
                      className={`relative rounded-lg border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
                        isActive
                          ? 'border-primary/50 text-ink'
                          : 'border-line text-muted hover:text-ink'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="skill-active"
                          className="absolute inset-0 -z-10 rounded-lg bg-primary/12"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      {g.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="mb-4 text-sm text-muted">{active.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {active.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-line bg-base/50 px-2.5 py-1 text-sm text-ink/90 transition-colors hover:border-primary/40 hover:text-ink"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
