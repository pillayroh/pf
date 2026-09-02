import type { CaseStudy } from '../data/content'

/**
 * Small abstract motif rendered on each case-study card so cards vary
 * visually while staying within one system.
 */
export function CaseMotif({ motif }: { motif: CaseStudy['motif'] }) {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-line bg-base/60">
      <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
        {motif === 'tree' && (
          <g stroke="#F0424B" strokeWidth={1.6} fill="none">
            <circle cx="24" cy="8" r="3" fill="#F0424B" />
            <path d="M24 11v6M24 17H12v6M24 17h12v6" />
            <circle cx="12" cy="26" r="3" />
            <circle cx="36" cy="26" r="3" fill="#C2506B" stroke="#C2506B" />
            <path d="M12 29v5M36 29v5" />
            <circle cx="12" cy="38" r="2.5" fill="#46C48A" stroke="#46C48A" />
            <circle cx="36" cy="38" r="2.5" />
          </g>
        )}
        {motif === 'funnel' && (
          <g fill="none" stroke="#F0424B" strokeWidth={1.6}>
            <path d="M6 10h36l-11 13v13l-14 6V23z" />
            <path d="M14 16h20" stroke="#C2506B" />
            <path d="M18 30l12 3" stroke="#46C48A" />
          </g>
        )}
        {motif === 'workflow' && (
          <g stroke="#F0424B" strokeWidth={1.6} fill="none">
            <rect x="5" y="8" width="12" height="9" rx="2" />
            <rect x="31" y="8" width="12" height="9" rx="2" stroke="#C2506B" />
            <rect x="18" y="30" width="12" height="9" rx="2" stroke="#46C48A" />
            <path d="M17 12h14M11 17v9h13M37 17v9H24" />
          </g>
        )}
        {motif === 'notes' && (
          <g stroke="#F0424B" strokeWidth={1.6} fill="none">
            <rect x="7" y="9" width="16" height="16" rx="2" />
            <rect x="26" y="14" width="15" height="15" rx="2" stroke="#C2506B" />
            <rect x="14" y="28" width="16" height="12" rx="2" stroke="#46C48A" />
            <path d="M10 14h10M10 18h7" strokeWidth={1.2} />
          </g>
        )}
        {motif === 'teardown' && (
          <g stroke="#F0424B" strokeWidth={1.6} fill="none">
            <rect x="7" y="7" width="34" height="24" rx="2" />
            <path d="M7 14h34" />
            <circle cx="11" cy="10.5" r="1" fill="#F0424B" />
            <path d="M12 20h12M12 24h8" stroke="#C2506B" strokeWidth={1.2} />
            <path d="M28 19l10 6-10 6z" stroke="#46C48A" />
          </g>
        )}
      </svg>
    </div>
  )
}
