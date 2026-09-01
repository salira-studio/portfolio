import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Mail,
} from 'lucide-react'
import { ManifestoHero } from '../components/ManifestoHero'
import { CaseFilesSection } from '../components/CaseFilesSection'
import { ServicesSection } from '../components/ServicesSection'
import { DraftSheet } from '../components/DraftSheet'

export default function Home() {
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', projectScope: '' })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitted(true)
  }

  return (
    <div className="salira-draft-grid min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          HERO: MANIFESTO STATEMENT (BOLD TYPEWRITER & RESTRICTION)
          ───────────────────────────────────────────────────────────── */}
      <ManifestoHero />

      {/* ─────────────────────────────────────────────────────────────
          SCENE 02: CASE FILES (PHYSICAL LANDING & UNSEALING ON SCROLL)
          ───────────────────────────────────────────────────────────── */}
      <CaseFilesSection />

      {/* ─────────────────────────────────────────────────────────────
          SCENE 03: SERVICES (RECESSED VELLUM & SEAM TRANSITION)
          ───────────────────────────────────────────────────────────── */}
      <ServicesSection />

      <div className="py-6 sm:py-10 space-y-12">

      {/* ─────────────────────────────────────────────────────────────
          SHEET 04: HOW WE WORK (THE DRAFTING PROTOCOL)
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="how-we-work"
        sheetNumber="SHEET 04/06"
        title="THE DRAFTING PROTOCOL · HOW WE WORK"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="SPRINT LIFECYCLE"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span>✎ TRANSPARENT REPUTATION: MILESTONE BILLING WITH NO HIDDEN FEES OR COST CREEP.</span>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              From initial draft to production release.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              A disciplined, technical engineering protocol that keeps you in complete control at every milestone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discovery Blueprint',
                desc: 'We map your physical daily operations, bottlenecks, and user roles into a clear technical scope document with a fixed quote.',
              },
              {
                step: '02',
                title: 'Working Prototype',
                desc: 'We deliver an interactive working draft you can click and test in your browser within 10–14 days. No static wireframe mockups.',
              },
              {
                step: '03',
                title: 'Engineering Sprints',
                desc: 'We build out full business logic, database integrations, responsive styling, and cross-device performance budgets.',
              },
              {
                step: '04',
                title: 'Production Handover',
                desc: 'We deploy your system live, configure custom domains and SSL certificates, and transfer 100% source code ownership.',
              },
            ].map((p) => (
              <div
                key={p.step}
                className="relative rounded-lg border border-[var(--salira-border-draft)] bg-white p-5 shadow-2xs"
              >
                <span className="font-mono text-xs font-bold text-[var(--salira-blueprint)]">
                  PHASE {p.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[var(--salira-graphite)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 05: TRANSPARENT PRICING & SCOPE
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="pricing"
        sheetNumber="SHEET 05/06"
        title="FIXED-PRICE ENGINEERING ESTIMATES · PRICING & SCOPE"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="COMMERCIAL TERMS"
        marginAnnotation={
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span className="text-[var(--salira-redpen)] font-bold">
              ✎ ALL TIERS INCLUDE 100% SOURCE CODE HANDOVER AND ZERO MONTHLY SAAS FEES.
            </span>
            <span>CUSTOM SCOPES QUOTED WITHIN 24 HOURS</span>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              Transparent, fixed-price specifications.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--salira-graphite-soft)] sm:text-base">
              Clear milestone pricing with no subscription fees, platform commissions, or hidden surprises.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tier 01: Foundation Web Tier */}
            <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                    TIER 01 · FOUNDATION
                  </span>
                  <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-graphite-muted)]">
                    1–2 WEEKS
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-[var(--salira-graphite)]">
                    ₹15,000
                  </span>
                  <span className="font-mono text-xs text-[var(--salira-graphite-muted)]"> / $200 fixed</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  High-conversion brand presence engineered with sub-100ms loading and Google SEO optimization.
                </p>

                <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Custom High-Converting Web Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Mobile Responsive &amp; Touch Optimized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Instant WhatsApp &amp; Contact Dispatch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>100% Full Source Code Transfer</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded border-2 border-[var(--salira-blueprint)] bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)] shadow-2xs transition-all duration-180 hover:bg-[var(--salira-blueprint)] hover:text-white active:scale-98"
                  data-draft-target="Select Tier 01"
                >
                  <span>Select Specification</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Tier 02: Custom Business App (Highlighted) */}
            <div className="flex flex-col justify-between rounded-lg border-2 border-[var(--salira-blueprint)] bg-white p-6 shadow-md relative">
              <span className="absolute -top-3 left-6 rounded bg-[var(--salira-redpen)] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-2xs">
                MOST POPULAR BLUEPRINT
              </span>
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                    TIER 02 · CUSTOM APP
                  </span>
                  <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-blueprint)]">
                    2–3 WEEKS
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-[var(--salira-graphite)]">
                    ₹35,000
                  </span>
                  <span className="font-mono text-xs text-[var(--salira-graphite-muted)]"> / $450 fixed</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Complete two-sided application with customer booking/ordering portal + operations admin console.
                </p>

                <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Two-Sided Architecture (Client + Admin)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Real-Time State &amp; Notification Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Custom Workflow Logic &amp; Cart/Booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0" />
                    <span>Zero Monthly SaaS Platform Fees</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all duration-180 hover:bg-[var(--salira-redpen)] active:scale-98"
                  data-draft-target="Select Tier 02"
                >
                  <span>Initiate Custom Build</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Tier 03: Full Ecosystem */}
            <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                    TIER 03 · FULL ECOSYSTEM
                  </span>
                  <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-graphite-muted)]">
                    3–4 WEEKS
                  </span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-[var(--salira-graphite)]">
                    ₹65,000
                  </span>
                  <span className="font-mono text-xs text-[var(--salira-graphite-muted)]"> / $850 fixed</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                  Enterprise-grade multi-role operational platform with database automations and full analytics.
                </p>

                <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Multi-Role Access (Customer, Staff, Manager)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Custom Schema &amp; Cloud Database Deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>Export, Invoicing &amp; Operations Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0" />
                    <span>30-Day Post-Launch SLA &amp; Support</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded border-2 border-[var(--salira-blueprint)] bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)] shadow-2xs transition-all duration-180 hover:bg-[var(--salira-blueprint)] hover:text-white active:scale-98"
                  data-draft-target="Select Tier 03"
                >
                  <span>Select Specification</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DraftSheet>

      {/* ─────────────────────────────────────────────────────────────
          SHEET 06: STUDIO DISPATCH / CONTACT
          ───────────────────────────────────────────────────────────── */}
      <DraftSheet
        id="contact"
        sheetNumber="SHEET 06/06"
        title="STUDIO DISPATCH · INITIATE WORKING DRAFT"
        revision="REV 2026.09"
        coordinates="13.0827° N, 80.2707° E"
        classification="DIRECT COMMUNICATION"
        marginAnnotation={
          <div className="font-mono text-[10px] text-[var(--salira-graphite-muted)]">
            <span>✎ ALL INQUIRIES RECEIVE A DIRECT TECHNICAL AUDIT FROM AN ENGINEER, NOT A SALES REP.</span>
          </div>
        }
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-5 lg:col-span-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--salira-graphite)] sm:text-4xl">
              Let's engineer your software.
            </h2>
            <p className="text-xs leading-relaxed text-[var(--salira-graphite-soft)] sm:text-sm">
              Send us your operational requirements or current process headaches. We'll respond with a clear architectural outline and fixed estimate within 24 hours.
            </p>

            <div className="space-y-3 font-mono text-xs pt-2">
              <a
                href="tel:+917397430568"
                className="flex items-center gap-3 rounded border border-[var(--salira-border-draft)] bg-white p-3 text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                data-draft-target="Direct Call Contact"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                  <Phone size={15} />
                </span>
                <div>
                  <span className="block text-[9px] text-[var(--salira-graphite-muted)] uppercase">
                    DIRECT CALL / TELEPHONE
                  </span>
                  <span className="font-bold">+91 73974 30568</span>
                </div>
              </a>

              <a
                href="mailto:hello@salira.studio"
                className="flex items-center gap-3 rounded border border-[var(--salira-border-draft)] bg-white p-3 text-[var(--salira-graphite)] hover:border-[var(--salira-blueprint)] transition-colors"
                data-draft-target="Direct Email Contact"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--salira-paper)] text-[var(--salira-blueprint)]">
                  <Mail size={15} />
                </span>
                <div>
                  <span className="block text-[9px] text-[var(--salira-graphite-muted)] uppercase">
                    DIRECT EMAIL
                  </span>
                  <span className="font-bold">hello@salira.studio</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Working Draft Intake Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3 font-mono text-[10px] uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                <span className="text-[var(--salira-blueprint)] font-bold">DRAFT INTAKE FORM</span>
                <span>NO SALES SPAM</span>
              </div>

              {contactSubmitted ? (
                <div className="rounded border border-[var(--salira-blueprint)] bg-[var(--salira-paper-lifted)] p-6 text-center">
                  <CheckCircle2 size={32} className="mx-auto text-[var(--salira-blueprint)]" />
                  <h3 className="mt-3 font-display text-xl font-bold text-[var(--salira-graphite)]">
                    Blueprint Intake Received
                  </h3>
                  <p className="mt-2 font-mono text-xs text-[var(--salira-graphite-soft)]">
                    Thank you, {contactForm.name || 'there'}. We have queued your requirement for engineering review and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                      YOUR NAME / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh / Aura Hospitality"
                      className="mt-1 w-full rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] px-3 py-2 font-sans text-xs text-[var(--salira-graphite)] outline-none focus:border-[var(--salira-blueprint)]"
                      data-draft-target="Input Name"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                      EMAIL OR PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. ramesh@aurarestaurant.in or +91 98765..."
                      className="mt-1 w-full rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] px-3 py-2 font-sans text-xs text-[var(--salira-graphite)] outline-none focus:border-[var(--salira-blueprint)]"
                      data-draft-target="Input Email"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--salira-graphite-muted)]">
                      BRIEF SYSTEM REQUIREMENTS / WHAT TO AUTOMATE
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.projectScope}
                      onChange={(e) => setContactForm({ ...contactForm, projectScope: e.target.value })}
                      placeholder="e.g. We need a two-sided ordering portal for our 2 restaurant locations to avoid Zomato/Swiggy commissions..."
                      className="mt-1 w-full rounded border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] px-3 py-2 font-sans text-xs text-[var(--salira-graphite)] outline-none focus:border-[var(--salira-blueprint)]"
                      data-draft-target="Input Scope"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[var(--salira-redpen)] py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-[#E02E24] transition-colors"
                    data-draft-target="Submit Blueprint Button"
                  >
                    Submit Requirements for Architectural Estimate
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </DraftSheet>
      </div>
    </div>
  )
}
