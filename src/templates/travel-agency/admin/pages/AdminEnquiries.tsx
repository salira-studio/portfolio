import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Search, Eye, X } from 'lucide-react'
import { mockEnquiries, type Enquiry } from '../../data/enquiries'

type Status = 'all' | 'new' | 'contacted' | 'converted' | 'closed'

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  contacted: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  converted: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  closed: 'bg-white/10 text-[#78716C] border-[#E8E0D5]',
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status>('all')
  const [viewId, setViewId] = useState<string | null>(null)

  const filtered = enquiries.filter(e => {
    const q = !query || e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.destination.toLowerCase().includes(query.toLowerCase()) ||
      e.email.toLowerCase().includes(query.toLowerCase())
    return q && (statusFilter === 'all' || e.status === statusFilter)
  })

  const viewEnq = enquiries.find(e => e.id === viewId)

  const updateStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Enquiries</h1>
        <p className="text-[#78716C] text-sm">{filtered.length} enquiries</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search enquiries..."
            className="bg-white border border-[#E8E0D5] rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/40 w-56 transition-all" />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'new', 'contacted', 'converted', 'closed'] as Status[]).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${statusFilter === s ? 'bg-[#F4B942] text-[#0D1117]' : 'bg-white text-[#78716C] border border-[#E8E0D5] hover:text-[#1C1917]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-12 text-center">
            <MessageSquare size={32} className="text-[#78716C] mx-auto mb-3" />
            <p className="text-[#78716C]">No enquiries found</p>
          </div>
        ) : filtered.map((enq, i) => (
          <motion.div key={enq.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white border border-[#E8E0D5] rounded-2xl p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4B942]/20 flex items-center justify-center text-[#F4B942] font-bold text-sm shrink-0">
                  {enq.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[#1C1917] font-semibold text-sm">{enq.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${statusColors[enq.status]}`}>{enq.status}</span>
                  </div>
                  <p className="text-[#78716C] text-xs">{enq.email} · {enq.phone}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-[#78716C] mt-1">
                    <span>📍 {enq.destination}</span>
                    <span>📅 {enq.travelDate}</span>
                    <span>👥 {enq.travelers} travelers</span>
                    <span>💰 {enq.budget}</span>
                    <span>🗓 Submitted: {enq.submittedOn}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <select value={enq.status} onChange={e => updateStatus(enq.id, e.target.value as Enquiry['status'])}
                  className="bg-[#FDFAF5] border border-[#E8E0D5] text-[#78716C] text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer hover:border-[#F4B942]/30 transition-colors">
                  {['new', 'contacted', 'converted', 'closed'].map(s => (
                    <option key={s} value={s} className="bg-[#F5F0E8] capitalize">{s}</option>
                  ))}
                </select>
                <button onClick={() => setViewId(enq.id)}
                  className="w-8 h-8 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 flex items-center justify-center text-blue-400 transition-colors">
                  <Eye size={13} />
                </button>
              </div>
            </div>
            {enq.message && (
              <div className="mt-3 pt-3 border-t border-[#E8E0D5]">
                <p className="text-[#78716C] text-xs line-clamp-2">💬 {enq.message}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {viewEnq && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-[#E8E0D5] rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#1C1917] font-bold text-lg">Enquiry Details</h2>
                <button onClick={() => setViewId(null)} className="text-[#78716C] hover:text-[#1C1917] p-1">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ['Name', viewEnq.name], ['Email', viewEnq.email], ['Phone', viewEnq.phone],
                  ['Destination', viewEnq.destination], ['Travel Date', viewEnq.travelDate],
                  ['Travelers', viewEnq.travelers], ['Budget', viewEnq.budget],
                  ['Status', viewEnq.status], ['Submitted', viewEnq.submittedOn],
                ].map(([k, v]) => (
                  <div key={String(k)} className="flex items-start gap-3">
                    <span className="text-[#78716C] w-28 shrink-0 capitalize">{k}</span>
                    <span className="text-[#1C1917]">{String(v)}</span>
                  </div>
                ))}
                {viewEnq.message && (
                  <div className="border-t border-[#E8E0D5] pt-3">
                    <p className="text-[#78716C] text-xs mb-1">Message</p>
                    <p className="text-[#1C1917]">{viewEnq.message}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
