import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { EASE_OUT } from '../lib/motion'

interface RevealProps {
  children: ReactNode
  /** stagger delay in seconds */
  delay?: number
  /** vertical offset to animate from */
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

/**
 * Scroll-triggered fade + slight upward motion. Respects reduced motion by
 * rendering fully visible with no transform.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion()
  const MotionTag = motion[as]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  )
}
