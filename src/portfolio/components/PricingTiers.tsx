import { useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  KeyRound,
  Info,
  SlidersHorizontal,
  Terminal,
  Globe,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Cpu,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'
import {
  SERVICE_NAV as SERVICE_NAV_DATA,
  WEBSITE_TIERS,
  ECOMMERCE_TIERS,
  MOBILE_TIERS,
  SOFTWARE_TIERS,
  PLATFORM_TIERS,
  PRICE_FACTORS,
  PRICING_STEPS,
  PROJECT_FEE_COVERS,
  CLIENT_OWNED_SERVICES,
  ENGAGEMENT_MODELS,
  MAINTENANCE_PLANS,
  SERVICE_MAINTENANCE_NOTES,
} from '../data/pricingData'
import type { ServiceCategory, TierData } from '../data/pricingData'

/* ── Resolve icons for SERVICE_NAV ── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  website: Globe,
  ecommerce: ShoppingBag,
  mobile: Smartphone,
  software: LayoutDashboard,
  platform: Cpu,
}
const SERVICE_NAV = SERVICE_NAV_DATA.map(s => ({ ...s, icon: ICON_MAP[s.id] }))

/* ── Re-export for consumers ── */
export type { ServiceCategory, TierData }

/* ── Technical Datasheet Tier Card Component ── */
/* ── Spotlight Helpers ── */
const handleSpotlightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const { currentTarget, clientX, clientY } = e
  const rect = currentTarget.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top
  currentTarget.style.setProperty('--mouse-x', `${x}px`)
  currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

const getSpotlightColor = (id: string) => {
  const lower = id.toLowerCase()
  if (lower.includes('starter')) return 'rgba(46, 111, 94, 0.12)'
  if (lower.includes('standard')) return 'rgba(217, 164, 65, 0.15)'
  if (lower.includes('advanced')) return 'rgba(198, 71, 43, 0.15)'
  return 'rgba(198, 71, 43, 0.12)'
}

const getTopBorderClass = (id: string) => {
  const lower = id.toLowerCase()
  if (lower.includes('starter')) return 'border-t-teal-600'
  if (lower.includes('standard')) return 'border-t-amber-500'
  if (lower.includes('advanced')) return 'border-t-rose-600'
  return 'border-t-rose-600'
}

const getHoverBorderClass = (id: string) => {
  const lower = id.toLowerCase()
  if (lower.includes('starter')) return 'hover:border-teal-600/30 hover:shadow-[0_8px_30px_rgba(46,111,94,0.08)]'
  if (lower.includes('standard')) return 'hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(217,164,65,0.08)]'
  if (lower.includes('advanced')) return 'hover:border-rose-600/30 hover:shadow-[0_8px_30px_rgba(198,71,43,0.08)]'
  return 'hover:border-rose-600/30 hover:shadow-[0_8px_30px_rgba(198,71,43,0.08)]'
}

const getDotColor = (id: string) => {
  const lower = id.toLowerCase()
  if (lower.includes('starter')) return 'bg-teal-500'
  if (lower.includes('standard')) return 'bg-amber-500'
  if (lower.includes('advanced')) return 'bg-rose-500'
  return 'bg-rose-500'
}

const getCtaButtonClass = (id: string) => {
  const lower = id.toLowerCase()
  if (lower.includes('starter')) return 'bg-[#133026] hover:bg-[#1a4033] hover:shadow-[0_6px_20px_rgba(19,48,38,0.25)]'
  if (lower.includes('standard')) return 'bg-[#3a270f] hover:bg-[#4d3414] hover:shadow-[0_6px_20px_rgba(58,39,15,0.25)]'
  if (lower.includes('advanced')) return 'bg-[#38110b] hover:bg-[#4c170f] hover:shadow-[0_6px_20px_rgba(56,17,11,0.25)]'
  return 'bg-slate-900 hover:bg-slate-950 shadow-md'
}

const getPriceBoxClass = (id: string) => {
  const lower = id.toLowerCase()
  if (lower.includes('starter')) return 'from-teal-50/30 to-teal-500/5 border-teal-100/40'
  if (lower.includes('standard')) return 'from-amber-50/30 to-amber-500/5 border-amber-100/40'
  if (lower.includes('advanced')) return 'from-rose-50/30 to-rose-500/5 border-rose-100/40'
  return 'from-slate-50 to-slate-100 border-slate-200'
}

/* ── Technical Datasheet Tier Card Component ── */
function TechnicalDatasheetCard({
  tier,
  reduced,
}: {
  tier: TierData
  reduced: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const whatsappUrl = `https://wa.me/917397430568?text=${encodeURIComponent(tier.ctaMessage)}`
  const isHighlighted = tier.isHighlighted || tier.id.includes('standard')

  return (
    <div
      onMouseMove={handleSpotlightMouseMove}
      style={{
        '--spotlight-color': getSpotlightColor(tier.id),
      } as React.CSSProperties}
      className={`relative flex flex-col bg-white p-6 sm:p-7 border-t-[6px] border-x border-b border-slate-200/80 rounded-2xl shadow-xs transition-all duration-300 sl-grid-spotlight ${getTopBorderClass(
        tier.id
      )} ${getHoverBorderClass(tier.id)} ${
        isHighlighted
          ? 'ring-2 ring-amber-400/40 shadow-lg'
          : ''
      }`}
    >
      {tier.badgeText && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-sans text-[10px] font-extrabold uppercase tracking-wider shadow-sm ring-2 ring-white">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
            {tier.badgeText}
          </span>
        </div>
      )}

      {/* Main Card Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-400 font-mono text-[10px] tracking-wider font-semibold">{tier.tierCode}</span>
          <div className="flex items-center gap-1.5 font-sans text-xs text-slate-500">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Complexity</span>
            <div className="flex gap-1" aria-label={`Scope complexity: Level ${tier.complexityBars} of 3`}>
              {[1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className={`h-2 w-4 rounded-full transition-all duration-300 ${
                    bar <= tier.complexityBars
                      ? getDotColor(tier.id)
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tier Header */}
        <div className="mt-4">
          <h4 className="text-2xl font-extrabold font-display tracking-tight text-slate-900">
            {tier.name}
          </h4>
          <span className="block mt-1 font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400">
            {tier.buildType}
          </span>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-[3rem] font-sans">
            {tier.bestFor}
          </p>
        </div>

        {/* Price Specification (Anchor Element) */}
        <div className={`mt-6 py-5 px-5.5 rounded-2xl shadow-xs border bg-gradient-to-br ${getPriceBoxClass(tier.id)}`}>
          <div className="flex items-center justify-between">
            <div className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Fixed-scope pricing
            </div>
            <div className="font-mono text-[9.5px] text-slate-400 uppercase font-semibold">
              {tier.priceUnit}
            </div>
          </div>
          <div className="mt-2 font-display text-2.5xl sm:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {tier.priceRange}
          </div>
          {tier.typicalRange && (
            <div className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-800 bg-white/90 py-1.5 px-3 rounded-lg border border-slate-200/70 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
              <span>{tier.typicalRange}</span>
            </div>
          )}
          <div className="mt-3 pt-2.5 border-t border-slate-200/50 font-mono text-[9.5px] text-slate-500 uppercase tracking-wider font-semibold">
            Development fee only · Domain, hosting &amp; 3rd-party infra billed separately
          </div>
        </div>

        {/* Key Quantitative Data Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
          {tier.keySpecs.map((spec) => (
            <div key={spec.label} className="bg-slate-50/70 border border-slate-200/50 rounded-xl p-3 hover:bg-slate-100/50 transition-colors duration-200">
              <span className="font-sans text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                {spec.label}
              </span>
              <span className="font-display font-bold text-slate-900 text-[13px] block mt-1">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="mt-6">
          <MagneticButton strength={0.1} className="w-full">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full items-center justify-center gap-2 text-white font-sans text-xs font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-sm ${getCtaButtonClass(
                tier.id
              )}`}
            >
              <span>{tier.ctaText}</span>
              <ArrowRight size={13} />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Progressive Disclosure: Technical Specification Drawer */}
      <div className="mt-6 pt-3 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between font-sans text-xs font-semibold text-slate-700 hover:text-slate-950 py-1 transition-colors cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span className="flex items-center gap-1.5">
            <Terminal size={13} className="text-slate-400" />
            <span>{isExpanded ? 'Hide specifications' : 'View full scope & technical terms'}</span>
          </span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reduced ? {} : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-dashed border-slate-200 space-y-4 text-xs text-slate-600 font-sans">
                {/* 1. Design & Stack */}
                <div className="space-y-2">
                  {tier.design && (
                    <div>
                      <span className="font-sans text-[11px] font-semibold text-slate-500 block">
                        Design customization
                      </span>
                      <p className="mt-0.5 text-xs text-slate-800 leading-snug">
                        {tier.design}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="font-sans text-[11px] font-semibold text-slate-500 block">
                      Tech stack
                    </span>
                    <p className="mt-0.5 font-mono text-xs text-slate-900">
                      {tier.techStack}
                    </p>
                  </div>
                </div>

                {/* 2. Functionality Inclusions */}
                <div>
                  <span className="font-sans text-[11px] font-semibold text-slate-500 block mb-2">
                    Included functionality ({tier.functionality.length} items)
                  </span>
                  <ul className="space-y-1.5">
                    {tier.functionality.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <Check size={13} className="text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Revisions, Warranty & Delivery Terms */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-[115px_1fr] items-baseline gap-2">
                      <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">
                        Revision rounds:
                      </span>
                      <span className="text-slate-900 font-mono font-semibold text-xs">
                        {tier.revisions}
                      </span>
                    </div>

                    <div className="grid grid-cols-[115px_1fr] items-baseline gap-2">
                      <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">
                        Delivery timeline:
                      </span>
                      <span className="text-slate-900 font-mono font-semibold text-xs">
                        {tier.timeline}
                      </span>
                    </div>

                    <div className="grid grid-cols-[115px_1fr] items-baseline gap-2">
                      <span className="text-slate-500 font-medium text-[11px] whitespace-nowrap">
                        Bug-fix support:
                      </span>
                      <span className="text-slate-900 font-mono font-semibold text-xs leading-snug">
                        {tier.postLaunchSupport}
                      </span>
                    </div>
                  </div>

                  {/* Full-width Scope & Ownership rows */}
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">
                        Scope &amp; operations terms:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {tier.contentResponsibility}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50/80 p-2.5 border border-slate-200/60 flex items-start gap-2 text-xs text-slate-800 font-medium">
                      <KeyRound size={13} className="text-teal-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{tier.ownership}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Maintenance & Support Inline Component ── */
function MaintenanceSectionInline({ activeService }: { activeService: ServiceCategory }) {
  const [isAnnual, setIsAnnual] = useState(false)
  const activeNote = SERVICE_MAINTENANCE_NOTES[activeService]

  return (
    <div className="mt-20 sm:mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
          Maintenance &amp; Support
        </h3>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans max-w-xl mx-auto">
          Optional ongoing support for projects that require continuous technical care.
          Not every project requires a maintenance plan — static websites may need little or none,
          while e-commerce stores, mobile apps, API-heavy systems and business software benefit significantly.
        </p>
      </div>

      {/* Dynamic Recommendation for Active Service */}
      {activeNote && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-sans text-xs text-slate-700 max-w-2xl mx-auto flex items-start gap-2.5 shadow-2xs">
          <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-900">Recommended for {activeNote.label}:</span>{' '}
            {activeNote.note}{' '}
            <span className="font-semibold text-teal-700">({activeNote.plans})</span>
          </p>
        </div>
      )}

      {/* Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 gap-1 shadow-sm">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 rounded-full font-sans text-xs font-semibold transition-all duration-200 cursor-pointer ${
              !isAnnual
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2 rounded-full font-sans text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isAnnual
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Annual — Save
          </button>
        </div>
      </div>

      {isAnnual && (
        <p className="text-center text-[10px] font-mono text-teal-700 uppercase tracking-wider mb-6">
          Annual plans offer savings compared with monthly billing.
        </p>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {MAINTENANCE_PLANS.map((plan) => (
          <div
            key={plan.title}
            className={`bg-white border-x border-b border-slate-200/80 border-t-4 ${plan.borderColor} rounded-2xl p-5 shadow-xs flex flex-col gap-3 hover:shadow-md transition-all duration-200`}
          >
            <div>
              <h4 className="font-sans text-sm font-bold text-slate-900">{plan.title}</h4>
              <p className="mt-1 font-sans text-[10px] text-slate-500 leading-snug">{plan.bestFor}</p>
            </div>

            <div>
              <span className="font-display text-xl font-extrabold text-slate-950 tracking-tight">
                {isAnnual ? plan.annual : plan.monthly}
              </span>
              <span className="font-mono text-[9px] text-slate-400 ml-1.5 uppercase tracking-wider">
                {plan.annual === 'Custom pricing' ? '' : isAnnual ? '/ year' : '/ month'}
              </span>
            </div>

            <ul className="space-y-1.5 flex-1">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-[10px] text-slate-600 font-sans leading-snug">
                  <Check size={11} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/917397430568?text=${encodeURIComponent(`Hi SaLira Studio, I'm interested in the ${plan.title} maintenance plan.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-black text-white font-sans text-[10px] font-bold py-2.5 px-3 rounded-xl transition-colors duration-200 shadow-sm"
            >
              <span>Enquire</span>
              <ArrowRight size={10} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main PricingTiers Component ── */
export function PricingTiers() {
  const [activeService, setActiveService] = useState<ServiceCategory>('website')
  const reduced = usePrefersReducedMotion()

  return (
    <div className="w-full font-sans text-slate-900">
      {/* ── Persistent Studio Notice (Engineering Positioning) ── */}
      <div className="mx-auto max-w-3xl mb-8">
        <div className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-center font-sans text-xs text-slate-500 shadow-xs max-w-max mx-auto">
          <Info size={14} className="text-slate-400 shrink-0" />
          <span>
            Development fee only — domain, hosting, servers &amp; 3rd-party infrastructure are billed directly by their providers, not included here.
          </span>
        </div>
      </div>

      {/* ── Service Selector Matrix ── */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <div className="inline-flex max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm backdrop-blur-md">
            {SERVICE_NAV.map((service) => {
              const isActive = activeService === service.id
              const Icon = service.icon
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(service.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-sm scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-teal-400' : 'text-slate-400'} />
                  <span>{service.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Content View: Website Development 3-Tier Grid (SRV-01) ── */}
      {activeService === 'website' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-slate-950">
              Website Development Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Scope-first tier comparison with fixed page bounds, explicit add-on rates, and defined deliverables.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 pt-3 items-stretch">
            {WEBSITE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          {/* Infrastructure note */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">Additional infrastructure — billed separately at provider rates:</span>{' '}
                Domain registration, web hosting, SSL, and any third-party integrations are billed directly by the respective providers. We assist with setup and configuration; accounts remain under your ownership.
                <span className="ml-1.5 font-mono text-[9px] text-teal-700 uppercase tracking-wider">No markups.</span>
              </p>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-4 font-sans text-xs text-slate-800 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 font-semibold mr-2">Payment terms:</span>
                <span className="text-slate-800">
                  50% to begin, 50% on completion. Milestone-based billing available for Advanced-tier projects.
                </span>
              </div>
              <a
                href="https://wa.me/917397430568?text=Hi%20SaLira%20Studio%2C%20I%20have%20questions%20about%20your%20website%20development%20pricing%20and%20milestones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Ask about milestones</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Content View: E-Commerce Development 3-Tier Grid (SRV-02) ── */}
      {activeService === 'ecommerce' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-slate-950">
              E-Commerce Development Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Templated, semi-custom, and headless e-commerce store tiers with defined catalog limits and payment integration.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 pt-3 items-stretch">
            {ECOMMERCE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          {/* Infrastructure note */}
          <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 font-sans text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <Info size={13} className="text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-relaxed space-y-1.5">
                <p>
                  <span className="font-semibold text-slate-800">Platform subscription — billed directly by Shopify or WordPress.com:</span>{' '}
                  Shopify Basic starts at ₹1,499/month; WooCommerce hosting typically ₹2,000–₹15,000/year. Payment gateway transaction fees and app subscriptions are charged directly by those providers.
                </p>
                <p className="text-slate-500">
                  Domain, hosting, payment gateway, and third-party tools are set up under your ownership with zero vendor lock-in.
                  <span className="ml-1.5 font-mono text-[9px] text-teal-700 uppercase tracking-wider">No markups.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-4 font-sans text-xs text-slate-800 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 font-semibold mr-2">Payment terms:</span>
                <span className="text-slate-800">
                  50% to begin, 50% on completion. Milestone-based billing available for Advanced-tier projects.
                </span>
              </div>
              <a
                href="https://wa.me/917397430568?text=Hi%20SaLira%20Studio%2C%20I%20have%20questions%20about%20your%20ecommerce%20development%20pricing%20and%20milestones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Ask about milestones</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Content View: Mobile App Development 3-Tier Grid (SRV-03) ── */}
      {activeService === 'mobile' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-slate-950">
              Mobile App Development Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Cross-platform and custom native mobile application tiers with explicit screen bounds and milestone billing.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 pt-3 items-stretch">
            {MOBILE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          {/* Infrastructure note */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">Additional infrastructure — billed directly by providers:</span>{' '}
                Apple Developer Program ($99/yr to Apple), Google Play Developer ($25 one-time to Google), cloud backend servers (AWS / GCP / DigitalOcean) and paid API usage are billed to accounts registered in your name.
                <span className="ml-1.5 font-mono text-[9px] text-teal-700 uppercase tracking-wider">No markups.</span>
              </p>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-4 font-sans text-xs text-slate-800 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 font-semibold mr-2">Payment terms:</span>
                <span className="text-slate-800">
                  Billed across agreed sprint milestones (e.g. 30% kickoff, 40% functional test build, 30% launch &amp; store handover).
                </span>
              </div>
              <a
                href="https://wa.me/917397430568?text=Hi%20SaLira%20Studio%2C%20I%20have%20questions%20about%20your%20mobile%20app%20development%20pricing%20and%20milestones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Ask about milestones</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Content View: Business Software & Ops Portals 3-Tier Grid (SRV-04) ── */}
      {activeService === 'software' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-slate-950">
              Business Software &amp; Ops Portals Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Custom internal tools, workflow automation, and operations platforms engineered around your company's daily processes.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 pt-3 items-stretch">
            {SOFTWARE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          {/* Infrastructure note */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">Additional infrastructure — billed directly by providers:</span>{' '}
                Cloud infrastructure (AWS / GCP / DigitalOcean / Supabase), transactional email, WhatsApp Business API usage, and corporate SaaS subscriptions are charged by the respective providers to accounts set up in your name.
                <span className="ml-1.5 font-mono text-[9px] text-teal-700 uppercase tracking-wider">No markups.</span>
              </p>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-4 font-sans text-xs text-slate-800 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 font-semibold mr-2">Payment terms:</span>
                <span className="text-slate-800">
                  Billed across structured sprint milestones with functional acceptance criteria (e.g. 25% architecture &amp; DB schema, 35% core workflow build, 25% integration &amp; QA, 15% handover).
                </span>
              </div>
              <a
                href="https://wa.me/917397430568?text=Hi%20SaLira%20Studio%2C%20I%20have%20questions%20about%20your%20business%20software%20pricing%20and%20milestones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Ask about milestones</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Content View: Custom Platform & Multi-Sided Systems 3-Tier Grid (SRV-05) ── */}
      {activeService === 'platform' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-slate-950">
              Custom Platform &amp; Multi-Sided Systems Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Multi-role marketplaces, multi-vendor ecosystems, and high-concurrency platforms delivered through structured engineering sprints.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 pt-3 items-stretch">
            {PLATFORM_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          {/* Infrastructure note */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">Additional infrastructure — billed directly by providers:</span>{' '}
                Scalable cloud hosting (AWS / GCP / Cloudflare), database clusters, KYC / verification APIs, and payment gateway escrow/split processing fees are charged at provider rates. All infrastructure accounts are configured under your direct ownership.
                <span className="ml-1.5 font-mono text-[9px] text-teal-700 uppercase tracking-wider">No markups.</span>
              </p>
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-4 font-sans text-xs text-slate-800 rounded-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 font-semibold mr-2">Payment terms:</span>
                <span className="text-slate-800">
                  Delivered via phased sprint releases following an initial architecture discovery sprint. 100% credited toward production build upon contract approval.
                </span>
              </div>
              <a
                href="https://wa.me/917397430568?text=Hi%20SaLira%20Studio%2C%20I%20have%20questions%20about%20your%20custom%20platform%20pricing%20and%20milestones."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:underline shrink-0 text-xs"
              >
                <span>Ask about milestones</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Why Does the Price Change? (Technical Studio Perspective) ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-950">
            Why does software pricing vary?
          </h3>
          <p className="mt-2 font-mono text-xs text-slate-600 leading-relaxed">
            PRICE = f(FUNCTIONALITY, DATA_SCHEMA, USER_ROLES, INTEGRATIONS, LATENCY_SLAs)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICE_FACTORS.map((factor) => (
            <div
              key={factor.code}
              onMouseMove={handleSpotlightMouseMove}
              style={{ '--spotlight-color': 'rgba(217, 164, 65, 0.12)' } as React.CSSProperties}
              className="bg-white p-5 sm:p-6 border border-slate-200/80 rounded-2xl shadow-xs transition-all duration-300 sl-grid-spotlight hover:border-amber-500/20 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="font-bold text-slate-400">FACTOR-{factor.code}</span>
                <SlidersHorizontal size={13} className="text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-sans">
                {factor.title}
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-sans">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── How We Arrive at Your Fixed Quote ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
            How we arrive at your quote
          </h3>
          <p className="mt-2 font-mono text-xs text-slate-600">
            A 5-STAGE SCOPE EXTRACTION METHODOLOGY
          </p>
        </div>

        <div className="max-w-3xl mx-auto border border-slate-300 bg-slate-200 divide-y divide-slate-200">
          {PRICING_STEPS.map((step) => (
            <div
              key={step.step}
              className="flex items-start gap-4 bg-white p-4 sm:p-5 font-sans"
            >
              <span className="font-mono text-xs font-bold text-slate-400 shrink-0 w-8 pt-0.5">
                [{step.step}]
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Studio Fee vs Third-Party Costs ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
            Studio Fee vs. Third-Party Direct Costs
          </h3>
          <p className="mt-2 font-mono text-xs text-slate-600 max-w-2xl mx-auto">
            100% TRANSPARENT BILLING BOUNDARIES // ZERO MARKUP ON EXTERNAL ACCOUNTS
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* SaLira Studio Fee */}
          <div className="border-2 border-slate-900 bg-white p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h4 className="font-sans text-base font-bold text-slate-950">
                Included in Studio Fee
              </h4>
              <span className="font-mono text-[11px] text-slate-500 font-semibold">
                OUR ENGINEERING
              </span>
            </div>
            <div className="space-y-2.5 font-sans">
              {PROJECT_FEE_COVERS.map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <Check size={13} className="text-teal-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900">{item.label}: </span>
                    <span className="text-slate-600">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client-Owned Direct Accounts */}
          <div className="border border-slate-300 bg-slate-50 p-6 sm:p-7 font-sans">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h4 className="font-sans text-base font-bold text-slate-950">
                Client Direct Accounts
              </h4>
              <span className="font-mono text-[11px] text-slate-500 font-semibold">
                PAID TO PROVIDER
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Accounts are created under your ownership. We guide setup and configure credentials with zero vendor lock-in.
            </p>
            <div className="space-y-2.5 font-mono text-xs">
              {CLIENT_OWNED_SERVICES.map((service) => (
                <div key={service.item} className="flex items-baseline justify-between gap-2 border-b border-slate-200/60 pb-1.5 last:border-b-0">
                  <span className="text-slate-800 text-[11px] font-sans">{service.item}</span>
                  <span className="text-slate-500 text-[10px] shrink-0 text-right">{service.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Code Ownership Guarantee ── */}
      <div className="mt-20 sm:mt-24 border border-slate-300 bg-white p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl">
          <div className="font-sans text-xs font-semibold text-slate-500 mb-2">
            Zero vendor lock-in guarantee
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
            You own 100% of what we build.
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            At project completion, we hand over full source code Git repositories, production credentials, and architectural documentation. No monthly platform rent, no proprietary lock-in, and no hidden dependencies. Any qualified engineer can maintain or extend the codebase.
          </p>
        </div>
      </div>

      {/* ── Engagement Models ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
            Collaboration &amp; Engagement Models
          </h3>
          <p className="mt-2 font-mono text-xs text-slate-600">
            SELECT AN ENGAGEMENT STRUCTURE FIT FOR YOUR TIMELINE
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.code}
              onMouseMove={handleSpotlightMouseMove}
              style={{
                '--spotlight-color':
                  model.code === 'MOD-01'
                    ? 'rgba(46, 111, 94, 0.12)'
                    : model.code === 'MOD-02'
                    ? 'rgba(217, 164, 65, 0.12)'
                    : 'rgba(198, 71, 43, 0.12)',
              } as React.CSSProperties}
              className={`bg-white p-6 border border-slate-200/80 rounded-2xl shadow-xs flex flex-col justify-between transition-all duration-300 sl-grid-spotlight ${
                model.code === 'MOD-01'
                  ? 'hover:border-teal-600/30'
                  : model.code === 'MOD-02'
                  ? 'hover:border-amber-500/30'
                  : 'hover:border-rose-600/30'
              }`}
            >
              <div>
                <div className="font-mono text-[10px] font-bold text-slate-400">
                  {model.code}
                </div>
                <h4 className="text-lg font-bold font-sans text-slate-950 mt-1">
                  {model.name}
                </h4>
                <p className="mt-1 font-mono text-[10px] text-slate-500 font-semibold">
                  {model.tagline}
                </p>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans">
                  {model.description}
                </p>

                <div className="my-4 border-t border-slate-200" />

                <div className="space-y-2 font-sans">
                  {model.includes.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check size={12} className="text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {model.note && (
                <p className="mt-4 font-sans text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                  {model.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* ── Additional Infrastructure Section ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
            Additional Infrastructure
          </h3>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans max-w-xl mx-auto">
            Third‑party infrastructure is billed separately based on your project's actual requirements.
            Domain, server/cloud hosting, paid APIs and other third‑party services are billed at actual
            provider rates. We assist with setup and integration, while the accounts remain under your ownership.
          </p>
          <p className="mt-1 text-[10px] font-mono font-semibold text-teal-700 uppercase tracking-wider">
            No hidden infrastructure markups.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Domain', note: 'Paid separately at registrar rates' },
            { label: 'Server / Cloud Hosting', note: 'Based on project requirements' },
            { label: 'Database / Storage', note: 'Based on usage & provider' },
            { label: 'APIs & Third‑Party Services', note: 'Based on provider and usage' },
            { label: 'Payment Gateway', note: 'Provider transaction charges apply' },
            { label: 'Email / SMS / Other Services', note: 'Based on usage' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white border border-slate-200/70 rounded-xl p-4 flex flex-col gap-1 shadow-xs hover:border-slate-300 transition-colors duration-200"
            >
              <span className="font-sans text-[11px] font-bold text-slate-900">{item.label}</span>
              <span className="font-sans text-[10px] text-slate-500">{item.note}</span>
            </div>
          ))}
        </div>

        <p className="text-center mt-4 text-[10px] font-mono text-slate-400">
          Actual infrastructure costs vary by provider, traffic, storage, API usage and project requirements.
        </p>
      </div>

      {/* ── Maintenance & Support Section ── */}
      <MaintenanceSectionInline activeService={activeService} />

      {/* ── Final Discussion CTA ── */}

      <div className="mt-20 sm:mt-24 text-center border border-slate-300 bg-slate-50 p-8 sm:p-12">
        <div className="font-sans text-xs text-slate-500 font-semibold mb-2">
          Direct engineering inquiry
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
          Need a precise fixed quote for your build?
        </h3>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-sans">
          Tell us about your business process, existing systems, and what needs to be engineered. We will return an explicit technical scope and milestone quote.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <MagneticButton strength={0.15}>
            <a
              href={`https://wa.me/917397430568?text=${encodeURIComponent('Hi SaLira Studio, I want to discuss a project scope for an engineering quote.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white font-sans text-xs font-bold py-3.5 px-7 rounded-xs transition-colors shadow-xs"
            >
              <span>Discuss Scope with an Engineer</span>
              <ArrowRight size={13} />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.1}>
            <a
              href="/work"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-700 hover:text-slate-950 px-4 py-3.5"
            >
              <span>View technical case studies</span>
              <ArrowRight size={12} className="text-slate-400" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
