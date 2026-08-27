import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * EvenMesh — adapted from evenmesh.com
 * Particle flow canvas — brand palette (oxblood / gold / teal / peach)
 * on a white background. Pointer repel, IntersectionObserver pause,
 * fully reduced-motion safe.
 */

const CONFIG = {
  mode: 'flow' as const,
  count: 80,
  speed: 0.45,
  size: 1.1,
  direction: -18,
  // SaLira brand palette — warm, not purple
  colors: ['#F5E2DB', '#D9A441', '#C6472B', '#2E6F5E', '#F7E8E1', '#5BA88F'],
  opacity: 0.55,
  distance: 90,
  pointerResponse: 'repel' as const,
  background: '#FFFFFF',
  intensity: 1.1,
  motion: 1.2,
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
    let destroyed = false, hidden = document.hidden
    let inViewport = true, clearNext = true
    const pointer = { x: 0, y: 0, active: false }

    function makeParticle(): Particle {
      const x = random() * Math.max(width, 1)
      const y = random() * Math.max(height, 1)
      return { x, y, oldX: x, oldY: y, phase: random() * TAU, drift: (random() - 0.5) * 0.75, size: 0.55 + random() * 0.9, pace: 0.62 + random() * 0.72, color: Math.floor(random() * CONFIG.colors.length) }
    }

    function targetCount() {
      const area = Math.max(24, Math.round(width * height / 900))
      return Math.min(CONFIG.count, area, 560)
    }

    function reconcile() {
      const t = targetCount()
      if (particles.length > t) particles.length = t
      while (particles.length < t) particles.push(makeParticle())
    }

    function wrap(p: Particle) {
      const m = CONFIG.size * 5 + 8
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
      const radius = Math.max(72, CONFIG.distance * 1.33)
      if (dist <= 0.01 || dist >= radius) return
      const falloff = Math.pow(1 - dist / radius, 2)
      const force = falloff * (54 + CONFIG.intensity * 76)
      vel.x += (dx / dist) * force
      vel.y += (dy / dist) * force
    }

    function angleAt(p: Particle, time: number) {
      const dir = CONFIG.direction * Math.PI / 180
      const scale = 0.0034 + CONFIG.motion * 0.0048
      const temporal = time * 0.00016 * (0.25 + CONFIG.speed * 0.75)
      const wA = Math.sin(p.y * scale + temporal + p.phase)
      const wB = Math.cos(p.x * scale * 0.82 - temporal * 0.74)
      return dir + (wA + wB) * 0.5 * (0.34 + CONFIG.motion * 0.58) * CONFIG.intensity
    }

    function renderFlow(time: number, delta: number) {
      // Soft trail fade — white bg, very high alpha so trails are short
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = clearNext ? 1 : 0.18
      ctx.fillStyle = CONFIG.background
      ctx.fillRect(0, 0, width, height)
      ctx.restore()

      const pace = CONFIG.speed * (38 + CONFIG.intensity * 18) * (0.35 + CONFIG.motion * 0.65)

      ctx.save()
      ctx.globalCompositeOperation = 'multiply' // blends softly on white
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

        ctx.globalAlpha = clamp(CONFIG.opacity * (0.38 + p.size * 0.22), 0, 0.9)
        ctx.strokeStyle = CONFIG.colors[p.color % CONFIG.colors.length]
        ctx.lineWidth = clamp(CONFIG.size * p.size, 0.5, 3.5)
        ctx.beginPath()
        ctx.moveTo(p.oldX, p.oldY)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      })

      ctx.restore()
      clearNext = false
    }

    function render(time: number, delta: number) {
      if (!width || !height) return
      reconcile()
      renderFlow(time, delta)
    }

    function canAnimate() {
      return !destroyed && !hidden && inViewport && CONFIG.speed > 0
    }

    function schedule() {
      if (!canAnimate() || animFrame) return
      animFrame = requestAnimationFrame(time => {
        animFrame = 0
        const minFrame = 1000 / 45
        if (lastTime && time - lastTime < minFrame - 1) { schedule(); return }
        const delta = lastTime ? clamp((time - lastTime) / 1000, 0, 0.05) : 0
        lastTime = time
        render(time, delta)
        schedule()
      })
    }

    function stop() {
      if (animFrame) cancelAnimationFrame(animFrame)
      animFrame = 0
    }

    function resize() {
      if (destroyed) return
      const bounds = canvas.getBoundingClientRect()
      const nw = Math.round(bounds.width)
      const nh = Math.round(bounds.height)
      if (nw <= 0 || nh <= 0) return
      const ow = width, oh = height
      width = nw; height = nh
      const areaDpr = Math.sqrt(2200000 / Math.max(1, width * height))
      dpr = clamp(Math.min(window.devicePixelRatio || 1, 2, areaDpr), 0.5, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (ow && oh) {
        particles.forEach(p => {
          p.x *= width / ow; p.y *= height / oh
          p.oldX = p.x; p.oldY = p.y
        })
      }
      reconcile()
      clearNext = true
      lastTime = 0
      schedule()
    }

    function onPointer(e: PointerEvent) {
      if (destroyed || hidden || !inViewport) { pointer.active = false; return }
      const bounds = canvas.getBoundingClientRect()
      pointer.active = e.clientX >= bounds.left && e.clientX <= bounds.right && e.clientY >= bounds.top && e.clientY <= bounds.bottom
      if (!pointer.active) return
      pointer.x = e.clientX - bounds.left
      pointer.y = e.clientY - bounds.top
    }

    function onPointerEnd() { pointer.active = false }

    function onVisibility() {
      hidden = document.hidden
      pointer.active = false
      if (hidden) { stop(); return }
      lastTime = 0
      schedule()
    }

    const ro = new ResizeObserver(resize)
    const io = new IntersectionObserver(entries => {
      const next = entries[0]?.isIntersecting ?? true
      if (next === inViewport) return
      inViewport = next
      pointer.active = false
      if (!inViewport) { stop(); return }
      lastTime = 0; schedule()
    }, { rootMargin: '80px' })

    ro.observe(canvas)
    io.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    resize()

    return () => {
      destroyed = true
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}

export default EvenMesh
