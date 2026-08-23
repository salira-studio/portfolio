import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { formatPrice } from '../../../../shared/lib/format'

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const barHeight = 160

  return (
    <div className="flex items-end gap-2" style={{ height: barHeight }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-medium text-[var(--color-clay-500)]">
            {formatPrice(d.value)}
          </span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * (barHeight - 24)}px` }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="w-full rounded-t-lg bg-[var(--color-clay-500)]"
          />
          <span className="text-[10px] font-medium text-[var(--color-clay-500)]">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Analytics() {
  const orders = useAppStore((s) => s.orders)
  const menuItems = useAppStore((s) => s.menuItems)
  const customers = useAppStore((s) => s.customers)

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toDateString()
    const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short' })
    const revenue = orders
      .filter((o) => new Date(o.createdAt).toDateString() === dateStr)
      .reduce((s, o) => s + o.total, 0)
    return { label: dayLabel, value: revenue }
  })

  const popularItems = menuItems
    .map((item) => ({
      ...item,
      orderCount: orders.reduce(
        (count, o) => count + o.items.filter((i) => i.menuItemId === item.id).length,
        0,
      ),
    }))
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 5)

  const kpis = [
    { label: 'Total Revenue', value: formatPrice(totalRevenue) },
    { label: 'Total Orders', value: totalOrders.toString() },
    { label: 'Avg Order Value', value: formatPrice(Math.round(avgOrderValue)) },
    { label: 'Customers', value: customers.length.toString() },
  ]

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-[var(--color-espresso-900)]">
        Analytics
      </h1>
      <p className="mt-1 text-sm text-[var(--color-clay-500)]">
        Business insights and performance metrics
      </p>

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
            <p className="mt-2 font-display text-2xl font-bold text-[var(--color-espresso-900)]">
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
          <h2 className="mb-4 font-display text-lg font-semibold text-[var(--color-espresso-900)]">
            Revenue (Last 7 Days)
          </h2>
          <BarChart data={last7Days} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-[var(--color-line-light)] bg-white p-5"
        >
          <h2 className="mb-4 font-display text-lg font-semibold text-[var(--color-espresso-900)]">
            Popular Items
          </h2>
          <div className="space-y-3">
            {popularItems.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-line-light)] p-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-ivory-100)] text-xs font-bold text-[var(--color-clay-500)]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--color-espresso-900)]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--color-clay-500)]">
                    {item.orderCount} orders
                  </p>
                </div>
                <span className="text-sm font-semibold text-[var(--color-espresso-900)]">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
