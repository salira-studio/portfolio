import { useState } from 'react'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

/* ── Pricing Data ── */

interface PricingCategory {
  id: string
  name: string
  price: string
  tagline: string
  description: string
  examples: string[]
  typicalWork: string[]
  cta: string
  featured?: boolean
}

const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'website',
    name: 'Custom Website',
    price: 'From ₹25,000',
    tagline: 'For businesses that need a professional custom website.',
    description: 'A professional digital presence designed around your business.',
    examples: [
      'Company website',
      'Service business website',
      'Portfolio',
      'Restaurant website',
      'Informational website',
      'Custom customer-facing website',
    ],
    typicalWork: [
      'Structure and planning',
      'Custom design',
      'Website development',
      'Responsive implementation',
      'Forms and basic functionality',
      'Testing',
      'Deployment',
    ],
    cta: 'Explore Website Pricing',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    price: 'From ₹75,000',
    tagline: 'For businesses that need to sell products or services online.',
    description: 'Custom e-commerce solutions for businesses selling online.',
    examples: [
      'Product catalogue',
      'Categories',
      'Cart',
      'Checkout',
      'Customer accounts',
      'Orders',
      'Payments',
      'Admin management',
    ],
    typicalWork: [
      'Product catalogue setup',
      'Cart and checkout flows',
      'Payment gateway integration',
      'Customer accounts',
      'Order management',
      'Admin dashboard',
      'Inventory management',
      'Deployment',
    ],
    cta: 'Explore E-Commerce Pricing',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    price: 'From ₹2,00,000',
    tagline: 'Custom mobile applications for customers, staff or businesses.',
    description: 'Native or cross-platform mobile applications.',
    examples: [
      'Accounts',
      'Profiles',
      'Notifications',
      'Transactions',
      'Custom workflows',
      'Backend functionality',
      'Admin functionality',
    ],
    typicalWork: [
      'User accounts and profiles',
      'Push notifications',
      'Custom workflows',
      'Backend development',
      'Admin functionality',
      'App store submission',
      'Testing across devices',
      'Deployment',
    ],
    cta: 'Explore Mobile App Pricing',
  },
  {
    id: 'software',
    name: 'Business Software',
    price: 'From ₹3,00,000',
    tagline: 'Software that helps a business manage actual operations.',
    description: 'Custom software for internal business operations.',
    examples: [
      'Order management',
      'Inventory',
      'Customer management',
      'Staff management',
      'Booking',
      'Reporting',
      'Internal workflows',
      'Administration',
    ],
    typicalWork: [
      'Custom business workflows',
      'Staff/admin interface',
      'Data management',
      'User roles and permissions',
      'Dashboards and reports',
      'Notifications',
      'Required integrations',
      'Deployment',
    ],
    cta: 'Explore Business Software Pricing',
    featured: true,
  },
  {
    id: 'platform',
    name: 'Custom Platform',
    price: 'From ₹8,00,000+',
    tagline: 'For larger systems involving multiple user groups, applications, locations, complex workflows or integrations.',
    description: 'Complex systems with multiple workflows, user types, platforms or integrations.',
    examples: [
      'Customer + staff + admin systems',
      'Multi-location platforms',
      'Marketplace-like systems',
      'Complex operational platforms',
      'Multi-sided software',
    ],
    typicalWork: [
      'Multiple user experiences',
      'Complex business workflows',
      'Multi-location operations',
      'Third-party integrations',
      'Advanced automation',
      'Existing-system integration',
      'Data migration where required',
      'Long-term product development',
    ],
    cta: 'Start a Conversation',
  },
]

const PRICE_FACTORS = [
  {
    title: 'Functionality',
    description: 'What does the software need to do?',
  },
  {
    title: 'Users',
    description: 'Who needs to use it — customers, staff, managers, administrators, agents, etc.?',
  },
  {
    title: 'Platforms',
    description: 'Web, Android, iOS, admin systems, or multiple platforms?',
  },
  {
    title: 'Integrations',
    description: 'Payments, WhatsApp, maps, accounting, delivery systems, APIs, existing software, etc.',
  },
  {
    title: 'Complexity',
    description: 'How complicated are the workflows and business rules?',
  },
  {
    title: 'Data',
    description: 'Does existing data need to be imported or migrated?',
  },
  {
    title: 'Locations',
    description: 'Is it for one business/location or multiple branches?',
  },
  {
    title: 'Timeline',
    description: 'Standard delivery or accelerated? Rush timelines require more focused resource allocation.',
  },
]

const PRICING_STEPS = [
  {
    number: '01',
    title: 'Choose what you\'re building',
    description: 'Website / E-commerce / Mobile App / Business Software / Platform',
  },
  {
    number: '02',
    title: 'Define what it needs to do',
    description: 'Features, workflows and users',
  },
  {
    number: '03',
    title: 'Add the required complexity',
    description: 'Platforms, integrations, data, locations, etc.',
  },
  {
    number: '04',
    title: 'Define the project scope',
    description: 'What SaLira will actually build',
  },
  {
    number: '05',
    title: 'Receive the final quote',
    description: 'A clear project scope and price',
  },
]

const PROJECT_FEE_COVERS = [
  {
    title: 'Planning & Structure',
    description: 'Defining the scope, pages, workflows and required functionality.',
  },
  {
    title: 'Design',
    description: 'Creating the user experience and visual design required for the project.',
  },
  {
    title: 'Development',
    description: 'Building the actual software and agreed functionality.',
  },
  {
    title: 'Integrations',
    description: 'Connecting required external services where applicable.',
  },
  {
    title: 'Testing',
    description: 'Checking the software and resolving issues before launch.',
  },
  {
    title: 'Deployment',
    description: 'Getting the completed software ready and deployed.',
  },
  {
    title: 'Handover',
    description: 'Giving the client the completed software and required project assets.',
  },
  {
    title: 'Documentation',
    description: 'Clear guides for using, managing and maintaining the delivered software.',
  },
]

const CLIENT_OWNED_SERVICES = [
  'Domain',
  'Hosting',
  'Cloud infrastructure',
  'Paid APIs',
  'Email services',
  'SMS/WhatsApp services',
  'Payment gateway charges',
  'Apple Developer account',
  'Google Play Developer account',
  'Other third-party subscriptions',
]

const ENGAGEMENT_MODELS = [
  {
    name: 'One-Time Project',
    tagline: 'Build → Launch → Handover',
    description: 'For clients who want a defined project delivered and handed over.',
    includes: ['Defined scope', 'Development', 'Testing', 'Launch', 'Handover'],
  },
  {
    name: 'Monthly',
    tagline: 'Maintain → Improve → Develop',
    description: 'For clients who want SaLira to continue working on their software.',
    includes: [
      'Maintenance',
      'Bug fixes',
      'Improvements',
      'New features',
      'Technical support',
      'Monitoring/configuration where agreed',
    ],
    note: 'Monthly scope and development capacity are agreed based on the engagement.',
  },
  {
    name: 'Annual',
    tagline: 'Long-term technical partnership',
    description: 'For clients who want a longer-term relationship with SaLira.',
    includes: [
      'Ongoing maintenance',
      'Continuous improvements',
      'Feature development',
      'Technical support',
      'Planned development work',
    ],
  },
]

const BUSINESS_EXAMPLES = [
  {
    business: 'Grocery Business',
    needs: [
      'Product catalogue',
      'Inventory',
      'Orders',
      'Customer accounts',
      'Payments',
      'Administration',
    ],
  },
  {
    business: 'Travel Business',
    needs: [
      'Travel packages',
      'Search',
      'Booking',
      'Payments',
      'Customer accounts',
      'Agent management',
      'Administration',
    ],
  },
]

/* ── Expandable Card ── */

function ExpandableCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const reduced = usePrefersReducedMotion()

  return (
    <div className="border border-[var(--sl-line)] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-[#F8F8F8] hover:bg-white transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold text-[var(--sl-ink)]">{title}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-[var(--sl-charcoal)]" />
        ) : (
          <ChevronDown size={16} className="text-[var(--sl-charcoal)]" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? {} : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-[var(--sl-line-light)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Color theme per pricing tier ── */
const CARD_THEMES: Record<string, {
  gradient: string
  accent: string
  accentSoft: string
  accentText: string
  dotColor: string
  badge: string
  badgeText: string
  ctaBg: string
  ctaHover: string
  ctaText: string
  glow: string
}> = {
  website: {
    gradient: 'from-[#3A7EFF]/8 via-white to-white',
    accent: '#3A7EFF',
    accentSoft: 'rgba(58,126,255,0.1)',
    accentText: '#2563EB',
    dotColor: 'bg-blue-400',
    badge: 'bg-blue-50 border-blue-200',
    badgeText: 'text-blue-700',
    ctaBg: 'bg-blue-600 hover:bg-blue-700',
    ctaHover: 'hover:bg-blue-50',
    ctaText: 'text-white',
    glow: 'rgba(58,126,255,0.15)',
  },
  ecommerce: {
    gradient: 'from-[#7C5CFC]/8 via-white to-white',
    accent: '#7C5CFC',
    accentSoft: 'rgba(124,92,252,0.1)',
    accentText: '#6D28D9',
    dotColor: 'bg-violet-400',
    badge: 'bg-violet-50 border-violet-200',
    badgeText: 'text-violet-700',
    ctaBg: 'bg-violet-600 hover:bg-violet-700',
    ctaHover: 'hover:bg-violet-50',
    ctaText: 'text-white',
    glow: 'rgba(124,92,252,0.15)',
  },
  mobile: {
    gradient: 'from-[#00BFFF]/8 via-white to-white',
    accent: '#00BFFF',
    accentSoft: 'rgba(0,191,255,0.1)',
    accentText: '#0284C7',
    dotColor: 'bg-cyan-400',
    badge: 'bg-cyan-50 border-cyan-200',
    badgeText: 'text-cyan-700',
    ctaBg: 'bg-cyan-500 hover:bg-cyan-600',
    ctaHover: 'hover:bg-cyan-50',
    ctaText: 'text-white',
    glow: 'rgba(0,191,255,0.15)',
  },
  software: {
    gradient: 'from-[#14161C] via-[#1e2130] to-[#14161C]',
    accent: '#D9A441',
    accentSoft: 'rgba(217,164,65,0.15)',
    accentText: '#D9A441',
    dotColor: 'bg-amber-400',
    badge: 'bg-amber-400 border-amber-400',
    badgeText: 'text-black',
    ctaBg: 'bg-[#D9A441] hover:bg-amber-400',
    ctaHover: '',
    ctaText: 'text-black',
    glow: 'rgba(217,164,65,0.25)',
  },
  platform: {
    gradient: 'from-[#C6472B]/8 via-white to-white',
    accent: '#C6472B',
    accentSoft: 'rgba(198,71,43,0.1)',
    accentText: '#B91C1C',
    dotColor: 'bg-red-400',
    badge: 'bg-red-50 border-red-200',
    badgeText: 'text-red-700',
    ctaBg: 'bg-[#C6472B] hover:bg-red-700',
    ctaHover: 'hover:bg-red-50',
    ctaText: 'text-white',
    glow: 'rgba(198,71,43,0.15)',
  },
}

/* ── Pricing Category Card ── */

function PricingCard({ category, reduced }: { category: PricingCategory; reduced: boolean }) {
  const [showDetails, setShowDetails] = useState(false)
  const whatsappUrl = `https://wa.me/917397430568?text=${encodeURIComponent(`Hi SaLira Studio, I'm interested in discussing a ${category.name.toLowerCase()} project.`)}`
  const theme = CARD_THEMES[category.id] ?? CARD_THEMES.website
  const isDark = category.id === 'software'

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-[#14161C] via-[#1e2130] to-[#14161C] border border-[rgba(217,164,65,0.3)] shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          : 'bg-white border border-[var(--sl-line)] shadow-sm'
      }`}
      whileHover={reduced ? {} : {
        y: -6,
        boxShadow: `0 20px 48px ${theme.glow}, 0 4px 12px rgba(0,0,0,0.06)`,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Animated gradient top bar */}
      <div
        className="h-[3px] w-full transition-all duration-500"
        style={{
          background: isDark
            ? `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`
            : `linear-gradient(90deg, transparent, ${theme.accent} 50%, transparent)`,
          opacity: isDark ? 1 : 0,
        }}
        ref={(el) => {
          if (el?.parentElement) {
            const parent = el.parentElement as HTMLElement
            parent.addEventListener('mouseenter', () => { el.style.opacity = '1' })
            parent.addEventListener('mouseleave', () => { el.style.opacity = isDark ? '1' : '0' })
          }
        }}
      />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Badge */}
        {category.featured && (
          <div className="mb-4 self-start">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${theme.badge} ${theme.badgeText}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Core Offering
            </span>
          </div>
        )}

        {/* Name + price */}
        <div>
          <h3 className={`font-display text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-[var(--sl-ink)]'}`}>
            {category.name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className="font-display text-2xl font-bold"
              style={{ color: isDark ? theme.accent : theme.accent }}
            >
              {category.price}
            </span>
          </div>
          <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-[rgba(255,255,255,0.6)]' : 'text-[var(--sl-charcoal)]'}`}>
            {category.tagline}
          </p>
        </div>

        {/* Divider */}
        <div
          className="my-4 h-px"
          style={{ background: isDark ? 'rgba(255,255,255,0.08)' : `linear-gradient(90deg, ${theme.accent}30, transparent)` }}
        />

        {/* Examples */}
        <div className="flex-1">
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: isDark ? 'rgba(255,255,255,0.4)' : theme.accentText }}
          >
            Examples
          </p>
          <div className="space-y-1.5">
            {category.examples.map((example) => (
              <div key={example} className="flex items-start gap-2 text-xs">
                <span
                  className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: theme.accent, opacity: 0.7 }}
                />
                <span className={isDark ? 'text-[rgba(255,255,255,0.72)]' : 'text-[var(--sl-ink-soft)]'}>
                  {example}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className={`mt-4 text-xs font-semibold underline underline-offset-2 transition-colors cursor-pointer`}
            style={{ color: theme.accentText }}
          >
            {showDetails ? 'Hide typical work' : 'Show typical work'}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={reduced ? {} : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduced ? {} : { height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-1.5">
                  {category.typicalWork.map((work) => (
                    <div key={work} className="flex items-start gap-2 text-xs">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.accent, opacity: 0.5 }} />
                      <span className={isDark ? 'text-[rgba(255,255,255,0.65)]' : 'text-[var(--sl-ink-soft)]'}>{work}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-5 pt-4" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--sl-line-light)' }}>
          <MagneticButton strength={0.15} className="w-full">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${theme.ctaBg} ${theme.ctaText}`}
            >
              <span>{category.cta}</span>
              <ArrowRight size={14} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Component ── */

export function PricingTiers() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="w-full">
      {/* ── Intro ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <p className="sl-label text-[var(--sl-charcoal)]">Pricing</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--sl-ink)]">
          Software built around your business.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[var(--sl-ink-soft)] leading-relaxed max-w-2xl mx-auto">
          Starting prices are for smaller, clearly defined projects. Your final quote depends on the functionality, number of users, platforms, integrations and complexity involved.
        </p>
      </div>

      {/* ── Pricing Cards ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-stretch">
        {PRICING_CATEGORIES.map((category) => (
          <PricingCard key={category.id} category={category} reduced={reduced} />
        ))}
      </div>

      {/* ── Why Does the Price Change? ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            Why does the price change?
          </h2>
          <p className="mt-3 text-sm text-[var(--sl-ink-soft)] leading-relaxed">
            Starting prices give you a baseline. Your actual project price depends on what the software needs to do.
          </p>
        </div>

        {/* Bento grid — 7 factors, 4+3 layout with shared borders */}
        <div className="border border-[var(--sl-line)] rounded-2xl overflow-hidden shadow-sm">
          {/* Row 1 — 4 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: '⚙️', color: '#3A7EFF', soft: 'rgba(58,126,255,0.07)', hover: 'rgba(58,126,255,0.04)' },
              { emoji: '👥', color: '#7C5CFC', soft: 'rgba(124,92,252,0.07)', hover: 'rgba(124,92,252,0.04)' },
              { emoji: '📱', color: '#00BFFF', soft: 'rgba(0,191,255,0.07)', hover: 'rgba(0,191,255,0.04)' },
              { emoji: '🔗', color: '#D9A441', soft: 'rgba(217,164,65,0.07)', hover: 'rgba(217,164,65,0.04)' },
            ].map((theme, idx) => {
              const factor = PRICE_FACTORS[idx]
              return (
                <motion.div
                  key={factor.title}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white p-6 cursor-default transition-all duration-300 border-b border-r border-[var(--sl-line)] last:border-r-0 lg:[&:nth-child(4)]:border-r-0"
                  style={{ backgroundColor: 'white' }}
                  whileHover={reduced ? {} : { backgroundColor: theme.hover, transition: { duration: 0.2 } }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: `linear-gradient(90deg, ${theme.color}, transparent)` }}
                  />
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                    style={{ background: theme.soft }}
                  >
                    {theme.emoji}
                  </div>
                  <h3 className="text-sm font-bold text-[var(--sl-ink)] group-hover:translate-x-0.5 transition-transform duration-200">
                    {factor.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                    {factor.description}
                  </p>
                  {/* Corner number */}
                  <span className="absolute bottom-3 right-4 font-mono text-[10px] font-bold text-[var(--sl-line)] select-none">
                    0{idx + 1}
                  </span>
                </motion.div>
              )
            })}
          </div>
          {/* Row 2 — 4 cards filling the grid evenly */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: '🧩', color: '#C6472B', soft: 'rgba(198,71,43,0.07)', hover: 'rgba(198,71,43,0.04)' },
              { emoji: '🗄️', color: '#2E6F5E', soft: 'rgba(46,111,94,0.07)', hover: 'rgba(46,111,94,0.04)' },
              { emoji: '📍', color: '#7C5CFC', soft: 'rgba(124,92,252,0.07)', hover: 'rgba(124,92,252,0.04)' },
              { emoji: '⏱️', color: '#D9A441', soft: 'rgba(217,164,65,0.07)', hover: 'rgba(217,164,65,0.04)' },
            ].map((theme, idx) => {
              const factor = PRICE_FACTORS[idx + 4]
              return (
                <motion.div
                  key={factor.title}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white p-6 cursor-default transition-all duration-300 border-r border-[var(--sl-line)] last:border-r-0"
                  style={{ backgroundColor: 'white' }}
                  whileHover={reduced ? {} : { backgroundColor: theme.hover, transition: { duration: 0.2 } }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                    style={{ background: `linear-gradient(90deg, ${theme.color}, transparent)` }}
                  />
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                    style={{ background: theme.soft }}
                  >
                    {theme.emoji}
                  </div>
                  <h3 className="text-sm font-bold text-[var(--sl-ink)] group-hover:translate-x-0.5 transition-transform duration-200">
                    {factor.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                    {factor.description}
                  </p>
                  <span className="absolute bottom-3 right-4 font-mono text-[10px] font-bold text-[var(--sl-line)] select-none">
                    0{idx + 5}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── How We Arrive at Your Price ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            How we arrive at your price
          </h2>
          <p className="mt-3 text-sm text-[var(--sl-ink-soft)] leading-relaxed">
            We understand what needs to be built so we can define the right scope and give you an accurate quote.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {PRICING_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={reduced ? {} : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 sm:gap-6"
              >
                <span className="font-display text-2xl sm:text-3xl font-bold text-[var(--sl-charcoal)]/20 shrink-0 w-10 sm:w-12">
                  {step.number}
                </span>
                <div className="flex-1 rounded-xl border border-[var(--sl-line)] bg-white p-4 sm:p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-[var(--sl-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < PRICING_STEPS.length - 1 && (
                  <div className="hidden sm:block absolute left-[2.75rem] mt-12 w-px h-4 bg-[var(--sl-line)]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What Does Your Project Fee Cover? ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            What does your SaLira project fee cover?
          </h2>
          <p className="mt-3 text-sm text-[var(--sl-ink-soft)] leading-relaxed">
            Your project fee covers the software work we provide.
          </p>
        </div>

        {/* Bento 4×2 grid — shared borders, color-coded per phase */}
        {(() => {
          const themes = [
            { emoji: '🗺️', color: '#3A7EFF', soft: 'rgba(58,126,255,0.07)',  hover: 'rgba(58,126,255,0.04)'  },
            { emoji: '🎨', color: '#7C5CFC', soft: 'rgba(124,92,252,0.07)', hover: 'rgba(124,92,252,0.04)' },
            { emoji: '💻', color: '#00BFFF', soft: 'rgba(0,191,255,0.07)',   hover: 'rgba(0,191,255,0.04)'   },
            { emoji: '🔗', color: '#D9A441', soft: 'rgba(217,164,65,0.07)',  hover: 'rgba(217,164,65,0.04)'  },
            { emoji: '🧪', color: '#C6472B', soft: 'rgba(198,71,43,0.07)',   hover: 'rgba(198,71,43,0.04)'   },
            { emoji: '🚀', color: '#2E6F5E', soft: 'rgba(46,111,94,0.07)',   hover: 'rgba(46,111,94,0.04)'   },
            { emoji: '📦', color: '#7C5CFC', soft: 'rgba(124,92,252,0.07)', hover: 'rgba(124,92,252,0.04)' },
            { emoji: '📄', color: '#3A7EFF', soft: 'rgba(58,126,255,0.07)',  hover: 'rgba(58,126,255,0.04)'  },
          ]
          const rows = [themes.slice(0, 4), themes.slice(4, 8)]
          return (
            <div className="border border-[var(--sl-line)] rounded-2xl overflow-hidden shadow-sm">
              {rows.map((rowThemes, rowIdx) => (
                <div key={rowIdx} className={`grid grid-cols-2 lg:grid-cols-4 ${rowIdx === 0 ? 'border-b border-[var(--sl-line)]' : ''}`}>
                  {rowThemes.map((theme, colIdx) => {
                    const item = PROJECT_FEE_COVERS[rowIdx * 4 + colIdx]
                    const globalIdx = rowIdx * 4 + colIdx
                    return (
                      <motion.div
                        key={item.title}
                        initial={reduced ? {} : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.45, delay: globalIdx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className={`group relative bg-white p-6 cursor-default transition-all duration-300
                          ${colIdx < 3 ? 'border-r border-[var(--sl-line)]' : ''}
                          ${colIdx < 2 ? 'border-b lg:border-b-0 border-[var(--sl-line)]' : ''}
                        `}
                        style={{ backgroundColor: 'white' }}
                        whileHover={reduced ? {} : { backgroundColor: theme.hover, transition: { duration: 0.2 } }}
                      >
                        {/* Top accent sweep */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                          style={{ background: `linear-gradient(90deg, ${theme.color}, transparent)` }}
                        />
                        {/* Icon */}
                        <div
                          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                          style={{ background: theme.soft }}
                        >
                          {theme.emoji}
                        </div>
                        {/* Phase label */}
                        <h3
                          className="text-sm font-bold text-[var(--sl-ink)] transition-colors duration-200 group-hover:translate-x-0.5"
                          style={{ transition: 'color 0.2s, transform 0.2s' }}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                          {item.description}
                        </p>
                        {/* Step number watermark */}
                        <span className="absolute bottom-3 right-4 font-mono text-[10px] font-bold text-[var(--sl-line)] select-none">
                          0{globalIdx + 1}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>
          )
        })()}
      </div>

      {/* ── Project Fee vs. Third-Party Services ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            Your project fee vs. third-party services
          </h2>
          <p className="mt-3 text-sm text-[var(--sl-ink-soft)] leading-relaxed max-w-2xl mx-auto">
            Your SaLira project fee covers the software work we provide. Services such as domain registration, hosting, cloud infrastructure, paid APIs, payment processing, messaging services, app-store accounts and other third-party subscriptions are separate costs and are paid by you directly to the respective providers.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* SaLira Project Fee */}
          <div className="rounded-2xl border-2 border-[var(--sl-ink)] bg-white p-6 sm:p-8 shadow-lg">
            <h3 className="font-display text-lg font-bold text-[var(--sl-ink)] mb-4">
              SaLira Project Fee
            </h3>
            <div className="space-y-3">
              {PROJECT_FEE_COVERS.map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--sl-teal-deep)] shrink-0" />
                  <span className="text-xs text-[var(--sl-ink-soft)]">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client-Owned Services */}
          <div className="rounded-2xl border border-[var(--sl-line)] bg-[#F8F8F8] p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-[var(--sl-ink)] mb-4">
              Client-Owned Services
            </h3>
            <p className="text-xs text-[var(--sl-charcoal)] mb-4 leading-relaxed">
              When required, paid by you directly to the provider.
            </p>
            <div className="space-y-3">
              {CLIENT_OWNED_SERVICES.map((service) => (
                <div key={service} className="flex items-start gap-2.5">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--sl-charcoal)]/30 shrink-0" />
                  <span className="text-xs text-[var(--sl-ink-soft)]">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--sl-charcoal)] italic">
            We'll identify any required third-party services before development begins so there are no unexpected costs.
          </p>
        </div>
      </div>

      {/* ── You Own What We Build ── */}
      <div className="mt-20 sm:mt-24 rounded-2xl border border-[var(--sl-line)] bg-[#F8F8F8] p-8 sm:p-12">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            You own what we build.
          </h2>
          <p className="mt-4 text-sm text-[var(--sl-charcoal)] leading-relaxed">
            We build the software for your business and hand it over to you. Wherever practical, third-party accounts such as hosting, domains, payment services and API accounts should be created under your ownership. We can configure and manage them for you when required.
          </p>
        </div>
      </div>

      {/* ── Why Two Businesses Can Receive Different Quotes ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            Why two businesses can receive different quotes
          </h2>
          <p className="mt-3 text-sm text-[var(--sl-ink-soft)] leading-relaxed">
            Both are custom business software, but the required functionality is different — so the final project scope and price can be different.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {BUSINESS_EXAMPLES.map((example, idx) => (
            <motion.div
              key={example.business}
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--sl-line)] bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-bold text-[var(--sl-ink)]">
                {example.business}
              </h3>
              <p className="mt-2 text-xs text-[var(--sl-charcoal)] mb-4">Needs:</p>
              <div className="space-y-2">
                {example.needs.map((need) => (
                  <div key={need} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                    <span className="mt-1 h-1 w-1 rounded-full bg-[var(--sl-charcoal)]/30 shrink-0" />
                    <span>{need}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Engagement Models ── */}
      <div className="mt-20 sm:mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
            How we work together
          </h2>
          <p className="mt-3 text-sm text-[var(--sl-ink-soft)] leading-relaxed">
            Choose the engagement model that fits your needs.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model, idx) => (
            <motion.div
              key={model.name}
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--sl-line)] bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-bold text-[var(--sl-ink)]">
                {model.name}
              </h3>
              <p className="mt-1 text-xs font-medium text-[var(--sl-charcoal)]">
                {model.tagline}
              </p>
              <p className="mt-2 text-xs text-[var(--sl-ink-soft)] leading-relaxed">
                {model.description}
              </p>

              <div className="my-4 h-px bg-[var(--sl-line-light)]" />

              <div className="space-y-2">
                {model.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[var(--sl-ink-soft)]">
                    <span className="mt-1 h-1 w-1 rounded-full bg-[var(--sl-charcoal)]/30 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {model.note && (
                <p className="mt-4 text-[10px] text-[var(--sl-charcoal)] italic leading-relaxed">
                  {model.note}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Discovery for Complex Projects ── */}
      <div className="mt-20 sm:mt-24">
        <div className="max-w-3xl mx-auto">
          <ExpandableCard title="Discovery & Scope for complex projects" defaultOpen={false}>
            <div className="pt-4 space-y-4">
              <p className="text-xs text-[var(--sl-charcoal)] leading-relaxed">
                For larger or unclear projects, we offer a Discovery & Scope phase:
              </p>
              <div className="rounded-xl bg-[rgba(46,111,94,0.04)] p-4 border border-[var(--sl-line-light)]">
                <p className="text-sm font-semibold text-[var(--sl-ink)]">₹15,000 – ₹40,000</p>
                <p className="mt-1 text-xs text-[var(--sl-ink-soft)]">
                  Deliverable: A defined scope document covering the proposed workflows, features/modules, assumptions, exclusions and estimated project requirements.
                </p>
              </div>
              <p className="text-xs text-[var(--sl-charcoal)] leading-relaxed">
                The discovery fee can be credited toward the development project if you proceed with SaLira.
              </p>
              <p className="text-xs text-[var(--sl-charcoal)] leading-relaxed">
               Suitable for: Complex business software, custom platforms, large mobile applications, projects with unclear requirements, projects involving significant existing systems/data.
              </p>
            </div>
          </ExpandableCard>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="mt-20 sm:mt-24 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--sl-ink)]">
          Not sure what you need?
        </h2>
        <p className="mt-3 text-sm text-[var(--sl-ink-soft)] max-w-xl mx-auto leading-relaxed">
          Tell us what your business does, what you're trying to improve, and what you'd like the software to do. We'll help define the right scope and give you a clear quote.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton strength={0.2}>
            <a
              href={`https://wa.me/917397430568?text=${encodeURIComponent('Hi SaLira Studio, I want to start a conversation about a project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--sl-ink)] px-8 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-black hover:shadow-lg"
            >
              Start a conversation
              <ArrowRight size={16} />
            </a>
          </MagneticButton>
          <MagneticButton strength={0.15}>
            <a
              href="/work"
              className="inline-flex items-center gap-2 px-2 py-4 text-sm font-medium text-[var(--sl-charcoal)] transition-colors hover:text-[var(--sl-ink)]"
            >
              See our work
              <ArrowRight size={14} className="text-[var(--sl-charcoal)]/40" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}








