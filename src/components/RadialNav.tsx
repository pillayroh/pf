import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { siteNav, useSiteNav, type NavItem } from '../lib/siteNav'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'

interface Props {
  /** id of the currently active nav item, for ring highlight */
  activeId: string
}

const SIZE = 168
const CX = SIZE / 2
const CY = SIZE / 2
const R_OUTER = 80
const R_INNER = 46
const GAP = 4 // degrees between wedges

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const
}

function wedgePath(a0: number, a1: number) {
  const [x0o, y0o] = polar(a0, R_OUTER)
  const [x1o, y1o] = polar(a1, R_OUTER)
  const [x1i, y1i] = polar(a1, R_INNER)
  const [x0i, y0i] = polar(a0, R_INNER)
  return `M ${x0o} ${y0o} A ${R_OUTER} ${R_OUTER} 0 0 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${R_INNER} ${R_INNER} 0 0 0 ${x0i} ${y0i} Z`
}

export function RadialNav({ activeId }: Props) {
  const navigateTo = useSiteNav()
  const { play } = useSound()
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<NavItem | null>(null)
  const closeTimer = useRef<number | null>(null)

  const n = siteNav.length
  const seg = 360 / n
  const centerItem =
    hovered ?? siteNav.find((s) => s.id === activeId) ?? siteNav[0]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (item: NavItem) => {
    play('tick')
    navigateTo(item)
    setOpen(false)
  }

  // hover intent (desktop only - pointer:fine)
  const canHover =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches

  const openOnHover = () => {
    if (!canHover) return
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeOnLeave = () => {
    if (!canHover) return
    closeTimer.current = window.setTimeout(() => setOpen(false), 250)
  }

  return (
    <>
      {/* click-catcher to close when open (mobile / outside click) */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close navigator"
            tabIndex={-1}
            className="fixed inset-0 z-30 cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav
        aria-label="Section navigator"
        className="fixed bottom-5 right-4 z-40 sm:bottom-7 sm:right-7"
        onMouseEnter={openOnHover}
        onMouseLeave={closeOnLeave}
      >
        <AnimatePresence mode="popLayout">
          {open ? (
            <motion.div
              key="pie"
              className="relative"
              style={{
                width: SIZE * 0.74,
                height: SIZE * 0.74,
                transformOrigin: 'bottom right',
              }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              {/* ambient green glow */}
              <div
                className="pointer-events-none absolute -inset-3 -z-10 rounded-full opacity-70 blur-2xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(70,196,138,0.3), transparent)',
                }}
                aria-hidden="true"
              />

              <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
                role="menu"
                aria-label="Jump to section"
              >
                <circle cx={CX} cy={CY} r={R_OUTER + 1} fill="#0B0F14" opacity={0.94} />
                {siteNav.map((item, i) => {
                  const a0 = -90 + i * seg + GAP / 2
                  const a1 = -90 + (i + 1) * seg - GAP / 2
                  const mid = (a0 + a1) / 2
                  const [ix, iy] = polar(mid, (R_OUTER + R_INNER) / 2)
                  const isActive = item.id === activeId
                  const isHovered = hovered?.id === item.id
                  const Icon = item.icon
                  return (
                    <g
                      key={item.id}
                      role="menuitem"
                      tabIndex={0}
                      aria-label={item.label}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => go(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          go(item)
                        }
                      }}
                      onMouseEnter={() => setHovered(item)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(item)}
                      onBlur={() => setHovered(null)}
                      className="cursor-pointer outline-none"
                    >
                      <path
                        d={wedgePath(a0, a1)}
                        fill={
                          isHovered
                            ? 'rgba(70,196,138,0.92)'
                            : isActive
                              ? 'rgba(70,196,138,0.3)'
                              : '#141A22'
                        }
                        stroke={isActive || isHovered ? '#7FE3B0' : '#26303B'}
                        strokeWidth={1}
                        className="transition-[fill,stroke] duration-200"
                      />
                      <foreignObject x={ix - 11} y={iy - 11} width={22} height={22}>
                        <div className="flex h-[22px] w-[22px] items-center justify-center">
                          <Icon
                            className={`h-[15px] w-[15px] ${
                              isHovered
                                ? 'text-base'
                                : isActive
                                  ? 'text-success'
                                  : 'text-muted'
                            }`}
                          />
                        </div>
                      </foreignObject>
                    </g>
                  )
                })}
              </svg>

              {/* center label / close */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-[42%] w-[42%] flex-col items-center justify-center rounded-full border border-line bg-base/95 text-center">
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                    go to
                  </span>
                  <span className="px-1 text-[10px] font-semibold leading-tight text-ink">
                    {centerItem.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="launcher"
              type="button"
              onClick={() => {
                play('tick')
                setOpen(true)
              }}
              aria-label="Open section navigator"
              className="relative flex items-center justify-center rounded-full border border-success/50 bg-base/80 text-success shadow-[0_10px_30px_-8px_rgba(70,196,138,0.6)] backdrop-blur-sm"
              style={{ height: 52, width: 52 }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              whileHover={reduced ? undefined : { scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {!reduced && (
                <span
                  className="absolute inset-0 rounded-full border border-success/40"
                  style={{ animation: 'ping 2.4s cubic-bezier(0,0,0.2,1) infinite' }}
                  aria-hidden="true"
                />
              )}
              <Compass className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
