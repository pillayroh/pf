import { useCallback, useEffect, useState, type RefObject } from 'react'

interface HProgress {
  progress: number
  canScrollLeft: boolean
  canScrollRight: boolean
}

/**
 * Tracks horizontal scroll progress (0..1) of a scroll container plus
 * whether it can scroll further in each direction. Drives the carousel
 * progress bar and arrow-button enabled states.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
): HProgress {
  const [state, setState] = useState<HProgress>({
    progress: 0,
    canScrollLeft: false,
    canScrollRight: true,
  })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const left = el.scrollLeft
    const progress = max > 0 ? Math.min(1, Math.max(0, left / max)) : 0
    setState({
      progress,
      canScrollLeft: left > 2,
      canScrollRight: left < max - 2,
    })
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [ref, measure])

  return state
}
