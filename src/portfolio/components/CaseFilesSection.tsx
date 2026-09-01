import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  UtensilsCrossed,
  Plane,
  ArrowRight,
  ArrowUpRight,
  Lock,
  Sparkles,
} from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface DemoCardProps {
  demoId: string
  folderCode: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  theScenario: string
  theApproach: string
  techStack: string[]
  primaryDemoUrl: string
  customerAppUrl: string
  adminAppUrl?: string
  adminAppLabel?: string
  tiltDirection: number // -1 for left tilt, 1 for right tilt
}

function DemoCard({
  demoId,
  folderCode,
  title,
  subtitle,
  description,
  icon,
  theScenario,
  theApproach,
  techStack,
  primaryDemoUrl,
  customerAppUrl,
  adminAppUrl,
  adminAppLabel,
  tiltDirection,
}: DemoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  // Independent scroll intersection trigger for each individual card
  const isInView = useInView(cardRef, {
    once: true,
    margin: '-80px 0px -40px 0px',
    amount: 0.15,
  })

  // Landing animation parameters: physical drop with slight rotation and weighted settle
  const initialRotate = tiltDirection * 1.5
  const initialY = -28

  return (
    <div ref={cardRef} className="relative w-full">
      {/* Physical Folder Tab on Top */}
      <div className="flex items-center justify-between px-2 sm:px-4">
        <div className="inline-flex items-center gap-2 rounded-t-md border-t border-x border-[#D8D2C3] bg-[#F7F3EB] px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-[#6B6860]">
          <span className="text-[#1C1B19]">{folderCode}</span>
          <span className="text-[#A39E93]">/</span>
          <span className="text-[9px] uppercase text-[#7A5F46]">{title}</span>
        </div>
        <div className="flex items-center gap-2 pb-1 font-mono text-[9px] text-[#8C877C]">
          <span className="hidden sm:inline">REF: {demoId}</span>
          <span className="rounded border border-[#D8D2C3] bg-[#EDE8DC] px-1.5 py-0.5 text-[8px] font-semibold text-[#1C1B19]">
            FRONTEND DEMO
          </span>
        </div>
      </div>

      {/* Main Physical Case File Body */}
      <motion.article
        aria-label={`Demo Application: ${title}`}
        initial={
          prefersReduced
            ? { opacity: 1, y: 0, rotate: 0 }
            : { opacity: 0, y: initialY, rotate: initialRotate }
        }
        animate={
          isInView || prefersReduced
            ? { opacity: 1, y: 0, rotate: 0 }
            : { opacity: 0, y: initialY, rotate: initialRotate }
        }
        transition={
          prefersReduced
            ? { duration: 0 }
            : {
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1], // Physical weighted landing curve
              }
        }
        className="group relative flex flex-col justify-between rounded-lg border border-[#D8D2C3] bg-[#FCFAF6] p-5 sm:p-7 md:p-8 shadow-[0_8px_24px_rgba(28,27,25,0.06),0_1px_3px_rgba(28,27,25,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(28,27,25,0.09)]"
        style={{
          transformOrigin: tiltDirection > 0 ? 'top right' : 'top left',
        }}
      >
        {/* Physical Paper Watermark / Grid Background Texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.035] mix-blend-multiply select-none"
          style={{
            backgroundImage: `radial-gradient(#1C1B19 0.75px, transparent 0.75px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* ── Unsealing Tape / Physical Seal Strip Across Card Header ── */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1, scaleX: 1, scaleY: 1 }}
            animate={
              isInView
                ? {
                    opacity: [1, 1, 0.9, 0],
                    scaleX: [1, 1, 0.85, 0],
                    y: [0, 0, -4, -10],
                  }
                : { opacity: 1, scaleX: 1 }
            }
            transition={{
              duration: 0.32,
              delay: 0.38, // Trigger unseal immediately after card lands
              times: [0, 0.15, 0.7, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: tiltDirection > 0 ? 'left center' : 'right center' }}
            className="pointer-events-none absolute top-3 sm:top-4 left-4 right-4 z-30 flex items-center justify-between rounded bg-[#E4DDD0]/95 border border-[#CEC4B0] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#5C4532] shadow-xs backdrop-blur-xs"
          >
            <div className="flex items-center gap-1.5">
              <Lock size={10} className="text-[#7A5F46]" />
              <span className="font-bold">SAMPLE BUILD SPECIFICATION</span>
            </div>
            <span className="text-[8px] text-[#8B7355]">OPENING...</span>
          </motion.div>
        )}

        <div>
          {/* Card Header: Application Tag & Interactive Demo Badge */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={isInView || prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.35, delay: 0.35 }}
            className="flex items-center justify-between border-b border-[#E7E2D6] pb-3.5"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[#EDE8DC] text-[#1C1B19] shadow-2xs">
                {icon}
              </span>
              <div>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#1C1B19]">
                  {title}
                </span>
                <span className="block font-mono text-[9px] uppercase text-[#78716C]">
                  {subtitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded border border-[#D5CEBF] bg-[#EDE8DC] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#44403C]">
              <Sparkles size={10} className="text-[#A44A24]" />
              <span>Interactive Demo</span>
            </div>
          </motion.div>

          {/* Headline & Narrative Summary */}
          <motion.div
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.35, delay: 0.4 }}
            className="mt-4"
          >
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1C1B19] leading-snug">
              {subtitle}
            </h3>
            <p className="mt-2 font-manifesto-sans text-xs sm:text-sm leading-relaxed text-[#5C5952]">
              {description}
            </p>
          </motion.div>

          {/* ── Internal Content Reveal (Staggered Unfold: SCENARIO & APPROACH) ── */}
          <div className="mt-5 space-y-2.5 font-mono text-xs">
            {/* 1. THE SCENARIO */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.35, delay: 0.48 }}
              className="rounded border border-[#E0D9CB] bg-[#F2EDE2] p-3 sm:p-3.5"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#6B6860]">
                  THE SCENARIO:
                </span>
              </div>
              <p className="mt-1 font-manifesto-sans text-xs sm:text-[13px] font-medium leading-relaxed text-[#1C1B19]">
                {theScenario}
              </p>
            </motion.div>

            {/* 2. THE APPROACH */}
            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.35, delay: 0.58 }}
              className="rounded border border-[#CAD4D9] bg-[#F1F6F8] p-3 sm:p-3.5"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#0A3D62]">
                  THE APPROACH:
                </span>
              </div>
              <p className="mt-1 font-manifesto-sans text-xs sm:text-[13px] font-medium leading-relaxed text-[#1C1B19]">
                {theApproach}
              </p>
            </motion.div>
          </div>

          {/* ── Factual Tech Stack Chips & Scope Clarification ── */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={isInView || prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.35, delay: 0.66 }}
            className="mt-4 border-t border-[#E7E2D6] pt-3"
          >
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px]">
              <span className="text-[#78716C] uppercase font-semibold mr-1">STACK:</span>
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded border border-[#D8D2C3] bg-[#EDE8DC] px-2 py-0.5 text-[#44403C]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-2 font-mono text-[10px] text-[#8C877C] leading-normal">
              Demo scope: frontend only — backend/database work is part of full engagements, not shown here.
            </p>
          </motion.div>
        </div>

        {/* ── Interactive CTAs (Vermilion strictly reserved for Primary Action) ── */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.35, delay: 0.74 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E7E2D6] pt-4"
        >
          {/* Primary CTA: Reserved Solid Vermilion Button */}
          <Link
            to={primaryDemoUrl}
            className="inline-flex items-center gap-2 bg-[#E8452C] hover:bg-[#C4451C] active:bg-[#B03B15] text-white px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-150 rounded-none select-none cursor-pointer"
            data-draft-target={`${title} Demo Overview`}
          >
            <span>Try the demo</span>
            <ArrowRight size={13} />
          </Link>

          {/* Secondary Direct Demo Links */}
          <div className="flex items-center gap-2">
            <Link
              to={customerAppUrl}
              className="inline-flex items-center gap-1.5 border border-[#D5CEBF] bg-[#EDE8DC] hover:bg-[#E3DCCE] hover:border-[#1C1B19] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1C1B19] transition-colors rounded-none"
              data-draft-target={`${title} Customer View`}
            >
              <span>Guest App</span>
              <ArrowUpRight size={12} className="text-[#6B6860]" />
            </Link>

            {adminAppUrl && adminAppLabel && (
              <Link
                to={adminAppUrl}
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#D5CEBF] bg-[#EDE8DC] hover:bg-[#E3DCCE] hover:border-[#1C1B19] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1C1B19] transition-colors rounded-none"
                data-draft-target={`${title} Admin View`}
              >
                <span>{adminAppLabel}</span>
                <ArrowUpRight size={12} className="text-[#6B6860]" />
              </Link>
            )}
          </div>
        </motion.div>
      </motion.article>
    </div>
  )
}

export function CaseFilesSection() {
  const prefersReduced = usePrefersReducedMotion()

  return (
    <section
      id="case-studies"
      aria-label="Working Demos & Sample Applications"
      className="relative isolate w-full bg-[#EDE8DC] px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 overflow-hidden text-[#1C1B19]"
    >
      {/* ── Continuous Background Texture (Zero Seam with Hero Daylight State) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none opacity-[0.065] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section Header Bar: Clean & Minimal (No Sheet Numbers or Coordinates) ── */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center justify-between border-b border-[#D8D2C3] pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B6860]"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1C1B19]" />
            <span className="font-bold text-[#1C1B19]">INTERACTIVE DEMO ENVIRONMENTS</span>
          </div>

          <span className="text-[9px] text-[#78716C]">
            REACT 19 · TYPESCRIPT · NO SIGNUP REQUIRED
          </span>
        </motion.div>

        {/* ── Section Headline & Narrative Introduction ── */}
        {/* Fades and settles in a single calm motion (~450ms) as it enters viewport */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <h2 className="font-typewriter text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.12] tracking-tight text-[#1C1B19]">
            Try Before You Ask.
          </h2>
          <p className="mt-4 font-manifesto-sans text-base sm:text-lg leading-relaxed text-[#5C5952]">
            Explore fully interactive sample builds — no login required. These are demo environments; real engagements include the backend, database, and infrastructure work behind them.
          </p>
        </motion.div>

        {/* ── Physical Demo Cards Grid: Staggered Scroll Triggers ── */}
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Demo Card 01: AURA Restaurant Ordering & Kitchen Display */}
          <DemoCard
            demoId="DEMO-01 // AURA"
            folderCode="DEMO 01"
            title="AURA Restaurant Ecosystem"
            subtitle="Guest Ordering & Kitchen Display Console"
            description="Two-sided restaurant ordering application demonstrating customer item customization, table selection, and live kitchen dispatch."
            icon={<UtensilsCrossed size={18} className="text-[#1C1B19]" />}
            theScenario="Illustrates how a restaurant can provide customers with a swift mobile ordering interface while dispatching tickets to a separate kitchen tablet screen without third-party fees."
            theApproach="Engineered with React 19, TypeScript, and cross-tab state synchronization. Guests configure dishes and submit orders, while the kitchen console receives tickets live."
            techStack={['React 19', 'TypeScript', 'Cross-Tab Sync', 'Tailwind CSS']}
            primaryDemoUrl="/work/restaurants"
            customerAppUrl="/work/restaurants/customer"
            adminAppUrl="/work/restaurants/kitchen"
            adminAppLabel="Kitchen Display"
            tiltDirection={-1}
          />

          {/* Demo Card 02: VoyageAI Travel Platform */}
          <DemoCard
            demoId="DEMO-02 // VOYAGE"
            folderCode="DEMO 02"
            title="VoyageAI Travel Platform"
            subtitle="Destination Explorer & Agency Proposal Portal"
            description="Bespoke travel exploration interface demonstrating destination discovery, interactive wishlist assembly, and instant quote generation."
            icon={<Plane size={18} className="text-[#1C1B19]" />}
            theScenario="Illustrates how a bespoke travel agency can replace static PDF itineraries with an interactive destination builder that streamlines client inquiries into actionable trips."
            theApproach="Engineered with React 19, TypeScript, and client-side itinerary state. Users browse curated journeys, add activities to a live trip wishlist, and generate instant trip quotes."
            techStack={['React 19', 'TypeScript', 'Itinerary State', 'Dark Mode UI']}
            primaryDemoUrl="/work/travel"
            customerAppUrl="/work/travel/customer"
            adminAppUrl="/work/travel/agent"
            adminAppLabel="Agency View"
            tiltDirection={1}
          />
        </div>

        {/* ── Section Technical Footer Annotation ── */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 sm:mt-10 pt-3 border-t border-dashed border-[#D8D2C3] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#78716C]"
        >
          <span>✎ ALL DEMOS RUN 100% IN YOUR BROWSER · NO REGISTRATION OR BACKEND CREDENTIALS NEEDED.</span>
          <span className="text-[#1C1B19] font-semibold">TESTABLE FRONTEND BUILDS</span>
        </motion.div>
      </div>
    </section>
  )
}
export default CaseFilesSection
