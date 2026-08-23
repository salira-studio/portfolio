import { Link } from 'react-router-dom'
import { CONSOLE_BASE } from '../../routes'
import { motion } from 'framer-motion'
import { Bike, ShoppingBag, Timer, Wallet } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { StatusPill } from '../../../../shared/components/ui/StatusPill'
import { formatPrice, timeAgo } from '../../../../shared/lib/format'
import type { Order, OrderStatus } from '../../../../shared/types/domain'

/* One primary action per order, driven by its real status so the
   customer app's tracking screen advances through every stage. */
function nextAction(o: Order): { label: string; next: OrderStatus; tone: 'clay' | 'brass' | 'dark' } | null {
  switch (o.status) {
    case 'NEW':
      return { label: 'Accept', next: 'ACCEPTED', tone: 'clay' }
    case 'ACCEPTED':
      return { label: 'Start preparing', next: 'PREPARING', tone: 'clay' }
    case 'PREPARING':
      return { label: 'Mark ready', next: 'READY', tone: 'brass' }
    case 'READY':
      return o.fulfilment === 'delivery'
        ? { label: 'Out for delivery', next: 'OUT_FOR_DELIVERY', tone: 'dark' }
        : { label: 'Complete', next: 'COMPLETED', tone: 'dark' }
    case 'OUT_FOR_DELIVERY':
      return { label: 'Complete', next: 'COMPLETED', tone: 'dark' }
    default:
      return null
  }
}

const ACTION_STYLE = {
  clay: 'bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)]',
  brass: 'bg-[var(--color-brass-500)] hover:bg-[var(--color-brass-400)]',
  dark: 'bg-[var(--color-espresso-900)] hover:bg-[var(--color-espresso-700)]',
} as const

function OrderCard({ order, onAction }: { order: Order; onAction: (id: string, status: OrderStatus) => void }) {
  const action = nextAction(order)
  const fresh = Date.now() - new Date(order.createdAt).getTime() < 25000
  const itemCount = order.items.reduce((a, i) => a + i.quantity, 0)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={
        'rounded-xl border bg-white p-4 transition-shadow hover:shadow-md cursor-pointer ' +
        (fresh && order.status === 'NEW'
          ? 'border-[var(--color-clay-500)]/60 ring-2 ring-[var(--color-clay-500)]/15 shadow-md'
          : 'border-[var(--color-line-light)]')
      }
    >
      <Link to={`${CONSOLE_BASE}/orders/${order.id}`} className="block">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display text-base font-bold text-[var(--color-espresso-900)]">
            {order.orderNumber}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[var(--color-cocoa-300)]">
            <Timer size={12} /> {timeAgo(order.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-[var(--color-cocoa-400)]">{order.customerName}</p>
          <StatusPill status={order.status} />
        </div>

        <ul className="mt-2.5 space-y-0.5 border-t border-dashed border-[var(--color-line-light)] pt-2.5 text-xs leading-snug text-[var(--color-cocoa-400)]">
          {order.items.slice(0, 3).map((i) => (
            <li key={i.id} className="truncate">
              {i.quantity} × {i.name}
            </li>
          ))}
          {order.items.length > 3 && (
            <li className="text-[var(--color-cocoa-300)]">+{order.items.length - 3} more</li>
          )}
        </ul>

        <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-[var(--color-line-light)] pt-2.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-cocoa-400)]">
            {order.fulfilment === 'delivery' ? <Bike size={13} /> : <ShoppingBag size={13} />}
            {order.fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}
            <span aria-hidden>·</span>
            <Wallet size={13} />
            {order.paymentStatus === 'paid' ? 'Paid' : 'COD'}
          </span>
          <span className="font-display text-sm font-bold tabular-nums">{formatPrice(order.total)}</span>
        </div>

        <p className="mt-1.5 text-[11px] text-[var(--color-cocoa-300)]">
          {itemCount} item{itemCount === 1 ? '' : 's'} ·{' '}
          {order.notes ? `“${order.notes}”` : 'No notes'}
        </p>
      </Link>

      {action && (
        <button
          onClick={() => onAction(order.id, action.next)}
          className={`mt-3 w-full rounded-lg py-2.5 text-xs font-bold text-white transition-colors ${ACTION_STYLE[action.tone]}`}
        >
          {action.label}
        </button>
      )}
    </motion.div>
  )
}

const columns: { title: string; hint: string; match: (s: OrderStatus) => boolean }[] = [
  { title: 'New', hint: 'Needs acceptance', match: (s) => s === 'NEW' },
  { title: 'Accepted', hint: 'Queued for kitchen', match: (s) => s === 'ACCEPTED' },
  { title: 'Preparing', hint: 'On the fire', match: (s) => s === 'PREPARING' },
  {
    title: 'Ready & Done',
    hint: 'Awaiting handoff · today',
    match: (s) => s === 'READY' || s === 'OUT_FOR_DELIVERY' || s === 'COMPLETED',
  },
]

export default function OrdersConsole() {
  const orders = useAppStore((s) => s.orders)
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus)

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-[var(--color-line-light)] px-6 py-5 md:px-8">
        <h1 className="font-display text-2xl font-bold text-[var(--color-espresso-900)]">Orders</h1>
        <p className="mt-0.5 text-sm text-[var(--color-cocoa-400)]">
          Live workflow — customer screens update the moment you move an order.
        </p>
      </header>

      <div className="min-h-0 flex-1 overflow-x-auto px-4 pt-4 pb-6 md:px-6">
        <div className="grid h-full min-w-[880px] grid-cols-4 gap-4">
          {columns.map((col) => {
            const colOrders = orders.filter((o) => col.match(o.status))
            return (
              <section key={col.title} aria-label={col.title} className="flex min-h-0 flex-col rounded-xl border border-[var(--color-line-light)] bg-white/60">
                <div className="flex items-center justify-between px-4 pt-3.5 pb-1">
                  <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-espresso-900)]">
                    {col.title}
                  </h2>
                  <span className="rounded-full bg-[var(--color-ivory-100)] px-2 py-0.5 text-[11px] font-semibold tabular-nums text-[var(--color-cocoa-400)]">
                    {colOrders.length}
                  </span>
                </div>
                <p className="px-4 pb-2.5 text-[11px] text-[var(--color-cocoa-300)]">{col.hint}</p>
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-3">
                  {colOrders.length === 0 ? (
                    <div className="mt-2 rounded-xl border border-dashed border-[var(--color-line)] py-10 text-center text-xs text-[var(--color-cocoa-300)]">
                      No orders here
                    </div>
                  ) : (
                    colOrders.map((o) => (
                      <OrderCard key={o.id} order={o} onAction={updateOrderStatus} />
                    ))
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <footer className="border-t border-[var(--color-line-light)] px-6 py-3 text-[11px] text-[var(--color-cocoa-300)] md:px-8">
        Flow: New → Accepted → Preparing → Ready → Out for delivery → Completed. Pickup orders skip delivery.
      </footer>
    </div>
  )
}
