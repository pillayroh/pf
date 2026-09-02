import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  X,
} from 'lucide-react'
import { contact, profile } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useSound } from '../hooks/useSound'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function ContactSection() {
  const { play } = useSound()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-2/70 p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-[100px]"
            aria-hidden="true"
            style={{ background: 'radial-gradient(closest-side, rgba(240,66,75,0.25), transparent)' }}
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeader
                label={contact.eyebrow}
                heading={contact.heading}
                supporting={contact.supporting}
              />

              <Reveal delay={0.1}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={profile.zoom}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => play('confirm')}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-12px_rgba(240,66,75,0.9)] transition-transform hover:-translate-y-0.5"
                  >
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    Book a call
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      play('tick')
                      setModalOpen(true)
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-primary/50"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Start a Conversation
                  </button>
                </div>
              </Reveal>
            </div>

            {/* reach-me card */}
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-line bg-surface/60 p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Find me
                </p>
                <ul className="space-y-1">
                  <ContactRow
                    href={`mailto:${profile.email}`}
                    icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                    label={profile.email}
                    onClick={() => play('tick')}
                  />
                  <ContactRow
                    href={profile.linkedin}
                    external
                    icon={<LinkedinIcon className="h-4 w-4" />}
                    label="LinkedIn"
                    onClick={() => play('tick')}
                  />
                  <ContactRow
                    href={profile.github}
                    external
                    icon={<GithubIcon className="h-4 w-4" />}
                    label="GitHub"
                    onClick={() => play('tick')}
                  />
                  <ContactRow
                    href={profile.flowIntelligenceUrl}
                    external
                    icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
                    label="Flow Intelligence on Open VSX"
                    onClick={() => play('tick')}
                  />
                  <ContactRow
                    href={profile.zoom}
                    external
                    icon={<CalendarClock className="h-4 w-4" aria-hidden="true" />}
                    label="Book a call (Zoom)"
                    onClick={() => play('tick')}
                  />
                </ul>
                <div className="mt-3 flex items-center gap-3 border-t border-line pt-3 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-faint" aria-hidden="true" />
                  Amherst, MA - open to relocation
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

function ContactRow({
  href,
  icon,
  label,
  external,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
  onClick?: () => void
}) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="group flex items-center gap-3 rounded-lg px-1.5 py-2 text-sm text-ink transition-colors hover:text-primary-soft"
      >
        <span className="text-faint transition-colors group-hover:text-primary-soft">
          {icon}
        </span>
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {external && (
          <ArrowUpRight
            className="h-3.5 w-3.5 text-faint opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </a>
    </li>
  )
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = usePrefersReducedMotion()
  const { play } = useSound()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const copyEmail = async () => {
    play('tick')
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    'Product opportunity / collaboration',
  )}&body=${encodeURIComponent(
    `Hi Rohan,\n\nI came across your portfolio and would love to talk about `,
  )}`

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className="relative w-full max-w-md overflow-hidden rounded-t-2xl border border-line bg-surface-2 p-6 outline-none sm:rounded-2xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3
                  id="contact-modal-title"
                  className="text-lg font-semibold text-ink"
                >
                  Let&apos;s build something useful
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Send a note and I&apos;ll get back to you quickly.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 rounded-lg border border-line bg-base/50 px-3 py-2.5">
              <span className="truncate text-sm text-ink">{profile.email}</span>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs text-muted transition-colors hover:text-ink"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <a
              href={mailto}
              onClick={() => play('confirm')}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Open email draft
            </a>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={profile.zoom}
                target="_blank"
                rel="noreferrer"
                onClick={() => play('tick')}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2.5 text-sm text-ink transition-colors hover:border-primary/50"
              >
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                Book a call
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => play('tick')}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2.5 text-sm text-ink transition-colors hover:border-primary/50"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
