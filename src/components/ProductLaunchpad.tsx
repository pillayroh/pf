import { useCallback, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, FlaskConical, Rocket } from 'lucide-react'
import { products, type Product } from '../data/content'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useSound } from '../hooks/useSound'
import { ProductCard } from './ProductCard'
import { ProductDetailModal } from './ProductDetailModal'
import { SectionHeader } from './SectionHeader'

export function ProductLaunchpad() {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const { progress, canScrollLeft, canScrollRight } =
    useScrollProgress(scrollerRef)
  const { play } = useSound()
  const [selected, setSelected] = useState<Product | null>(null)

  // pointer drag-to-scroll (mouse)
  const drag = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    captured: false,
    pointerId: -1,
  })

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const el = scrollerRef.current
      if (!el) return
      play('tick')
      const amount = Math.min(el.clientWidth * 0.85, 360)
      el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    },
    [play],
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByCard(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByCard(-1)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    // only drag with primary mouse button; leave touch to native scroll
    if (e.pointerType !== 'mouse') return
    const el = scrollerRef.current
    if (!el) return
    // Note: do NOT capture the pointer here - capturing on a plain click
    // swallows clicks on child links/buttons. We capture only once a real
    // drag begins (see onPointerMove).
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
      captured: false,
      pointerId: e.pointerId,
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return
    const el = scrollerRef.current
    if (!el) return
    const dx = e.clientX - drag.current.startX
    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true
      try {
        el.setPointerCapture(drag.current.pointerId)
        drag.current.captured = true
      } catch {
        /* ignore */
      }
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    if (drag.current.captured) {
      try {
        scrollerRef.current?.releasePointerCapture(drag.current.pointerId)
      } catch {
        /* ignore */
      }
      drag.current.captured = false
    }
  }

  return (
    <section id="products" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="PRODUCTS IN THE WILD"
            heading="Things I've built to solve real problems."
            supporting="Each project begins with a user, a workflow, or a business problem - not a technology looking for a use case."
          />

          <div className="flex flex-col gap-3 sm:items-end">
            {/* legend: product vs project */}
            <div className="flex items-center gap-3 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Rocket className="h-3 w-3 text-success" aria-hidden="true" />
                Product
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FlaskConical className="h-3 w-3 text-primary-soft" aria-hidden="true" />
                Project
              </span>
            </div>

            {/* arrow controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous projects"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink transition-colors enabled:hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Next projects"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink transition-colors enabled:hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Product carousel. Use left and right arrow keys to scroll."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // suppress click if a drag just happened
          if (drag.current.moved) {
            e.stopPropagation()
            e.preventDefault()
            drag.current.moved = false
          }
        }}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-6 [scrollbar-width:none] sm:px-8"
        style={{ cursor: 'grab', scrollPaddingLeft: '2rem' }}
      >
        {/* left rail spacer to align first card with content */}
        <div className="hidden shrink-0 lg:block" style={{ width: 'max(0px, calc((100vw - 72rem) / 2))' }} aria-hidden="true" />
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            onOpen={setSelected}
          />
        ))}
        <div className="shrink-0 pr-1 sm:pr-4" aria-hidden="true" />
      </div>

      {/* progress indicator */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-line/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-150"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>

      <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
