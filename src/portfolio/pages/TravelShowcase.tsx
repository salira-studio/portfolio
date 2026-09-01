import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Globe,
  LayoutDashboard,
  Search,
  MapPin,
  Calendar,
  CreditCard,
  Star,
  Plane,
  CheckCircle2,
} from 'lucide-react'
import { DraftSheet } from '../components/DraftSheet'

const CUSTOMER_BASE = '/work/travel/customer'
const ADMIN_BASE = '/work/travel/admin'

const workflowSteps = [
  { icon: Search, label: '01 · Discover' },
  { icon: MapPin, label: '02 · Explore' },
  { icon: Calendar, label: '03 · Custom Itinerary' },
  { icon: CreditCard, label: '04 · Reserve' },
  { icon: Plane, label: '05 · Travel' },
  { icon: Star, label: '06 · Review' },
]

export default function TravelShowcase() {
  return (
    <div className="salira-draft-grid min-h-screen py-6 sm:py-10">
      <DraftSheet
        sheetNumber="SPEC-02 · DEEP DIVE"
        title="VOYAGEAI TRAVEL PLATFORM · ARCHITECTURAL BLUEPRINT"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="PRODUCTION SYSTEM"
        marginAnnotation={
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span className="text-[var(--salira-redpen)] font-bold">
              ✎ DUAL RUNTIME: LUXURY CLIENT WEBSITE + BACKOFFICE ADMIN RUNNING WITH BIDIRECTIONAL SYNC.
            </span>
            <span>CUSTOM PROPOSAL BUILDER INCLUDED</span>
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
              <span>TRAVEL AGENCY</span>
              <span className="text-[var(--salira-border-draft)]">/</span>
              <span className="text-[var(--salira-redpen)]">VOYAGEAI LUXURY PLATFORM</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl text-[var(--salira-graphite)]">
              Travel experiences, engineered end-to-end.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              A premium travel platform engineered with a dark-luxury client portal linked directly to a powerful backoffice admin console with zero monthly software subscriptions.
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
                  The agency needed to stop losing high-value luxury clients who found static PDF brochures tedious to navigate on smartphones.
                </p>
              </div>

              <div className="rounded border border-dashed border-[var(--salira-redpen-border)] bg-[var(--salira-redpen-bg)] p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-redpen)]">
                  2. THE WRONG FIRST DRAFT (DISCARDED)
                </span>
                <p className="mt-1 text-xs salira-strikethrough text-[var(--salira-graphite-muted)]">
                  Attempted a generic travel CRM form plugin. It presented sterile spreadsheet-like forms that destroyed the luxury brand illusion and failed to sync package rates.
                </p>
              </div>

              <div className="rounded border border-[var(--salira-border-draft)] bg-white p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-blueprint)]">
                  3. THE SYSTEM WE ACTUALLY BUILT
                </span>
                <p className="mt-1 text-xs text-[var(--salira-graphite-soft)]">
                  A bespoke dark-mode destination portal with live package filtering and an itinerary wishlist, synchronized with an admin console for instant customer quote management.
                </p>
              </div>

              <div className="rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper-lifted)] p-4">
                <span className="block font-mono text-[10px] font-bold uppercase text-[var(--salira-redpen)]">
                  4. THE OUTCOME &amp; OWNERSHIP
                </span>
                <p className="mt-1 text-xs text-[var(--salira-graphite-soft)]">
                  3x increase in completed customer package inquiries, instant proposal generation, zero monthly SaaS rent, and 100% full source code ownership.
                </p>
              </div>
            </div>
          </section>

          {/* Workflow Sequence */}
          <section className="border-t border-[var(--salira-border-draft)] pt-8">
            <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
              THE 6-STEP TRAVEL CUSTOMER JOURNEY
            </span>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 font-mono text-xs">
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
            {/* Customer Website */}
            <div className="flex flex-col justify-between rounded-xl border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--salira-blueprint)] uppercase">
                  <Globe size={16} />
                  <span>CLIENT APPLICATION 01</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-[var(--salira-graphite)]">
                  Luxury Customer Travel Portal
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Dark-themed luxury website showcasing curated international destinations, luxury resort packages, activity highlights, and customer itinerary booking.
                </p>

                <ul className="mt-4 space-y-1.5 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Interactive Destination &amp; Package Explorer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Wishlist &amp; Direct Booking Flow</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--salira-border-draft)]">
                <Link
                  to={CUSTOMER_BASE}
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-redpen)] transition-colors"
                  data-draft-target="Launch Travel Customer Site"
                >
                  <span>Launch Customer Portal</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Travel Agency Admin Console */}
            <div className="flex flex-col justify-between rounded-xl border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--salira-blueprint)] uppercase">
                  <LayoutDashboard size={16} />
                  <span>CLIENT APPLICATION 02</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-[var(--salira-graphite)]">
                  Agency Management &amp; Dispatch Console
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Complete backoffice operations portal for managing package catalogs, client inquiries, reservations, custom pricing rules, and agency revenue analytics.
                </p>

                <ul className="mt-4 space-y-1.5 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Live Package &amp; Destination Editor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)]" />
                    <span>Booking Status Management &amp; Analytics</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--salira-border-draft)]">
                <Link
                  to={ADMIN_BASE}
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--salira-graphite)] py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-[var(--salira-blueprint)] transition-colors"
                  data-draft-target="Launch Travel Admin Console"
                >
                  <span>Launch Agency Admin Console</span>
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
