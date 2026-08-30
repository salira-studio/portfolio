import { motion } from 'framer-motion'
import { Package, Map, Calendar, MessageSquare, Users, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import { mockCustomers } from '../../data/customers'
import { packages } from '../../data/packages'
import { destinations } from '../../data/destinations'
import { mockEnquiries } from '../../data/enquiries'

const ADMIN_BASE = '/work/travel/admin'

const revenueData = [65, 72, 58, 80, 91, 75, 88, 95, 78, 85, 99, 92]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500/15 text-emerald-400',
  pending: 'bg-yellow-500/15 text-yellow-400',
  cancelled: 'bg-red-500/15 text-red-400',
  completed: 'bg-blue-500/15 text-blue-400',
}

export default function AdminDashboard() {
  const totalRevenue = mockBookings.reduce((s, b) => s + b.paidAmount, 0)
  const confirmedBookings = mockBookings.filter(b => b.status === 'confirmed').length
  const newEnquiries = mockEnquiries.filter(e => e.status === 'new').length

  const stats = [
    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: 'text-[#F4B942]', bg: 'bg-[#F4B942]/10', change: '+12%', link: `${ADMIN_BASE}/bookings` },
    { label: 'Active Bookings', value: confirmedBookings, icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-500/10', change: '+8%', link: `${ADMIN_BASE}/bookings` },
    { label: 'Total Packages', value: packages.length, icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10', change: '+3', link: `${ADMIN_BASE}/packages` },
    { label: 'New Enquiries', value: newEnquiries, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10', change: '+5 today', link: `${ADMIN_BASE}/enquiries` },
    { label: 'Destinations', value: destinations.length, icon: Map, color: 'text-teal-400', bg: 'bg-teal-500/10', change: '15 total', link: `${ADMIN_BASE}/destinations` },
    { label: 'Total Customers', value: mockCustomers.length, icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10', change: '+2 this week', link: `${ADMIN_BASE}/customers` },
  ]

  const maxRevenue = Math.max(...revenueData)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-[#78716C] text-sm mt-0.5">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link to={stat.link} className="block bg-white border border-[#E8E0D5] hover:border-[#E0D8CC] rounded-2xl p-4 transition-all group">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon size={16} className={stat.color} />
              </div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[#78716C] text-xs mt-0.5">{stat.label}</p>
              <p className="text-emerald-400 text-xs mt-1 flex items-center gap-0.5">
                <TrendingUp size={11} />{stat.change}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E8E0D5] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#1C1917] font-semibold">Monthly Revenue (₹ Lakhs)</h2>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+18% YoY</span>
          </div>
          {/* Bar Chart */}
          <div className="flex items-end gap-1.5 h-36">
            {revenueData.map((val, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
                style={{ transformOrigin: 'bottom' }}
              >
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(val / maxRevenue) * 120}px`,
                    background: val === maxRevenue ? '#F4B942' : 'rgba(244,185,66,0.3)',
                  }}
                />
                <span className="text-[#78716C] text-[9px]">{months[i]}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E8E0D5] rounded-2xl p-5">
            <h2 className="text-[#1C1917] font-semibold text-sm mb-4">Booking Status</h2>
            {[
              { label: 'Confirmed', count: mockBookings.filter(b => b.status === 'confirmed').length, color: 'bg-emerald-500' },
              { label: 'Pending', count: mockBookings.filter(b => b.status === 'pending').length, color: 'bg-yellow-500' },
              { label: 'Completed', count: mockBookings.filter(b => b.status === 'completed').length, color: 'bg-blue-500' },
              { label: 'Cancelled', count: mockBookings.filter(b => b.status === 'cancelled').length, color: 'bg-red-500' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[#78716C] text-xs flex-1">{item.label}</span>
                <span className="text-[#1C1917] font-semibold text-sm">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#E8E0D5] rounded-2xl p-5">
            <h2 className="text-[#1C1917] font-semibold text-sm mb-3">Top Destinations</h2>
            {[
              { name: 'Bali', count: 45 }, { name: 'Kerala', count: 38 },
              { name: 'Rajasthan', count: 32 }, { name: 'Maldives', count: 27 },
            ].map(d => (
              <div key={d.name} className="flex items-center gap-2 mb-2">
                <span className="text-[#78716C] text-xs flex-1">{d.name}</span>
                <div className="flex-1 h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F4B942]/60 rounded-full" style={{ width: `${(d.count / 45) * 100}%` }} />
                </div>
                <span className="text-[#1C1917] text-xs w-6 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white border border-[#E8E0D5] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1C1917] font-semibold">Recent Bookings</h2>
          <Link to={`${ADMIN_BASE}/bookings`} className="flex items-center gap-1 text-[#F4B942] text-xs hover:underline">
            View All <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E8E0D5]">
                {['Ref', 'Customer', 'Package', 'Destination', 'Status', 'Amount'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-[#78716C] pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E0]">
              {mockBookings.slice(0, 5).map(booking => (
                <tr key={booking.id} className="hover:bg-[#F5F0E8] transition-colors">
                  <td className="py-3 pr-4 text-[#F4B942] font-mono text-xs">{booking.bookingRef}</td>
                  <td className="py-3 pr-4 text-white">{booking.customerName}</td>
                  <td className="py-3 pr-4 text-[#78716C] text-xs max-w-36 truncate">{booking.packageTitle}</td>
                  <td className="py-3 pr-4 text-[#78716C] text-xs">{booking.destination}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                  </td>
                  <td className="py-3 text-[#F4B942] font-semibold">₹{booking.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
