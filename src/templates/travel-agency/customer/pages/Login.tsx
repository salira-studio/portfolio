import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Globe, LogIn, AlertCircle } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'

const TRAVEL_BASE = '/work/travel/customer'

interface AuthContext {
  user: { name: string; email: string } | null
  setUser: (u: { name: string; email: string } | null) => void
}

const MOCK_USERS = [
  { email: 'customer@travel.com', password: 'password123', name: 'Alex Traveller', role: 'customer' },
]

export default function Login() {
  const ctx = useOutletContext<AuthContext>()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || ''
  const navigate = useNavigate()
  const [email, setEmail] = useState('customer@travel.com')
  const [password, setPassword] = useState('password123')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && u.password === password)
      if (user) {
        const userData = { name: user.name, email: user.email }
        localStorage.setItem('travel_user', JSON.stringify(userData))
        ctx.setUser(userData)
        navigate(redirect ? `${TRAVEL_BASE}/${redirect}` : `${TRAVEL_BASE}/dashboard`)
      } else {
        setError('Invalid credentials. Try customer@travel.com / password123')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to={TRAVEL_BASE} className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4B942] flex items-center justify-center">
                <Globe size={22} className="text-[#0D1117]" />
              </div>
              <span className="font-bold text-[#1C1917] text-2xl">Voyage<span className="text-[#F4B942]">AI</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-[#1C1917]">Welcome Back</h1>
            <p className="text-[#78716C] text-sm mt-1">Sign in to access your bookings and wishlist</p>
          </div>

          <div className="bg-white border border-[#E8E0D5] rounded-2xl p-6">
            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-sm text-red-400">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="tl-email" className="text-xs text-[#78716C] mb-1.5 block">Email</label>
                <input type="email" id="tl-email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#F4B942]/40 transition-all" />
              </div>
              <div>
                <label htmlFor="tl-password" className="text-xs text-[#78716C] mb-1.5 block">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} id="tl-password" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full bg-[#FDFAF5] border border-[#E8E0D5] rounded-xl px-4 py-3 pr-10 text-sm text-[#1C1917] focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#92400E]">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] disabled:opacity-60 text-[#0D1117] font-semibold py-3.5 rounded-xl transition-colors text-sm">
                {loading ? <div className="w-5 h-5 border-2 border-[#0D1117]/30 border-t-[#0D1117] rounded-full animate-spin" /> : <><LogIn size={16} /> Sign In</>}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-[#E8E0D5]">
              <p className="text-xs text-[#78716C] text-center mb-3">Demo Credentials</p>
              <div className="bg-[#FDFAF5] rounded-xl p-3 text-xs font-mono text-[#78716C] space-y-1">
                <p>Email: <span className="text-[#F4B942]">customer@travel.com</span></p>
                <p>Pass: <span className="text-[#F4B942]">password123</span></p>
              </div>
            </div>

            <p className="text-center text-sm text-[#78716C] mt-4">
              Don't have an account?{' '}
              <Link to={`${TRAVEL_BASE}/register`} className="text-[#F4B942] hover:underline">Sign Up</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
