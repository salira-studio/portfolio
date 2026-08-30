import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PackageCard } from '../components/PackageCard'
import { getPackages, useStoreVersion } from '../../data/travelStore'

const categories = ['All', 'luxury', 'adventure', 'family', 'honeymoon', 'budget', 'cultural']
const durations = ['All', '1–4 days', '5–7 days', '8–12 days', '13+ days']
const priceRanges = ['All', 'Under ₹30,000', '₹30,000–₹75,000', '₹75,000–₹1,50,000', 'Above ₹1,50,000']

function inDurationRange(days: number, range: string) {
  if (range === 'All') return true
  if (range === '1–4 days') return days <= 4
  if (range === '5–7 days') return days >= 5 && days <= 7
  if (range === '8–12 days') return days >= 8 && days <= 12
  if (range === '13+ days') return days >= 13
  return true
}

function inPriceRange(price: number, range: string) {
  if (range === 'All') return true
  if (range === 'Under ₹30,000') return price < 30000
  if (range === '₹30,000–₹75,000') return price >= 30000 && price <= 75000
  if (range === '₹75,000–₹1,50,000') return price > 75000 && price <= 150000
  if (range === 'Above ₹1,50,000') return price > 150000
  return true
}

export default function Packages() {
  useStoreVersion() // re-render when admin updates packages
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'All'
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(initialCat)
  const [durationFilter, setDurationFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'name'>('rating')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...getPackages()]
    if (query) list = list.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.destination.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    )
    if (category !== 'All') list = list.filter(p => p.category === category)
    list = list.filter(p => inDurationRange(p.duration, durationFilter))
    list = list.filter(p => inPriceRange(p.price, priceFilter))
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price_asc') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'name') list.sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [query, category, durationFilter, priceFilter, sortBy])

  const categoryLabels: Record<string, string> = {
    All: 'All', luxury: 'Luxury', adventure: 'Adventure', family: 'Family',
    honeymoon: 'Honeymoon', budget: 'Budget', cultural: 'Cultural',
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Header */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D5] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Curated For You</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Tour Packages</h1>
            <p className="text-[#78716C]">{filtered.length} packages available</p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-16 z-30 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-[#E8E0D5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search packages..."
              className="w-full bg-white border border-[#E8E0D5] rounded-xl pl-8 pr-8 py-2.5 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
            {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C]"><X size={13} /></button>}
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${category === c ? 'bg-[#F4B942] text-[#0D1117]' : 'bg-white text-[#78716C] hover:text-white border border-[#E8E0D5]'}`}>
                {categoryLabels[c]}
              </button>
            ))}
          </div>

          <button onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${filtersOpen ? 'bg-[#F4B942]/20 text-[#F4B942] border border-[#F4B942]/30' : 'bg-white text-[#78716C] border border-[#E8E0D5]'}`}>
            <SlidersHorizontal size={13} />
            Filters
          </button>

          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white border border-[#E8E0D5] text-[#78716C] text-xs rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer ml-auto">
            <option value="rating" className="bg-[#F5F0E8]">Top Rated</option>
            <option value="price_asc" className="bg-[#F5F0E8]">Price: Low–High</option>
            <option value="price_desc" className="bg-[#F5F0E8]">Price: High–Low</option>
            <option value="name" className="bg-[#F5F0E8]">Name A–Z</option>
          </select>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#E8E0D5] mt-3">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs text-[#78716C] mb-2 font-medium">Duration</p>
                  <div className="flex flex-wrap gap-2">
                    {durations.map(d => (
                      <button key={d} onClick={() => setDurationFilter(d)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${durationFilter === d ? 'bg-[#F4B942] text-[#0D1117] font-medium' : 'bg-white text-[#78716C] border border-[#E8E0D5]'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#78716C] mb-2 font-medium">Budget</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(p => (
                      <button key={p} onClick={() => setPriceFilter(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${priceFilter === p ? 'bg-[#F4B942] text-[#0D1117] font-medium' : 'bg-white text-[#78716C] border border-[#E8E0D5]'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🧳</p>
            <p className="text-[#1C1917] font-semibold text-xl mb-2">No packages match your filters</p>
            <p className="text-[#78716C]">Try adjusting your search or filters</p>
            <button onClick={() => { setQuery(''); setCategory('All'); setDurationFilter('All'); setPriceFilter('All') }}
              className="mt-4 text-[#F4B942] text-sm hover:underline">Reset All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
          </div>
        )}
      </section>
    </div>
  )
}
