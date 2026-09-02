import { ArrowUp, ExternalLink, Mail } from 'lucide-react'
import { profile } from '../data/content'
import { useSound } from '../hooks/useSound'
import { scrollToSection } from '../lib/scroll'
import { LinkedinIcon } from './BrandIcons'
import { SoundToggle } from './SoundToggle'
import { WebRing } from './WebRing'

export function Footer() {
  const { play } = useSound()
  return (
    <footer className="border-t border-line bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => {
                play('tick')
                scrollToSection('home')
              }}
              className="flex items-center gap-2.5 text-left"
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
            <p className="mt-3 max-w-sm text-sm text-muted">
              Designed and built by Rohan Pillay.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => play('tick')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-primary/50"
              >
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                onClick={() => play('tick')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-primary/50"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
              <a
                href={profile.flowIntelligenceUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => play('tick')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm text-ink transition-colors hover:border-primary/50"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Flow Intelligence
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs text-muted">
                Sound
                <SoundToggle />
              </span>
              <button
                type="button"
                onClick={() => {
                  play('tick')
                  scrollToSection('home')
                }}
                aria-label="Back to top"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-primary/50 hover:text-ink"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Rohan Kumar Pillay</span>
          <WebRing />
        </div>
      </div>
    </footer>
  )
}
