import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * EvenMesh — Full-page fixed particle flow canvas
 * Sits behind ALL content (z-index: 0, position: fixed)
 * Visible brand-colored particles on white
 */

const CONFIG = {
  count: 120,
  speed: 0.5,
  size: 2.2,          // much bigger
  direction: -20,
  // SaLira brand — saturated enough to see on white
  colors: [
    '#C6472B',  // oxblood
    '#D9A441',  // gold
    '#2E6F5E',  // teal deep
    '#5BA88F',  // teal sage
    '#E8916A',  // warm coral
    '#B8860B',  // dark gold
  ],
  opacity: 0.35,      // strong enough to see
  background: '#FFFFFF',
  intensity: 1.3,
  motion: 1.4,
  seed: 4217,
}

interface Particle {
  x: number; y: number; oldX: number; oldY: number
  phase: number; drift: number; size: number; pace: number; color: number
}

function seededRandom(seed: number) {
  let state = (seed >>> 0) || 0x6d2b79f5
  return () => {
    state += 0x6d2b79f5
    let v = state
    v = Math.imul(v ^ (v >>> 15), v | 1)
    v ^= v + Math.imul(v ^ (v >>> 7), v | 61)
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296
  }
}

const TAU = Math.PI * 2
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export function EvenMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const random = seededRandom(CONFIG.seed)
    let width = 0, height = 0, dpr = 1
    let particles: Particle[] = []
    let animFrame = 0, lastTime = 0
    let destroyed = false
    let clearNext = true
    const pointer = { x: -9999, y: -9999, active: false }

    function makeParticle(): Particle {
      const x = random() * Math.max(width, 1)
      const y = random() * Math.max(height, 1)
      return {
        x, y, oldX: x, oldY: y,
        phase: random() * TAU,
        drift: (random() - 0.5) * 0.6,
        size: 0.7 + random() * 1.1,
        pace: 0.55 + random() * 0.8,
        color: Math.floor(random() * CONFIG.colors.length),
      }
    }

    function reconcile() {
      const target = CONFIG.count
      if (particles.length > target) particles.length = target
      while (particles.length < target) particles.push(makeParticle())
    }

    function wrap(p: Particle) {
      const m = 12
      let w = false
      if (p.x < -m) { p.x = width + m; w = true }
      else if (p.x > width + m) { p.x = -m; w = true }
      if (p.y < -m) { p.y = height + m; w = true }
      else if (p.y > height + m) { p.y = -m; w = true }
      if (w) { p.oldX = p.x; p.oldY = p.y }
      return w
    }

    function pointerForce(p: Particle, vel: { x: number; y: number }) {
      if (!pointer.active) return
      const dx = p.x - pointer.x, dy = p.y - pointer.y
      const dist = Math.hypot(dx, dy)
      const radius = 140
      if (dist <= 0.01 || dist >= radius) return
      const falloff = Math.pow(1 - dist / radius, 2)
      const force = falloff * 80
      vel.x += (dx / dist) * force
      vel.y += (dy / dist) * force
    }

    function angleAt(p: Particle, time: number) {
      const dir = CONFIG.direction * Math.PI / 180
      const scale = 0.003 + CONFIG.motion * 0.004
      const temporal = time * 0.00014 * (0.3 + CONFIG.speed * 0.7)
      const wA = Math.sin(p.y * scale + temporal + p.phase)
      const wB = Math.cos(p.x * scale * 0.8 - temporal * 0.7)
      return dir + (wA + wB) * 0.5 * (0.4 + CONFIG.motion * 0.5) * CONFIG.intensity
    }

    function renderFrame(time: number, delta: number) {
      if (!width || !height) return
      reconcile()

      // Soft trail — thin white wash so lines have a soft tail
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = clearNext ? 1 : 0.12
      ctx.fillStyle = CONFIG.background
      ctx.fillRect(0, 0, width, height)
      ctx.restore()

      const pace = CONFIG.speed * 40 * (0.4 + CONFIG.motion * 0.6)

      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineCap = 'round'

      particles.forEach(p => {
        const angle = angleAt(p, time)
        const vel = {
          x: Math.cos(angle) * pace * p.pace,
          y: Math.sin(angle) * pace * p.pace,
        }
        pointerForce(p, vel)

        p.oldX = p.x; p.oldY = p.y
        p.x += vel.x * delta
        p.y += vel.y * delta
        if (wrap(p)) return

        // Line length proportional to speed
        const lineLen = Math.hypot(p.x - p.oldX, p.y - p.oldY)
        if (lineLen < 0.1) return

        const color = CONFIG.colors[p.color % CONFIG.colors.length]
        ctx.globalAlpha = clamp(CONFIG.opacity * (0.5 + p.size * 0.35), 0.1, 0.85)
        ctx.strokeStyle = color
        ctx.lineWidth = clamp(CONFIG.size * p.size, 0.8, 5)

        // Add glow for visibility
        ctx.shadowColor = color
        ctx.shadowBlur = CONFIG.size * p.size * 3

        ctx.beginPath()
        ctx.moveTo(p.oldX, p.oldY)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      })

      ctx.restore()
      clearNext = false
    }

    function schedule() {
      if (destroyed || animFrame) return
      animFrame = requestAnimationFrame(time => {
        animFrame = 0
        const minFrame = 1000 / 50
        if (lastTime && time - lastTime < minFrame - 1) { schedule(); return }
        const delta = lastTime ? clamp((time - lastTime) / 1000, 0, 0.05) : 0
        lastTime = time
        renderFrame(time, delta)
        schedule()
      })
    }

    function stop() {
      if (animFrame) cancelAnimationFrame(animFrame)
      animFrame = 0
    }

    function resize() {
      if (destroyed) return
      width = window.innerWidth
      height = document.documentElement.scrollHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      reconcile()
      clearNext = true
      lastTime = 0
      schedule()
    }

    function onPointer(e: PointerEvent) {
      if (destroyed) { pointer.active = false; return }
      pointer.active = true
      pointer.x = e.clientX + window.scrollX
      pointer.y = e.clientY + window.scrollY
    }

    function onPointerEnd() {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })

    resize()

    return () => {
      destroyed = true
      stop()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}

export default EvenMesh
