import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CONSOLE_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { StatusPill } from '../../../../shared/components/ui/StatusPill'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getDate() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Overview() {
  const orders = useAppStore((s) => s.orders)
  const menuItems = useAppStore((s) => s.menuItems)
  const restaurant = useAppStore((s) => s.restaurant)

  const today = new Date().toDateString()
  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today,
  )
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0)
  const activeOrders = orders.filter(
    (o) =>
      o.status !== 'COMPLETED' &&
      o.status !== 'OUT_FOR_DELIVERY',
  )
  const avgOrderValue = todayOrders.length
    ? todayRevenue / todayOrders.length
    : 0

  const popularItems = [...menuItems]
    .filter((m) => m.popular)
    .slice(0, 3)

  const kpis = [
    { label: "Today's Orders", value: todayOrders.length.toString(), color: 'text-blue-600' },
    { label: "Today's Revenue", value: formatPrice(todayRevenue), color: 'text-emerald-600' },
    { label: 'Active Orders', value: activeOrders.length.toString(), color: 'text-amber-600' },
    { label: 'Avg Order Value', value: formatPrice(Math.round(avgOrderValue)), color: 'text-purple-600' },
  ]

  return (
    <div className="px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-[var(--color-espresso-900)]">
          {getGreeting()}, {restaurant.name}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-clay-500)]">{getDate()}</p>
      </motion.div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-[var(--color-line-light)] bg-white p-5"
          >
            <p className="text-xs font-medium text-[var(--color-clay-500)]">
              {kpi.label}
            </p>
            <p className={`mt-2 font-display text-2xl font-bold ${kpi.color}`}>
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[var(--color-line-light)] bg-white p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--color-espresso-900)]">
              Active Orders
            </h2>
            <Link
              to={`${CONSOLE_BASE}/orders`}
              className="text-sm font-medium text-[var(--color-clay-500)] hover:text-[var(--color-espresso-900)]"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {activeOrders.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--color-clay-500)]">
                No active orders
              </p>
            ) : (
              activeOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-line-light)] p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-[var(--color-espresso-900)]">
                      {order.orderNumber}
                    </span>
                    <StatusPill status={order.status} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--color-clay-500)]">
                      {order.items.length} items
                    </p>
                    <p className="text-sm font-semibold text-[var(--color-espresso-900)]">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-[var(--color-line-light)] bg-white p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--color-espresso-900)]">
              Popular Items
            </h2>
            <Link
              to={`${CONSOLE_BASE}/menu`}
              className="text-sm font-medium text-[var(--color-clay-500)] hover:text-[var(--color-espresso-900)]"
            >
              View menu
            </Link>
          </div>
          <div className="space-y-3">
            {popularItems.map((item) => {
              const orderCount = orders.reduce((count, o) => {
                return count + o.items.filter((i) => i.menuItemId === item.id).length
              }, 0)
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-[var(--color-line-light)] p-3"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--color-ivory-100)]">
                    <FoodImage src={item.image} alt={item.name} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--color-espresso-900)]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[var(--color-clay-500)]">
                      {orderCount} orders
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-espresso-900)]">
                    {formatPrice(item.price)}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
