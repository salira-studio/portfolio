import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown, User, LogOut, LayoutDashboard, Heart } from 'lucide-react'

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

export function Navbar({ user, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    setUserMenuOpen(false)
    navigate(`${TRAVEL_BASE}/login`)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF5]/90 backdrop-blur-xl border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={TRAVEL_BASE} className="flex items-center gap-2.5 group">
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
                `text-sm font-medium transition-colors ${isActive ? 'text-[#F4B942]' : 'text-[#78716C] hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Area */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-[#F5F0E8] hover:bg-[#EDE8E0] border border-[#E8E0D5] rounded-xl px-3 py-2 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#F4B942]/20 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm text-white hidden sm:block">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-[#78716C] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8E0D5] rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-[#E8E0D5]">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-[#78716C]">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <Link to={`${TRAVEL_BASE}/dashboard`} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#78716C] hover:text-white hover:bg-[#F5F0E8] transition-colors">
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                      <Link to={`${TRAVEL_BASE}/dashboard/bookings`} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#78716C] hover:text-white hover:bg-[#F5F0E8] transition-colors">
                        <User size={15} />
                        My Bookings
                      </Link>
                      <Link to={`${TRAVEL_BASE}/dashboard/wishlist`} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#78716C] hover:text-white hover:bg-[#F5F0E8] transition-colors">
                        <Heart size={15} />
                        Wishlist
                      </Link>
                      <button onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full">
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={`${TRAVEL_BASE}/login`}
                className="text-sm text-[#78716C] hover:text-white transition-colors px-3 py-2 hidden sm:block">
                Sign In
              </Link>
              <Link to={`${TRAVEL_BASE}/register`}
                className="text-sm font-semibold bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] px-4 py-2 rounded-xl transition-colors">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#78716C] hover:text-white p-2"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-[#F4B942]/10 text-[#F4B942]' : 'text-[#78716C] hover:text-white hover:bg-[#F5F0E8]'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {!user && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-[#E8E0D5]">
                  <Link to={`${TRAVEL_BASE}/login`} onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center text-sm py-2.5 rounded-xl border border-[#E8E0D5] text-[#78716C]">
                    Sign In
                  </Link>
                  <Link to={`${TRAVEL_BASE}/register`} onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-[#F4B942] text-[#0D1117]">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
