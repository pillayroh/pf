import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  warm: boolean
}

/**
 * Site-wide ambient floating-particle field rendered on a fixed canvas
 * behind all content. Particles drift gently and are subtly nudged toward
 * the cursor, with faint links between neighbours. Renders a single static
 * frame when reduced motion is preferred.
 */
export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let particles: Particle[] = []
    const mouse = { x: -9999, y: -9999, active: false }

    const make = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.7 + 0.6,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.4 + 0.14,
      warm: Math.random() < 0.5,
    })

    const init = () => {
      const count = Math.min(190, Math.max(70, Math.round((w * h) / 10500)))
      particles = Array.from({ length: count }, make)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    const LINK_DIST = 116
    const MOUSE_RADIUS = 170

    const paint = () => {
      ctx.clearRect(0, 0, w, h)

      // faint links between neighbours
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK_DIST * LINK_DIST) continue
          const t = 1 - Math.sqrt(d2) / LINK_DIST
          ctx.strokeStyle = `rgba(70,196,138,${t * 0.1})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.stroke()
        }
      }

      // particles
      for (const p of particles) {
        const color = p.warm
          ? `rgba(70,196,138,${p.a})`
          : `rgba(231,236,243,${p.a * 0.45})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 8
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    const step = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // gentle nudge toward the cursor
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
            const d = Math.sqrt(d2) || 1
            const f = (1 - d / MOUSE_RADIUS) * 0.5
            p.x += (dx / d) * f
            p.y += (dy / d) * f
          }
        }

        if (p.x < -6) p.x = w + 6
        else if (p.x > w + 6) p.x = -6
        if (p.y < -6) p.y = h + 6
        else if (p.y > h + 6) p.y = -6
      }
      paint()
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReduced) {
      paint()
    } else {
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseout', onLeave)
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
