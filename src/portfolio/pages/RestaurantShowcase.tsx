import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Smartphone,
  MonitorCog,
  Search,
  UtensilsCrossed,
  SlidersHorizontal,
  ShoppingCart,
  ChefHat,
  PackageCheck,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../../templates/restaurant/routes'
import { DraftSheet } from '../components/DraftSheet'

const workflowSteps = [
  { icon: Search, label: '01 · Discover' },
  { icon: UtensilsCrossed, label: '02 · Browse' },
  { icon: SlidersHorizontal, label: '03 · Customize' },
  { icon: ShoppingCart, label: '04 · Order' },
  { icon: ChefHat, label: '05 · Prepare' },
  { icon: PackageCheck, label: '06 · Fulfil' },
  { icon: MapPin, label: '07 · Track' },
]

export default function RestaurantShowcase() {
  return (
    <div className="salira-draft-grid min-h-screen py-6 sm:py-10">
      <DraftSheet
        sheetNumber="SPEC-01 · DEEP DIVE"
        title="AURA RESTAURANT ECOSYSTEM · ARCHITECTURAL BLUEPRINT"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="PRODUCTION SYSTEM"
        marginAnnotation={
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span className="text-[var(--salira-redpen)] font-bold">
              ✎ DUAL RUNTIME: GUEST PWA + KITCHEN CONSOLE SYNC VIA REACTIVE EVENT DISPATCH.
            </span>
            <span>ZERO EXTERNAL CLOUD DATABASE DEPENDENCIES</span>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Back Link */}
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--salira-graphite-soft)] transition-colors hover:text-[var(--salira-blueprint)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Return to Case Studies Index</span>
          </Link>

          {/* Header */}
          <header className="border-b border-[var(--salira-border-draft)] pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--salira-blueprint)] uppercase">
              <span>RESTAURANTS</span>
              <span className="text-[var(--salira-border-draft)]">/</span>
              <span className="text-[var(--salira-redpen)]">AURA SOUTH INDIAN KITCHEN</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl text-[var(--salira-graphite)]">
              Digital operations built around the restaurant floor.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              A demonstration of how SaLira turns chaotic daily restaurant workflows into connected, zero-rent software applications for guests and kitchen staff.
            </p>
          </header>

          {/* 4-Step Honest Framework */}
          <section className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-[var(--salira-blueprint)] uppercase">
              <span>THE ENGINEERING REASONING</span>
              <span className="text-[var(--salira-redpen)]">4-STAGE SPECIFICATION</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded border border-[var(--salira-border-draft)] bg-white p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-blueprint)]">
                  1. THE ASK
                </span>
                <p className="mt-1 text-xs text-[var(--salira-graphite-soft)]">
                  The client was losing ~30% per order to third-party food marketplace aggregators while suffering miscommunicated diner orders during peak rush hours.
                </p>
              </div>

              <div className="rounded border border-dashed border-[var(--salira-redpen-border)] bg-[var(--salira-redpen-bg)] p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-redpen)]">
                  2. THE WRONG FIRST DRAFT (DISCARDED)
                </span>
                <p className="mt-1 text-xs salira-strikethrough text-[var(--salira-graphite-muted)]">
                  Tried an off-the-shelf SaaS food ordering template. It had high monthly subscription fees, inflexible modifier nesting, and required staff to refresh a browser tab manually to see new orders.
                </p>
              </div>

              <div className="rounded border border-[var(--salira-border-draft)] bg-white p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-blueprint)]">
                  3. THE SYSTEM WE ACTUALLY BUILT
                </span>
                <p className="mt-1 text-xs text-[var(--salira-graphite-soft)]">
                  A pure TypeScript PWA with instant QR table sessioning, customizable spice/roast modifiers, real-time ticket sync to kitchen tablets, and an interactive floor table map.
                </p>
              </div>

              <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-redpen)]">
                  4. THE OUTCOME &amp; OWNERSHIP
                </span>
                <p className="mt-1 text-xs text-[var(--salira-graphite-soft)]">
                  0% aggregator fees on direct orders, 40% faster kitchen turnaround, &lt; 0.8s mobile load times, and 100% full source code ownership handed over.
                </p>
              </div>
            </div>
          </section>

          {/* Workflow Sequence */}
          <section className="border-t border-[var(--salira-border-draft)] pt-8">
            <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
              UNIFIED 7-STEP RESTAURANT PIPELINE
            </span>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 font-mono text-xs">
              {workflowSteps.map((step) => (
                <div
                  key={step.label}
                  className="flex flex-col items-center justify-center rounded border border-[var(--salira-border-draft)] bg-white p-3 text-center shadow-2xs"
                >
                  <step.icon size={18} className="text-[var(--salira-blueprint)] mb-1.5" />
                  <span className="text-[10px] font-bold text-[var(--salira-graphite)]">{step.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Dual Experience Launcher */}
          <section className="grid gap-6 lg:grid-cols-2 border-t border-[var(--salira-border-draft)] pt-8">
            {/* Guest Experience */}
            <div className="flex flex-col justify-between rounded-xl border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--salira-blueprint)] uppercase">
                  <Smartphone size={16} />
                  <span>CLIENT APPLICATION 01</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-[var(--salira-graphite)]">
                  Guest Ordering PWA
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Instant mobile web application for guests to scan table QR codes, browse categorized dishes, customize modifier groups, and submit orders directly.
                </p>

                <ul className="mt-4 space-y-1.5 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Instant Category &amp; Dietary Filter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Real-Time Kitchen Step Tracking</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--salira-border-draft)]">
                <Link
                  to={CUSTOMER_BASE}
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-redpen)] transition-colors"
                  data-draft-target="Launch Restaurant Guest App"
                >
                  <span>Launch Live Guest PWA</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Kitchen Operations Console */}
            <div className="flex flex-col justify-between rounded-xl border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--salira-blueprint)] uppercase">
                  <MonitorCog size={16} />
                  <span>CLIENT APPLICATION 02</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-[var(--salira-graphite)]">
                  Kitchen &amp; Floor Operations Console
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Real-time command center for chefs and restaurant managers: live order dispatch, ticket preparation workflows, spatial table plans, and revenue metrics.
                </p>

                <ul className="mt-4 space-y-1.5 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Audio &amp; Visual Instant Order Alert</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Interactive Spatial Floor Plan</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--salira-border-draft)]">
                <Link
                  to={CONSOLE_BASE}
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-graphite)] py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-blueprint)] transition-colors"
                  data-draft-target="Launch Restaurant Kitchen Console"
                >
                  <span>Launch Kitchen Operations Console</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </DraftSheet>
    </div>
  )
}
