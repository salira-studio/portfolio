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

/* ── Service Definitions ── */
export type ServiceCategory = 'website' | 'ecommerce' | 'mobile' | 'software' | 'platform'

interface ServiceNavOption {
  id: ServiceCategory
  code: string
  label: string
  specSummary: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const SERVICE_NAV: ServiceNavOption[] = [
  { id: 'website', code: 'SRV-01', label: 'Custom Website', specSummary: 'Marketing, corporate & portal builds', icon: Globe },
  { id: 'ecommerce', code: 'SRV-02', label: 'E-Commerce', specSummary: 'Product catalog & transactional carts', icon: ShoppingBag },
  { id: 'mobile', code: 'SRV-03', label: 'Mobile App', specSummary: 'iOS & Android native/cross-platform', icon: Smartphone },
  { id: 'software', code: 'SRV-04', label: 'Business Software', specSummary: 'Internal ops portals & data tools', icon: LayoutDashboard },
  { id: 'platform', code: 'SRV-05', label: 'Custom Platform', specSummary: 'Multi-sided distributed systems', icon: Cpu },
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
  typicalRange?: string
  priceUnit: string
  isHighlighted?: boolean
  badgeText?: string
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
    priceRange: 'Starting at ₹25,000',
    typicalRange: 'Typical projects: ₹30,000 – ₹40,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Website project (Starting at ₹25,000 scope).',
  },
  {
    id: 'standard',
    tierCode: 'TIER-WEB-02',
    name: 'Standard',
    buildType: 'Semi-custom',
    complexityBars: 2,
    isHighlighted: true,
    badgeText: 'Most Chosen',
    bestFor: 'Growing service firms, B2B companies, or established businesses requiring bespoke UI design and dynamic content.',
    priceRange: 'Starting at ₹55,000',
    typicalRange: 'Typical projects: ₹65,000 – ₹85,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Website project (Starting at ₹55,000 scope).',
  },
  {
    id: 'advanced',
    tierCode: 'TIER-WEB-03',
    name: 'Advanced',
    buildType: 'Fully custom',
    complexityBars: 3,
    bestFor: 'Organizations with specialized workflows, client portals, high-traffic portals, API integrations, or multi-user needs.',
    priceRange: 'Starting at ₹1,30,000',
    typicalRange: 'Typical projects: ₹1,50,000 – ₹2,20,000+',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Website project (Starting at ₹1,30,000 scope).',
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
    priceRange: 'Starting at ₹50,000',
    typicalRange: 'Typical projects: ₹65,000 – ₹95,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter E-Commerce project (Starting at ₹50,000 scope).',
  },
  {
    id: 'standard-ecom',
    tierCode: 'TIER-ECOM-02',
    name: 'Standard',
    buildType: 'Semi-custom design on Shopify/WooCommerce',
    complexityBars: 2,
    isHighlighted: true,
    badgeText: 'Most Chosen',
    bestFor: 'Growing brand needing custom design + integrations',
    priceRange: 'Starting at ₹1,50,000',
    typicalRange: 'Typical projects: ₹2,00,000 – ₹3,20,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard E-Commerce project (Starting at ₹1,50,000 scope).',
  },
  {
    id: 'advanced-ecom',
    tierCode: 'TIER-ECOM-03',
    name: 'Advanced',
    buildType: 'Fully custom / multi-vendor architecture',
    complexityBars: 3,
    bestFor: 'Multi-vendor marketplace, ERP/CRM sync, high-traffic scale',
    priceRange: 'Starting at ₹5,00,000',
    typicalRange: 'Typical projects: ₹6,50,000 – ₹12,00,000+',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced E-Commerce project (Starting at ₹5,00,000+ scope).',
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
    priceRange: 'Starting at ₹1,50,000',
    typicalRange: 'Typical projects: ₹1,80,000 – ₹2,40,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Mobile App project (Starting at ₹1,50,000 scope).',
  },
  {
    id: 'standard-mobile',
    tierCode: 'TIER-MOB-02',
    name: 'Standard',
    buildType: 'Cross-platform + custom backend',
    complexityBars: 2,
    isHighlighted: true,
    badgeText: 'Most Chosen',
    bestFor: 'Business app needing accounts, payments, admin',
    priceRange: 'Starting at ₹3,00,000',
    typicalRange: 'Typical projects: ₹3,80,000 – ₹5,20,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Mobile App project (Starting at ₹3,00,000 scope).',
  },
  {
    id: 'advanced-mobile',
    tierCode: 'TIER-MOB-03',
    name: 'Advanced',
    buildType: 'Fully custom, complex architecture',
    complexityBars: 3,
    bestFor: 'Multi-role platforms, real-time data, scale needs',
    priceRange: 'Starting at ₹8,00,000',
    typicalRange: 'Typical projects: ₹9,50,000 – ₹15,00,000+',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Mobile App project (Starting at ₹8,00,000+ scope).',
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
    priceRange: 'Starting at ₹2,50,000',
    typicalRange: 'Typical projects: ₹3,00,000 – ₹4,50,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Business Software project (Starting at ₹2,50,000 scope).',
  },
  {
    id: 'standard-software',
    tierCode: 'TIER-SOFT-02',
    name: 'Standard',
    buildType: 'Multi-role business application',
    complexityBars: 2,
    isHighlighted: true,
    badgeText: 'Most Chosen',
    bestFor: 'Businesses needing role-based access, payments, integrations',
    priceRange: 'Starting at ₹6,00,000',
    typicalRange: 'Typical projects: ₹7,50,000 – ₹12,00,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Business Software project (Starting at ₹6,00,000 scope).',
  },
  {
    id: 'advanced-software',
    tierCode: 'TIER-SOFT-03',
    name: 'Advanced',
    buildType: 'Enterprise operations platform',
    complexityBars: 3,
    bestFor: 'Complex operations needing ERP integration, compliance tracking',
    priceRange: 'Starting at ₹18,00,000',
    typicalRange: 'Typical projects: ₹22,00,000 – ₹35,00,000+',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Business Software project (Starting at ₹18,00,000+ scope).',
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
    priceRange: 'Starting at ₹6,00,000',
    typicalRange: 'Typical projects: ₹7,50,000 – ₹10,50,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Starter Custom Platform project (Starting at ₹6,00,000 scope).',
  },
  {
    id: 'standard-platform',
    tierCode: 'TIER-PLAT-02',
    name: 'Standard',
    buildType: 'Production-grade multi-vendor/multi-location system',
    complexityBars: 2,
    isHighlighted: true,
    badgeText: 'Most Chosen',
    bestFor: 'A live platform ready to scale operations',
    priceRange: 'Starting at ₹15,00,000',
    typicalRange: 'Typical projects: ₹18,00,000 – ₹26,00,000',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss a Standard Custom Platform project (Starting at ₹15,00,000 scope).',
  },
  {
    id: 'advanced-platform',
    tierCode: 'TIER-PLAT-03',
    name: 'Advanced',
    buildType: 'Enterprise-grade distributed platform',
    complexityBars: 3,
    bestFor: 'Large-scale marketplaces, ERP-integrated, multi-tenant SaaS',
    priceRange: 'Starting at ₹35,00,000',
    typicalRange: 'Typical projects: ₹42,00,000 – ₹60,00,000+',
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
    ctaMessage: 'Hi SaLira Studio, I want to discuss an Advanced Custom Platform project (Starting at ₹35,00,000+ scope).',
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
            Development fee · Fixed scope · 100% code ownership
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
const MAINTENANCE_PLANS = [
  {
    title: 'Essential Care',
    monthly: '₹1,500',
    annual: '₹15,000',
    bestFor: 'Static websites, landing pages and low-maintenance sites.',
    dotColor: 'bg-teal-500',
    borderColor: 'border-t-teal-500',
    recommendedFor: ['website'],
    includes: [
      'Security & dependency updates',
      'Backup monitoring',
      'Uptime monitoring',
      'Minor bug fixes',
      'Basic technical support',
    ],
  },
  {
    title: 'Business Care',
    monthly: '₹3,500',
    annual: '₹35,000',
    bestFor: 'Dynamic business websites, CMS sites and sites with regular updates.',
    dotColor: 'bg-amber-500',
    borderColor: 'border-t-amber-500',
    recommendedFor: ['website', 'ecommerce'],
    includes: [
      'Security updates',
      'Backup monitoring',
      'Performance monitoring',
      'Content & technical updates',
      'Minor bug fixes',
      'Priority support',
    ],
  },
  {
    title: 'Advanced Care',
    monthly: '₹7,500',
    annual: '₹75,000',
    bestFor: 'Portals, API-integrated sites and feature-rich applications.',
    dotColor: 'bg-rose-500',
    borderColor: 'border-t-rose-500',
    recommendedFor: ['ecommerce', 'mobile', 'software'],
    includes: [
      'Security monitoring',
      'Database maintenance',
      'API monitoring',
      'Performance optimization',
      'Backup & recovery support',
      'Priority technical support',
      'Minor technical improvements',
    ],
  },
  {
    title: 'Enterprise Care',
    monthly: 'Custom pricing',
    annual: 'Custom pricing',
    bestFor: 'High-traffic platforms, SaaS, complex applications and mission-critical systems.',
    dotColor: 'bg-slate-700',
    borderColor: 'border-t-slate-700',
    recommendedFor: ['platform', 'software'],
    includes: ['Custom SLA & support plan tailored to your platform needs'],
  },
]

const SERVICE_MAINTENANCE_NOTES: Record<ServiceCategory, { label: string; plans: string; note: string }> = {
  website: {
    label: 'Custom Website',
    plans: 'Essential Care or Business Care',
    note: 'Static and brochure sites typically need minimal maintenance. Dynamic CMS websites benefit from Business Care for content updates and security patches.',
  },
  ecommerce: {
    label: 'E-Commerce',
    plans: 'Business Care or Advanced Care',
    note: 'Active stores need regular security updates, plugin/theme maintenance, payment gateway version checks, and performance monitoring to protect transactions.',
  },
  mobile: {
    label: 'Mobile App',
    plans: 'Advanced Care',
    note: 'Mobile apps require OS compatibility updates, push notification monitoring, API health checks, and App Store / Play Store version management.',
  },
  software: {
    label: 'Business Software',
    plans: 'Advanced Care or Enterprise Care',
    note: 'Ops portals and business software need database maintenance, API reliability monitoring, dependency updates, and role/permission audits to stay operational.',
  },
  platform: {
    label: 'Custom Platform',
    plans: 'Enterprise Care',
    note: 'Multi-sided platforms and SaaS systems require dedicated monitoring, automated failover checks, security incident response, and a custom SLA.',
  },
}

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
            We're a technical studio, not a growth agency — pricing reflects build scope only, not business outcomes.
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
