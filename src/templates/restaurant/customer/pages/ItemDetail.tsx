import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CUSTOMER_BASE } from '../../routes'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Minus,
  Plus,
  Check,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { VegDot } from '../../../../shared/components/ui/VegDot'
import { Badge } from '../../../../shared/components/ui/Badge'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'
import type { SelectedOption } from '../../../../shared/types/domain'

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const item = useAppStore((s) => s.menuItems.find((i) => i.id === id))
  const addToCart = useAppStore((s) => s.addToCart)

  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(() => {
    if (!item) return []
    // Pre-select required single-choice default option if any
    const defaults: SelectedOption[] = []
    item.optionGroups.forEach((g) => {
      if (g.required && g.type === 'single' && g.options.length > 0) {
        defaults.push({ groupId: g.id, optionId: g.options[0].id })
      }
    })
    return defaults
  })
  const [added, setAdded] = useState(false)

  if (!item) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <AlertCircle size={48} className="text-[var(--color-cocoa-300)] mb-3" />
        <h2 className="font-display text-xl font-bold text-[var(--color-espresso-900)]">
          Item Not Found
        </h2>
        <p className="text-sm text-[var(--color-cocoa-400)] mt-1 max-w-sm">
          This dish may have been removed or updated. Please browse our active menu.
        </p>
        <Link
          to={`${CUSTOMER_BASE}/menu`}
          className="mt-6 px-6 py-2.5 rounded-xl bg-[var(--color-clay-500)] text-white text-sm font-semibold hover:bg-[var(--color-clay-600)] transition-colors"
        >
          Return to Menu
        </Link>
      </div>
    )
  }

  const isSoldOut = !item.available

  // Calculate live line price
  const extrasTotal = selectedOptions.reduce((sum, so) => {
    const group = item.optionGroups.find((g) => g.id === so.groupId)
    const opt = group?.options.find((o) => o.id === so.optionId)
    return sum + (opt?.priceDelta ?? 0)
  }, 0)

  const lineUnitPrice = item.price + extrasTotal
  const totalLinePrice = lineUnitPrice * quantity

  function toggleOption(groupId: string, optionId: string, type: 'single' | 'multi') {
    setSelectedOptions((prev) => {
      if (type === 'single') {
        const without = prev.filter((o) => o.groupId !== groupId)
        return [...without, { groupId, optionId }]
      }
      const exists = prev.some((o) => o.groupId === groupId && o.optionId === optionId)
      if (exists) {
        return prev.filter((o) => !(o.groupId === groupId && o.optionId === optionId))
      }
      return [...prev, { groupId, optionId }]
    })
  }

  function handleAdd() {
    if (!item || isSoldOut) return
    addToCart(item, quantity, selectedOptions)
    setAdded(true)
    setTimeout(() => {
      navigate(`${CUSTOMER_BASE}/cart`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cocoa-500)] hover:text-[var(--color-espresso-900)] transition-colors bg-white px-3.5 py-2 rounded-xl border border-[var(--color-line)] shadow-2xs"
          >
            <ArrowLeft size={16} />
            <span>Back to Menu</span>
          </button>
        </div>

        {/* Responsive Desktop 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left Column: Photography & Highlights ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[var(--color-line)] shadow-sm aspect-[4/3] sm:aspect-[16/11]">
              <FoodImage
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover ${isSoldOut ? 'grayscale-[50%]' : ''}`}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {item.signature && <Badge variant="signature">Signature</Badge>}
                {item.popular && <Badge variant="popular">Popular</Badge>}
              </div>

              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full p-2 shadow-md">
                <VegDot type={item.tags[0]} />
              </div>

              {isSoldOut && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="bg-red-600 text-white font-bold text-sm uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg">
                    Currently Sold Out
                  </div>
                </div>
              )}
            </div>

            {/* Quick Dish Guarantees */}
            <div className="hidden sm:grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white p-3 rounded-xl border border-[var(--color-line-light)]">
                <p className="font-semibold text-[var(--color-espresso-900)]">Fresh Batter</p>
                <p className="text-[11px] text-[var(--color-cocoa-400)]">Stone Ground</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[var(--color-line-light)]">
                <p className="font-semibold text-[var(--color-espresso-900)]">Pure Ghee</p>
                <p className="text-[11px] text-[var(--color-cocoa-400)]">Traditional Roast</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[var(--color-line-light)]">
                <p className="font-semibold text-[var(--color-espresso-900)]">Hot Chutneys</p>
                <p className="text-[11px] text-[var(--color-cocoa-400)]">Made Fresh</p>
              </div>
            </div>
          </div>

          {/* ── Right Column: Item Configurator & Cart CTA ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
                      {item.name}
                    </h1>
                  </div>
                  <p className="text-sm text-[var(--color-cocoa-400)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-line-light)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[var(--color-cocoa-400)] block">Base Price</span>
                  <span className="font-display font-bold text-2xl text-[var(--color-clay-600)]">
                    {formatPrice(item.price)}
                  </span>
                </div>

                {item.spiceLevel > 0 && (
                  <div className="text-right">
                    <span className="text-xs text-[var(--color-cocoa-400)] block">Spice Level</span>
                    <span className="text-xs font-semibold text-[var(--color-espresso-800)]">
                      {'🌶️'.repeat(item.spiceLevel)}{' '}
                      {item.spiceLevel === 1
                        ? 'Mild'
                        : item.spiceLevel === 2
                        ? 'Medium'
                        : 'Spicy'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Customization Option Groups */}
            {item.optionGroups.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xs space-y-6">
                <h2 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
                  Customize Your Dish
                </h2>

                <div className="space-y-6">
                  {item.optionGroups.map((group) => (
                    <div key={group.id} className="space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-semibold text-sm text-[var(--color-espresso-900)]">
                          {group.name}
                        </h3>
                        <span className="text-xs text-[var(--color-cocoa-400)]">
                          {group.type === 'single'
                            ? group.required
                              ? 'Select 1 (Required)'
                              : 'Select 1 (Optional)'
                            : 'Choose any'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {group.options.map((opt) => {
                          const isSelected = selectedOptions.some(
                            (o) => o.groupId === group.id && o.optionId === opt.id,
                          )

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleOption(group.id, opt.id, group.type)}
                              disabled={isSoldOut}
                              className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all text-sm ${
                                isSelected
                                  ? 'border-[var(--color-clay-500)] bg-[var(--color-clay-500)]/5 ring-1 ring-[var(--color-clay-500)] text-[var(--color-espresso-900)]'
                                  : 'border-[var(--color-line)] bg-white hover:bg-[var(--color-ivory-50)] text-[var(--color-espresso-800)]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div
                                  className={`w-4 h-4 rounded-${
                                    group.type === 'single' ? 'full' : 'md'
                                  } border flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? 'border-[var(--color-clay-500)] bg-[var(--color-clay-500)]'
                                      : 'border-[var(--color-cocoa-300)]'
                                  }`}
                                >
                                  {isSelected && <Check size={10} className="text-white" />}
                                </div>
                                <span className="font-medium text-xs sm:text-sm truncate">
                                  {opt.name}
                                </span>
                              </div>

                              {opt.priceDelta > 0 && (
                                <span className="text-xs font-semibold text-[var(--color-clay-600)] ml-2 shrink-0">
                                  +{formatPrice(opt.priceDelta)}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Panel */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-sm text-[var(--color-espresso-900)]">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-[var(--color-ivory-100)] rounded-xl p-1 border border-[var(--color-line-light)]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isSoldOut}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-50)] disabled:opacity-40 transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-base w-6 text-center text-[var(--color-espresso-900)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    disabled={isSoldOut}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[var(--color-espresso-900)] hover:bg-[var(--color-ivory-50)] disabled:opacity-40 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {isSoldOut ? (
                    <div className="w-full bg-gray-200 text-gray-500 py-4 rounded-xl font-semibold text-sm text-center">
                      Currently Unavailable in Kitchen
                    </div>
                  ) : added ? (
                    <motion.div
                      key="added"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
                    >
                      <Check size={18} strokeWidth={2.5} />
                      <span>Added to Bag — Redirecting to Cart...</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="add"
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAdd}
                      className="w-full bg-[var(--color-clay-500)] text-white py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-between px-6 hover:bg-[var(--color-clay-600)] transition-all shadow-md active:scale-[0.99]"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingBag size={18} />
                        <span>Add to Order</span>
                      </span>
                      <span className="font-bold">{formatPrice(totalLinePrice)}</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
