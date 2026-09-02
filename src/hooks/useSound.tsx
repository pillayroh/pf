import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type ClickTone = 'tick' | 'soft' | 'confirm'

interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  setEnabled: (v: boolean) => void
  /** play a short, subtle UI click. No-op when disabled or reduced. */
  play: (tone?: ClickTone) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = 'productos:sound-enabled'

function readInitial(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

/**
 * Provides an opt-in, Web Audio generated UI click.
 * - Off by default; persisted in localStorage.
 * - Never plays until the user has interacted (browser autoplay policy).
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState<boolean>(readInitial)
  const ctxRef = useRef<AudioContext | null>(null)
  const hasInteracted = useRef(false)

  useEffect(() => {
    const markInteracted = () => {
      hasInteracted.current = true
    }
    window.addEventListener('pointerdown', markInteracted, { once: true })
    window.addEventListener('keydown', markInteracted, { once: true })
    return () => {
      window.removeEventListener('pointerdown', markInteracted)
      window.removeEventListener('keydown', markInteracted)
    }
  }, [])

  const persist = useCallback((v: boolean) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(v))
    } catch {
      /* ignore */
    }
  }, [])

  const ensureCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return null
    if (!ctxRef.current) {
      ctxRef.current = new AC()
    }
    if (ctxRef.current.state === 'suspended') {
      void ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const play = useCallback(
    (tone: ClickTone = 'tick') => {
      if (!enabled || !hasInteracted.current) return
      const ctx = ensureCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Tone profiles kept deliberately short, quiet, and non-distracting.
      const profiles: Record<
        ClickTone,
        { freq: number; peak: number; dur: number; type: OscillatorType }
      > = {
        tick: { freq: 660, peak: 0.05, dur: 0.05, type: 'triangle' },
        soft: { freq: 420, peak: 0.045, dur: 0.06, type: 'sine' },
        confirm: { freq: 780, peak: 0.06, dur: 0.09, type: 'sine' },
      }
      const p = profiles[tone]

      osc.type = p.type
      osc.frequency.setValueAtTime(p.freq, now)
      osc.frequency.exponentialRampToValueAtTime(p.freq * 0.7, now + p.dur)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(p.peak, now + 0.006)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + p.dur + 0.02)
    },
    [enabled, ensureCtx],
  )

  const setEnabled = useCallback(
    (v: boolean) => {
      setEnabledState(v)
      persist(v)
      if (v) {
        // Warm up context on enable so the first real click is instant.
        const ctx = ensureCtx()
        if (ctx && hasInteracted.current) {
          // brief confirmation blip
          const now = ctx.currentTime
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(720, now)
          gain.gain.setValueAtTime(0.0001, now)
          gain.gain.exponentialRampToValueAtTime(0.05, now + 0.006)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.1)
        }
      }
    },
    [ensureCtx, persist],
  )

  const toggle = useCallback(
    () => setEnabled(!enabled),
    [enabled, setEnabled],
  )

  const value = useMemo<SoundContextValue>(
    () => ({ enabled, toggle, setEnabled, play }),
    [enabled, toggle, setEnabled, play],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return ctx
}
