import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Calendar, Heart, MapPin, TrendingUp, Clock } from 'lucide-react'
import { mockBookings } from '../../data/bookings'

const TRAVEL_BASE = '/work/travel/customer'

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  cancelled: 'bg-red-500/15 text-red-400 border-red-500/20',
  completed: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
}

export default function Dashboard() {
  const userBookings = mockBookings.slice(0, 3)
  const wishlistRaw = JSON.parse(localStorage.getItem('travel_wishlist') || '[]')
  const wishlistCount = wishlistRaw.length

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D5] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#78716C] text-sm mb-1">Welcome,</p>
            <h1 className="text-3xl font-bold text-[#1C1917]">Your Travel Dashboard 👋</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Calendar, label: 'Total Bookings', value: userBookings.length, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { icon: Clock, label: 'Upcoming Trips', value: userBookings.filter(b => b.status === 'confirmed').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { icon: Heart, label: 'Wishlist Items', value: wishlistCount, color: 'text-pink-400', bg: 'bg-pink-500/10' },
            { icon: TrendingUp, label: 'Miles Saved', value: '3,240', color: 'text-[#F4B942]', bg: 'bg-[#F4B942]/10' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#E8E0D5] rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-[#1C1917]">{stat.value}</p>
              <p className="text-[#78716C] text-xs mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: LayoutDashboard, label: 'My Bookings', to: `${TRAVEL_BASE}/dashboard/bookings`, desc: 'View & manage all trips' },
            { icon: Heart, label: 'My Wishlist', to: `${TRAVEL_BASE}/dashboard/wishlist`, desc: 'Saved destinations & packages' },
            { icon: MapPin, label: 'Explore Packages', to: `${TRAVEL_BASE}/packages`, desc: 'Find your next adventure' },
          ].map((action, i) => (
            <motion.div key={action.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
              <Link to={action.to} className="flex items-center gap-4 bg-white border border-[#E8E0D5] hover:border-[#F4B942]/30 rounded-2xl p-5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center shrink-0 group-hover:bg-[#F4B942]/20 transition-colors">
                  <action.icon size={18} className="text-[#F4B942]" />
                </div>
                <div>
                  <p className="text-[#1C1917] font-medium text-sm">{action.label}</p>
                  <p className="text-[#78716C] text-xs">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#1C1917]">Recent Bookings</h2>
            <Link to={`${TRAVEL_BASE}/dashboard/bookings`} className="text-[#F4B942] text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {userBookings.map((booking, i) => (
              <motion.div key={booking.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-white border border-[#E8E0D5] rounded-2xl p-5 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F4B942]/10 flex items-center justify-center">
                    <MapPin size={20} className="text-[#F4B942]" />
                  </div>
                  <div>
                    <p className="text-[#1C1917] font-semibold text-sm">{booking.packageTitle}</p>
                    <p className="text-[#78716C] text-xs">{booking.destination} · {booking.startDate} – {booking.endDate}</p>
                    <p className="text-[#78716C] text-xs">Ref: {booking.bookingRef}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                  <p className="text-[#F4B942] font-bold">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </motion.div>
            ))}
            {userBookings.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E0D5]">
                <p className="text-4xl mb-3">✈️</p>
                <p className="text-[#1C1917] font-semibold">No bookings yet</p>
                <Link to={`${TRAVEL_BASE}/packages`} className="inline-block mt-4 text-[#F4B942] text-sm hover:underline">Explore Packages</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
