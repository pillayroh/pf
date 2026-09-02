import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { heroWorkflowNodes } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Ambient product workflow diagram. A pulse walks the loop in
 * sequence: Customer Problem -> Research -> Prototype -> Deploy -> Learn ->
 * Scale, tracing the connecting edges and lighting up each node in turn.
 * Static (all nodes shown) when reduced motion is set.
 */
export function HeroWorkflowVisual() {
  const prefersReduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  const nodes = [
    { x: 60, y: 56 },
    { x: 190, y: 40 },
    { x: 300, y: 108 },
    { x: 270, y: 224 },
    { x: 148, y: 258 },
    { x: 44, y: 176 },
  ]
  const n = nodes.length

  useEffect(() => {
    if (prefersReduced) return
    const t = setInterval(() => setActive((s) => (s + 1) % n), 1400)
    return () => clearInterval(t)
  }, [prefersReduced, n])

  const prev = (active - 1 + n) % n

  const edges = nodes.map((node, i) => {
    const next = nodes[(i + 1) % n]
    return { from: node, to: next, i }
  })

  const currentLabel = heroWorkflowNodes[active]

  return (
    <div className="relative">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 60% 40%, rgba(240,66,75,0.22), transparent 70%), radial-gradient(50% 50% at 30% 80%, rgba(194,80,107,0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-4 shadow-glow backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
            how i build
          </span>
          <motion.span
            key={currentLabel}
            initial={prefersReduced ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary-soft"
          >
            {String(active + 1).padStart(2, '0')} / {currentLabel}
          </motion.span>
        </div>

        <svg
          viewBox="0 0 344 300"
          className="w-full"
          role="img"
          aria-label="Product workflow loop: Customer Problem, Research, Prototype, Deploy, Learn, Scale"
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0424B" />
              <stop offset="100%" stopColor="#C2506B" />
            </linearGradient>
          </defs>

          {/* base + active edges */}
          {edges.map(({ from, to, i }) => {
            const isTraversing = !prefersReduced && i === prev
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#26303B"
                  strokeWidth={1.5}
                />
                {isTraversing && (
                  <motion.line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="url(#edgeGrad)"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                  />
                )}
              </g>
            )
          })}

          {/* nodes */}
          {nodes.map((node, i) => {
            const isActive = i === active
            return (
              <g key={`node-${i}`}>
                {isActive && !prefersReduced && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={9}
                    fill="none"
                    stroke="#F0424B"
                    strokeWidth={1.5}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.6, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 7 : 6}
                  fill={isActive ? '#F0424B' : '#0B0F14'}
                  stroke={isActive ? '#FF6E77' : '#F0424B'}
                  strokeWidth={2}
                  className="transition-[fill,r] duration-300"
                />
                {!isActive && (
                  <circle cx={node.x} cy={node.y} r={2.5} fill="#FF6E77" />
                )}
                <text
                  x={node.x}
                  y={node.y > 230 ? node.y + 22 : node.y - 14}
                  textAnchor="middle"
                  className={isActive ? 'fill-[#E7ECF3]' : 'fill-[#8A97A6]'}
                  style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}
                >
                  {heroWorkflowNodes[i]}
                </text>
              </g>
            )
          })}

          {/* traveling pulse dot */}
          {!prefersReduced && (
            <motion.circle
              key={`dot-${active}`}
              r={3.5}
              fill="#FF6E77"
              initial={{ cx: nodes[prev].x, cy: nodes[prev].y, opacity: 0 }}
              animate={{
                cx: nodes[active].x,
                cy: nodes[active].y,
                opacity: [0, 1, 1, 0.4],
              }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          )}
        </svg>
      </div>
    </div>
  )
}
