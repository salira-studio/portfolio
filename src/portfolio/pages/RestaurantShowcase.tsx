import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Smartphone,
  MonitorCog,
  RefreshCcw,
  ShoppingBag,
  ClipboardCheck,
  ChefHat,
  BellRing,
} from 'lucide-react'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../../templates/restaurant/routes'
import { useAppStore } from '../../templates/restaurant/store/useAppStore'
import { LiveBadge } from '../components/LiveBadge'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ScrollReveal'

const customerPoints = [
  'Interactive South Indian dining & beverage menu',
  'Deep item customization — spice levels, ghee, accompaniments',
  'Streamlined delivery & pickup checkout with simulated payment',
  'Real-time order tracker with live kitchen stage notifications',
]

const consolePoints = [
  'Real-time operations dashboard with today\'s order telemetry',
  'Live kitchen ticket pipeline from new to preparation and dispatch',
  'Spatial floor plan with table ambient lighting and status controls',
  'Customer directory, performance analytics and system settings',
]

const flow = [
  { icon: ShoppingBag, who: 'Guest App', what: 'Selects dishes & places live order in customer PWA' },
  { icon: ClipboardCheck, who: 'Kitchen Console', what: 'Order arrives instantly in real-time — accept it' },
  { icon: ChefHat, who: 'Kitchen Console', what: 'Advance order to preparing, then ready' },
  { icon: BellRing, who: 'Guest App', what: 'Status updates live on the tracking screen across tabs' },
]

export default function RestaurantShowcase() {
  const resetDemo = useAppStore((s) => s.resetDemo)

  return (
    <div className="relative overflow-hidden bg-[var(--sl-bg-casestudy)] text-[var(--sl-ink)] min-h-screen">
      {/* Background Ambient Glow */}
      <div className="sl-hero-mesh" aria-hidden="true">
        <div className="sl-hero-glow-1" />
        <div className="sl-hero-glow-2" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        {/* Back Link */}
        <FadeUp>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--sl-ink-soft)] transition-colors hover:text-[var(--sl-ink)]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Case Studies
          </Link>
        </FadeUp>

        {/* ── Case Study Header ── */}
        <header className="mt-8 border-b border-[var(--sl-line)] pb-12">
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-2">
              <span className="sl-label text-[var(--sl-oxblood)] font-bold">Case Study</span>
              <span className="text-[var(--sl-line)]">/</span>
              <span className="sl-label text-[var(--sl-charcoal)] font-mono">Restaurant Systems</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-[var(--sl-ink)]">
              AURA — connected digital architecture for a modern South Indian kitchen.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--sl-ink-soft)] sm:text-lg">
              SaLira designed and built both sides of this unified platform: the high-touch PWA your guests order from, and the high-velocity operational console your staff runs the restaurant with. Launch both apps side-by-side to experience reactive cross-tab synchronization in action.
            </p>
          </FadeUp>
        </header>

        {/* ── Two Products Grid ── */}
        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Customer App Card */}
          <FadeUp delay={0.1}>
            <div className="sl-card group flex h-full flex-col p-7 sm:p-10 shadow-lg shadow-neutral-900/3 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-oxblood)] shadow-2xs">
                    <Smartphone size={20} strokeWidth={1.8} />
                  </span>
                  <span className="sl-label text-[var(--sl-oxblood)] font-bold">Guest Interface</span>
                </div>
                <span className="rounded-full bg-[var(--sl-sand-deep)]/50 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[var(--sl-charcoal)] ring-1 ring-[var(--sl-line)]">
                  Mobile PWA
                </span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                AURA Customer App
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                Provide guests with a responsive, frictionless dining interface — from high-fidelity menu discovery and deep item customization to live order status updates.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {customerPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--sl-ink-soft)]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sl-oxblood)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--sl-line)] pt-6">
                <MagneticButton strength={0.25}>
                  <Link
                    to={CUSTOMER_BASE}
                    data-cursor="open"
                    data-cursor-text="Customer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--sl-oxblood)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-red-950/20 transition-all hover:bg-[var(--sl-oxblood)]/90 hover:shadow-lg active:scale-98"
                  >
                    <span>Launch Customer App</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </MagneticButton>
                <a
                  href={CUSTOMER_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--sl-line)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--sl-ink-soft)] transition-colors hover:border-[var(--sl-charcoal)] hover:text-[var(--sl-ink)]"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Console Card */}
          <FadeUp delay={0.2}>
            <div className="sl-card group flex h-full flex-col p-7 sm:p-10 shadow-lg shadow-neutral-900/3 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-sand-deep)]/60 text-[var(--sl-ink)] shadow-2xs">
                    <MonitorCog size={20} strokeWidth={1.8} />
                  </span>
                  <span className="sl-label text-[var(--sl-charcoal)]">Staff Operations</span>
                </div>
                <span className="rounded-full bg-[var(--sl-sand-deep)]/50 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[var(--sl-charcoal)] ring-1 ring-[var(--sl-line)]">
                  Desktop & Tablet
                </span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                AURA Restaurant Console
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                A command center for restaurant managers, floor staff, and kitchen leads to oversee incoming tickets, manage table seating, and analyze daily operations.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {consolePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--sl-ink-soft)]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sl-ink)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--sl-line)] pt-6">
                <MagneticButton strength={0.25}>
                  <Link
                    to={CONSOLE_BASE}
                    data-cursor="open"
                    data-cursor-text="Console"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--sl-ink)] px-5 py-3 text-sm font-semibold text-[var(--sl-paper)] shadow-md shadow-neutral-900/20 transition-all hover:bg-black hover:shadow-lg active:scale-98"
                  >
                    <span>Launch Operations Console</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </MagneticButton>
                <a
                  href={CONSOLE_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--sl-line)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--sl-ink-soft)] transition-colors hover:border-[var(--sl-charcoal)] hover:text-[var(--sl-ink)]"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Connected Loop Demonstration Guide ── */}
        <section className="sl-card mt-16 p-7 sm:p-12 shadow-xl shadow-neutral-900/2">
          <FadeUp>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="sl-label text-[var(--sl-oxblood)] font-bold">Two-Sided Sync Architecture</p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                  Try the real-time cross-app loop
                </h2>
              </div>
              <LiveBadge />
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sl-ink-soft)]">
              Open both the Customer App and the Restaurant Console in adjacent browser windows. Place an order on the customer app, and observe how the ticket pops up and reflects updates across both interfaces with zero backend delay.
            </p>
          </FadeUp>

          <StaggerContainer
            staggerDelay={0.1}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {flow.map((step, i) => (
              <StaggerItem key={step.what}>
                <div className="group relative h-full rounded-2xl border border-[var(--sl-line)] bg-white/70 p-6 transition-all duration-300 hover:bg-white hover:border-[var(--sl-oxblood)]/40">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-[var(--sl-oxblood)]">
                      Stage {i + 1}
                    </span>
                    <step.icon size={16} className="text-[var(--sl-teal-deep)]" strokeWidth={1.8} />
                  </div>
                  <p className="mt-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--sl-charcoal)]">
                    {step.who}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-[var(--sl-ink)]">
                    {step.what}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--sl-line)] pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-[var(--sl-ink-soft)]">
              Need to clear existing test orders or reset kitchen state to default?
            </p>
            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={resetDemo}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--sl-line)] bg-white px-4 py-2.5 text-xs font-semibold text-[var(--sl-ink)] shadow-2xs transition-all hover:border-[var(--sl-charcoal)] hover:bg-[var(--sl-sand-deep)]/20"
              >
                <RefreshCcw size={13} />
                Reset demo state
              </button>
            </MagneticButton>
          </div>
        </section>
      </div>
    </div>
  )
}
