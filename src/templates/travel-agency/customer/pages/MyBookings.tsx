import { useState } from 'react'
import { useOutletContext, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react'
import { mockBookings } from '../../data/bookings'

const TRAVEL_BASE = '/work/travel/customer'

interface AuthContext { user: { name: string; email: string } | null }

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
}

const paymentColors: Record<string, string> = {
  paid: 'text-emerald-400',
  partial: 'text-yellow-400',
  unpaid: 'text-red-400',
}

type FilterStatus = 'all' | 'confirmed' | 'pending' | 'cancelled' | 'completed'

export default function MyBookings() {
  const ctx = useOutletContext<AuthContext>()
  if (!ctx.user) return <Navigate to={`${TRAVEL_BASE}/login`} replace />

  const [filter, setFilter] = useState<FilterStatus>('all')

  const bookings = filter === 'all' ? mockBookings : mockBookings.filter(b => b.status === filter)

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <section className="bg-[#151B23] border-b border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`${TRAVEL_BASE}/dashboard`} className="flex items-center gap-1.5 text-[#A8B0BA] hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={15} /> Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">My Bookings</h1>
          <p className="text-[#A8B0BA] mt-1">{bookings.length} booking(s)</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'confirmed', 'pending', 'cancelled', 'completed'] as FilterStatus[]).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${filter === s ? 'bg-[#F4B942] text-[#0D1117]' : 'bg-[#171E27] text-[#A8B0BA] border border-white/10 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Bookings */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 bg-[#171E27] rounded-2xl border border-white/[0.06]">
              <p className="text-4xl mb-3">🧳</p>
              <p className="text-white font-semibold">No bookings found</p>
              <Link to={`${TRAVEL_BASE}/packages`} className="inline-block mt-4 text-[#F4B942] text-sm hover:underline">Explore Packages</Link>
            </div>
          ) : bookings.map((booking, i) => (
            <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F4B942]/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#F4B942]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-semibold text-sm">{booking.packageTitle}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-[#A8B0BA] text-xs mb-2">Ref: <span className="text-white font-mono">{booking.bookingRef}</span></p>
                    <div className="flex flex-wrap gap-3 text-xs text-[#A8B0BA]">
                      <span className="flex items-center gap-1"><Calendar size={11} />{booking.startDate} – {booking.endDate}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{booking.travelers} travelers</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{booking.destination}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#F4B942] font-bold text-lg">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
                  <p className={`text-xs capitalize ${paymentColors[booking.paymentStatus]}`}>
                    {booking.paymentStatus === 'partial' ? `Paid: ₹${booking.paidAmount.toLocaleString('en-IN')}` : booking.paymentStatus}
                  </p>
                </div>
              </div>
              {booking.notes && (
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <p className="text-xs text-[#A8B0BA]">📝 {booking.notes}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
