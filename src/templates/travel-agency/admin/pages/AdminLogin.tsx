import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe, Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react'

const ADMIN_BASE = '/work/travel/admin'

const ADMIN_CREDS = { email: 'admin@travel.com', password: 'admin123', name: 'Admin User' }

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@travel.com')
  const [password, setPassword] = useState('admin123')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (email === ADMIN_CREDS.email && password === ADMIN_CREDS.password) {
        localStorage.setItem('travel_admin', JSON.stringify({ name: ADMIN_CREDS.name, email: ADMIN_CREDS.email }))
        navigate(`${ADMIN_BASE}/dashboard`)
      } else {
        setError('Invalid admin credentials. Try admin@travel.com / admin123')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F4B942] flex items-center justify-center">
              <Globe size={22} className="text-[#0D1117]" />
            </div>
            <span className="font-bold text-white text-2xl">Voyage<span className="text-[#F4B942]">AI</span></span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#F4B942]/10 border border-[#F4B942]/20 px-3 py-1.5 rounded-full text-xs text-[#F4B942] font-medium mb-3">
            <ShieldCheck size={13} />
            Admin Console
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Sign In</h1>
          <p className="text-[#A8B0BA] text-sm mt-1">Access the travel management console</p>
        </div>

        <div className="bg-[#171E27] border border-white/[0.06] rounded-2xl p-6">
          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-sm text-red-400">
              <AlertCircle size={15} className="shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[#A8B0BA] mb-1.5 block">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F4B942]/40 transition-all" />
            </div>
            <div>
              <label className="text-xs text-[#A8B0BA] mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full bg-[#0D1117] border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:border-[#F4B942]/40 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8B0BA]">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#F4B942] hover:bg-[#e5ab38] disabled:opacity-60 text-[#0D1117] font-semibold py-3.5 rounded-xl transition-colors text-sm">
              {loading ? <div className="w-5 h-5 border-2 border-[#0D1117]/30 border-t-[#0D1117] rounded-full animate-spin" /> : <><Lock size={15} /> Sign In</>}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/[0.06]">
            <p className="text-xs text-[#A8B0BA] text-center mb-2">Demo Credentials</p>
            <div className="bg-[#0D1117] rounded-xl p-3 text-xs font-mono text-[#A8B0BA] space-y-1">
              <p>Email: <span className="text-[#F4B942]">admin@travel.com</span></p>
              <p>Password: <span className="text-[#F4B942]">admin123</span></p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
