import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  UtensilsCrossed,
  Plane,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { DraftSheet } from '../components/DraftSheet'

export default function Work() {
  return (
    <div className="salira-draft-grid min-h-screen py-6 sm:py-10">
      <DraftSheet
        sheetNumber="INDEX · CASE STUDIES"
        title="PROVABLE WORKING SYSTEMS · COMPREHENSIVE ARCHIVE"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="PRODUCTION CODEBASES"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)] flex flex-wrap items-center justify-between gap-2">
            <span className="text-[var(--salira-redpen)] font-bold">
              ✎ HONESTY MECHANISM: WE EXPOSE THE WRONG FIRST DRAFT TO SHOW THE ENGINEERING REASONING.
            </span>
            <span>ALL BUILDS RUN 100% IN BROWSER</span>
          </div>
        }
      >
        <div className="space-y-12">
          {/* Header */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded border border-[var(--salira-border-draft)] bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
              <Sparkles size={12} />
              <span>SELECTED PRODUCTION CASE STUDIES</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-5xl">
              Working software, engineered per industry.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              Each project below is a complete, two-sided interactive system running locally in your browser. We document the initial friction, the failed standard approaches, and the system we actually engineered.
            </p>
          </div>

          {/* Case Study 01: AURA */}
          <div className="rounded-xl border border-[var(--salira-border-draft)] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--salira-border-draft)] pb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                  <UtensilsCrossed size={16} />
                </span>
                <span className="font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                  CASE STUDY 01 · AURA RESTAURANT ECOSYSTEM
                </span>
              </div>
              <span className="rounded bg-[var(--salira-paper-lifted)] px-2.5 py-1 font-bold text-[var(--salira-blueprint)]">
                CHESTNUT &amp; TAMIL NADU · LIVE SYSTEM
              </span>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-7">
                <h2 className="font-display text-2xl font-bold text-[var(--salira-graphite)] sm:text-3xl">
                  AURA — Modern South Indian Kitchen Platform
                </h2>
                <p className="text-xs leading-relaxed text-[var(--salira-graphite-soft)] sm:text-sm">
                  A complete restaurant operations suite combining a frictionless guest ordering PWA (with live status tracking) and a tablet-optimized kitchen ticket console with spatial table maps.
                </p>

                {/* 4-Step Honest Framework */}
                <div className="space-y-3 font-mono text-xs pt-2">
                  {/* Step 1: The Ask */}
                  <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-blueprint)] uppercase">
                      1. THE ASK:
                    </span>
                    <p className="mt-0.5 text-[11px] text-[var(--salira-graphite)]">
                      Stop paying 28–32% aggregator commissions on repeat dining guests and eliminate order slip confusion between front-of-house staff and the kitchen.
                    </p>
                  </div>

                  {/* Step 2: The Wrong First Draft */}
                  <div className="rounded border border-dashed border-[var(--salira-redpen-border)] bg-[var(--salira-redpen-bg)] p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      2. THE WRONG FIRST DRAFT (WHAT FAILED):
                    </span>
                    <p className="mt-0.5 text-[11px] salira-strikethrough text-[var(--salira-graphite-muted)]">
                      Attempted an off-the-shelf WordPress WooCommerce restaurant plugin. It was sluggish on cellular connections (&gt;4s load), lacked custom South Indian modifier bundles (e.g. ghee roast roast-levels), and had no realtime kitchen buzzer.
                    </p>
                  </div>

                  {/* Step 3: The System Built */}
                  <div className="rounded border border-[var(--salira-border-draft)] bg-white p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-blueprint)] uppercase">
                      3. THE SYSTEM WE ACTUALLY BUILT:
                    </span>
                    <p className="mt-0.5 text-[11px] text-[var(--salira-graphite)]">
                      A bespoke ultra-light React 19 PWA with instant QR table sessioning, coupled with a real-time reactive kitchen management dashboard that updates order tickets across screens with zero latency.
                    </p>
                  </div>

                  {/* Step 4: The Outcome */}
                  <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      4. THE OUTCOME:
                    </span>
                    <div className="mt-1 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded bg-white p-2 border border-[var(--salira-border-draft)]">
                        <span className="block text-base font-bold text-[var(--salira-blueprint)]">0%</span>
                        <span className="text-[8px] uppercase text-[var(--salira-graphite-muted)]">Commission Rent</span>
                      </div>
                      <div className="rounded bg-white p-2 border border-[var(--salira-border-draft)]">
                        <span className="block text-base font-bold text-[var(--salira-blueprint)]">&lt; 0.8s</span>
                        <span className="text-[8px] uppercase text-[var(--salira-graphite-muted)]">Page Load</span>
                      </div>
                      <div className="rounded bg-white p-2 border border-[var(--salira-border-draft)]">
                        <span className="block text-base font-bold text-[var(--salira-redpen)]">100%</span>
                        <span className="text-[8px] uppercase text-[var(--salira-graphite-muted)]">Code Ownership</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-5 lg:col-span-5">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                    DEPLOYABLE ARTIFACTS
                  </span>
                  <ul className="mt-3 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Guest Ordering PWA (Mobile / Desktop)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Kitchen Operations Dispatch Screen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Live Spatial Table Management Map</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Cross-Tab Reactive Sync Engine</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 space-y-2 pt-4 border-t border-[var(--salira-border-draft)]">
                  <Link
                    to="/work/restaurants"
                    className="flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-redpen)] transition-colors"
                    data-draft-target="AURA Deep Dive"
                  >
                    <span>Read Architectural Deep Dive</span>
                    <ArrowRight size={13} />
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/work/restaurants/customer"
                      className="flex items-center justify-center gap-1 rounded border border-[var(--salira-border-draft)] bg-white py-2 font-mono text-[11px] font-bold uppercase text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                      data-draft-target="Launch AURA Customer"
                    >
                      <span>Guest PWA</span>
                      <ArrowUpRight size={12} />
                    </Link>
                    <Link
                      to="/work/restaurants/console"
                      className="flex items-center justify-center gap-1 rounded border border-[var(--salira-border-draft)] bg-white py-2 font-mono text-[11px] font-bold uppercase text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                      data-draft-target="Launch AURA Console"
                    >
                      <span>Kitchen Console</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 02: VoyageAI */}
          <div className="rounded-xl border border-[var(--salira-border-draft)] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--salira-border-draft)] pb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                  <Plane size={16} />
                </span>
                <span className="font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                  CASE STUDY 02 · VOYAGEAI TRAVEL AGENCY
                </span>
              </div>
              <span className="rounded bg-[var(--salira-paper-lifted)] px-2.5 py-1 font-bold text-[var(--salira-blueprint)]">
                LUXURY PORTAL &amp; ADMIN · LIVE SYSTEM
              </span>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-7">
                <h2 className="font-display text-2xl font-bold text-[var(--salira-graphite)] sm:text-3xl">
                  VoyageAI — Luxury Travel Portal &amp; Agency Console
                </h2>
                <p className="text-xs leading-relaxed text-[var(--salira-graphite-soft)] sm:text-sm">
                  An end-to-end bespoke travel management solution featuring a dark-luxury customer destination website with custom wishlist carts and a comprehensive agency management console.
                </p>

                {/* 4-Step Honest Framework */}
                <div className="space-y-3 font-mono text-xs pt-2">
                  {/* Step 1: The Ask */}
                  <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-blueprint)] uppercase">
                      1. THE ASK:
                    </span>
                    <p className="mt-0.5 text-[11px] text-[var(--salira-graphite)]">
                      Replace fragmented static PDF quotes and chaotic WhatsApp inquiries with a unified client portal and instant backoffice lead dispatch.
                    </p>
                  </div>

                  {/* Step 2: The Wrong First Draft */}
                  <div className="rounded border border-dashed border-[var(--salira-redpen-border)] bg-[var(--salira-redpen-bg)] p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      2. THE WRONG FIRST DRAFT (WHAT FAILED):
                    </span>
                    <p className="mt-0.5 text-[11px] salira-strikethrough text-[var(--salira-graphite-muted)]">
                      Standard generic CRM with embedded contact widgets. Clients felt alienated by generic corporate fields, and agents still had to manually re-type quotes into external accounting software.
                    </p>
                  </div>

                  {/* Step 3: The System Built */}
                  <div className="rounded border border-[var(--salira-border-draft)] bg-white p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-blueprint)] uppercase">
                      3. THE SYSTEM WE ACTUALLY BUILT:
                    </span>
                    <p className="mt-0.5 text-[11px] text-[var(--salira-graphite)]">
                      Custom responsive customer website with interactive destination wishlists linked via a live data layer to an admin dashboard that syncs packages, pricing, and bookings in real-time.
                    </p>
                  </div>

                  {/* Step 4: The Outcome */}
                  <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] p-3">
                    <span className="block text-[9px] font-bold text-[var(--salira-redpen)] uppercase">
                      4. THE OUTCOME:
                    </span>
                    <div className="mt-1 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded bg-white p-2 border border-[var(--salira-border-draft)]">
                        <span className="block text-base font-bold text-[var(--salira-blueprint)]">Instant</span>
                        <span className="text-[8px] uppercase text-[var(--salira-graphite-muted)]">Live Data Sync</span>
                      </div>
                      <div className="rounded bg-white p-2 border border-[var(--salira-border-draft)]">
                        <span className="block text-base font-bold text-[var(--salira-blueprint)]">Dual App</span>
                        <span className="text-[8px] uppercase text-[var(--salira-graphite-muted)]">Client + Admin</span>
                      </div>
                      <div className="rounded bg-white p-2 border border-[var(--salira-border-draft)]">
                        <span className="block text-base font-bold text-[var(--salira-redpen)]">100%</span>
                        <span className="text-[8px] uppercase text-[var(--salira-graphite-muted)]">Code Ownership</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-5 lg:col-span-5">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-blueprint)]">
                    DEPLOYABLE ARTIFACTS
                  </span>
                  <ul className="mt-3 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Luxury Dark-Theme Customer Portal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Full Travel Agent Admin Console</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Interactive Package &amp; Wishlist Engine</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                      <span>Bidirectional Real-Time State Sync</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 space-y-2 pt-4 border-t border-[var(--salira-border-draft)]">
                  <Link
                    to="/work/travel"
                    className="flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-redpen)] transition-colors"
                    data-draft-target="VoyageAI Deep Dive"
                  >
                    <span>Read Architectural Deep Dive</span>
                    <ArrowRight size={13} />
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/work/travel/customer"
                      className="flex items-center justify-center gap-1 rounded border border-[var(--salira-border-draft)] bg-white py-2 font-mono text-[11px] font-bold uppercase text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                      data-draft-target="Launch VoyageAI Customer"
                    >
                      <span>Customer Site</span>
                      <ArrowUpRight size={12} />
                    </Link>
                    <Link
                      to="/work/travel/admin"
                      className="flex items-center justify-center gap-1 rounded border border-[var(--salira-border-draft)] bg-white py-2 font-mono text-[11px] font-bold uppercase text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                      data-draft-target="Launch VoyageAI Admin"
                    >
                      <span>Admin Console</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DraftSheet>
    </div>
  )
}
