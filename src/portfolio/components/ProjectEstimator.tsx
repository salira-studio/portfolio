import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Send,
  HelpCircle,
} from 'lucide-react'
import { MagneticButton } from './MagneticButton'

interface PlatformOption {
  id: string
  label: string
  desc: string
  baseCost: number
  weeks: number
  popular?: boolean
}

const PLATFORMS: PlatformOption[] = [
  {
    id: 'web',
    label: 'Web Application',
    desc: 'High-performance responsive web app or client portal',
    baseCost: 50000,
    weeks: 3,
  },
  {
    id: 'mobile',
    label: 'Mobile App (iOS + Android)',
    desc: 'Native-feel cross-platform mobile apps published to stores',
    baseCost: 120000,
    weeks: 6,
  },
  {
    id: 'ecosystem',
    label: 'Unified Ecosystem (Web + Mobile)',
    desc: 'Complete suite: customer apps, operations console, shared backend',
    baseCost: 220000,
    weeks: 10,
    popular: true,
  },
  {
    id: 'desktop',
    label: 'Desktop / Internal Tool',
    desc: 'High-density operational software for internal workstations',
    baseCost: 90000,
    weeks: 5,
  },
]

interface CapabilityOption {
  id: string
  label: string
  desc: string
  cost: number
  extraWeeks: number
}

const CAPABILITIES: CapabilityOption[] = [
  {
    id: 'realtime',
    label: 'Real-Time Sync & WebSockets',
    desc: 'Sub-20ms instant live state sync across all active screens',
    cost: 30000,
    extraWeeks: 1.5,
  },
  {
    id: 'payments',
    label: 'Payment Gateway Integration',
    desc: 'Razorpay, Stripe, UPI, automated invoicing & receipts',
    cost: 20000,
    extraWeeks: 1,
  },
  {
    id: 'admin',
    label: 'Custom Role-Based Admin Hub',
    desc: 'Granular permissions, staff management, audit logs',
    cost: 35000,
    extraWeeks: 2,
  },
  {
    id: 'notifications',
    label: 'Push & WhatsApp Automation',
    desc: 'Transactional WhatsApp updates, in-app notifications',
    cost: 15000,
    extraWeeks: 0.5,
  },
  {
    id: 'offline',
    label: 'Offline-First Data Engine',
    desc: 'Operate without internet, auto-sync when back online',
    cost: 35000,
    extraWeeks: 1.5,
  },
  {
    id: 'multitenant',
    label: 'Multi-Branch / Multi-Location',
    desc: 'Isolate or aggregate data across multiple outlets/teams',
    cost: 40000,
    extraWeeks: 2,
  },
]

export function ProjectEstimator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ecosystem')
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    'realtime',
    'payments',
    'admin',
  ])
  const [timelineMode, setTimelineMode] = useState<'standard' | 'sprint'>('standard')

  const toggleCapability = (id: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Calculate estimated investment and timeline
  const calculation = useMemo(() => {
    const platform = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0]
    let cost = platform.baseCost
    let weeks = platform.weeks

    selectedCapabilities.forEach((capId) => {
      const cap = CAPABILITIES.find((c) => c.id === capId)
      if (cap) {
        cost += cap.cost
        weeks += cap.extraWeeks
      }
    })

    if (timelineMode === 'sprint') {
      weeks = Math.max(3, Math.round(weeks * 0.7))
    } else {
      weeks = Math.round(weeks)
    }

    return {
      platform,
      totalCost: cost,
      formattedCost: `₹${cost.toLocaleString('en-IN')}`,
      weeks: `${weeks}–${weeks + 2} weeks`,
    }
  }, [selectedPlatform, selectedCapabilities, timelineMode])

  const generateWhatsAppLink = () => {
    const platformName = calculation.platform.label
    const capNames = selectedCapabilities
      .map((id) => CAPABILITIES.find((c) => c.id === id)?.label)
      .filter(Boolean)
      .join(', ')
    const text = `Hi SaLira Studio, I configured my project scope on your website:
• Platform: ${platformName}
• Capabilities: ${capNames || 'Core only'}
• Delivery Target: ${timelineMode === 'sprint' ? 'Accelerated Sprint' : 'Standard Delivery'} (~${calculation.weeks})
• Estimated Scope: ${calculation.formattedCost} onwards.

I would like to discuss this and get a formal proposal.`
    return `https://wa.me/917397430568?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="relative rounded-3xl border border-[var(--sl-line)] bg-white p-6 sm:p-10 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--sl-line-light)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--sl-gold)]">
            <Sparkles size={14} />
            <span>Interactive Scope Configurator</span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[var(--sl-ink)] sm:text-3xl">
            Configure Your Software Architecture
          </h3>
          <p className="mt-1 text-xs text-[var(--sl-ink-soft)] sm:text-sm">
            Select what you need. Get transparent scope, estimated timeline, and fixed milestone pricing.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-[var(--sl-sand-deep)]/40 p-1 border border-[var(--sl-line)] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setTimelineMode('standard')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timelineMode === 'standard'
                ? 'bg-white text-[var(--sl-ink)] shadow-xs'
                : 'text-[var(--sl-charcoal)] hover:text-[var(--sl-ink)]'
            }`}
          >
            Standard Delivery
          </button>
          <button
            onClick={() => setTimelineMode('sprint')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              timelineMode === 'sprint'
                ? 'bg-[var(--sl-gold)] text-white shadow-xs font-bold'
                : 'text-[var(--sl-charcoal)] hover:text-[var(--sl-ink)]'
            }`}
          >
            ⚡ Sprint Priority
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Toggles */}
        <div className="lg:col-span-7 space-y-7">
          {/* 1. Platform Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--sl-charcoal)] block mb-3">
              1. Select Platform Foundation
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {PLATFORMS.map((p) => {
                const active = selectedPlatform === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`group relative text-left rounded-2xl border p-4 transition-all duration-200 cursor-pointer ${
                      active
                        ? 'border-2 border-[var(--sl-gold)] bg-[var(--sl-sand-deep)]/20 shadow-sm'
                        : 'border-[var(--sl-line)] bg-white hover:border-[var(--sl-line-dark)] hover:bg-[var(--sl-paper-lifted)]'
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-[var(--sl-gold)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-2xs">
                        Most Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[var(--sl-ink)]">{p.label}</h4>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          active
                            ? 'border-[var(--sl-gold)] bg-[var(--sl-gold)] text-white'
                            : 'border-[var(--sl-line)]'
                        }`}
                      >
                        {active && <Check size={10} strokeWidth={3} />}
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] text-[var(--sl-ink-soft)] leading-relaxed">{p.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Key Capabilities */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--sl-charcoal)] block mb-3">
              2. Add Technical Capabilities
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {CAPABILITIES.map((cap) => {
                const checked = selectedCapabilities.includes(cap.id)
                return (
                  <div
                    key={cap.id}
                    onClick={() => toggleCapability(cap.id)}
                    className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all duration-150 ${
                      checked
                        ? 'border-[var(--sl-teal-deep)] bg-[rgba(46,111,94,0.04)] ring-1 ring-[var(--sl-teal-deep)]/20'
                        : 'border-[var(--sl-line-light)] bg-white hover:border-[var(--sl-line)]'
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4 w-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        checked
                          ? 'border-[var(--sl-teal-deep)] bg-[var(--sl-teal-deep)] text-white'
                          : 'border-[var(--sl-line)] bg-white'
                      }`}
                    >
                      {checked && <Check size={11} strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--sl-ink)]">{cap.label}</p>
                      <p className="text-[10px] text-[var(--sl-ink-soft)] leading-tight mt-0.5">{cap.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Scope Summary & Output */}
        <div className="lg:col-span-5">
          <motion.div
            layout
            className="sticky top-24 rounded-2xl border-2 border-[var(--sl-ink)] bg-[var(--sl-ink)] text-white p-6 sm:p-7 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                ESTIMATED SCOPE TIER
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Guaranteed Fixed Price
              </span>
            </div>

            {/* Price Calculation */}
            <div className="mt-5">
              <p className="text-[11px] font-mono text-[var(--sl-gold)] uppercase tracking-wider">
                Investment Starting From
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {calculation.formattedCost}
                </span>
                <span className="text-xs text-white/50 font-mono">+ taxes</span>
              </div>
              <p className="mt-1 text-xs text-white/60">
                Milestone-based delivery (Pay 30% start, balance on verified sprint milestones).
              </p>
            </div>

            {/* Timeline & Core Deliverables */}
            <div className="mt-6 space-y-3 rounded-xl bg-white/[0.06] p-4 border border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white/70">
                  <Clock size={14} className="text-[var(--sl-gold)]" />
                  Estimated Delivery:
                </span>
                <span className="font-bold text-white font-mono">{calculation.weeks}</span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-mono uppercase text-white/40">Included With Every Scope:</p>
                <div className="flex items-center gap-2 text-[11px] text-white/80">
                  <ShieldCheck size={13} className="text-[#10B981] shrink-0" />
                  <span>100% Full Source Code Ownership &amp; Git Repository</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-white/80">
                  <ShieldCheck size={13} className="text-[#10B981] shrink-0" />
                  <span>Free Post-Launch Maintenance &amp; Bug Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-white/80">
                  <ShieldCheck size={13} className="text-[#10B981] shrink-0" />
                  <span>Deployment on Your Cloud (AWS / Vercel / Railway)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              <MagneticButton strength={0.2} className="w-full">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sl-gold)] px-5 py-3.5 text-sm font-bold text-black shadow-md hover:bg-[#e0ab3b] transition-all"
                >
                  <Send size={15} />
                  <span>Send Scope via WhatsApp</span>
                </a>
              </MagneticButton>

              <a
                href="#contact"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>Or Request a Custom Architecture Review</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <p className="mt-4 text-center text-[10px] text-white/40 flex items-center justify-center gap-1">
              <HelpCircle size={11} />
              <span>Quotes are binding &amp; backed by formal statement of work.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
