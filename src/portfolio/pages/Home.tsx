import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Layers, Cpu, Zap, HeartPulse, ShoppingBag, Truck, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroShowcase } from '../components/HeroShowcase'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ScrollReveal'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

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
      <section className="sl-hero-vivid relative min-h-[85vh] overflow-hidden">
        {/* Ambient atmospheric backdrop */}
        <div className="sl-hero-hue" aria-hidden="true" />

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
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sl-gold)]" />
                Custom Software Studio
              </div>
            </motion.div>

            {/* Display Headline */}
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]">
              <motion.span
                className="block"
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                We build custom software around{' '}
              </motion.span>
              <motion.span
                className="sl-gradient-text-light italic font-normal block"
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                how your business
              </motion.span>
              <motion.span
                className="block"
                initial={reduced ? {} : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                actually works.
              </motion.span>
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
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[var(--sl-paper)] px-6 py-3.5 text-sm font-semibold text-[var(--sl-ink)] shadow-md shadow-black/20 transition-all hover:bg-white hover:shadow-lg active:scale-98"
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

          {/* Hero Right: Showcase Panel */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <HeroShowcase />
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

      {/* ── 4. Contact / CTA Section: Oxblood (#C6472B) — Hard Cut Crescendo ── */}
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
