import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, Users, MapPin, TrendingUp } from 'lucide-react'
import type { TourPackage } from '../../data/packages'
import { WishlistButton } from './WishlistButton'

const TRAVEL_BASE = '/work/travel/customer'

interface PackageCardProps {
  pkg: TourPackage
  index?: number
}

const categoryColors: Record<string, string> = {
  luxury: 'bg-yellow-500/20 text-yellow-300',
  adventure: 'bg-emerald-500/20 text-emerald-300',
  family: 'bg-blue-500/20 text-blue-300',
  honeymoon: 'bg-pink-500/20 text-pink-300',
  budget: 'bg-purple-500/20 text-purple-300',
  cultural: 'bg-orange-500/20 text-orange-300',
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`${TRAVEL_BASE}/packages/${pkg.id}`} className="block group">
        <div className="bg-white border border-[#E8E0D5] hover:border-[#F4B942]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(244,185,66,0.1)]">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${pkg.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {pkg.trending && (
                <span className="flex items-center gap-1 bg-[#F4B942]/90 text-[#0D1117] text-xs font-bold px-2 py-0.5 rounded-full">
                  <TrendingUp size={10} />
                  Hot
                </span>
              )}
              {pkg.discount > 0 && (
                <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {pkg.discount}% OFF
                </span>
              )}
            </div>

            {/* Wishlist */}
            <div className="absolute top-3 right-3">
              <WishlistButton
                itemId={pkg.id}
                itemType="package"
                className="w-8 h-8 bg-black/40 backdrop-blur hover:bg-black/60"
                size={16}
              />
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full">
              <Clock size={11} />
              <span>{pkg.duration}D / {pkg.nights}N</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[#78716C]/70 text-xs">
                <MapPin size={11} />
                <span>{pkg.destination}, {pkg.country}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${categoryColors[pkg.category]}`}>
                {pkg.category}
              </span>
            </div>

            <h3 className="text-[#1C1917] font-semibold text-base mb-3 line-clamp-2 leading-snug group-hover:text-[#F4B942] transition-colors">
              {pkg.title}
            </h3>

            {/* Inclusions preview */}
            <div className="flex flex-wrap gap-1 mb-3">
              {pkg.inclusions.slice(0, 3).map((inc, i) => (
                <span key={i} className="text-[10px] bg-[#F5F0E8] text-[#78716C] px-2 py-0.5 rounded-full border border-[#E8E0D5]">
                  {inc}
                </span>
              ))}
              {pkg.inclusions.length > 3 && (
                <span className="text-[10px] text-[#F4B942]/70 px-1">+{pkg.inclusions.length - 3} more</span>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E8E0D5]">
              <div className="flex items-center gap-3 text-xs text-[#78716C]">
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-[#F4B942] text-[#F4B942]" />
                  <span className="text-[#1C1917] font-medium">{pkg.rating}</span>
                  <span>({pkg.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={11} />
                  <span>{pkg.groupSize}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#78716C] text-xs line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</p>
                <p className="text-[#F4B942] font-bold text-base">₹{pkg.price.toLocaleString('en-IN')}</p>
                <p className="text-[#78716C] text-[10px]">per person</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
