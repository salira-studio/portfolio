import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { DraftCursor } from './components/DraftCursor'
import { MobileDraftNav } from './components/MobileDraftNav'
import { MagneticButton } from './components/MagneticButton'
import { WhatsAppButton } from './components/WhatsAppButton'
import { usePrefersReducedMotion } from './lib/usePrefersReducedMotion'

export function PortfolioLayout() {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const navItems = [
    { label: 'Work', to: '/work', isRoute: true, code: '01' },
    { label: 'Services', to: '/#services', isRoute: false, code: '02' },
    { label: 'How We Work', to: '/#how-we-work', isRoute: false, code: '03' },
    { label: 'Pricing', to: '/#pricing', isRoute: false, code: '04' },
    { label: 'Contact', to: '/#contact', isRoute: false, code: '05' },
  ]

  return (
    <div className="salira-draft min-h-screen flex flex-col bg-[var(--salira-paper)] text-[var(--salira-graphite)] font-sans antialiased selection:bg-[var(--salira-redpen)] selection:text-white">
      <Helmet>
        <title>SaLira Studio — Custom Software Development</title>
        <meta name="description" content="SaLira Studio builds custom websites, e-commerce platforms, mobile apps, and business software. 100% code ownership, zero vendor lock-in." />
        <meta property="og:title" content="SaLira Studio — Custom Software Development" />
        <meta property="og:description" content="Custom websites, e-commerce, mobile apps, and business software. 100% code ownership, zero vendor lock-in." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SaLira Studio — Custom Software Development" />
        <meta name="twitter:description" content="Custom websites, e-commerce, mobile apps, and business software. 100% code ownership, zero vendor lock-in." />
        <link rel="canonical" href="https://salira.studio" />
      </Helmet>
      {/* ── Signature Precision Measurement & Crosshair Cursor ── */}
      <DraftCursor />

      {/* ── Top Blueprint Status Header ── */}
      <motion.header
        initial={reduced ? {} : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 border-b border-[var(--salira-border-draft)] bg-[var(--salira-paper)]/90 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
          {/* Logo & Drawing Identification */}
          <Link
            to="/"
            className="group flex items-center gap-3 outline-none"
            data-draft-target="SaLira Logo"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[var(--salira-blueprint)] bg-[var(--salira-blueprint)] text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              <span className="font-mono text-xs font-bold leading-none">SL</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold tracking-tight text-[var(--salira-blueprint)]">
                  SaLira
                </span>
                <span className="rounded border border-[var(--salira-border-draft)] px-1.5 py-0.2 font-mono text-[8px] uppercase tracking-widest text-[var(--salira-graphite-muted)]">
                  STUDIO
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-[8px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                THE WORKING DRAFT · 2026.09
              </span>
            </div>
          </Link>

          {/* Blueprint Engineering Status Widget */}
          <div className="hidden lg:flex items-center gap-2 rounded border border-[var(--salira-border-draft)] bg-white/70 px-3 py-1 font-mono text-[10px] text-[var(--salira-blueprint)] shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--salira-redpen)] animate-pulse" />
            <span className="font-medium">STATUS: READY FOR CLIENT BUILDS</span>
            <span className="text-[var(--salira-border-draft)]">|</span>
            <span className="text-[var(--salira-graphite-muted)]">100% CODE OWNERSHIP</span>
          </div>

          {/* Navigation & Direct Dispatch */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="tel:+917397430568"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-[var(--salira-graphite-soft)] transition-colors hover:text-[var(--salira-blueprint)]"
              data-draft-target="Direct Call"
            >
              <Phone size={12} className="text-[var(--salira-blueprint)]" />
              <span>+91 73974 30568</span>
            </a>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center gap-1 font-mono text-xs"
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
                        data-draft-target={`Nav ${item.label}`}
                        className={({ isActive }) =>
                          `relative z-10 block rounded px-3 py-1.5 transition-colors uppercase tracking-wider ${
                            isActive
                              ? 'font-bold text-[var(--salira-redpen)]'
                              : 'text-[var(--salira-graphite-soft)] hover:text-[var(--salira-blueprint)]'
                          }`
                        }
                      >
                        <span className="text-[9px] text-[var(--salira-graphite-muted)] mr-1">
                          {item.code}.
                        </span>
                        {item.label}
                      </NavLink>
                    ) : (
                      <a
                        href={item.to}
                        onMouseEnter={() => setHoveredNav(item.label)}
                        data-draft-target={`Nav ${item.label}`}
                        className="relative z-10 block rounded px-3 py-1.5 uppercase tracking-wider text-[var(--salira-graphite-soft)] transition-colors hover:text-[var(--salira-blueprint)]"
                      >
                        <span className="text-[9px] text-[var(--salira-graphite-muted)] mr-1">
                          {item.code}.
                        </span>
                        {item.label}
                      </a>
                    )}

                    {!reduced && (hoveredNav === item.label || (!hoveredNav && isWorkActive)) && (
                      <motion.div
                        layoutId="draftNavPill"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                        className="pointer-events-none absolute inset-0 z-0 rounded border border-[var(--salira-border-draft-strong)] bg-white/80"
                      />
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Mobile Navigation Drawer */}
            <MobileDraftNav />
          </div>
        </div>
      </motion.header>

      {/* ── Main Viewport Outlet ── */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Blueprint Specification Footer ── */}
      <footer className="relative z-10 border-t border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)]">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Engineering Drawing Block */}
            <div className="space-y-4 lg:col-span-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded border border-[var(--salira-blueprint)] bg-[var(--salira-blueprint)] text-white shadow-xs">
                  <span className="font-mono text-xs font-bold">SL</span>
                </div>
                <p className="font-display text-xl font-bold tracking-tight text-[var(--salira-blueprint)]">
                  SaLira Software Studio
                </p>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                We build bespoke software around how your business actually operates. No monthly rent, no platform lock-in, and 100% full source code handover upon completion.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-[var(--salira-graphite-muted)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--salira-redpen)] animate-pulse" />
                <span>ARCHITECTURAL DRAWING · SALIRA-PORTFOLIO-2026</span>
              </div>
            </div>

            {/* Navigation & Case Studies Index */}
            <div className="grid grid-cols-2 gap-8 text-xs font-mono lg:col-span-4">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--salira-blueprint)]">
                  CASE STUDIES
                </p>
                <ul className="space-y-2 text-[var(--salira-graphite-soft)]">
                  <li>
                    <Link to="/work" className="transition-colors hover:text-[var(--salira-redpen)]">
                      01. All Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link to="/work/restaurants" className="transition-colors hover:text-[var(--salira-redpen)]">
                      02. AURA Restaurant PWA
                    </Link>
                  </li>
                  <li>
                    <Link to="/work/travel" className="transition-colors hover:text-[var(--salira-redpen)]">
                      03. VoyageAI Platform
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--salira-blueprint)]">
                  STUDIO DISPATCH
                </p>
                <ul className="space-y-2 text-[var(--salira-graphite-soft)]">
                  <li>
                    <a
                      href="tel:+917397430568"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[var(--salira-redpen)]"
                    >
                      +91 73974 30568
                      <ArrowUpRight size={12} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@salira.studio"
                      className="inline-flex items-center gap-1 transition-colors hover:text-[var(--salira-redpen)]"
                    >
                      hello@salira.studio
                      <ArrowUpRight size={12} />
                    </a>
                  </li>
                  <li>
                    <span className="text-[10px] text-[var(--salira-graphite-muted)]">
                      Remote · Global Delivery
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Direct Project Consultation Block */}
            <div className="rounded-xl border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs lg:col-span-3">
              <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-redpen)]">
                <span>✎ INITIATE SCOPE</span>
                <span>FIXED PRICE</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                Have a software blueprint to engineer? Let's discuss requirements and fixed milestone sprints.
              </p>
              <div className="mt-4">
                <MagneticButton className="w-full" strength={0.16}>
                  <a
                    href="mailto:hello@salira.studio"
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-blueprint)] px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--salira-redpen)]"
                    data-draft-target="Footer Dispatch"
                  >
                    Start Working Draft
                    <ArrowUpRight size={13} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Bottom Specification Stamp */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--salira-border-draft)] pt-4 font-mono text-[9px] uppercase tracking-wider text-[var(--salira-graphite-muted)] sm:flex-row">
            <p>© {new Date().getFullYear()} SALIRA STUDIO · ALL RIGHTS RESERVED.</p>
            <p className="text-center sm:text-right text-[var(--salira-blueprint)]">
              NO COOKIES · ZERO TRACKERS · 100% BROWSER-NATIVE CLIENTS
            </p>
          </div>
        </div>
      </footer>

      {/* Direct WhatsApp Contact Button */}
      <WhatsAppButton />
    </div>
  )
}
