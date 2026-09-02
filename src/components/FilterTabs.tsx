import { motion } from 'framer-motion'
import { caseFilters, type CaseFilterId } from '../data/content'
import { useSound } from '../hooks/useSound'

interface Props {
  active: CaseFilterId
  onChange: (id: CaseFilterId) => void
  counts: Record<CaseFilterId, number>
}

export function FilterTabs({ active, onChange, counts }: Props) {
  const { play } = useSound()
  return (
    <div
      role="tablist"
      aria-label="Filter product thinking"
      className="flex flex-wrap gap-2"
    >
      {caseFilters.map((f) => {
        const isActive = active === f.id
        return (
          <button
            key={f.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => {
              play('tick')
              onChange(f.id)
            }}
            className={`relative rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? 'border-primary/50 text-ink'
                : 'border-line text-muted hover:border-line hover:text-ink'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 -z-10 rounded-lg bg-primary/12"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {f.label}
            <span className="ml-1.5 font-mono text-[11px] text-faint">
              {counts[f.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
