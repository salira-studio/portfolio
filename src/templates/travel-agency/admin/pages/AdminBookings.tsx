import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { mockBookings, type Booking } from '../../data/bookings'

type Status = 'all' | 'confirmed' | 'pending' | 'cancelled' | 'completed'

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-400',
  pending: 'bg-yellow-500/15 text-yellow-400',
  cancelled: 'bg-red-500/15 text-red-400',
  completed: 'bg-blue-500/15 text-blue-400',
}

const paymentColors: Record<string, string> = {
  paid: 'bg-emerald-500/15 text-emerald-400',
  partial: 'bg-yellow-500/15 text-yellow-400',
  unpaid: 'bg-red-500/15 text-red-400',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status>('all')

  const filtered = bookings.filter(b => {
    const matchQuery = !query || b.customerName.toLowerCase().includes(query.toLowerCase()) ||
      b.bookingRef.toLowerCase().includes(query.toLowerCase()) ||
      b.destination.toLowerCase().includes(query.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    return matchQuery && matchStatus
  })

  const updateStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Bookings</h1>
        <p className="text-[#A8B0BA] text-sm">{filtered.length} booking(s)</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B0BA]" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search bookings..."
            className="bg-[#171E27] border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-[#A8B0BA]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all w-56" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(['all', 'confirmed', 'pending', 'cancelled', 'completed'] as Status[]).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${statusFilter === s ? 'bg-[#F4B942] text-[#0D1117]' : 'bg-[#171E27] text-[#A8B0BA] border border-white/10 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="border-b border-white/[0.06]">
              <tr>
                {['Ref', 'Customer', 'Package', 'Destination', 'Dates', 'Travelers', 'Amount', 'Status', 'Payment', 'Action'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-[#A8B0BA] px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((booking, i) => (
                <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-[#F4B942] font-mono text-xs">{booking.bookingRef}</td>
                  <td className="px-4 py-3 text-white text-sm">{booking.customerName}</td>
                  <td className="px-4 py-3 text-[#A8B0BA] text-xs max-w-36 truncate">{booking.packageTitle}</td>
                  <td className="px-4 py-3 text-[#A8B0BA] text-xs">{booking.destination}</td>
                  <td className="px-4 py-3 text-[#A8B0BA] text-xs whitespace-nowrap">{booking.startDate}<br />{booking.endDate}</td>
                  <td className="px-4 py-3 text-[#A8B0BA] text-xs text-center">{booking.travelers}</td>
                  <td className="px-4 py-3 text-[#F4B942] font-semibold text-sm whitespace-nowrap">₹{booking.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${paymentColors[booking.paymentStatus]}`}>{booking.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={booking.status} onChange={e => updateStatus(booking.id, e.target.value as Booking['status'])}
                      className="bg-[#0D1117] border border-white/10 text-[#A8B0BA] text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer hover:border-[#F4B942]/30 transition-colors">
                      {['confirmed', 'pending', 'cancelled', 'completed'].map(s => (
                        <option key={s} value={s} className="bg-[#151B23] capitalize">{s}</option>
                      ))}
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[#A8B0BA]">No bookings match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
