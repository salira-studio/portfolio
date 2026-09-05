import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Cpu,
} from 'lucide-react'
import { ManifestoHero } from '../components/ManifestoHero'
import { CaseFilesSection } from '../components/CaseFilesSection'
import { ServicesSection } from '../components/ServicesSection'
import { DraftSheet } from '../components/DraftSheet'

/* ── Pricing category data for the homepage grid ── */
const PRICING_CATEGORIES = [
  {
    id: 'website',
    label: 'Website',
    icon: Globe,
    tiers: [
      {
        tierCode: 'TIER-WEB-01 · Starter',
        price: '₹25,000 – ₹45,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '1–2 weeks',
        bestFor: 'Single-location businesses, consultants, or professional practices requiring an authoritative web presence.',
        specs: ['Up to 5 pages', 'Extra page: ₹3,000–₹4,000 / page', '15-day bug-fix support', 'Mobile-responsive + SEO foundation'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Website project (₹25,000–₹45,000 scope).',
      },
      {
        tierCode: 'TIER-WEB-02 · Standard',
        price: '₹55,000 – ₹1,10,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '3–4 weeks',
        bestFor: 'Growing service firms, B2B companies, or established businesses requiring bespoke UI design and dynamic content.',
        specs: ['6 to 12 pages', 'Extra page: ₹4,000–₹6,000 / page', '30-day bug-fix support', 'Custom CMS + analytics setup'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Website project (₹55,000–₹1,10,000 scope).',
      },
      {
        tierCode: 'TIER-WEB-03 · Advanced',
        price: '₹1,30,000 – ₹2,80,000+',
        priceNote: 'Milestone billing quote · 100% code ownership',
        timeline: '5–8 weeks',
        bestFor: 'Organizations with specialized workflows, client portals, high-traffic portals, API integrations, or multi-user needs.',
        specs: ['12 to 25+ pages', 'Extra page: ₹6,000–₹8,000 / page', '60-day bug-fix support', 'Auth portals + custom API integrations'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Website project (₹1,30,000–₹2,80,000+ scope).',
      },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    icon: ShoppingBag,
    tiers: [
      {
        tierCode: 'TIER-ECOM-01 · Starter',
        price: '₹50,000 – ₹1,50,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '2–4 weeks',
        bestFor: 'First online store, simple catalog — templated Shopify / WooCommerce store.',
        specs: ['Up to 50 products', '1 gateway (Razorpay/UPI) + GST', '15-day bug-fix support', 'Cart, checkout & order notifications'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter E-Commerce project (₹50,000–₹1,50,000 scope).',
      },
      {
        tierCode: 'TIER-ECOM-02 · Standard',
        price: '₹1,50,000 – ₹5,00,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '4–8 weeks',
        bestFor: 'Growing brand needing custom design + integrations — semi-custom on Shopify / WooCommerce.',
        specs: ['Up to 500 products', 'Multiple gateways + GSTR-1', '30–45-day bug-fix support', 'Abandoned cart recovery + analytics'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard E-Commerce project (₹1,50,000–₹5,00,000 scope).',
      },
      {
        tierCode: 'TIER-ECOM-03 · Advanced',
        price: '₹5,00,000 – ₹20,00,000+',
        priceNote: 'Milestone billing quote · 100% code ownership',
        timeline: '12–24 weeks',
        bestFor: 'Multi-vendor marketplace, ERP/CRM sync, high-traffic scale — fully custom / multi-vendor architecture.',
        specs: ['500+ products (modular)', 'Full GST/HSN + e-Way Bill', '60–90-day bug-fix support', 'Multi-vendor payouts + ERP integrations'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced E-Commerce project (₹5,00,000–₹20,00,000+ scope).',
      },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    icon: Smartphone,
    tiers: [
      {
        tierCode: 'TIER-MOB-01 · Starter',
        price: '₹1,50,000 – ₹3,00,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '4–6 weeks',
        bestFor: 'Testing an idea, simple customer-facing app — cross-platform, single codebase.',
        specs: ['Up to 8 screens', 'iOS + Android', '15-day bug-fix support', 'Auth, push notifications, store submission'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Mobile App project (₹1,50,000–₹3,00,000 scope).',
      },
      {
        tierCode: 'TIER-MOB-02 · Standard',
        price: '₹3,00,000 – ₹7,00,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '8–12 weeks',
        bestFor: 'Business app needing accounts, payments, admin — cross-platform + custom backend.',
        specs: ['8–20 screens', 'iOS + Android', '30–45-day bug-fix support', 'Payments, admin dashboard, offline sync'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Mobile App project (₹3,00,000–₹7,00,000 scope).',
      },
      {
        tierCode: 'TIER-MOB-03 · Advanced',
        price: '₹8,00,000 – ₹20,00,000+',
        priceNote: 'Milestone billing quote · 100% code ownership',
        timeline: '16–24 weeks',
        bestFor: 'Multi-role platforms, real-time data, scale needs — fully custom, complex architecture.',
        specs: ['20+ screens, modular', 'iOS + Android (native opt)', '60–90-day bug-fix support', 'Real-time sync, biometrics, CI/CD'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Mobile App project (₹8,00,000–₹20,00,000+ scope).',
      },
    ],
  },
  {
    id: 'software',
    label: 'Business Software',
    icon: LayoutDashboard,
    tiers: [
      {
        tierCode: 'TIER-SOFT-01 · Starter',
        price: '₹2,50,000 – ₹6,00,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '4–8 weeks',
        bestFor: 'Automating one specific process (e.g. leave management, simple CRM) — single-workflow internal tool.',
        specs: ['1–2 user roles', '2 revision rounds', '30-day bug-fix support', 'Core workflow automation + dashboard'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Business Software project (₹2,50,000–₹6,00,000 scope).',
      },
      {
        tierCode: 'TIER-SOFT-02 · Standard',
        price: '₹6,00,000 – ₹18,00,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '8–14 weeks',
        bestFor: 'Businesses needing role-based access, payments, integrations — multi-role business application.',
        specs: ['3–4 roles (tiered)', '3 revision rounds', '45-day bug-fix support', 'Payments, analytics, audit logging'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Business Software project (₹6,00,000–₹18,00,000 scope).',
      },
      {
        tierCode: 'TIER-SOFT-03 · Advanced',
        price: '₹18,00,000 – ₹50,00,000+',
        priceNote: 'Milestone billing quote · 100% code ownership',
        timeline: '14–24 weeks',
        bestFor: 'Complex operations needing ERP integration, compliance tracking — enterprise operations platform.',
        specs: ['5+ roles (granular)', '4 revision rounds', '60–90-day bug-fix support', 'ERP/CRM sync, SSO, compliance trails'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Business Software project (₹18,00,000–₹50,00,000+ scope).',
      },
    ],
  },
  {
    id: 'platform',
    label: 'Custom Platform',
    icon: Cpu,
    tiers: [
      {
        tierCode: 'TIER-PLAT-01 · Starter',
        price: '₹6,00,000 – ₹15,00,000',
        priceNote: 'Fixed scope quote · 100% code ownership',
        timeline: '8–12 weeks',
        bestFor: 'Validating a marketplace / platform idea with core roles — MVP multi-sided architecture.',
        specs: ['2–3 roles (Buyer, Vendor, Admin)', '2 revision rounds', '30-day bug-fix support', 'Listings, payments split, admin panel'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Custom Platform project (₹6,00,000–₹15,00,000 scope).',
      },
      {
        tierCode: 'TIER-PLAT-02 · Standard',
        price: '₹15,00,000 – ₹35,00,000',
        priceNote: 'Milestone billing quote · 100% code ownership',
        timeline: '14–20 weeks',
        bestFor: 'A live platform ready to scale operations — production-grade multi-vendor / multi-location system.',
        specs: ['3–5 roles (granular)', '3 revision rounds', '60-day bug-fix support', 'Commission engine, analytics, dispute flow'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Custom Platform project (₹15,00,000–₹35,00,000 scope).',
      },
      {
        tierCode: 'TIER-PLAT-03 · Advanced',
        price: '₹35,00,000 – ₹80,00,000+',
        priceNote: 'Milestone billing quote · 100% code ownership',
        timeline: '20–32 weeks',
        bestFor: 'Large-scale marketplaces, ERP-integrated, multi-tenant SaaS — enterprise-grade distributed platform.',
        specs: ['Modular / Unlimited roles', '4 revision rounds', '90-day bug-fix support', 'Multi-region, ERP, GraphQL API layer'],
        ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Custom Platform project (₹35,00,000–₹80,00,000+ scope).',
      },
    ],
  },
]

export default function Home() {
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', projectScope: '' })
  const [activePricingCategory, setActivePricingCategory] = useState('website')

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
              ✎ DEVELOPMENT FEE ONLY · DOMAIN, HOSTING &amp; 3RD-PARTY INFRA BILLED SEPARATELY BY PROVIDERS.
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

          {/* ── Category Toggle ── */}
          <div className="flex items-center justify-center">
            <div className="inline-flex max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-[var(--salira-border-draft)] bg-[var(--salira-paper)] p-1.5 shadow-sm">
              {PRICING_CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActivePricingCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activePricingCategory === cat.id
                        ? 'bg-[var(--salira-blueprint)] text-white shadow-sm'
                        : 'text-[var(--salira-graphite-muted)] hover:text-[var(--salira-graphite)] hover:bg-[var(--salira-paper-lifted)]'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── 3-Tier Grid ── */}
          {PRICING_CATEGORIES.map((cat) =>
            activePricingCategory === cat.id ? (
              <div key={cat.id} className="grid gap-6 lg:grid-cols-3">

                {/* Tier 01 — Starter */}
                <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                        {cat.tiers[0].tierCode}
                      </span>
                      <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-graphite-muted)]">
                        {cat.tiers[0].timeline}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="font-display text-2xl font-bold text-[var(--salira-graphite)]">
                        {cat.tiers[0].price}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[9px] text-[var(--salira-graphite-muted)] uppercase tracking-wider">
                      {cat.tiers[0].priceNote}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                      {cat.tiers[0].bestFor}
                    </p>
                    <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                      {cat.tiers[0].specs.map((s) => (
                        <li key={s} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                    <a
                      href={`https://wa.me/917397430568?text=${encodeURIComponent(cat.tiers[0].ctaMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded border-2 border-[var(--salira-blueprint)] bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)] shadow-2xs transition-all duration-180 hover:bg-[var(--salira-blueprint)] hover:text-white active:scale-98"
                    >
                      <span>Start with Starter</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Tier 02 — Standard (Highlighted) */}
                <div className="flex flex-col justify-between rounded-lg border-2 border-[var(--salira-blueprint)] bg-white p-6 shadow-md relative">
                  <span className="absolute -top-3 left-6 rounded bg-[var(--salira-redpen)] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-2xs">
                    MOST POPULAR
                  </span>
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                        {cat.tiers[1].tierCode}
                      </span>
                      <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-blueprint)]">
                        {cat.tiers[1].timeline}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="font-display text-2xl font-bold text-[var(--salira-graphite)]">
                        {cat.tiers[1].price}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[9px] text-[var(--salira-graphite-muted)] uppercase tracking-wider">
                      {cat.tiers[1].priceNote}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                      {cat.tiers[1].bestFor}
                    </p>
                    <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                      {cat.tiers[1].specs.map((s) => (
                        <li key={s} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[var(--salira-redpen)] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                    <a
                      href={`https://wa.me/917397430568?text=${encodeURIComponent(cat.tiers[1].ctaMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded bg-[var(--salira-blueprint)] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all duration-180 hover:bg-[var(--salira-redpen)] active:scale-98"
                    >
                      <span>Start with Standard</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Tier 03 — Advanced */}
                <div className="flex flex-col justify-between rounded-lg border border-[var(--salira-border-draft)] bg-white p-6 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--salira-border-draft)] pb-3">
                      <span className="font-mono text-xs font-bold uppercase text-[var(--salira-blueprint)]">
                        {cat.tiers[2].tierCode}
                      </span>
                      <span className="rounded bg-[var(--salira-paper)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--salira-graphite-muted)]">
                        {cat.tiers[2].timeline}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="font-display text-2xl font-bold text-[var(--salira-graphite)]">
                        {cat.tiers[2].price}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[9px] text-[var(--salira-graphite-muted)] uppercase tracking-wider">
                      {cat.tiers[2].priceNote}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--salira-graphite-soft)]">
                      {cat.tiers[2].bestFor}
                    </p>
                    <ul className="mt-5 space-y-2 font-mono text-xs text-[var(--salira-graphite)]">
                      {cat.tiers[2].specs.map((s) => (
                        <li key={s} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-[var(--salira-blueprint)] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-[var(--salira-border-draft)] pt-4">
                    <a
                      href={`https://wa.me/917397430568?text=${encodeURIComponent(cat.tiers[2].ctaMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded border-2 border-[var(--salira-blueprint)] bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--salira-blueprint)] shadow-2xs transition-all duration-180 hover:bg-[var(--salira-blueprint)] hover:text-white active:scale-98"
                    >
                      <span>Start with Advanced</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

              </div>
            ) : null
          )}

          {/* ── Infrastructure note ── */}
          <p className="font-mono text-[10px] text-[var(--salira-graphite-muted)] text-center pt-2">
            ✎ Development fee only. Domain, hosting, servers &amp; all 3rd-party infrastructure (payment gateways, SMS, email, App Store accounts) are billed directly by their respective providers — not included above.
          </p>
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
