import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * FlowField — perlin-style noise field.
 * Particles follow curved paths leaving fading trails.
 * White background, brand palette colors.
 * Exactly like the reference image but on white.
 */

// Brand colors — visible on white
const COLORS = [
  'rgba(198, 71, 43, 0.65)',   // oxblood
  'rgba(217, 164, 65, 0.65)',  // gold
  'rgba(46, 111, 94, 0.60)',   // teal
  'rgba(91, 168, 143, 0.55)',  // sage
  'rgba(198, 71, 43, 0.45)',   // oxblood soft
  'rgba(217, 164, 65, 0.50)',  // gold soft
  'rgba(46, 111, 94, 0.45)',   // teal soft
]

export function EvenMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, dpr = 1
    let raf = 0, dead = false, running = false

    // ── Noise helpers (smooth trig-based) ─────────────────
    function noise(x: number, y: number, t: number): number {
      // Multi-frequency trig noise — gives smooth curves like Perlin
      return (
        Math.sin(x * 0.006 + t * 0.4) * Math.cos(y * 0.004 - t * 0.3) +
        Math.cos(x * 0.009 - t * 0.25) * Math.sin(y * 0.007 + t * 0.35) +
        Math.sin((x + y) * 0.004 + t * 0.2) * 0.5
      )
    }

    function fieldAngle(x: number, y: number, t: number): number {
      return noise(x, y, t) * Math.PI * 1.6
    }

    // ── Particle system ────────────────────────────────────
    const COUNT = 400
    const SPEED = 1.8

    interface P {
      x: number; y: number
      color: string
      life: number
      maxLife: number
    }

    let particles: P[] = []

    function spawn(): P {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 120 + Math.floor(Math.random() * 180),
      }
    }

    function initParticles() {
      particles = Array.from({ length: COUNT }, spawn)
      // Stagger initial life so they don't all start at once
      particles.forEach((p, i) => { p.life = Math.floor((i / COUNT) * p.maxLife) })
    }

    // ── Render ────────────────────────────────────────────
    let t = 0

    function frame() {
      raf = 0
      if (dead) return

      t += 0.008

      // Clear to pure white every frame — NO trails, NO buildup
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)

      particles.forEach(p => {
        if (p.life >= p.maxLife) {
          // Respawn at random position
          const np = spawn()
          p.x = np.x; p.y = np.y
          p.color = np.color
          p.life = 0
          p.maxLife = np.maxLife
          return
        }

        const angle = fieldAngle(p.x, p.y, t)
        const nx = p.x + Math.cos(angle) * SPEED
        const ny = p.y + Math.sin(angle) * SPEED

        // Fade in at start, fade out at end
        const lifeFraction = p.life / p.maxLife
        const fadeIn  = Math.min(1, p.life / 20)
        const fadeOut = Math.min(1, (p.maxLife - p.life) / 30)
        const alpha   = fadeIn * fadeOut

        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(nx, ny)
        ctx.strokeStyle = p.color
        ctx.lineWidth = 2.0
        ctx.globalAlpha = alpha * 0.9
        ctx.lineCap = 'round'
        ctx.stroke()

        p.x = nx
        p.y = ny
        p.life++

        // Wrap edges
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    // ── Setup & resize ─────────────────────────────────────
    function setup() {
      if (dead) return
      const parent = canvas.parentElement
      if (!parent) return

      const rect = parent.getBoundingClientRect()
      W = Math.round(rect.width)
      H = Math.round(rect.height)
      if (W === 0 || H === 0) return

      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)

      // White base
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)

      initParticles()

      if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }

    const ro = new ResizeObserver(() => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const newW = Math.round(rect.width)
      const newH = Math.round(rect.height)
      if (newW === W && newH === H) return
      cancelAnimationFrame(raf)
      raf = 0
      running = false
      setup()
    })

    if (canvas.parentElement) {
      ro.observe(canvas.parentElement)
    }

    // Small delay so parent has fully painted and has real dimensions
    const timer = setTimeout(setup, 50)

    return () => {
      dead = true
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default EvenMesh
