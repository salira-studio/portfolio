import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Pencil, Trash2, X, Check, Star, TrendingUp } from 'lucide-react'
import { destinations as initialDestinations, type Destination } from '../../data/destinations'

export default function AdminDestinations() {
  const [dests, setDests] = useState<Destination[]>(initialDestinations)
  const [query, setQuery] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Destination>>({})

  const filtered = dests.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.country.toLowerCase().includes(query.toLowerCase())
  )

  const startEdit = (dest: Destination) => {
    setEditId(dest.id)
    setEditForm({ name: dest.name, priceFrom: dest.priceFrom, bestTime: dest.bestTime, featured: dest.featured, trending: dest.trending })
  }

  const saveEdit = () => {
    setDests(prev => prev.map(d => d.id === editId ? { ...d, ...editForm } : d))
    setEditId(null)
  }

  const toggleFeatured = (id: string) => setDests(prev => prev.map(d => d.id === id ? { ...d, featured: !d.featured } : d))
  const toggleTrending = (id: string) => setDests(prev => prev.map(d => d.id === id ? { ...d, trending: !d.trending } : d))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinations</h1>
          <p className="text-[#A8B0BA] text-sm">{filtered.length} destinations</p>
        </div>
        <button className="flex items-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
          <Plus size={16} /> Add Destination
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B0BA]" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations..."
          className="w-full bg-[#171E27] border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-[#A8B0BA]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((dest, i) => (
          <motion.div key={dest.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-[#171E27] border border-white/[0.06] rounded-2xl overflow-hidden group">
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${dest.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-2 right-2 flex gap-1.5">
                <button onClick={() => toggleFeatured(dest.id)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs backdrop-blur transition-colors ${dest.featured ? 'bg-[#F4B942]/80 text-[#0D1117]' : 'bg-black/40 text-white/60 hover:bg-black/60'}`}>
                  <Star size={11} />
                </button>
                <button onClick={() => toggleTrending(dest.id)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur transition-colors ${dest.trending ? 'bg-red-500/80 text-white' : 'bg-black/40 text-white/60 hover:bg-black/60'}`}>
                  <TrendingUp size={11} />
                </button>
              </div>
              <div className="absolute bottom-2 left-3">
                <p className="text-white font-bold text-sm">{dest.name}</p>
                <p className="text-white/70 text-xs">{dest.country}</p>
              </div>
            </div>
            {/* Body */}
            <div className="p-4">
              {editId === dest.id ? (
                <div className="space-y-2">
                  <input value={editForm.priceFrom || ''} onChange={e => setEditForm(f => ({ ...f, priceFrom: Number(e.target.value) }))}
                    placeholder="Price from (₹)" type="number"
                    className="w-full bg-[#0D1117] border border-[#F4B942]/40 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none" />
                  <input value={editForm.bestTime || ''} onChange={e => setEditForm(f => ({ ...f, bestTime: e.target.value }))}
                    placeholder="Best time"
                    className="w-full bg-[#0D1117] border border-[#F4B942]/40 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none" />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="flex-1 flex items-center justify-center gap-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-1.5 rounded-lg text-xs transition-colors"><Check size={12} />Save</button>
                    <button onClick={() => setEditId(null)} className="flex-1 flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-[#A8B0BA] py-1.5 rounded-lg text-xs transition-colors"><X size={12} />Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <Star size={11} className="fill-[#F4B942] text-[#F4B942]" />
                      <span className="text-white text-xs font-medium">{dest.rating}</span>
                      <span className="text-[#A8B0BA] text-xs">({dest.reviewCount.toLocaleString()})</span>
                    </div>
                    <p className="text-[#F4B942] font-semibold text-sm">From ₹{dest.priceFrom.toLocaleString('en-IN')}</p>
                    <p className="text-[#A8B0BA] text-xs">Best: {dest.bestTime}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => startEdit(dest)} className="w-7 h-7 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 flex items-center justify-center text-blue-400 transition-colors"><Pencil size={12} /></button>
                    <button onClick={() => setDeleteId(dest.id)} className="w-7 h-7 rounded-lg bg-red-500/15 hover:bg-red-500/25 flex items-center justify-center text-red-400 transition-colors"><Trash2 size={12} /></button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[#171E27] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-400" />
              </div>
              <h2 className="text-white font-bold text-lg mb-1">Delete Destination?</h2>
              <p className="text-[#A8B0BA] text-sm mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 border border-white/20 text-white py-2.5 rounded-xl text-sm">Cancel</button>
                <button onClick={() => { setDests(prev => prev.filter(d => d.id !== deleteId)); setDeleteId(null) }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
