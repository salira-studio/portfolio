import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Sparkles, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomCursor } from './components/CustomCursor'
import { MagneticButton } from './components/MagneticButton'
import { WhatsAppButton } from './components/WhatsAppButton'
import { usePrefersReducedMotion } from './lib/usePrefersReducedMotion'

export function PortfolioLayout() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [timeString, setTimeString] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display current IST / UTC offset or local studio time format
      const formatted = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(now)
      setTimeString(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { label: 'Work', to: '/work', isRoute: true },
    { label: 'About', to: '/#about', isRoute: false },
    { label: 'Contact', to: '/#contact', isRoute: false },
  ]

  return (
    <div className="salira min-h-screen flex flex-col selection:bg-[var(--sl-accent)] selection:text-white">
      <CustomCursor />

      {/* ── Header ── */}
      <motion.header
        initial={reduced ? {} : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sl-header-glass sticky top-0 z-40 transition-shadow"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo & Studio Mark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 outline-none"
            data-cursor="view"
            data-cursor-text="Home"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#13163a] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-sm font-bold leading-none tracking-tight">S</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                SaLira
              </span>
              <span className="hidden sm:inline text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
                Studio
              </span>
            </div>
          </Link>

          {/* Status Badge (Center on desktop) */}
          {/* Phone + Navigation */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="tel:+917397430568"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
            >
              <Phone size={12} />
              <span>+91 73974 30568</span>
            </a>
            <nav
              className="flex items-center gap-1 sm:gap-2 text-sm font-medium"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {navItems.map((item) => {
              const isWorkActive = item.isRoute && location.pathname.startsWith('/work')
              return (
                <div key={item.label} className="relative">
                  {item.isRoute ? (
                    <NavLink
                      to={item.to}
                      onMouseEnter={() => setHoveredNav(item.label)}
                      className={({ isActive }) =>
                        `relative px-3.5 py-1.5 transition-colors rounded-lg z-10 block ${
                          isActive
                            ? 'text-white font-semibold'
                            : 'text-white/55 hover:text-white/85'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <a
                      href={item.to}
                      onMouseEnter={() => setHoveredNav(item.label)}
                      className="relative px-3.5 py-1.5 transition-colors rounded-lg z-10 text-white/55 hover:text-white/85 block"
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Animated hover / active pill indicator */}
                  {!reduced && (hoveredNav === item.label || (!hoveredNav && isWorkActive)) && (
                    <motion.div
                      layoutId="navPill"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                      className="absolute inset-0 rounded-lg bg-white/10 pointer-events-none z-0"
                    />
                  )}
                </div>
              )
            })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* ── Main Content Shell with Page Fade ── */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduced ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Architectural Studio Footer (Deep Pine bookend) ── */}
      <footer className="relative overflow-hidden bg-[var(--sl-pine-deep)] text-[var(--sl-paper)] border-t border-[rgba(245,241,234,0.1)]">
        {/* Footer background atmospheric glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(198, 71, 43, 0.18), rgba(29, 43, 38, 0) 70%)' }}
        />

        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-start">
            {/* Studio Identity */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--sl-oxblood)] to-[var(--sl-gold)] text-white shadow-md shadow-black/30">
                  <span className="font-display text-base font-bold">S</span>
                </div>
                <p className="font-display text-2xl font-bold tracking-tight text-white">
                  SaLira Studio
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed sl-on-dark">
                We build custom software for web, mobile, and desktop. We understand how your business works, then build the software that fits.
              </p>
              <div className="flex items-center gap-2 text-xs text-[rgba(245,241,234,0.65)] pt-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-sage)] animate-pulse" />
                <span>Available for Q3/Q4 studio engagements</span>
              </div>
            </div>

            {/* Navigation & Links */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="sl-label sl-label-on-dark mb-3.5">Exploration</p>
                <ul className="space-y-2.5 sl-on-dark">
                  <li>
                    <Link to="/work" className="transition-colors hover:text-[var(--sl-gold)]">
                      All Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/work/restaurants" className="transition-colors hover:text-[var(--sl-gold)]">
                      AURA Restaurant
                    </Link>
                  </li>
                  <li>
                    <a href="/#about" className="transition-colors hover:text-[var(--sl-gold)]">
                      Studio Principles
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="sl-label sl-label-on-dark mb-3.5">Direct</p>
                <ul className="space-y-2.5 sl-on-dark">
                  <li>
                    <a
                      href="tel:+917397430568"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[var(--sl-gold)]"
                    >
                      +91 73974 30568
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@salira.studio"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[var(--sl-gold)]"
                    >
                      hello@salira.studio
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                  <li>
                    <span className="text-xs text-[rgba(245,241,234,0.5)] font-mono">
                      India · Remote Studio
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct CTA Box */}
            <div className="lg:col-span-3 rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--sl-gold)]">
                <Sparkles size={14} />
                <span>Start a Project</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed sl-on-dark">
                Let's build working software for your business operations.
              </p>
              <div className="mt-4">
                <MagneticButton className="w-full">
                  <a
                    href="mailto:hello@salira.studio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sl-paper)] px-4 py-2.5 text-xs font-semibold text-[var(--sl-ink)] transition-all hover:bg-white hover:text-black"
                  >
                    Initiate conversation
                    <ArrowUpRight size={13} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[rgba(245,241,234,0.5)] sm:flex-row">
            <p>
              © {new Date().getFullYear()} SaLira Studio. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              All demonstrations are live, two-sided client instances running locally in your browser.
            </p>
          </div>
        </div>
      </footer>
      {/* ── WhatsApp Floating Button ── */}
      <WhatsAppButton />

    </div>
  )
}
