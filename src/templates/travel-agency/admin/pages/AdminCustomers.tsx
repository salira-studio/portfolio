import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users } from 'lucide-react'
import { mockCustomers, type Customer } from '../../data/customers'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filtered = customers.filter(c => {
    const q = !query || c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.city.toLowerCase().includes(query.toLowerCase())
    return q && (statusFilter === 'all' || c.status === statusFilter)
  })

  const toggleStatus = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-[#78716C] text-sm">{filtered.length} customers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: customers.length, color: 'text-white', bg: 'bg-[#F5F0E8]' },
          { label: 'Active', value: customers.filter(c => c.status === 'active').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Inactive', value: customers.filter(c => c.status === 'inactive').length, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Revenue', value: `₹${(customers.reduce((s, c) => s + c.totalSpent, 0) / 100000).toFixed(1)}L`, color: 'text-[#F4B942]', bg: 'bg-[#F4B942]/10' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.bg} border border-[#E8E0D5] rounded-2xl p-4 flex items-center gap-3`}>
            <Users size={18} className={stat.color} />
            <div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[#78716C] text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search customers..."
            className="bg-white border border-[#E8E0D5] rounded-xl pl-8 pr-3 py-2.5 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/40 w-56 transition-all" />
        </div>
        <div className="flex gap-1.5">
          {(['all', 'active', 'inactive'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${statusFilter === s ? 'bg-[#F4B942] text-[#0D1117]' : 'bg-white text-[#78716C] border border-[#E8E0D5] hover:text-[#1C1917]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E0D5] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="border-b border-[#E8E0D5]">
              <tr>
                {['Customer', 'City', 'Joined', 'Bookings', 'Total Spent', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-[#78716C] px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E0]">
              {filtered.map((customer, i) => (
                <motion.tr key={customer.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-[#F5F0E8] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F4B942]/20 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] text-xs font-bold shrink-0">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{customer.name}</p>
                        <p className="text-[#78716C] text-xs">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#78716C] text-xs">{customer.city}</td>
                  <td className="px-4 py-3 text-[#78716C] text-xs">{customer.joinedDate}</td>
                  <td className="px-4 py-3 text-white font-medium text-center">{customer.totalBookings}</td>
                  <td className="px-4 py-3 text-[#F4B942] font-semibold">₹{customer.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${customer.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-[#78716C]'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(customer.id)}
                      className="text-xs px-2.5 py-1 rounded-lg border border-[#E8E0D5] text-[#78716C] hover:border-white/30 hover:text-[#1C1917] transition-colors">
                      {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
