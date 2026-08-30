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
} from 'lucide-react'
import { MagneticButton } from '../components/MagneticButton'
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ScrollReveal'

const CUSTOMER_BASE = '/work/travel/customer'
const ADMIN_BASE = '/work/travel/admin'

const workflowSteps = [
  { icon: Search,        label: 'Discover' },
  { icon: MapPin,        label: 'Explore' },
  { icon: Calendar,      label: 'Plan' },
  { icon: CreditCard,    label: 'Book' },
  { icon: Plane,         label: 'Travel' },
  { icon: Star,          label: 'Review' },
]

export default function TravelShowcase() {
  return (
    <div className="sl-white-section relative min-h-screen overflow-hidden text-[var(--sl-ink)]">
      {/* Top accent strip — blue/teal for travel */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-gradient-to-r from-[#3A7EFF] via-[#F4B942] to-[#2E6F5E]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">

        {/* Back */}
        <FadeUp>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--sl-ink-soft)] transition-colors hover:text-[var(--sl-ink)]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Our Work
          </Link>
        </FadeUp>

        {/* Header */}
        <header className="mt-8 border-b border-[var(--sl-line)] pb-12">
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-2">
              <span className="sl-label text-[#3A7EFF] font-bold">Travel Agency</span>
              <span className="text-[var(--sl-line)]">/</span>
              <span className="sl-label text-[var(--sl-charcoal)]">VoyageAI</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-[var(--sl-ink)]">
              Travel experiences, engineered end-to-end.
            </h1>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--sl-ink-soft)] sm:text-lg">
              A premium travel agency platform — a beautiful customer website backed by a powerful admin console. Changes made in admin reflect instantly on the customer site.
            </p>
          </FadeUp>
        </header>

        {/* Workflow */}
        <section className="mt-16">
          <FadeUp>
            <p className="sl-label text-[#3A7EFF] font-bold">The Journey</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
              From discovery to memories.
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--sl-line)] bg-white shadow-sm transition-all duration-300 hover:border-[#3A7EFF]/30 hover:shadow-[0_8px_20px_rgba(58,126,255,0.1)] hover:-translate-y-0.5">
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

        {/* Two Experiences */}
        <section className="mt-20 grid gap-6 lg:grid-cols-2">

          {/* Customer Website Card */}
          <FadeUp delay={0.1}>
            <div className="group flex h-full flex-col rounded-2xl border border-[rgba(58,126,255,0.18)] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(58,126,255,0.35)] hover:shadow-[0_20px_50px_rgba(58,126,255,0.1)] sm:p-10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(58,126,255,0.08)] text-[#3A7EFF] shadow-2xs">
                  <Globe size={20} strokeWidth={1.8} />
                </span>
                <span className="sl-label text-[#3A7EFF] font-bold">Customer Experience</span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                Travel Website
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                A warm, light premium website for browsing destinations, discovering packages, managing bookings and saving wishlist items.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {[
                  'Browse 15+ curated destinations',
                  'Explore and filter tour packages',
                  'Submit enquiries and get responses',
                  'Save packages to wishlist',
                  'View and manage bookings',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[var(--sl-ink-soft)]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3A7EFF]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--sl-line)] pt-6">
                <MagneticButton strength={0.25}>
                  <Link
                    to={CUSTOMER_BASE}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#3A7EFF] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#2563EB] hover:shadow-lg active:scale-98"
                  >
                    <span>Open Customer Website</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>

          {/* Admin Console Card */}
          <FadeUp delay={0.2}>
            <div className="group flex h-full flex-col rounded-2xl border border-[var(--sl-line)] bg-[#FAFAF8] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(92,101,117,0.3)] hover:shadow-[0_20px_50px_rgba(20,22,28,0.07)] sm:p-10">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sl-sand-deep)]/60 text-[var(--sl-ink)] shadow-2xs">
                  <LayoutDashboard size={20} strokeWidth={1.8} />
                </span>
                <span className="sl-label text-[var(--sl-charcoal)]">Agency Operations</span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
                Admin Console
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                A full-featured business workspace for managing the entire travel agency — packages, bookings, enquiries, customers and analytics.
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {[
                  'Manage packages & destinations',
                  'Track and update bookings',
                  'Respond to customer enquiries',
                  'View revenue analytics & charts',
                  'Changes reflect live on customer site',
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
                    to={ADMIN_BASE}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--sl-ink)] px-5 py-3 text-sm font-semibold text-[var(--sl-paper)] shadow-md transition-all hover:bg-black hover:shadow-lg active:scale-98"
                  >
                    <span>Open Admin Console</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* Note */}
        <FadeUp delay={0.3}>
          <div className="mt-16 rounded-2xl border border-[rgba(58,126,255,0.12)] bg-white/80 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm text-[var(--sl-ink-soft)]">
              <span className="font-semibold text-[var(--sl-ink)]">About this demonstration.</span>{' '}
              The customer website and admin console share the same data layer. Add a package in Admin, toggle it featured, or update a booking status — it reflects immediately on the customer-facing website. This is how SaLira builds travel platforms: one connected system, two tailored experiences.
            </p>
          </div>
        </FadeUp>

      </div>
    </div>
  )
}
