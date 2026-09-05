import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, Map, Calendar, MessageSquare, Users,
  BarChart3, Globe, X, ExternalLink
} from 'lucide-react'

const ADMIN_BASE = '/work/travel/admin'
const CUSTOMER_BASE = '/work/travel/customer'

const navItems = [
  { to: `${ADMIN_BASE}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
  { to: `${ADMIN_BASE}/packages`,  icon: Package,         label: 'Packages' },
  { to: `${ADMIN_BASE}/destinations`, icon: Map,          label: 'Destinations' },
  { to: `${ADMIN_BASE}/bookings`,  icon: Calendar,        label: 'Bookings' },
  { to: `${ADMIN_BASE}/enquiries`, icon: MessageSquare,   label: 'Enquiries' },
  { to: `${ADMIN_BASE}/customers`, icon: Users,           label: 'Customers' },
  { to: `${ADMIN_BASE}/analytics`, icon: BarChart3,       label: 'Analytics' },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-[#E8E0D5]">
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-[#E8E0D5]">
        <Link to={ADMIN_BASE} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F4B942] flex items-center justify-center shadow-sm">
            <Globe size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-[#1C1917] text-sm">VoyageAI</span>
            <p className="text-[10px] text-[#78716C] -mt-0.5">Admin Console</p>
          </div>
        </Link>
        <button onClick={onClose} className="md:hidden text-[#78716C] hover:text-[#1C1917] p-1">
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => onClose()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#F4B942]/15 text-[#B45309] border border-[#F4B942]/30'
                  : 'text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F0E8]'
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#E8E0D5]">
        <a href={CUSTOMER_BASE} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F0E8] transition-all">
          <ExternalLink size={15} />
          View Customer Site
        </a>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block w-60 shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-64 z-50 md:hidden">
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
