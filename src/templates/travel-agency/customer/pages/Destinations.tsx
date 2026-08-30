import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { DestinationCard } from '../components/DestinationCard'
import { getDestinations, useStoreVersion } from '../../data/travelStore'

const continents = ['All', 'Asia', 'Europe', 'Middle East', 'Oceania']

export default function Destinations() {
  useStoreVersion() // re-render when admin updates destinations
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const [query, setQuery] = useState(initialSearch)
  const [continent, setContinent] = useState('All')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('rating')

  const filtered = useMemo(() => {
    let list = [...getDestinations()]
    if (query) list = list.filter(d =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    )
    if (continent !== 'All') list = list.filter(d => d.continent === continent)
    if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'price') list.sort((a, b) => a.priceFrom - b.priceFrom)
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [query, continent, sortBy])

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Header */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D5] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#F4B942] text-sm font-medium uppercase tracking-wider mb-2">Explore</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">All Destinations</h1>
            <p className="text-[#78716C]">{filtered.length} destinations found</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-[#E8E0D5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-60 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full bg-white border border-[#E8E0D5] rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Continent tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {continents.map(c => (
              <button key={c} onClick={() => setContinent(c)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${continent === c ? 'bg-[#F4B942] text-[#0D1117]' : 'bg-white text-[#78716C] hover:text-white border border-[#E8E0D5]'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white border border-[#E8E0D5] text-[#78716C] text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F4B942]/40 transition-all cursor-pointer">
            <option value="rating" className="bg-[#F5F0E8]">Top Rated</option>
            <option value="price" className="bg-[#F5F0E8]">Price: Low to High</option>
            <option value="name" className="bg-[#F5F0E8]">A–Z</option>
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🌍</p>
            <p className="text-[#1C1917] font-semibold text-xl mb-2">No destinations found</p>
            <p className="text-[#78716C]">Try a different search or clear filters</p>
            <button onClick={() => { setQuery(''); setContinent('All') }}
              className="mt-4 text-[#F4B942] text-sm hover:underline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
          </div>
        )}
      </section>
    </div>
  )
}
