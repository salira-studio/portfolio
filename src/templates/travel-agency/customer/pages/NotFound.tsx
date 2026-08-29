import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe } from 'lucide-react'

const TRAVEL_BASE = '/work/travel/customer'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0D1117]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <div className="w-20 h-20 rounded-2xl bg-[#F4B942]/10 border border-[#F4B942]/20 flex items-center justify-center mx-auto mb-6">
          <Globe size={36} className="text-[#F4B942]" />
        </div>
        <h1 className="text-7xl font-bold text-[#F4B942] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-[#A8B0BA] mb-8 max-w-sm mx-auto">
          Looks like this destination doesn't exist on our map. Let's get you back on track.
        </p>
        <Link
          to={TRAVEL_BASE}
          className="inline-flex items-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
