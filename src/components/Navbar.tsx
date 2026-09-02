import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../data/content'
import { useSiteNav } from '../lib/siteNav'
import { useSound } from '../hooks/useSound'
import { SoundToggle } from './SoundToggle'

const pages = [
  { label: 'Home', path: '/' },
  { label: 'My Thoughts', path: '/thoughts' },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { play } = useSound()
  const navigate = useNavigate()
  const location = useLocation()
  const goTo = useSiteNav()
  const drawerRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const first = drawerRef.current?.querySelector<HTMLElement>('a,button')
    first?.focus()
    const btn = menuButtonRef.current
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btn?.focus()
    }
  }, [menuOpen])

  const goPage = (path: string) => {
    play('tick')
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'auto' })
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line/70 bg-base/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Wordmark */}
        <button
          type="button"
          onClick={() => goPage('/')}
          className="group flex items-center gap-2.5 rounded-lg py-1 text-left"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface font-mono text-sm font-semibold text-ink"
            aria-hidden="true"
          >
            RP
          </span>
          <span className="text-sm font-semibold text-ink">
            {profile.wordmark}
          </span>
        </button>

        {/* Desktop page links - centered on the bar */}
        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
          {pages.map((p) => {
            const isActive = location.pathname === p.path
            return (
              <li key={p.path}>
                <button
                  type="button"
                  onClick={() => goPage(p.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {p.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-page-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pl-2.5 pr-3 text-xs text-muted md:inline-flex">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {profile.statusLabel}
          </span>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => {
              play('tick')
              setMenuOpen((v) => !v)
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/60 text-ink md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-16 z-40 bg-base/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-x-0 top-16 z-40 origin-top border-b border-line bg-surface-2 px-5 pb-6 pt-2 md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <ul className="flex flex-col divide-y divide-line/70">
                {pages.map((p) => (
                  <li key={p.path}>
                    <button
                      type="button"
                      onClick={() => goPage(p.path)}
                      aria-current={
                        location.pathname === p.path ? 'page' : undefined
                      }
                      className={`flex w-full items-center justify-between py-3.5 text-left text-base ${
                        location.pathname === p.path ? 'text-primary' : 'text-ink'
                      }`}
                    >
                      {p.label}
                      <ArrowUpRight
                        className="h-4 w-4 text-faint"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-xs text-muted">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                  {profile.statusLabel}
                </span>
                <SoundToggle />
              </div>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  goTo({
                    id: 'contact',
                    label: 'Contact',
                    icon: ArrowUpRight,
                    kind: 'section',
                    target: 'contact',
                  })
                }}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white"
              >
                Let&apos;s Build
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
