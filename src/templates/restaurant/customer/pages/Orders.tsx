import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { StatusPill } from '../../../../shared/components/ui/StatusPill'
import { formatPrice, formatDate, formatTime } from '../../../../shared/lib/format'

export default function Orders() {
  const orders = useAppStore((state) => state.orders)

  if (!orders.length) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[var(--color-ivory-100)] flex items-center justify-center text-[var(--color-cocoa-300)] mb-4 border border-[var(--color-line)]">
          <ShoppingBag size={36} strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-2xl font-bold text-[var(--color-espresso-900)] mb-2">
          No Orders Placed Yet
        </h2>
        <p className="text-sm text-[var(--color-cocoa-400)] mb-8 leading-relaxed">
          When you place an order, its live preparation and delivery status will appear here in real time.
        </p>
        <Link
          to={`${CUSTOMER_BASE}/menu`}
          className="inline-flex items-center gap-2 bg-[var(--color-clay-500)] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[var(--color-clay-600)] transition-all shadow-sm"
        >
          <span>Explore Menu & Order</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-line-light)] pb-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
              Your Orders & Live Tracking
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] mt-0.5">
              Track active orders and review your dining history
            </p>
          </div>
          <Link
            to={`${CONSOLE_BASE}/orders`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-[var(--color-line)] text-[var(--color-espresso-900)] px-3 py-2 rounded-xl hover:bg-[var(--color-ivory-100)] transition-colors"
          >
            <span>Kitchen Console</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {/* Responsive Grid of Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`${CUSTOMER_BASE}/order/${order.id}`}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-[var(--color-line)] hover:border-[var(--color-clay-500)] p-5 shadow-xs hover:shadow-md transition-all h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base text-[var(--color-espresso-900)] group-hover:text-[var(--color-clay-500)] transition-colors">
                      #{order.orderNumber}
                    </span>
                    <StatusPill status={order.status} />
                  </div>

                  <div className="space-y-1.5 text-xs text-[var(--color-cocoa-400)]">
                    <p className="font-medium text-[var(--color-espresso-800)] text-sm">
                      {order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-[11px]">
                      <span>{formatDate(order.createdAt)}</span>
                      <span>·</span>
                      <span>{formatTime(order.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--color-line-light)] flex items-center justify-between">
                  <span className="font-display font-bold text-base text-[var(--color-espresso-900)]">
                    {formatPrice(order.total)}
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-clay-600)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Track Live</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
