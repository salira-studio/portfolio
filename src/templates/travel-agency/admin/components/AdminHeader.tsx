import { Menu, Bell, Search } from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick: () => void
  adminName: string
}

export function AdminHeader({ onMenuClick, adminName }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#E8E0D5] h-14 flex items-center px-4 sm:px-6 gap-4">
      <button
        onClick={onMenuClick}
        className="md:hidden text-[#78716C] hover:text-[#1C1917] p-1 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xs hidden sm:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-[#F5F0E8] border border-[#E8E0D5] rounded-xl pl-8 pr-3 py-2 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#F4B942]/60 transition-all"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-full bg-[#F5F0E8] hover:bg-[#EDE8E0] border border-[#E8E0D5] flex items-center justify-center text-[#78716C] hover:text-[#1C1917] transition-all">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F4B942]" />
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2.5 bg-[#F5F0E8] border border-[#E8E0D5] rounded-xl px-3 py-1.5">
          <div className="w-7 h-7 rounded-full bg-[#F4B942]/20 border border-[#F4B942]/40 flex items-center justify-center text-[#B45309] text-xs font-bold">
            {adminName.charAt(0)}
          </div>
          <span className="text-sm text-[#1C1917] font-medium hidden sm:block">{adminName}</span>
        </div>
      </div>
    </header>
  )
}
