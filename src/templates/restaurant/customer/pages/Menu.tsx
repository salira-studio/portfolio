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
import { t, getCategoryName, getCategoryDescription, getItemName, getItemDescription } from '../i18n'

export default function CustomerMenu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'all'

  const categories = useAppStore((s) => s.categories)
  const items = useAppStore((s) => s.menuItems)
  const language = useAppStore((s) => s.language)

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
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false
      }
      if (dietaryFilter === 'veg' && !item.tags.includes('veg')) {
        return false
      }
      if (dietaryFilter === 'non-veg' && !item.tags.includes('non-veg')) {
        return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesName = getItemName(item.id, item.name, language).toLowerCase().includes(q)
        const matchesDesc = getItemDescription(item.id, item.description, language).toLowerCase().includes(q)
        if (!matchesName && !matchesDesc) return false
      }
      return true
    })
  }, [items, activeCategory, dietaryFilter, search, language])

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
    <div className="min-h-screen bg-white rest-particles">
      {/* ── Menu Header & Sticky Filter Bar ── */}
      <div className="sticky top-18 sm:top-20 z-30 bg-white border-b border-[var(--rest-border)] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--rest-text)]">
                {t('menu.title', language)}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--rest-muted)]">
                {t('menu.subtitle', language)}
              </p>
            </div>

            {/* Search & Dietary Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-cocoa-300)]"
                />
                <input
                  type="text"
                  placeholder={t('menu.searchPlaceholder', language)}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[var(--rest-border)] rounded-xl text-sm placeholder:text-[var(--rest-muted)] focus:border-[var(--rest-primary)] outline-none transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--rest-muted)] hover:text-[var(--rest-text)] transition-colors"
                  >
                    {t('menu.clear', language)}
                  </button>
                )}
              </div>

              {/* Veg / Non-Veg Switcher */}
              <div className="flex items-center bg-white rounded-xl p-1 border border-[var(--rest-border)] shadow-2xs">
                <button
                  onClick={() => setDietaryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    dietaryFilter === 'all'
                      ? 'bg-[var(--rest-primary)] text-[var(--rest-text)]'
                      : 'text-[var(--rest-muted)] hover:text-[var(--rest-text)]'
                  }`}
                >
                  {t('menu.all', language)}
                </button>
                <button
                  onClick={() => setDietaryFilter('veg')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    dietaryFilter === 'veg'
                      ? 'bg-[#3A7D2C] text-white'
                      : 'text-[var(--rest-muted)] hover:text-[var(--rest-text)]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#3A7D2C]" />
                  <span>{t('menu.veg', language)}</span>
                </button>
                <button
                  onClick={() => setDietaryFilter('non-veg')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    dietaryFilter === 'non-veg'
                      ? 'bg-[#C0392B] text-white'
                      : 'text-[var(--rest-muted)] hover:text-[var(--rest-text)]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#C0392B]" />
                  <span>{t('menu.nonVeg', language)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-[var(--rest-primary)] text-[var(--rest-text)] shadow-sm'
                  : 'bg-white text-[var(--rest-text)] border border-[var(--rest-border)] hover:bg-[var(--rest-cream-light)]'
              }`}
            >
              {t('menu.allItems', language)} ({items.length})
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
                      ? 'bg-[var(--rest-primary)] text-[var(--rest-text)] shadow-sm'
                      : 'bg-white text-[var(--rest-text)] border border-[var(--rest-border)] hover:bg-[var(--rest-cream-light)]'
                  }`}
                >
                  <span>{getCategoryName(cat.slug, cat.name, language)}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-[var(--rest-text)] text-[var(--rest-primary)]'
                        : 'bg-[var(--rest-cream-light)] text-[var(--rest-muted)]'
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
          <div className="text-center py-20 bg-white rounded-3xl border border-[var(--rest-border)] p-8 max-w-md mx-auto">
            <AlertCircle size={40} className="mx-auto text-[var(--rest-muted)] mb-3" />
            <h3 className="font-display text-lg font-bold text-[var(--rest-text)]">
              {t('menu.noDishesFound', language)}
            </h3>
            <p className="text-xs text-[var(--rest-muted)] mt-1">
              {t('menu.noDishesDesc', language)}
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('all')
                setDietaryFilter('all')
              }}
              className="mt-4 px-4 py-2 rounded-xl text-sm font-medium bg-orange-50 dark:bg-orange-400/10 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-400/20"
            >
              {t('menu.resetFilters', language)}
            </button>
          </div>
        )}

        {groupedCategories.map((cat) => (
          <section key={cat.id} className="space-y-4">
            <div className="border-b border-[var(--rest-border)] pb-2 flex items-baseline justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--rest-text)]">
                  {getCategoryName(cat.slug, cat.name, language)}
                </h2>
                {cat.description && (
                  <p className="text-xs sm:text-sm text-[var(--rest-muted)] mt-0.5">
                    {getCategoryDescription(cat.slug, cat.description || '', language)}
                  </p>
                )}
              </div>
              <span className="text-xs text-[var(--rest-muted)] font-medium">
                {cat.items.length} {cat.items.length === 1 ? t('menu.itemCount', language) : t('menu.itemsCount', language)}
              </span>
            </div>

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
                      className={`rest-grid-cell rest-glow-effect group flex flex-col h-full overflow-hidden relative ${
                        isSoldOut
                          ? 'opacity-75 bg-gray-50/80 cursor-pointer'
                          : ''
                      }`}
                    >
                      {/* Food Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--rest-cream-light)]">
                        <FoodImage
                          src={item.image}
                          alt={getItemName(item.id, item.name, language)}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isSoldOut ? 'grayscale-[50%]' : 'group-hover:scale-105'
                          }`}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          {item.signature && <Badge variant="signature">{t('home.signatureBadge', language)}</Badge>}
                          {item.popular && <Badge variant="popular">{t('home.popularBadge', language)}</Badge>}
                        </div>

                        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-sm z-10">
                          <VegDot type={item.tags[0]} />
                        </div>

                        {/* SOLD OUT Overlay */}
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                              {t('menu.soldOut', language)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 relative z-10">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--rest-text)] group-hover:text-[var(--rest-primary)] transition-colors leading-snug">
                              {getItemName(item.id, item.name, language)}
                            </h3>
                          </div>
                          <p className="text-xs text-[var(--rest-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                            {getItemDescription(item.id, item.description, language)}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--rest-border)] flex items-center justify-between">
                          <div>
                            <span className="font-display font-bold text-base sm:text-lg text-[var(--rest-text)]">
                              {formatPrice(item.price)}
                            </span>
                            {item.spiceLevel > 1 && (
                              <span className="text-[10px] font-semibold text-[var(--rest-text)] bg-[var(--rest-accent)] px-2 py-0.5 rounded-md ml-2 uppercase tracking-wide">
                                {t('menu.spicy', language)}
                              </span>
                            )}
                          </div>

                          {isSoldOut ? (
                            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                              {t('menu.unavailable', language)}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-[var(--rest-accent)] text-[var(--rest-text)] px-3 py-1.5 rounded-lg group-hover:bg-[var(--rest-primary)] group-hover:text-[var(--rest-text)] transition-colors">
                              <Plus size={13} strokeWidth={2.5} />
                              <span>{item.optionGroups.length > 0 ? t('menu.customize', language) : t('menu.add', language)}</span>
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
