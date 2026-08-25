import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Shield,
  Phone,
  Code2,
  Lock,
  CheckCircle2,
  Globe,
  Smartphone,
  LayoutDashboard,
  Handshake,
} from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { HeroAntigravity } from '../components/HeroAntigravity'
import { HeroShowcaseClean } from '../components/HeroShowcaseClean'
import { PricingTiers } from '../components/PricingTiers'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp } from '../components/ScrollReveal'
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

const studioPillars = [
  {
    n: '01',
    t: 'Tell Us Your Business',
    d: 'We start by understanding what your business does, your daily process, and what you want to automate. 30-minute discovery call with zero sales pressure.',
    icon: Handshake,
  },
  {
    n: '02',
    t: 'Clear Scope & Fixed Quote',
    d: 'No technical jargon. We explain exactly what to build, what you do not need, timeline in weeks, and a transparent fixed price with milestone billing.',
    icon: Layers,
  },
  {
    n: '03',
    t: 'We Build in Sprints',
    d: 'You see and test working builds as we deliver. Regular updates every milestone so you are always in control of your product.',
    icon: Zap,
  },
  {
    n: '04',
    t: 'Launch & 100% Code Ownership',
    d: 'We deploy your software live, configure SSL, Google indexing, and hand over every line of source code. No lock-in, no monthly platform rent.',
    icon: Shield,
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
    <div className="relative overflow-hidden bg-[var(--sl-paper-lifted)] text-[var(--sl-ink)]">
      {/* ── 1. Hero: Clean, Warm, High-Trust Software Studio ── */}
      <section id="hero" className="sl-hero-vivid relative min-h-[88vh] overflow-hidden flex items-center">
        {/* Ambient atmospheric backdrop */}
        <div className="sl-hero-hue" aria-hidden="true" />

        {/* Antigravity background canvas */}
        <HeroAntigravity />

        {/* Cursor-following spotlight */}
        <motion.div
          className="sl-spotlight"
          aria-hidden="true"
          style={{ '--spot-x': smoothSpotX, '--spot-y': smoothSpotY } as CSSProperties}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
            {/* Hero Left: Clear Human-Friendly Content */}
            <div>
              {/* Studio Status Pill */}
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
                  SaLira Software Studio
                </div>
              </motion.div>

              {/* Display Headline */}
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.15rem]">
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
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Websites, mobile apps, and business software engineered to fit your exact operations. Fixed-price quotes, milestone delivery, and 100% source code ownership.
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
                    href="#pricing"
                    className="sl-halo-gold inline-flex items-center gap-2.5 rounded-xl bg-[var(--sl-gold)] px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#e0ab3b] hover:shadow-lg active:scale-98"
                  >
                    Build Your Package (From ₹15k)
                    <ArrowRight size={16} />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.15}>
                  <a
                    href="https://wa.me/917397430568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:text-white"
                  >
                    <span>Talk on WhatsApp</span>
                    <ArrowRight
                      size={14}
                      className="text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                    />
                  </a>
                </MagneticButton>
              </motion.div>

              {/* What We Build Strip */}
              <motion.div
                className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-white/10 pt-6"
                initial={reduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                  What we build
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/70">
                  <span>Custom Websites</span>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                  <span>Mobile Apps (Android &amp; iOS)</span>
                  <span className="h-1 w-1 rounded-full bg-white/25" />
                  <span>Business Platforms</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right: Clean Multi-Device Visual Showcase */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <HeroShowcaseClean />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. What We Build / Services Overview ── */}
      <section id="services" className="relative z-10 bg-[var(--sl-paper-lifted)] py-20 sm:py-28 border-t border-[var(--sl-line)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="sl-label text-[var(--sl-oxblood)]">Core Capabilities</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-5xl">
                Software built around your business.
              </h2>
              <p className="mt-3 text-sm text-[var(--sl-ink-soft)] sm:text-base leading-relaxed">
                We build tailor-made solutions so you never have to force your operations into restrictive templates.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Service 1: Websites */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl border border-[var(--sl-line)] bg-white p-7 shadow-sm h-full flex flex-col justify-between hover:border-[var(--sl-gold)]/50 transition-all">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(217,164,65,0.15)] text-[var(--sl-gold)]">
                    <Globe size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                    Websites &amp; Portals
                  </h3>
                  <p className="mt-2 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                    From clean 1-page landing sites to comprehensive business platforms with CMS, blog, lead routing, and Google SEO setup.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--sl-line-light)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--sl-charcoal)]">From ₹15,000</span>
                  <a href="#pricing" className="text-xs font-bold text-[var(--sl-gold)] hover:underline">View Options →</a>
                </div>
              </div>
            </FadeUp>

            {/* Service 2: Mobile Apps */}
            <FadeUp delay={0.2}>
              <div className="rounded-3xl border border-[var(--sl-line)] bg-white p-7 shadow-sm h-full flex flex-col justify-between hover:border-[var(--sl-oxblood)]/50 transition-all">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(198,71,43,0.12)] text-[var(--sl-oxblood)]">
                    <Smartphone size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                    Mobile Apps (iOS + Android)
                  </h3>
                  <p className="mt-2 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                    Native-feel mobile apps published to Google Play Store and Apple App Store with push notifications, location tracking, and payments.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--sl-line-light)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--sl-charcoal)]">From ₹1,00,000</span>
                  <a href="#pricing" className="text-xs font-bold text-[var(--sl-oxblood)] hover:underline">View Options →</a>
                </div>
              </div>
            </FadeUp>

            {/* Service 3: Custom Business Platforms */}
            <FadeUp delay={0.3}>
              <div className="rounded-3xl border border-[var(--sl-line)] bg-white p-7 shadow-sm h-full flex flex-col justify-between hover:border-[#10B981]/50 transition-all">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(16,185,129,0.15)] text-[#10B981]">
                    <LayoutDashboard size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                    Website + App Bundle
                  </h3>
                  <p className="mt-2 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                    Complete multi-device system with shared backend and admin dashboard. Save ₹1L+ by building website and apps together.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--sl-line-light)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--sl-charcoal)]">From ₹2,50,000</span>
                  <a href="#pricing" className="text-xs font-bold text-[#10B981] hover:underline">View Options →</a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 3. Interactive Drill-Down Pricing ── */}
      <section id="pricing" className="relative z-10 bg-[var(--sl-sand-deep)]/25 py-20 sm:py-32 border-t border-[var(--sl-line)] scroll-mt-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="sl-label text-[var(--sl-charcoal)]">Transparent Pricing</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-5xl">
                Clear packages. Fixed prices. Zero surprises.
              </h2>
              <p className="mt-3 text-sm text-[var(--sl-ink-soft)] sm:text-base leading-relaxed">
                Select a tier to drill down into fixed-price packages. Plain-English inclusions, transparent timelines, and scoped add-ons.
              </p>
            </div>
          </FadeUp>

          {/* Drill-Down Pricing Component */}
          <FadeUp delay={0.15}>
            <PricingTiers />
          </FadeUp>
        </div>
      </section>

      {/* ── 4. How We Work: 4-Step Process ── */}
      <section className="sl-section-process relative z-10 bg-[var(--sl-pine-deep)] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="sl-label text-[var(--sl-teal-sage)]">How We Work</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-paper)] sm:text-4xl">
                  Simple 4-step execution process.
                </h2>
              </div>
              <p className="max-w-md text-sm text-[rgba(245,241,234,0.7)] leading-relaxed">
                Clear milestones, bi-weekly progress updates, and zero tech jargon.
              </p>
            </div>
          </FadeUp>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studioPillars.map((item, idx) => (
              <FadeUp key={item.n} delay={idx * 0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 h-full flex flex-col justify-between hover:border-[var(--sl-teal-sage)]/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-bold text-[var(--sl-teal-sage)]">
                        {item.n}
                      </span>
                      <item.icon size={18} className="text-white/40" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-[var(--sl-paper)]">
                      {item.t}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[rgba(245,241,234,0.7)]">
                      {item.d}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose SaLira (5 High-Trust Reasons) ── */}
      <section className="relative z-10 bg-white py-20 sm:py-28 border-t border-[var(--sl-line)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="sl-label text-[var(--sl-charcoal)]">Why SaLira</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-4xl">
                The smart choice for custom software.
              </h2>
            </div>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Handshake,
                title: 'Business-first approach',
                desc: 'We start by understanding your process and goals, then build the software that fits. No useless tech bloat.',
              },
              {
                icon: Lock,
                title: '100% Code ownership',
                desc: 'Every line of code belongs to you. No monthly platform rent, no proprietary lock-in. Hire any developer later.',
              },
              {
                icon: Shield,
                title: 'Transparent fixed pricing',
                desc: 'You know the exact cost before we start. Milestone-based billing with zero surprise invoices.',
              },
              {
                icon: Code2,
                title: 'Tech matched to the problem',
                desc: "React, Flutter, Node.js, Python — we select what fits your business needs, not what fits our resume.",
              },
              {
                icon: Zap,
                title: 'Fast & mobile-first',
                desc: 'Every site and app loads in under 2.5 seconds, optimized for high Google rankings and smooth mobile browsing.',
              },
              {
                icon: CheckCircle2,
                title: 'Post-launch warranty',
                desc: 'Free support and bug fixes for 30 to 90 days after launch so you can run your business with total confidence.',
              },
            ].map((item, idx) => (
              <FadeUp key={item.title} delay={idx * 0.08}>
                <div className="rounded-2xl border border-[var(--sl-line)] bg-[var(--sl-paper-lifted)] p-6 h-full flex flex-col justify-between hover:shadow-xs transition-all">
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-sand-deep)] text-[var(--sl-oxblood)]">
                      <item.icon size={18} />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-[var(--sl-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--sl-ink-soft)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Contact Section with Direct WhatsApp Launcher ── */}
      <section id="contact" className="sl-section-contact scroll-mt-16 relative overflow-hidden bg-[var(--sl-oxblood)] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Copy */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--sl-paper)] ring-1 ring-white/25">
                <Sparkles size={13} />
                Get in Touch
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[var(--sl-paper)] sm:text-5xl">
                Ready to build something that fits?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[rgba(245,241,234,0.85)] sm:text-base">
                Tell us about your business and what you want to build. We'll figure out what you need — and what you don't.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-[rgba(245,241,234,0.9)]">
                  <Phone size={16} className="shrink-0 text-[var(--sl-gold)]" />
                  <a href="tel:+917397430568" className="hover:text-white transition-colors font-medium">
                    +91 73974 30568
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-[rgba(245,241,234,0.9)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-[var(--sl-gold)]">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:hello@salira.studio" className="hover:text-white transition-colors">
                    hello@salira.studio
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Clean Contact Form */}
            <div className="rounded-3xl border border-white/20 bg-white/[0.1] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const data = new FormData(form)
                  const name = data.get('name')
                  const phone = data.get('phone')
                  const type = data.get('type')
                  const message = data.get('message')
                  const text = `Hi SaLira Studio, I'm ${name} (Phone: ${phone}). Project Type: ${type}. Brief: ${message}`
                  window.open(`https://wa.me/917397430568?text=${encodeURIComponent(text)}`, '_blank')
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[rgba(245,241,234,0.8)] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-[var(--sl-paper)] placeholder:text-white/35 outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[rgba(245,241,234,0.8)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-[var(--sl-paper)] placeholder:text-white/35 outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-xs font-semibold text-[rgba(245,241,234,0.8)] mb-1">
                    What are you looking to build?
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-sm text-[var(--sl-paper)] outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors"
                  >
                    <option value="Starter Website (₹15k–₹25k)" className="bg-[var(--sl-ink)]">Starter Website (₹15k–₹25k)</option>
                    <option value="Professional Business Website (₹60k+)" className="bg-[var(--sl-ink)]">Professional Business Website (₹60k+)</option>
                    <option value="Mobile App (iOS + Android)" className="bg-[var(--sl-ink)]">Mobile App (iOS + Android)</option>
                    <option value="Website + App Bundle" className="bg-[var(--sl-ink)]">Website + App Bundle</option>
                    <option value="Not sure — need advice" className="bg-[var(--sl-ink)]">Not sure — need advice</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[rgba(245,241,234,0.8)] mb-1">
                    Tell us about your business
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="What does your business do? What are you looking to achieve?"
                    className="w-full rounded-xl border border-white/20 bg-black/20 px-4 py-2.5 text-sm text-[var(--sl-paper)] placeholder:text-white/35 outline-none focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[var(--sl-gold)] px-4 py-3 text-sm font-bold text-black shadow-lg hover:bg-[#c49535] transition-all cursor-pointer active:scale-98"
                >
                  Send via WhatsApp
                </button>
                <p className="text-center text-[10px] text-white/50">
                  Opens WhatsApp with your details. Free 30-minute consultation.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
