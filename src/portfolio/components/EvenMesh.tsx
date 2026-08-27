import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * FlowField — flowing curved line particles on white background
 * Exactly like the reference image but with brand colors on white
 * position: absolute, fills parent container
 */

const COLORS = [
  'rgba(198, 71, 43, 0.55)',   // oxblood
  'rgba(217, 164, 65, 0.5)',   // gold
  'rgba(46, 111, 94, 0.5)',    // teal
  'rgba(91, 168, 143, 0.45)',  // sage
  'rgba(198, 71, 43, 0.3)',    // oxblood light
  'rgba(217, 164, 65, 0.35)',  // gold light
]

export function EvenMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let raf = 0, t = 0, dead = false

    // ── Flow field grid ─────────────────────────────────────
    const COLS = 40
    const ROWS = 25
    let cellW = 0, cellH = 0

    // ── Particles ───────────────────────────────────────────
    const NUM = 200

    interface P {
      x: number; y: number
      history: { x: number; y: number }[]
      col: number
      speed: number
      len: number   // trail length
    }

    const pts: P[] = []

    function makePt(): P {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        history: [],
        col: Math.floor(Math.random() * COLORS.length),
        speed: 0.8 + Math.random() * 1.4,
        len: 6 + Math.floor(Math.random() * 10),
      }
    }

    // ── Perlin-like noise angle field ───────────────────────
    function fieldAngle(x: number, y: number, time: number): number {
      const nx = x / W
      const ny = y / H
      // Multi-octave smooth noise using trig
      const a1 = Math.sin(nx * 3.1 + time * 0.4) * Math.cos(ny * 2.7 - time * 0.3)
      const a2 = Math.cos(nx * 5.3 - time * 0.2) * Math.sin(ny * 4.1 + time * 0.5)
      const a3 = Math.sin((nx + ny) * 2.5 + time * 0.35)
      return (a1 + a2 * 0.5 + a3 * 0.3) * Math.PI * 2
    }

    // ── Draw ────────────────────────────────────────────────
    function draw() {
      // Very faint white overlay — creates the trail fade effect
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.fillRect(0, 0, W, H)

      t += 0.005

      pts.forEach(p => {
        const angle = fieldAngle(p.x, p.y, t)
        const vx = Math.cos(angle) * p.speed
        const vy = Math.sin(angle) * p.speed

        p.history.push({ x: p.x, y: p.y })
        if (p.history.length > p.len) p.history.shift()

        p.x += vx
        p.y += vy

        // Wrap
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        // Draw trail as curved line
        if (p.history.length < 2) return

        ctx.beginPath()
        ctx.moveTo(p.history[0].x, p.history[0].y)
        for (let i = 1; i < p.history.length; i++) {
          ctx.lineTo(p.history[i].x, p.history[i].y)
        }
        ctx.strokeStyle = COLORS[p.col]
        ctx.lineWidth = 1.2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      })

      raf = requestAnimationFrame(draw)
    }

    // ── Resize ──────────────────────────────────────────────
    function resize() {
      if (dead) return
      const rect = canvas.getBoundingClientRect()
      W = rect.width || window.innerWidth
      H = rect.height || 400
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cellW = W / COLS
      cellH = H / ROWS

      // Reset particles spread across full canvas
      pts.length = 0
      for (let i = 0; i < NUM; i++) pts.push(makePt())

      // Fill white
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      resize()
      if (!dead) raf = requestAnimationFrame(draw)
    })
    ro.observe(canvas)

    resize()
    raf = requestAnimationFrame(draw)

    return () => {
      dead = true
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
        top: 0, left: 0,
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
