import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'

const TRAVEL_BASE = '/work/travel/customer'

const navLinks = [
  { to: `${TRAVEL_BASE}/destinations`, label: 'Destinations' },
  { to: `${TRAVEL_BASE}/packages`, label: 'Packages' },
  { to: `${TRAVEL_BASE}/about`, label: 'About' },
  { to: `${TRAVEL_BASE}/contact`, label: 'Contact' },
]

interface NavbarProps {
  user: { name: string; email: string } | null
  onLogout: () => void
}

export function Navbar({ user: _user, onLogout: _onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF5]/90 backdrop-blur-xl border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={TRAVEL_BASE} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F4B942] flex items-center justify-center">
            <Globe size={18} className="text-[#0D1117]" />
          </div>
          <div>
            <span className="font-bold text-[#1C1917] text-lg tracking-tight">Voyage</span>
            <span className="font-bold text-[#F4B942] text-lg tracking-tight">AI</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-[#F4B942]' : 'text-[#78716C] hover:text-[#92400E]'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#78716C] hover:text-[#92400E] p-2"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E8E0D5] bg-[#FDFAF5]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#F4B942]/10 text-[#F4B942]' : 'text-[#78716C] hover:text-[#92400E] hover:bg-[#F5F0E8]'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
