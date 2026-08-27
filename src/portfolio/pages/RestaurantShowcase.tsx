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
} from 'lucide-react'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../../templates/restaurant/routes'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ScrollReveal'

const workflowSteps = [
  { icon: Search, label: 'Discover' },
  { icon: UtensilsCrossed, label: 'Browse' },
  { icon: SlidersHorizontal, label: 'Customize' },
  { icon: ShoppingCart, label: 'Order' },
  { icon: ChefHat, label: 'Prepare' },
  { icon: PackageCheck, label: 'Fulfil' },
  { icon: MapPin, label: 'Track' },
]

export default function RestaurantShowcase() {
  return (
    <div className="sl-white-section relative min-h-screen overflow-hidden text-[var(--sl-ink)]">
      {/* Subtle top accent strip */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-gradient-to-r from-[var(--sl-oxblood)] via-[var(--sl-gold)] to-[var(--sl-teal-deep)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        {/* Back Link */}
        <FadeUp>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--sl-ink-soft)] transition-colors hover:text-[var(--sl-ink)]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Our Work
          </Link>
        </FadeUp>

        {/* ── Header ── */}
        <header className="mt-8 border-b border-[var(--sl-line)] pb-12">
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-2">
              <span className="sl-label text-[var(--sl-oxblood)] font-bold">Restaurants</span>
              <span className="text-[var(--sl-line)]">/</span>
              <span className="sl-label text-[var(--sl-charcoal)]">AURA</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-[var(--sl-ink)]">
              Digital experiences built around the restaurant.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--sl-ink-soft)] sm:text-lg">
              An example of how SaLira turns a real business workflow into connected software experiences.
            </p>
          </FadeUp>
        </header>

        {/* ── The Restaurant Workflow ── */}
        <section className="mt-16">
          <FadeUp>
            <p className="sl-label text-[var(--sl-oxblood)] font-bold">The Workflow</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
              From discovery to fulfilment.
            </h2>
          </FadeUp>

          <StaggerContainer
            staggerDelay={0.08}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {workflowSteps.map((step, i) => (
              <StaggerItem key={step.label}>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--sl-line)] bg-white shadow-sm transition-all duration-300 hover:border-[var(--sl-oxblood)]/30 hover:shadow-[0_8px_20px_rgba(198,71,43,0.1)] hover:-translate-y-0.5">
                      <step.icon size={18} className="text-[var(--sl-ink)]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-medium text-[var(--sl-charcoal)]">{step.label}</span>
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className="mb-6 h-px w-4 bg-[var(--sl-line)] sm:w-6" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Two Experiences Grid ── */}
        <section className="mt-20 grid gap-6 lg:grid-cols-2">
          {/* Guest Experience Card */}
          <FadeUp delay={0.1}>
            <div className="group flex h-full flex-col rounded-2xl border border-[rgba(198,71,43,0.15)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(198,71,43,0.3)] hover:shadow-[0_20px_50px_rgba(198,71,43,0.09)] sm:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-oxblood)] shadow-2xs">
                    <Smartphone size={20} strokeWidth={1.8} />
                  </span>
                  <span className="sl-label text-[var(--sl-oxblood)] font-bold">Guest Experience</span>
                </div>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                Customer Experience
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                A customer-facing digital experience for discovering the menu, customizing items, ordering and tracking fulfilment.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {[
                  'Browse the restaurant menu',
                  'Customize dishes to preference',
                  'Place an order for delivery or pickup',
                  'Track order status in real time',
                ].map((point) => (
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
                    <span>Open Customer Experience</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>

          {/* Restaurant Operations Card */}
          <FadeUp delay={0.2}>
            <div className="group flex h-full flex-col rounded-2xl border border-[var(--sl-line)] bg-[#FAFAF8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(92,101,117,0.3)] hover:shadow-[0_20px_50px_rgba(20,22,28,0.07)] sm:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-sand-deep)]/60 text-[var(--sl-ink)] shadow-2xs">
                    <MonitorCog size={20} strokeWidth={1.8} />
                  </span>
                  <span className="sl-label text-[var(--sl-charcoal)]">Restaurant Operations</span>
                </div>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                Operations Console
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                A business workspace for managing orders, menu availability, customers and restaurant activity.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {[
                  'Receive and manage orders',
                  'Manage the menu',
                  'Understand customers',
                  'Monitor the business',
                ].map((point) => (
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
                    <span>Open Restaurant Operations</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Note about live demo ── */}
        <FadeUp delay={0.3}>
          <div className="mt-16 rounded-2xl border border-[rgba(198,71,43,0.12)] bg-white/80 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm text-[var(--sl-ink-soft)]">
              <span className="font-semibold text-[var(--sl-ink)]">About this demonstration.</span>{' '}
              Both experiences are independent but connected. Place an order in the Customer Experience, and it appears in the Restaurant Operations console. This is how SaLira approaches restaurant software — understanding the full workflow, then building the digital experiences it requires.
            </p>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}






