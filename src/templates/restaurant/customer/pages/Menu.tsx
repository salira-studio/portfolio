import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, AlertCircle, Plus } from 'lucide-react'
import { CUSTOMER_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'
import { VegDot } from '../../../../shared/components/ui/VegDot'
import { Badge } from '../../../../shared/components/ui/Badge'
import { FoodImage } from '../../../../shared/components/ui/FoodImage'
import { formatPrice } from '../../../../shared/lib/format'

export default function CustomerMenu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'all'

  const categories = useAppStore((s) => s.categories)
  const items = useAppStore((s) => s.menuItems)

  const [activeCategory, setActiveCategory] = useState<string>(initialCat)
  const [search, setSearch] = useState('')
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all')

  const handleCategorySelect = (slug: string) => {
    setActiveCategory(slug)
    if (slug === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', slug)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.tags.includes('veg')) {
        return false
      }
      if (dietaryFilter === 'non-veg' && !item.tags.includes('non-veg')) {
        return false
      }
      // Search term
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(q)
        const matchesDesc = item.description.toLowerCase().includes(q)
        if (!matchesName && !matchesDesc) return false
      }
      return true
    })
  }, [items, activeCategory, dietaryFilter, search])

  // Group filtered items by category
  const groupedCategories = useMemo(() => {
    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.slug === activeCategory)
      return cat ? [{ ...cat, items: filteredItems }] : []
    }
    return categories
      .map((c) => ({
        ...c,
        items: filteredItems.filter((i) => i.category === c.slug),
      }))
      .filter((c) => c.items.length > 0)
  }, [categories, filteredItems, activeCategory])

  return (
    <div className="min-h-screen">
      {/* ── Menu Header & Sticky Filter Bar ── */}
      <div className="sticky top-18 sm:top-20 z-30 bg-[var(--color-ivory-50)]/95 backdrop-blur-md border-b border-[var(--color-line)] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
                Our Menu
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)]">
                Freshly prepared South Indian delicacies made to order
              </p>
            </div>

            {/* Search & Dietary Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-cocoa-300)]"
                />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--color-line)] rounded-xl text-sm placeholder:text-[var(--color-cocoa-300)] focus:border-[var(--color-clay-500)] outline-none transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-cocoa-400)] hover:text-[var(--color-espresso-900)]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Veg / Non-Veg Switcher */}
              <div className="flex items-center bg-white rounded-xl p-1 border border-[var(--color-line)] shadow-2xs">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    dietaryFilter === 'all'
                      ? 'bg-[var(--color-espresso-900)] text-white'
                      : 'text-[var(--color-cocoa-500)] hover:text-[var(--color-espresso-900)]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietaryFilter('veg')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    dietaryFilter === 'veg'
                      ? 'bg-emerald-700 text-white'
                      : 'text-[var(--color-cocoa-500)] hover:text-[var(--color-espresso-900)]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Veg</span>
                </button>
                <button
                  onClick={() => setDietaryFilter('non-veg')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    dietaryFilter === 'non-veg'
                      ? 'bg-amber-800 text-white'
                      : 'text-[var(--color-cocoa-500)] hover:text-[var(--color-espresso-900)]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Non-Veg</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Chips (Horizontal Scrollable on Mobile, Responsive Flex on Desktop) */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-[var(--color-clay-500)] text-white shadow-sm'
                  : 'bg-white text-[var(--color-espresso-800)] border border-[var(--color-line)] hover:bg-[var(--color-ivory-100)]'
              }`}
            >
              All Items ({items.length})
            </button>
            {categories.map((cat) => {
              const count = items.filter((i) => i.category === cat.slug).length
              const isSelected = activeCategory === cat.slug
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[var(--color-clay-500)] text-white shadow-sm'
                      : 'bg-white text-[var(--color-espresso-800)] border border-[var(--color-line)] hover:bg-[var(--color-ivory-100)]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--color-ivory-100)] text-[var(--color-cocoa-400)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main Menu Grid Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {groupedCategories.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-[var(--color-line)] p-8 max-w-md mx-auto">
            <AlertCircle size={40} className="mx-auto text-[var(--color-cocoa-300)] mb-3" />
            <h3 className="font-display text-lg font-bold text-[var(--color-espresso-900)]">
              No dishes found
            </h3>
            <p className="text-xs text-[var(--color-cocoa-400)] mt-1">
              Try changing your search term or clearing the dietary filters.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setDietaryFilter('all')
                setActiveCategory('all')
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[var(--color-clay-500)] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {groupedCategories.map((cat) => (
          <section key={cat.id} className="space-y-4">
            <div className="border-b border-[var(--color-line-light)] pb-2 flex items-baseline justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-espresso-900)]">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] mt-0.5">
                    {cat.description}
                  </p>
                )}
              </div>
              <span className="text-xs text-[var(--color-cocoa-300)] font-medium">
                {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {cat.items.map((item, idx) => {
                const isSoldOut = !item.available

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 4) * 0.04 }}
                  >
                    <Link
                      to={`${CUSTOMER_BASE}/item/${item.id}`}
                      className={`group flex flex-col h-full bg-white rounded-2xl border border-[var(--color-line-light)] transition-all overflow-hidden relative ${
                        isSoldOut
                          ? 'opacity-75 bg-gray-50/80 cursor-pointer'
                          : 'hover:border-[var(--color-clay-500)] hover:shadow-lg'
                      }`}
                    >
                      {/* Food Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-ivory-100)]">
                        <FoodImage
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isSoldOut ? 'grayscale-[50%]' : 'group-hover:scale-105'
                          }`}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          {item.signature && <Badge variant="signature">Signature</Badge>}
                          {item.popular && <Badge variant="popular">Popular</Badge>}
                        </div>

                        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-sm">
                          <VegDot type={item.tags[0]} />
                        </div>

                        {/* SOLD OUT Overlay */}
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-espresso-900)] group-hover:text-[var(--color-clay-500)] transition-colors leading-snug">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-xs text-[var(--color-cocoa-400)] mt-1.5 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--color-line-light)] flex items-center justify-between">
                          <div>
                            <span className="font-display font-bold text-base sm:text-lg text-[var(--color-espresso-900)]">
                              {formatPrice(item.price)}
                            </span>
                            {item.spiceLevel > 0 && (
                              <span className="text-[11px] text-[var(--color-cocoa-300)] ml-2">
                                {'🌶️'.repeat(item.spiceLevel)}
                              </span>
                            )}
                          </div>

                          {isSoldOut ? (
                            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                              Unavailable
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[var(--color-ivory-100)] text-[var(--color-clay-600)] px-3 py-1.5 rounded-lg group-hover:bg-[var(--color-clay-500)] group-hover:text-white transition-colors">
                              <Plus size={13} strokeWidth={2.5} />
                              <span>{item.optionGroups.length > 0 ? 'Customize' : 'Add'}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
