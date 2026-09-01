import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, Clock, Users, MapPin, ArrowLeft, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { packages } from '../../data/packages'
import { WishlistButton } from '../components/WishlistButton'

const TRAVEL_BASE = '/work/travel/customer'

export default function PackageDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pkg = packages.find(p => p.id === id)
  const [expandedDay, setExpandedDay] = useState<number | null>(1)
  const [travelers, setTravelers] = useState(2)

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🧳</p>
          <h1 className="text-2xl font-bold text-[#1C1917] mb-2">Package Not Found</h1>
          <Link to={`${TRAVEL_BASE}/packages`} className="text-[#F4B942] hover:underline">Back to Packages</Link>
        </div>
      </div>
    )
  }

  const totalPrice = pkg.price * travelers

  const handleEnquire = () => {
    const user = localStorage.getItem('travel_user')
    if (!user) {
      navigate(`${TRAVEL_BASE}/login?redirect=/packages/${id}`)
      return
    }
    const enquiries = JSON.parse(localStorage.getItem('travel_enquiries') || '[]')
    enquiries.unshift({
      id: Date.now().toString(),
      packageId: pkg.id,
      packageTitle: pkg.title,
      travelers,
      totalPrice,
      submittedOn: new Date().toISOString().split('T')[0],
      status: 'pending',
    })
    localStorage.setItem('travel_enquiries', JSON.stringify(enquiries))
    navigate(`${TRAVEL_BASE}/dashboard`)
  }

  const categoryColors: Record<string, string> = {
    luxury: 'bg-yellow-500/20 text-yellow-300', adventure: 'bg-emerald-500/20 text-emerald-300',
    family: 'bg-blue-500/20 text-blue-300', honeymoon: 'bg-pink-500/20 text-pink-300',
    budget: 'bg-purple-500/20 text-purple-300', cultural: 'bg-orange-500/20 text-orange-300',
  }

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-black/50 to-black/20" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`${TRAVEL_BASE}/packages`} className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={15} /> All Packages
          </Link>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${categoryColors[pkg.category]}`}>{pkg.category}</span>
                {pkg.discount > 0 && <span className="bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">{pkg.discount}% OFF</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{pkg.title}</h1>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span className="flex items-center gap-1"><MapPin size={13} />{pkg.destination}, {pkg.country}</span>
                <span className="flex items-center gap-1"><Clock size={13} />{pkg.duration}D/{pkg.nights}N</span>
                <span className="flex items-center gap-1"><Users size={13} />Max {pkg.groupSize}</span>
              </div>
            </div>
            <WishlistButton itemId={pkg.id} itemType="package" className="w-11 h-11 bg-white/10 backdrop-blur border border-white/20" size={20} />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            {/* Rating + Tags */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-[#E8E0D5]">
                <Star size={16} className="fill-[#F4B942] text-[#F4B942]" />
                <span className="text-[#1C1917] font-bold">{pkg.rating}</span>
                <span className="text-[#78716C] text-sm">({pkg.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-[#E8E0D5]">
                <span className={`w-2 h-2 rounded-full ${pkg.difficulty === 'Easy' ? 'bg-emerald-400' : pkg.difficulty === 'Moderate' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                <span className="text-[#78716C] text-sm">{pkg.difficulty}</span>
              </div>
              {pkg.tags.map(tag => (
                <span key={tag} className="bg-[#F5F0E8] border border-[#E8E0D5] text-[#78716C] px-3 py-1.5 rounded-full text-xs">{tag}</span>
              ))}
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold text-[#1C1917] mb-4">Package Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-[#E8E0D5]">
                    <div className="w-6 h-6 rounded-full bg-[#F4B942]/20 flex items-center justify-center shrink-0">
                      <Check size={13} className="text-[#F4B942]" />
                    </div>
                    <span className="text-[#1C1917] text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5]">
                <h3 className="text-[#1C1917] font-semibold mb-3 flex items-center gap-2"><Check size={16} className="text-emerald-400" />Inclusions</h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#78716C]">
                      <Check size={13} className="text-emerald-400 shrink-0" />{inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5]">
                <h3 className="text-[#1C1917] font-semibold mb-3 flex items-center gap-2"><X size={16} className="text-red-400" />Exclusions</h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#78716C]">
                      <X size={13} className="text-red-400 shrink-0" />{exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-xl font-bold text-[#1C1917] mb-4">Day-by-Day Itinerary</h2>
              <div className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="bg-white border border-[#E8E0D5] rounded-xl overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#F4B942]/20 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] text-xs font-bold shrink-0">
                          {day.day}
                        </span>
                        <span className="text-[#1C1917] font-medium text-sm">Day {day.day}: {day.title}</span>
                      </div>
                      {expandedDay === day.day ? <ChevronUp size={16} className="text-[#78716C]" /> : <ChevronDown size={16} className="text-[#78716C]" />}
                    </button>
                    {expandedDay === day.day && (
                      <div className="px-4 pb-4 text-sm text-[#78716C] border-t border-[#E8E0D5] pt-3">{day.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-[#E8E0D5] rounded-2xl p-5 sticky top-24">
              <div className="mb-4">
                <p className="text-[#78716C] text-xs line-through">₹{pkg.originalPrice.toLocaleString('en-IN')} <span className="text-red-400">({pkg.discount}% off)</span></p>
                <p className="text-[#F4B942] text-3xl font-bold">₹{pkg.price.toLocaleString('en-IN')}</p>
                <p className="text-[#78716C] text-xs">per person</p>
              </div>
              <div className="mb-4">
                <label htmlFor="pd-travelers" className="text-xs text-[#78716C] mb-1.5 block">Number of Travelers</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-8 h-8 rounded-full bg-[#F5F0E8] border border-[#E8E0D5] text-[#1C1917] hover:bg-[#EDE8E0] transition-colors flex items-center justify-center text-lg">−</button>
                  <span className="text-[#1C1917] font-semibold text-lg w-8 text-center">{travelers}</span>
                  <button onClick={() => setTravelers(travelers + 1)} className="w-8 h-8 rounded-full bg-[#F5F0E8] border border-[#E8E0D5] text-[#1C1917] hover:bg-[#EDE8E0] transition-colors flex items-center justify-center text-lg">+</button>
                </div>
              </div>
              <div className="bg-[#F4B942]/5 border border-[#F4B942]/10 rounded-xl p-3 mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#78716C]">₹{pkg.price.toLocaleString('en-IN')} × {travelers}</span>
                  <span className="text-[#1C1917]">₹{(pkg.price * travelers).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#1C1917]">Total</span>
                  <span className="text-[#F4B942]">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button onClick={handleEnquire}
                className="w-full bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold py-3.5 rounded-xl transition-colors text-sm mb-2">
                Book This Package
              </button>
              <Link to={`${TRAVEL_BASE}/contact?package=${pkg.id}`}
                className="block w-full text-center border border-[#D6CFC4] hover:border-white/40 text-[#1C1917] py-3 rounded-xl transition-colors text-sm">
                Send Enquiry
              </Link>
              <p className="text-[#78716C] text-xs text-center mt-3">Free cancellation within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
