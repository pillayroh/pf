import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { introGreeting } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const STORAGE_KEY = 'intro:seen'

/**
 * A brief "Oh, Hey There" splash shown once per session when the site first
 * loads. Auto-dismisses after ~2s; also dismissable by click / Escape.
 */
export function IntroOverlay() {
  const reduced = usePrefersReducedMotion()
  // Decide synchronously (before first paint) so the opaque splash is present
  // immediately - avoids any flash of the hero underneath it.
  const [show, setShow] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== '1'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = ''
      return
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShow(false)
    }
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => setShow(false), 1100)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeIn' }}
          onClick={() => setShow(false)}
          role="dialog"
          aria-label="Welcome"
        >
          {/* ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[120px]"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(closest-side, rgba(240,66,75,0.22), transparent)',
            }}
          />

          <motion.div
            className="relative flex flex-col items-center px-6 text-center"
            variants={
              reduced
                ? {
                    hidden: { opacity: 0 },
                    show: { opacity: 1 },
                    zoom: { opacity: 0 },
                  }
                : {
                    hidden: { opacity: 0, scale: 0.85 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    },
                    zoom: {
                      opacity: 0,
                      scale: 3,
                      transition: { duration: 0.55, ease: [0.5, 0, 0.75, 0] },
                    },
                  }
            }
            initial="hidden"
            animate="show"
            exit="zoom"
          >
            <span
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface text-2xl"
              aria-hidden="true"
            >
              👋
            </span>

            <h1 className="font-serif text-4xl font-medium italic tracking-tight text-ink sm:text-6xl">
              {introGreeting}
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
