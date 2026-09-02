import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  label: string
  heading: string
  supporting?: string
  children?: ReactNode
}

/**
 * Consistent section eyebrow + heading used across the page so every
 * section reads like part of the same product surface.
 */
export function SectionHeader({
  label,
  heading,
  supporting,
  children,
}: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.28em] text-primary">
            {label}
          </span>
          <span className="h-px flex-1 bg-line/80" aria-hidden="true" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
          {heading}
        </h2>
      </Reveal>
      {supporting && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {supporting}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}
