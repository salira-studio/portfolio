import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * EvenMesh — absolute-positioned canvas that fills its parent container.
 * Place parent as `relative overflow-hidden`.
 * Particles are clearly visible, brand-colored, flowing with pointer repel.
 */

const COLORS = [
  '#C6472B',  // oxblood
  '#D9A441',  // gold
  '#2E6F5E',  // teal deep
  '#5BA88F',  // teal sage
  '#E07A5F',  // warm terracotta
  '#C49535',  // dark amber
]

const TAU = Math.PI * 2
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

function seededRnd(seed: number) {
  let s = (seed >>> 0) || 0x6d2b79f5
  return () => {
    s += 0x6d2b79f5
    let v = s
    v = Math.imul(v ^ (v >>> 15), v | 1)
    v ^= v + Math.imul(v ^ (v >>> 7), v | 61)
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296
  }
}

export function EvenMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rnd = seededRnd(9073)
    let W = 0, H = 0, dpr = 1
    let raf = 0, last = 0, dead = false

    // ── Particles ──────────────────────────────────────────────
    const COUNT = 150

    interface P {
      x: number; y: number
      px: number; py: number
      phase: number; drift: number
      sz: number; pace: number; col: number
    }

    const pts: P[] = []

    function makePt(): P {
      return {
        x: rnd() * W, y: rnd() * H,
        px: 0, py: 0,
        phase: rnd() * TAU,
        drift: (rnd() - 0.5) * 0.7,
        sz: 1.2 + rnd() * 1.6,     // 1.2 – 2.8
        pace: 0.6 + rnd() * 0.7,
        col: Math.floor(rnd() * COLORS.length),
      }
    }

    function fill() {
      while (pts.length < COUNT) pts.push(makePt())
    }

    // ── Pointer ─────────────────────────────────────────────────
    const ptr = { x: -9999, y: -9999, on: false }

    // ── Wrap ────────────────────────────────────────────────────
    function wrap(p: P) {
      const m = 20
      if (p.x < -m) { p.x = W + m; p.px = p.x }
      else if (p.x > W + m) { p.x = -m; p.px = p.x }
      if (p.y < -m) { p.y = H + m; p.py = p.y }
      else if (p.y > H + m) { p.y = -m; p.py = p.y }
    }

    // ── Angle field ─────────────────────────────────────────────
    function angle(p: P, t: number) {
      const base = -20 * Math.PI / 180
      const sc = 0.0038
      const time = t * 0.00015
      const a = Math.sin(p.y * sc + time + p.phase)
      const b = Math.cos(p.x * sc * 0.8 - time * 0.75)
      return base + (a + b) * 0.5 * 0.9 + p.drift * 0.3
    }

    // ── Render ──────────────────────────────────────────────────
    function draw(t: number, dt: number) {
      if (!W || !H) return
      fill()

      const speed = 32

      // Fade trail — high alpha so old strokes vanish quickly = clean look
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.25
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)

      ctx.lineCap = 'round'
      ctx.globalCompositeOperation = 'source-over'

      pts.forEach(p => {
        const ang = angle(p, t)
        let vx = Math.cos(ang) * speed * p.pace
        let vy = Math.sin(ang) * speed * p.pace

        // Pointer repel
        if (ptr.on) {
          const dx = p.x - ptr.x
          const dy = p.y - ptr.y
          const d = Math.hypot(dx, dy)
          if (d > 0 && d < 160) {
            const f = Math.pow(1 - d / 160, 2) * 120
            vx += (dx / d) * f
            vy += (dy / d) * f
          }
        }

        p.px = p.x; p.py = p.y
        p.x += vx * dt
        p.y += vy * dt
        wrap(p)

        const len = Math.hypot(p.x - p.px, p.y - p.py)
        if (len < 0.2) return

        const col = COLORS[p.col]
        // Glow pass — wider, lower opacity
        ctx.globalAlpha = 0.18
        ctx.strokeStyle = col
        ctx.lineWidth = p.sz * 6
        ctx.shadowColor = col
        ctx.shadowBlur = 18
        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        // Core pass — solid, crisp
        ctx.globalAlpha = 0.7
        ctx.strokeStyle = col
        ctx.lineWidth = p.sz * 1.8
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      })
    }

    // ── Loop ────────────────────────────────────────────────────
    function loop(t: number) {
      raf = 0
      if (dead) return
      const min = 1000 / 50
      if (last && t - last < min - 1) { raf = requestAnimationFrame(loop); return }
      const dt = last ? clamp((t - last) / 1000, 0, 0.06) : 0
      last = t
      draw(t, dt)
      raf = requestAnimationFrame(loop)
    }

    // ── Resize ──────────────────────────────────────────────────
    function resize() {
      if (dead) return
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Full white fill on resize
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)
      last = 0
    }

    // ── Pointer events ─────────────────────────────────────────
    function onMove(e: PointerEvent) {
      if (dead) return
      const rect = canvas.getBoundingClientRect()
      ptr.on = true
      ptr.x = e.clientX - rect.left
      ptr.y = e.clientY - rect.top
    }
    function onLeave() { ptr.on = false; ptr.x = -9999; ptr.y = -9999 }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    canvas.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerleave', onLeave)
    // Also track global pointer so it works when pointer is over child elements
    window.addEventListener('pointermove', onMove, { passive: true })

    resize()
    raf = requestAnimationFrame(loop)

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
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
