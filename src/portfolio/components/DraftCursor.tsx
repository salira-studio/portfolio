import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface MeasurementHUD {
  x: number
  y: number
  nearestDistance: number | null
  nearestLabel: string | null
  targetBounds: { top: number; left: number; width: number; height: number } | null
}

/**
 * Signature Drafting Crosshair & Measurement Cursor
 * Provides live architectural X/Y coordinates and calculates dynamic pixel distances (Δ)
 * to interactive targets. Throttled via requestAnimationFrame for 60fps performance.
 * Fully disabled for touch devices and prefers-reduced-motion users.
 */
export function DraftCursor() {
  const reduced = usePrefersReducedMotion()
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  const [coords, setCoords] = useState<MeasurementHUD>({
    x: -100,
    y: -100,
    nearestDistance: null,
    nearestLabel: null,
    targetBounds: null,
  })
  const [isVisible, setIsVisible] = useState(false)
  const rafId = useRef<number | null>(null)
  const lastMousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 })

  useEffect(() => {
    if (reduced || isTouchDevice) return

    const updateProximity = () => {
      const { x, y } = lastMousePos.current
      if (x < 0 || y < 0) return

      // Find nearby interactive elements with data-draft-target or clickable elements
      const elements = document.querySelectorAll<HTMLElement>(
        '[data-draft-target], a, button, [role="button"], input, select, textarea, .salira-interactive'
      )

      let minDistance = Infinity
      let closestLabel: string | null = null
      let closestBounds: { top: number; left: number; width: number; height: number } | null = null

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // Center of the element
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(cx - x, cy - y)

        if (dist < minDistance && dist < 220) {
          minDistance = dist
          closestLabel =
            el.getAttribute('data-draft-target') ||
            el.getAttribute('aria-label') ||
            el.textContent?.trim().slice(0, 16) ||
            el.tagName.toLowerCase()
          closestBounds = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }
        }
      })

      setCoords({
        x,
        y,
        nearestDistance: minDistance !== Infinity ? Math.round(minDistance) : null,
        nearestLabel: closestLabel,
        targetBounds: closestBounds,
      })

      rafId.current = null
    }

    const onMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateProximity)
      }
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [reduced, isTouchDevice, isVisible])

  if (reduced || isTouchDevice || !isVisible) {
    return null
  }

  const { x, y, nearestDistance, nearestLabel } = coords
  const isNearTarget = nearestDistance !== null && nearestDistance < 80

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 select-none overflow-hidden"
    >
      {/* ── Crosshair Hairlines ── */}
      <div
        className="absolute left-0 right-0 h-[1px] opacity-25"
        style={{
          top: y,
          backgroundColor: isNearTarget ? 'var(--salira-redpen)' : 'var(--salira-blueprint)',
          backgroundImage:
            'linear-gradient(to right, transparent, var(--salira-blueprint) 40%, var(--salira-blueprint) 60%, transparent)',
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-[1px] opacity-25"
        style={{
          left: x,
          backgroundColor: isNearTarget ? 'var(--salira-redpen)' : 'var(--salira-blueprint)',
          backgroundImage:
            'linear-gradient(to bottom, transparent, var(--salira-blueprint) 40%, var(--salira-blueprint) 60%, transparent)',
        }}
      />

      {/* ── Center Crosshair Marker ── */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: x, top: y }}
      >
        {/* Precision Ring & Reticle */}
        <div
          className={`relative flex items-center justify-center rounded-full border transition-all duration-200 ${
            isNearTarget
              ? 'h-8 w-8 border-[var(--salira-redpen)] bg-[var(--salira-redpen-bg)] scale-110'
              : 'h-6 w-6 border-[var(--salira-blueprint)]/50 bg-white/20 backdrop-blur-[1px]'
          }`}
        >
          {/* Center Point */}
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isNearTarget ? 'bg-[var(--salira-redpen)] animate-ping' : 'bg-[var(--salira-blueprint)]'
            }`}
          />
          {/* Tick marks */}
          <span className="absolute -top-1 h-1 w-[1px] bg-[var(--salira-blueprint)]" />
          <span className="absolute -bottom-1 h-1 w-[1px] bg-[var(--salira-blueprint)]" />
          <span className="absolute -left-1 h-[1px] w-1 bg-[var(--salira-blueprint)]" />
          <span className="absolute -right-1 h-[1px] w-1 bg-[var(--salira-blueprint)]" />
        </div>

        {/* ── Live Technical Coordinates & Distance Readout HUD ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-5 top-5 flex flex-col gap-0.5 whitespace-nowrap rounded border border-[var(--salira-border-draft)] bg-[#F5F0E6]/95 px-2 py-1 shadow-xs backdrop-blur-md"
        >
          <div className="flex items-center gap-2 font-mono text-[9px] font-medium tracking-wider text-[var(--salira-blueprint)]">
            <span>
              X:<span className="font-bold text-[var(--salira-graphite)]">{x}</span>
            </span>
            <span>
              Y:<span className="font-bold text-[var(--salira-graphite)]">{y}</span>
            </span>
            {nearestDistance !== null && (
              <span className="text-[var(--salira-redpen)] font-bold">
                Δ:{nearestDistance}px
              </span>
            )}
          </div>
          {nearestLabel && nearestDistance !== null && nearestDistance < 100 && (
            <div className="font-mono text-[8px] uppercase tracking-wider text-[var(--salira-graphite-muted)] truncate max-w-[120px]">
              SPEC: {nearestLabel}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
