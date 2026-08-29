import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, ArrowLeft, Calendar, Check } from 'lucide-react'
import { destinations } from '../../data/destinations'
import { packages } from '../../data/packages'
import { PackageCard } from '../components/PackageCard'
import { WishlistButton } from '../components/WishlistButton'

const TRAVEL_BASE = '/work/travel/customer'

export default function DestinationDetail() {
  const { id } = useParams()
  const dest = destinations.find(d => d.id === id)

  if (!dest) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🌍</p>
          <h1 className="text-2xl font-bold text-white mb-2">Destination Not Found</h1>
          <Link to={`${TRAVEL_BASE}/destinations`} className="text-[#F4B942] hover:underline">Back to Destinations</Link>
        </div>
      </div>
    )
  }

  const relatedPackages = packages.filter(p => p.destinationId === id).slice(0, 4)

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Hero */}
      <section className="relative h-[55vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dest.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`${TRAVEL_BASE}/destinations`} className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors w-fit">
            <ArrowLeft size={16} />
            All Destinations
          </Link>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#F4B942] text-sm mb-2">
                <MapPin size={14} />
                <span>{dest.country} · {dest.continent}</span>
              </div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {dest.name}
              </motion.h1>
              <p className="text-white/80 text-lg">{dest.tagline}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <WishlistButton itemId={dest.id} itemType="destination" className="w-11 h-11 bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20" size={20} />
              <Link to={`${TRAVEL_BASE}/contact?destination=${dest.id}`}
                className="bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                Plan This Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-[#151B23] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Star, label: 'Rating', value: `${dest.rating}/5 (${dest.reviewCount.toLocaleString()} reviews)` },
              { icon: Clock, label: 'Ideal Duration', value: dest.duration },
              { icon: Calendar, label: 'Best Time', value: dest.bestTime },
              { icon: MapPin, label: 'Starting From', value: `₹${dest.priceFrom.toLocaleString('en-IN')}` },
            ].map((item) => (
              <div key={item.label} className="bg-[#171E27] rounded-xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#F4B942] mb-1">
                  <item.icon size={14} />
                  <span className="text-xs text-[#A8B0BA]">{item.label}</span>
                </div>
                <p className="text-white text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">About {dest.name}</h2>
              <p className="text-[#A8B0BA] leading-relaxed">{dest.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Top Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dest.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#171E27] rounded-xl p-3 border border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-[#F4B942]/20 flex items-center justify-center shrink-0">
                      <Check size={13} className="text-[#F4B942]" />
                    </div>
                    <span className="text-white text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Experiences</h2>
              <div className="flex flex-wrap gap-2">
                {dest.tags.map(tag => (
                  <span key={tag} className="bg-[#F4B942]/10 border border-[#F4B942]/20 text-[#F4B942] px-4 py-2 rounded-full text-sm font-medium">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-4">Quick Enquiry</h3>
              <Link to={`${TRAVEL_BASE}/contact?destination=${dest.id}`}
                className="block w-full text-center bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold py-3 rounded-xl transition-colors text-sm mb-3">
                Send Enquiry
              </Link>
              <Link to={`${TRAVEL_BASE}/packages?destination=${dest.id}`}
                className="block w-full text-center border border-white/20 hover:border-white/40 text-white py-3 rounded-xl transition-colors text-sm">
                View All Packages
              </Link>
            </div>
            <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-white font-semibold mb-2">Travel Tips</h3>
              <ul className="space-y-2 text-sm text-[#A8B0BA]">
                <li>• Best time to visit: <strong className="text-white">{dest.bestTime}</strong></li>
                <li>• Recommended stay: <strong className="text-white">{dest.duration}</strong></li>
                <li>• Book 60+ days ahead for best rates</li>
                <li>• Free cancellation within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="bg-[#151B23] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Packages for {dest.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedPackages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
