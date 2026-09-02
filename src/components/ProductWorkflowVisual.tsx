import { motion } from 'framer-motion'
import type { ProductVisual } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface Props {
  visual: ProductVisual
}

/**
 * Generated, abstract product-interface mocks (pure SVG/CSS - no stock
 * imagery). Each project gets a distinct motif that reinforces its story.
 */
export function ProductWorkflowVisual({ visual }: Props) {
  const reduced = usePrefersReducedMotion()

  const chrome = (
    <div className="mb-3 flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-line" />
      <span className="h-2 w-2 rounded-full bg-primary/60" />
    </div>
  )

  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-line bg-base/70 p-4">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]"
        aria-hidden="true"
      />
      <div className="relative">
        {chrome}
        {visual === 'flow' && <FlowMock reduced={reduced} />}
        {visual === 'reasoning' && <EmotionMock reduced={reduced} />}
        {visual === 'music' && <MusicMock reduced={reduced} />}
      </div>
    </div>
  )
}

/* ----- Flow Intelligence: developer-flow wave + install counter ----- */
function FlowMock({ reduced }: { reduced: boolean }) {
  // smooth "flow over a session" wave
  const wave = 'M0,24 C10,10 16,10 24,18 S40,32 52,18 S70,6 84,14'
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-[10px] text-faint">flow.signals</span>
        <span className="rounded bg-success/15 px-1.5 py-0.5 font-mono text-[10px] text-success">
          2,500+ installs
        </span>
      </div>
      <svg
        viewBox="0 0 84 34"
        className="h-14 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flowfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(240,66,75,0.35)" />
            <stop offset="100%" stopColor="rgba(240,66,75,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${wave} L84,34 L0,34 Z`}
          fill="url(#flowfill)"
          stroke="none"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d={wave}
          fill="none"
          stroke="#F0424B"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <circle cx="52" cy="18" r="2.2" fill="#46C48A" />
      </svg>
      <div className="mt-2 flex items-center gap-1.5">
        {['flow', 'focus', 'ship'].map((l) => (
          <span
            key={l}
            className="rounded-md border border-line bg-surface/70 px-1.5 py-0.5 font-mono text-[9px] text-muted"
          >
            {l}
          </span>
        ))}
        <span className="ml-auto font-mono text-[9px] text-faint">
          metadata only
        </span>
      </div>
    </div>
  )
}

/* ----- EC2ER: emotions -> agents -> eval, w/ EmoBench uplift ----- */
function EmotionMock({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-faint">
          emotion.reasoning
        </span>
        <span className="rounded bg-secondary/15 px-1.5 py-0.5 font-mono text-[10px] text-secondary">
          +438% EU
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Node label="emotions" tone="line" small />
        <Arrow />
        <Node label="agents" tone="primary" small />
        <Arrow />
        <Node label="reason" tone="secondary" small />
        <Arrow />
        <Node label="eval" tone="success" small />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="w-10 font-mono text-[9px] text-faint">base</span>
        <div className="h-1.5 flex-1 rounded-full bg-line">
          <div className="h-1.5 w-[13%] rounded-full bg-faint" />
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <span className="w-10 font-mono text-[9px] text-primary-soft">tuned</span>
        <div className="h-1.5 flex-1 rounded-full bg-line">
          <motion.div
            className="h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: '70%' }}
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>
      </div>
      <div className="mt-2 font-mono text-[9px] text-faint">
        EmoBench EU / EA &middot; LoRA
      </div>
    </div>
  )
}

/* ----- Mozart: music vs silence across coding task types ----- */
function MusicMock({ reduced }: { reduced: boolean }) {
  const bars = [40, 70, 30, 85, 55, 75, 45, 90, 60]
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-faint">music.vs.silence</span>
        <span className="rounded bg-warm/15 px-1.5 py-0.5 font-mono text-[10px] text-warm">
          &#9834; 3 task types
        </span>
      </div>
      {/* equalizer waveform */}
      <div className="flex h-14 items-center gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full bg-gradient-to-t from-primary/40 to-primary"
            style={{ height: `${h}%` }}
            animate={
              reduced
                ? undefined
                : { scaleY: [1, 0.55, 1.15, 0.8, 1] }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: (i % 5) * 0.16,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        {['debug', 'code', 'design'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="rounded-md border border-line bg-surface/70 px-1.5 py-0.5 font-mono text-[9px] text-muted">
              {s}
            </span>
            {i < 2 && <span className="text-faint">&middot;</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Node({
  label,
  tone,
  small,
}: {
  label: string
  tone: 'line' | 'primary' | 'secondary' | 'success'
  small?: boolean
}) {
  const tones: Record<string, string> = {
    line: 'border-line text-muted',
    primary: 'border-primary/60 text-primary-soft',
    secondary: 'border-secondary/60 text-secondary',
    success: 'border-success/60 text-success',
  }
  return (
    <span
      className={`rounded-md border bg-surface/70 px-2 font-mono ${small ? 'py-0.5 text-[8px]' : 'py-1.5 text-[9px]'} ${tones[tone]}`}
    >
      {label}
    </span>
  )
}

function Arrow() {
  return (
    <span className="text-faint" aria-hidden="true">
      &rarr;
    </span>
  )
}
