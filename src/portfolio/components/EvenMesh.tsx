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
    const COUNT = 120
    const SPEED = 1.1
    const TAIL  = 14   // number of positions kept per particle

    interface P {
      x: number; y: number
      hx: Float32Array  // tail x history
      hy: Float32Array  // tail y history
      hp: number        // ring-buffer pointer
      hlen: number      // how many positions are filled so far
      color: string
      life: number
      maxLife: number
    }

    let particles: P[] = []

    function spawn(): P {
      const hx = new Float32Array(TAIL)
      const hy = new Float32Array(TAIL)
      const sx = Math.random() * W
      const sy = Math.random() * H
      hx.fill(sx); hy.fill(sy)
      return {
        x: sx, y: sy,
        hx, hy, hp: 0, hlen: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 120 + Math.floor(Math.random() * 180),
      }
    }

    function initParticles() {
      particles = []
      // Grid spawn — evenly distribute across canvas to avoid clustering
      const cols = Math.ceil(Math.sqrt(COUNT * (W / Math.max(H, 1))))
      const rows = Math.ceil(COUNT / cols)
      const cellW = W / cols
      const cellH = H / rows
      let idx = 0
      for (let r = 0; r < rows && idx < COUNT; r++) {
        for (let c = 0; c < cols && idx < COUNT; c++) {
          // Spawn within each cell with small random offset
          const sx = (c + 0.2 + Math.random() * 0.6) * cellW
          const sy = (r + 0.2 + Math.random() * 0.6) * cellH
          const hx = new Float32Array(TAIL).fill(sx)
          const hy = new Float32Array(TAIL).fill(sy)
          particles.push({
            x: sx, y: sy,
            hx, hy, hp: 0, hlen: 0,
            color: COLORS[idx % COLORS.length],
            life: Math.floor(Math.random() * 80), // stagger starts
            maxLife: 150 + Math.floor(Math.random() * 200),
          })
          idx++
        }
      }
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
          // Respawn at a spread-out random position (avoid clustering at same spot)
          const np = spawn()
          // Bias respawn toward underoccupied areas by using grid offset
          np.x = Math.random() * W
          np.y = Math.random() * H
          p.x = np.x; p.y = np.y
          p.hx.fill(np.x); p.hy.fill(np.y)
          p.hp = 0; p.hlen = 0
          p.color = np.color
          p.life = 0
          p.maxLife = np.maxLife
          return
        }

        const angle = fieldAngle(p.x, p.y, t)
        const nx = p.x + Math.cos(angle) * SPEED
        const ny = p.y + Math.sin(angle) * SPEED

        // Store new position in ring buffer
        p.hx[p.hp] = nx
        p.hy[p.hp] = ny
        p.hp = (p.hp + 1) % TAIL
        p.hlen = Math.min(p.hlen + 1, TAIL)

        p.x = nx
        p.y = ny

        // Wrap edges
        if (p.x < -10) { p.x = W + 10; p.hx.fill(p.x); p.hy.fill(p.y) }
        if (p.x > W+10) { p.x = -10;   p.hx.fill(p.x); p.hy.fill(p.y) }
        if (p.y < -10) { p.y = H + 10; p.hx.fill(p.x); p.hy.fill(p.y) }
        if (p.y > H+10) { p.y = -10;   p.hx.fill(p.x); p.hy.fill(p.y) }

        p.life++

        if (p.hlen < 2) return

        // Fade in / fade out based on lifetime
        const fadeIn  = Math.min(1, p.life / 20)
        const fadeOut = Math.min(1, (p.maxLife - p.life) / 30)
        const baseAlpha = fadeIn * fadeOut

        // Draw tail — segments fade from transparent (old) to opaque (new head)
        for (let s = 0; s < p.hlen - 1; s++) {
          // s=0 is oldest segment, s=hlen-2 is newest
          const segAlpha = ((s + 1) / p.hlen) * baseAlpha

          // Walk ring buffer in chronological order
          const ia = (p.hp - p.hlen + s + TAIL) % TAIL
          const ib = (p.hp - p.hlen + s + 1 + TAIL) % TAIL

          ctx.beginPath()
          ctx.moveTo(p.hx[ia], p.hy[ia])
          ctx.lineTo(p.hx[ib], p.hy[ib])
          ctx.strokeStyle = p.color
          ctx.lineWidth = 1.8
          ctx.globalAlpha = segAlpha
          ctx.lineCap = 'round'
          ctx.stroke()
        }
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
