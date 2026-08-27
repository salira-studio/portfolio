import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Floating particle dots on white background.
 * Small colored circles drifting slowly — no trails, no lines.
 * Safe, simple, always visible.
 */

const COLORS = [
  '#C6472B',
  '#D9A441',
  '#2E6F5E',
  '#5BA88F',
]

interface Dot {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  color: string
  opacity: number
  pulseSpeed: number
  pulsePhase: number
}

export function EvenMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let raf = 0, dead = false
    let dots: Dot[] = []
    let t = 0

    function makeDots() {
      dots = Array.from({ length: 55 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 3 + Math.random() * 5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.25 + Math.random() * 0.35,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
      }))
    }

    function resize() {
      if (dead) return
      const rect = canvas.parentElement!.getBoundingClientRect()
      W = rect.width > 0 ? rect.width : window.innerWidth
      H = rect.height > 0 ? rect.height : 500
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.scale(dpr, dpr)
      makeDots()
    }

    function frame() {
      raf = 0
      if (dead) return

      t += 0.016
      ctx.clearRect(0, 0, W, H)

      dots.forEach(d => {
        // Move
        d.x += d.vx
        d.y += d.vy

        // Bounce off edges
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1
        d.x = Math.max(0, Math.min(W, d.x))
        d.y = Math.max(0, Math.min(H, d.y))

        // Pulsing opacity
        const pulse = Math.sin(t * d.pulseSpeed * 60 + d.pulsePhase)
        const alpha = d.opacity + pulse * 0.12

        // Draw glow
        const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3)
        glow.addColorStop(0, d.color + 'AA')
        glow.addColorStop(1, d.color + '00')
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.globalAlpha = alpha * 0.4
        ctx.fill()

        // Draw solid dot
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = d.color
        ctx.globalAlpha = alpha
        ctx.fill()
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      ctx.resetTransform()
      resize()
      if (!dead) raf = requestAnimationFrame(frame)
    })
    ro.observe(canvas.parentElement!)

    resize()
    raf = requestAnimationFrame(frame)

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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}

export default EvenMesh
