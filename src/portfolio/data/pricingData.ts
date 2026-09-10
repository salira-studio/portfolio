import type { LucideIcon } from 'lucide-react'

/* ── Service Definitions ── */
export type ServiceCategory = 'website' | 'ecommerce' | 'mobile' | 'software' | 'platform'

export interface ServiceNavOption {
  id: ServiceCategory
  code: string
  label: string
  specSummary: string
  /** Resolve icons from lucide-react in the component layer; null here for data purity. */
  icon: LucideIcon | null
}

/* ── Common Tier Interface for 3-Tier Views ── */
export interface TierData {
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
export const WEBSITE_TIERS: TierData[] = [
  {
    id: 'starter',
    tierCode: 'TIER-WEB-01',
    name: 'Starter',
    buildType: 'Template-based',
    complexityBars: 1,
    bestFor: 'Single-location businesses, consultants, or professional practices requiring an authoritative web presence.',
    priceRange: '₹25,000 – ₹45,000',
    typicalRange: 'Typical projects: ₹30,000 – ₹40,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹55,000 – ₹1,10,000',
    typicalRange: 'Typical projects: ₹65,000 – ₹85,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹1,30,000 – ₹2,80,000+',
    typicalRange: 'Typical projects: ₹1,50,000 – ₹2,20,000+',
    priceUnit: 'Milestone billing quote · 100% code ownership',
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
export const ECOMMERCE_TIERS: TierData[] = [
  {
    id: 'starter-ecom',
    tierCode: 'TIER-ECOM-01',
    name: 'Starter',
    buildType: 'Templated Shopify/WooCommerce store',
    complexityBars: 1,
    bestFor: 'First online store, simple catalog',
    priceRange: '₹50,000 – ₹1,50,000',
    typicalRange: 'Typical projects: ₹65,000 – ₹95,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹1,50,000 – ₹5,00,000',
    typicalRange: 'Typical projects: ₹2,00,000 – ₹3,20,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹5,00,000 – ₹20,00,000+',
    typicalRange: 'Typical projects: ₹6,50,000 – ₹12,00,000+',
    priceUnit: 'Milestone billing quote · 100% code ownership',
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
export const MOBILE_TIERS: TierData[] = [
  {
    id: 'starter-mobile',
    tierCode: 'TIER-MOB-01',
    name: 'Starter',
    buildType: 'Cross-platform, single codebase',
    complexityBars: 1,
    bestFor: 'Testing an idea, simple customer-facing app',
    priceRange: '₹1,50,000 – ₹3,00,000',
    typicalRange: 'Typical projects: ₹1,80,000 – ₹2,40,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹3,00,000 – ₹7,00,000',
    typicalRange: 'Typical projects: ₹3,80,000 – ₹5,20,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹8,00,000 – ₹20,00,000+',
    typicalRange: 'Typical projects: ₹9,50,000 – ₹15,00,000+',
    priceUnit: 'Milestone billing quote · 100% code ownership',
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
export const SOFTWARE_TIERS: TierData[] = [
  {
    id: 'starter-software',
    tierCode: 'TIER-SOFT-01',
    name: 'Starter',
    buildType: 'Single-workflow internal tool',
    complexityBars: 1,
    bestFor: 'Automating one specific process (e.g. leave management, simple CRM)',
    priceRange: '₹2,50,000 – ₹6,00,000',
    typicalRange: 'Typical projects: ₹3,00,000 – ₹4,50,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹6,00,000 – ₹18,00,000',
    typicalRange: 'Typical projects: ₹7,50,000 – ₹12,00,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹18,00,000 – ₹50,00,000+',
    typicalRange: 'Typical projects: ₹22,00,000 – ₹35,00,000+',
    priceUnit: 'Milestone billing quote · 100% code ownership',
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
export const PLATFORM_TIERS: TierData[] = [
  {
    id: 'starter-platform',
    tierCode: 'TIER-PLAT-01',
    name: 'Starter',
    buildType: 'MVP multi-sided architecture',
    complexityBars: 1,
    bestFor: 'Validating a marketplace/platform idea with core roles',
    priceRange: '₹6,00,000 – ₹15,00,000',
    typicalRange: 'Typical projects: ₹7,50,000 – ₹10,50,000',
    priceUnit: 'Fixed scope quote · 100% code ownership',
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
    priceRange: '₹15,00,000 – ₹35,00,000',
    typicalRange: 'Typical projects: ₹18,00,000 – ₹26,00,000',
    priceUnit: 'Milestone billing quote · 100% code ownership',
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
    priceRange: '₹35,00,000 – ₹80,00,000+',
    typicalRange: 'Typical projects: ₹42,00,000 – ₹60,00,000+',
    priceUnit: 'Milestone billing quote · 100% code ownership',
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

export const PRICE_FACTORS = [
  { code: '01', title: 'Functionality Scope', description: 'What the software executes — from static endpoints to state machines and transaction flows.' },
  { code: '02', title: 'User Roles & Access', description: 'Number of distinct permission interfaces — customer, field agent, branch manager, super admin.' },
  { code: '03', title: 'Platform Targets', description: 'Web desktop, responsive mobile web, native Android, native iOS, or multi-platform systems.' },
  { code: '04', title: 'Third-Party APIs', description: 'Payment gateways, WhatsApp Business API, CRM, ERP, mapping, or bidirectional webhooks.' },
  { code: '05', title: 'Business Logic Rules', description: 'The depth of validation rules, conditional automation, and data integrity checks.' },
  { code: '06', title: 'Data Architecture', description: 'Volume of records, relational schema complexity, migration needs, or legacy database bridging.' },
  { code: '07', title: 'Location Topology', description: 'Single location deployment vs. multi-branch, multi-region operational hierarchies.' },
  { code: '08', title: 'Sprint Cadence', description: 'Standard sprint cadence vs. dedicated accelerated timeline engineering capacity.' },
]

export const PRICING_STEPS = [
  { step: '01', title: 'Operational Discovery', description: 'We map your actual daily business workflows, inputs, outputs, and system dependencies.' },
  { step: '02', title: 'Technical Specification', description: 'We draft exact data models, user roles, interface scopes, and API integration boundaries.' },
  { step: '03', title: 'Boundaries & Exclusions', description: 'Deliverables and boundaries are explicitly defined in writing with zero hidden assumptions.' },
  { step: '04', title: 'Fixed-Price Milestone Spec', description: 'You receive a transparent price quote paired with structured sprint delivery milestones.' },
  { step: '05', title: 'Engineering & Handover', description: 'We build in reviewable sprints, verify quality, launch, and transfer 100% source code ownership.' },
]

export const PROJECT_FEE_COVERS = [
  { label: 'Technical Architecture', detail: 'System blueprints, database schemas, and interface workflows.' },
  { label: 'Bespoke UI/UX Engineering', detail: 'User interfaces and component systems designed for your brand.' },
  { label: 'Software Engineering', detail: 'Writing clean, documented, maintainable code for all agreed scope.' },
  { label: 'Integration Layer', detail: 'Configuring APIs, payment gateways, messaging services, and webhooks.' },
  { label: 'Quality Assurance', detail: 'Multi-device, cross-browser automated & manual regression testing.' },
  { label: 'Production Deployment', detail: 'Configuring servers, SSL certificates, DNS records, and launch pipelines.' },
  { label: 'Source Code Handover', detail: 'Transferring Git repositories, production keys, and admin credentials.' },
  { label: 'Operational Manuals', detail: 'Technical documentation for managing, running, and extending the software.' },
]

export const CLIENT_OWNED_SERVICES = [
  { item: 'Domain Registration', range: '₹800–₹2,000 / year' },
  { item: 'Server Infrastructure / Hosting', range: '₹3,000–₹30,000 / year' },
  { item: 'Payment Gateway Processing', range: 'Billed per transaction by gateway' },
  { item: 'WhatsApp Business API Usage', range: 'Billed per conversation by Meta/provider' },
  { item: 'Transactional Email (Resend/SendGrid)', range: 'Billed by volume by email provider' },
  { item: 'Apple Developer Account', range: '$99 / year directly to Apple' },
  { item: 'Google Play Developer Account', range: '$25 one-time directly to Google' },
  { item: 'Third-Party SaaS Subscriptions', range: 'Billed directly by respective vendors' },
]

export const ENGAGEMENT_MODELS = [
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

export const MAINTENANCE_PLANS = [
  {
    title: 'Essential Care',
    monthly: '₹1,500',
    annual: '₹15,000',
    bestFor: 'Static websites, landing pages and low-maintenance sites.',
    dotColor: 'bg-teal-500',
    borderColor: 'border-t-teal-500',
    recommendedFor: ['website'] as ServiceCategory[],
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
    recommendedFor: ['website', 'ecommerce'] as ServiceCategory[],
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
    recommendedFor: ['ecommerce', 'mobile', 'software'] as ServiceCategory[],
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
    recommendedFor: ['platform', 'software'] as ServiceCategory[],
    includes: ['Custom SLA & support plan tailored to your platform needs'],
  },
]

export const SERVICE_MAINTENANCE_NOTES: Record<ServiceCategory, { label: string; plans: string; note: string }> = {
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

/* ── Service Navigation ──
 * Icons are resolved from lucide-react in the component layer.
 * The icon field is null here; map it to the actual icon component when rendering.
 */
export const SERVICE_NAV: ServiceNavOption[] = [
  { id: 'website', code: 'SRV-01', label: 'Custom Website', specSummary: 'Marketing, corporate & portal builds', icon: null },
  { id: 'ecommerce', code: 'SRV-02', label: 'E-Commerce', specSummary: 'Product catalog & transactional carts', icon: null },
  { id: 'mobile', code: 'SRV-03', label: 'Mobile App', specSummary: 'iOS & Android native/cross-platform', icon: null },
  { id: 'software', code: 'SRV-04', label: 'Business Software', specSummary: 'Internal ops portals & data tools', icon: null },
  { id: 'platform', code: 'SRV-05', label: 'Custom Platform', specSummary: 'Multi-sided distributed systems', icon: null },
]
