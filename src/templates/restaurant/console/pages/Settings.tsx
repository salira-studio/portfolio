import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { formatPrice } from '../../../../shared/lib/format'

export default function Settings() {
  const restaurant = useAppStore((s) => s.restaurant)

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  const fields = [
    { label: 'Restaurant Name', value: restaurant.name },
    { label: 'Address', value: restaurant.address },
    { label: 'Phone', value: restaurant.phone },
    { label: 'Email', value: restaurant.email },
    { label: 'Operating Hours', value: restaurant.hours },
    { label: 'Delivery Fee', value: formatPrice(restaurant.deliveryFee) },
    { label: 'Tax Rate', value: `${(restaurant.taxRate * 100).toFixed(0)}%` },
  ]

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-[var(--color-espresso-900)]">
        Settings
      </h1>
      <p className="mt-1 text-sm text-[var(--color-clay-500)]">
        Restaurant configuration and preferences
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[var(--color-line-light)] bg-white p-6"
        >
          <h2 className="mb-4 font-display text-lg font-semibold text-[var(--color-espresso-900)]">
            Restaurant Info
          </h2>
          <div className="space-y-4">
            {fields.map((f) => (
              <div key={f.label} className="flex items-start justify-between gap-4 border-b border-[var(--color-line-light)] pb-3 last:border-0 last:pb-0">
                <span className="text-sm text-[var(--color-clay-500)]">{f.label}</span>
                <span className="text-sm font-medium text-[var(--color-espresso-900)]">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[var(--color-line-light)] bg-white p-6"
        >
          <h2 className="mb-4 font-display text-lg font-semibold text-[var(--color-espresso-900)]">
            System
          </h2>
          <p className="mb-6 text-sm text-[var(--color-clay-500)]">
            Reset all data to the original demo state. This will clear your local storage and reload the page.
          </p>
          <button
            onClick={handleReset}
            className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
          >
            Reset Demo Data
          </button>
        </motion.div>
      </div>
    </div>
  )
}
