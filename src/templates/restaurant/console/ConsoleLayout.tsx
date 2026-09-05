import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Users,
  BarChart3,
  Settings,
  ExternalLink,
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../routes'

function useNewOrders() {
  return useAppStore((s) => s.orders.filter((o) => o.status === 'NEW').length)
}
function useActiveOrders() {
  return useAppStore((s) => s.orders.filter((o) => o.status !== 'COMPLETED').length)
}

const navItems = [
  { to: CONSOLE_BASE, icon: LayoutDashboard, label: 'Overview', end: true },
  { to: `${CONSOLE_BASE}/orders`, icon: ClipboardList, label: 'Orders' },
  { to: `${CONSOLE_BASE}/menu`, icon: UtensilsCrossed, label: 'Menu' },
  { to: `${CONSOLE_BASE}/customers`, icon: Users, label: 'Customers' },
  { to: `${CONSOLE_BASE}/analytics`, icon: BarChart3, label: 'Analytics' },
  { to: `${CONSOLE_BASE}/settings`, icon: Settings, label: 'Settings' },
]

export default function ConsoleLayout() {
  const newCount = useNewOrders()
  const activeCount = useActiveOrders()

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)]">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-[64px] flex-col border-r border-[var(--color-line-light)] bg-white md:w-[240px]">
        <div className="flex h-16 items-center justify-center gap-2.5 border-b border-[var(--color-line-light)] px-4 md:justify-start md:px-5">
          <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
            <circle cx="12" cy="13.4" r="8.6" fill="none" stroke="#A9834F" strokeWidth="1.6" />
            <circle cx="12" cy="13.4" r="5.4" fill="#F5ECE0" />
            <path
              d="M12 7.2c2.6 2.2 4 4.3 4 6.6 0 2.8-1.7 4.7-4 4.7s-4-1.9-4-4.7c0-2.3 1.4-4.4 4-6.6z"
              fill="#B4532A"
            />
          </svg>
          <span className="hidden font-display text-lg font-bold tracking-[0.18em] text-[var(--color-espresso-900)] md:inline">
            AURA
          </span>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1 px-2 md:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={item.label}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--color-ivory-100)] text-[var(--color-espresso-900)]'
                    : 'text-[var(--color-cocoa-400)] hover:bg-[var(--color-ivory-100)] hover:text-[var(--color-espresso-900)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[var(--color-brass-500)]" />
                  )}
                  <item.icon className="h-5 w-5 shrink-0" strokeWidth={isActive ? 2.1 : 1.8} />
                  <span className="hidden md:inline">{item.label}</span>
                  {item.to === `${CONSOLE_BASE}/orders` && newCount > 0 && (
                    <span className="ml-auto hidden rounded-full bg-[var(--color-clay-500)] px-1.5 py-0.5 text-[10px] font-bold text-white md:inline">
                      {newCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[var(--color-line-light)] p-2 md:p-3">
          <NavLink
            to={CUSTOMER_BASE}
            title="Open customer app"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-cocoa-400)] transition-colors hover:bg-[var(--color-ivory-100)] hover:text-[var(--color-espresso-900)]"
          >
            <ExternalLink className="h-5 w-5 shrink-0" strokeWidth={1.8} />
            <span className="hidden md:inline">Customer app</span>
          </NavLink>
          <p className="hidden items-center gap-2 px-3 pt-3 pb-1 text-[11px] text-[var(--color-cocoa-300)] md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-leaf-500)]" />
            {activeCount} active order{activeCount === 1 ? '' : 's'}
          </p>
        </div>
      </aside>

      <main className="ml-[64px] min-h-screen md:ml-[240px]">
        <Outlet />
      </main>
    </div>
  )
}
