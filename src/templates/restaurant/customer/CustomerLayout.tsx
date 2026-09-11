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
    <div data-theme="restaurant" className="min-h-screen bg-white text-[var(--rest-text)] flex flex-col selection:bg-[var(--rest-primary)] selection:text-white">
      <Helmet>
        <title>Annachies அண்ணாச்சிஸ் — Authentic South Indian Kitchen | Karunya Nagar, Coimbatore</title>
        <meta name="description" content="Authentic South Indian Tiffin, Kongu Meals & Beverages at Annachies அண்ணாச்சிஸ், Karunya Nagar, Coimbatore. Freshly prepared to order." />
        <meta property="og:title" content="Annachies அண்ணாச்சிஸ் — Authentic South Indian Kitchen" />
        <meta property="og:description" content="Authentic South Indian Tiffin, Kongu Meals & Beverages at Annachies அண்ணாச்சிஸ், Karunya Nagar, Coimbatore." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Annachis — Authentic South Indian Kitchen" />
        <meta name="twitter:description" content="Authentic South Indian Tiffin, Kongu Meals & Beverages at Annachis, Karunya Nagar, Coimbatore." />
      </Helmet>
      {/* ── Top Announcement / Live Sync Demo Bar ── */}
      <div className="bg-[var(--rest-primary-dark)] text-[var(--rest-text)] text-xs px-4 py-2 flex items-center justify-between border-b border-[var(--rest-border)]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-white/90">
              Annachies அண்ணாச்சிஸ் is Open
            </span>
            <span className="hidden sm:inline text-white/40">·</span>
            <span className="hidden sm:inline text-white/70">
              Siruvani Main Road, Karunya Nagar, Coimbatore · Dine-In, Parcel & Delivery
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="text-white/60 hover:text-white text-[11px] transition-colors"
            >
              ← Portfolio
            </Link>
            <span className="text-white/30">|</span>
            <Link
              to={`${CONSOLE_BASE}/orders`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border border-white/10"
              title="Open Restaurant Console in a new tab to test live order processing"
            >
              <span>Owner Console</span>
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Responsive Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-[var(--rest-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <Link to={CUSTOMER_BASE} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[var(--rest-primary)] text-[var(--rest-text)] flex items-center justify-center font-display font-bold text-xl tracking-tighter shadow-sm group-hover:bg-[var(--rest-primary-light)] transition-colors">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[var(--rest-text)] leading-none">
                Annachies <span className="text-lg sm:text-xl">அண்ணாச்சிஸ்</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-[var(--rest-muted)] mt-0.5">
                South Indian Kitchen
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
                  'transition-colors py-1 relative hover:text-[var(--rest-primary)]',
                  isActive
                    ? 'text-[var(--rest-primary)] font-semibold'
                    : 'text-[var(--rest-text)]',
                )
              }
            >
              Home
            </NavLink>
            <NavLink
              to={`${CUSTOMER_BASE}/menu`}
              className={({ isActive }) =>
                cn(
                  'transition-colors py-1 relative hover:text-[var(--rest-primary)]',
                  isActive
                    ? 'text-[var(--rest-primary)] font-semibold'
                    : 'text-[var(--rest-text)]',
                )
              }
            >
              Explore Menu
            </NavLink>
            <a
              href={`${CUSTOMER_BASE}#story`}
              className="text-[var(--rest-text)] hover:text-[var(--rest-primary)] transition-colors py-1"
            >
              Our Story
            </a>
            <a
              href={`${CUSTOMER_BASE}#location`}
              className="text-[var(--rest-text)] hover:text-[var(--rest-primary)] transition-colors py-1"
            >
              Hours & Location
            </a>
            <NavLink
              to={`${CUSTOMER_BASE}/orders`}
              className={({ isActive }) =>
                cn(
                  'transition-colors py-1 relative hover:text-[var(--rest-primary)] flex items-center gap-1.5',
                  isActive
                    ? 'text-[var(--rest-primary)] font-semibold'
                    : 'text-[var(--rest-text)]',
                )
              }
            >
              <span>My Orders</span>
              {orders.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-[var(--rest-primary)]" />
              )}
            </NavLink>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {activeOrder && activeOrder.status !== 'COMPLETED' && (
              <Link
                to={`${CUSTOMER_BASE}/order/${activeOrder.id}`}
                className="hidden lg:inline-flex items-center gap-2 bg-[var(--rest-accent)] text-[var(--rest-text)] border border-[var(--rest-border)] px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[var(--rest-primary-light)] transition-colors animate-fade-in"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--rest-primary)] animate-ping" />
                <span>Tracking #{activeOrder.orderNumber}</span>
              </Link>
            )}

            <Link
              to={`${CUSTOMER_BASE}/cart`}
              className={cn(
                'relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl text-sm font-semibold transition-all border shadow-sm',
                cartCount > 0
                  ? 'bg-[var(--rest-primary)] text-[var(--rest-text)] border-[var(--rest-primary-dark)] hover:bg-[var(--rest-primary-light)]'
                  : 'bg-white text-[var(--rest-text)] border-[var(--rest-border)] hover:bg-[var(--rest-cream-light)]',
              )}
            >
              <ShoppingBag size={18} strokeWidth={2} />
              <span className="hidden sm:inline">
                {cartCount > 0 ? formatPrice(cartTotal) : 'Bag'}
              </span>
              {cartCount > 0 && (
                <span className="bg-[var(--rest-text)] text-[var(--rest-primary)] font-bold text-xs px-1.5 py-0.5 rounded-full leading-none min-w-[20px] text-center">
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
      <footer className="hidden md:block rest-footer-gradient text-[var(--rest-text)] border-t border-[var(--rest-border)] pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--rest-primary)] text-[var(--rest-text)] flex items-center justify-center font-display font-bold text-lg">
                  A
                </div>
                <span className="font-display text-2xl font-bold tracking-tight text-[var(--rest-text)]">
                  Annachies அண்ணாச்சிஸ்
                </span>
              </div>
              <p className="text-sm text-[var(--rest-muted)] leading-relaxed max-w-sm">
                Authentic South Indian & Kongu Nadu kitchen in Karunya Nagar, honoring traditional
                recipes, fresh stone grinding, and pure country ghee.
              </p>
              <p className="text-xs text-[var(--rest-muted)] italic mt-2">
                ஆத்திரிசிய தென்னிந்திய உணவு
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
              <h4 className="font-display font-semibold text-[var(--rest-text)] text-sm uppercase tracking-wider mb-4">
                Explore / ஆராய்க
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--rest-muted)]">
                <li>
                  <Link to={CUSTOMER_BASE} className="hover:text-[var(--rest-text)] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={`${CUSTOMER_BASE}/menu`} className="hover:text-[var(--rest-text)] transition-colors">
                    Full Menu
                  </Link>
                </li>
                <li>
                  <Link to={`${CUSTOMER_BASE}/orders`} className="hover:text-[var(--rest-text)] transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${CONSOLE_BASE}/orders`}
                    target="_blank"
                    className="hover:text-[var(--rest-text)] transition-colors flex items-center gap-1"
                  >
                    <span>Restaurant Console</span>
                    <ExternalLink size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Timings */}
            <div>
              <h4 className="font-display font-semibold text-[var(--rest-text)] text-sm uppercase tracking-wider mb-4">
                Dining Hours / உணவு நேரம்
              </h4>
              <div className="space-y-2 text-sm text-[var(--rest-muted)]">
                <p>
                  <strong className="text-[var(--rest-text)] font-medium">Morning Tiffin:</strong>{' '}
                  7:00 AM – 11:30 AM
                </p>
                <p>
                  <strong className="text-[var(--rest-text)] font-medium">Banana Leaf Meals:</strong>{' '}
                  12:00 PM – 4:00 PM
                </p>
                <p>
                  <strong className="text-[var(--rest-text)] font-medium">Dinner & Tiffin:</strong>{' '}
                  5:30 PM – 10:30 PM
                </p>
                <p className="text-xs text-[var(--rest-muted)] pt-1">
                  Open all 7 days for Dine-In, Parcel & Delivery.
                </p>
              </div>
            </div>

            {/* Col 4: Location */}
            <div>
              <h4 className="font-display font-semibold text-[var(--rest-text)] text-sm uppercase tracking-wider mb-4">
                Find Us / எங்குள்ளோம்
              </h4>
              <div className="space-y-3 text-sm text-[var(--rest-muted)]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[var(--rest-primary)] shrink-0 mt-0.5" />
                  <span>Siruvani Main Road, Karunya Nagar, Coimbatore 641114</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[var(--rest-primary)] shrink-0" />
                  <span>+91 94882 12345</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--rest-muted)]">
            <p>© {new Date().getFullYear()} Annachies அண்ணாச்சிஸ் South Indian Kitchen · Karunya Nagar, Coimbatore</p>
            <p className="flex items-center gap-2">
              <span>Authentic Kongu & Tamil Nadu Flavours</span>
              <span>·</span>
              <Link to={CONSOLE_BASE} className="text-[var(--rest-muted)] hover:text-[var(--rest-text)] underline">
                Owner Console
              </Link>
              <span>·</span>
              <Link to="/" className="text-[var(--rest-muted)] hover:text-[var(--rest-text)] underline">
                SaLira Portfolio
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Bottom Navigation Bar (Hidden on md/desktop) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--rest-border)] safe-area-bottom shadow-lg">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
          {mobileTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to || '/'}
              end={tab.to === '' || tab.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 w-16 py-1.5 rounded-xl transition-all',
                  isActive
                    ? 'text-[var(--rest-primary)] font-semibold scale-105'
                    : 'text-[var(--rest-muted)] hover:text-[var(--rest-text)]',
                )
              }
            >
              <div className="relative">
                <tab.icon size={21} strokeWidth={1.9} />
                {tab.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[var(--rest-primary)] text-[var(--rest-text)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-in">
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
