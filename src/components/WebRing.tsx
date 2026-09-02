import { useEffect, useState } from 'react'
import { profile } from '../data/content'

interface RingMember {
  id: string
  name: string
  url: string
}

interface RingData {
  prev: RingMember
  member: RingMember
  next: RingMember
}

/**
 * UMass Amherst Web Ring integration.
 *
 * Rather than the provided <script> tag (which the ring warns can misbehave
 * inside frameworks like React), we fetch the JSON API directly:
 *   GET https://umaring.github.io/<id>.json  ->  { prev, member, next }
 *
 * Renders nothing if the id isn't a member yet or the request fails, so it
 * never leaves a broken widget on the page.
 */
export function WebRing() {
  const id = profile.webringId
  const [data, setData] = useState<RingData | null>(null)

  useEffect(() => {
    if (!id) return
    let active = true
    fetch(`https://umaring.github.io/${id}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('not a member'))))
      .then((d: RingData) => {
        if (active) setData(d)
      })
      .catch(() => {
        /* not a member yet / offline - render nothing */
      })
    return () => {
      active = false
    }
  }, [id])

  if (!data) return null

  return (
    <nav
      aria-label="UMass Amherst Web Ring"
      className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        UMass Web Ring
      </span>
      <a
        href={data.prev.url}
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-ink"
        title={data.prev.name}
      >
        &larr; {data.prev.name}
      </a>
      <a
        href="https://umaring.github.io/"
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-primary-soft"
      >
        ring
      </a>
      <a
        href={data.next.url}
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-ink"
        title={data.next.name}
      >
        {data.next.name} &rarr;
      </a>
    </nav>
  )
}
