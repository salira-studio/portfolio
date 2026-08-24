import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Cpu, Zap, HeartPulse, ShoppingBag, Truck, UtensilsCrossed, Check, Code2, Handshake, Shield, Phone, FileCode } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { HeroAntigravity } from '../components/HeroAntigravity'
import { DeviceShowcase } from '../components/DeviceShowcase'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/** Masked word-by-word rise-in for hero display type */
function RevealWords({
  text,
  delay,
  reduced,
  className,
}: {
  text: string
  delay: number
  reduced: boolean
  className?: string
}) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduced ? {} : { y: '112%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: delay + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < text.split(' ').length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const upcoming = [
  {
    icon: HeartPulse,
    name: 'Healthcare',
    headline: 'Software shaped around real care workflows.',
    blurb: 'Patient and clinic experiences designed around the way care teams actually work.',
    tag: 'Next Build',
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    headline: 'Connected software for modern retail operations.',
    blurb: 'Storefront, inventory and staff experiences designed as one connected workflow.',
    tag: 'Research',
  },
  {
    icon: Truck,
    name: 'Logistics',
    headline: 'Operations software built around how goods move.',
    blurb: 'Tracking and operational experiences designed around the realities of moving goods.',
    tag: 'Concept',
  },
]

const studioPillars = [
  {
    n: '01',
    t: 'Discovery',
    d: 'We begin by understanding your requirements, goals, and constraints. This includes conversations about what the software needs to do, who will use it, and what success looks like.',
    icon: Layers,
  },
  {
    n: '02',
    t: 'Planning',
    d: 'Based on what we learn, we recommend the right technologies, define the scope, and outline a development roadmap. You will know what we are building, how, and roughly how long it will take.',
    icon: Cpu,
  },
  {
    n: '03',
    t: 'Development',
    d: 'We build the solution iteratively, sharing progress and gathering feedback along the way. The tech stack is chosen to match the project, not the other way around.',
    icon: Zap,
  },
  {
    n: '04',
    t: 'Delivery & Support',
    d: 'Once complete, we ensure the software is deployed and functioning as intended. We remain available for support, maintenance, and future improvements as your needs evolve.',
    icon: Layers,
  },
]


export default function Home() {
  const reduced = usePrefersReducedMotion()

  // Cursor spotlight (spring-smoothed, desktop pointers)
  const spotX = useMotionValue('72%')
  const spotY = useMotionValue('38%')
  const smoothSpotX = useSpring(spotX, { stiffness: 55, damping: 20 })
  const smoothSpotY = useSpring(spotY, { stiffness: 55, damping: 20 })

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const hero = document.getElementById('hero')
    if (!hero) return
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      spotX.set(`${((e.clientX - rect.left) / rect.width) * 100}%`)
      spotY.set(`${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [reduced, spotX, spotY])

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* ── Hero: Vivid gradient room ── */}
      <section id="hero" className="sl-hero-vivid relative min-h-[85vh] overflow-hidden">
        {/* Ambient atmospheric backdrop */}
        <div className="sl-hero-hue" aria-hidden="true" />

        {/* Antigravity orb field — interactive canvas layer */}
        <HeroAntigravity />

        {/* Cursor-following spotlight */}
        <motion.div
          className="sl-spotlight"
          aria-hidden="true"
          style={{ '--spot-x': smoothSpotX, '--spot-y': smoothSpotY } as CSSProperties}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 sm:pb-36 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,26rem)] lg:gap-16">
            {/* Hero Left Content */}
            <div>
              {/* Pill badge */}
              <motion.div
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sl-gold)] shadow-2xs backdrop-blur-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sl-gold)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--sl-gold)]" />
                </span>
                Building since 2024
              </div>
            </motion.div>

            {/* Display Headline — masked word-by-word rise */}
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
              <RevealWords
                text="We build custom software around"
                delay={0.2}
                reduced={reduced}
                className="block"
              />
              <RevealWords
                text="how your business"
                delay={0.42}
                reduced={reduced}
                className="sl-text-iris italic font-normal block pr-2"
              />
              <RevealWords text="actually works." delay={0.58} reduced={reduced} className="block" />
            </h1>

            <motion.p
              className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Salira Software Studio builds custom software for web, mobile, and desktop. We don't do marketing or growth promises — we build reliable software and hand you full ownership.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton strength={0.3}>
                <a
                  href="#contact"
                  data-cursor="open"
                  data-cursor-text="Contact"
                  className="sl-halo-gold inline-flex items-center gap-2.5 rounded-xl bg-[var(--sl-paper)] px-6 py-3.5 text-sm font-semibold text-[var(--sl-ink)] transition-all hover:bg-white hover:shadow-lg active:scale-98"
                >
                  Tell us about your business
                  <ArrowRight size={16} />
                </a>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <a
                  href="#pricing"
                  className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  <span>See pricing</span>
                  <ArrowRight
                    size={14}
                    className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  />
                </a>
              </MagneticButton>
            </motion.div>

            {/* What We Build */}
            <motion.div
              className="mt-14 flex flex-wrap items-center gap-6 sm:gap-10"
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs font-medium uppercase tracking-wider text-white/35">
                What we build
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
                <span>Web Apps</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Mobile Apps</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Desktop Software</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right: Live Device Stack */}
          <motion.div
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="pb-10 lg:pb-0"
          >
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <DeviceShowcase />
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ── 1. Industries / Work Grid: Lifted White Section ── */}
      <section className="sl-section-work relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="sl-label">Industry Verticals</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-4xl">
                Software shaped around the business.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--sl-ink-soft)]">
              We don't start with a fixed product. We understand how a business operates, then design and engineer the digital experiences that fit it.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {/* Featured Active Card: AURA (Restaurants) */}
            <FadeUp delay={0.1}>
              <Link
                to="/work/restaurants"
                data-cursor="view"
                data-cursor-text="AURA"
                className="group sl-card-highlight sl-card sl-card-alive block overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="grid md:grid-cols-12 items-stretch">
                  <div className="md:col-span-7 flex flex-col p-7 sm:p-10 z-10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-accent)] shadow-2xs">
                        <UtensilsCrossed size={20} strokeWidth={1.8} />
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="sl-label text-[var(--sl-accent-strong)] font-bold">Restaurants</span>
                        <span className="sl-label text-[var(--sl-charcoal)]">AURA</span>
                      </div>
                    </div>

                    <h3 className="mt-6 max-w-lg font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                      Digital experiences built around the restaurant.
                    </h3>
                    <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base">
                      From the moment a guest discovers the menu to the moment an order is fulfilled, AURA connects the experiences a restaurant needs to run digitally.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {['Guest Experience', 'Ordering', 'Restaurant Operations', 'Live Workflow'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-[var(--sl-sand-deep)]/40 px-2.5 py-1 text-xs font-medium text-[var(--sl-ink-soft)] ring-1 ring-[var(--sl-line)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sl-accent-strong)] transition-colors group-hover:text-[var(--sl-gold)]">
                      Explore AURA
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>

                  <div className="md:col-span-5 flex flex-col items-center justify-center border-t border-[var(--sl-line)] bg-[var(--sl-sand-deep)]/30 p-6 sm:p-8 md:border-t-0 md:border-l z-10">
                    {/* AURA product preview composition */}
                    <div className="relative w-full max-w-[280px]">
                      {/* Two preview surfaces with connection */}
                      <div className="flex items-start gap-3">
                        {/* Left: Customer Experience */}
                        <div className="flex-1 rounded-xl border border-[var(--sl-line)] bg-white p-3 shadow-sm">
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sl-oxblood)]" />
                            <span className="text-[9px] font-medium text-[var(--sl-charcoal)]">Guest</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-8 rounded bg-gradient-to-br from-[rgba(198,71,43,0.12)] to-transparent" />
                            <div className="h-1 w-full rounded-full bg-[var(--sl-line)]" />
                            <div className="h-1 w-2/3 rounded-full bg-[var(--sl-line-light)]" />
                            <div className="h-4 w-full rounded bg-[rgba(198,71,43,0.15)]" />
                          </div>
                        </div>

                        {/* Connection line */}
                        <div className="flex flex-col items-center pt-4">
                          <div className="h-px w-4 bg-[var(--sl-line)]" />
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--sl-gold)]" />
                          <div className="h-px w-4 bg-[var(--sl-line)]" />
                        </div>

                        {/* Right: Restaurant Operations */}
                        <div className="flex-1 rounded-xl border border-[var(--sl-line)] bg-white p-3 shadow-sm">
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sl-ink)]" />
                            <span className="text-[9px] font-medium text-[var(--sl-charcoal)]">Operations</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-8 rounded bg-gradient-to-br from-[rgba(46,111,94,0.1)] to-transparent" />
                            <div className="h-1 w-full rounded-full bg-[var(--sl-line)]" />
                            <div className="h-1 w-1/2 rounded-full bg-[var(--sl-line-light)]" />
                            <div className="flex gap-1">
                              <div className="h-3 flex-1 rounded bg-[rgba(46,111,94,0.1)]" />
                              <div className="h-3 flex-1 rounded bg-[rgba(217,164,65,0.1)]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-center text-[10px] text-[var(--sl-charcoal)]">
                        One restaurant workflow, expressed through the experiences it actually needs.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>

            {/* Upcoming Verticals Grid */}
            <StaggerContainer
              staggerDelay={0.12}
              className="grid gap-4 sm:grid-cols-3"
            >
              {upcoming.map((ind) => (
                <StaggerItem key={ind.name}>
                  <div className="group sl-card-muted relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--sl-line)] bg-white/80 text-[var(--sl-charcoal)] transition-colors group-hover:text-[var(--sl-ink)]">
                        <ind.icon size={18} strokeWidth={1.6} />
                      </span>
                      <span className="rounded-full bg-[rgba(169,160,138,0.15)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--sl-charcoal)] ring-1 ring-[rgba(169,160,138,0.35)]">
                        {ind.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-[var(--sl-ink)]">
                      {ind.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium text-[var(--sl-ink-soft)]">
                      {ind.headline}
                    </p>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--sl-ink-soft)]">
                      {ind.blurb}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[var(--sl-line-light)] pt-4 text-[11px] font-medium text-[var(--sl-charcoal)]">
                      <span>In development</span>
                      <span className="inline-flex gap-1" aria-hidden="true">
                        <span className="h-1 w-1 rounded-full bg-[var(--sl-taupe)]" />
                        <span className="h-1 w-1 rounded-full bg-[var(--sl-taupe)] opacity-60" />
                        <span className="h-1 w-1 rounded-full bg-[var(--sl-taupe)] opacity-30" />
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── 2. About Section: Deeper Sand (#EFE7D8) — Quietest ── */}
      <section
        id="about"
        className="sl-section-about scroll-mt-24 relative"
      >
        <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
          <div className="max-w-3xl">
            <FadeUp>
              <p className="sl-label text-[var(--sl-charcoal)]">What We Do</p>
            </FadeUp>
            <FadeUp delay={0.1} duration={0.8}>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-tight text-balance text-[var(--sl-ink)] sm:text-6xl">
                Salira Software Studio develops web applications, mobile apps, and desktop software for businesses and individuals.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--sl-charcoal)] sm:text-lg">
                Each project is treated on its own terms, we begin by understanding your requirements, then select the right technologies to build exactly what you need. The result: software that fits, built to work.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 2b. Why Choose Us — 5 Reasons ── */}
      <section className="relative z-10 bg-white border-t border-[var(--sl-line)]">
        <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
          <FadeUp>
            <p className="sl-label text-[var(--sl-charcoal)]">Why Salira</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-4xl">
              Software built around your business.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base">
              We build custom software for web, mobile, and desktop. Every project starts with understanding your business, then engineering the right solution.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Handshake,
                title: 'Business-first approach',
                desc: 'We start by understanding how your business works — your process, your data, your constraints — then build the software that fits.',
              },
              {
                icon: FileCode,
                title: 'Full source code ownership',
                desc: 'Every line of code belongs to you. No lock-in, no platform dependency. Hire any developer later — they can work with it.',
              },
              {
                icon: Shield,
                title: 'Transparent fixed pricing',
                desc: 'You know the cost before we start. Milestone-based billing. No surprise invoices, no scope creep.',
              },
              {
                icon: Code2,
                title: 'Technology matched to the problem',
                desc: "We don't push a single stack. React, Flutter, Node, Python — we choose what fits your project, not what fits our resume.",
              },
              {
                icon: Zap,
                title: 'From prototype to production',
                desc: 'Whether you need a working demo to validate an idea or a full-scale system serving thousands, we build at the right scale.',
              },
            ].map((item) => (
              <FadeUp key={item.title} delay={0.15}>
                <div className="rounded-2xl border border-[var(--sl-line)] bg-[var(--sl-paper-lifted)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-accent)]">
                    <item.icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-[var(--sl-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--sl-ink-soft)]">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Services / Process Section: Deep Pine (#1D2B26) ── */}
      <section className="sl-section-process relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="sl-label text-[var(--sl-teal-sage)]">How We Work</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-paper)] sm:text-4xl">
                Our process is shaped by the project.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[rgba(245,241,234,0.7)]">
              We match our methods and technologies to your specific needs, ensuring the solution is purpose-built and built to last.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {studioPillars.map((item, idx) => (
              <div key={item.n} className="group relative">
                <motion.div
                  initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="h-px w-full bg-gradient-to-r from-[rgba(245,241,234,0.15)] via-[var(--sl-teal-sage)]/40 to-transparent"
                />

                <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-start sm:gap-10">
                  <motion.div
                    initial={reduced ? {} : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 + 0.1 }}
                    className="flex items-center gap-3 shrink-0"
                  >
                    <span className="font-display text-3xl font-bold text-[var(--sl-teal-sage)] sm:text-4xl">
                      {item.n}
                    </span>
                    <div className="h-6 w-px bg-[rgba(245,241,234,0.15)] sm:hidden" />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      initial={reduced ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.15 }}
                      className="font-display text-xl font-semibold tracking-tight text-[var(--sl-paper)] sm:text-2xl"
                    >
                      {item.t}
                    </motion.h3>
                    <motion.p
                      initial={reduced ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                      className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgba(245,241,234,0.7)] sm:text-base"
                    >
                      {item.d}
                    </motion.p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Pricing Section ── */}
      <section id="pricing" className="sl-section-pricing relative z-10 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-28">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <FadeUp>
              <p className="sl-label text-[var(--sl-charcoal)]">Pricing</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-4xl">
                Honest pricing. No surprises.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-4 text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base max-w-2xl mx-auto">
                See exactly what you pay for before we write a single line of code. Fixed-price quotes. Source code ownership. No hidden fees.
              </p>
            </FadeUp>
          </div>

          {/* How It Works — 3 Steps */}
          <FadeUp delay={0.3}>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {[
                { step: '01', title: 'Tell Us Your Business', desc: 'Share what you do, what problems you face, what you want to automate. 30-minute call. Free. No commitment.' },
                { step: '02', title: 'We Show You What You Need', desc: 'No tech jargon. We explain what to build, what not to build, and why. You get a written scope with fixed pricing.' },
                { step: '03', title: 'We Build. You Launch.', desc: 'Milestone-based delivery. You see progress every 2 weeks. Source code is yours. Always.' },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-[var(--sl-line)] bg-white p-6 shadow-sm">
                  <span className="font-display text-3xl font-bold text-[var(--sl-gold)]">{item.step}</span>
                  <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-[var(--sl-ink)]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--sl-ink-soft)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── Website Design Pricing ── */}
          <FadeUp delay={0.4}>
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-accent)]">
                  <Layers size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">Website Design</h3>
                  <p className="text-xs text-[var(--sl-ink-soft)]">From simple brochure sites to full business platforms</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    tier: 'Starter',
                    price: '₹25,000',
                    timeline: '2–3 weeks',
                    desc: 'For new businesses that need a clean online presence',
                    features: [
                      '3–5 page responsive website',
                      'Professional layout with your branding',
                      'Contact form + WhatsApp button',
                      'Google Maps integration',
                      'Social media links',
                      'Basic on-page SEO setup',
                      'Mobile responsive design',
                      'SSL certificate setup',
                      '1 round of revisions',
                    ],
                  },
                  {
                    tier: 'Professional',
                    price: '₹60,000',
                    timeline: '4–6 weeks',
                    desc: 'For established businesses that need to look credible and get found',
                    features: [
                      '8–15 page custom-designed website',
                      'Content management system (CMS)',
                      'Blog with SEO-optimized structure',
                      'Lead capture forms + enquiry routing',
                      'Google My Business + Search Console setup',
                      'Structured data & schema markup',
                      'Speed optimization (< 3s load)',
                      'Image gallery / video section',
                      '2 rounds of revisions',
                      '30 days post-launch support',
                    ],
                    popular: true,
                  },
                  {
                    tier: 'Business',
                    price: '₹1,50,000',
                    timeline: '8–12 weeks',
                    desc: 'For businesses needing custom functionality and integrations',
                    features: [
                      'Everything in Professional',
                      'Custom modules (booking, catalogue, membership)',
                      'Role-based admin dashboard',
                      'Payment gateway integration',
                      'CRM / email marketing integration',
                      'Multi-location or multi-language support',
                      'Advanced analytics & reporting',
                      'Staging environment for testing',
                      'Performance & security audit',
                      '3 months post-launch support',
                    ],
                  },
                ].map((item) => (
                  <div key={item.tier} className={`rounded-2xl border bg-white p-6 shadow-sm flex flex-col ${item.popular ? 'border-2 border-[var(--sl-gold)] shadow-lg relative' : 'border-[var(--sl-line)]'}`}>
                    {item.popular && <span className="absolute -top-3 left-6 rounded-full bg-[var(--sl-gold)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">Most Popular</span>}
                    <p className={`text-xs font-semibold uppercase tracking-wider ${item.popular ? 'text-[var(--sl-gold)]' : 'text-[var(--sl-charcoal)]'}`}>{item.tier}</p>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-3xl font-bold text-[var(--sl-ink)]">{item.price}</span>
                      <span className="text-xs text-[var(--sl-ink-soft)]">onwards</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">{item.timeline} delivery</p>
                    <p className="mt-2 text-xs text-[var(--sl-charcoal)]">{item.desc}</p>

                    <div className="my-4 h-px bg-[var(--sl-line-light)]" />

                    <div className="flex-1 space-y-2">
                      {item.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                          <Check size={14} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--sl-line-light)]">
                      <a href="#contact" className={`flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${item.popular ? 'bg-[var(--sl-gold)] text-white shadow-md hover:bg-[#c49535]' : 'border border-[var(--sl-line)] bg-[var(--sl-sand-deep)]/30 text-[var(--sl-ink)] hover:bg-[var(--sl-sand-deep)]'}`}>
                        Get a Quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* ── Mobile App Pricing ── */}
          <FadeUp delay={0.5}>
            <div className="mt-20">
              <div className="flex items-center gap-3 mb-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-accent)]">
                  <Cpu size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">Mobile App Development</h3>
                  <p className="text-xs text-[var(--sl-ink-soft)]">Android + iPhone apps built with Flutter or React Native</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    tier: 'MVP',
                    price: '₹1,00,000',
                    timeline: '4–6 weeks',
                    desc: 'For startups validating an idea with real users',
                    features: [
                      '5–10 screens with clean UI',
                      'User registration (email + phone)',
                      'Core business feature (1 workflow)',
                      'Basic admin panel',
                      'Push notifications',
                      'App store submission (Play Store)',
                      '30 days post-launch support',
                    ],
                  },
                  {
                    tier: 'Business App',
                    price: '₹2,50,000',
                    timeline: '8–12 weeks',
                    desc: 'For businesses that need a proper mobile presence',
                    features: [
                      '15–25 screens with custom design',
                      'User auth (email, phone, social login)',
                      'Payment gateway (UPI, Cards, Wallets)',
                      'Real-time push notifications',
                      'Google Maps + location services',
                      'Camera + media upload',
                      'Admin dashboard (web-based)',
                      'Play Store + App Store submission',
                      '3 months post-launch support',
                    ],
                    popular: true,
                  },
                  {
                    tier: 'Enterprise',
                    price: '₹5,00,000',
                    timeline: '16–24 weeks',
                    desc: 'For complex platforms with multiple user roles',
                    features: [
                      'Everything in Business App',
                      'Multi-role system (customer + staff + admin)',
                      'Real-time features (chat, tracking, live updates)',
                      'Advanced analytics & reporting',
                      'Third-party API integrations',
                      'Offline mode + data sync',
                      'Multi-language support',
                      'Security audit + compliance',
                      '6 months post-launch support',
                    ],
                  },
                ].map((item) => (
                  <div key={item.tier} className={`rounded-2xl border bg-white p-6 shadow-sm flex flex-col ${item.popular ? 'border-2 border-[var(--sl-gold)] shadow-lg relative' : 'border-[var(--sl-line)]'}`}>
                    {item.popular && <span className="absolute -top-3 left-6 rounded-full bg-[var(--sl-gold)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">Most Popular</span>}
                    <p className={`text-xs font-semibold uppercase tracking-wider ${item.popular ? 'text-[var(--sl-gold)]' : 'text-[var(--sl-charcoal)]'}`}>{item.tier}</p>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-3xl font-bold text-[var(--sl-ink)]">{item.price}</span>
                      <span className="text-xs text-[var(--sl-ink-soft)]">onwards</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">{item.timeline} delivery</p>
                    <p className="mt-2 text-xs text-[var(--sl-charcoal)]">{item.desc}</p>

                    <div className="my-4 h-px bg-[var(--sl-line-light)]" />

                    <div className="flex-1 space-y-2">
                      {item.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                          <Check size={14} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--sl-line-light)]">
                      <a href="#contact" className={`flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${item.popular ? 'bg-[var(--sl-gold)] text-white shadow-md hover:bg-[#c49535]' : 'border border-[var(--sl-line)] bg-[var(--sl-sand-deep)]/30 text-[var(--sl-ink)] hover:bg-[var(--sl-sand-deep)]'}`}>
                        Get a Quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* ── Bundle: Website + App ── */}
          <FadeUp delay={0.55}>
            <div className="mt-20 rounded-2xl border-2 border-[var(--sl-gold)] bg-white p-8 shadow-lg relative">
              <span className="absolute -top-3.5 left-8 rounded-full bg-[var(--sl-gold)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">Best Value</span>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)]">Website + Mobile App Bundle</h3>
                  <p className="mt-2 text-sm text-[var(--sl-ink-soft)]">Get both a professional website and mobile apps (Android + iPhone) at a combined price. Shared design system, shared backend, less repeat work — you save ₹1L+ compared to buying separately.</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-[var(--sl-ink)]">₹2,50,000</span>
                    <span className="text-sm text-[var(--sl-ink-soft)]">onwards</span>
                    <span className="text-xs text-[var(--sl-charcoal)] ml-2">8–14 weeks delivery</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-[var(--sl-gold)] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#c49535] hover:shadow-lg">
                    Get a Quote
                  </a>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  'Professional website (8–15 pages)',
                  'Android + iPhone mobile apps',
                  'Payment gateway integration',
                  'Admin dashboard',
                  'Push notifications',
                  'Play Store + App Store listing',
                  'Shared backend & design system',
                  '3 months free maintenance',
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                    <Check size={14} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* What's Always Included */}
          <FadeUp delay={0.5}>
            <div className="mt-16">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">Every Project. Every Time. No Exceptions.</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  'Source code ownership',
                  'Fixed-price quote',
                  'Mobile responsive',
                  'Fast loading',
                  'SSL security',
                  'Google setup',
                  'Milestone billing',
                  'Minimum 30 days support',
                  'Documentation',
                  'Training session',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-[var(--sl-line-light)] bg-white px-3 py-2.5">
                    <Check size={14} className="shrink-0 text-[var(--sl-teal-sage)]" />
                    <span className="text-[11px] font-medium text-[var(--sl-ink)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Maintenance Plans */}
          <FadeUp delay={0.55}>
            <div className="mt-16 rounded-2xl border border-[var(--sl-line)] bg-white p-7 shadow-sm">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">Keep It Running — Maintenance Plans</h3>
              <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">After launch, keep your software secure and updated.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { plan: 'Basic', price: '₹8,000/mo', features: ['Bug fixes & security updates', 'Hosting & uptime monitoring', 'Monthly health check'] },
                  { plan: 'Standard', price: '₹15,000/mo', features: ['Everything in Basic', 'Content changes', 'Monthly performance report', 'WhatsApp support'] },
                  { plan: 'Premium', price: '₹25,000/mo', features: ['Everything in Standard', 'New features included', 'Priority support', 'Dedicated hours'] },
                ].map((item) => (
                  <div key={item.plan} className="rounded-xl border border-[var(--sl-line-light)] bg-[var(--sl-sand-deep)]/20 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sl-charcoal)]">{item.plan}</p>
                    <p className="mt-1 font-display text-lg font-bold text-[var(--sl-ink)]">{item.price}</p>
                    <ul className="mt-3 space-y-1.5">
                      {item.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-[11px] text-[var(--sl-ink-soft)]">
                          <Check size={12} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* FAQ */}
          <FadeUp delay={0.75}>
            <div className="mt-16 max-w-3xl mx-auto">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)] text-center">Frequently Asked Questions</h3>
              <div className="mt-6 space-y-3">
                {[
                  { q: "I don't know what I need technically. Is that okay?", a: "Yes. That's exactly why we exist. Tell us your business problem in plain language. We'll figure out the technical part and explain it back to you in simple terms before you pay anything." },
                  { q: "Should I start with just a website or go straight to the bundle?", a: "Start with what your business needs right now. If you need an online presence fast, start with the website. When you're ready for an app, we'll build it as a separate project — or you can bundle both from the start and save." },
                  { q: "What if I need changes after launch?", a: "Every project includes free support (30 days to 6 months depending on the service). After that, maintenance plans start at ₹8,000/month. You can also hire any developer — you own the code." },
                  { q: "How do I know the price is fair?", a: "Our prices are based on actual Indian market rates. We're not the cheapest (freelancers who may disappear). We're not the most expensive (large agencies with overhead). We're the sweet spot: quality work, fair price, reliable delivery." },
                  { q: "Can I pay in installments?", a: "Yes. Every project uses milestone-based billing — you pay as we deliver, not all upfront. For projects above ₹3L, we also offer EMI options through Razorpay." },
                  { q: "How is the bundle cheaper than buying separately?", a: "The bundle saves you money because we build the website and app together — shared design system, shared backend, less重复 work. You save ₹1L+ compared to buying each separately." },
                ].map((item) => (
                  <details key={item.q} className="group rounded-xl border border-[var(--sl-line-light)] bg-white">
                    <summary className="flex cursor-pointer items-center justify-between p-4 text-xs font-medium text-[var(--sl-ink)] list-none">
                      {item.q}
                      <span className="ml-2 shrink-0 text-[var(--sl-charcoal)] transition-transform group-open:rotate-180">▾</span>
                    </summary>
                    <p className="px-4 pb-4 text-xs leading-relaxed text-[var(--sl-ink-soft)]">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Final CTA */}
          <FadeUp delay={0.8}>
            <div className="mt-16 text-center">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)]">Not Sure What You Need?</h3>
              <p className="mt-2 text-sm text-[var(--sl-ink-soft)]">Tell us about your business. We'll figure out what you need — and what you don't.</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton strength={0.3}>
                  <a
                    href="https://wa.me/917397430568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[var(--sl-ink)] px-6 py-3.5 text-sm font-semibold text-[var(--sl-paper)] shadow-md transition-all hover:bg-black hover:shadow-lg active:scale-98"
                  >
                    Book Free 30-Minute Call
                    <ArrowRight size={16} />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.15}>
                  <a
                    href="mailto:hello@salira.studio"
                    className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-[var(--sl-charcoal)] transition-colors hover:text-[var(--sl-ink)]"
                  >
                    <span>Send Your Requirements</span>
                    <ArrowRight size={14} className="text-[var(--sl-charcoal)]/40 transition-transform group-hover:translate-x-1" />
                  </a>
                </MagneticButton>
              </div>
              <p className="mt-4 text-[11px] text-[var(--sl-charcoal)]">No commitment. No sales pressure. Just honest advice.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 5. Contact Section with Form ── */}
      <section
        id="contact"
        className="sl-section-contact scroll-mt-16 relative overflow-hidden"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--sl-paper)] ring-1 ring-white/25">
                <Sparkles size={12} />
                Get in Touch
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[var(--sl-paper)] sm:text-5xl">
                Ready to build something that fits?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[rgba(245,241,234,0.8)] sm:text-base">
                Tell us about your business and what's not working. We'll figure out what you need — and what you don't.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-[rgba(245,241,234,0.8)]">
                  <Phone size={16} className="shrink-0" />
                  <a href="tel:+917397430568" className="hover:text-white transition-colors">+91 73974 30568</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[rgba(245,241,234,0.8)]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <a href="https://wa.me/917397430568" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp us</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[rgba(245,241,234,0.8)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:hello@salira.studio" className="hover:text-white transition-colors">hello@salira.studio</a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-xs sm:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const data = new FormData(form)
                  const name = data.get('name')
                  const phone = data.get('phone')
                  const type = data.get('type')
                  const message = data.get('message')
                  const text = `Hi Salira, I'm ${name}. Phone: ${phone}. Project type: ${type}. ${message}`
                  window.open(`https://wa.me/917397430568?text=${encodeURIComponent(text)}`, '_blank')
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[rgba(245,241,234,0.7)] mb-1.5">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm text-[var(--sl-paper)] placeholder:text-white/30 outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-[rgba(245,241,234,0.7)] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm text-[var(--sl-paper)] placeholder:text-white/30 outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-xs font-medium text-[rgba(245,241,234,0.7)] mb-1.5">What do you need?</label>
                  <select
                    id="type"
                    name="type"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm text-[var(--sl-paper)] outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors appearance-none"
                  >
                    <option value="website" className="bg-[var(--sl-ink)]">Website</option>
                    <option value="mobile-app" className="bg-[var(--sl-ink)]">Mobile App</option>
                    <option value="both" className="bg-[var(--sl-ink)]">Website + App</option>
                    <option value="not-sure" className="bg-[var(--sl-ink)]">Not sure — need help figuring it out</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-[rgba(245,241,234,0.7)] mb-1.5">Tell us about your business</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="What does your business do? What's not working?"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2.5 text-sm text-[var(--sl-paper)] placeholder:text-white/30 outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--sl-gold)] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#c49535] hover:shadow-lg active:scale-[0.98]"
                >
                  Send via WhatsApp
                </button>
                <p className="text-center text-[10px] text-white/40">Opens WhatsApp with your details. No commitment.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
