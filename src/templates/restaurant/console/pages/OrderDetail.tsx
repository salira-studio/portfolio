import { Link, useParams } from 'react-router-dom'
import { CONSOLE_BASE } from '../../routes'
import { motion } from 'framer-motion'
import { ArrowLeft, Bike, ShoppingBag } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { StatusPill } from '../../../../shared/components/ui/StatusPill'
import { formatPrice, formatTime, timeAgo } from '../../../../shared/lib/format'
import type { Order, OrderStatus } from '../../../../shared/types/domain'

const FLOW: OrderStatus[] = ['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'COMPLETED']
const STEP_LABEL: Record<OrderStatus, string> = {
  NEW: 'Order received',
  ACCEPTED: 'Accepted',
  PREPARING: 'Preparing',
  READY: 'Ready',
  OUT_FOR_DELIVERY: 'Out for delivery',
  COMPLETED: 'Completed',
}

function nextAction(o: Order): { label: string; next: OrderStatus } | null {
  switch (o.status) {
    case 'NEW':
      return { label: 'Accept order', next: 'ACCEPTED' }
    case 'ACCEPTED':
      return { label: 'Start preparing', next: 'PREPARING' }
    case 'PREPARING':
      return { label: 'Mark ready', next: 'READY' }
    case 'READY':
      return o.fulfilment === 'delivery'
        ? { label: 'Out for delivery', next: 'OUT_FOR_DELIVERY' }
        : { label: 'Complete order', next: 'COMPLETED' }
    case 'OUT_FOR_DELIVERY':
      return { label: 'Complete order', next: 'COMPLETED' }
    default:
      return null
  }
}

export default function OrderDetail() {
  const { id = '' } = useParams()
  const order = useAppStore((s) => s.orders.find((o) => o.id === id))
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus)

  if (!order) {
    return (
      <div className="p-8">
        <p className="text-sm text-[var(--color-cocoa-400)]">Order not found.</p>
        <Link to={`${CONSOLE_BASE}/orders`} className="mt-3 inline-block text-sm font-medium text-[var(--color-clay-500)] underline">
          Back to board
        </Link>
      </div>
    )
  }

  const action = nextAction(order)
  const reachedIdx = FLOW.indexOf(order.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl px-4 py-6 md:px-8"
    >
      <Link
        to={`${CONSOLE_BASE}/orders`}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-cocoa-400)] transition hover:text-[var(--color-espresso-900)]"
      >
        <ArrowLeft size={16} /> Orders board
      </Link>

      <header className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--color-espresso-900)]">
            {order.orderNumber}
          </h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-[var(--color-cocoa-400)]">
            {order.fulfilment === 'delivery' ? (
              <>
                <Bike size={15} /> Delivery · {order.address || 'No address'}
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Pickup at counter
              </>
            )}
          </p>
        </div>
        <StatusPill status={order.status} />
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* left column */}
        <section className="rounded-xl border border-[var(--color-line-light)] bg-white p-5">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-cocoa-400)]">Items</h2>
          <ul className="divide-y divide-dashed divide-[var(--color-line-light)]">
            {order.items.map((i) => {
              const labels = i.selectedOptions
                .map((so) => {
                  return so.optionId
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                })
              return (
                <li key={i.id} className="flex justify-between gap-4 py-2.5 text-sm">
                  <span>
                    <span className="font-medium text-[var(--color-espresso-900)]">
                      {i.quantity} × {i.name}
                    </span>
                    {labels.length > 0 && (
                      <span className="block text-xs text-[var(--color-cocoa-400)]">{labels.join(' · ')}</span>
                    )}
                  </span>
                  <span className="shrink-0 tabular-nums text-[var(--color-cocoa-400)]">{formatPrice(i.subtotal)}</span>
                </li>
              )
            })}
          </ul>

          <dl className="mt-3 space-y-1 border-t border-[var(--color-line-light)] pt-3 text-sm">
            <div className="flex justify-between text-[var(--color-cocoa-400)]"><dt>Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
            {order.deliveryFee > 0 && (
              <div className="flex justify-between text-[var(--color-cocoa-400)]"><dt>Delivery</dt><dd>{formatPrice(order.deliveryFee)}</dd></div>
            )}
            <div className="flex justify-between text-[var(--color-cocoa-400)]"><dt>GST</dt><dd>{formatPrice(order.tax)}</dd></div>
            <div className="flex justify-between pt-1.5 font-display text-base font-bold text-[var(--color-espresso-900)]">
              <dt>Total</dt><dd className="tabular-nums">{formatPrice(order.total)}</dd>
            </div>
          </dl>

          {order.notes && (
            <p className="mt-4 rounded-lg bg-[var(--color-ivory-100)] px-3.5 py-2.5 text-sm text-[var(--color-espresso-700)]">
              Note from customer · “{order.notes}”
            </p>
          )}

          <div className="mt-4 flex items-center justify-between rounded-lg bg-[var(--color-ivory-100)] px-3.5 py-2.5 text-sm">
            <span className="text-[var(--color-cocoa-400)]">Payment · {order.paymentMethod}</span>
            <span
              className={
                'font-semibold ' +
                (order.paymentStatus === 'paid' ? 'text-[var(--color-leaf-600)]' : 'text-[var(--color-clay-500)]')
              }
            >
              {order.paymentStatus === 'paid' ? 'Paid' : 'Cash on delivery'}
            </span>
          </div>

          {action && (
            <button
              onClick={() => updateOrderStatus(order.id, action.next)}
              className={
                'mt-5 w-full rounded-xl py-3 text-sm font-bold text-white transition-colors ' +
                (action.next === 'READY'
                  ? 'bg-[var(--color-brass-500)] hover:bg-[var(--color-brass-400)]'
                  : action.next === 'COMPLETED' || action.next === 'OUT_FOR_DELIVERY'
                    ? 'bg-[var(--color-espresso-900)] hover:bg-[var(--color-espresso-700)]'
                    : 'bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)]')
              }
            >
              {action.label}
            </button>
          )}
        </section>

        {/* right column */}
        <aside className="space-y-5">
          <section className="rounded-xl border border-[var(--color-line-light)] bg-white p-5">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-cocoa-400)]">Customer</h2>
            <p className="text-sm font-semibold">{order.customerName}</p>
            <p className="mt-0.5 text-[13px] text-[var(--color-cocoa-400)]">{order.contact.phone}</p>
            {order.contact.email && (
              <p className="text-[13px] text-[var(--color-cocoa-400)]">{order.contact.email}</p>
            )}
          </section>

          <section className="rounded-xl border border-[var(--color-line-light)] bg-white p-5">
            <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-cocoa-400)]">
              Timeline · placed {timeAgo(order.createdAt)}
            </h2>
            <ol>
              {FLOW.filter((s) =>
                order.fulfilment === 'pickup' ? s !== 'OUT_FOR_DELIVERY' : true,
              ).map((s, idx, arr) => {
                const done = idx < reachedIdx
                const current = idx === reachedIdx
                return (
                  <li key={s} className="relative flex gap-3 pb-4 last:pb-0">
                    {!current && idx !== arr.length - 1 && (
                      <span
                        aria-hidden
                        className={'absolute top-5 left-[7px] h-full w-0.5 rounded-full ' + (done ? 'bg-[var(--color-leaf-600)]/50' : 'bg-[var(--color-line)]')}
                      />
                    )}
                    <span
                      aria-hidden
                      className={
                        'relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ' +
                        (done
                          ? 'border-[var(--color-leaf-600)] bg-[var(--color-leaf-600)]'
                          : current
                            ? 'border-[var(--color-clay-500)] bg-[var(--color-clay-500)] ring-4 ring-[var(--color-clay-500)]/15'
                            : 'border-[var(--color-line)] bg-white')
                      }
                    >
                      {(done || current) && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2 pt-0.5">
                      <p
                        className={
                          'text-sm leading-tight font-semibold ' +
                          (current
                            ? 'text-[var(--color-clay-500)]'
                            : done
                              ? 'text-[var(--color-espresso-900)]'
                              : 'text-[var(--color-cocoa-300)]')
                        }
                      >
                        {STEP_LABEL[s]}
                      </p>
                      {current && <span className="shrink-0 text-[11px] text-[var(--color-cocoa-300)]">{formatTime(order.updatedAt)}</span>}
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        </aside>
      </div>
    </motion.div>
  )
}
