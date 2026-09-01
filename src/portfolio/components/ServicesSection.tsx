import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

interface StandardCardProps {
  code: string
  number: string
  title: string
  description: string
  scope: string
  eyebrow?: string
  index: number
}

function StandardServiceCard({
  code,
  number,
  title,
  description,
  scope,
  eyebrow,
  index,
}: StandardCardProps) {
  const prefersReduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, {
    once: true,
    margin: '-60px 0px -30px 0px',
    amount: 0.2,
  })

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={isInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : {
              duration: 0.4,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className="group flex flex-col justify-between rounded-none border border-[#D1CAB8] bg-[#FAF7F0] p-6 sm:p-7 transition-colors duration-200 hover:border-[#1C1B19]"
    >
      <div>
        {/* Technical Ledger Header: Bracketed Code & Clean Number */}
        <div className="flex items-center justify-between border-b border-[#E3DDCF] pb-3 font-mono text-xs">
          <span className="font-bold text-[#8C877C] transition-colors duration-200 group-hover:text-[#E8452C]">
            {code}
          </span>
          <span className="text-[10px] text-[#A39E93] uppercase tracking-wider">
            SPEC {number}
          </span>
        </div>

        {/* Optional Eyebrow Variation (e.g. Card 03) */}
        {eyebrow && (
          <span className="mt-4 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#7A5F46]">
            {eyebrow}
          </span>
        )}

        {/* Title */}
        <h3 className={`font-display text-lg font-bold text-[#1C1B19] leading-snug ${eyebrow ? 'mt-1' : 'mt-4'}`}>
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 font-manifesto-sans text-xs sm:text-sm leading-relaxed text-[#44403C]">
          {description}
        </p>
      </div>

      {/* Scope Footer Rule: Shifts to Vermilion on Hover */}
      <div className="mt-6 border-t border-[#E3DDCF] pt-3 font-mono text-[9px] uppercase tracking-wider text-[#78716C] transition-colors duration-200 group-hover:border-[#E8452C] group-hover:text-[#1C1B19]">
        <span>{scope}</span>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const prefersReduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isHeaderInView = useInView(sectionRef, {
    once: true,
    margin: '-60px 0px',
    amount: 0.1,
  })
  const card4Ref = useRef<HTMLDivElement>(null)
  const isCard4InView = useInView(card4Ref, {
    once: true,
    margin: '-60px 0px',
    amount: 0.15,
  })

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Core Engineering Capabilities & Services"
      className="relative isolate w-full bg-[#E4DFD1] px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 text-[#1C1B19]"
    >
      {/* ── Exact Section Boundary Seam: Placed at y=0 (Boundary between #EDE8DC and #E4DFD1) ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center -translate-y-1/2 pointer-events-none"
      >
        <div className="w-full border-t border-[#2A2622]/40" />
        <span className="absolute bg-[#E4DFD1] px-4 py-0.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#2A2622] font-semibold select-none border border-[#2A2622]/20">
          — 03 / SERVICES —
        </span>
      </div>

      {/* ── Texture Overlay: Slightly Deeper Worn Paper Texture (5% Opacity, Edge-to-Edge) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section Headline & Narrative Introduction (Directly on #E4DFD1 Recessed Vellum) ── */}
        {/* Fades and settles smoothly (~450ms) as it enters viewport */}
        <motion.div
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={isHeaderInView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <h2 className="font-typewriter text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.12] tracking-tight text-[#1C1B19]">
            Software engineered for real business operations.
          </h2>
          <p className="mt-4 font-manifesto-sans text-base sm:text-lg leading-relaxed text-[#44403C]">
            We specialize in custom systems where off-the-shelf software fails due to rigid constraints, recurring monthly rent, or poor usability.
          </p>
        </motion.div>

        {/* ── Asymmetric Capability Grid: Top Row of 3 + Featured Wide Card ── */}
        <div className="space-y-6">
          {/* Top Row: 3 Standard Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 01 */}
            <StandardServiceCard
              index={0}
              number="01"
              code="[ 01 // WEB ]"
              title="High-Conversion Web & PWAs"
              description="Ultra-fast customer-facing interfaces engineered with zero framework bloat. Instant loading on mobile networks with offline caching."
              scope="Client Applications & Mobile Web"
            />

            {/* Card 02 */}
            <StandardServiceCard
              index={1}
              number="02"
              code="[ 02 // OPS ]"
              title="Operations & Admin Consoles"
              description="Two-sided dashboards for order dispatch, customer management, spatial table plans, and real-time operations visibility."
              scope="Backoffice & Dispatch Tooling"
            />

            {/* Card 03: Structural variation with eyebrow scope header */}
            <StandardServiceCard
              index={2}
              number="03"
              code="[ 03 // DATA ]"
              eyebrow="STATE ARCHITECTURE"
              title="Custom Data & State Sync"
              description="Purpose-built relational schemas and state synchronization engines tailored to your actual operational rules and transactions."
              scope="Relational Schemas & State Engines"
            />
          </div>

          {/* Bottom Card 04: Wide Featured Differentiator Card (Turnkey Code Ownership) */}
          <motion.div
            ref={card4Ref}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={isCard4InView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.45, delay: 0.24, ease: [0.16, 1, 0.3, 1] }
            }
            className="group rounded-none border border-[#D1CAB8] bg-[#FAF7F0] p-6 sm:p-8 lg:p-10 transition-colors duration-200 hover:border-[#1C1B19]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E3DDCF] pb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#8C877C] transition-colors duration-200 group-hover:text-[#E8452C]">
                  [ 04 // CORE DIFFERENTIATOR ]
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#1C1B19] uppercase tracking-widest bg-[#E4DFD1] px-2 py-0.5">
                PRIMARY STUDIO COMMITMENT
              </span>
            </div>

            {/* Main Content: 2-Column Split */}
            <div className="mt-6 grid items-center gap-8 lg:grid-cols-12">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1C1B19]">
                  Turnkey Code Ownership
                </h3>
                <p className="mt-3 font-manifesto-sans text-sm sm:text-base leading-relaxed text-[#44403C]">
                  100% of the git repositories, production build configurations, and cloud deployment pipelines are transferred directly to your organization upon release. Zero monthly platform rent, zero proprietary runtime locks, and complete technical sovereignty.
                </p>
              </div>

              {/* Right Column: Key Deliverables List */}
              <div className="lg:col-span-5 rounded bg-[#EDE8DC] p-4 sm:p-5 border border-[#D8D2C3]">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#6B6860] mb-3">
                  DELIVERY SPECIFICATIONS:
                </span>
                <ul className="space-y-2 font-mono text-xs text-[#1C1B19]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#1C1B19] shrink-0" />
                    <span>100% Full Source Code Handover</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#1C1B19] shrink-0" />
                    <span>Zero Recurring Platform Fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#1C1B19] shrink-0" />
                    <span>Direct DNS &amp; Cloud Deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#1C1B19] shrink-0" />
                    <span>Clean Documentation &amp; Architecture Notes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Scope Footer Rule */}
            <div className="mt-8 border-t border-[#E3DDCF] pt-4 font-mono text-[10px] uppercase tracking-wider text-[#78716C] transition-colors duration-200 group-hover:border-[#E8452C] group-hover:text-[#1C1B19]">
              <span>DELIVERABLE: 100% CLIENT CODE OWNERSHIP · ZERO SAAS SUBSCRIPTIONS</span>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Annotation Note ── */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-14 pt-4 border-t border-dashed border-[#D1CAB8] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#78716C]"
        >
          <span>✎ ALL DELIVERABLES INCLUDE COMPLETE CI/CD, CLEAN SOURCE CODE, AND PRODUCTION CLOUD DEPLOYMENT.</span>
          <span className="text-[#1C1B19] font-semibold">100% CODE OWNERSHIP</span>
        </motion.div>
      </div>
    </section>
  )
}
export default ServicesSection
