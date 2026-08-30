import { Link } from 'react-router-dom'
import { Globe, MapPin, Phone, Mail } from 'lucide-react'

const TRAVEL_BASE = '/work/travel/customer'

export function Footer() {
  return (
    <footer className="bg-[#0A0E14] border-t border-[#E8E0D5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E8E0D5]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to={TRAVEL_BASE} className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F4B942] flex items-center justify-center">
                <Globe size={18} className="text-[#0D1117]" />
              </div>
              <span className="font-bold text-[#1C1917] text-xl tracking-tight">
                Voyage<span className="text-[#F4B942]">AI</span>
              </span>
            </Link>
            <p className="text-sm text-[#78716C] leading-relaxed mb-5">
              Crafting extraordinary journeys for discerning travellers since 2015. Every story is worth telling.
            </p>
            <div className="flex items-center gap-3">
              {['IG', 'TW', 'FB', 'YT'].map((label, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#F5F0E8] hover:bg-[#F4B942]/20 border border-[#E8E0D5] hover:border-[#F4B942]/30 flex items-center justify-center text-[#78716C] hover:text-[#F4B942] transition-all text-[10px] font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[#1C1917] font-semibold text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#78716C]">
              {[
                { to: `${TRAVEL_BASE}/destinations`, label: 'All Destinations' },
                { to: `${TRAVEL_BASE}/packages`, label: 'Tour Packages' },
                { to: `${TRAVEL_BASE}/packages?category=honeymoon`, label: 'Honeymoon' },
                { to: `${TRAVEL_BASE}/packages?category=adventure`, label: 'Adventure Trips' },
                { to: `${TRAVEL_BASE}/packages?category=luxury`, label: 'Luxury Travel' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-[#F4B942] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#1C1917] font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-[#78716C]">
              {[
                { to: `${TRAVEL_BASE}/about`, label: 'About Us' },
                { to: `${TRAVEL_BASE}/contact`, label: 'Contact' },
                { to: '#', label: 'Careers' },
                { to: '#', label: 'Press & Media' },
                { to: '#', label: 'Partner with Us' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-[#F4B942] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#1C1917] font-semibold text-sm uppercase tracking-wider mb-4">Get In Touch</h4>
            <div className="space-y-3 text-sm text-[#78716C]">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#F4B942] shrink-0 mt-0.5" />
                <span>42, MG Road, Prestige Towers, Bangalore 560001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#F4B942] shrink-0" />
                <span>+91 80 4123 5678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#F4B942] shrink-0" />
                <span>hello@voyageai.travel</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-[#1C1917] text-xs font-medium mb-2">Get travel deals in your inbox</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[#F5F0E8] border border-[#E8E0D5] rounded-lg px-3 py-2 text-xs text-[#1C1917] placeholder:text-[#78716C]/60 focus:outline-none focus:border-[#F4B942]/40 transition-all"
                />
                <button className="bg-[#F4B942] hover:bg-[#e5ab38] text-[#0D1117] text-xs font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716C]/60">
          <p>© {new Date().getFullYear()} VoyageAI Travel Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#92400E] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#92400E] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#92400E] transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
