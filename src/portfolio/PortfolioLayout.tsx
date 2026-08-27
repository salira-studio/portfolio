import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Sparkles, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from './components/MagneticButton'
import { WhatsAppButton } from './components/WhatsAppButton'
import { EvenMesh } from './components/EvenMesh'
import { usePrefersReducedMotion } from './lib/usePrefersReducedMotion'

export function PortfolioLayout() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const navItems = [
    { label: 'Work', to: '/work', isRoute: true },
    { label: 'Services', to: '/#services', isRoute: false },
    { label: 'Pricing', to: '/#pricing', isRoute: false },
    { label: 'Contact', to: '/#contact', isRoute: false },
  ]

  return (
    <div className="salira min-h-screen flex flex-col selection:bg-[var(--sl-accent)] selection:text-white">
      {/* ── Global particle canvas — behind everything except header/footer ── */}
      <EvenMesh />
      {/* ── Header ── */}
      <motion.header
        initial={reduced ? {} : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="sl-header-glass sticky top-0 z-40"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            className="group flex items-center gap-2.5 outline-none"
            data-cursor="view"
            data-cursor-text="Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--sl-oxblood)] to-[var(--sl-gold)] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-sm font-bold leading-none tracking-tight">S</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-bold tracking-tight text-[var(--sl-ink)]">
                SaLira
              </span>
              <span className="hidden sm:inline text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--sl-charcoal)]">
                Studio
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-[var(--sl-line)] bg-white/70 px-3 py-1 text-[11px] font-mono text-[var(--sl-ink-soft)] shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-deep)] animate-pulse" />
            <span>Studio: Available for Q3 Builds</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="tel:+917397430568"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[var(--sl-ink-soft)] transition-colors hover:text-[var(--sl-ink)]"
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
                          `relative z-10 block rounded-lg px-3.5 py-1.5 transition-colors ${
                            isActive
                              ? 'font-semibold text-[var(--sl-ink)]'
                              : 'text-[var(--sl-ink-soft)] hover:text-[var(--sl-ink)]'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <a
                        href={item.to}
                        onMouseEnter={() => setHoveredNav(item.label)}
                        className="relative z-10 block rounded-lg px-3.5 py-1.5 text-[var(--sl-ink-soft)] transition-colors hover:text-[var(--sl-ink)]"
                      >
                        {item.label}
                      </a>
                    )}

                    {!reduced && (hoveredNav === item.label || (!hoveredNav && isWorkActive)) && (
                      <motion.div
                        layoutId="navPill"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                        className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-[rgba(198,71,43,0.08)] ring-1 ring-[rgba(198,71,43,0.12)]"
                      />
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="sl-footer-glass relative z-10 overflow-hidden border-t border-[var(--sl-line)]">
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--sl-oxblood)] to-[var(--sl-gold)] text-white shadow-sm">
                  <span className="font-display text-base font-bold">S</span>
                </div>
                <p className="font-display text-2xl font-bold tracking-tight text-[var(--sl-ink)]">
                  SaLira Studio
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                We build custom software for web, mobile, and desktop. We understand how your business works, then build the software that fits.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs text-[var(--sl-charcoal)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-deep)] animate-pulse" />
                <span>Available for Q3/Q4 studio engagements</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm lg:col-span-4">
              <div>
                <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sl-charcoal)]">
                  Exploration
                </p>
                <ul className="space-y-2.5 text-[var(--sl-ink-soft)]">
                  <li>
                    <Link to="/work" className="transition-colors hover:text-[var(--sl-oxblood)]">
                      All Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/work/restaurants" className="transition-colors hover:text-[var(--sl-oxblood)]">
                      AURA Restaurant
                    </Link>
                  </li>
                  <li>
                    <a href="/#services" className="transition-colors hover:text-[var(--sl-oxblood)]">
                      Studio Principles
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sl-charcoal)]">
                  Direct
                </p>
                <ul className="space-y-2.5 text-[var(--sl-ink-soft)]">
                  <li>
                    <a
                      href="tel:+917397430568"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[var(--sl-oxblood)]"
                    >
                      +91 73974 30568
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@salira.studio"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[var(--sl-oxblood)]"
                    >
                      hello@salira.studio
                      <ArrowUpRight size={13} />
                    </a>
                  </li>
                  <li>
                    <span className="font-mono text-xs text-[var(--sl-charcoal)]">
                      India · Remote Studio
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--sl-line)] bg-white/80 p-6 shadow-xs backdrop-blur-sm lg:col-span-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--sl-oxblood)]">
                <Sparkles size={14} />
                <span>Start a Project</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--sl-ink-soft)]">
                Let's build working software for your business operations.
              </p>
              <div className="mt-4">
                <MagneticButton className="w-full" strength={0.18}>
                  <a
                    href="mailto:hello@salira.studio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sl-ink)] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[var(--sl-oxblood)]"
                  >
                    Initiate conversation
                    <ArrowUpRight size={13} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--sl-line)] pt-6 text-xs text-[var(--sl-charcoal)] sm:flex-row">
            <p>
              © {new Date().getFullYear()} SaLira Studio. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              All demonstrations are live, two-sided client instances running locally in your browser.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
