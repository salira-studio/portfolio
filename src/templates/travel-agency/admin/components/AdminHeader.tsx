import { Menu, Bell, Search } from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick: () => void
  adminName: string
}

export function AdminHeader({ onMenuClick, adminName }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#0D1117]/95 backdrop-blur-xl border-b border-white/[0.06] h-14 flex items-center px-4 sm:px-6 gap-4">
      <button
        onClick={onMenuClick}
        className="md:hidden text-[#A8B0BA] hover:text-white p-1 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xs hidden sm:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B0BA]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder:text-[#A8B0BA]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#A8B0BA] hover:text-white transition-all">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F4B942]" />
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
          <div className="w-7 h-7 rounded-full bg-[#F4B942]/20 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] text-xs font-bold">
            {adminName.charAt(0)}
          </div>
          <span className="text-sm text-white hidden sm:block">{adminName}</span>
        </div>
      </div>
    </header>
  )
}
