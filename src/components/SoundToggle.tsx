import { Volume2, VolumeX } from 'lucide-react'
import { useSound } from '../hooks/useSound'

interface SoundToggleProps {
  className?: string
}

/**
 * Accessible on/off control for the subtle UI click sound.
 * Reflects state to assistive tech and never conveys status by color alone.
 */
export function SoundToggle({ className = '' }: SoundToggleProps) {
  const { enabled, toggle, play } = useSound()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? 'Sound on. Turn sound off' : 'Sound off. Turn sound on'}
      title={enabled ? 'Sound on' : 'Sound off'}
      onClick={() => {
        // toggle first so the enable-confirmation blip can play
        toggle()
        if (enabled) play('soft')
      }}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/60 text-muted transition-colors hover:border-primary/50 hover:text-ink ${className}`}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
