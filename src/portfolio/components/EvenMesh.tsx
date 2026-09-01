import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * EvenMesh — fixed viewport-level network animation.
 * Rendered as position:fixed so it covers the screen uniformly
 * at every scroll position. White background sections are transparent
 * so this canvas always shows through.
 */

const CONFIG = {
  count: 140,
  speed: 0.32,
  size: 1.4,
  direction: -12,
  colors: ['#00BFFF', '#3A7EFF', '#7C5CFC'],
  opacity: 0.92,
  connections: true,
  distance: 130,
  pointerResponse: 'repel' as const,
  intensity: 0.88,
  motion: 0.46,
  seed: 16832,
}

const TAU = Math.PI * 2
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

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

interface Particle {
  x: number; y: number
  oldX: number; oldY: number
  phase: number; drift: number
  size: number; pace: number; color: number
}

export function EvenMesh({ fixed = false }: { fixed?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    // Device capability guard: skip heavy animation on low-powered devices
    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 4
    if (cores <= 2 || memory <= 2) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return
    // Stable non-null refs for use inside closures
    const cvs = canvas

    const rnd = seededRandom(CONFIG.seed)
    let W = 0, H = 0, dpr = 1
    let particles: Particle[] = []
    let raf = 0, lastTime = 0
    let dead = false, hidden = document.hidden
    let inVP = true, scrolling = false, scrollTimer = 0
    let renderWhenVisible = false
    const ptr = { x: 0, y: 0, active: false }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    // ── Grid-jittered particle spawn for uniform distribution ─
    // For tall sections (> 2× viewport), tiles the grid vertically
    function makeParticles(count: number): Particle[] {
      const vph = window.innerHeight || H
      const tiles = Math.max(1, Math.ceil(H / vph))
      const perTile = Math.ceil(count / tiles)
      const result: Particle[] = []

      for (let tile = 0; tile < tiles && result.length < count; tile++) {
        const tileY = tile * vph
        const tileH = Math.min(vph, H - tileY)
        const aspect = Math.max(W, 1) / Math.max(tileH, 1)
        const cols = Math.max(1, Math.round(Math.sqrt(perTile * aspect)))
        const rows = Math.max(1, Math.ceil(perTile / cols))
        const cellW = W / cols
        const cellH = tileH / rows

        for (let r = 0; r < rows && result.length < count; r++) {
          for (let c = 0; c < cols && result.length < count; c++) {
            const x = (c + 0.15 + rnd() * 0.7) * cellW
            const y = tileY + (r + 0.15 + rnd() * 0.7) * cellH
            result.push({
              x, y, oldX: x, oldY: y,
              phase: rnd() * TAU,
              drift: (rnd() - 0.5) * 0.75,
              size: 0.55 + rnd() * 0.9,
              pace: 0.62 + rnd() * 0.72,
              color: Math.floor(rnd() * CONFIG.colors.length),
            })
          }
        }
      }
      return result
    }

    function makeParticle(): Particle {
      const x = rnd() * Math.max(W, 1)
      const y = rnd() * Math.max(H, 1)
      return {
        x, y, oldX: x, oldY: y,
        phase: rnd() * TAU,
        drift: (rnd() - 0.5) * 0.75,
        size: 0.55 + rnd() * 0.9,
        pace: 0.62 + rnd() * 0.72,
        color: Math.floor(rnd() * CONFIG.colors.length),
      }
    }

    function targetCount() {
      // Scale with full section height — 1 particle per ~9000px²
      const areaLimit = Math.max(20, Math.round(W * H / 9000))
      return Math.min(CONFIG.count, areaLimit, 140)
    }

    function reconcile(fresh = false) {
      const t = targetCount()
      if (fresh || particles.length === 0) {
        particles = makeParticles(t)
        return
      }
      if (particles.length > t) particles.length = t
      while (particles.length < t) particles.push(makeParticle())
    }

    // ── Pointer force ────────────────────────────────────────
    function pointerForce(p: Particle, vel: { x: number; y: number }) {
      if (!ptr.active) return
      const dx = p.x - ptr.x, dy = p.y - ptr.y
      const dist = Math.hypot(dx, dy)
      const radius = Math.max(72, CONFIG.distance * (1.05 + CONFIG.intensity * 0.28))
      if (dist <= 0.01 || dist >= radius) return
      const falloff = Math.pow(1 - dist / radius, 2)
      const force = falloff * (54 + CONFIG.intensity * 76)
      vel.x += (dx / dist) * force
      vel.y += (dy / dist) * force
    }

    // ── Wrap ─────────────────────────────────────────────────
    function wrap(p: Particle, margin: number) {
      let w = false
      if (p.x < -margin) { p.x = W + margin; w = true }
      else if (p.x > W + margin) { p.x = -margin; w = true }
      if (p.y < -margin) { p.y = H + margin; w = true }
      else if (p.y > H + margin) { p.y = -margin; w = true }
      if (w) { p.oldX = p.x; p.oldY = p.y }
      return w
    }

    // ── Move ─────────────────────────────────────────────────
    function moveParticles(time: number, delta: number) {
      const dir = CONFIG.direction * Math.PI / 180
      const pace = CONFIG.speed * (18 + CONFIG.intensity * 18) * (0.35 + CONFIG.motion * 0.65) * 0.68
      particles.forEach(p => {
        p.oldX = p.x; p.oldY = p.y
        const sway = Math.sin(time * 0.00024 + p.phase) * (0.08 + CONFIG.motion * 0.22) * 0.68
        const angle = dir + p.drift * CONFIG.motion * 0.68 + sway
        const vel = { x: Math.cos(angle) * pace * p.pace, y: Math.sin(angle) * pace * p.pace }
        pointerForce(p, vel)
        p.x += vel.x * delta
        p.y += vel.y * delta
        wrap(p, CONFIG.size * 5 + 8)
      })
    }

    // ── Connection lines ──────────────────────────────────────
    function drawConnections() {
      if (!CONFIG.connections || particles.length < 2) return
      const cellSize = Math.max(24, CONFIG.distance)
      const grid = new Map<string, number[]>()
      particles.forEach((p, i) => {
        const key = `${Math.floor(p.x / cellSize)}:${Math.floor(p.y / cellSize)}`
        if (!grid.has(key)) grid.set(key, [])
        grid.get(key)!.push(i)
      })

      let edgeCount = 0
      const edgeLimit = Math.min(4000, particles.length * 12)

      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineCap = 'round'

      particles.forEach((p, i) => {
        if (edgeCount >= edgeLimit) return
        const col = Math.floor(p.x / cellSize)
        const row = Math.floor(p.y / cellSize)
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const cands = grid.get(`${col + dx}:${row + dy}`)
            if (!cands) continue
            cands.forEach(j => {
              if (edgeCount >= edgeLimit || j <= i) return
              const b = particles[j]
              const ddx = b.x - p.x, ddy = b.y - p.y
              const distSq = ddx * ddx + ddy * ddy
              if (distSq > CONFIG.distance * CONFIG.distance) return
              const dist = Math.sqrt(distSq)
              const t = 1 - dist / CONFIG.distance
              ctx.globalAlpha = clamp(t * t * 0.75, 0, 0.75)
              ctx.strokeStyle = CONFIG.colors[p.color % CONFIG.colors.length]
              ctx.lineWidth = clamp(0.85 + t * 1.2, 0.6, 2.0)
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
              edgeCount++
            })
          }
        }
      })
      ctx.restore()
    }

    // ── Dots ─────────────────────────────────────────────────
    function drawDots() {
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      particles.forEach(p => {
        const color = CONFIG.colors[p.color % CONFIG.colors.length]
        const radius = CONFIG.size * p.size * (0.9 + CONFIG.intensity * 0.3)
        ctx.globalAlpha = clamp(0.82 + p.size * 0.14, 0, 1)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = radius * (4.5 + CONFIG.intensity * 3.5)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, TAU)
        ctx.fill()
      })
      ctx.restore()
    }

    // ── Render ───────────────────────────────────────────────
    function render(time: number, delta: number) {
      if (!W || !H) return
      reconcile()
      ctx.clearRect(0, 0, W, H)
      if (delta > 0) moveParticles(time, delta)
      drawConnections()
      drawDots()
    }

    // ── Loop ─────────────────────────────────────────────────
    function canRun() {
      return !dead && !hidden && inVP && !scrolling && !mq.matches
    }

    function schedule() {
      if (!canRun() || raf) return
      raf = requestAnimationFrame(time => {
        raf = 0
        const minFrame = 1000 / 45
        if (lastTime && time - lastTime < minFrame - 1) { schedule(); return }
        const delta = lastTime ? clamp((time - lastTime) / 1000, 0, 0.05) : 0
        lastTime = time
        render(time, delta)
        schedule()
      })
    }

    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0 }

    function renderStill() {
      if (!W || !H) return
      if (hidden || !inVP) { renderWhenVisible = true; return }
      render(performance.now(), 0)
      renderWhenVisible = false
    }

    // ── Resize ───────────────────────────────────────────────
    function resize() {
      if (dead) return
      const bounds = cvs.getBoundingClientRect()
      const nw = Math.round(bounds.width)
      const nh = Math.round(bounds.height)
      if (nw <= 0 || nh <= 0) return
      const ow = W, oh = H
      W = nw; H = nh
      const areaDpr = Math.sqrt(2200000 / Math.max(1, W * H))
      dpr = clamp(Math.min(window.devicePixelRatio || 1, 2, areaDpr), 0.5, 2)
      cvs.width = Math.max(1, Math.round(W * dpr))
      cvs.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (ow && oh && particles.length > 0) {
        particles.forEach(p => {
          p.x *= W / ow; p.y *= H / oh
          p.oldX = p.x; p.oldY = p.y
        })
        reconcile()
      } else {
        reconcile(true)
      }
      renderStill()
      lastTime = 0
      schedule()
    }

    // ── Pointer ──────────────────────────────────────────────
    function onPointer(e: PointerEvent) {
      if (dead || hidden || !inVP || scrolling) { ptr.active = false; return }
      const b = cvs.getBoundingClientRect()
      ptr.active = e.clientX >= b.left && e.clientX <= b.right &&
                   e.clientY >= b.top && e.clientY <= b.bottom
      if (!ptr.active) return
      ptr.x = e.clientX - b.left
      ptr.y = e.clientY - b.top
    }
    function onPointerEnd() { ptr.active = false }

    // ── Scroll — fixed canvas never pauses ───────────────────
    function onScroll() {
      if (fixed) return
      if (dead || hidden || !inVP) return
      scrolling = true; ptr.active = false; stop()
      clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        scrolling = false; lastTime = 0; schedule()
      }, 140)
    }

    // ── Visibility ───────────────────────────────────────────
    function onVisibility() {
      hidden = document.hidden; ptr.active = false
      if (hidden) { stop(); return }
      lastTime = 0
      if (renderWhenVisible) renderStill()
      schedule()
    }

    // ── IntersectionObserver — skip for fixed canvas ─────────
    const io = new IntersectionObserver(entries => {
      if (fixed) return
      const next = entries[0]?.isIntersecting ?? true
      if (next === inVP) return
      inVP = next; ptr.active = false
      if (!inVP) { stop(); return }
      lastTime = 0; renderStill(); schedule()
    }, { rootMargin: '80px' })

    const ro = new ResizeObserver(resize)
    ro.observe(cvs)
    io.observe(cvs)
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    window.addEventListener('pointerup', onPointerEnd, { passive: true })
    window.addEventListener('pointercancel', onPointerEnd, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    document.addEventListener('visibilitychange', onVisibility)

    resize()

    return () => {
      dead = true; stop()
      clearTimeout(scrollTimer)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      document.removeEventListener('scroll', onScroll, true)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, fixed])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={fixed ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        display: 'block',
        zIndex: 1,
        pointerEvents: 'none',
      } : {
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
