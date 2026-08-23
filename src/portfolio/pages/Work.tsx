import { Link } from 'react-router-dom'
import { ArrowUpRight, UtensilsCrossed, Sparkles } from 'lucide-react'
import { FadeUp } from '../components/ScrollReveal'

export default function Work() {
  return (
    <div className="relative overflow-hidden bg-[var(--sl-bg-work)] text-[var(--sl-ink)] min-h-[90vh]">
      {/* Background Ambient Atmosphere */}
      <div className="sl-hero-mesh" aria-hidden="true">
        <div className="sl-hero-glow-1" />
        <div className="sl-hero-glow-2" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {/* Header */}
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--sl-line)] bg-white/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sl-oxblood)] shadow-2xs">
            <Sparkles size={12} />
            Selected Case Studies
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-6xl">
            Working software, engineered per industry.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--sl-ink-soft)] sm:text-lg">
            Each project below is a full, interactive client-side application you can open and operate immediately.
          </p>
        </FadeUp>

        {/* Work Grid */}
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ── Restaurant / AURA (Featured) ── */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <Link
                to="/work/restaurants"
                data-cursor="view"
                data-cursor-text="AURA"
                className="group sl-card-highlight sl-card flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 block h-full"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--sl-accent-wash)] text-[var(--sl-oxblood)] shadow-2xs">
                        <UtensilsCrossed size={18} strokeWidth={1.8} />
                      </span>
                      <span className="sl-label text-[var(--sl-oxblood)] font-bold">
                        Restaurant Ecosystem
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(46,111,94,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--sl-teal-deep)] ring-1 ring-[rgba(46,111,94,0.25)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-deep)] animate-pulse" />
                      Live Demo Ready
                    </span>
                  </div>

                  <div className="mt-8">
                    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl text-[var(--sl-ink)]">
                      AURA
                    </h2>
                    <p className="mt-1 text-sm font-mono text-[var(--sl-charcoal)]">
                      Modern South Indian Kitchen — Chennai
                    </p>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[var(--sl-ink-soft)] sm:text-base">
                    A comprehensive two-sided digital platform: an intuitive guest PWA for browsing, customized ordering and real-time step tracking, integrated with an operations console for kitchen ticket management and spatial tables.
                  </p>
                </div>

                <div className="mt-10 border-t border-[var(--sl-line)] pt-6">
                  <div className="flex flex-wrap gap-2">
                    {['Customer PWA', 'Kitchen Operations', 'Spatial Tables', 'Live Cross-Tab Sync', 'TypeScript'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[var(--sl-sand-deep)]/40 px-3 py-1 text-xs font-mono text-[var(--sl-charcoal)] ring-1 ring-[var(--sl-line)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--sl-oxblood)] group-hover:text-[var(--sl-gold)] transition-colors inline-flex items-center gap-1.5">
                      Launch Case Study & Demos
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          </div>

          {/* ── Upcoming Verticals ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeUp delay={0.25} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--sl-line)] bg-white/70 p-8 sm:p-10 backdrop-blur-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="sl-label text-[var(--sl-charcoal)]">Upcoming Pipeline</span>
                    <span className="rounded-full bg-[rgba(169,160,138,0.15)] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[var(--sl-charcoal)] ring-1 ring-[rgba(169,160,138,0.35)]">
                      Q3 / Q4 Roadmap
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)]">
                    Healthcare · Retail · Logistics
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--sl-ink-soft)]">
                    New specialized industry templates are currently undergoing architecture design. Each vertical will launch with the same zero-mockup philosophy — fully functional client-side interactive suites.
                  </p>
                </div>

                <div className="mt-10 rounded-xl bg-[var(--sl-sand-deep)]/35 p-5 border border-[var(--sl-line)]">
                  <p className="text-xs font-semibold text-[var(--sl-ink)]">
                    Want your industry built next?
                  </p>
                  <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">
                    We take on select pilot partners for new vertical architectures.
                  </p>
                  <a
                    href="mailto:hello@salira.studio"
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--sl-oxblood)] hover:text-[var(--sl-gold)] transition-colors"
                  >
                    Pitch a vertical build
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  )
}
