import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, TrendingUp } from 'lucide-react'
import type { Destination } from '../../data/destinations'
import { WishlistButton } from './WishlistButton'

const TRAVEL_BASE = '/work/travel/customer'

interface DestinationCardProps {
  destination: Destination
  index?: number
  variant?: 'default' | 'large'
}

export function DestinationCard({ destination, index = 0, variant = 'default' }: DestinationCardProps) {
  const isLarge = variant === 'large'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`${TRAVEL_BASE}/destinations/${destination.id}`} className="block group">
        <div className={`relative overflow-hidden rounded-2xl bg-[#171E27] border border-white/[0.06] hover:border-[#F4B942]/30 transition-all duration-300 ${isLarge ? 'h-72' : 'h-60'}`}>
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${destination.image})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {destination.trending && (
              <span className="flex items-center gap-1 bg-[#F4B942]/90 text-[#0D1117] text-xs font-bold px-2.5 py-1 rounded-full">
                <TrendingUp size={11} />
                Trending
              </span>
            )}
            {destination.featured && !destination.trending && (
              <span className="bg-white/10 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
                Featured
              </span>
            )}
          </div>

          {/* Wishlist */}
          <div className="absolute top-3 right-3">
            <WishlistButton
              itemId={destination.id}
              itemType="destination"
              className="w-8 h-8 bg-black/40 backdrop-blur hover:bg-black/60"
              size={16}
            />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 text-[#F4B942]/80 text-xs mb-1">
              <MapPin size={12} />
              <span>{destination.country}</span>
            </div>
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{destination.name}</h3>
            <p className="text-white/70 text-xs mb-3 line-clamp-1">{destination.tagline}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-[#F4B942] text-[#F4B942]" />
                  <span className="text-white text-xs font-semibold">{destination.rating}</span>
                  <span className="text-white/50 text-xs">({(destination.reviewCount / 1000).toFixed(1)}k)</span>
                </div>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <Clock size={11} />
                  <span>{destination.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-white/50 text-xs">From</span>
                <p className="text-[#F4B942] font-bold text-sm">₹{destination.priceFrom.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
