import { useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ShieldCheck,
  Clock,
  Sparkles,
  Smartphone,
  Laptop,
  CheckCircle2,
} from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Clean, High-Trust Multi-Device Showcase for the Hero Section.
 * Shows that SaLira builds modern, responsive websites and mobile apps
 * in a way that is immediately understandable and attractive to any business.
 */
export function HeroShowcaseClean() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.5 })

  const rotateX = useTransform(sy, [0, 1], [5, -5])
  const rotateY = useTransform(sx, [0, 1], [-7, 7])

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full max-w-lg [perspective:1200px]"
    >
      {/* Warm Ambient Backdrop Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full blur-3xl opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(217, 164, 65, 0.25) 0%, rgba(198, 71, 43, 0.15) 50%, transparent 70%)',
        }}
        animate={reduced ? {} : { scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative space-y-4"
      >
        {/* Main Laptop / Browser Screen */}
        <div className="rounded-3xl border border-white/15 bg-black/40 p-4 sm:p-5 backdrop-blur-xl shadow-2xl text-white">
          {/* Chrome bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E11D48]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F5A623]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/80" />
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1 text-[10px] font-mono text-white/70">
              <Laptop size={11} className="text-[var(--sl-gold)]" />
              <span>yourbusiness.com · Custom Web Presence</span>
            </div>
            <span className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live
            </span>
          </div>

          {/* Website Preview UI */}
          <div className="rounded-2xl bg-white/[0.06] p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase text-[var(--sl-gold)]">Custom Crafted</p>
                <h4 className="text-sm font-bold text-white mt-0.5">High-Converting Business Website</h4>
              </div>
              <span className="rounded-lg bg-[var(--sl-gold)] px-2.5 py-1 text-[10px] font-bold text-black shadow-xs">
                2–3 Week Delivery
              </span>
            </div>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="rounded-xl bg-white/[0.04] p-2.5 border border-white/5 flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                <span className="text-white/80 text-[11px]">Mobile Responsive</span>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-2.5 border border-white/5 flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                <span className="text-white/80 text-[11px]">WhatsApp Button</span>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-2.5 border border-white/5 flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                <span className="text-white/80 text-[11px]">Google SEO Ready</span>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-2.5 border border-white/5 flex items-center gap-2 text-xs">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                <span className="text-white/80 text-[11px]">100% Code Ownership</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Mobile Card Overlay */}
        <motion.div
          className="rounded-2xl border border-white/20 bg-gradient-to-br from-[var(--sl-ink)] to-[#1D2B26] p-4 text-white shadow-xl backdrop-blur-md"
          animate={reduced ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--sl-gold)]/20 text-[var(--sl-gold)]">
                <Smartphone size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-white">Need a Mobile App too?</p>
                <p className="text-[10px] text-white/60">Android + iPhone apps built with shared backend</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-[var(--sl-gold)]">From ₹1.5L</span>
              <p className="text-[9px] text-white/50">Website + App Bundle</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust Badges */}
        <div className="grid grid-cols-3 gap-2 text-center text-white">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-xs">
            <ShieldCheck size={14} className="mx-auto text-[var(--sl-gold)] mb-1" />
            <p className="text-[10px] font-bold">100% Code Ownership</p>
            <p className="text-[8px] text-white/50">Zero monthly rent</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-xs">
            <Clock size={14} className="mx-auto text-[#10B981] mb-1" />
            <p className="text-[10px] font-bold">Fixed Timeline</p>
            <p className="text-[8px] text-white/50">2–4 week turnaround</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-xs">
            <Sparkles size={14} className="mx-auto text-[var(--sl-teal-sage)] mb-1" />
            <p className="text-[10px] font-bold">Free Support</p>
            <p className="text-[8px] text-white/50">30 days warranty</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
