import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Check } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import type { ExpenseCategory } from '../../../../shared/types/domain'

interface RecordExpenseModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES: { id: ExpenseCategory; label: string; desc: string }[] = [
  { id: 'provisions', label: 'Provisions', desc: 'Rice, dal, spices, country ghee & oils' },
  { id: 'dairy', label: 'Dairy', desc: 'Fresh cows milk, curd & butter' },
  { id: 'vegetables', label: 'Vegetables', desc: 'Shallots, drumsticks, plantain leaves' },
  { id: 'gas', label: 'Commercial Gas', desc: 'LPG cylinder refills' },
  { id: 'labor', label: 'Staff Wages', desc: 'Kitchen master, tawa chefs & service boys' },
  { id: 'misc', label: 'Misc & Supplies', desc: 'Packing parcels, banana leaves, cleaning' },
]

export default function RecordExpenseModal({ isOpen, onClose }: RecordExpenseModalProps) {
  const addExpense = useAppStore((s) => s.addExpense)

  const [category, setCategory] = useState<ExpenseCategory>('provisions')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) return

    addExpense({
      category,
      amount: numericAmount,
      description: description.trim() || `${CATEGORIES.find((c) => c.id === category)?.label} Purchase`,
      date,
      recordedBy: 'Store Manager',
    })

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setAmount('')
      setDescription('')
      onClose()
    }, 600)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl border border-[var(--color-line)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--color-line-light)] px-6 py-4">
            <div>
              <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
                Record Daily Expense
              </h2>
              <p className="text-xs text-[var(--color-cocoa-400)]">
                Update Annachis real-time P&L statement
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-[var(--color-cocoa-400)] hover:bg-[var(--color-ivory-100)] hover:text-[var(--color-espresso-900)]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Category Select */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)] block mb-2">
                Expense Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      category === c.id
                        ? 'border-[var(--color-clay-500)] bg-[var(--color-clay-500)]/5 ring-1 ring-[var(--color-clay-500)]'
                        : 'border-[var(--color-line-light)] hover:bg-[var(--color-ivory-50)]'
                    }`}
                  >
                    <span className="block font-semibold text-xs text-[var(--color-espresso-900)]">
                      {c.label}
                    </span>
                    <span className="block text-[10px] text-[var(--color-cocoa-400)] truncate mt-0.5">
                      {c.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)] block mb-1">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-sm text-[var(--color-espresso-800)]">
                  ₹
                </span>
                <input
                  type="number"
                  step="any"
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1450"
                  className="w-full pl-8 pr-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm font-semibold text-[var(--color-espresso-900)] placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)]"
                />
              </div>
            </div>

            {/* Description / Vendor */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)] block mb-1">
                Description / Vendor
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 25kg Sona Masoori Rice & Kongu Spices"
                className="w-full px-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm text-[var(--color-espresso-900)] placeholder:text-[var(--color-cocoa-300)] focus:outline-none focus:border-[var(--color-clay-500)]"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-400)] block mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--color-ivory-50)] border border-[var(--color-line)] rounded-xl text-sm text-[var(--color-espresso-900)] focus:outline-none focus:border-[var(--color-clay-500)]"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[var(--color-line-light)] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[var(--color-line)] text-xs font-semibold text-[var(--color-cocoa-500)] hover:bg-[var(--color-ivory-50)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={success}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-clay-500)] hover:bg-[var(--color-clay-600)] text-white text-xs font-bold transition-all shadow-xs"
              >
                {success ? (
                  <>
                    <Check size={14} />
                    <span>Saved to P&L</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Record Expense</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
