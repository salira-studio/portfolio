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
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/* ── Service Definitions ── */
export type ServiceCategory = 'website' | 'ecommerce' | 'mobile' | 'software' | 'platform'

interface ServiceNavOption {
  id: ServiceCategory
  code: string
  label: string
  specSummary: string
}

const SERVICE_NAV: ServiceNavOption[] = [
  { id: 'website', code: 'SRV-01', label: 'Custom Website', specSummary: 'Marketing, corporate & portal builds' },
  { id: 'ecommerce', code: 'SRV-02', label: 'E-Commerce', specSummary: 'Product catalog & transactional carts' },
  { id: 'mobile', code: 'SRV-03', label: 'Mobile App', specSummary: 'iOS & Android native/cross-platform' },
  { id: 'software', code: 'SRV-04', label: 'Business Software', specSummary: 'Internal ops portals & data tools' },
  { id: 'platform', code: 'SRV-05', label: 'Custom Platform', specSummary: 'Multi-sided distributed systems' },
]

/* ── Common Tier Interface for 3-Tier Views ── */
interface TierData {
  id: string
  tierCode: string
  name: string
  buildType: string
  complexityBars: number
  bestFor: string
  priceRange: string
  priceUnit: string
  keySpecs: { label: string; value: string }[]
  functionality: string[]
  revisions: string
  timeline: string
  postLaunchSupport: string
  contentResponsibility: string
  ownership: string
  techStack: string
  design?: string
  ctaText: string
  ctaMessage: string
}

/* ── Website Development 3-Tier Data (SRV-01) ── */
const WEBSITE_TIERS: TierData[] = [
  {
    id: 'starter',
    tierCode: 'TIER-WEB-01',
    name: 'Starter',
    buildType: 'Template-based',
    complexityBars: 1,
    bestFor: 'Single-location businesses, consultants, or professional practices requiring an authoritative web presence.',
    priceRange: '₹25,000 – ₹45,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'Pages included', value: 'Up to 5 pages' },
      { label: 'Extra page rate', value: '₹3,000 – ₹4,000 / page' },
      { label: 'Delivery timeline', value: '1–2 weeks' },
      { label: 'Bug-fix support', value: '15 days' },
    ],
    design: 'Structured layout adapted from proven base systems with customized typography, brand palette, and asset styling.',
    functionality: [
      'Mobile-responsive layout optimized for all screen sizes',
      'Contact & inquiry capture form with direct email routing',
      'Direct WhatsApp chat trigger & click-to-call integrations',
      'Interactive Google Maps location embed',
      'Technical SEO foundation (meta tags, OpenGraph & XML sitemap)',
    ],
    revisions: '2 structured rounds',
    timeline: '1–2 weeks delivery window',
    postLaunchSupport: '15 days of included bug-fix support',
    contentResponsibility: 'Client provides copy and media assets, or content writing is billed separately at ₹2,000–₹4,000 / page.',
    ownership: 'Full source code and account ownership transferred at completion.',
    techStack: 'Clean modern HTML/Tailwind or lightweight WordPress',
    ctaText: 'Start with Starter',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Website project (₹25,000 – ₹45,000 scope).',
  },
  {
    id: 'standard',
    tierCode: 'TIER-WEB-02',
    name: 'Standard',
    buildType: 'Semi-custom',
    complexityBars: 2,
    bestFor: 'Growing service firms, B2B companies, or established businesses requiring bespoke UI design and dynamic content.',
    priceRange: '₹55,000 – ₹1,10,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'Pages included', value: '6 to 12 pages' },
      { label: 'Extra page rate', value: '₹4,000 – ₹6,000 / page' },
      { label: 'Delivery timeline', value: '3–4 weeks' },
      { label: 'Bug-fix support', value: '30 days' },
    ],
    design: 'Bespoke UI design system crafted from scratch in Figma around your exact brand guidelines, typography scale, and user journeys.',
    functionality: [
      'Custom interactive UI components and subtle micro-interactions',
      'Dynamic CMS for blogs, case studies, team profiles, or service catalogs',
      'Multi-step inquiry, qualification, or lead capture forms',
      'Web analytics setup with conversion goals & event telemetry',
      'Speed & Core Web Vitals optimization (sub-second target load)',
    ],
    revisions: '3 structured rounds',
    timeline: '3–4 weeks delivery window',
    postLaunchSupport: '30 days of included bug-fix support',
    contentResponsibility: 'Client provides core messaging, or structured copywriting & asset sourcing is billed separately at ₹3,000–₹6,000 / page.',
    ownership: 'Full source code and account ownership transferred at completion.',
    techStack: 'WordPress with custom lightweight theme or Vite + React / Astro',
    ctaText: 'Start with Standard',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Website project (₹55,000 – ₹1,10,000 scope).',
  },
  {
    id: 'advanced',
    tierCode: 'TIER-WEB-03',
    name: 'Advanced',
    buildType: 'Fully custom',
    complexityBars: 3,
    bestFor: 'Organizations with specialized workflows, client portals, high-traffic portals, API integrations, or multi-user needs.',
    priceRange: '₹1,30,000 – ₹2,80,000+',
    priceUnit: 'Milestone billing quote',
    keySpecs: [
      { label: 'Pages included', value: '12 to 25+ pages' },
      { label: 'Extra page rate', value: '₹6,000 – ₹8,000 / page' },
      { label: 'Delivery timeline', value: '5–8 weeks' },
      { label: 'Bug-fix support', value: '60 days' },
    ],
    design: 'Comprehensive end-to-end design system, custom interactive states, tailored iconography, and design token architecture.',
    functionality: [
      'Authenticated client portal or protected member dashboard',
      'Custom API integrations & CRM / ERP data synchronization',
      'Complex multi-attribute filtering, faceted search & data tables',
      'Role-based permissions & automated workflow triggers',
      'Advanced security hardening, audit logging & automated backups',
    ],
    revisions: '4 structured rounds',
    timeline: '5–8 weeks delivery window',
    postLaunchSupport: '60 days of included bug-fix support',
    contentResponsibility: 'Full content architecture consultation included; copywriting billed separately at ₹4,000–₹8,000 / page.',
    ownership: 'Full source code and account ownership transferred at completion.',
    techStack: 'Custom-coded (React / Next.js / TypeScript, Node.js or serverless backend, Headless CMS)',
    ctaText: 'Start with Advanced',
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Website project (₹1,30,000 – ₹2,80,000+ scope).',
  },
]

/* ── E-Commerce Development 3-Tier Data (SRV-02) ── */
const ECOMMERCE_TIERS: TierData[] = [
  {
    id: 'starter-ecom',
    tierCode: 'TIER-ECOM-01',
    name: 'Starter',
    buildType: 'Templated Shopify/WooCommerce store',
    complexityBars: 1,
    bestFor: 'First online store, simple catalog',
    priceRange: '₹50,000 – ₹1,50,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'Catalog setup', value: 'Up to 50 products' },
      { label: 'Payment & GST', value: '1 Gateway (Razorpay/UPI) + GST' },
      { label: 'Delivery timeline', value: '2–4 weeks' },
      { label: 'Bug-fix support', value: '15 days' },
    ],
    design: 'Standard Shopify or WooCommerce theme setup customized with your brand typography, colors, and banner assets.',
    functionality: [
      'Product listing & categorized catalog navigation',
      'Cart & secure checkout flow (Razorpay/UPI/Cards)',
      'Basic administrative store management panel',
      'Standard order notifications & customer email receipts',
    ],
    revisions: '2 rounds',
    timeline: '2–4 weeks',
    postLaunchSupport: '15 days of included bug-fix support',
    contentResponsibility: 'Client provides product photos, pricing, descriptions & gateway accounts. Extra catalog setup billed at ₹5,000–₹10,000 per 50-product batch.',
    ownership: 'Full store ownership, themes & account credentials transferred at completion.',
    techStack: 'Shopify or WooCommerce (standard theme)',
    ctaText: 'Start with Starter',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter E-Commerce project (₹50,000 – ₹1,50,000 scope).',
  },
  {
    id: 'standard-ecom',
    tierCode: 'TIER-ECOM-02',
    name: 'Standard',
    buildType: 'Semi-custom design on Shopify/WooCommerce',
    complexityBars: 2,
    bestFor: 'Growing brand needing custom design + integrations',
    priceRange: '₹1,50,000 – ₹5,00,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'Catalog setup', value: 'Up to 500 products' },
      { label: 'Payment & GST', value: 'Multiple gateways + GSTR-1' },
      { label: 'Delivery timeline', value: '4–8 weeks' },
      { label: 'Bug-fix support', value: '30–45 days' },
    ],
    design: 'Bespoke UI design system for product pages, collection filters, and checkout styling crafted around your brand.',
    functionality: [
      'Custom store design & enhanced product layout',
      'Inventory & stock level management system',
      'Coupons, discounts & promotional engine',
      'Automated shipping rate calculator & location zones',
      'Abandoned cart recovery automations & store analytics',
    ],
    revisions: '3 rounds',
    timeline: '4–8 weeks',
    postLaunchSupport: '30–45 days of included bug-fix support',
    contentResponsibility: 'Client provides product data & media assets. Extra catalog setup billed at ₹8,000–₹15,000 per 100-product batch.',
    ownership: 'Full store ownership, custom theme codebase & integration credentials transferred.',
    techStack: 'WooCommerce / Shopify with custom theme',
    ctaText: 'Start with Standard',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard E-Commerce project (₹1,50,000 – ₹5,00,000 scope).',
  },
  {
    id: 'advanced-ecom',
    tierCode: 'TIER-ECOM-03',
    name: 'Advanced',
    buildType: 'Fully custom / multi-vendor architecture',
    complexityBars: 3,
    bestFor: 'Multi-vendor marketplace, ERP/CRM sync, high-traffic scale',
    priceRange: '₹5,00,000 – ₹20,00,000+',
    priceUnit: 'Milestone billing quote',
    keySpecs: [
      { label: 'Catalog setup', value: '500+ products (modular)' },
      { label: 'Payment & GST', value: 'Full GST/HSN + e-Way Bill' },
      { label: 'Delivery timeline', value: '12–24 weeks' },
      { label: 'Bug-fix support', value: '60–90 days' },
    ],
    design: 'End-to-end custom design system, vendor portal UI, tailored checkout micro-interactions, and design tokens.',
    functionality: [
      'Multi-vendor marketplace support & automated split payouts',
      'ERP, CRM & warehouse management system integrations',
      'Role-based admin access control & vendor management portals',
      'Custom API integrations & headless commerce architecture',
      'Advanced real-time multi-warehouse inventory synchronization',
    ],
    revisions: '4 rounds',
    timeline: '12–24 weeks',
    postLaunchSupport: '60–90 days of included bug-fix support',
    contentResponsibility: 'Full data pipeline & catalog architecture planning included in milestones. Extra catalog setup scoped per architecture.',
    ownership: '100% source code, custom API microservices & store ownership handed over.',
    techStack: 'Custom-coded (Next.js/Node) or headless commerce',
    ctaText: 'Start with Advanced',
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced E-Commerce project (₹5,00,000 – ₹20,00,000+ scope).',
  },
]

/* ── Mobile App Development 3-Tier Data (SRV-03) ── */
const MOBILE_TIERS: TierData[] = [
  {
    id: 'starter-mobile',
    tierCode: 'TIER-MOB-01',
    name: 'Starter',
    buildType: 'Cross-platform, single codebase',
    complexityBars: 1,
    bestFor: 'Testing an idea, simple customer-facing app',
    priceRange: '₹1,50,000 – ₹3,00,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'Screens included', value: 'Up to 8 screens' },
      { label: 'Platforms', value: 'iOS + Android' },
      { label: 'Delivery timeline', value: '4–6 weeks' },
      { label: 'Bug-fix support', value: '15 days' },
    ],
    functionality: [
      'User login & authentication setup',
      'Core application navigation & primary workflows',
      'Basic push notification integration',
      'Apple App Store & Google Play Store submission guidance',
    ],
    revisions: '2 rounds',
    timeline: '4–6 weeks',
    postLaunchSupport: '15 days of included bug-fix support',
    contentResponsibility: 'Client provides media assets, branding & copy; developer accounts paid directly to Apple/Google.',
    ownership: 'Full source code, build configuration & repository transfer at completion.',
    techStack: 'Flutter / React Native',
    ctaText: 'Start with Starter',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Mobile App project (₹1,50,000 – ₹3,00,000 scope).',
  },
  {
    id: 'standard-mobile',
    tierCode: 'TIER-MOB-02',
    name: 'Standard',
    buildType: 'Cross-platform + custom backend',
    complexityBars: 2,
    bestFor: 'Business app needing accounts, payments, admin',
    priceRange: '₹3,00,000 – ₹7,00,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'Screens included', value: '8–20 screens' },
      { label: 'Platforms', value: 'iOS + Android' },
      { label: 'Delivery timeline', value: '8–12 weeks' },
      { label: 'Bug-fix support', value: '30–45 days' },
    ],
    functionality: [
      'User accounts & authentication management',
      'Payment gateway integration & checkout processing',
      'Admin dashboard for data & user management',
      'Push notifications & in-app event analytics',
      'Offline data caching & background data synchronization',
    ],
    revisions: '3 rounds',
    timeline: '8–12 weeks',
    postLaunchSupport: '30–45 days of included bug-fix support',
    contentResponsibility: 'Client provides core branding & workflows; API documentation & schemas prepared by studio.',
    ownership: 'Full source code, custom backend API & database architecture handed over.',
    techStack: 'Flutter / React Native + Node.js backend',
    ctaText: 'Start with Standard',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Mobile App project (₹3,00,000 – ₹7,00,000 scope).',
  },
  {
    id: 'advanced-mobile',
    tierCode: 'TIER-MOB-03',
    name: 'Advanced',
    buildType: 'Fully custom, complex architecture',
    complexityBars: 3,
    bestFor: 'Multi-role platforms, real-time data, scale needs',
    priceRange: '₹8,00,000 – ₹20,00,000+',
    priceUnit: 'Milestone billing quote',
    keySpecs: [
      { label: 'Screens included', value: '20+ screens, modular' },
      { label: 'Platforms', value: 'iOS + Android (native opt)' },
      { label: 'Delivery timeline', value: '16–24 weeks' },
      { label: 'Bug-fix support', value: '60–90 days' },
    ],
    functionality: [
      'Real-time synchronization & live socket connections',
      'Custom role-based permissions (customer / staff / admin)',
      'Third-party API & CRM/ERP data integration',
      'Advanced security hardening, biometrics & data encryption',
      'Automated testing suites & CI/CD deployment pipelines',
    ],
    revisions: '4 rounds',
    timeline: '16–24 weeks',
    postLaunchSupport: '60–90 days of included bug-fix support',
    contentResponsibility: 'Full technical architecture & sprint planning included; assets coordinated in milestones.',
    ownership: '100% source code, microservice deployment keys & store assets transferred at completion.',
    techStack: 'Native (Swift/Kotlin) or React Native + custom microservices',
    ctaText: 'Start with Advanced',
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Mobile App project (₹8,00,000 – ₹20,00,000+ scope).',
  },
]

/* ── Business Software & Ops Portals 3-Tier Data (SRV-04) ── */
const SOFTWARE_TIERS: TierData[] = [
  {
    id: 'starter-software',
    tierCode: 'TIER-SOFT-01',
    name: 'Starter',
    buildType: 'Single-workflow internal tool',
    complexityBars: 1,
    bestFor: 'Automating one specific process (e.g. leave management, simple CRM)',
    priceRange: '₹2,50,000 – ₹6,00,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'User roles', value: '1–2 roles' },
      { label: 'Delivery timeline', value: '4–8 weeks' },
      { label: 'Bug-fix support', value: '30 days' },
      { label: 'Revision rounds', value: '2 rounds' },
    ],
    functionality: [
      'Core workflow & operational process automation',
      'Basic dashboard view & activity tracking',
      'Structured data entry forms & input validation checks',
      'Standard email alerts & status change notifications',
    ],
    revisions: '2 rounds',
    timeline: '4–8 weeks',
    postLaunchSupport: '30 days of included bug-fix support',
    contentResponsibility: 'Client provides operational business logic, form schemas & staff directory.',
    ownership: '100% source code, database architecture & deployment keys handed over.',
    techStack: 'React / Next.js frontend + lightweight backend',
    ctaText: 'Start with Starter',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Business Software project (₹2,50,000 – ₹6,00,000 scope).',
  },
  {
    id: 'standard-software',
    tierCode: 'TIER-SOFT-02',
    name: 'Standard',
    buildType: 'Multi-role business application',
    complexityBars: 2,
    bestFor: 'Businesses needing role-based access, payments, integrations',
    priceRange: '₹6,00,000 – ₹18,00,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'User roles', value: '3–4 roles (tiered)' },
      { label: 'Delivery timeline', value: '8–14 weeks' },
      { label: 'Bug-fix support', value: '45 days' },
      { label: 'Revision rounds', value: '3 rounds' },
    ],
    functionality: [
      'Role-based dashboards & staff permission tiers',
      'Payment gateway & automated billing integration',
      'Third-party API, accounting & messaging integrations',
      'Custom reporting, business analytics & data exports (CSV/Excel)',
      'Audit logging & operational change history tracking',
    ],
    revisions: '3 rounds',
    timeline: '8–14 weeks',
    postLaunchSupport: '45 days of included bug-fix support',
    contentResponsibility: 'Client provides permission matrix, accounting rules & system credentials.',
    ownership: '100% source code, database schema & server infrastructure transferred.',
    techStack: 'React / Next.js + Node.js/Python backend, PostgreSQL/MySQL',
    ctaText: 'Start with Standard',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Business Software project (₹6,00,000 – ₹18,00,000 scope).',
  },
  {
    id: 'advanced-software',
    tierCode: 'TIER-SOFT-03',
    name: 'Advanced',
    buildType: 'Enterprise operations platform',
    complexityBars: 3,
    bestFor: 'Complex operations needing ERP integration, compliance tracking',
    priceRange: '₹18,00,000 – ₹50,00,000+',
    priceUnit: 'Milestone billing quote',
    keySpecs: [
      { label: 'User roles', value: '5+ roles (granular)' },
      { label: 'Delivery timeline', value: '14–24 weeks' },
      { label: 'Bug-fix support', value: '60–90 days' },
      { label: 'Revision rounds', value: '4 rounds' },
    ],
    functionality: [
      'Deep ERP / CRM bi-directional synchronization',
      'Automated compliance tracking, audit trails & SLA monitors',
      'Multi-tenant or multi-branch operational architecture',
      'Custom API layer for internal and external tool ecosystem',
      'Advanced enterprise security, SSO, encryption & automated backups',
    ],
    revisions: '4 rounds',
    timeline: '14–24 weeks',
    postLaunchSupport: '60–90 days of included bug-fix support',
    contentResponsibility: 'Full system architecture consultation & data schema mapping included in sprints.',
    ownership: '100% intellectual property, full code repository & cloud architecture ownership.',
    techStack: 'Custom microservices, cloud-native infra, dedicated database architecture',
    ctaText: 'Start with Advanced',
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Business Software project (₹18,00,000 – ₹50,00,000+ scope).',
  },
]

/* ── Custom Platform & Multi-Sided Systems 3-Tier Data (SRV-05) ── */
const PLATFORM_TIERS: TierData[] = [
  {
    id: 'starter-platform',
    tierCode: 'TIER-PLAT-01',
    name: 'Starter',
    buildType: 'MVP multi-sided architecture',
    complexityBars: 1,
    bestFor: 'Validating a marketplace/platform idea with core roles',
    priceRange: '₹6,00,000 – ₹15,00,000',
    priceUnit: 'Fixed scope quote',
    keySpecs: [
      { label: 'User roles', value: '2–3 roles (Buyer, Vendor, Admin)' },
      { label: 'Delivery timeline', value: '8–12 weeks' },
      { label: 'Bug-fix support', value: '30 days' },
      { label: 'Revision rounds', value: '2 rounds' },
    ],
    functionality: [
      'Vendor registration & onboarding workflow',
      'Basic listing management & search browsing',
      'Single payment split & gateway integration',
      'Admin moderation panel & dispute flags',
    ],
    revisions: '2 rounds',
    timeline: '8–12 weeks',
    postLaunchSupport: '30 days of included bug-fix support',
    contentResponsibility: 'Client provides marketplace transaction models, commission rules & onboarding requirements.',
    ownership: 'Full source code, backend APIs & cloud hosting configs transferred at completion.',
    techStack: 'React / Next.js + Node.js, managed cloud hosting',
    ctaText: 'Start with Starter',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Custom Platform project (₹6,00,000 – ₹15,00,000 scope).',
  },
  {
    id: 'standard-platform',
    tierCode: 'TIER-PLAT-02',
    name: 'Standard',
    buildType: 'Production-grade multi-vendor/multi-location system',
    complexityBars: 2,
    bestFor: 'A live platform ready to scale operations',
    priceRange: '₹15,00,000 – ₹35,00,000',
    priceUnit: 'Milestone billing quote',
    keySpecs: [
      { label: 'User roles', value: '3–5 roles (granular)' },
      { label: 'Delivery timeline', value: '14–20 weeks' },
      { label: 'Bug-fix support', value: '60 days' },
      { label: 'Revision rounds', value: '3 rounds' },
    ],
    functionality: [
      'Dedicated vendor management dashboards & metrics',
      'Automated multi-tier commission & payout distribution',
      'In-app dispute resolution & communication workflow',
      'Custom analytics dashboards & transaction export engine',
      'Automated notifications via push, SMS, email & WhatsApp',
    ],
    revisions: '3 rounds',
    timeline: '14–20 weeks',
    postLaunchSupport: '60 days of included bug-fix support',
    contentResponsibility: 'Client provides operational workflows & compliance parameters; architecture designed by studio.',
    ownership: '100% intellectual property, custom microservices & database clusters handed over.',
    techStack: 'Custom backend + scalable cloud infra (AWS/GCP)',
    ctaText: 'Start with Standard',
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Custom Platform project (₹15,00,000 – ₹35,00,000 scope).',
  },
  {
    id: 'advanced-platform',
    tierCode: 'TIER-PLAT-03',
    name: 'Advanced',
    buildType: 'Enterprise-grade distributed platform',
    complexityBars: 3,
    bestFor: 'Large-scale marketplaces, ERP-integrated, multi-tenant SaaS',
    priceRange: '₹35,00,000 – ₹80,00,000+',
    priceUnit: 'Milestone billing quote',
    keySpecs: [
      { label: 'User roles', value: 'Modular / Unlimited' },
      { label: 'Delivery timeline', value: '20–32 weeks' },
      { label: 'Bug-fix support', value: '90 days' },
      { label: 'Revision rounds', value: '4 rounds' },
    ],
    functionality: [
      'Enterprise ERP, CRM & automated warehouse integrations',
      'Custom REST/GraphQL API layer for external partner access',
      'Real-time high-concurrency data pipelines & event streaming',
      'Advanced enterprise security, role matrix & audit compliance',
      'Multi-region redundancy, automated failover & CI/CD deployment',
    ],
    revisions: '4 rounds',
    timeline: '20–32 weeks',
    postLaunchSupport: '90 days of included bug-fix support',
    contentResponsibility: 'Discovery sprint & end-to-end technical blueprints included prior to build milestones.',
    ownership: '100% intellectual property, full code repository & cloud architecture ownership.',
    techStack: 'Distributed microservices, message queues, dedicated cloud architecture',
    ctaText: 'Start with Advanced',
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Custom Platform project (₹35,00,000 – ₹80,00,000+ scope).',
  },
]

const PRICE_FACTORS = [
  { code: '01', title: 'Functionality Scope', description: 'What the software executes — from static endpoints to state machines and transaction flows.' },
  { code: '02', title: 'User Roles & Access', description: 'Number of distinct permission interfaces — customer, field agent, branch manager, super admin.' },
  { code: '03', title: 'Platform Targets', description: 'Web desktop, responsive mobile web, native Android, native iOS, or multi-platform systems.' },
  { code: '04', title: 'Third-Party APIs', description: 'Payment gateways, WhatsApp Business API, CRM, ERP, mapping, or bidirectional webhooks.' },
  { code: '05', title: 'Business Logic Rules', description: 'The depth of validation rules, conditional automation, and data integrity checks.' },
  { code: '06', title: 'Data Architecture', description: 'Volume of records, relational schema complexity, migration needs, or legacy database bridging.' },
  { code: '07', title: 'Location Topology', description: 'Single location deployment vs. multi-branch, multi-region operational hierarchies.' },
  { code: '08', title: 'Sprint Cadence', description: 'Standard sprint cadence vs. dedicated accelerated timeline engineering capacity.' },
]

const PRICING_STEPS = [
  { step: '01', title: 'Operational Discovery', description: 'We map your actual daily business workflows, inputs, outputs, and system dependencies.' },
  { step: '02', title: 'Technical Specification', description: 'We draft exact data models, user roles, interface scopes, and API integration boundaries.' },
  { step: '03', title: 'Boundaries & Exclusions', description: 'Deliverables and boundaries are explicitly defined in writing with zero hidden assumptions.' },
  { step: '04', title: 'Fixed-Price Milestone Spec', description: 'You receive a transparent price quote paired with structured sprint delivery milestones.' },
  { step: '05', title: 'Engineering & Handover', description: 'We build in reviewable sprints, verify quality, launch, and transfer 100% source code ownership.' },
]

const PROJECT_FEE_COVERS = [
  { label: 'Technical Architecture', detail: 'System blueprints, database schemas, and interface workflows.' },
  { label: 'Bespoke UI/UX Engineering', detail: 'User interfaces and component systems designed for your brand.' },
  { label: 'Software Engineering', detail: 'Writing clean, documented, maintainable code for all agreed scope.' },
  { label: 'Integration Layer', detail: 'Configuring APIs, payment gateways, messaging services, and webhooks.' },
  { label: 'Quality Assurance', detail: 'Multi-device, cross-browser automated & manual regression testing.' },
  { label: 'Production Deployment', detail: 'Configuring servers, SSL certificates, DNS records, and launch pipelines.' },
  { label: 'Source Code Handover', detail: 'Transferring Git repositories, production keys, and admin credentials.' },
  { label: 'Operational Manuals', detail: 'Technical documentation for managing, running, and extending the software.' },
]

const CLIENT_OWNED_SERVICES = [
  { item: 'Domain Registration', range: '₹800–₹2,000 / year' },
  { item: 'Server Infrastructure / Hosting', range: '₹3,000–₹30,000 / year' },
  { item: 'Payment Gateway Processing', range: 'Billed per transaction by gateway' },
  { item: 'WhatsApp Business API Usage', range: 'Billed per conversation by Meta/provider' },
  { item: 'Transactional Email (Resend/SendGrid)', range: 'Billed by volume by email provider' },
  { item: 'Apple Developer Account', range: '$99 / year directly to Apple' },
  { item: 'Google Play Developer Account', range: '$25 one-time directly to Google' },
  { item: 'Third-Party SaaS Subscriptions', range: 'Billed directly by respective vendors' },
]

const ENGAGEMENT_MODELS = [
  {
    code: 'MOD-01',
    name: 'Fixed-Scope Project',
    tagline: 'SPEC → SPRINT → LAUNCH → HANDOVER',
    description: 'For organizations that need a defined software release engineered and delivered with 100% code custody.',
    includes: ['Explicit scope & fixed price', 'Sprint-based review builds', 'Quality verification', 'Production release', 'Complete Git repository transfer'],
  },
  {
    code: 'MOD-02',
    name: 'Engineering Retainer',
    tagline: 'MAINTAIN → OPTIMIZE → ITERATE',
    description: 'For companies requiring guaranteed developer bandwidth for ongoing feature iterations, performance tuning, and operational patches.',
    includes: [
      'Allocated sprint engineering hours',
      'Priority defect resolution & security updates',
      'Iterative workflow expansion',
      'System health & backup monitoring',
      'Direct developer-to-client communication',
    ],
    note: 'Retainer capacity is calibrated against monthly operational velocity.',
  },
  {
    code: 'MOD-03',
    name: 'Discovery & Spec Sprint',
    tagline: 'RESEARCH → BLUEPRINT → FIXED SPEC',
    description: 'For complex multi-user platforms or operational software requiring architectural mapping prior to code commitment.',
    includes: [
      'Technical architecture document',
      'Relational database ERD & state diagrams',
      'User role & permission matrix',
      'Firm fixed-price build proposal',
      '100% fee credited toward development',
    ],
  },
]

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

  return (
    <div className="flex flex-col justify-between bg-white p-6 sm:p-7 transition-colors duration-200">
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-slate-400 font-mono text-[10px] tracking-wider font-medium">{tier.tierCode}</span>
          <div className="flex items-center gap-1.5 font-sans text-xs text-slate-500">
            <span className="text-[11px]">Complexity:</span>
            <div className="flex gap-0.5" aria-label={`Scope complexity: Level ${tier.complexityBars} of 3`}>
              {[1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className={`h-2 w-2 rounded-xs ${
                    bar <= tier.complexityBars
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tier Header */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <h4 className="text-xl font-bold font-sans tracking-tight text-slate-950">
              {tier.name}
            </h4>
            <span className="font-sans text-xs font-medium text-slate-600">
              {tier.buildType}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-[3rem] font-sans">
            {tier.bestFor}
          </p>
        </div>

        {/* Price Specification (Anchor Element) */}
        <div className="mt-5 border-y border-slate-200 bg-slate-50/70 py-4 px-4 -mx-1">
          <div className="font-sans text-xs font-medium text-slate-500 uppercase tracking-wider">
            Fixed-scope price range
          </div>
          <div className="mt-1 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            {tier.priceRange}
          </div>
          <div className="mt-0.5 font-sans text-xs text-slate-500">
            {tier.priceUnit} · 100% code ownership
          </div>
        </div>

        {/* Key Quantitative Data Grid */}
        <div className="mt-5 grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-xs overflow-hidden text-xs">
          {tier.keySpecs.map((spec) => (
            <div key={spec.label} className="bg-white p-2.5">
              <span className="font-sans text-[11px] font-medium text-slate-500 block">
                {spec.label}
              </span>
              <span className="font-mono font-semibold text-slate-900 text-xs block mt-0.5">
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
              className="flex w-full items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-sans text-xs font-bold py-3 px-4 rounded-xs transition-colors"
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

                {/* 3. Revisions, Warranty & Content */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span className="font-medium">Revision rounds:</span>
                    <span className="text-slate-900 font-mono font-semibold">{tier.revisions}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="font-medium">Delivery timeline:</span>
                    <span className="text-slate-900 font-mono font-semibold">{tier.timeline}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="font-medium">Bug-fix support:</span>
                    <span className="text-slate-900 font-mono font-semibold">{tier.postLaunchSupport}</span>
                  </div>
                  <div className="pt-1 text-xs text-slate-500 leading-normal">
                    <strong className="text-slate-700 font-medium">Scope &amp; operations terms:</strong> {tier.contentResponsibility}
                  </div>
                  <div className="text-xs text-slate-800 font-medium flex items-center gap-1">
                    <KeyRound size={12} className="text-teal-600 shrink-0" />
                    <span>{tier.ownership}</span>
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

/* ── Main PricingTiers Component ── */
export function PricingTiers() {
  const [activeService, setActiveService] = useState<ServiceCategory>('website')
  const reduced = usePrefersReducedMotion()

  return (
    <div className="w-full font-sans text-slate-900">
      {/* ── Persistent Studio Notice (Engineering Positioning) ── */}
      <div className="mx-auto max-w-3xl mb-8">
        <div className="flex items-center justify-center gap-2 border border-slate-300 bg-slate-50 px-4 py-2.5 text-center font-sans text-xs text-slate-600">
          <Info size={14} className="text-slate-500 shrink-0" />
          <span>
            We're a technical studio, not a growth agency — pricing reflects build scope only, not business outcomes.
          </span>
        </div>
      </div>

      {/* ── Service Selector Matrix ── */}
      <div className="mb-10">
        <div className="flex items-center justify-center">
          <div className="inline-flex max-w-full flex-wrap justify-center border border-slate-300 bg-slate-100 p-1">
            {SERVICE_NAV.map((service) => {
              const isActive = activeService === service.id
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(service.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 font-sans text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{service.code}</span>
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
            <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-950">
              Website Development Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Scope-first tier comparison with fixed page bounds, explicit add-on rates, and defined deliverables.
            </p>
          </div>

          <div className="border border-slate-300 bg-slate-200 grid gap-px grid-cols-1 lg:grid-cols-3 shadow-xs">
            {WEBSITE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          <div className="border border-slate-300 bg-slate-50 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="text-slate-500 font-semibold shrink-0">Not included in project fee:</span>
              <p className="leading-relaxed text-slate-700">
                domain (₹800–₹2,000/yr), hosting (₹3,000–₹30,000/yr), third-party integration fees. We guide setup, but accounts are billed directly by the respective providers.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 bg-white p-4 font-sans text-xs text-slate-800">
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
            <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-950">
              E-Commerce Development Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Templated, semi-custom, and headless e-commerce store tiers with defined catalog limits and payment integration.
            </p>
          </div>

          <div className="border border-slate-300 bg-slate-200 grid gap-px grid-cols-1 lg:grid-cols-3 shadow-xs">
            {ECOMMERCE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          <div className="border border-slate-300 bg-amber-50/50 p-4 font-sans text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <span className="text-slate-900 font-semibold shrink-0">Platform costs (ongoing, separate from build fee):</span>
              <p className="leading-relaxed">
                Shopify — ₹1,499–₹2,400/month (Basic plan) + 2% transaction fee if using a third-party gateway (removed on ₹6,600/month plans and above). WooCommerce — no platform fee, but ₹2,000–₹15,000/year hosting + plugin renewals. Most stores also add 3–8 paid apps (reviews, email, cart recovery) at ₹3,000–₹15,000/month combined.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 bg-slate-50 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="text-slate-500 font-semibold shrink-0">Not included in project fee:</span>
              <p className="leading-relaxed text-slate-700">
                domain (₹800–₹2,000/yr), payment gateway transaction fees (per transaction), and third-party app subscriptions. We guide configuration, but accounts belong directly to your business.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 bg-white p-4 font-sans text-xs text-slate-800">
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
            <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-950">
              Mobile App Development Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Cross-platform and custom native mobile application tiers with explicit screen bounds and milestone billing.
            </p>
          </div>

          <div className="border border-slate-300 bg-slate-200 grid gap-px grid-cols-1 lg:grid-cols-3 shadow-xs">
            {MOBILE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          <div className="border border-slate-300 bg-slate-50 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="text-slate-500 font-semibold shrink-0">Not included in project fee:</span>
              <p className="leading-relaxed text-slate-700">
                Apple Developer account ($99/yr paid to Apple), Google Play Developer account ($25 one-time paid to Google), cloud backend servers (AWS/GCP/DigitalOcean), and paid third-party API consumption.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 bg-white p-4 font-sans text-xs text-slate-800">
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
            <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-950">
              Business Software &amp; Ops Portals Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Custom internal tools, workflow automation, and operations platforms engineered around your company's daily processes.
            </p>
          </div>

          <div className="border border-slate-300 bg-slate-200 grid gap-px grid-cols-1 lg:grid-cols-3 shadow-xs">
            {SOFTWARE_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          <div className="border border-slate-300 bg-slate-50 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="text-slate-500 font-semibold shrink-0">Not included in project fee:</span>
              <p className="leading-relaxed text-slate-700">
                Cloud infrastructure servers (AWS / GCP / DigitalOcean / Supabase), third-party transactional email / WhatsApp API usage, and corporate SaaS tool subscriptions. We set up accounts in your name with 100% direct client ownership.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 bg-white p-4 font-sans text-xs text-slate-800">
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
            <h3 className="text-2xl font-bold font-sans tracking-tight text-slate-950">
              Custom Platform &amp; Multi-Sided Systems Scope &amp; Pricing
            </h3>
            <p className="mt-1.5 font-sans text-xs text-slate-600">
              Multi-role marketplaces, multi-vendor ecosystems, and high-concurrency platforms delivered through structured engineering sprints.
            </p>
          </div>

          <div className="border border-slate-300 bg-slate-200 grid gap-px grid-cols-1 lg:grid-cols-3 shadow-xs">
            {PLATFORM_TIERS.map((tier) => (
              <TechnicalDatasheetCard key={tier.id} tier={tier} reduced={reduced} />
            ))}
          </div>

          <div className="border border-slate-300 bg-slate-50 p-4 font-sans text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="text-slate-500 font-semibold shrink-0">Not included in project fee:</span>
              <p className="leading-relaxed text-slate-700">
                Scalable cloud hosting infrastructure (AWS / GCP / Cloudflare / database clusters), third-party verification/KYC APIs, and payment gateway escrow/split processing fees. All accounts are configured under 100% direct client custody.
              </p>
            </div>
          </div>

          <div className="border border-slate-300 bg-white p-4 font-sans text-xs text-slate-800">
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
          <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-slate-950">
            Why does software pricing vary?
          </h3>
          <p className="mt-2 font-mono text-xs text-slate-600 leading-relaxed">
            PRICE = f(FUNCTIONALITY, DATA_SCHEMA, USER_ROLES, INTEGRATIONS, LATENCY_SLAs)
          </p>
        </div>

        <div className="border border-slate-300 bg-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px shadow-xs">
          {PRICE_FACTORS.map((factor) => (
            <div
              key={factor.code}
              className="bg-white p-5 sm:p-6 transition-colors hover:bg-slate-50"
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
              className="border border-slate-300 bg-white p-6 shadow-xs flex flex-col justify-between"
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
