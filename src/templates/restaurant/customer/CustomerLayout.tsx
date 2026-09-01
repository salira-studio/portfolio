import { Link, NavLink, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import { cn } from '../../../shared/lib/cn'
import { useAppStore } from '../store/useAppStore'
import { formatPrice } from '../../../shared/lib/format'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../routes'

const mobileTabs = [
  { to: CUSTOMER_BASE, icon: Home, label: 'Home' },
  { to: `${CUSTOMER_BASE}/menu`, icon: UtensilsCrossed, label: 'Menu' },
  { to: `${CUSTOMER_BASE}/cart`, icon: ShoppingBag, label: 'Cart' },
  { to: `${CUSTOMER_BASE}/orders`, icon: Clock, label: 'Tracking' },
]

export function CustomerLayout() {
  const cart = useAppStore((s) => s.cart)
  const cartCount = cart.reduce((n, c) => n + c.quantity, 0)
  const cartTotal = cart.reduce((n, c) => n + c.price * c.quantity, 0)
  const orders = useAppStore((s) => s.orders)
  const activeOrder = orders[0]
  const resetDemo = useAppStore((s) => s.resetDemo)

  return (
    <div data-theme="restaurant" className="min-h-screen bg-[var(--color-ivory-50)] text-[var(--color-espresso-900)] flex flex-col selection:bg-[var(--color-clay-500)] selection:text-white">
      <Helmet>
        <title>AURA Kitchen — Order Online</title>
        <meta name="description" content="Order authentic cuisine from AURA Kitchen. Fresh ingredients, fast delivery, and easy online ordering." />
        <meta property="og:title" content="AURA Kitchen — Order Online" />
        <meta property="og:description" content="Order authentic cuisine from AURA Kitchen. Fresh ingredients, fast delivery, and easy online ordering." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AURA Kitchen — Order Online" />
        <meta name="twitter:description" content="Order authentic cuisine from AURA Kitchen. Fresh ingredients, fast delivery, and easy online ordering." />
      </Helmet>
      {/* ── Top Announcement / Live Sync Demo Bar ── */}
      <div className="bg-[var(--color-espresso-900)] text-white/90 text-xs px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-white/90">
              AURA Kitchen is Open
            </span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="hidden sm:inline text-white/70">
              14 Kalakshetra Ave, Adyar · Delivery & Pickup Available
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`${CONSOLE_BASE}/orders`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border border-white/10"
              title="Open Restaurant Console in a new tab to test live order processing"
            >
              <span>Restaurant Console</span>
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Responsive Header ── */}
      <header className="sticky top-0 z-40 bg-[var(--color-ivory-50)]/95 backdrop-blur-md border-b border-[var(--color-line-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <Link to={CUSTOMER_BASE} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-espresso-900)] text-[var(--color-ivory-50)] flex items-center justify-center font-display font-bold text-xl tracking-tighter shadow-sm group-hover:bg-[var(--color-clay-500)] transition-colors">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-espresso-900)] leading-none">
                AURA
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-[var(--color-cocoa-500)] mt-0.5">
                Modern South Indian
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink
              to={CUSTOMER_BASE}
              end
              className={({ isActive }) =>
                cn(
                  'transition-colors py-1 relative hover:text-[var(--color-clay-500)]',
                  isActive
                    ? 'text-[var(--color-clay-500)] font-semibold'
                    : 'text-[var(--color-espresso-800)]',
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to={`${CUSTOMER_BASE}/menu`}
              className={({ isActive }) =>
                cn(
                  'transition-colors py-1 relative hover:text-[var(--color-clay-500)]',
                  isActive
                    ? 'text-[var(--color-clay-500)] font-semibold'
                    : 'text-[var(--color-espresso-800)]',
                )
              }
            >
              Explore Menu
            </NavLink>
            <a
              href={`${CUSTOMER_BASE}#story`}
              className="text-[var(--color-espresso-800)] hover:text-[var(--color-clay-500)] transition-colors py-1"
            >
              Our Story
            </a>
            <a
              href={`${CUSTOMER_BASE}#location`}
              className="text-[var(--color-espresso-800)] hover:text-[var(--color-clay-500)] transition-colors py-1"
            >
              Hours & Location
            </a>
            <NavLink
              to={`${CUSTOMER_BASE}/orders`}
              className={({ isActive }) =>
                cn(
                  'transition-colors py-1 relative hover:text-[var(--color-clay-500)] flex items-center gap-1.5',
                  isActive
                    ? 'text-[var(--color-clay-500)] font-semibold'
                    : 'text-[var(--color-espresso-800)]',
                )
              }
            >
              <span>My Orders</span>
              {orders.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[var(--color-clay-500)]" />
              )}
            </NavLink>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {activeOrder && activeOrder.status !== 'COMPLETED' && (
              <Link
                to={`${CUSTOMER_BASE}/order/${activeOrder.id}`}
                className="hidden lg:inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-amber-100 transition-colors animate-fade-in"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Tracking #{activeOrder.orderNumber}</span>
              </Link>
            )}

            <Link
              to={`${CUSTOMER_BASE}/cart`}
              className={cn(
                'relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all border shadow-sm',
                cartCount > 0
                  ? 'bg-[var(--color-clay-500)] text-white border-[var(--color-clay-600)] hover:bg-[var(--color-clay-600)]'
                  : 'bg-white text-[var(--color-espresso-900)] border-[var(--color-line)] hover:bg-[var(--color-ivory-100)]',
              )}
            >
              <ShoppingBag size={18} strokeWidth={2} />
              <span className="hidden sm:inline">
                {cartCount > 0 ? formatPrice(cartTotal) : 'Bag'}
              </span>
              {cartCount > 0 && (
                <span className="bg-white text-[var(--color-clay-600)] font-bold text-xs px-1.5 py-0.5 rounded-full leading-none min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="flex-1 pb-24 md:pb-12">
        <Outlet />
      </main>

      {/* ── Responsive Restaurant Footer ── */}
      <footer className="hidden md:block bg-[var(--color-espresso-900)] text-[var(--color-ivory-100)] border-t border-white/10 pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-clay-500)] text-white flex items-center justify-center font-display font-bold text-lg">
                  A
                </div>
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  AURA
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                A modern South Indian kitchen honoring age-old culinary heritage,
                fresh morning stone grinding, and honest ingredients.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetDemo}
                  className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                  title="Clear orders and cart for fresh demonstration"
                >
                  <RotateCcw size={12} />
                  <span>Reset Demo State</span>
                </button>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li>
                  <Link to={CUSTOMER_BASE} className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={`${CUSTOMER_BASE}/menu`} className="hover:text-white transition-colors">
                    Full Menu
                  </Link>
                </li>
                <li>
                  <Link to={`${CUSTOMER_BASE}/orders`} className="hover:text-white transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${CONSOLE_BASE}/orders`}
                    target="_blank"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Restaurant Console</span>
                    <ExternalLink size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Timings */}
            <div>
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Dining Hours
              </h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>
                  <strong className="text-white font-medium">Breakfast:</strong>{' '}
                  7:30 AM – 11:00 AM
                </p>
                <p>
                  <strong className="text-white font-medium">Lunch:</strong>{' '}
                  12:00 PM – 3:30 PM
                </p>
                <p>
                  <strong className="text-white font-medium">Dinner:</strong>{' '}
                  6:30 PM – 10:30 PM
                </p>
                <p className="text-xs text-[var(--color-clay-400)] pt-1">
                  Open all 7 days for dine-in, pickup & delivery.
                </p>
              </div>
            </div>

            {/* Col 4: Location */}
            <div>
              <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Find Us
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[var(--color-clay-400)] shrink-0 mt-0.5" />
                  <span>14 Kalakshetra Avenue, Adyar, Chennai 600041</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[var(--color-clay-400)] shrink-0" />
                  <span>+91 44 2445 6789</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} AURA Kitchen. Interactive Capability Showcase.</p>
            <p className="flex items-center gap-2">
              <span>Crafted for modern digital dining</span>
              <span>·</span>
              <Link to={`${CONSOLE_BASE}/orders`} className="text-white/60 hover:text-white underline">
                Console View
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation Bar (Hidden on md/desktop) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[var(--color-line)] safe-area-bottom shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
          {mobileTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === CUSTOMER_BASE}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 w-16 py-1.5 rounded-xl transition-all',
                  isActive
                    ? 'text-[var(--color-clay-500)] font-semibold scale-105'
                    : 'text-[var(--color-cocoa-400)] hover:text-[var(--color-espresso-900)]',
                )
              }
            >
              <div className="relative">
                <tab.icon size={21} strokeWidth={1.9} />
                {tab.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[var(--color-clay-500)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                    {cartCount}
                  </span>
                )}
                {tab.label === 'Tracking' && orders.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
