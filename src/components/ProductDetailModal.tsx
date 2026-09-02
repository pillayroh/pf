import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import type { Product } from '../data/content'
import { profile } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'
import { ProductWorkflowVisual } from './ProductWorkflowVisual'

interface Props {
  product: Product | null
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: Props) {
  const reduced = usePrefersReducedMotion()
  const { play } = useSound()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const open = Boolean(product)

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
      {product && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
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
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-line bg-surface-2 p-6 outline-none sm:rounded-2xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full border border-line bg-base/60 px-2 py-0.5 font-mono text-[10px] tracking-wide text-primary-soft">
                  {product.category}
                </span>
                <h3
                  id="product-modal-title"
                  className="mt-2 text-2xl font-semibold text-ink"
                >
                  {product.title}
                </h3>
                <p className="text-sm text-muted">{product.subtitle}</p>
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

            <div className="mt-5">
              <ProductWorkflowVisual visual={product.visual} />
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <Block title="Customer problem" body={product.problem} />
              <Block title="User / customer context" body={product.userContext} />
              <Block title="What I built" body={product.built} />
              <div>
                <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  Product thinking
                </h4>
                <ul className="space-y-1.5">
                  {product.approach.map((a) => (
                    <li key={a} className="flex gap-2 text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {product.impact.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-line bg-base/50 p-3 text-center"
                >
                  <div className="font-mono text-base font-semibold text-success">
                    {m.value}
                  </div>
                  <div className="mt-0.5 text-[10px] leading-tight text-faint">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* deep-dive note */}
            <div className="mt-5 rounded-xl border border-line bg-base/50 p-4">
              <p className="text-sm text-muted">
                The full written case study - customer problem, product
                decisions, tradeoffs, and measurable outcomes - is being
                documented.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(
                    `Chat about ${product.title}`,
                  )}`}
                  onClick={() => play('confirm')}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Let&apos;s connect
                </a>
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => play('tick')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm text-ink transition-colors hover:border-primary/50"
                  >
                    {product.linkLabel ?? 'View live'}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h4 className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        {title}
      </h4>
      <p className="text-muted">{body}</p>
    </div>
  )
}
