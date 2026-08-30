import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Pencil, Trash2, X, Check, Star, TrendingUp } from 'lucide-react'
import { type TourPackage } from '../../data/packages'
import { savePackages, getPackages } from '../../data/travelStore'

const categoryColors: Record<string, string> = {
  luxury: 'bg-yellow-500/20 text-yellow-300', adventure: 'bg-emerald-500/20 text-emerald-300',
  family: 'bg-blue-500/20 text-blue-300', honeymoon: 'bg-pink-500/20 text-pink-300',
  budget: 'bg-purple-500/20 text-purple-300', cultural: 'bg-orange-500/20 text-orange-300',
}

export default function AdminPackages() {
  const [pkgs, setPkgs] = useState<TourPackage[]>(() => getPackages())
  const [query, setQuery] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<TourPackage>>({})

  // Persist every change to shared store so customer site picks it up
  function update(next: TourPackage[]) {
    setPkgs(next)
    savePackages(next)
  }

  const filtered = pkgs.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.destination.toLowerCase().includes(query.toLowerCase())
  )

  const startEdit = (pkg: TourPackage) => {
    setEditId(pkg.id)
    setEditForm({ title: pkg.title, price: pkg.price, destination: pkg.destination, featured: pkg.featured, trending: pkg.trending })
  }

  const saveEdit = () => {
    update(pkgs.map(p => p.id === editId ? { ...p, ...editForm } : p))
    setEditId(null)
  }

  const confirmDelete = () => {
    update(pkgs.filter(p => p.id !== deleteId))
    setDeleteId(null)
  }

  const toggleFeatured = (id: string) => {
    update(pkgs.map(p => p.id === id ? { ...p, featured: !p.featured } : p))
  }

  const toggleTrending = (id: string) => {
    update(pkgs.map(p => p.id === id ? { ...p, trending: !p.trending } : p))
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Packages</h1>
          <p className="text-[#78716C] text-sm">{filtered.length} packages</p>
        </div>
        <button className="flex items-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
          <Plus size={16} /> Add Package
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search packages..."
          className="w-full bg-white border border-[#E8E0D5] rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E0D5] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="border-b border-[#E8E0D5]">
              <tr>
                {['Package', 'Destination', 'Duration', 'Price', 'Rating', 'Category', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-[#78716C] px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E0]">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-[#F5F0E8] transition-colors">
                  <td className="px-4 py-3">
                    {editId === pkg.id ? (
                      <input value={editForm.title || ''} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                        className="bg-[#FDFAF5] border border-[#F4B942]/40 rounded-lg px-2 py-1 text-[#1C1917] text-xs w-40 focus:outline-none" />
                    ) : (
                      <div>
                        <p className="text-white font-medium text-sm line-clamp-1 max-w-44">{pkg.title}</p>
                        <p className="text-[#78716C] text-xs">{pkg.nights}N/{pkg.duration}D</p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#78716C] text-xs">{pkg.destination}</td>
                  <td className="px-4 py-3 text-[#78716C] text-xs">{pkg.duration} days</td>
                  <td className="px-4 py-3">
                    {editId === pkg.id ? (
                      <input type="number" value={editForm.price || ''} onChange={e => setEditForm(f => ({ ...f, price: Number(e.target.value) }))}
                        className="bg-[#FDFAF5] border border-[#F4B942]/40 rounded-lg px-2 py-1 text-[#1C1917] text-xs w-24 focus:outline-none" />
                    ) : (
                      <span className="text-[#F4B942] font-semibold">₹{pkg.price.toLocaleString('en-IN')}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-[#F4B942] text-[#F4B942]" />
                      <span className="text-[#1C1917] text-xs">{pkg.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${categoryColors[pkg.category]}`}>{pkg.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => toggleFeatured(pkg.id)}
                        className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-colors ${pkg.featured ? 'bg-[#F4B942]/20 text-[#F4B942]' : 'bg-[#F5F0E8] text-[#78716C]'}`}>
                        <Star size={9} />F
                      </button>
                      <button onClick={() => toggleTrending(pkg.id)}
                        className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-colors ${pkg.trending ? 'bg-red-500/20 text-red-300' : 'bg-[#F5F0E8] text-[#78716C]'}`}>
                        <TrendingUp size={9} />T
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {editId === pkg.id ? (
                        <>
                          <button onClick={saveEdit} className="w-7 h-7 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors"><Check size={13} /></button>
                          <button onClick={() => setEditId(null)} className="w-7 h-7 rounded-lg bg-[#F5F0E8] hover:bg-[#EDE8E0] flex items-center justify-center text-[#78716C] transition-colors"><X size={13} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(pkg)} className="w-7 h-7 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 flex items-center justify-center text-blue-400 transition-colors"><Pencil size={12} /></button>
                          <button onClick={() => setDeleteId(pkg.id)} className="w-7 h-7 rounded-lg bg-red-500/15 hover:bg-red-500/25 flex items-center justify-center text-red-400 transition-colors"><Trash2 size={12} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white border border-[#E8E0D5] rounded-2xl p-6 max-w-sm w-full text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-red-400" />
              </div>
              <h2 className="text-[#1C1917] font-bold text-lg mb-1">Delete Package?</h2>
              <p className="text-[#78716C] text-sm mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#D6CFC4] text-white py-2.5 rounded-xl text-sm hover:border-white/40 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-[#1C1917] font-semibold py-2.5 rounded-xl text-sm transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
