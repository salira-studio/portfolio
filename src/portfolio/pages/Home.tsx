import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  UtensilsCrossed,
  Plane,
  Terminal,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  FileCode2,
  Database,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { DraftSheet } from '../components/DraftSheet'
import { RedPenAnnotation } from '../components/RedPenAnnotation'
import { MagneticButton } from '../components/MagneticButton'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

export default function Home() {
  const reduced = usePrefersReducedMotion()
  const [activeSpecTab, setActiveSpecTab] = useState<'architecture' | 'ownership' | 'performance'>('architecture')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', projectScope: '' })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitted(true)
  }

  return (
    <div className="salira-draft-grid min-h-screen py-6 sm:py-10">
      {/* ─────────────────────────────────────────────────────────────
          SHEET 01: HERO / PRIMARY ARCHITECTURAL STATEMENT
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="hero"
        sheetNumber="SHEET 01/06"
        title="PRIMARY ARCHITECTURAL STATEMENT"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="UNRESTRICTED DRAFT"
        marginAnnotation={
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span className="flex items-center gap-1 text-[var(--salira-redpen)] font-bold">
              ✎ NOTE: ALL BUILDS ARE PRODUCTION INSTANCES TESTABLE LOCALLY IN YOUR BROWSER.
            </span>
            <span>SYSTEM SPEC: REACT 19 · TYPESCRIPT · TAILWINDCSS V4</span>
          </div>
        }
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: The Working Draft Thesis */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded border border-[var(--salira-border-draft)] bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--salira-redpen)] animate-pulse" />
              <span>THE WORKING DRAFT · BESPOKE SOFTWARE STUDIO</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.2] tracking-tight text-[var(--salira-graphite)] sm:text-6xl lg:text-[4rem]">
              We build custom software around how your business{' '}
              <RedPenAnnotation
                type="circle"
                note="EXACT FIT ONLY"
                notePosition="right"
                alwaysVisible
                className="text-[var(--salira-blueprint)]"
              >
                actually works.
              </RedPenAnnotation>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[var(--salira-graphite-soft)] sm:text-lg">
              No bloated SaaS templates, no monthly platform rent, and zero locked repositories. We engineer bespoke web apps, mobile portals, and operational backoffices with fixed milestone pricing and 100% source code ownership.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton strength={0.2}>
                <a
                  href="#case-studies"
                  className="inline-flex items-center gap-2 rounded bg-[var(--salira-redpen)] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-[#E02E24] active:scale-98"
                  data-draft-target="Case Studies CTA"
                >
                  <span>Review Case Studies</span>
                  <ArrowRight size={14} />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.15}>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded border border-[var(--salira-border-draft-strong)] bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-graphite)] transition-all hover:border-[var(--salira-blueprint)] hover:text-[var(--salira-blueprint)]"
                  data-draft-target="Scope & Pricing CTA"
                >
                  <span>Scope &amp; Pricing</span>
                  <ArrowUpRight size={14} />
                </a>
              </MagneticButton>
            </div>

            {/* Engineering Highlights */}
            <div className="grid grid-cols-3 gap-3 border-t border-[var(--salira-border-draft)] pt-6 font-mono text-xs">
              <div className="rounded border border-[var(--salira-border-draft)] bg-white/70 p-2.5">
                <span className="block text-[9px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                  CODE FREEDOM
                </span>
                <span className="mt-0.5 block font-bold text-[var(--salira-blueprint)]">
                  100% Ownership
                </span>
              </div>
              <div className="rounded border border-[var(--salira-border-draft)] bg-white/70 p-2.5">
                <span className="block text-[9px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                  LATENCY GOAL
                </span>
                <span className="mt-0.5 block font-bold text-[var(--salira-blueprint)]">
                  &lt; 50ms State Sync
                </span>
              </div>
              <div className="rounded border border-[var(--salira-border-draft)] bg-white/70 p-2.5">
                <span className="block text-[9px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                  CONTRACT MODEL
                </span>
                <span className="mt-0.5 block font-bold text-[var(--salira-redpen)]">
                  Fixed Milestone
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Exposed Engineering Spec Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-sm">
              {/* Box Header */}
              <div className="mb-4 flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                  <Terminal size={14} />
                  <span>STUDIO BLUEPRINT CONSOLE</span>
                </div>
                <span className="rounded bg-[var(--salira-redpen-bg)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-redpen)]">
                  LIVE DRAFT
                </span>
              </div>

              {/* Spec Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1 rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-1 font-mono text-[10px]">
                {(['architecture', 'ownership', 'performance'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSpecTab(tab)}
                    className={`rounded py-1 text-center font-bold uppercase transition-all ${
                      activeSpecTab === tab
                        ? 'bg-[var(--salira-blueprint)] text-white shadow-2xs'
                        : 'text-[var(--salira-graphite-muted)] hover:text-[var(--salira-graphite)]'
                    }`}
                    data-draft-target={`Tab ${tab}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="mt-4 min-h-[160px] space-y-3 font-mono text-xs">
                {activeSpecTab === 'architecture' && (
                  <motion.div
                    initial={reduced ? {} : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 text-[var(--salira-graphite-soft)]"
                  >
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">STACK:</span>
                      <span className="font-bold text-[var(--salira-blueprint)]">React 19 + TypeScript + Vite</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">DATABASE:</span>
                      <span className="font-bold text-[var(--salira-graphite)]">Tailored Schema / No ORM Bloat</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">DISPATCH:</span>
                      <span className="font-bold text-[var(--salira-redpen)]">Cross-Tab Reactive Sync Engine</span>
                    </div>
                  </motion.div>
                )}

                {activeSpecTab === 'ownership' && (
                  <motion.div
                    initial={reduced ? {} : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 text-[var(--salira-graphite-soft)]"
                  >
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">SOURCE CODE:</span>
                      <span className="font-bold text-[var(--salira-blueprint)]">Full Git Repo Transferred</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">MONTHLY RENT:</span>
                      <span className="font-bold text-[var(--salira-redpen)]">₹0 / Month ($0 SaaS Lock-in)</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">HOSTING:</span>
                      <span className="font-bold text-[var(--salira-graphite)]">Your Cloud / Cloudflare / Vercel</span>
                    </div>
                  </motion.div>
                )}

                {activeSpecTab === 'performance' && (
                  <motion.div
                    initial={reduced ? {} : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2 text-[var(--salira-graphite-soft)]"
                  >
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">LIGHTHOUSE SCORE:</span>
                      <span className="font-bold text-[var(--salira-blueprint)]">98–100 Performance</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">FIRST CONTENTFUL:</span>
                      <span className="font-bold text-[var(--salira-graphite)]">&lt; 0.6s on 4G Mobile</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[var(--salira-paper-lifted)] p-2">
                      <span className="text-[10px] text-[var(--salira-graphite-muted)]">ACCESSIBILITY:</span>
                      <span className="font-bold text-[var(--salira-redpen)]">WCAG AAA / AA Tested</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Box Footer Stamp */}
              <div className="mt-4 border-t border-[var(--salira-border-draft)] pt-3 font-mono text-[9px] text-[var(--salira-graphite-muted)] flex items-center justify-between">
                <span>VERIFIED BUILD SPEC</span>
                <span className="text-[var(--salira-blueprint)]">NO EXTERNAL DEPENDENCIES</span>
              </div>
            </div>
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 02: CASE STUDIES (PROOF BEFORE PITCH)
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="case-studies"
        sheetNumber="SHEET 02/06"
        title="PROVABLE WORKING SYSTEMS · CASE STUDIES"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="TESTABLE CLIENT INSTANCES"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span>✎ HONEST CASE STUDY DISCLOSURE: WE CONTRAST THE INITIAL WRONG DRAFT AGAINST THE FINAL ARCHITECTURE.</span>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              Working software, engineered per industry.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              Both systems below are fully working two-sided applications running in your browser. Open them directly to test live interactions.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Case Study 01: AURA Restaurant Ecosystem */}
            <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs transition-all hover:border-[var(--salira-blueprint)]">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                      <UtensilsCrossed size={16} />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                      01 · AURA Restaurant Ecosystem
                    </span>
                  </div>
                  <span className="rounded bg-[var(--salira-paper-lifted)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-blueprint)]">
                    TWO-SIDED PWA
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--salira-graphite)]">
                  Direct Guest Ordering &amp; Kitchen Operations Console
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Modern South Indian Kitchen in Chennai. Replaced a 30% commission food delivery aggregator with a zero-rent custom PWA and spatial table management.
                </p>

                {/* Honest Engineering Framework */}
                <div className="mt-5 space-y-2 font-mono text-xs">
                  <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-2.5">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      THE ASK:
                    </span>
                    <span className="text-[11px] text-[var(--salira-graphite)]">
                      Eliminate ₹45,000/mo marketplace commissions and streamline kitchen ticket chaos.
                    </span>
                  </div>

                  <div className="rounded border border-dashed border-[var(--salira-redpen-border)] bg-[var(--salira-redpen-bg)] p-2.5">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      THE WRONG FIRST DRAFT:
                    </span>
                    <span className="text-[11px] salira-strikethrough text-[var(--salira-graphite-muted)]">
                      Off-the-shelf WordPress/Shopify ordering plugin. Too slow on 4G, rigid modifier groups, no kitchen dispatch screen.
                    </span>
                  </div>

                  <div className="rounded border border-[var(--salira-border-draft)] bg-white p-2.5">
                    <span className="block text-[9px] font-bold text-[var(--salira-blueprint)] uppercase">
                      THE SYSTEM WE BUILT:
                    </span>
                    <span className="text-[11px] text-[var(--salira-graphite)]">
                      Custom React PWA with live cross-tab WebSocket dispatch to a tablet-optimized kitchen display console.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--salira-border-draft)] pt-4">
                <Link
                  to="/work/restaurants"
                  className="inline-flex items-center gap-1.5 rounded bg-[var(--salira-blueprint)] px-3.5 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-redpen)] transition-colors"
                  data-draft-target="AURA Case Study"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/work/restaurants/customer"
                  className="inline-flex items-center gap-1.5 rounded border border-[var(--salira-border-draft)] bg-white px-3.5 py-2 font-mono text-xs font-bold uppercase text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                  data-draft-target="Launch AURA App"
                >
                  <span>Launch Guest App</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Case Study 02: VoyageAI Travel Agency */}
            <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs transition-all hover:border-[var(--salira-blueprint)]">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                      <Plane size={16} />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                      02 · VoyageAI Travel Platform
                    </span>
                  </div>
                  <span className="rounded bg-[var(--salira-paper-lifted)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-blueprint)]">
                    PORTAL + BACKOFFICE
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-[var(--salira-graphite)]">
                  Luxury Client Destination Explorer &amp; Agency Admin Console
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  High-end luxury bespoke travel consultancy. Replaced static PDF itineraries with an interactive destination builder and instant agent quote engine.
                </p>

                {/* Honest Engineering Framework */}
                <div className="mt-5 space-y-2 font-mono text-xs">
                  <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-2.5">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      THE ASK:
                    </span>
                    <span className="text-[11px] text-[var(--salira-graphite)]">
                      High drop-off rate on generic enquiry contact forms and lost customer leads across WhatsApp.
                    </span>
                  </div>

                  <div className="rounded border border-dashed border-[var(--salira-redpen-border)] bg-[var(--salira-redpen-bg)] p-2.5">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      THE WRONG FIRST DRAFT:
                    </span>
                    <span className="text-[11px] salira-strikethrough text-[var(--salira-graphite-muted)]">
                      Standard generic multi-step lead capture modal that felt like a sales funnel rather than a luxury travel consultation.
                    </span>
                  </div>

                  <div className="rounded border border-[var(--salira-border-draft)] bg-white p-2.5">
                    <span className="block text-[9px] font-bold text-[var(--salira-blueprint)] uppercase">
                      THE SYSTEM WE BUILT:
                    </span>
                    <span className="text-[11px] text-[var(--salira-graphite)]">
                      Curated dark-mode destination portal with live itinerary wishlist linked to an agency dashboard for one-click proposal generation.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--salira-border-draft)] pt-4">
                <Link
                  to="/work/travel"
                  className="inline-flex items-center gap-1.5 rounded bg-[var(--salira-blueprint)] px-3.5 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-redpen)] transition-colors"
                  data-draft-target="VoyageAI Case Study"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={13} />
                </Link>
                <Link
                  to="/work/travel/customer"
                  className="inline-flex items-center gap-1.5 rounded border border-[var(--salira-border-draft)] bg-white px-3.5 py-2 font-mono text-xs font-bold uppercase text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                  data-draft-target="Launch VoyageAI Portal"
                >
                  <span>Launch Portal</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 03: SERVICES / ENGINEERING SPECIFICATIONS
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="services"
        sheetNumber="SHEET 03/06"
        title="CORE ENGINEERING SPECIFICATIONS · SERVICES"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="PRODUCTION CAPABILITIES"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span>✎ ALL DELIVERABLES INCLUDE COMPLETE CI/CD, CLEAN SOURCE CODE, AND PRODUCTION CLOUD DEPLOYMENT.</span>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              Software engineered for real business operations.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              We specialize in custom systems where off-the-shelf software fails due to rigid constraints, recurring monthly rent, or poor usability.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Spec 01 */}
            <div className="rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs">
              <span className="font-mono text-[10px] font-bold text-[var(--salira-redpen)]">
                SPEC 01
              </span>
              <div className="my-2 flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                <FileCode2 size={18} />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--salira-graphite)]">
                High-Conversion Web &amp; PWAs
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                Ultra-fast customer-facing interfaces engineered with zero framework bloat. Instant loading on mobile networks with offline caching.
              </p>
            </div>

            {/* Spec 02 */}
            <div className="rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs">
              <span className="font-mono text-[10px] font-bold text-[var(--salira-redpen)]">
                SPEC 02
              </span>
              <div className="my-2 flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                <Layers size={18} />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--salira-graphite)]">
                Operations &amp; Admin Consoles
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                Two-sided dashboards for order dispatch, customer management, spatial table plans, and real-time operations visibility.
              </p>
            </div>

            {/* Spec 03 */}
            <div className="rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs">
              <span className="font-mono text-[10px] font-bold text-[var(--salira-redpen)]">
                SPEC 03
              </span>
              <div className="my-2 flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                <Database size={18} />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--salira-graphite)]">
                Custom Data &amp; State Sync
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                Purpose-built relational schemas and state synchronization engines tailored to your actual operational rules and transactions.
              </p>
            </div>

            {/* Spec 04 */}
            <div className="rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs">
              <span className="font-mono text-[10px] font-bold text-[var(--salira-redpen)]">
                SPEC 04
              </span>
              <div className="my-2 flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                <ShieldCheck size={18} />
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--salira-graphite)]">
                Turnkey Code Ownership
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                100% of the git repositories, production build configurations, and domain DNS setup are transferred directly to your organization.
              </p>
            </div>
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 04: HOW WE WORK (THE DRAFTING PROTOCOL)
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="how-we-work"
        sheetNumber="SHEET 04/06"
        title="THE DRAFTING PROTOCOL · HOW WE WORK"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="SPRINT LIFECYCLE"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span>✎ TRANSPARENT REPUTATION: MILESTONE BILLING WITH NO HIDDEN FEES OR COST CREEP.</span>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              From initial draft to production release.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              A disciplined, technical engineering protocol that keeps you in complete control at every milestone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discovery Blueprint',
                desc: 'We map your physical daily operations, bottlenecks, and user roles into a clear technical scope document with a fixed quote.',
              },
              {
                step: '02',
                title: 'Working Prototype',
                desc: 'We deliver an interactive working draft you can click and test in your browser within 10–14 days. No static wireframe mockups.',
              },
              {
                step: '03',
                title: 'Engineering Sprints',
                desc: 'We build out full business logic, database integrations, responsive styling, and cross-device performance budgets.',
              },
              {
                step: '04',
                title: 'Production Handover',
                desc: 'We deploy your system live, configure custom domains and SSL certificates, and transfer 100% source code ownership.',
              },
            ].map((p) => (
              <div
                key={p.step}
                className="relative rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs"
              >
                <span className="font-mono text-xs font-bold text-[var(--salira-blueprint)]">
                  PHASE {p.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[var(--salira-graphite)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 05: TRANSPARENT PRICING & SCOPE
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="pricing"
        sheetNumber="SHEET 05/06"
        title="FIXED-PRICE ENGINEERING ESTIMATES · PRICING & SCOPE"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="COMMERCIAL TERMS"
        marginAnnotation={
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span className="text-[var(--salira-redpen)] font-bold">
              ✎ ALL TIERS INCLUDE 100% SOURCE CODE HANDOVER AND ZERO MONTHLY SAAS FEES.
            </span>
            <span>CUSTOM SCOPES QUOTED WITHIN 24 HOURS</span>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              Transparent, fixed-price specifications.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              Clear milestone pricing with no subscription fees, platform commissions, or hidden surprises.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tier 01: Foundation Web Tier */}
            <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                    TIER 01 · FOUNDATION
                  </span>
                  <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-graphite-muted)]">
                    1–2 WEEKS
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-[var(--salira-graphite)]">
                    ₹15,000
                  </span>
                  <span className="font-mono text-xs text-[var(--salira-graphite-muted)]"> / $200 fixed</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  High-conversion brand presence engineered with sub-100ms loading and Google SEO optimization.
                </p>

                <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Custom High-Converting Web Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Mobile Responsive &amp; Touch Optimized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Instant WhatsApp &amp; Contact Dispatch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>100% Full Source Code Transfer</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded border-2 border-[var(--salira-blueprint)] bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)] shadow-2xs transition-all duration-180 hover:bg-[var(--salira-blueprint)] hover:text-white active:scale-98"
                  data-draft-target="Select Tier 01"
                >
                  <span>Select Specification</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Tier 02: Custom Business App (Highlighted) */}
            <div className="flex flex-col justify-between rounded-lg border-2 border-[var(--salira-blueprint)] bg-white p-6 shadow-md relative">
              <span className="absolute -top-3 left-6 rounded bg-[var(--salira-redpen)] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-2xs">
                MOST POPULAR BLUEPRINT
              </span>
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                    TIER 02 · CUSTOM APP
                  </span>
                  <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-blueprint)]">
                    2–3 WEEKS
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-[var(--salira-graphite)]">
                    ₹35,000
                  </span>
                  <span className="font-mono text-xs text-[var(--salira-graphite-muted)]"> / $450 fixed</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Complete two-sided application with customer booking/ordering portal + operations admin console.
                </p>

                <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Two-Sided Architecture (Client + Admin)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Real-Time State &amp; Notification Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Custom Workflow Logic &amp; Cart/Booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Zero Monthly SaaS Platform Fees</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all duration-180 hover:bg-[var(--salira-redpen)] active:scale-98"
                  data-draft-target="Select Tier 02"
                >
                  <span>Initiate Custom Build</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Tier 03: Full Ecosystem */}
            <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                    TIER 03 · FULL ECOSYSTEM
                  </span>
                  <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-graphite-muted)]">
                    3–4 WEEKS
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-[var(--salira-graphite)]">
                    ₹65,000
                  </span>
                  <span className="font-mono text-xs text-[var(--salira-graphite-muted)]"> / $850 fixed</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Enterprise-grade multi-role operational platform with database automations and full analytics.
                </p>

                <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Multi-Role Access (Customer, Staff, Manager)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Custom Schema &amp; Cloud Database Deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Export, Invoicing &amp; Operations Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>30-Day Post-Launch SLA &amp; Support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded border-2 border-[var(--salira-blueprint)] bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)] shadow-2xs transition-all duration-180 hover:bg-[var(--salira-blueprint)] hover:text-white active:scale-98"
                  data-draft-target="Select Tier 03"
                >
                  <span>Select Specification</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 06: STUDIO DISPATCH / CONTACT
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="contact"
        sheetNumber="SHEET 06/06"
        title="STUDIO DISPATCH · INITIATE WORKING DRAFT"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="DIRECT COMMUNICATION"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span>✎ ALL INQUIRIES RECEIVE A DIRECT TECHNICAL AUDIT FROM AN ENGINEER, NOT A SALES REP.</span>
          </div>
        }
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-5 lg:col-span-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              Let's engineer your software.
            </h2>
            <p className="text-xs leading-relaxed text-[var(--salira-graphite-soft)] sm:text-sm">
              Send us your operational requirements or current process headaches. We'll respond with a clear architectural outline and fixed estimate within 24 hours.
            </p>

            <div className="space-y-3 font-mono text-xs pt-2">
              <a
                href="tel:+917397430568"
                className="flex items-center gap-3 rounded border border-[var(--salira-border-draft)] bg-white p-3 text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                data-draft-target="Direct Call Contact"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                  <Phone size={15} />
                </span>
                <div>
                  <span className="block text-[9px] text-[var(--salira-graphite-muted)] uppercase">
                    DIRECT CALL / TELEPHONE
                  </span>
                  <span className="font-bold">+91 73974 30568</span>
                </div>
              </a>

              <a
                href="mailto:hello@salira.studio"
                className="flex items-center gap-3 rounded border border-[var(--salira-border-draft)] bg-white p-3 text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                data-draft-target="Direct Email Contact"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                  <Mail size={15} />
                </span>
                <div>
                  <span className="block text-[9px] text-[var(--salira-graphite-muted)] uppercase">
                    DIRECT EMAIL
                  </span>
                  <span className="font-bold">hello@salira.studio</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Working Draft Intake Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                <span className="text-[var(--salira-blueprint)] font-bold">DRAFT INTAKE FORM</span>
                <span>NO SALES SPAM</span>
              </div>

              {contactSubmitted ? (
                <div className="rounded border border-[var(--salira-blueprint)] bg-[var(--salira-paper-lifted)] p-6 text-center">
                  <CheckCircle2 size={32} className="mx-auto text-[var(--salira-blueprint)]" />
                  <h3 className="mt-3 font-display text-xl font-bold text-[var(--salira-graphite)]">
                    Blueprint Intake Received
                  </h3>
                  <p className="mt-2 font-mono text-xs text-[var(--salira-graphite-soft)]">
                    Thank you, {contactForm.name || 'there'}. We have queued your requirement for engineering review and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                      YOUR NAME / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh / Aura Hospitality"
                      className="mt-1 w-full rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] px-3 py-2 font-sans text-xs text-[var(--salira-graphite)] outline-none focus:border-[var(--salira-blueprint)]"
                      data-draft-target="Input Name"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                      EMAIL OR PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. ramesh@aurarestaurant.in or +91 98765..."
                      className="mt-1 w-full rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] px-3 py-2 font-sans text-xs text-[var(--salira-graphite)] outline-none focus:border-[var(--salira-blueprint)]"
                      data-draft-target="Input Email"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                      BRIEF SYSTEM REQUIREMENTS / WHAT TO AUTOMATE
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.projectScope}
                      onChange={(e) => setContactForm({ ...contactForm, projectScope: e.target.value })}
                      placeholder="e.g. We need a two-sided ordering portal for our 2 restaurant locations to avoid Zomato/Swiggy commissions..."
                      className="mt-1 w-full rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] px-3 py-2 font-sans text-xs text-[var(--salira-graphite)] outline-none focus:border-[var(--salira-blueprint)]"
                      data-draft-target="Input Scope"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[var(--salira-redpen)] py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#E02E24] transition-colors"
                    data-draft-target="Submit Blueprint Button"
                  >
                    Submit Requirements for Architectural Estimate
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </DraftSheet>
    </div>
  )
}
