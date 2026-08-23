import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, RotateCcw, ExternalLink, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CUSTOMER_BASE, CONSOLE_BASE } from '../../routes'
import { useAppStore } from '../../store/useAppStore'

export default function Account() {
  const restaurant = useAppStore((state) => state.restaurant)
  const resetDemo = useAppStore((state) => state.resetDemo)

  return (
    <div className="min-h-screen bg-[var(--color-ivory-50)] py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-espresso-900)]">
            About & Demo Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] mt-0.5">
            AURA digital dining platform capability showcase
          </p>
        </div>

        {/* Restaurant Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xs space-y-5"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-espresso-900)] text-white flex items-center justify-center font-display font-bold text-2xl">
              A
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-[var(--color-espresso-900)]">
                {restaurant.name}
              </h2>
              <p className="text-xs text-[var(--color-cocoa-500)] font-medium">
                {restaurant.tagline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--color-line-light)] text-xs text-[var(--color-cocoa-500)]">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[var(--color-clay-500)] shrink-0 mt-0.5" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[var(--color-clay-500)] shrink-0" />
              <span>{restaurant.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-[var(--color-clay-500)] shrink-0" />
              <span>{restaurant.email}</span>
            </div>
          </div>

          <div className="pt-2 text-xs text-[var(--color-cocoa-400)] border-t border-[var(--color-line-light)]">
            <strong>Operating Hours:</strong> {restaurant.hours}
          </div>
        </motion.div>

        {/* Demo Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2 text-[var(--color-espresso-900)]">
            <Sparkles size={18} className="text-amber-500" />
            <h3 className="font-display text-lg font-bold">
              Showcase Live State Management
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[var(--color-cocoa-400)] leading-relaxed">
            This showcase uses lightweight Zustand state synced across browser tabs using BroadcastChannel.
            Orders placed in the customer view appear immediately in the Restaurant Kitchen Console without a separate backend database.
          </p>

          <div className="pt-3 flex flex-wrap gap-4 items-center justify-between border-t border-[var(--color-line-light)]">
            <div className="flex items-center gap-3">
              <Link
                to={`${CONSOLE_BASE}/orders`}
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-[var(--color-espresso-900)] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[var(--color-clay-500)] transition-colors"
              >
                <span>Open Restaurant Console</span>
                <ExternalLink size={13} />
              </Link>
              <Link
                to={`${CUSTOMER_BASE}/menu`}
                className="inline-flex items-center gap-1.5 bg-[var(--color-clay-500)] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[var(--color-clay-600)] transition-colors"
              >
                <span>Order Dishes</span>
              </Link>
            </div>

            <button
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <RotateCcw size={13} />
              <span>Reset Clean Demo State</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
