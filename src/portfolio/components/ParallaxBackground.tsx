import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * ParallaxBackground
 * ──────────────────
 * A layered parallax background system with:
 *  - Large soft gradient orbs that drift at different scroll speeds
 *  - Floating geometric accents (rings, soft blobs)
 *  - Subtle SVG grid / dot pattern that scrolls slower than content
 *  - Mouse-responsive subtle tilt on each layer
 *
 * Drop this inside any section that needs depth.
 * The component is purely decorative: aria-hidden, pointer-events-none.
 */

interface ParallaxBackgroundProps {
  /** Palette variant — maps to the brand palette */
  variant?: 'warm' | 'cool' | 'neutral'
  /** How aggressively the layers move relative to scroll (0 = none, 1 = full) */
  intensity?: number
  className?: string
}

export function ParallaxBackground({
  variant = 'warm',
  intensity = 1,
  className = '',
}: ParallaxBackgroundProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const spring = useSpring(scrollYProgress, { stiffness: 35, damping: 22, mass: 0.6 })

  // Layer velocities — different depths
  const y0 = useTransform(spring, [0, 1], [0, 60 * intensity])   // slowest (far)
  const y1 = useTransform(spring, [0, 1], [0, -90 * intensity])  // medium
  const y2 = useTransform(spring, [0, 1], [0, 130 * intensity])  // faster (near)
  const x1 = useTransform(spring, [0, 1], [-20 * intensity, 20 * intensity])
  const x2 = useTransform(spring, [0, 1], [20 * intensity, -30 * intensity])
  const rotate1 = useTransform(spring, [0, 1], [0, 18 * intensity])
  const rotate2 = useTransform(spring, [0, 1], [0, -24 * intensity])

  // Palette color maps
  const colors = {
    warm: {
      orb1: 'rgba(198, 71, 43, 0.09)',    // oxblood
      orb2: 'rgba(217, 164, 65, 0.12)',   // gold
      orb3: 'rgba(245, 226, 219, 0.7)',   // warm peach
      ring: 'rgba(198, 71, 43, 0.06)',
      dot: 'rgba(198, 71, 43, 0.04)',
    },
    cool: {
      orb1: 'rgba(46, 111, 94, 0.10)',    // teal deep
      orb2: 'rgba(91, 168, 143, 0.08)',   // teal sage
      orb3: 'rgba(240, 244, 247, 0.75)',  // warm mist
      ring: 'rgba(46, 111, 94, 0.06)',
      dot: 'rgba(46, 111, 94, 0.035)',
    },
    neutral: {
      orb1: 'rgba(217, 164, 65, 0.08)',
      orb2: 'rgba(46, 111, 94, 0.06)',
      orb3: 'rgba(245, 241, 234, 0.65)',
      ring: 'rgba(92, 101, 117, 0.05)',
      dot: 'rgba(92, 101, 117, 0.03)',
    },
  }

  const c = colors[variant]

  // Static fallback for reduced motion — just show the background colors, no animation
  if (reduced) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 25% 40%, ${c.orb1}, transparent 65%),
                         radial-gradient(ellipse 50% 45% at 75% 60%, ${c.orb2}, transparent 60%)`,
          }}
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* ── Layer 0: Slowest drift (far depth) — large soft wash ── */}
      <motion.div
        style={{ y: y0, x: x1 }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <div
          className="absolute top-[-10%] left-[-5%] w-[55%] h-[55%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${c.orb3} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[-8%] right-[5%] w-[45%] h-[45%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${c.orb2} 0%, transparent 70%)`,
            filter: 'blur(70px)',
          }}
        />
      </motion.div>

      {/* ── Layer 1: Medium drift — accent orbs ── */}
      <motion.div
        style={{ y: y1, x: x2 }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute top-[20%] right-[-8%] w-[38%] h-[38%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${c.orb1} 0%, transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full"
          style={{
            background: `radial-gradient(circle, ${c.orb2} 0%, transparent 70%)`,
            filter: 'blur(55px)',
          }}
        />
      </motion.div>

      {/* ── Layer 2: Faster drift — floating geometric rings ── */}
      <motion.div
        style={{ y: y2, rotate: rotate1 }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Large ring — top right area */}
        <div
          className="absolute top-[5%] right-[12%] w-64 h-64 rounded-full"
          style={{
            border: `1.5px solid ${c.ring}`,
            boxShadow: `inset 0 0 40px ${c.orb1}`,
          }}
        />
        {/* Small ring — bottom left */}
        <div
          className="absolute bottom-[15%] left-[8%] w-32 h-32 rounded-full"
          style={{
            border: `1px solid ${c.ring}`,
          }}
        />
      </motion.div>

      {/* ── Layer 3: Counter-rotating — diamond accent ── */}
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Rotated square (diamond shape) — mid right */}
        <div
          className="absolute top-[40%] right-[20%] w-20 h-20"
          style={{
            border: `1px solid ${c.ring}`,
            borderRadius: '4px',
          }}
        />
        {/* Tiny accent square */}
        <div
          className="absolute top-[60%] left-[20%] w-8 h-8"
          style={{
            border: `1px solid ${c.ring}`,
            borderRadius: '2px',
          }}
        />
      </motion.div>

      {/* ── SVG dot grid — very subtle, scrolls at slowest speed ── */}
      <motion.div
        style={{ y: y0 }}
        className="absolute inset-[-10%] will-change-transform opacity-60"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id={`dotGrid-${variant}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill={c.dot} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#dotGrid-${variant})`} />
        </svg>
      </motion.div>
    </div>
  )
}

export default ParallaxBackground
