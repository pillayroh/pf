import { Compass } from 'lucide-react'
import { principles, about } from '../data/content'

/**
 * Sticky "How I Build" operating-principles memo. Each principle reveals a
 * supporting line on hover/focus.
 */
export function ProductPrinciplesPanel() {
  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-line bg-surface/60 p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-base/60 text-primary-soft">
            <Compass className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink">How I Build</h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              operating principles
            </p>
          </div>
        </div>

        <ol className="mt-4 space-y-1">
          {principles.map((p, i) => (
            <li key={p.title} className="group rounded-lg p-2 transition-colors hover:bg-base/50">
              <div className="flex gap-2.5">
                <span className="mt-0.5 font-mono text-xs text-primary-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{p.title}</p>
                  <p className="mt-0.5 max-h-0 overflow-hidden text-xs italic text-muted opacity-0 transition-all duration-300 group-hover:mt-1 group-hover:max-h-16 group-hover:opacity-100 group-focus-within:mt-1 group-focus-within:max-h-16 group-focus-within:opacity-100">
                    {p.support}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Now thinking about */}
      <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-soft">
          now thinking about
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/90">
          {about.currentFocus}
        </p>
      </div>
    </aside>
  )
}
