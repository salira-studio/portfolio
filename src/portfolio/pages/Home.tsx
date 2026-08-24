import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Cpu, Zap, HeartPulse, ShoppingBag, Truck, UtensilsCrossed, Check, X } from 'lucide-react'
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
                Custom Software Studio
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
              Salira Software Studio builds custom software for web, mobile, and desktop tailored to your specific needs. We start with understanding, then deliver.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton strength={0.3}>
                <Link
                  to="/work"
                  data-cursor="view"
                  data-cursor-text="Work"
                  className="sl-halo-gold inline-flex items-center gap-2.5 rounded-xl bg-[var(--sl-paper)] px-6 py-3.5 text-sm font-semibold text-[var(--sl-ink)] transition-all hover:bg-white hover:shadow-lg active:scale-98"
                >
                  View our work
                  <ArrowRight size={16} />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <a
                  href="#about"
                  className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  <span>About the studio</span>
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
                We build
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-white/55">
                <span>Web Applications</span>
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
      <section className="sl-section-pricing relative z-10">
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

          {/* Pricing Cards */}
          <FadeUp delay={0.4}>
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {/* Starter */}
              <div className="rounded-2xl border border-[var(--sl-line)] bg-white p-7 shadow-sm flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sl-charcoal)]">Starter</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--sl-ink)]">₹49,999<span className="text-sm font-normal text-[var(--sl-ink-soft)]"> onwards</span></p>
                <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">2–3 weeks delivery</p>
                <p className="mt-4 text-xs font-medium text-[var(--sl-charcoal)]">For businesses that need an online presence</p>
                <div className="mt-6 flex-1 space-y-2.5">
                  {['Professional website (5–8 pages)', 'Mobile responsive', 'Contact form + WhatsApp button', 'Google My Business setup', 'Basic SEO', 'Hosting setup (1 year)', 'Source code ownership', '30 days free support'].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                      <Check size={14} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {['Mobile app', 'Online payments', 'Booking system', 'Admin dashboard'].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-charcoal)]/50">
                      <X size={14} className="mt-0.5 shrink-0 text-[var(--sl-charcoal)]/30" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] text-[var(--sl-charcoal)]">Perfect for: local restaurants, shops, doctors, consultants</p>
                <div className="mt-4 pt-4 border-t border-[var(--sl-line-light)]">
                  <p className="text-[11px] font-medium text-[var(--sl-charcoal)]">Payment: 50% advance, 50% on delivery</p>
                </div>
              </div>

              {/* Growth — Highlighted */}
              <div className="rounded-2xl border-2 border-[var(--sl-gold)] bg-white p-7 shadow-lg flex flex-col relative">
                <span className="absolute -top-3 left-6 rounded-full bg-[var(--sl-gold)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Most Popular</span>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sl-gold)]">Growth</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--sl-ink)]">₹1,49,999<span className="text-sm font-normal text-[var(--sl-ink-soft)]"> onwards</span></p>
                <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">6–10 weeks delivery</p>
                <p className="mt-4 text-xs font-medium text-[var(--sl-charcoal)]">For businesses that need online orders or bookings</p>
                <div className="mt-6 flex-1 space-y-2.5">
                  {['Everything in Starter', 'E-commerce / Booking system', 'Payment gateway (UPI, Cards)', 'Customer mobile app (Android + iPhone)', 'Admin dashboard', 'Push notifications', 'Order/booking notifications', '3 months free maintenance'].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                      <Check size={14} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {['Driver/staff app', 'Multi-location support', 'Advanced analytics', 'AI features'].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-charcoal)]/50">
                      <X size={14} className="mt-0.5 shrink-0 text-[var(--sl-charcoal)]/30" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] text-[var(--sl-charcoal)]">Perfect for: restaurants with ordering, travel bookings, clinics, retail stores</p>
                <div className="mt-4 pt-4 border-t border-[var(--sl-line-light)]">
                  <p className="text-[11px] font-medium text-[var(--sl-charcoal)]">Payment: 30/30/20/20 milestone billing</p>
                </div>
              </div>

              {/* Business */}
              <div className="rounded-2xl border border-[var(--sl-line)] bg-white p-7 shadow-sm flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sl-charcoal)]">Business</p>
                <p className="mt-2 font-display text-3xl font-bold text-[var(--sl-ink)]">₹3,49,999<span className="text-sm font-normal text-[var(--sl-ink-soft)]"> onwards</span></p>
                <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">12–20 weeks delivery</p>
                <p className="mt-4 text-xs font-medium text-[var(--sl-charcoal)]">For businesses needing a complete digital system</p>
                <div className="mt-6 flex-1 space-y-2.5">
                  {['Everything in Growth', 'Multiple mobile apps (customer + staff)', 'Advanced admin with reports + analytics', 'Multi-user roles', 'Real-time GPS tracking', 'Third-party integrations', 'WhatsApp automation', '6 months free maintenance'].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                      <Check size={14} className="mt-0.5 shrink-0 text-[var(--sl-teal-sage)]" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {['Enterprise compliance (HIPAA, PCI)', 'Multi-country support', 'White-label reseller system'].map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[var(--sl-charcoal)]/50">
                      <X size={14} className="mt-0.5 shrink-0 text-[var(--sl-charcoal)]/30" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[11px] text-[var(--sl-charcoal)]">Perfect for: logistics, multi-location chains, education, marketplaces</p>
                <div className="mt-4 pt-4 border-t border-[var(--sl-line-light)]">
                  <p className="text-[11px] font-medium text-[var(--sl-charcoal)]">Payment: 25/25/25/15/10 milestone billing</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Comparison Table */}
          <FadeUp delay={0.5}>
            <div className="mt-16 overflow-x-auto rounded-2xl border border-[var(--sl-line)] bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--sl-line)] bg-[var(--sl-sand-deep)]/30">
                    <th className="p-4 font-semibold text-[var(--sl-ink)]">Feature</th>
                    <th className="p-4 font-semibold text-[var(--sl-ink)]">Starter</th>
                    <th className="p-4 font-semibold text-[var(--sl-gold)]">Growth</th>
                    <th className="p-4 font-semibold text-[var(--sl-ink)]">Business</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Price', starter: '₹49,999+', growth: '₹1,49,999+', business: '₹3,49,999+' },
                    { label: 'Timeline', starter: '2–3 weeks', growth: '6–10 weeks', business: '12–20 weeks' },
                    { label: 'Website', starter: '✓', growth: '✓', business: '✓' },
                    { label: 'Customer Mobile App', starter: '—', growth: '✓', business: '✓' },
                    { label: 'Staff/Driver App', starter: '—', growth: '—', business: '✓' },
                    { label: 'Admin Dashboard', starter: '—', growth: 'Basic', business: 'Advanced' },
                    { label: 'Payment Gateway', starter: '—', growth: '✓', business: '✓' },
                    { label: 'Booking/Order System', starter: '—', growth: '✓', business: '✓' },
                    { label: 'Push Notifications', starter: '—', growth: '✓', business: '✓' },
                    { label: 'Real-time GPS', starter: '—', growth: '—', business: '✓' },
                    { label: 'Analytics & Reports', starter: '—', growth: 'Basic', business: 'Advanced' },
                    { label: 'Integrations', starter: '—', growth: '—', business: '✓' },
                    { label: 'Source Code Ownership', starter: '✓', growth: '✓', business: '✓' },
                    { label: 'Free Maintenance', starter: '30 days', growth: '3 months', business: '6 months' },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--sl-sand-deep)]/10'}>
                      <td className="p-4 font-medium text-[var(--sl-ink)]">{row.label}</td>
                      <td className="p-4 text-[var(--sl-ink-soft)]">{row.starter}</td>
                      <td className="p-4 font-medium text-[var(--sl-gold)]">{row.growth}</td>
                      <td className="p-4 text-[var(--sl-ink-soft)]">{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          {/* Add-Ons */}
          <FadeUp delay={0.55}>
            <div className="mt-16">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">Add-Ons</h3>
              <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">Need something extra? Add it anytime.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Extra Mobile App', price: '₹1,50,000+', desc: 'Driver, staff, or vendor app' },
                  { name: 'WhatsApp Automation', price: '₹25,000', desc: 'Order updates via WhatsApp' },
                  { name: 'Advanced Analytics', price: '₹35,000', desc: 'Custom reports and dashboards' },
                  { name: 'CRM Integration', price: '₹30,000', desc: 'Connect to Zoho, HubSpot' },
                  { name: 'Multi-language Support', price: '₹20,000', desc: 'Hindi, Tamil, Telugu, etc.' },
                  { name: 'SEO Package (6 months)', price: '₹48,000', desc: 'Monthly SEO to rank higher' },
                ].map((addon) => (
                  <div key={addon.name} className="flex items-center justify-between rounded-xl border border-[var(--sl-line-light)] bg-white px-4 py-3">
                    <div>
                      <p className="text-xs font-medium text-[var(--sl-ink)]">{addon.name}</p>
                      <p className="text-[11px] text-[var(--sl-ink-soft)]">{addon.desc}</p>
                    </div>
                    <p className="text-xs font-semibold text-[var(--sl-gold)] whitespace-nowrap">{addon.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Maintenance Plans */}
          <FadeUp delay={0.6}>
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

          {/* What's Always Included */}
          <FadeUp delay={0.65}>
            <div className="mt-16">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">Every Project. Every Time. No Exceptions.</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  'Source code ownership',
                  'Fixed-price quote',
                  'Mobile responsive',
                  'Fast loading (<3s)',
                  'SSL security',
                  'Google setup',
                  'Milestone billing',
                  '30-day minimum support',
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

          {/* Industry Examples */}
          <FadeUp delay={0.7}>
            <div className="mt-16">
              <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--sl-ink)]">See What We Build for Businesses Like Yours</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { industry: 'Restaurant', need: 'Online ordering, menu display, payment collection', got: 'Customer app + website + admin panel + Razorpay', cost: '₹1,80,000', time: '8 weeks' },
                  { industry: 'Travel Company', need: 'Booking system, driver management, customer app', got: 'Customer booking app + driver app + admin dashboard', cost: '₹4,50,000', time: '14 weeks' },
                  { industry: 'Clinic', need: 'Appointment booking, patient records, payment', got: 'Patient app + doctor dashboard + billing system', cost: '₹2,50,000', time: '10 weeks' },
                  { industry: 'Retail Store', need: 'E-commerce, inventory management, delivery', got: 'Online store + shopping app + inventory system', cost: '₹3,20,000', time: '12 weeks' },
                ].map((ex) => (
                  <div key={ex.industry} className="rounded-2xl border border-[var(--sl-line)] bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sl-gold)]">{ex.industry}</p>
                    <p className="mt-2 text-[11px] text-[var(--sl-ink-soft)]"><span className="font-medium text-[var(--sl-charcoal)]">Need:</span> {ex.need}</p>
                    <p className="mt-1 text-[11px] text-[var(--sl-ink-soft)]"><span className="font-medium text-[var(--sl-charcoal)]">Got:</span> {ex.got}</p>
                    <div className="mt-3 flex items-center gap-3 border-t border-[var(--sl-line-light)] pt-3">
                      <span className="text-sm font-bold text-[var(--sl-ink)]">{ex.cost}</span>
                      <span className="text-[11px] text-[var(--sl-charcoal)]">{ex.time}</span>
                    </div>
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
                  { q: "How is this different from hiring a freelancer?", a: "Freelancers are individuals. We're a team. You get design + development + testing + project management. Fixed timeline. Fixed price. Someone to call when things break. And we don't disappear mid-project." },
                  { q: "Can I start small and add features later?", a: "Absolutely. Start with the Starter package. When you're ready for an app or booking system, add it as a separate project. We build in a way that makes adding features easy later." },
                  { q: "What if I need changes after launch?", a: "Every project includes free support (30 days to 6 months depending on package). After that, maintenance plans start at ₹8,000/month. You can also hire any developer — you own the code." },
                  { q: "How do I know the price is fair?", a: "Our prices are based on actual Indian market rates. We're not the cheapest (freelancers who may disappear). We're not the most expensive (large agencies with overhead). We're the sweet spot: quality work, fair price, reliable delivery." },
                  { q: "Can I pay in EMI?", a: "Yes. For projects above ₹3L, we offer EMI options through Razorpay. Pay in 3–6 monthly installments." },
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
                    href="https://wa.me/919999999999"
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

      {/* ── 5. Contact / CTA Section: Oxblood (#C6472B) — Hard Cut Crescendo ── */}
      <section
        id="contact"
        className="sl-section-contact scroll-mt-16 relative overflow-hidden"
      >
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
          <div className="relative rounded-3xl border border-white/20 bg-black/10 p-8 backdrop-blur-xs sm:p-14 shadow-2xl shadow-black/25">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--sl-paper)] ring-1 ring-white/25">
                  <Sparkles size={12} />
                  Get in Touch
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[var(--sl-paper)] sm:text-5xl">
                  Ready to build something that fits?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[rgba(245,241,234,0.8)] sm:text-base">
                  We work directly with founders and operations leaders to craft software solutions that fit your specific needs. Let us understand your requirements and build the right solution together.
                </p>
              </div>

              <div className="shrink-0">
                <MagneticButton strength={0.35}>
                  <a
                    href="mailto:hello@salira.studio"
                    data-cursor="open"
                    data-cursor-text="Email"
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-[var(--sl-paper)] px-7 py-4 text-sm font-semibold text-[var(--sl-ink)] shadow-xl shadow-black/25 transition-all hover:bg-white hover:text-black hover:shadow-2xl active:scale-98"
                  >
                    <span>hello@salira.studio</span>
                    <ArrowUpRight size={16} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
