import { useEffect, useState } from 'react'

/**
 * Tracks which section id is currently active in the viewport, for
 * navbar active-state highlighting. Uses IntersectionObserver.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const visibility = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio)
        }
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (best && bestRatio > 0) setActive(best)
      },
      {
        // account for fixed navbar; weight the middle band of the screen
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
