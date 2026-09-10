import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Receipt,
  UtensilsCrossed,
  ShoppingBag,
  Bike,
  Trash2,
} from 'lucide-react'
import { CONSOLE_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { StatusPill } from '../../../../shared/components/ui/StatusPill'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'
import RecordExpenseModal from '../components/RecordExpenseModal'

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
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)

  const orders = useAppStore((s) => s.orders)
  const menuItems = useAppStore((s) => s.menuItems)
  const restaurant = useAppStore((s) => s.restaurant)
  const expenses = useAppStore((s) => s.expenses)
  const deleteExpense = useAppStore((s) => s.deleteExpense)

  const todayStr = new Date().toISOString().slice(0, 10)
  const todayDateStr = new Date().toDateString()

  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === todayDateStr,
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

  // Filter today's expenses
  const todayExpenses = expenses.filter((e) => e.date === todayStr || new Date(e.createdAt).toDateString() === todayDateStr)
  const todayExpenseTotal = todayExpenses.reduce((s, e) => s + e.amount, 0)
  const netProfit = todayRevenue - todayExpenseTotal
  const profitMargin = todayRevenue > 0 ? Math.round((netProfit / todayRevenue) * 100) : 0

  const popularItems = [...menuItems]
    .filter((m) => m.popular)
    .slice(0, 3)

  const kpis = [
    { label: "Today's Orders", value: todayOrders.length.toString(), color: 'text-blue-600' },
    { label: "Today's Gross Sales", value: formatPrice(todayRevenue), color: 'text-emerald-600' },
    { label: 'Active Kitchen Tickets', value: activeOrders.length.toString(), color: 'text-amber-600' },
    { label: 'Avg Ticket Size', value: formatPrice(Math.round(avgOrderValue)), color: 'text-purple-600' },
  ]

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-espresso-900)]">
            {getGreeting()}, {restaurant.name}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-clay-500)]">{getDate()}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5">
          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)] text-white px-4 py-2.5 text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
          >
            <Plus size={15} />
            <span>Record Expense</span>
          </button>
        </motion.div>
      </div>

      {/* KPI Cards */}
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

      {/* ── Daily P&L Executive Statement Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-line-light)] pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)] flex items-center gap-2">
              <Receipt size={20} className="text-[var(--color-clay-500)]" />
              <span>Daily Operating Profit & Loss (P&L)</span>
            </h2>
            <p className="text-xs text-[var(--color-cocoa-400)] mt-0.5">
              Real-time reconciliation of today's sales against kitchen operating expenses
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-ivory-100)] text-[var(--color-espresso-800)]">
            Accounting Date: {todayStr}
          </span>
        </div>

        {/* 3-Column P&L Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Gross Revenue
            </span>
            <span className="font-display text-2xl font-bold text-emerald-900 mt-1 block">
              {formatPrice(todayRevenue)}
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">
              {todayOrders.length} orders settled today
            </span>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                Operating Outflow
              </span>
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="text-[11px] font-bold text-rose-700 hover:text-rose-900 underline"
              >
                + Add
              </button>
            </div>
            <span className="font-display text-2xl font-bold text-rose-900 mt-1 block">
              {formatPrice(todayExpenseTotal)}
            </span>
            <span className="text-[11px] text-rose-700 mt-0.5 block">
              {todayExpenses.length} expense items recorded
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              netProfit >= 0
                ? 'bg-blue-50/60 border-blue-100'
                : 'bg-amber-50/60 border-amber-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                Net Operating Profit
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                  netProfit >= 0
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {netProfit >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {profitMargin}% margin
              </span>
            </div>
            <span
              className={`font-display text-2xl font-bold mt-1 block ${
                netProfit >= 0 ? 'text-blue-950' : 'text-amber-900'
              }`}
            >
              {formatPrice(netProfit)}
            </span>
            <span className="text-[11px] text-[var(--color-cocoa-400)] mt-0.5 block">
              Gross Revenue − Recorded Outflows
            </span>
          </div>
        </div>

        {/* Recent Expenses Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)]">
              Today's Recorded Expenses
            </h3>
            {todayExpenses.length > 0 && (
              <span className="text-xs text-[var(--color-cocoa-400)]">
                Total: {formatPrice(todayExpenseTotal)}
              </span>
            )}
          </div>

          {todayExpenses.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-[var(--color-line)] text-center text-xs text-[var(--color-cocoa-400)] bg-[var(--color-ivory-50)]">
              No expenses recorded today. Click{' '}
              <button
                onClick={() => setIsExpenseModalOpen(true)}
                className="font-bold text-[var(--color-clay-600)] underline ml-1"
              >
                Record Expense
              </button>{' '}
              to log rice, ghee, vegetables, cylinder or wages.
            </div>
          ) : (
            <div className="space-y-2">
              {todayExpenses.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-line-light)] bg-[var(--color-ivory-50)] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-[var(--color-line)] text-[10px] text-[var(--color-espresso-900)]">
                      {exp.category}
                    </span>
                    <span className="font-medium text-[var(--color-espresso-900)]">
                      {exp.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-rose-700 tabular-nums">
                      −{formatPrice(exp.amount)}
                    </span>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-[var(--color-cocoa-300)] hover:text-red-600 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Active Orders & Popular Items Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Orders Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-[var(--color-line-light)] bg-white p-6 shadow-xs"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
              Active Kitchen Orders
            </h2>
            <Link
              to={`${CONSOLE_BASE}/orders`}
              className="text-xs font-semibold text-[var(--color-clay-500)] hover:text-[var(--color-espresso-900)]"
            >
              Open Kanban Board →
            </Link>
          </div>
          <div className="space-y-3">
            {activeOrders.length === 0 ? (
              <p className="py-10 text-center text-xs text-[var(--color-clay-500)] border border-dashed border-[var(--color-line)] rounded-xl">
                No active orders at this moment. New orders placed from the PWA will instantly appear here.
              </p>
            ) : (
              activeOrders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--color-line-light)] p-3.5 hover:border-[var(--color-line-dark)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--color-espresso-900)]">
                      {order.orderNumber}
                    </span>
                    <StatusPill status={order.status} />
                    <span className="text-[11px] text-[var(--color-cocoa-400)] flex items-center gap-1">
                      {order.fulfilment === 'dine-in' ? (
                        <>
                          <UtensilsCrossed size={12} className="text-amber-700" />
                          <span>{order.tableNumber || 'Table 01'}</span>
                        </>
                      ) : order.fulfilment === 'takeaway' ? (
                        <>
                          <ShoppingBag size={12} className="text-emerald-700" />
                          <span>Parcel</span>
                        </>
                      ) : (
                        <>
                          <Bike size={12} className="text-blue-700" />
                          <span>Delivery</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[var(--color-clay-500)]">
                      {order.items.length} items
                    </p>
                    <p className="text-sm font-bold text-[var(--color-espresso-900)]">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Popular Items Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-[var(--color-line-light)] bg-white p-6 shadow-xs"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
              Signature Dishes
            </h2>
            <Link
              to={`${CONSOLE_BASE}/menu`}
              className="text-xs font-semibold text-[var(--color-clay-500)] hover:text-[var(--color-espresso-900)]"
            >
              Manage Menu →
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
                  className="flex items-center gap-3 rounded-xl border border-[var(--color-line-light)] p-3"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--color-ivory-100)] border border-[var(--color-line-light)]">
                    <FoodImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--color-espresso-900)]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[var(--color-clay-500)]">
                      {orderCount} orders settled
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-espresso-900)]">
                    {formatPrice(item.price)}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Record Expense Modal */}
      <RecordExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
    </div>
  )
}
