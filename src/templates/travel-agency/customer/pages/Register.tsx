import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Globe, UserPlus, CheckCircle } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

const TRAVEL_BASE = '/work/travel/customer'

interface AuthContext {
  user: { name: string; email: string } | null
  setUser: (u: { name: string; email: string } | null) => void
}

export default function Register() {
  const ctx = useOutletContext<AuthContext>()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) return
    setLoading(true)
    setTimeout(() => {
      const userData = { name: form.name, email: form.email }
      localStorage.setItem('travel_user', JSON.stringify(userData))
      ctx.setUser(userData)
      navigate(`${TRAVEL_BASE}/dashboard`)
    }, 900)
  }

  const perks = [
    'Save trips to your wishlist',
    'Track all your bookings',
    'Exclusive member-only deals',
    'Priority customer support',
  ]

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
        {/* Left Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col justify-center">
          <Link to={TRAVEL_BASE} className="inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#F4B942] flex items-center justify-center">
              <Globe size={18} className="text-[#0D1117]" />
            </div>
            <span className="font-bold text-[#1C1917] text-xl">Voyage<span className="text-[#F4B942]">AI</span></span>
          </Link>
          <h2 className="text-3xl font-bold text-[#1C1917] mb-3">
            Join 30,000+<br />
            <span className="text-[#F4B942]">Happy Travellers</span>
          </h2>
          <p className="text-[#78716C] mb-8 leading-relaxed">
            Create your free account and unlock personalised travel experiences, exclusive deals, and a world of adventure.
          </p>
          <div className="space-y-3">
            {perks.map((perk, i) => (
              <motion.div key={perk} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F4B942]/20 flex items-center justify-center shrink-0">
                  <CheckCircle size={13} className="text-[#F4B942]" />
                </div>
                <span className="text-[#78716C] text-sm">{perk}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white border border-[#E8E0D5] rounded-2xl p-6">
            <h1 className="text-xl font-bold text-[#1C1917] mb-5">Create Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="tr-name" className="text-xs text-[#78716C] mb-1.5 block">Full Name</label>
                <input required id="tr-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                  className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
              </div>
              <div>
                <label htmlFor="tr-email" className="text-xs text-[#78716C] mb-1.5 block">Email</label>
                <input required type="email" id="tr-email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                  className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
              </div>
              <div>
                <label htmlFor="tr-phone" className="text-xs text-[#78716C] mb-1.5 block">Phone (optional)</label>
                <input id="tr-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210"
                  className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#78716C]/50 focus:outline-none focus:border-[#F4B942]/40 transition-all" />
              </div>
              <div>
                <label htmlFor="tr-password" className="text-xs text-[#78716C] mb-1.5 block">Password</label>
                <div className="relative">
                  <input required type={showPass ? 'text' : 'password'} id="tr-password" name="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters"
                    className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 pr-10 text-sm text-[#1C1917] focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C]">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="tr-confirm" className="text-xs text-[#78716C] mb-1.5 block">Confirm Password</label>
                <input required type={showPass ? 'text' : 'password'} id="tr-confirm" name="confirm" value={form.confirm} onChange={handleChange}
                  className={`w-full bg-[#FDFAF5] border rounded-xl px-4 py-3 text-sm text-[#1C1917] focus:outline-none transition-all ${form.confirm && form.confirm !== form.password ? 'border-red-500/50' : 'border-[#E8E0D5] focus:border-[#F4B942]/40'}`} />
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-red-400 text-xs mt-1">Passwords don't match</p>
                )}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#F4B942]" />
                <span className="text-xs text-[#78716C]">
                  I agree to the <Link to="#" className="text-[#F4B942]">Terms of Service</Link> and <Link to="#" className="text-[#F4B942]">Privacy Policy</Link>
                </span>
              </label>
              <button type="submit" disabled={loading || !agreed || form.password !== form.confirm}
                className="w-full flex items-center justify-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] disabled:opacity-40 text-[#0D1117] font-semibold py-3.5 rounded-xl transition-colors text-sm">
                {loading ? <div className="w-5 h-5 border-2 border-[#0D1117]/30 border-t-[#0D1117] rounded-full animate-spin" /> : <><UserPlus size={16} />Create Account</>}
              </button>
            </form>
            <p className="text-center text-sm text-[#78716C] mt-4">
              Already have an account? <Link to={`${TRAVEL_BASE}/login`} className="text-[#F4B942] hover:underline">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
