import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Plane, Car, Hotel } from 'lucide-react'

const TRAVEL_BASE = '/work/travel/customer'

const tabs = [
  { id: 'flight', label: 'Flights', icon: Plane },
  { id: 'hotel', label: 'Hotels', icon: Hotel },
  { id: 'car', label: 'Cars', icon: Car },
]

export function SearchWidget() {
  const [activeTab, setActiveTab] = useState('flight')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState('2')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = destination.trim()
    if (q) {
      navigate(`${TRAVEL_BASE}/destinations?search=${encodeURIComponent(q)}`)
    } else {
      navigate(`${TRAVEL_BASE}/destinations`)
    }
  }

  return (
    <div className="bg-[rgba(255,255,255,0.07)] backdrop-blur-xl border border-[#E8E0D5] rounded-2xl p-6 shadow-2xl w-full max-w-3xl">
      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-[rgba(255,255,255,0.05)] p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'text-[#0D1117]' : 'text-[#78716C] hover:text-white'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="search-tab"
                className="absolute inset-0 bg-[#F4B942] rounded-lg"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <tab.icon size={15} className="relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Destination */}
          <div className="sm:col-span-1">
            <label className="block text-xs text-[#78716C] mb-1.5 font-medium">Destination</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4B942]" />
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="Where to?"
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[#E8E0D5] rounded-xl pl-9 pr-3 py-3 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/50 focus:bg-[rgba(255,255,255,0.09)] transition-all"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs text-[#78716C] mb-1.5 font-medium">Travel Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4B942]" />
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[#E8E0D5] rounded-xl pl-9 pr-3 py-3 text-sm text-white placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-xs text-[#78716C] mb-1.5 font-medium">Travelers</label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4B942]" />
              <select
                value={travelers}
                onChange={e => setTravelers(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.06)] border border-[#E8E0D5] rounded-xl pl-9 pr-3 py-3 text-sm text-white focus:outline-none focus:border-[#F4B942]/50 transition-all appearance-none cursor-pointer"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n} className="bg-[#F5F0E8]">{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold py-3.5 rounded-xl transition-colors text-sm"
        >
          <Search size={18} />
          Search Experiences
        </button>
      </form>
    </div>
  )
}
