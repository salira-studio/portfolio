import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, BarChart2 } from 'lucide-react'
import { mockBookings } from '../../data/bookings'
import { mockCustomers } from '../../data/customers'

const monthlyRevenue = [38, 42, 35, 55, 61, 48, 58, 72, 65, 78, 88, 95]
const monthlyBookings = [12, 15, 10, 18, 22, 17, 20, 26, 22, 28, 32, 36]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const topDestinations = [
  { name: 'Bali', revenue: 468000, bookings: 6, pct: 100 },
  { name: 'Kerala', revenue: 342000, bookings: 12, pct: 73 },
  { name: 'Switzerland', revenue: 276000, bookings: 2, pct: 59 },
  { name: 'Maldives', revenue: 270000, bookings: 2, pct: 58 },
  { name: 'Japan', revenue: 148000, bookings: 1, pct: 32 },
  { name: 'Rajasthan', revenue: 135000, bookings: 3, pct: 29 },
]

const categoryData = [
  { name: 'Luxury', pct: 35, color: 'bg-yellow-400' },
  { name: 'Honeymoon', pct: 25, color: 'bg-pink-400' },
  { name: 'Cultural', pct: 20, color: 'bg-orange-400' },
  { name: 'Adventure', pct: 12, color: 'bg-emerald-400' },
  { name: 'Family', pct: 8, color: 'bg-blue-400' },
]

function BarChart({ data, label, color, maxH = 100 }: { data: number[]; label: string[]; color: string; maxH?: number }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 h-28">
      {data.map((v, i) => (
        <motion.div key={i} className="flex-1 flex flex-col items-center gap-1"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          style={{ transformOrigin: 'bottom' }}>
          <div className={`w-full rounded-t-sm ${color}`} style={{ height: `${(v / max) * maxH}px` }} />
          <span className="text-[#A8B0BA] text-[9px]">{label[i]}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default function AdminAnalytics() {
  const totalRevenue = mockBookings.reduce((s, b) => s + b.paidAmount, 0)
  const conversionRate = Math.round((mockBookings.filter(b => b.status !== 'cancelled').length / mockBookings.length) * 100)
  const avgBookingValue = Math.round(totalRevenue / mockBookings.length)

  const kpis = [
    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: 'text-[#F4B942]', bg: 'bg-[#F4B942]/10', change: '+18% YoY' },
    { label: 'Avg Booking Value', value: `₹${avgBookingValue.toLocaleString('en-IN')}`, icon: BarChart2, color: 'text-blue-400', bg: 'bg-blue-500/10', change: '+12%' },
    { label: 'Conversion Rate', value: `${conversionRate}%`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', change: '+3%' },
    { label: 'Active Customers', value: mockCustomers.filter(c => c.status === 'active').length, icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10', change: '+8%' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-[#A8B0BA] text-sm">Business performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
              <kpi.icon size={18} className={kpi.color} />
            </div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[#A8B0BA] text-xs mt-0.5">{kpi.label}</p>
            <p className="text-emerald-400 text-xs mt-1 flex items-center gap-0.5"><TrendingUp size={10} />{kpi.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Revenue Chart */}
        <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-1">Monthly Revenue (₹ Lakhs)</h2>
          <p className="text-[#A8B0BA] text-xs mb-4">FY 2024–25</p>
          <BarChart data={monthlyRevenue} label={months} color="bg-[#F4B942]/70 hover:bg-[#F4B942]" />
        </div>

        {/* Bookings Chart */}
        <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-1">Monthly Bookings</h2>
          <p className="text-[#A8B0BA] text-xs mb-4">FY 2024–25</p>
          <BarChart data={monthlyBookings} label={months} color="bg-blue-500/70" />
        </div>

        {/* Top Destinations */}
        <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-4">Top Destinations by Revenue</h2>
          <div className="space-y-3">
            {topDestinations.map(dest => (
              <div key={dest.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#A8B0BA] text-xs">{dest.name}</span>
                  <span className="text-[#F4B942] text-xs font-semibold">₹{(dest.revenue / 1000).toFixed(0)}K</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#F4B942] to-[#e5ab38] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${dest.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-4">Bookings by Category</h2>
          <div className="space-y-3">
            {categoryData.map(cat => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#A8B0BA] text-xs flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />{cat.name}
                  </span>
                  <span className="text-white text-xs font-medium">{cat.pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${cat.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stacked donut-like visual */}
          <div className="mt-5 flex items-center gap-2 flex-wrap">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center gap-1.5 text-xs text-[#A8B0BA]">
                <span className={`w-2.5 h-2.5 rounded-sm ${cat.color}`} />
                {cat.name} ({cat.pct}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue vs Target */}
      <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
        <h2 className="text-white font-semibold mb-4">Quarterly Performance vs Target</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { q: 'Q1 (Apr–Jun)', actual: 72, target: 80, revenue: '₹18.5L' },
            { q: 'Q2 (Jul–Sep)', actual: 88, target: 85, revenue: '₹24.2L' },
            { q: 'Q3 (Oct–Dec)', actual: 95, target: 90, revenue: '₹28.8L' },
            { q: 'Q4 (Jan–Mar)', actual: 78, target: 95, revenue: '₹22.1L' },
          ].map(q => (
            <div key={q.q} className="bg-[#0D1117] rounded-xl p-4">
              <p className="text-[#A8B0BA] text-xs mb-2">{q.q}</p>
              <p className="text-[#F4B942] font-bold text-lg">{q.revenue}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-[#A8B0BA]">Actual</span>
                  <span className={q.actual >= q.target ? 'text-emerald-400' : 'text-red-400'}>{q.actual}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full">
                  <motion.div className={`h-full rounded-full ${q.actual >= q.target ? 'bg-emerald-500' : 'bg-red-500'}`}
                    initial={{ width: 0 }} animate={{ width: `${q.actual}%` }} transition={{ duration: 0.8 }} />
                </div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-[#A8B0BA]">Target</span>
                  <span className="text-[#A8B0BA]">{q.target}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full">
                  <div className="h-full bg-white/20 rounded-full" style={{ width: `${q.target}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
