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
 * Light glass multi-device showcase for the hero.
 * Content labels preserved — chrome restyled for Light Studio Glass.
 */
export function HeroShowcaseClean() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.5 })

  const rotateX = useTransform(sy, [0, 1], [4, -4])
  const rotateY = useTransform(sx, [0, 1], [-6, 6])

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
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(217, 164, 65, 0.22) 0%, rgba(46, 111, 94, 0.14) 45%, rgba(198, 71, 43, 0.1) 70%, transparent 78%)',
        }}
        animate={reduced ? {} : { scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative space-y-4"
      >
        <div className="rounded-3xl border border-[var(--sl-line)] bg-white/80 p-4 shadow-[0_20px_60px_rgba(20,22,28,0.1)] backdrop-blur-xl sm:p-5">
          <div className="mb-3.5 flex items-center justify-between border-b border-[var(--sl-line-light)] pb-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E11D48]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F5A623]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/80" />
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-[var(--sl-sand-deep)]/80 px-3 py-1 font-mono text-[10px] text-[var(--sl-ink-soft)]">
              <Laptop size={11} className="text-[var(--sl-gold)]" />
              <span>yourbusiness.com · Custom Web Presence</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              Live
            </span>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--sl-line-light)] bg-[var(--sl-paper-lifted)]/90 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase text-[var(--sl-gold)]">Custom Crafted</p>
                <h4 className="mt-0.5 text-sm font-bold text-[var(--sl-ink)]">High-Converting Business Website</h4>
              </div>
              <span className="shrink-0 rounded-lg bg-[var(--sl-gold)] px-2.5 py-1 text-[10px] font-bold text-black shadow-xs">
                2–3 Week Delivery
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                'Mobile Responsive',
                'WhatsApp Button',
                'Google SEO Ready',
                '100% Code Ownership',
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-[var(--sl-line-light)] bg-white/90 p-2.5 text-xs transition-colors hover:border-[var(--sl-teal-deep)]/25"
                >
                  <CheckCircle2 size={14} className="shrink-0 text-[#10B981]" />
                  <span className="text-[11px] text-[var(--sl-ink-soft)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="rounded-2xl border border-[var(--sl-line)] bg-gradient-to-br from-white via-white to-[rgba(46,111,94,0.08)] p-4 shadow-lg backdrop-blur-md"
          animate={reduced ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(217,164,65,0.15)] text-[var(--sl-gold)]">
                <Smartphone size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-[var(--sl-ink)]">Need a Mobile App too?</p>
                <p className="text-[10px] text-[var(--sl-ink-soft)]">Android + iPhone apps built with shared backend</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-bold text-[var(--sl-oxblood)]">From ₹1.5L</span>
              <p className="text-[9px] text-[var(--sl-charcoal)]">Website + App Bundle</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-[var(--sl-line)] bg-white/75 p-2.5 shadow-xs backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[var(--sl-gold)]/35">
            <ShieldCheck size={14} className="mx-auto mb-1 text-[var(--sl-gold)]" />
            <p className="text-[10px] font-bold text-[var(--sl-ink)]">100% Code Ownership</p>
            <p className="text-[8px] text-[var(--sl-charcoal)]">Zero monthly rent</p>
          </div>
          <div className="rounded-xl border border-[var(--sl-line)] bg-white/75 p-2.5 shadow-xs backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[var(--sl-teal-deep)]/35">
            <Clock size={14} className="mx-auto mb-1 text-[#10B981]" />
            <p className="text-[10px] font-bold text-[var(--sl-ink)]">Fixed Timeline</p>
            <p className="text-[8px] text-[var(--sl-charcoal)]">2–4 week turnaround</p>
          </div>
          <div className="rounded-xl border border-[var(--sl-line)] bg-white/75 p-2.5 shadow-xs backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[var(--sl-oxblood)]/30">
            <Sparkles size={14} className="mx-auto mb-1 text-[var(--sl-teal-sage)]" />
            <p className="text-[10px] font-bold text-[var(--sl-ink)]">Free Support</p>
            <p className="text-[8px] text-[var(--sl-charcoal)]">30 days warranty</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
