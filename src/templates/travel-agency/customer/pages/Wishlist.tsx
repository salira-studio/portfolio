import { useState } from 'react'
import { useOutletContext, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft, Trash2 } from 'lucide-react'
import { destinations } from '../../data/destinations'
import { packages } from '../../data/packages'
import { getWishlist, setWishlist } from '../components/WishlistButton'
import { DestinationCard } from '../components/DestinationCard'
import { PackageCard } from '../components/PackageCard'

const TRAVEL_BASE = '/work/travel/customer'

interface AuthContext { user: { name: string; email: string } | null }

export default function Wishlist() {
  const ctx = useOutletContext<AuthContext>()
  if (!ctx.user) return <Navigate to={`${TRAVEL_BASE}/login`} replace />

  const [wishlist, setWishlistState] = useState<string[]>(getWishlist)

  const wishlistDestinations = destinations.filter(d => wishlist.includes(`destination:${d.id}`))
  const wishlistPackages = packages.filter(p => wishlist.includes(`package:${p.id}`))

  const clearAll = () => {
    setWishlist([])
    setWishlistState([])
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <section className="bg-[#151B23] border-b border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`${TRAVEL_BASE}/dashboard`} className="flex items-center gap-1.5 text-[#A8B0BA] hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={15} /> Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
              <p className="text-[#A8B0BA] mt-1">{wishlist.length} saved items</p>
            </div>
            {wishlist.length > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-xl">
                <Trash2 size={13} /> Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-pink-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-[#A8B0BA] text-sm mb-6">Save destinations and packages you'd love to visit</p>
            <Link to={`${TRAVEL_BASE}/destinations`}
              className="inline-block bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Explore Destinations
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {wishlistDestinations.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">
                  Saved Destinations <span className="text-[#A8B0BA] text-base font-normal">({wishlistDestinations.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {wishlistDestinations.map((d, i) => (
                    <DestinationCard key={d.id} destination={d} index={i} />
                  ))}
                </div>
              </div>
            )}
            {wishlistPackages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">
                  Saved Packages <span className="text-[#A8B0BA] text-base font-normal">({wishlistPackages.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {wishlistPackages.map((p, i) => (
                    <PackageCard key={p.id} pkg={p} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
