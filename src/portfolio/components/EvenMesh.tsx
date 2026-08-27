import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

export function EvenMesh() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const cv = ref.current
    if (!cv || reduced) return
    const ctx = cv.getContext('2d')!

    // Force canvas to fill parent immediately
    const parent = cv.parentElement!
    let W = parent.offsetWidth || window.innerWidth
    let H = parent.offsetHeight || 600
    let dead = false, raf = 0, time = 0

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    cv.width  = Math.round(W * DPR)
    cv.height = Math.round(H * DPR)
    cv.style.width  = W + 'px'
    cv.style.height = H + 'px'
    ctx.scale(DPR, DPR)

    // White fill first
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, W, H)

    // ── Particles ──────────────────────────────────────────
    const COLORS = ['#C6472B','#D9A441','#2E6F5E','#5BA88F','#C6472B','#D9A441']
    const N = 180

    const px   = new Float32Array(N).map(() => Math.random() * W)
    const py   = new Float32Array(N).map(() => Math.random() * H)
    const col  = new Uint8Array(N).map(() => Math.floor(Math.random() * COLORS.length))
    const spd  = new Float32Array(N).map(() => 0.8 + Math.random() * 1.2)
    const ph   = new Float32Array(N).map(() => Math.random() * Math.PI * 2)

    // Trail history per particle — last 8 positions
    const TRAIL = 8
    const hx = Array.from({length: N}, () => new Float32Array(TRAIL))
    const hy = Array.from({length: N}, () => new Float32Array(TRAIL))
    let hptr = new Uint8Array(N) // ring buffer pointer

    // Init trail to current position
    for (let i = 0; i < N; i++) {
      hx[i].fill(px[i])
      hy[i].fill(py[i])
    }

    function angle(x: number, y: number, t: number) {
      const nx = x / W, ny = y / H
      return (
        Math.sin(nx * 3 + t * 0.5) * Math.cos(ny * 2.5 - t * 0.4) +
        Math.cos(nx * 5 - t * 0.3) * Math.sin(ny * 4 + t * 0.45) +
        Math.sin((nx + ny) * 2.2 + t * 0.35) * 0.5
      ) * Math.PI

    }

    function frame() {
      raf = 0
      if (dead) return

      // Soft white fade — keeps trails visible but fades old ones
      ctx.globalAlpha = 0.08
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, W, H)
      ctx.globalAlpha = 1

      time += 0.012

      for (let i = 0; i < N; i++) {
        const a = angle(px[i], py[i], time) + ph[i] * 0.1
        const vx = Math.cos(a) * spd[i]
        const vy = Math.sin(a) * spd[i]

        px[i] += vx
        py[i] += vy

        // Wrap edges
        if (px[i] < 0) px[i] = W
        if (px[i] > W) px[i] = 0
        if (py[i] < 0) py[i] = H
        if (py[i] > H) py[i] = 0

        // Store in ring buffer
        const p = hptr[i]
        hx[i][p] = px[i]
        hy[i][p] = py[i]
        hptr[i] = (p + 1) % TRAIL

        // Draw trail — walk ring buffer in order
        ctx.beginPath()
        let first = true
        for (let j = 0; j < TRAIL; j++) {
          const idx = (hptr[i] + j) % TRAIL
          if (first) { ctx.moveTo(hx[i][idx], hy[i][idx]); first = false }
          else ctx.lineTo(hx[i][idx], hy[i][idx])
        }
        ctx.strokeStyle = COLORS[col[i]]
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.6
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    // Resize observer
    const ro = new ResizeObserver(() => {
      W = parent.offsetWidth || window.innerWidth
      H = parent.offsetHeight || 600
      cv.width  = Math.round(W * DPR)
      cv.height = Math.round(H * DPR)
      cv.style.width  = W + 'px'
      cv.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, W, H)
    })
    ro.observe(parent)

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}

export default EvenMesh
