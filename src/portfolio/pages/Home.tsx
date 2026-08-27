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
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { HeroShowcaseClean } from '../components/HeroShowcaseClean'
import { PricingTiers } from '../components/PricingTiers'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp, StaggerContainer, StaggerItem, SlideIn } from '../components/ScrollReveal'
import { EvenMesh } from '../components/EvenMesh'
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

  const spotX = useMotionValue('72%')
  const spotY = useMotionValue('38%')
  const smoothSpotX = useSpring(spotX, { stiffness: 55, damping: 20 })
  const smoothSpotY = useSpring(spotY, { stiffness: 55, damping: 20 })

  // Page-level scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Hero parallax — text moves slightly slower than scroll
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40])

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
      {/* ── Scroll progress bar ── */}
      {!reduced && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-gradient-to-r from-[var(--sl-oxblood)] via-[var(--sl-gold)] to-[var(--sl-teal-sage)] origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      {/* ── 1. Hero ── */}
      <section id="hero" className="sl-hero-vivid relative flex min-h-[88vh] items-center overflow-hidden">
        <div className="sl-hero-hue" aria-hidden="true" />

        <motion.div
          className="sl-spotlight"
          aria-hidden="true"
          style={{ '--spot-x': smoothSpotX, '--spot-y': smoothSpotY } as CSSProperties}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <motion.div
            style={reduced ? undefined : { y: heroY }}
            className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14"
          >
            <div>
              <motion.div
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sl-line)] bg-white/75 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sl-oxblood)] shadow-xs backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--sl-oxblood)] opacity-50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--sl-oxblood)]" />
                  </span>
                  SaLira Software Studio
                </div>
              </motion.div>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-[var(--sl-ink)] sm:text-6xl lg:text-[4.05rem]">
                <RevealWords
                  text="We build custom software around"
                  delay={0.18}
                  reduced={reduced}
                  className="block"
                />
                <RevealWords
                  text="how your business"
                  delay={0.4}
                  reduced={reduced}
                  className="sl-text-iris italic font-normal block pr-2"
                />
                <RevealWords text="actually works." delay={0.55} reduced={reduced} className="block" />
              </h1>

              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-[var(--sl-ink-soft)] sm:text-lg"
                initial={reduced ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                Websites, mobile apps, and business software engineered to fit your exact operations. Fixed-price quotes, milestone delivery, and 100% source code ownership.
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
                initial={reduced ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticButton strength={0.22}>
                  <a
                    href="#pricing"
                    className="sl-halo-gold inline-flex items-center gap-2.5 rounded-xl bg-[var(--sl-gold)] px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#e0ab3b] active:scale-98"
                  >
                    Build Your Package (From ₹15k)
                    <ArrowRight size={16} />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.12}>
                  <a
                    href="https://wa.me/917397430568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-xl border border-[var(--sl-line)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--sl-ink-soft)] shadow-xs backdrop-blur-sm transition-all hover:border-[var(--sl-oxblood)]/30 hover:text-[var(--sl-ink)]"
                  >
                    <span>Talk on WhatsApp</span>
                    <ArrowRight
                      size={14}
                      className="text-[var(--sl-charcoal)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--sl-oxblood)]"
                    />
                  </a>
                </MagneticButton>
              </motion.div>

              <motion.div
                className="mt-12 flex flex-wrap items-center gap-6 border-t border-[var(--sl-line)] pt-6 sm:gap-8"
                initial={reduced ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--sl-charcoal)]">
                  What we build
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[var(--sl-ink-soft)]">
                  <span>Custom Websites</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--sl-taupe)]" />
                  <span>Mobile Apps (Android &amp; iOS)</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--sl-taupe)]" />
                  <span>Business Platforms</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={reduced ? {} : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <HeroShowcaseClean />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Services ── */}
      <section id="services" className="sl-white-section relative z-10 overflow-hidden py-20 sm:py-28">
        <EvenMesh />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="sl-label text-[var(--sl-oxblood)]">Core Capabilities</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-5xl">
                Software built around your business.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base">
                We build tailor-made solutions so you never have to force your operations into restrictive templates.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-6 sm:grid-cols-3" staggerDelay={0.12} delayChildren={0.05}>
            <StaggerItem>
              <div className="sl-shine group flex h-full flex-col justify-between rounded-2xl border border-[rgba(217,164,65,0.2)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(217,164,65,0.45)] hover:shadow-[0_20px_60px_rgba(217,164,65,0.12)]">
                <div>
                  <span className="sl-icon-bounce flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(217,164,65,0.1)] text-[var(--sl-gold)]">
                    <Globe size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                    Websites &amp; Portals
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                    From clean 1-page landing sites to comprehensive business platforms with CMS, blog, lead routing, and Google SEO setup.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[rgba(217,164,65,0.15)] pt-4">
                  <span className="font-mono text-xs font-semibold text-[var(--sl-charcoal)]">From ₹15,000</span>
                  <a href="#pricing" className="sl-arrow-hover text-xs font-bold text-[var(--sl-gold)] transition-colors hover:text-[var(--sl-oxblood)]">
                    View Options <span className="sl-arrow">→</span>
                  </a>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="sl-shine group flex h-full flex-col justify-between rounded-2xl border border-[rgba(198,71,43,0.15)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(198,71,43,0.35)] hover:shadow-[0_20px_60px_rgba(198,71,43,0.1)]">
                <div>
                  <span className="sl-icon-bounce flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(198,71,43,0.08)] text-[var(--sl-oxblood)]">
                    <Smartphone size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                    Mobile Apps (iOS + Android)
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                    Native-feel mobile apps published to Google Play Store and Apple App Store with push notifications, location tracking, and payments.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[rgba(198,71,43,0.12)] pt-4">
                  <span className="font-mono text-xs font-semibold text-[var(--sl-charcoal)]">From ₹1,00,000</span>
                  <a href="#pricing" className="sl-arrow-hover text-xs font-bold text-[var(--sl-oxblood)] transition-colors hover:text-[var(--sl-gold)]">
                    View Options <span className="sl-arrow">→</span>
                  </a>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="sl-shine group flex h-full flex-col justify-between rounded-2xl border border-[rgba(46,111,94,0.15)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(46,111,94,0.35)] hover:shadow-[0_20px_60px_rgba(46,111,94,0.1)]">
                <div>
                  <span className="sl-icon-bounce flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(46,111,94,0.08)] text-[var(--sl-teal-deep)]">
                    <LayoutDashboard size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                    Website + App Bundle
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                    Complete multi-device system with shared backend and admin dashboard. Save ₹1L+ by building website and apps together.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[rgba(46,111,94,0.12)] pt-4">
                  <span className="font-mono text-xs font-semibold text-[var(--sl-charcoal)]">From ₹2,50,000</span>
                  <a href="#pricing" className="sl-arrow-hover text-xs font-bold text-[var(--sl-teal-deep)] transition-colors hover:text-[var(--sl-oxblood)]">
                    View Options <span className="sl-arrow">→</span>
                  </a>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Pricing ── */}
      <section
        id="pricing"
        className="sl-white-section relative z-10 scroll-mt-16 overflow-hidden py-20 sm:py-32"
      >
        <EvenMesh />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="sl-label text-[var(--sl-charcoal)]">Transparent Pricing</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-5xl">
                Clear packages. Fixed prices. Zero surprises.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base">
                Select a tier to drill down into fixed-price packages. Plain-English inclusions, transparent timelines, and scoped add-ons.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <PricingTiers />
          </FadeUp>
        </div>
      </section>

      {/* ── 4. How We Work ── */}
      <section className="sl-white-section relative z-10 overflow-hidden py-20 sm:py-28">
        <EvenMesh />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="sl-label text-[var(--sl-teal-deep)]">How We Work</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-4xl">
                  Simple 4-step execution process.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                Clear milestones, bi-weekly progress updates, and zero tech jargon.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="sl-process-rail mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1} delayChildren={0.05}>
            {studioPillars.map((item) => (
              <StaggerItem key={item.n}>
                <motion.div
                  className="group relative flex h-full flex-col justify-between rounded-2xl border border-[var(--sl-line)] bg-white p-6 shadow-sm cursor-default overflow-hidden"
                  whileHover={reduced ? {} : { y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                >
                  {/* Gradient top bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-[var(--sl-teal-deep)] via-[var(--sl-gold)] to-[var(--sl-oxblood)] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-bold text-[var(--sl-teal-deep)] transition-colors duration-300 group-hover:text-[var(--sl-oxblood)]">
                        {item.n}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(46,111,94,0.07)] border border-[rgba(46,111,94,0.12)] transition-all duration-300 group-hover:bg-[rgba(198,71,43,0.07)] group-hover:border-[rgba(198,71,43,0.15)] group-hover:scale-110">
                        <item.icon size={16} className="text-[var(--sl-teal-deep)] transition-colors duration-300 group-hover:text-[var(--sl-oxblood)]" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-[var(--sl-ink)]">
                      {item.t}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--sl-ink-soft)]">
                      {item.d}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. Why SaLira ── */}
      <section className="sl-white-section relative z-10 overflow-hidden py-20 sm:py-28">
        <EvenMesh />
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <FadeUp>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="sl-label text-[var(--sl-charcoal)]">Why SaLira</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-4xl">
                The smart choice for custom software.
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.09} delayChildren={0.05}>
            {[
              {
                icon: Handshake,
                title: 'Business-first approach',
                desc: 'We start by understanding your process and goals, then build the software that fits. No useless tech bloat.',
                accent: 'rgba(198,71,43,0.07)',
                border: 'rgba(198,71,43,0.12)',
                hoverBorder: 'rgba(198,71,43,0.3)',
                color: '#C6472B',
                shadow: '0 20px 50px rgba(198,71,43,0.09)',
              },
              {
                icon: Lock,
                title: '100% Code ownership',
                desc: 'Every line of code belongs to you. No monthly platform rent, no proprietary lock-in. Hire any developer later.',
                accent: 'rgba(217,164,65,0.08)',
                border: 'rgba(217,164,65,0.15)',
                hoverBorder: 'rgba(217,164,65,0.35)',
                color: '#D9A441',
                shadow: '0 20px 50px rgba(217,164,65,0.09)',
              },
              {
                icon: Shield,
                title: 'Transparent fixed pricing',
                desc: 'You know the exact cost before we start. Milestone-based billing with zero surprise invoices.',
                accent: 'rgba(46,111,94,0.07)',
                border: 'rgba(46,111,94,0.12)',
                hoverBorder: 'rgba(46,111,94,0.3)',
                color: '#2E6F5E',
                shadow: '0 20px 50px rgba(46,111,94,0.09)',
              },
              {
                icon: Code2,
                title: 'Tech matched to the problem',
                desc: "React, Flutter, Node.js, Python — we select what fits your business needs, not what fits our resume.",
                accent: 'rgba(198,71,43,0.07)',
                border: 'rgba(198,71,43,0.12)',
                hoverBorder: 'rgba(198,71,43,0.3)',
                color: '#C6472B',
                shadow: '0 20px 50px rgba(198,71,43,0.09)',
              },
              {
                icon: Zap,
                title: 'Fast & mobile-first',
                desc: 'Every site and app loads in under 2.5 seconds, optimized for high Google rankings and smooth mobile browsing.',
                accent: 'rgba(217,164,65,0.08)',
                border: 'rgba(217,164,65,0.15)',
                hoverBorder: 'rgba(217,164,65,0.35)',
                color: '#D9A441',
                shadow: '0 20px 50px rgba(217,164,65,0.09)',
              },
              {
                icon: CheckCircle2,
                title: 'Post-launch warranty',
                desc: 'Free support and bug fixes for 30 to 90 days after launch so you can run your business with total confidence.',
                accent: 'rgba(46,111,94,0.07)',
                border: 'rgba(46,111,94,0.12)',
                hoverBorder: 'rgba(46,111,94,0.3)',
                color: '#2E6F5E',
                shadow: '0 20px 50px rgba(46,111,94,0.09)',
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="group relative h-full overflow-hidden rounded-2xl border bg-white p-6 cursor-default transition-shadow duration-300"
                  style={{ borderColor: item.border }}
                  whileHover={reduced ? {} : {
                    y: -5,
                    boxShadow: item.shadow,
                    borderColor: item.hoverBorder,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                >
                  {/* Corner glow on hover */}
                  <div
                    className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${item.accent.replace('0.07', '0.5').replace('0.08', '0.5')}, transparent 70%)`, filter: 'blur(14px)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg]"
                    style={{ background: item.accent, color: item.color }}
                  >
                    <item.icon size={18} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-[var(--sl-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                    {item.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 6. Contact ── */}
      <section id="contact" className="sl-section-contact relative scroll-mt-16 overflow-hidden py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SlideIn from="left" delay={0}>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--sl-line)] bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--sl-oxblood)] shadow-xs">
                  <Sparkles size={13} />
                  Get in Touch
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-5xl">
                  Ready to build something that fits?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base">
                  Tell us about your business and what you want to build. We'll figure out what you need — and what you don't.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-[var(--sl-ink-soft)]">
                    <Phone size={16} className="shrink-0 text-[var(--sl-oxblood)]" />
                    <a href="tel:+917397430568" className="font-medium transition-colors hover:text-[var(--sl-ink)]">
                      +91 73974 30568
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--sl-ink-soft)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-[var(--sl-oxblood)]">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href="mailto:hello@salira.studio" className="transition-colors hover:text-[var(--sl-ink)]">
                      hello@salira.studio
                    </a>
                  </div>
                </div>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              <div className="sl-panel p-6 shadow-[0_20px_60px_rgba(20,22,28,0.08)] sm:p-8">
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
                    <label htmlFor="name" className="mb-1 block text-xs font-semibold text-[var(--sl-ink-soft)]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-[var(--sl-line)] bg-white/90 px-4 py-2.5 text-sm text-[var(--sl-ink)] outline-none transition-colors placeholder:text-[var(--sl-taupe)] focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-xs font-semibold text-[var(--sl-ink-soft)]">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-[var(--sl-line)] bg-white/90 px-4 py-2.5 text-sm text-[var(--sl-ink)] outline-none transition-colors placeholder:text-[var(--sl-taupe)] focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="mb-1 block text-xs font-semibold text-[var(--sl-ink-soft)]">
                      What are you looking to build?
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="w-full rounded-xl border border-[var(--sl-line)] bg-white/90 px-4 py-2.5 text-sm text-[var(--sl-ink)] outline-none transition-colors focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)]"
                    >
                      <option value="Starter Website (₹15k–₹25k)">Starter Website (₹15k–₹25k)</option>
                      <option value="Professional Business Website (₹60k+)">Professional Business Website (₹60k+)</option>
                      <option value="Mobile App (iOS + Android)">Mobile App (iOS + Android)</option>
                      <option value="Website + App Bundle">Website + App Bundle</option>
                      <option value="Not sure — need advice">Not sure — need advice</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-xs font-semibold text-[var(--sl-ink-soft)]">
                      Tell us about your business
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="What does your business do? What are you looking to achieve?"
                      className="w-full resize-none rounded-xl border border-[var(--sl-line)] bg-white/90 px-4 py-2.5 text-sm text-[var(--sl-ink)] outline-none transition-colors placeholder:text-[var(--sl-taupe)] focus:border-[var(--sl-gold)] focus:ring-1 focus:ring-[var(--sl-gold)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="sl-halo-gold w-full cursor-pointer rounded-xl bg-[var(--sl-gold)] px-4 py-3 text-sm font-bold text-black transition-all hover:bg-[#c49535] active:scale-98"
                  >
                    Send via WhatsApp
                  </button>
                  <p className="text-center text-[10px] text-[var(--sl-charcoal)]">
                    Opens WhatsApp with your details. Free 30-minute consultation.
                  </p>
                </form>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  )
}











