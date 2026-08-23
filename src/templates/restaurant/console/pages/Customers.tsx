import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { formatPrice } from '../../../../shared/lib/format'

export default function Customers() {
  const customers = useAppStore((s) => s.customers)

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-[var(--color-espresso-900)]">
        Customers
      </h1>
      <p className="mt-1 text-sm text-[var(--color-clay-500)]">
        View your customer base
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 overflow-hidden rounded-xl border border-[var(--color-line-light)] bg-white"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line-light)] bg-[var(--color-ivory-50)]">
                <th className="px-4 py-3 font-semibold text-[var(--color-espresso-900)]">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--color-espresso-900)]">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--color-espresso-900)]">
                  Phone
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--color-espresso-900)]">
                  Orders
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--color-espresso-900)]">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-[var(--color-line-light)] last:border-0 hover:bg-[var(--color-ivory-50)]"
                >
                  <td className="px-4 py-3 font-medium text-[var(--color-espresso-900)]">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-clay-500)]">{c.email}</td>
                  <td className="px-4 py-3 text-[var(--color-clay-500)]">{c.phone}</td>
                  <td className="px-4 py-3 text-right text-[var(--color-clay-500)]">
                    {c.totalOrders}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[var(--color-espresso-900)]">
                    {formatPrice(c.totalSpent)}
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
