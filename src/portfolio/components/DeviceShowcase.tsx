import { useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Flame,
  Search,
  ShoppingBag,
  Star,
  Wifi,
  BatteryFull,
  Signal,
} from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/**
 * Floating device-mockup stack for the portfolio hero.
 * A browser window + phone running miniature live UIs, gently
 * floating and tilting toward the cursor (desktop, fine pointers).
 */

function BrowserMock() {
  return (
    <div className="sl-mock-browser w-full shadow-2xl shadow-black/40">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-[rgba(23,22,27,0.08)] px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#C6472B]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D9A441]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7FBFA6]/90" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-white/80 px-2.5 py-1 ring-1 ring-[rgba(23,22,27,0.06)]">
          <Search size={9} className="text-[var(--sl-charcoal)]" />
          <span className="text-[8.5px] font-medium tracking-wide text-[var(--sl-charcoal)]">
            aura.restaurant
          </span>
        </div>
      </div>

      {/* Mini restaurant storefront */}
      <div className="space-y-2.5 p-3.5">
        {/* Store header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-[var(--sl-oxblood)] to-[var(--sl-gold)] text-[7px] font-bold text-white">
              A
            </span>
            <span className="text-[9px] font-bold text-[var(--sl-ink)]">AURA</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[var(--sl-accent-wash)] px-1.5 py-0.5">
            <ShoppingBag size={8} className="text-[var(--sl-oxblood)]" />
            <span className="text-[7px] font-bold text-[var(--sl-oxblood)]">2</span>
          </div>
        </div>

        {/* Hero strip */}
        <div className="relative h-14 overflow-hidden rounded-lg bg-[var(--sl-pine-deep)]">
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 75% 30%, rgba(217,164,65,0.35), transparent 55%), radial-gradient(circle at 20% 80%, rgba(198,71,43,0.3), transparent 50%)',
            }}
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute bottom-2 left-2.5">
            <p className="text-[8.5px] font-semibold leading-tight text-[var(--sl-paper)]">
              Ghee Roast Dosa
            </p>
            <p className="text-[7px] text-[rgba(245,241,234,0.6)]">₹180 · 20 min</p>
          </div>
          <Flame
            size={10}
            className="absolute right-2 top-2 text-[var(--sl-gold)]"
            aria-hidden="true"
          />
        </div>

        {/* Menu card grid */}
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-md bg-white p-1.5 ring-1 ring-[rgba(23,22,27,0.05)]"
              animate={{ y: [0, -1.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            >
              <div
                className={`h-6 rounded ${
                  ['bg-[rgba(198,71,43,0.12)]', 'bg-[rgba(217,164,65,0.16)]', 'bg-[rgba(46,111,94,0.12)]'][i]
                }`}
              />
              <div className="mt-1 h-1 w-full rounded-full bg-[rgba(23,22,27,0.07)]" />
              <div className="mt-0.5 h-1 w-2/3 rounded-full bg-[rgba(23,22,27,0.04)]" />
            </motion.div>
          ))}
        </div>

        {/* Live order pipeline */}
        <div className="rounded-lg bg-white p-2 ring-1 ring-[rgba(23,22,27,0.05)]">
          <div className="mb-1.5 flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7FBFA6] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-deep)]" />
            </span>
            <span className="text-[7px] font-semibold uppercase tracking-wider text-[var(--sl-charcoal)]">
              Order #104 · live
            </span>
          </div>
          <div className="flex items-center gap-1">
            {['Placed', 'Kitchen', 'On its way'].map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-1">
                <motion.span
                  className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full text-[6px] font-bold ${
                    i <= 1 ? 'bg-[var(--sl-teal-deep)] text-white' : 'bg-[rgba(23,22,27,0.06)] text-[var(--sl-charcoal)]'
                  }`}
                  animate={i === 1 ? { scale: [1, 1.18, 1] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {i <= 1 ? <Check size={6} strokeWidth={3} /> : i + 1}
                </motion.span>
                {i < 2 && (
                  <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-[rgba(23,22,27,0.06)]">
                    <motion.div
                      className="h-full rounded-full bg-[var(--sl-teal-sage)]"
                      initial={{ width: '0%' }}
                      animate={{ width: i === 0 ? '100%' : ['35%', '85%', '35%'] }}
                      transition={
                        i === 0
                          ? { duration: 0.8 }
                          : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneMock() {
  return (
    <div className="sl-mock-phone w-[118px] p-1.5 sm:w-[132px]">
      <div className="overflow-hidden rounded-[20px] bg-[#1d1c22]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 pt-1.5 pb-1">
          <span className="text-[6.5px] font-semibold text-white/70">9:41</span>
          <div className="flex items-center gap-0.5 text-white/60">
            <Signal size={6} />
            <Wifi size={6} />
            <BatteryFull size={7} />
          </div>
        </div>

        {/* App screen: live tracking */}
        <div className="space-y-2 px-2.5 pb-3 pt-1">
          <div className="flex items-center justify-between">
            <p className="text-[7px] font-bold uppercase tracking-wider text-white/45">
              Your order
            </p>
            <Star size={7} className="text-[var(--sl-gold)]" fill="currentColor" />
          </div>

          {/* ETA card */}
          <div className="rounded-lg bg-gradient-to-br from-[rgba(198,71,43,0.28)] to-[rgba(217,164,65,0.14)] p-2 ring-1 ring-white/10">
            <p className="font-display text-[13px] font-bold leading-none text-white">18 min</p>
            <p className="mt-0.5 text-[6.5px] text-white/55">Arriving · Ravi is on the way</p>
            <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-[var(--sl-gold)]"
                initial={{ width: '20%' }}
                animate={{ width: ['20%', '78%', '20%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Cart rows */}
          {[
            { name: 'Masala Dosa', price: '₹150', c: 'bg-[rgba(217,164,65,0.2)]' },
            { name: 'Filter Coffee', price: '₹60', c: 'bg-[rgba(46,111,94,0.24)]' },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] p-1.5 ring-1 ring-white/[0.06]"
            >
              <span className={`h-5 w-5 shrink-0 rounded ${row.c}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[7px] font-semibold text-white/85">{row.name}</p>
                <p className="text-[6.5px] text-white/40">{row.price}</p>
              </div>
            </div>
          ))}

          {/* CTA */}
          <motion.div
            className="flex items-center justify-center gap-1 rounded-lg bg-[var(--sl-paper)] py-1.5"
            animate={{ boxShadow: [
              '0 0 0px rgba(217,164,65,0)',
              '0 0 14px rgba(217,164,65,0.45)',
              '0 0 0px rgba(217,164,65,0)',
            ] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-[7px] font-bold text-[var(--sl-ink)]">Track order</span>
            <ArrowRight size={7} className="text-[var(--sl-ink)]" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function DeviceShowcase() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 })

  const rotateX = useTransform(sy, [0, 1], [7, -7])
  const rotateY = useTransform(sx, [0, 1], [-9, 9])

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
      className="relative w-full [perspective:1200px]"
      data-cursor="view"
      data-cursor-text="Live demo"
    >
      {/* Ambient glow under the stack */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[40px] blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(198,71,43,0.16), rgba(217,164,65,0.07) 45%, transparent 72%)',
        }}
        animate={reduced ? {} : { scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={reduced ? {} : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Browser — primary surface */}
        <motion.div
          style={{ transform: 'translateZ(0)' }}
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrowserMock />
        </motion.div>

        {/* Phone — overlapping foreground */}
        <motion.div
          className="absolute -bottom-10 -right-4 z-10 sm:-right-7"
          style={{ transform: 'translateZ(60px)' }}
          animate={reduced ? {} : { y: [0, -13, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <PhoneMock />
        </motion.div>

        {/* Floating status chip */}
        <motion.div
          className="absolute -top-5 -left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/12 bg-[rgba(23,22,27,0.85)] px-3 py-1.5 backdrop-blur-sm sm:-left-6"
          style={{ transform: 'translateZ(90px)' }}
          animate={reduced ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7FBFA6] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-sage)]" />
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-white/80">
            Two-sided live demo
          </span>
        </motion.div>
      </motion.div>

      {/* Spacer so absolute phone doesn't clip below fold of parent */}
      <div className="h-10" aria-hidden="true" />
    </div>
  )
}
