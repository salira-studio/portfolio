import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { formatPrice } from '../../../../shared/lib/format'
import { UtensilsCrossed, ShoppingBag, Bike, Receipt } from 'lucide-react'

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const barHeight = 160

  return (
    <div className="flex items-end gap-2" style={{ height: barHeight }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-medium text-[var(--color-clay-500)]">
            {d.value > 0 ? formatPrice(d.value) : '₹0'}
          </span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * (barHeight - 24)}px` }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="w-full rounded-t-lg bg-[var(--color-clay-500)] min-h-[4px]"
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
  const expenses = useAppStore((s) => s.expenses)

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const totalOrders = orders.length
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0

  // 7-day revenue trend
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

  // Fulfilment breakdown
  const dineInOrders = orders.filter((o) => o.fulfilment === 'dine-in')
  const takeawayOrders = orders.filter((o) => o.fulfilment === 'takeaway')
  const deliveryOrders = orders.filter((o) => o.fulfilment === 'delivery' || o.fulfilment === 'pickup')

  // Item-wise sales and revenue
  const itemSales = menuItems
    .map((item) => {
      let units = 0
      let revenue = 0
      for (const order of orders) {
        for (const orderItem of order.items) {
          if (orderItem.menuItemId === item.id) {
            units += orderItem.quantity
            revenue += orderItem.subtotal
          }
        }
      }
      return {
        ...item,
        unitsSold: units,
        revenueGenerated: revenue,
      }
    })
    .sort((a, b) => b.unitsSold - a.unitsSold)

  // Expense breakdown by category
  const expenseByCategory: Record<string, number> = {}
  for (const exp of expenses) {
    expenseByCategory[exp.category] = (expenseByCategory[exp.category] || 0) + exp.amount
  }

  const kpis = [
    { label: 'Gross Revenue', value: formatPrice(totalRevenue), color: 'text-emerald-600' },
    { label: 'Total Expenses', value: formatPrice(totalExpenses), color: 'text-rose-600' },
    { label: 'Net Profit', value: `${formatPrice(netProfit)} (${profitMargin}%)`, color: netProfit >= 0 ? 'text-blue-600' : 'text-amber-600' },
    { label: 'Avg Order Value', value: formatPrice(Math.round(avgOrderValue)), color: 'text-purple-600' },
  ]

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-espresso-900)]">
          Analytics & Performance
        </h1>
        <p className="mt-1 text-sm text-[var(--color-clay-500)]">
          Financial reporting, channel volume & item-wise dish breakdown
        </p>
      </div>

      {/* Top 4 Financial Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--color-line-light)] bg-white p-5 shadow-xs"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-clay-500)]">
              {kpi.label}
            </p>
            <p className={`mt-2 font-display text-2xl font-bold ${kpi.color}`}>
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Channel Split (Dine-In, Takeaway, Delivery) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[var(--color-line-light)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <UtensilsCrossed size={22} />
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--color-cocoa-400)] uppercase tracking-wider block">
              Dine-In Orders
            </span>
            <span className="font-display text-xl font-bold text-[var(--color-espresso-900)] block">
              {dineInOrders.length} orders
            </span>
            <span className="text-xs text-[var(--color-clay-600)] font-medium">
              {formatPrice(dineInOrders.reduce((s, o) => s + o.total, 0))}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[var(--color-line-light)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <ShoppingBag size={22} />
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--color-cocoa-400)] uppercase tracking-wider block">
              Takeaway (Parcel)
            </span>
            <span className="font-display text-xl font-bold text-[var(--color-espresso-900)] block">
              {takeawayOrders.length} orders
            </span>
            <span className="text-xs text-[var(--color-clay-600)] font-medium">
              {formatPrice(takeawayOrders.reduce((s, o) => s + o.total, 0))}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[var(--color-line-light)] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Bike size={22} />
          </div>
          <div>
            <span className="text-xs font-bold text-[var(--color-cocoa-400)] uppercase tracking-wider block">
              Doorstep Delivery
            </span>
            <span className="font-display text-xl font-bold text-[var(--color-espresso-900)] block">
              {deliveryOrders.length} orders
            </span>
            <span className="text-xs text-[var(--color-clay-600)] font-medium">
              {formatPrice(deliveryOrders.reduce((s, o) => s + o.total, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Expense Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-[var(--color-line-light)] bg-white p-6 shadow-xs"
        >
          <h2 className="mb-4 font-display text-lg font-bold text-[var(--color-espresso-900)]">
            Revenue Trend (Last 7 Days)
          </h2>
          <BarChart data={last7Days} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-[var(--color-line-light)] bg-white p-6 shadow-xs space-y-4"
        >
          <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)] flex items-center gap-2">
            <Receipt size={18} className="text-[var(--color-clay-500)]" />
            <span>Operating Expense Breakdown</span>
          </h2>

          {Object.keys(expenseByCategory).length === 0 ? (
            <p className="py-12 text-center text-xs text-[var(--color-cocoa-400)] border border-dashed border-[var(--color-line)] rounded-xl">
              No operating expenses recorded yet. Use the "+ Record Expense" button on the Overview page to log expenses.
            </p>
          ) : (
            <div className="space-y-2.5">
              {Object.entries(expenseByCategory).map(([cat, amt]) => {
                const pct = totalExpenses > 0 ? Math.round((amt / totalExpenses) * 100) : 0
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-[var(--color-espresso-900)]">
                      <span className="capitalize">{cat}</span>
                      <span className="tabular-nums font-bold text-rose-700">
                        {formatPrice(amt)} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-ivory-100)] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Item-Wise Dish Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-[var(--color-line-light)] bg-white overflow-hidden shadow-xs"
      >
        <div className="p-6 border-b border-[var(--color-line-light)]">
          <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
            Item-Wise Sales & Revenue
          </h2>
          <p className="text-xs text-[var(--color-cocoa-400)] mt-0.5">
            Individual dish breakdown by quantity sold and gross sales value
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line-light)] bg-[var(--color-ivory-50)] text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)]">
                <th className="px-6 py-3.5">Dish Name</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5 text-right">Base Price</th>
                <th className="px-6 py-3.5 text-right">Units Sold</th>
                <th className="px-6 py-3.5 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line-light)] text-xs">
              {itemSales.slice(0, 15).map((item) => (
                <tr key={item.id} className="hover:bg-[var(--color-ivory-50)] transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-[var(--color-espresso-900)]">
                    {item.name}
                  </td>
                  <td className="px-6 py-3.5 capitalize text-[var(--color-cocoa-400)]">
                    {item.category}
                  </td>
                  <td className="px-6 py-3.5 text-right text-[var(--color-espresso-900)] font-medium">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-3.5 text-right font-bold text-[var(--color-espresso-900)] tabular-nums">
                    {item.unitsSold}
                  </td>
                  <td className="px-6 py-3.5 text-right font-bold text-emerald-700 tabular-nums">
                    {formatPrice(item.revenueGenerated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
