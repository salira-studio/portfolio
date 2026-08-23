import { useParams, useNavigate, Link } from 'react-router-dom'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../../routes'
import {
  Check,
  ArrowLeft,
  Clock,
  ExternalLink,
  ChefHat,
  ShoppingBag,
  Sparkles,
  MapPin,
  Phone,
  PlayCircle,
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { formatPrice, formatTime } from '../../../../shared/lib/format'
import type { OrderStatus } from '../../../../shared/types/domain'

const STATUS_STAGES: {
  status: OrderStatus
  title: string
  desc: string
}[] = [
  {
    status: 'NEW',
    title: 'Order Received',
    desc: 'Sent to the kitchen. Waiting for kitchen acceptance.',
  },
  {
    status: 'ACCEPTED',
    title: 'Order Accepted',
    desc: 'The head chef reviewed and accepted your ticket.',
  },
  {
    status: 'PREPARING',
    title: 'Preparing in Kitchen',
    desc: 'Cast-iron griddle heating, fresh spice grinding underway.',
  },
  {
    status: 'READY',
    title: 'Order Ready',
    desc: 'Packed hot and fresh in traditional leaf packaging.',
  },
  {
    status: 'COMPLETED',
    title: 'Order Completed',
    desc: 'Delivered or picked up. Thank you for dining with AURA!',
  },
]

const STATUS_INDEX: Record<OrderStatus, number> = {
  NEW: 0,
  ACCEPTED: 1,
  PREPARING: 2,
  READY: 3,
  OUT_FOR_DELIVERY: 3,
  COMPLETED: 4,
}

const NEXT_STATUS_MAP: Record<OrderStatus, OrderStatus | null> = {
  NEW: 'ACCEPTED',
  ACCEPTED: 'PREPARING',
  PREPARING: 'READY',
  READY: 'COMPLETED',
  OUT_FOR_DELIVERY: 'COMPLETED',
  COMPLETED: null,
}

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const orders = useAppStore((s) => s.orders)
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus)

  const order = orders.find((o) => o.id === id) || orders[0]

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <ShoppingBag size={48} className="text-[var(--color-cocoa-300)] mb-3" />
        <h2 className="font-display text-2xl font-bold text-[var(--color-espresso-900)] mb-2">
          No Active Order Found
        </h2>
        <p className="text-sm text-[var(--color-cocoa-400)] mb-6">
          You haven't placed an order yet. Select items from our menu to start a fresh order.
        </p>
        <Link
          to={`${CUSTOMER_BASE}/menu`}
          className="inline-flex items-center gap-2 bg-[var(--color-clay-500)] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[var(--color-clay-600)] transition-colors"
        >
          <span>Browse Menu</span>
        </Link>
      </div>
    )
  }

  const currentStageIndex = STATUS_INDEX[order.status] ?? 0
  const nextStatus = NEXT_STATUS_MAP[order.status]

  function handleSimulateNextStep() {
    if (!nextStatus || !order) return
    updateOrderStatus(order.id, nextStatus)
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Status Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line-light)] pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`${CUSTOMER_BASE}/orders`)}
              className="p-2 rounded-xl bg-white border border-[var(--color-line)] text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-100)] transition-colors shadow-2xs"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
                  Live Order Tracker
                </h1>
                <span className="font-mono font-bold text-sm bg-[var(--color-ivory-200)] text-[var(--color-espresso-900)] px-2.5 py-0.5 rounded-md">
                  #{order.orderNumber}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] mt-0.5">
                Placed at {formatTime(order.createdAt)} · Real-time kitchen synchronization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`${CONSOLE_BASE}/orders`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[var(--color-espresso-900)] text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--color-clay-500)] transition-colors shadow-xs"
            >
              <span>Open Kitchen Console</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* ── Responsive 2-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column (7 cols): Live Timeline & Real-Time Sync Controller ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Status Hero Banner */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xs">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-clay-500)] block mb-1">
                    Current Live Status
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-espresso-900)]">
                    {STATUS_STAGES[currentStageIndex]?.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] mt-1">
                    {STATUS_STAGES[currentStageIndex]?.desc}
                  </p>
                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--color-ivory-100)] text-[var(--color-clay-600)] flex items-center justify-center shrink-0 border border-[var(--color-line-light)]">
                  {order.status === 'COMPLETED' ? (
                    <Check size={32} className="text-emerald-600" />
                  ) : order.status === 'READY' ? (
                    <ChefHat size={32} className="text-[var(--color-clay-600)]" />
                  ) : order.status === 'PREPARING' ? (
                    <Clock size={32} className="text-[var(--color-clay-600)] animate-spin" />
                  ) : (
                    <Sparkles size={32} className="text-amber-500 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Progress Stepper Timeline */}
              <div className="space-y-6 pt-4 border-t border-[var(--color-line-light)]">
                {STATUS_STAGES.map((stage, idx) => {
                  const isDone = idx < currentStageIndex
                  const isCurrent = idx === currentStageIndex

                  return (
                    <div key={stage.status} className="flex items-start gap-4 group">
                      {/* Step Indicator */}
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isDone
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : isCurrent
                              ? 'bg-[var(--color-clay-500)] text-white ring-4 ring-[var(--color-clay-500)]/20 scale-110 shadow-sm'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          }`}
                        >
                          {isDone ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        {idx < STATUS_STAGES.length - 1 && (
                          <div
                            className={`w-0.5 h-10 my-1 transition-colors ${
                              isDone ? 'bg-emerald-600' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="pt-1">
                        <p
                          className={`text-sm sm:text-base font-semibold ${
                            isCurrent
                              ? 'text-[var(--color-clay-600)] font-bold'
                              : isDone
                              ? 'text-[var(--color-espresso-900)]'
                              : 'text-gray-400'
                          }`}
                        >
                          {stage.title}
                        </p>
                        <p
                          className={`text-xs ${
                            isCurrent
                              ? 'text-[var(--color-cocoa-500)] font-medium'
                              : isDone
                              ? 'text-[var(--color-cocoa-400)]'
                              : 'text-gray-300'
                          }`}
                        >
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interactive Multi-Tab / Single-Tab Demonstration Card */}
            <div className="bg-[var(--color-espresso-900)] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-white/10 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-display font-semibold text-sm">
                <Sparkles size={16} />
                <span>Connected Showcase Simulation</span>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                This order was broadcast to the Restaurant Console via BroadcastChannel.
                You can open the console in a second browser tab to accept and advance this order,
                or advance it directly here:
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {nextStatus ? (
                  <button
                    onClick={handleSimulateNextStep}
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-400)] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                  >
                    <PlayCircle size={16} />
                    <span>Advance Status → {nextStatus}</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-4 py-2.5 rounded-xl">
                    <Check size={16} />
                    <span>Order Lifecycle Completed</span>
                  </div>
                )}

                <Link
                  to={`${CONSOLE_BASE}/orders`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors border border-white/10"
                >
                  <span>View in Restaurant Console</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right Column (5 cols): Full Order Receipt & Delivery Details ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[var(--color-line)] shadow-xs space-y-5">
              <div className="flex items-baseline justify-between border-b border-[var(--color-line-light)] pb-4">
                <h3 className="font-display font-bold text-lg text-[var(--color-espresso-900)]">
                  Order Summary
                </h3>
                <span className="text-xs font-semibold text-[var(--color-clay-600)]">
                  {order.fulfilment === 'delivery' ? 'Home Delivery' : 'Express Pickup'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start text-xs sm:text-sm"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--color-espresso-900)]">
                          {item.quantity}×
                        </span>
                        <span className="font-medium text-[var(--color-espresso-900)] truncate">
                          {item.name}
                        </span>
                      </div>
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <p className="text-[11px] text-[var(--color-cocoa-400)] pl-5">
                          {item.selectedOptions.map((o) => o.optionId).join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-[var(--color-espresso-900)]">
                      {formatPrice(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial breakdown */}
              <div className="border-t border-[var(--color-line-light)] pt-4 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Item Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee > 0 ? formatPrice(order.deliveryFee) : 'Free'}</span>
                </div>
                <div className="flex justify-between text-[var(--color-cocoa-500)]">
                  <span>Taxes (5% GST)</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="border-t border-[var(--color-line-light)] pt-3 flex justify-between items-baseline font-bold text-base sm:text-lg text-[var(--color-espresso-900)]">
                  <span>Grand Total</span>
                  <span className="text-[var(--color-clay-600)] font-display text-xl">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Delivery / Pickup & Contact Info Card */}
              <div className="border-t border-[var(--color-line-light)] pt-4 space-y-3 text-xs text-[var(--color-cocoa-500)]">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[var(--color-clay-500)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--color-espresso-900)] block">
                      {order.fulfilment === 'delivery' ? 'Delivering To' : 'Kitchen Pickup'}
                    </span>
                    <span>
                      {order.fulfilment === 'delivery'
                        ? order.address || 'Standard Address'
                        : '14 Kalakshetra Avenue, Adyar, Chennai'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone size={15} className="text-[var(--color-clay-500)] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[var(--color-espresso-900)] block">
                      Diner Details
                    </span>
                    <span>
                      {order.contact.name} ({order.contact.phone})
                    </span>
                  </div>
                </div>

                {order.notes && (
                  <div className="p-3 bg-[var(--color-ivory-100)] rounded-xl border border-[var(--color-line-light)]">
                    <span className="font-semibold text-[var(--color-espresso-900)] block">
                      Notes for Kitchen:
                    </span>
                    <span className="italic">{order.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                to={`${CUSTOMER_BASE}/menu`}
                className="text-xs font-semibold text-[var(--color-clay-500)] hover:text-[var(--color-clay-600)] underline"
              >
                ← Return to Full Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
