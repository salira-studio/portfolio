import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'

export default function ConsoleMenu() {
  const menuItems = useAppStore((s) => s.menuItems)
  const categories = useAppStore((s) => s.categories)
  const toggleAvailability = useAppStore((s) => s.toggleAvailability)
  const updateMenuPrice = useAppStore((s) => s.updateMenuPrice)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const grouped = categories.map((cat) => ({
    ...cat,
    items: menuItems.filter((m) => m.category === cat.slug),
  }))

  const handleEdit = (id: string, price: number) => {
    setEditingId(id)
    setEditValue(price.toString())
  }

  const handleSave = (id: string) => {
    const num = parseFloat(editValue)
    if (!isNaN(num) && num > 0) {
      updateMenuPrice(id, num)
    }
    setEditingId(null)
  }

  return (
    <div className="px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-[var(--color-espresso-900)]">
        Menu Management
      </h1>
      <p className="mt-1 text-sm text-[var(--color-clay-500)]">
        Manage your menu items, pricing, and availability
      </p>

      <div className="mt-8 space-y-8">
        {grouped.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-espresso-900)]">
              {group.name}
            </h2>
            <div className="mt-3 space-y-2">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-[var(--color-line-light)] bg-white p-4"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-ivory-100)]">
                    <FoodImage
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--color-espresso-900)]">
                      {item.name}
                    </p>
                    {editingId === item.id ? (
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave(item.id)
                            if (e.key === 'Escape') setEditingId(null)
                          }}
                          onBlur={() => handleSave(item.id)}
                          className="w-24 rounded-lg border border-[var(--color-line-light)] px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clay-500)]"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item.id, item.price)}
                        className="mt-1 text-sm font-semibold text-[var(--color-clay-500)] hover:text-[var(--color-espresso-900)]"
                      >
                        {formatPrice(item.price)}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      item.available
                        ? 'bg-emerald-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        item.available ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
